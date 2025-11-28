// src/api/products.js

// Utility: simulate network delay
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

// Fake product data
const products = [
  {
    id: 1,
    name: "Smartwatch",
    price: 599,
    originalPrice: 899,
    rating: 4.5,
    reviews: 12,
    colors: ["black", "white", "blue"],
    sizes: ["S", "M", "L"],
    images: {
      black: [
        "/assets/black/smartwatch-black-front.jpeg",
        "/assets/black/smartwatch-black-side.jpeg",
        "/assets/black/smartwatch-black-top.jpeg",
        "/assets/black/smartwatch-black-wrist.jpeg",
      ],
      white: [
        "/assets/white/smartwatch-white-front.jpeg",
        "/assets/white/smartwatch-white-side.jpeg",
        "/assets/white/smartwatch-white-top.jpeg",
        "/assets/white/smartwatch-white-wrist.jpeg",
      ],
      blue: [
        "/assets/blue/smartwatch-blue-front.jpeg",
        "/assets/blue/smartwatch-blue-side.jpeg",
        "/assets/blue/smartwatch-blue-top.jpeg",
        "/assets/blue/smartwatch-blue-wrist.jpeg",
      ],
    },
  },
  // add more products (earbuds, phone case, etc.)
];

// Fetch all products
export const fetchProducts = async () => {
  await delay(300); // simulate network
  return products;
};

// Fetch product by ID
export const fetchProductById = async (id) => {
  await delay(200); // simulate network
  return products.find((p) => p.id === id);
};

let cart = [];
let wishlist = [];

export const fetchCart = async () => {
  await delay(200);
  return cart;
};

export const addToCart = async (item) => {
  await delay(200);
  const existing = cart.find(
    (i) => i.id === item.id && i.color === item.color && i.size === item.size
  );
  if (existing) existing.quantity += item.quantity;
  else cart.push({ ...item });
  return cart;
};

export const removeFromCart = async (id, color, size) => {
  await delay(200);
  cart = cart.filter((i) => !(i.id === id && i.color === color && i.size === size));
  return cart;
};

export const toggleWishlist = async (productId) => {
  await delay(200);
  if (wishlist.includes(productId)) wishlist = wishlist.filter((id) => id !== productId);
  else wishlist.push(productId);
  return wishlist;
};
