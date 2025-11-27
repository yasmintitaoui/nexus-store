// src/components/ProductInfo.jsx
import { ShoppingCart, Heart, Truck, Shield, RotateCcw, Plus, Minus } from "lucide-react";

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
  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <div className="space-y-10">
      {/* Rating + Title + Price */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-yellow-400 text-lg">★</span>
            ))}
          </div>
          <span className="text-white/60 text-sm">
            {product.rating} ({product.reviews} reviews)
          </span>
        </div>

        <h1 className="text-5xl font-extrabold tracking-tight mb-4">
          {product.name}
        </h1>

        <div className="flex items-baseline gap-4">
          <span className="text-4xl font-bold">${product.price}</span>
          <span className="text-2xl text-white/40 line-through">
            ${product.originalPrice}
          </span>
          <span className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Save {discount}%
          </span>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 space-y-8 shadow-xl">
        {/* Color */}
        <div>
          <label className="block text-sm font-semibold mb-3 text-white/80">
            Color
          </label>

          <div className="flex gap-4">
            {product.colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-12 h-12 rounded-full border-2 transition-all duration-200 shadow-md
                  ${
                    selectedColor === color
                      ? "border-white scale-110 shadow-white/30"
                      : "border-white/20 hover:border-white/40"
                  }
                `}
                style={{
                  backgroundColor: color === "white" ? "#f2f2f2" : color,
                }}
              />
            ))}
          </div>
        </div>

        {/* Size */}
        <div>
          <label className="block text-sm font-semibold mb-3 text-white/80">
            Size
          </label>

          <div className="grid grid-cols-4 gap-3">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`py-3 rounded-xl font-semibold transition-all text-center border
                  ${
                    selectedSize === size
                      ? "bg-white text-black border-white shadow-lg"
                      : "bg-white/5 border-white/10 hover:bg-white/10"
                  }
                `}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-sm font-semibold mb-3 text-white/80">
            Quantity
          </label>

          <div className="flex items-center gap-5">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition shadow-md"
            >
              <Minus className="w-4 h-4" />
            </button>

            <span className="text-2xl font-bold w-12 text-center">
              {quantity}
            </span>

            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition shadow-md"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-2">
          <button
            onClick={addToCart}
            className="flex-1 bg-white text-black py-4 rounded-xl font-bold hover:bg-white/90 transition flex items-center justify-center gap-2 shadow-lg"
          >
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </button>

          <button
            onClick={() => setLiked(!liked)}
            className={`p-4 rounded-xl border-2 transition-all shadow-md
              ${
                liked
                  ? "bg-red-500/20 border-red-500 text-red-400 shadow-red-500/20"
                  : "bg-white/5 border-white/10 hover:bg-white/10"
              }
            `}
          >
            <Heart className={`w-6 h-6 ${liked ? "fill-current" : ""}`} />
          </button>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 text-center shadow-lg">
          <Truck className="w-6 h-6 mx-auto mb-2 text-white/70" />
          <div className="text-xs text-white/60">Free Shipping</div>
        </div>
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 text-center shadow-lg">
          <RotateCcw className="w-6 h-6 mx-auto mb-2 text-white/70" />
          <div className="text-xs text-white/60">30-Day Returns</div>
        </div>
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 text-center shadow-lg">
          <Shield className="w-6 h-6 mx-auto mb-2 text-white/70" />
          <div className="text-xs text-white/60">2-Year Warranty</div>
        </div>
      </div>
    </div>
  );
}
