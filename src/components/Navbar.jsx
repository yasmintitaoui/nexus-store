// src/components/Navbar.jsx
import { ShoppingCart, Search, User } from "lucide-react";
import { logo } from "../constants";
import { useNavigate } from "react-router-dom";

export default function Navbar({ cartCount = 0, onCartOpen }) {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-2xl border-b border-white/10">
      <div className="max-w-5xl mx-auto px-6 py-5"> {/* ← NARROWER CONTAINER */}
        <div className="flex items-center justify-between">

          {/* LEFT: SMALLER LOGO (50% smaller than before) */}
          <button
            onClick={() => navigate("/")}
            className="group"
          >
            <img
              src={logo}
              alt="NEXUS"
              className="h-10 md:h-12 object-contain transition-all duration-500 
                         group-hover:scale-110 group-hover:drop-shadow-2xl"
            />
          </button>

          {/* RIGHT: Icons — tighter spacing */}
          <div className="flex items-center gap-6">
            <button className="text-white/80 hover:text-white transition">
              <Search className="w-5 h-5" />
            </button>
            <button className="text-white/80 hover:text-white transition">
              <User className="w-5 h-5" />
            </button>
            <button onClick={onCartOpen} className="relative text-white/80 hover:text-white transition">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-black text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-lg">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}