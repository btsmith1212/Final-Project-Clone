const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Product, Cart, Category } = require('../models');


const resolvers = {
  Query: {
    getUser: async (_, { userId }) => {
      try {
        const user = await User.findById(userId);
        return user;
      } catch (error) {
        throw new Error("Error retrieving user");
      }
    },
    getProduct: async (_, { productId }) => {
      try {
        const product = await Product.findById(productId);
        return product;
      } catch (error) {
        throw new Error("Error retrieving product");
      }
    },
    getAllProducts: async () => {
      try {
        const products = await Product.find();
        return products;
      } catch (error) {
        throw new Error('Error retrieving all products');
      }
    },
    getCart: async (_, { userId }) => {
      try {
        const cart = await Cart.findOne({ userId }).populate('products');
        return cart;
      } catch (error) {
        throw new Error('Error retrieving cart');
      }
    },
    getCategory: async (_, { categoryId }) => {
      try {
        const category = await Category.findById(categoryId);
        return category;
      } catch (error) {
        throw new Error('Error retrieving category');
      }
    },
    getAllCategories: async () => {
      try {
        const categories = await Category.find();
        return categories;
      } catch (error) {
        throw new Error('Error retrieving categories');
      }
    },
  },
  Mutation: {
    registerUser: async (_, { input }) => {
      try {
        const { username, password } = input;

        // Check if the username is already taken
        const existingUser = await User.findOne({ username });
        if (existingUser) {
          throw new Error("Username is already taken");
        }

        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user in the database
        const newUser = new User({
          username,
          password: hashedPassword,
        });

        await newUser.save();

        // Optionally, generate a JWT token for the newly registered user
        const token = jwt.sign(
          { userId: newUser.id, username: newUser.username },
          "your-secret-key",
          {
            expiresIn: "1h", // Set the expiration time as needed
          }
        );

        return {
          success: true,
          message: "User registered successfully",
          token,
        };
      } catch (error) {
        return {
          success: false,
          message: error.message || "Error registering user",
        };
      }
    },

    loginUser: async (_, { input }) => {
      try {
        const { username, password } = input;

        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) {
          throw new Error("User not found");
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        // Generate JWT token for the authenticated user
        const token = jwt.sign(
          { userId: user.id, username: user.username },
          "your-secret-key",
          {
            expiresIn: "1h", // Set the expiration time as needed
          }
        );

        return { success: true, token };
      } catch (error) {
        return { success: false, message: error.message || "Error logging in" };
      }
    },

    createProduct: async (_, { input }) => {
      try {
        // Your product creation logic here
        const newProduct = new Product(input);
        const savedProduct = await newProduct.save();
        return savedProduct;
      } catch (error) {
        return {
          success: false,
          message: error.message || "Error creating product",
        };
      }
    },

    updateProduct: async (_, { productId, input }) => {
      try {
        // Your product update logic here
        const updatedProduct = await Product.findByIdAndUpdate(
          productId,
          input,
          { new: true }
        );
        return updatedProduct;
      } catch (error) {
        return {
          success: false,
          message: error.message || "Error updating product",
        };
      }
    },
    updateCart: async (_, { userId, productId }) => {
      try {
        // Your cart update logic here
        const cart = await Cart.findOneAndUpdate(
          { userId },
          { $addToSet: { products: productId } },
          { new: true }
        ).populate('products');
        return cart;
      } catch (error) {
        return { success: false, message: error.message || 'Error updating cart' };
      }
    }
  },
  createCategory: async (_, { input }) => {
    try {
      const newCategory = new Category(input);
      const savedCategory = await newCategory.save();
      return savedCategory;
    } catch (error) {
      return { success: false, message: error.message || 'Error creating category' };
    }
  },
  updateCategory: async (_, { categoryId, input }) => {
    try {
      const updatedCategory = await Category.findByIdAndUpdate(categoryId, input, { new: true });
      return updatedCategory;
    } catch (error) {
      return { success: false, message: error.message || 'Error updating category' };
    }
  },
  deleteCategory: async (_, { categoryId }) => {
    try {
      const deletedCategory = await Category.findByIdAndDelete(categoryId);
      return deletedCategory;
    } catch (error) {
      return { success: false, message: error.message || 'Error deleting category' };
    }
  },
  // Other resolvers...
};

module.exports = resolvers;
