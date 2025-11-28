import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import ProductPage from "./components/pages/ProductPage";
import CheckoutPage from "./components/pages/CheckoutPage";
import Footer from "./components/Footer";
import { apiClient } from "./api/apiClient";

export default function App() {
const [cartItems, setCartItems] = useState([]);
const [isCartOpen, setIsCartOpen] = useState(false);

// Load cart from fake backend
useEffect(() => {
const fetchCart = async () => {
const items = await apiClient.getCart();
setCartItems(items);
};
fetchCart();
}, []);

const addToCart = async (item) => {
const updatedCart = await apiClient.addToCart(item);
setCartItems(updatedCart);
setIsCartOpen(true);
};

const removeFromCart = async (id, color, size) => {
const updatedCart = await apiClient.removeFromCart(id, color, size);
setCartItems(updatedCart);
};

return ( <Router> <Toaster position="top-center" />


  <Navbar cartCount={cartItems.length} onCartOpen={() => setIsCartOpen(true)} />

  <Cart
    open={isCartOpen}
    onClose={() => setIsCartOpen(false)}
    items={cartItems}
    removeFromCart={removeFromCart}
  />

  <main>
    <Routes>
      <Route
        path="/"
        element={<ProductPage addToCart={addToCart} productId={1} />}
      />
      <Route
        path="/checkout"
        element={<CheckoutPage items={cartItems} />}
      />
    </Routes>
  </main>

  <Footer />
</Router>

);
}
