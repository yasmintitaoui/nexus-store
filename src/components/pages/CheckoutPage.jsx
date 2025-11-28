// src/components/pages/CheckoutPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Lock, CreditCard, CheckCircle, Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";

export default function CheckoutPage({ items = [], clearCart }) {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(items);

  const [billing, setBilling] = useState({
    name: "", email: "", address: "", city: "", country: "", zip: "",
  });

  const [payment, setPayment] = useState({
    number: "", expiry: "", cvc: "", name: "",
  });

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleRemoveItem = (index) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
    toast.success("Removed", { duration: 1500 });
  };

  const handlePlaceOrder = () => {
    if (Object.values(billing).some(v => !v.trim()) || Object.values(payment).some(v => !v.trim())) {
      toast.error("Fill all fields");
      return;
    }
    toast.success("Payment successful!", {
      icon: <CheckCircle className="w-10 h-10 text-green-400" />,
      duration: 5000,
    });
    if (clearCart) clearCart();
    setTimeout(() => navigate("/"), 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <button
            onClick={() => navigate(-1)}
            className="p-3 hover:bg-white/10 rounded-2xl transition"
          >
            <ArrowLeft className="w-7 h-7" />
          </button>
          <h1 className="text-5xl lg:text-7xl font-black tracking-tighter">Checkout</h1>
        </div>

        {/* RESPONSIVE GRID: Stack on mobile, side-by-side on lg+ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

          {/* === LEFT: Forms (full width on mobile, 2/3 on desktop) === */}
          <div className="lg:col-span-2 space-y-8 order-2 lg:order-1">

            {/* Billing */}
            <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl p-6 sm:p-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center text-xl font-black shadow-2xl">
                  1
                </div>
                <h2 className="text-2xl font-black">Billing Information</h2>
              </div>
              <div className="grid grid-cols-1 gap-5">
                {["name", "email", "address", "city", "country", "zip"].map((field) => (
                  <input
                    key={field}
                    type={field === "email" ? "email" : "text"}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={billing[field]}
                    onChange={(e) => setBilling(prev => ({ ...prev, [field]: e.target.value }))}
                    className="w-full px-6 py-5 bg-white/10 border border-white/20 rounded-2xl text-lg placeholder:text-white/40 focus:outline-none focus:border-white/50 transition"
                  />
                ))}
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl p-6 sm:p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center text-xl font-black shadow-2xl">
                    2
                  </div>
                  <h2 className="text-2xl font-black">Payment Details</h2>
                </div>
                <div className="flex items-center gap-2 bg-green-500/20 px-5 py-2 rounded-full border border-green-400/40">
                  <Lock className="w-5 h-5 text-green-400" />
                  <span className="text-green-400 font-bold text-sm">Secure • Encrypted • Instant</span>
                </div>
              </div>

              <div className="space-y-5">
                <input
                  type="text"
                  placeholder="Card Number"
                  value={payment.number}
                  onChange={(e) => setPayment(prev => ({ ...prev, number: e.target.value }))}
                  className="w-full px-6 py-5 bg-white/10 border border-white/20 rounded-2xl text-lg placeholder:text-white/40 focus:outline-none focus:border-white/50"
                />
                <div className="grid grid-cols-3 gap-4">
                  <input type="text" placeholder="MM/YY" value={payment.expiry} onChange={(e) => setPayment(prev => ({ ...prev, expiry: e.target.value }))} className="px-6 py-5 bg-white/10 border border-white/20 rounded-2xl text-center" />
                  <input type="text" placeholder="CVC" value={payment.cvc} onChange={(e) => setPayment(prev => ({ ...prev, cvc: e.target.value }))} className="px-6 py-5 bg-white/10 border border-white/20 rounded-2xl text-center" />
                  <input type="text" placeholder="Name" value={payment.name} onChange={(e) => setPayment(prev => ({ ...prev, name: e.target.value }))} className="px-6 py-5 bg-white/10 border border-white/20 rounded-2xl" />
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                className="w-full mt-8 bg-gradient-to-r from-white to-gray-200 text-black py-6 rounded-3xl font-black text-2xl tracking-tight hover:scale-[1.02] transition-all duration-300 shadow-2xl flex items-center justify-center gap-3"
              >
                <CreditCard className="w-8 h-8" />
                Pay ${totalPrice}
              </button>
            </div>
          </div>

          {/* === RIGHT: Order Summary (appears first on mobile, right on desktop) === */}
          <div className="order-1 lg:order-2 lg:sticky lg:top-24 lg:self-start">
            <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl p-6 sm:p-8">
              <h2 className="text-2xl font-black mb-6">Order Summary</h2>
              <div className="space-y-6">
                {cartItems.length === 0 ? (
                  <p className="text-white/40 text-center py-10">Cart is empty</p>
                ) : (
                  cartItems.map((item, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-2xl border border-white/10" />
                      <div className="flex-1">
                        <h3 className="font-bold text-lg">{item.name}</h3>
                        <p className="text-white/50 text-sm">{item.selectedColor} · {item.selectedSize} · ×{item.quantity}</p>
                        <p className="text-xl font-black mt-2">${item.price * item.quantity}</p>
                      </div>
                      <button onClick={() => handleRemoveItem(i)} className="p-2 hover:bg-red-500/10 rounded-lg transition">
                        <Trash2 className="w-5 h-5 text-red-400" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="flex justify-between items-end">
                  <span className="text-xl font-medium text-white/70">Total</span>
                  <span className="text-4xl font-black">${totalPrice}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}