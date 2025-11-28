// src/components/pages/CheckoutPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Lock, CreditCard, CheckCircle } from "lucide-react";
import { toast } from "react-hot-toast";

export default function CheckoutPage({ items = [], clearCart }) {
  const navigate = useNavigate();

  const [billing, setBilling] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    country: "",
    zip: "",
  });

  const [payment, setPayment] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
  });

  const formattedExpiry = payment.expiry
    ? payment.expiry.split("-")[1] + "/" + payment.expiry.split("-")[0].slice(2)
    : "";

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setBilling((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPayment((prev) => ({ ...prev, [name]: value }));
  };

  const handleRemoveItem = (index) => {
    items.splice(index, 1);
    navigate(0);
  };

  const handlePlaceOrder = () => {
    if (Object.values(billing).some((v) => !v) || Object.values(payment).some((v) => !v)) {
      toast.error("Please fill all billing and payment fields");
      return;
    }
    toast.success("Payment successful! Order confirmed.", {
      icon: <CheckCircle className="w-8 h-8 text-green-400" />,
      duration: 6000,
      style: { background: "#111", color: "#fff", border: "1px solid #333" },
    });
    if (clearCart) clearCart();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-black text-white pt-28 pb-32 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-6 mb-12">
          <button
            onClick={() => navigate("/")}
            className="p-4 hover:bg-white/5 rounded-2xl transition-all group"
          >
            <ArrowLeft className="w-7 h-7 group-hover:-translate-x-1 transition" />
          </button>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter">Checkout</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left: Billing & Payment */}
          <div className="lg:col-span-2 space-y-12">
            {/* === BILLING SECTION — 1 + TITLE ON SAME LINE === */}
            <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl p-10 shadow-2xl">
              <div className="flex items-center gap-5 mb-8">
                <span className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center text-xl font-black shadow-lg">
                  1
                </span>
                <h2 className="text-3xl font-black tracking-tight">Billing Information</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {["name", "email", "address", "city", "country", "zip"].map((f) => (
                  <input
                    key={f}
                    type={f === "email" ? "email" : "text"}
                    name={f}
                    placeholder={f.charAt(0).toUpperCase() + f.slice(1)}
                    value={billing[f]}
                    onChange={handleBillingChange}
                    className="p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                  />
                ))}
              </div>

              {/* === PAYMENT SECTION — 2 + TITLE + SECURE BADGE ON SAME LINE === */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-5">
                  <span className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center text-xl font-black shadow-lg">
                    2
                  </span>
                  <h2 className="text-3xl font-black tracking-tight">Payment Details</h2>
                </div>
                <div className="flex items-center gap-3 bg-green-500/10 px-6 py-3 rounded-full border border-green-400/30">
                  <Lock className="w-6 h-6 text-green-400" />
                  <span className="text-green-400 font-bold text-lg">Secure • Encrypted • Instant</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <input
                  type="text"
                  name="number"
                  placeholder="Card Number"
                  value={payment.number}
                  onChange={handlePaymentChange}
                  className="p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                />
                <input
                  type="text"
                  name="expiry"
                  placeholder="Expiry date"
                  value={payment.expiry}
                  onChange={(e) =>
                    setPayment((prev) => ({ ...prev, expiry: e.target.value }))
                  }
                  className="p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                />
                <input
                  type="text"
                  name="cvc"
                  placeholder="CVC"
                  value={payment.cvc}
                  onChange={handlePaymentChange}
                  className="p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                />
                <input
                  type="text"
                  name="name"
                  placeholder="Cardholder Name"
                  value={payment.name}
                  onChange={handlePaymentChange}
                  className="p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                />
              </div>

              <button
                onClick={handlePlaceOrder}
                className="w-full mt-4 bg-gradient-to-r from-white to-gray-100 text-black py-5 rounded-3xl font-black text-2xl tracking-tight hover:scale-[1.02] transition-all duration-500 shadow-2xl flex items-center justify-center gap-4"
              >
                <CreditCard className="w-8 h-8" />
                Pay ${totalPrice}
              </button>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="space-y-8">
            <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl p-10">
              <h2 className="text-3xl font-bold mb-8">Order Summary</h2>
              <div className="space-y-6 max-h-[500px] overflow-y-auto">
                {items.length === 0 ? (
                  <p className="text-white/50 text-center py-10">Your cart is empty</p>
                ) : (
                  items.map((item, i) => (
                    <div key={i} className="flex gap-6 pb-6 border-b border-white/5 last:border-0">
                      <div className="w-24 h-24 bg-white/10 rounded-2xl border border-white/10 flex items-center justify-center">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-xl" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg">{item.name}</h3>
                        <p className="text-white/50 text-sm mt-1">
                          {item.selectedColor} · {item.selectedSize} · ×{item.quantity}
                        </p>
                        <p className="text-2xl font-bold mt-3">${item.price * item.quantity}</p>
                        <button
                          onClick={() => handleRemoveItem(i)}
                          className="mt-2 text-sm text-red-400 hover:text-red-300 font-medium"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="mt-10 pt-8 border-t border-white/10">
                <div className="flex justify-between text-2xl font-bold mb-4">
                  <span>Total</span>
                  <span className="text-4xl">${totalPrice}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}