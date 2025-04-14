// components/ProductCard.tsx
"use client";

import React from "react";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div className="border p-4 rounded shadow-sm w-full max-w-sm">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-80 object-cover mb-4"
      />
      <h2 className="text-lg font-semibold mb-1">{product.name}</h2>
      <p className="text-md mb-1">{product.price.toFixed(2)} €</p>
      <div className="text-yellow-500 mb-3">
        {"★".repeat(5)}
      </div>
      <button className="border-2 border-black px-6 py-2 font-semibold hover:bg-black hover:text-white transition-all">
        AJOUTER AU PANIER
      </button>
    </div>
  );
};

export default ProductCard;
