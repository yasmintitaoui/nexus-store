// src/components/Reviews.jsx
import { Star } from "lucide-react";

export default function Reviews({ reviews }) {
  return (
    <div className="mb-24 text-white">
      <h2 className="text-4xl font-bold mb-10">Customer Reviews</h2>

      <div className="grid md:grid-cols-3 gap-8">
        {reviews.map((review, idx) => (
          <div
            key={idx}
            className="
              bg-white/5 
              backdrop-blur-xl 
              border border-white/10 
              rounded-2xl 
              p-6 
              shadow-[0_0_20px_rgba(255,255,255,0.05)]
              hover:border-white/20
              transition
            "
          >
            {/* Header (Avatar + Name + Date) */}
            <div className="flex items-center gap-4 mb-6">
              <div
                className="
                  w-12 h-12 
                  bg-white/10 
                  rounded-full 
                  flex items-center justify-center 
                  font-bold text-lg 
                  border border-white/20
                "
              >
                {review.name.charAt(0)}
              </div>

              <div>
                <div className="font-semibold text-white">{review.name}</div>
                <div className="text-sm text-white/40">{review.date}</div>
              </div>
            </div>

            {/* Stars */}
            <div className="flex mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < review.rating
                      ? "fill-white text-white"
                      : "text-white/20"
                  }`}
                />
              ))}
            </div>

            {/* Review Text */}
            <p className="text-white/80 leading-relaxed text-sm">
              {review.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
