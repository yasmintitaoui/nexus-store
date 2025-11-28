// src/components/Cart.jsx
import { X, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Cart({ open, onClose, items = [], removeFromCart }) {
  const navigate = useNavigate();
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    onClose(); // Close the cart sidebar
    navigate("/checkout", { state: { items } }); // Pass cart items to checkout page
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/70 backdrop-blur-xl transition-all duration-500 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={`fixed right-0 top-0 h-screen w-full max-w-lg bg-black border-l border-white/10 z-50 transform transition-transform duration-700 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full text-white">
          {/* Header */}
          <div className="flex items-center justify-between px-8 pt-8 pb-6 border-b border-white/5">
            <h2 className="text-3xl font-bold tracking-tight">Your Cart</h2>
            <button
              onClick={onClose}
              className="p-3 hover:bg-white/5 rounded-xl transition"
            >
              <X className="w-7 h-7" />
            </button>
          </div>

          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-white/30 px-8">
              <ShoppingCart className="w-20 h-20 mb-6 opacity-30" />
              <p className="text-2xl font-medium">Your cart is empty</p>
            </div>
          ) : (
            <>
              {/* Items */}
              <div className="flex-1 overflow-y-auto px-8 pt-6 space-y-5">
                {items.map((item, idx) => (
                  <div
                    key={item.id + item.selectedColor + item.selectedSize + idx}
                    className="group bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 hover:bg-white/8 transition"
                  >
                    <div className="flex gap-6">
                      <div className="w-24 h-24 rounded-xl overflow-hidden border border-white/10 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                        />
                      </div>

                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-1">
                          {item.name}
                        </h3>
                        <p className="text-white/50 text-sm mb-3">
                          {item.selectedSize} · {item.selectedColor}
                        </p>
                        <div className="flex justify-between items-end">
                          <span className="text-2xl font-bold text-white">
                            ${item.price * item.quantity}
                          </span>
             <button
                onClick={() => removeFromCart(item.id)}
                 className="text-sm text-red-400 hover:text-red-300 font-medium 
             opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition">
              Remove </button>

                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="border-t border-white/10 px-8 py-8 space-y-6 bg-gradient-to-t from-black via-black to-transparent">
                <div className="flex justify-between items-center">
                  <span className="text-xl text-white/70">Total</span>
                  <span className="text-4xl font-bold text-white">${total}</span>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-white text-black py-5 rounded-2xl font-bold text-xl tracking-wide hover:scale-105 transition-all duration-500 shadow-2xl"
                >
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
