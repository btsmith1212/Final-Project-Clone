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
        const user = await User.findById(context.user._id).populate({
          path: 'carts.products',
          populate: 'category'
        });
        return user;
      }

      throw AuthenticationError;
    },
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const order = new Order({ products: args.products });
      const line_items = [];

      const { products } = await order.populate('products');

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

    addCart: async (parent, { products }, context) => {
      if (context.user) {
        const cart = new Cart({ products });

        await User.findByIdAndUpdate(context.user._id, {
          $push: {
            carts: cart
          }
        });

        // Fetch the updated user data to get the populated cart
        const updatedUser = await User.findById(context.user._id).populate({
          path: 'carts.products',
          populate: 'category'
        });

        // Return the populated cart
        return updatedUser.carts.find(c => c._id.toString() === cart._id.toString());
      }

      throw AuthenticationError;
    },

    removeCart: async (_, { productId }, context) => {
      if (!context.user) {
        throw AuthenticationError;
      }

      try {
        const updatedUser = await User.findOneAndUpdate(
          {
            _id: context.user._id,
            'carts.products': productId
          },
          {
            $pull: {
              'carts.$.products': productId
            }
          },
          { new: true }
        ).populate({
          path: 'carts.products',
          populate: 'category'
        });

        
        return updatedUser;
      } catch (error) {
        console.error('Error removing from cart:', error);
      }
    },

  //   createProduct: async (_, { input }) => {
  //     try {
  //       // Your product creation logic here
  //       const newProduct = new Product(input);
  //       const savedProduct = await newProduct.save();
  //       return savedProduct;
  //     } catch (error) {
  //       return {
  //         success: false,
  //         message: error.message || "Error creating product",
  //       };
  //     }
  //   },

  //   updateProduct: async (_, { productId, input }) => {
  //     try {
  //       // Your product update logic here
  //       const updatedProduct = await Product.findByIdAndUpdate(
  //         productId,
  //         input,
  //         { new: true }
  //       );
  //       return updatedProduct;
  //     } catch (error) {
  //       return {
  //         success: false,
  //         message: error.message || "Error updating product",
  //       };
  //     }
  //   },
  //   updateCart: async (_, { userId, productId }) => {
  //     try {
  //       // Your cart update logic here
  //       const cart = await Cart.findOneAndUpdate(
  //         { userId },
  //         { $addToSet: { products: productId } },
  //         { new: true }
  //       ).populate('products');
  //       return cart;
  //     } catch (error) {
  //       return { success: false, message: error.message || 'Error updating cart' };
  //     }
  //   }
  // },
  // createCategory: async (_, { input }) => {
  //   try {
  //     const newCategory = new Category(input);
  //     const savedCategory = await newCategory.save();
  //     return savedCategory;
  //   } catch (error) {
  //     return { success: false, message: error.message || 'Error creating category' };
  //   }
  // },
  // updateCategory: async (_, { categoryId, input }) => {
  //   try {
  //     const updatedCategory = await Category.findByIdAndUpdate(categoryId, input, { new: true });
  //     return updatedCategory;
  //   } catch (error) {
  //     return { success: false, message: error.message || 'Error updating category' };
  //   }
  // },
  // deleteCategory: async (_, { categoryId }) => {
  //   try {
  //     const deletedCategory = await Category.findByIdAndDelete(categoryId);
  //     return deletedCategory;
  //   } catch (error) {
  //     return { success: false, message: error.message || 'Error deleting category' };
  //   }
  // },
  // Other resolvers...
  }
};

module.exports = resolvers;
