// src/components/Navbar.jsx
import { ShoppingCart, Search, User } from "lucide-react";
import { logo } from "../constants";

export default function Navbar({ cartCount, onCartOpen }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-white/10">
      <div className="w-full max-w-screen-2xl mx-auto px-6 py-5 flex justify-between items-center h-20">

        {/* BIGGER LOGO + SMOOTH HOVER ZOOM */}
        <div className="flex justify-start flex-1">
          <button className="block focus:outline-none">
            <img 
              src={logo} 
              alt="NEXUS" 
              className="h-14 object-contain transition-transform duration-500 ease-out hover:scale-110"
            />
          </button>
        </div>

        {/* TINY CLEAN ICONS — NO HOVER */}
        <div className="flex items-center gap-8">
          <button className="text-white">
            <Search className="w-5 h-5" />
          </button>
          <button className="text-white">
            <User className="w-5 h-5" />
          </button>
          <button onClick={onCartOpen} className="text-white relative">
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-white text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}