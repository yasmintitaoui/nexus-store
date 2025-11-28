// src/components/ProductGallery.jsx
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../lib/utils";

export default function ProductGallery({ images = [] }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const galleryRef = useRef(null);
  let touchStartX = 0;
  let touchEndX = 0;

  // Smooth fade logic
  const changeImage = (newIndex) => {
    setIsFading(true);
    setTimeout(() => {
      setSelectedIndex(newIndex);
      setIsFading(false);
    }, 150);
  };

  const prev = () =>
    changeImage((selectedIndex - 1 + images.length) % images.length);

  const next = () =>
    changeImage((selectedIndex + 1) % images.length);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  // Mobile swipe
  const handleTouchStart = (e) => {
    touchStartX = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX = e.changedTouches[0].clientX;
    const diff = touchEndX - touchStartX;

    if (Math.abs(diff) > 50) {
      if (diff < 0) next(); // swipe left → next
      if (diff > 0) prev(); // swipe right → previous
    }
  };

  return (
    <div className="space-y-8">
      {/* Main Image */}
      <div
        ref={galleryRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative aspect-square rounded-3xl overflow-hidden bg-black/40 backdrop-blur-2xl border border-white/20 shadow-2xl shadow-white/10"
      >
        <img
          src={images[selectedIndex]}
          alt="Product"
          className={cn(
            "w-full h-full object-cover transition-opacity duration-300",
            isFading ? "opacity-0" : "opacity-100"
          )}
        />

        {/* Arrows */}
        <button
          onClick={prev}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-black/50 backdrop-blur-md border border-white/20 rounded-full hover:bg-black/70 transition"
        >
          <ChevronLeft className="w-4 sm:w-6 h-4 sm:h-6" />
        </button>

        <button
          onClick={next}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-black/50 backdrop-blur-md border border-white/20 rounded-full hover:bg-black/70 transition"
        >
          <ChevronRight className="w-4 sm:w-6 h-4 sm:h-6" />
        </button>

        {/* Counter */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-2 bg-black/60 backdrop-blur-xl rounded-full border border-white/20 text-sm font-medium">
          {selectedIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-4">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => changeImage(idx)}
              className={cn(
                "relative aspect-square rounded-2xl overflow-hidden border-4 transition-all duration-300",
                selectedIndex === idx
                  ? "border-white ring-4 ring-white/30 shadow-2xl shadow-white/20 scale-95"
                  : "border-white/10 hover:border-white/40 hover:scale-105"
              )}
            >
              <img
                src={img}
                alt=""
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
              {selectedIndex === idx && (
                <div className="absolute inset-0 bg-white/20" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
