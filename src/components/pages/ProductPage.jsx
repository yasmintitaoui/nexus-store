// src/components/pages/ProductPage.jsx
import { useState } from "react";

// Components
import ProductGallery from "../ProductGallery";
import ProductInfo from "../ProductInfo";
import Reviews from "../Reviews";
import RelatedProducts from "../RelatedProducts";

// Data
import { product, reviews, relatedProducts } from "../../constants";

export default function ProductPage({ addToCart }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("black");
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);

  // Dynamically update gallery based on selected color
  const currentImages = product.images[selectedColor] || [];

  const handleAddToCart = () => {
    addToCart({
      id: Date.now(),
      name: product.name,
      price: product.price,
      image: currentImages[0],
      selectedColor,
      selectedSize,
      quantity,
    });
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-16 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Product Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-24">
          <ProductGallery
            images={currentImages}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
          />

          <ProductInfo
            product={product}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            quantity={quantity}
            setQuantity={setQuantity}
            liked={liked}
            setLiked={setLiked}
            addToCart={handleAddToCart}
          />
        </div>

        {/* Reviews */}
        <Reviews reviews={reviews} />

        {/* Related Products */}
        <div className="mt-32">
          <RelatedProducts products={relatedProducts} />
        </div>
      </div>
    </div>
  );
}
