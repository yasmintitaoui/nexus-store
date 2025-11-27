// src/components/RelatedProducts.jsx

import { relatedProducts } from "../constants/index";

export default function RelatedProducts() {
  return (
    <div>
      <h2 className="text-4xl font-bold mb-8">You Might Also Like</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {relatedProducts.map((item, idx) => (
          <div
            key={idx}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden group cursor-pointer hover:border-white/30 transition"
          >
            <div className="aspect-square overflow-hidden bg-white/5">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
            </div>

            <div className="p-4">
              <h3 className="font-semibold mb-2">{item.name}</h3>
              <p className="text-xl font-bold">${item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
