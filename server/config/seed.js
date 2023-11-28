const db = require("./connection");
const { User, Product, Category } = require("../models");
const cleanDB = require("./cleanDB");

db.once("open", async () => {
  await cleanDB("Category", "categories");
  await cleanDB("Product", "products");
  await cleanDB("User", "users");

  const categories = await Category.insertMany([
    {
      name: "Clothing",
    },
    {
      name: "Home Decor",
    },
    {
      name: "Media",
    },
    {
      name: "Plants",
    },
    {
      name: "Handmade",
    },
  ]);

  console.log("categories seeded");

  const products = await Product.insertMany([
    {
      name: "H&M Mini Skirt",
      description:
        'Size: Small H&M Mini skirt embroidered, Black & white, Metallic threading, Working zip',
      image: 'skirt.jpg',
      category: categories[0]._id,
      price: 15,
      quantity: 1,
    },
    {
      name: "Seven Chakra Bracelet",
      description:
        "Gemstones: Hematite , Amethyst , Blue Onyx , Blue Lace Agate, Green Aventurine, Yellow Onyx, Carnelian and Red Jasper.",
      image: "bracelet.jpg",
      category: categories[4]._id,
      price: 24,
      quantity: 5,
    },
    {
      name: "Propigated House Plants $5 each",
      category: categories[3]._id,
      description:
        "2- aloe vera plants, 4- pathos plants, 5- monstera plants, 3- Arrowhead plants..",   
      image: "plants.jpg",
      price: 5,
      quantity: 14,
    },
    {
      name: "Hens and Chicks (sempervivum)",
      category: categories[3]._id,
      description:
        "Hens and chicks in 4 inch pots, priced individually.",
      image: "plants2.jpg",
      price: 3,
      quantity: 50,
    },
    {
      name: "Hanging Golden Pothos Houseplant",
      category: categories[3]._id,
      description:
        "Golden pothos in 8 inch hanging pot.",
      image: "plants3.jpg",
      price: 25,
      quantity: 1,
    },
    {
      name: "Suncatcher",
      category: categories[4]._id,
      description:
        "7.8inch suncatcher embellished with colorful hummingbird and flowers.",
      image: "suncatcher.jpg",
      price: 14,
      quantity: 1,
    },
    {
      name: "Plates",
      category: categories[1]._id,
      description:
        "SET OF 5 Antique Flow Blue Willow 8inch Salad Plate, Royal Worcester England 1890 - Blue Transferware.",
      image: "plates.jpg",
      price: 50,
      quantity: 1,
    },
    {
      name: "Folk-Lore of Women as Illustrated by Legendary and Traditionary Tales, Folk-Rhymes, Proverbial Sayings, Superstitions, Etc",
      category: categories[2]._id,
      description:
        "by: Thiselton-Dyer, T. F. Publication Date: 1906, Binding: Hardcover.",
      image: "book.jpg",
      price: 225,
      quantity: 1,
    },
    {
      name: "BeBop Floral Maxi Dress",
      category: categories[0]._id,
      description:
        "NWT Lightweight maxi dress, no slit. Short and simple loose sleeves with deep Vneck. Tie at elastic waist that is just for looks, not adjustable. Comes with matching hair tie. Size Medium.",
      image: "dress.jpg",
      price: 27,
      quantity: 1,
    },
    {
      name: "Mario Super Smash Bros Video Game",
      category: categories[2]._id,
      description:
        "Cartridge Console Card for Nintendo N64 US.",
      image: "game.jpg",
      price: 19.99,
      quantity: 3,
    },
    {
      name: "Jordan 1 Low Golf x Travis Scott Neutral Olive",
      category: categories[0]._id,
      description:
        "Mens size 11, green.",
      image: "shoe.jpg",
      price: 600,
      quantity: 1,
    },
    {
      name: "Broyhill Brasillia highboy dresser",
      category: categories[1]._id,
      description:
        "19in deep 4in wide 44.5in tall.",
      image: "dresser.jpg",
      price: 800,
      quantity: 1,
    },
  ]);

  console.log("products seeded");

  await User.create({
    username: "joy",
    password: "password123",
    addedProducts: [products[3]._id, products[4]._id],
  });

  await User.create({
    username: "emily",
    password: "password123",
  });

  await User.create({
    username: "blake",
    password: "password123",
  });

  console.log("users seeded");

  process.exit();
});
