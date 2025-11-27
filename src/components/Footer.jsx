// src/components/Footer.jsx
import { logo } from "../constants";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-16 px-6 bg-black">
      <div className="max-w-7xl mx-auto text-center">

        {/* Your Logo — Bigger & Centered */}
        <div className="mb-10">
          <img 
            src={logo} 
            alt="NEXUS" 
            className="h-16 mx-auto drop-shadow-2xl"
          />
        </div>

        {/* Tagline */}
        <p className="text-white/40 text-lg mb-12 tracking-wide">
          Premium technology, exceptional design
        </p>

        {/* Links */}
        <div className="flex justify-center gap-12 mb-12">
          {["About", "Support", "Privacy", "Terms"].map((link) => (
            <button
              key={link}
              className="text-white/50 hover:text-white text-sm font-medium tracking-wider transition-all duration-300 hover:translate-y-[-2px]"
            >
              {link}
            </button>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-white/30 text-xs tracking-widest">
          © 2025 NEXUS. ALL RIGHTS RESERVED.
        </div>

      </div>
    </footer>
  );
}