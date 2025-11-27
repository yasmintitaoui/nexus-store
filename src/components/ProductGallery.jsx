// src/components/ProductGallery.jsx
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ZoomIn, X } from "lucide-react";
import { cn } from "../lib/utils";

export default function ProductGallery({ images = [] }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") setSelectedIndex(i => (i - 1 + images.length) % images.length);
      if (e.key === "ArrowRight") setSelectedIndex(i => (i + 1) % images.length);
      if (e.key === "Escape") setIsZoomed(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [images.length]);

  const prev = () => setSelectedIndex(i => (i - 1 + images.length) % images.length);
  const next = () => setSelectedIndex(i => (i + 1) % images.length);

  return (
    <>
      {/* Fullscreen Zoom */}
      {isZoomed && (
        <div
          className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-2xl flex items-center justify-center cursor-zoom-out"
          onClick={() => setIsZoomed(false)}
        >
          <img src={images[selectedIndex]} alt="Zoomed" className="max-w-full max-h-full object-contain" />
          <button className="absolute top-8 right-8 p-4 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition">
            <X className="w-8 h-8" />
          </button>
        </div>
      )}

      <div className="space-y-8">
        {/* Main Image */}
        <div
          className="relative aspect-square rounded-3xl overflow-hidden bg-black/40 backdrop-blur-2xl border border-white/20 shadow-2xl shadow-white/10 group cursor-zoom-in transition-all duration-500"
          onClick={() => setIsZoomed(true)}
        >
          <img
            src={images[selectedIndex]}
            alt="Product"
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
          />

          {/* Zoom Hint */}
          <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center gap-2 bg-black/70 backdrop-blur-md px-5 py-3 rounded-full border border-white/30">
              <ZoomIn className="w-5 h-5" />
              <span className="text-sm font-medium">Click to zoom</span>
            </div>
          </div>

          {/* Arrows */}
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/10 backdrop-blur-xl border border-white/30 opacity-0 group-hover:opacity-100 hover:bg-white/20 hover:scale-110 transition-all duration-300"
          >
            <ChevronLeft className="w-7 h-7" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-6 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/10 backdrop-blur-xl border border-white/30 opacity-0 group-hover:opacity-100 hover:bg-white/20 hover:scale-110 transition-all duration-300"
          >
            <ChevronRight className="w-7 h-7" />
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
                onClick={() => setSelectedIndex(idx)}
                className={cn(
                  "relative aspect-square rounded-2xl overflow-hidden border-4 transition-all duration-300",
                  selectedIndex === idx
                    ? "border-white ring-4 ring-white/30 shadow-2xl shadow-white/20 scale-95"
                    : "border-white/10 hover:border-white/40 hover:scale-105"
                )}
              >
                <img src={img} alt="" className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                {selectedIndex === idx && <div className="absolute inset-0 bg-white/20" />}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}