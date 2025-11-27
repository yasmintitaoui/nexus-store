// src/App.jsx
import { useState } from "react";
import { Toaster } from "react-hot-toast";

// Components
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import ProductPage from "./components/pages/ProductPage";
import Footer from "./components/Footer";

// Constants
import { logo } from "./constants";

export default function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartCount = cartItems.length;

  const addToCart = (item) => {
    setCartItems((prev) => [...prev, { ...item, quantity: item.quantity || 1 }]);
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <>
      <Toaster position="top-center" />

      <Navbar cartCount={cartCount} onCartOpen={() => setIsCartOpen(true)} />

      <Cart
        open={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        removeFromCart={removeFromCart}
      />

      <main>
        <ProductPage addToCart={addToCart} />
      </main>

      <Footer />
    </>
  );
}