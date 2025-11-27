// src/components/ProductGallery.jsx
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProductGallery({ images, selectedImage, setSelectedImage }) {
  if (!images || images.length === 0) return null;

  return (
    <div className="space-y-6">
      {/* Main Image */}
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-black/20 backdrop-blur-md border border-white/10 shadow-2xl group">
        <img
          src={images[selectedImage]}
          alt="Product"
          className="w-full h-full object-cover transition duration-500 group-hover:scale-[1.02]"
        />

        {/* Navigation Arrows */}
        <button
          onClick={() => setSelectedImage((i) => (i - 1 + images.length) % images.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 backdrop-blur-md border border-white/20 rounded-full shadow-lg hover:bg-black/70 transition opacity-0 group-hover:opacity-100"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>

        <button
          onClick={() => setSelectedImage((i) => (i + 1) % images.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 backdrop-blur-md border border-white/20 rounded-full shadow-lg hover:bg-black/70 transition opacity-0 group-hover:opacity-100"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-4">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setSelectedImage(i)}
            className={`aspect-square rounded-xl overflow-hidden bg-black/20 backdrop-blur-md border transition-all duration-200 shadow-md 
              ${
                selectedImage === i
                  ? "border-white shadow-white/20 scale-[0.95]"
                  : "border-white/10 hover:border-white/30"
              }`}
          >
            <img
              src={img}
              alt=""
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
