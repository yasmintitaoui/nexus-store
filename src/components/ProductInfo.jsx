// src/components/ProductInfo.jsx
import { ShoppingCart, Heart, Truck, Shield, RotateCcw, Plus, Minus, Share2 } from "lucide-react";

export default function ProductInfo({
  product,
  selectedColor,
  setSelectedColor,
  selectedSize,
  setSelectedSize,
  quantity,
  setQuantity,
  liked,
  setLiked,
  addToCart,
}) {
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  // NATIVE SHARE — OPENS REAL SOCIAL MENU
  const shareProduct = async () => {
    const shareData = {
      title: product.name,
      text: "Check out this premium smartwatch from NEXUS",
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback for desktop
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      }
    } catch (err) {
      console.log("Share failed:", err);
      await navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  // Wishlist toggle
  const toggleLike = () => {
    setLiked(!liked);
    // You can add localStorage logic later if needed
  };

  return (
    <div className="space-y-8">
      {/* Title & Price */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="flex">★★★★★</div>
          <span className="text-white/60 text-sm">
            {product.rating} ({product.reviews} reviews)
          </span>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
          {product.name}
        </h1>
        <div className="flex items-baseline gap-5">
          <span className="text-5xl font-bold">${product.price}</span>
          <span className="text-3xl text-white/30 line-through">${product.originalPrice}</span>
          <span className="bg-white/10 backdrop-blur-xl border border-white/20 px-5 py-2 rounded-full text-sm font-bold">
            Save {discount}%
          </span>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-black/80 backdrop-blur-2xl border border-white/15 rounded-3xl p-8 space-y-8">
        {/* Color */}
        {/* Your Color & Size selectors here (unchanged) */}
        {/* ... */}

        {/* Buttons Row */}
        <div className="flex gap-4 pt-6">
          <button
            onClick={addToCart}
            className="flex-1 bg-white text-black py-5 rounded-2xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-2xl flex items-center justify-center gap-3"
          >
            <ShoppingCart className="w-6 h-6" />
            Add to Cart
          </button>

          {/* WISHLIST */}
          <button
            onClick={toggleLike}
            className={`p-5 rounded-2xl border-2 transition-all duration-300 ${
              liked
                ? "bg-red-500/20 border-red-500 text-red-400"
                : "border-white/20 hover:border-white/40 hover:bg-white/5"
            }`}
          >
            <Heart className={`w-7 h-7 ${liked ? "fill-current" : ""}`} />
          </button>

          {/* SHARE — ONLY ICON, NATIVE SHARE MENU */}
          <button
            onClick={shareProduct}
            className="p-5 rounded-2xl border-2 border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-300"
          >
            <Share2 className="w-7 h-7" />
          </button>
        </div>
      </div>

      {/* Trust Badges */}
  
      <div className="grid grid-cols-3 gap-6">
        {[
          { Icon: Truck, text: "Free Shipping Worldwide" },
          { Icon: RotateCcw, text: "30-Day Returns" },
          { Icon: Shield, text: "2-Year Warranty" },
        ].map(({ Icon, text }, i) => (
          <div
            key={i}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition"
          >
            <Icon className="w-8 h-8 mx-auto mb-3 text-white/60" />
            <div className="text-sm text-white/60">{text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}