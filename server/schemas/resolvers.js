const { User, Product, Category, Cart } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');


const resolvers = {
  Query: {
    categories: async () => {
      return await Category.find();
    },
    products: async (parent, { category, name }) => {
      const params = {};

      if (category) {
        params.category = category;
      }

      if (name) {
        params.name = {
          $regex: name
        };
      }

      return await Product.find(params).populate('category');
    },
    product: async (parent, { _id }) => {
      return await Product.findById(_id).populate('category');
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id)
        .populate({
          path: 'cart.products',
          populate: 'category'
        })
        .populate('addedProducts');
        return user;
      }

      throw AuthenticationError;
    },
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const cart = new Cart({ products: args.products });
      const line_items = [];

      const { products } = await cart.populate('products');

      for (let i = 0; i < products.length; i++) {
        const product = await stripe.products.create({
          name: products[i].name,
          description: products[i].description,
          images: [`${url}/images/${products[i].image}`]
        });

        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: products[i].price * 100,
          currency: 'usd',
        });

        line_items.push({
          price: price.id,
          quantity: 1
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`
      });

      return { session: session.id };
    },
  },

  Mutation: {
    registerUser: async (parent, { username, password }) => {
      // Check if the username is already taken
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        throw new Error("Username is already taken");
      }

      const user = await User.create({ username, password });
      const token = signToken(user);

      return { token, user };
    },

    loginUser: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);
      return { token, user };
    },

    addCart: async (_, { productId }, context) => {
      const product = await Product.findById(productId);
      if (!product) {
        throw new Error('Product not found');
      }

      if (context.user) {
        const user = await User.findByIdAndUpdate(
          context.user._id,
          {
            $push: { 'cart.products': product }
          },
          {
            new: true,
          }
        ).populate({
          path: 'cart.products',
          populate: 'category'
        });

        return user;
      }
    },

    removeCart: async (_, { productId }, context) => {
      if (context.user) {
        const user = await User.findByIdAndUpdate(
          context.user._id,
          {
            $pull: { 'cart.products': { _id: productId } }
          },
          {
            new: true,
          }
        )

        return user;
      }
    },

    createProduct: async (_, { input }, context) => {
      try {
        const { category, ...productInput } = input;

        // Find the category by name
        const categoryObj = await Category.findOne({ name: category });

        // Create the product with the provided input and category
        const newProduct = new Product({
          ...productInput,
          category: categoryObj._id,
        });
        
        const savedProduct = await newProduct.save();

        // Associate the created product with the user's addedProducts
        await User.findByIdAndUpdate(
          context.user._id, {
            $push: {
              addedProducts: savedProduct._id
            },
          }, {
            new: true
          }
        );

        const populatedProduct = await Product.populate(savedProduct, {
          path: 'category'
        });
        console.log("populatedProduct", populatedProduct)
        return populatedProduct;
      } catch (error) {
        return {
          success: false,
          message: error.message || "Error creating product",
        };
      }
    },

    deleteProduct: async (_, { productId }) => {
      try {
        const deletedProduct = await Product.findByIdAndDelete(productId);
        return deletedProduct !== null; // Return true if deletedProduct is not null
      } catch (error) {
        console.error(error);
        return false; // Return false in case of an error
      }
    },

  }
};

module.exports = resolvers;
