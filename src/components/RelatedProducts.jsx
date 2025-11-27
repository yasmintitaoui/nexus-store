import { useState } from "react";
import { ShoppingCart, Eye } from "lucide-react";

export default function RelatedProducts({ products }) {
const [visibleProducts, setVisibleProducts] = useState(products.slice(0, 6));

const loadMore = () => {
setVisibleProducts(products.slice(0, visibleProducts.length + 6));
};

return ( <div>
{/* Scrollable carousel on mobile */} <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 overflow-x-auto sm:overflow-x-visible snap-x snap-mandatory">
{visibleProducts.map((product, idx) => ( <div
         key={idx}
         className="relative bg-black/80 border border-white/20 rounded-2xl p-4 flex flex-col items-center group snap-start min-w-[200px]"
       > <img
           src={product.image}
           alt={product.name}
           className="w-full h-48 object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
         />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-4 rounded-2xl">
          <button className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition">
            <ShoppingCart className="w-5 h-5 text-white" />
          </button>
          <button className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition">
            <Eye className="w-5 h-5 text-white" />
          </button>
        </div>

        <h3 className="text-white font-semibold mt-4">{product.name}</h3>
        <span className="text-white/60">${product.price}</span>
      </div>
    ))}
  </div>

  {/* Load More Button */}
  {visibleProducts.length < products.length && (
    <div className="flex justify-center mt-6">
      <button
        onClick={loadMore}
        className="bg-white text-black py-2 px-6 rounded-xl font-bold hover:bg-white/90 transition"
      >
        Load More
      </button>
    </div>
  )}
</div>

);
}
