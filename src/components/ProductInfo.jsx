import { useState, useEffect } from "react";
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
const [stock, setStock] = useState({});
const [currentPrice, setCurrentPrice] = useState(product.price);

// Initialize stock (example structure)
useEffect(() => {
const stockData = {};
product.colors.forEach(color => {
stockData[color] = {};
product.sizes.forEach(size => {
stockData[color][size] = Math.floor(Math.random() * 10) + 1; // random stock
});
});
setStock(stockData);
}, [product.colors, product.sizes]);

// Update price if selection changes
useEffect(() => {
// example: you could have price variations per color/size
setCurrentPrice(product.price);
}, [selectedColor, selectedSize, product.price]);

const discount = Math.round(((product.originalPrice - currentPrice) / product.originalPrice) * 100);

// Handle wishlist persistence
const toggleLike = () => {
const likedProducts = JSON.parse(localStorage.getItem("wishlist") || "[]");
if (!liked) {
likedProducts.push(product.id);
} else {
const index = likedProducts.indexOf(product.id);
if (index > -1) likedProducts.splice(index, 1);
}
localStorage.setItem("wishlist", JSON.stringify(likedProducts));
setLiked(!liked);
};

// Share product
const shareProduct = () => {
navigator.clipboard.writeText(window.location.href);
alert("Product link copied to clipboard!");
};

return ( <div className="space-y-6">
{/* Rating + Title + Price */} <div> <div className="flex items-center gap-3 mb-3"> <div className="flex">
{[...Array(5)].map((_, i) => ( <span key={i} className="text-yellow-400 text-lg">★</span>
))} </div> <span className="text-white/60 text-sm">
{product.rating} ({product.reviews} reviews) </span> </div>

```
    <h1 className="text-5xl font-bold mb-4">{product.name}</h1>

    <div className="flex items-baseline gap-4">
      <span className="text-4xl font-bold">${currentPrice}</span>
      <span className="text-2xl text-white/40 line-through">
        ${product.originalPrice}
      </span>
      <span className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-3 py-1 rounded-full text-sm font-semibold">
        Save {discount}%
      </span>
    </div>
  </div>

  {/* Main Card */}
  <div className="bg-black/90 backdrop-blur-md border border-white/20 rounded-2xl p-6 space-y-6">
    {/* Color */}
    <div>
      <label className="block text-sm font-semibold mb-3 text-white/80">Color</label>
      <div className="flex gap-3">
        {product.colors.map((color) => {
          const available = Object.values(stock[color] || {}).some((qty) => qty > 0);
          return (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              disabled={!available}
              className={`w-12 h-12 rounded-full border-2 transition-all duration-200
                ${selectedColor === color ? "border-white scale-110 shadow-lg" : "border-white/20 hover:border-white/40"}
                ${!available ? "opacity-40 cursor-not-allowed" : ""}
              `}
              style={{ backgroundColor: color === "white" ? "#f1f1f1" : color }}
            />
          );
        })}
      </div>
    </div>

    {/* Size */}
    <div>
      <label className="block text-sm font-semibold mb-3 text-white/80">Size</label>
      <div className="grid grid-cols-4 gap-3">
        {product.sizes.map((size) => {
          const available = (stock[selectedColor]?.[size] || 0) > 0;
          return (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              disabled={!available}
              className={`py-3 rounded-xl font-semibold transition-all ${
                selectedSize === size
                  ? "bg-white text-black"
                  : "bg-white/5 border border-white/10 hover:bg-white/10"
              } ${!available ? "opacity-40 cursor-not-allowed" : ""}`}
            >
              {size}
            </button>
          );
        })}
      </div>
    </div>

    {/* Quantity */}
    <div>
      <label className="block text-sm font-semibold mb-3 text-white/80">Quantity</label>
      <div className="flex items-center gap-4">
        <button
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition"
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="text-xl font-bold w-12 text-center">{quantity}</span>
        <button
          onClick={() => setQuantity((q) => q + 1)}
          className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>

    {/* Buttons */}
    <div className="flex flex-wrap gap-4 pt-4">
      <button
        onClick={addToCart}
        className="flex-1 bg-white text-black py-4 rounded-xl font-bold hover:bg-white/90 transition flex items-center justify-center gap-2"
      >
        <ShoppingCart className="w-5 h-5" />
        Add to Cart
      </button>

      <button
        onClick={toggleLike}
        className={`p-4 rounded-xl border-2 transition-all flex items-center justify-center gap-1 ${
          liked
            ? "bg-red-500/20 border-red-500 text-red-400"
            : "bg-white/5 border-white/10 hover:bg-white/10"
        }`}
      >
        <Heart className="w-6 h-6" />
        Wishlist
      </button>

      <button
        onClick={shareProduct}
        className="p-4 rounded-xl border-2 border-white/10 hover:bg-white/10 flex items-center justify-center gap-1"
      >
        <Share2 className="w-5 h-5" />
        Share
      </button>
    </div>
  </div>

  {/* Trust Badges */}
  <div className="grid grid-cols-3 gap-4 mt-4">
    <div className="bg-black/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center">
      <Truck className="w-6 h-6 mx-auto mb-2 text-white/60" />
      <div className="text-xs text-white/60">Free Shipping</div>
    </div>
    <div className="bg-black/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center">
      <RotateCcw className="w-6 h-6 mx-auto mb-2 text-white/60" />
      <div className="text-xs text-white/60">30-Day Returns</div>
    </div>
    <div className="bg-black/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center">
      <Shield className="w-6 h-6 mx-auto mb-2 text-white/60" />
      <div className="text-xs text-white/60">2-Year Warranty</div>
    </div>
  </div>
</div>

);
}
