// src/constants/index.js
import logo from "../assets/logo.png";

// Main product images
import black1 from "../assets/black/smartwatch-black-front.jpeg";
import black2 from "../assets/black/smartwatch-black-side.jpeg";
import black3 from "../assets/black/smartwatch-black-top.jpeg";
import black4 from "../assets/black/smartwatch-black-wrist.jpeg";

import white1 from "../assets/white/smartwatch-white-front.jpeg";
import white2 from "../assets/white/smartwatch-white-side.jpeg";
import white3 from "../assets/white/smartwatch-white-top.jpeg";
import white4 from "../assets/white/smartwatch-white-wrist.jpeg";

import blue1 from "../assets/blue/smartwatch-blue-front.jpeg";
import blue2 from "../assets/blue/smartwatch-blue-side.jpeg";
import blue3 from "../assets/blue/smartwatch-blue-top.jpeg";
import blue4 from "../assets/blue/smartwatch-blue-wrist.jpeg";

// YOUR REAL ACCESSORY IMAGES (add these files to src/assets/)
import earbuds from "../assets/earbuds.jpeg";
import phoneCase from "../assets/phone-case.jpeg";
import chargingDock from "../assets/charging-dock.jpeg";
import screenGuard from "../assets/screen-guard.jpeg";

export { logo };

export const product = {
  name: "NEXUS Pro Smartwatch",
  price: 599,
  originalPrice: 899,
  rating: 4.9,
  reviews: 2847,
  colors: ["black", "white", "blue"],
  sizes: ["S", "M", "L", "XL"],
  images: {
    black: [black1, black2, black3, black4],
    white: [white1, white2, white3, white4],
    blue: [blue1, blue2, blue3, blue4],
  }
};

export const relatedProducts = [
  { name: "NEXUS Earbuds Pro", price: 249, image: earbuds },
  { name: "NEXUS Phone Case", price: 49, image: phoneCase },
  { name: "NEXUS Charging Dock", price: 129, image: chargingDock },
  { name: "NEXUS Screen Guard", price: 29, image: screenGuard },
];

export const reviews = [
  { name: "Alex Johnson", rating: 5, text: "Absolutely incredible product. The build quality is exceptional and the features are next-level.", date: "2 days ago" },
  { name: "Sarah Chen", rating: 5, text: "Best purchase this year. Sleek design, amazing performance, and the battery life is outstanding.", date: "1 week ago" },
  { name: "Michael Rodriguez", rating: 4, text: "Great product overall. Minor learning curve but worth every penny once you get used to it.", date: "2 weeks ago" },
];