import { fetchProducts, fetchProductById } from "./products";

// In-memory "database"
let cart = [];
let wishlist = [];

// Simulate network delay
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const apiClient = {
// Products
getProducts: async () => {
await delay(200);
return fetchProducts();
},

getProductById: async (id) => {
await delay(150);
return fetchProductById(id);
},

// Cart
getCart: async () => {
await delay(100);
return cart;
},

addToCart: async (item) => {
await delay(150);
const existing = cart.find(
(i) => i.id === item.id && i.color === item.color && i.size === item.size
);
if (existing) existing.quantity += item.quantity;
else cart.push({ ...item });
return cart;
},

removeFromCart: async (id, color, size) => {
await delay(150);
cart = cart.filter((i) => !(i.id === id && i.color === color && i.size === size));
return cart;
},

clearCart: async () => {
await delay(100);
cart = [];
return cart;
},

// Wishlist
getWishlist: async () => {
await delay(100);
return wishlist;
},

toggleWishlist: async (productId) => {
await delay(150);
if (wishlist.includes(productId)) wishlist = wishlist.filter((id) => id !== productId);
else wishlist.push(productId);
return wishlist;
},
};
