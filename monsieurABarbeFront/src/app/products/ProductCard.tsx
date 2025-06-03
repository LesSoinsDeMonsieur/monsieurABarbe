"use client";

import React from "react";
import Link from "next/link";
import Product from "@/types/product";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link href={`/products/${product.id}`} className="text-decoration-none text-dark">
      <div className="card h-100 shadow-sm border-0">
        <img
          src={process.env.NEXT_PUBLIC_BACKEND_URL_IMAGE + product.images[0].filePath}
          alt={product.name}
          className="card-img-top"
          style={{ height: "250px", objectFit: "cover" }}
        />
        <div className="card-body d-flex flex-column justify-content-between">
          <div>
            <h5 className="card-title fw-bold text-center">{product.name}</h5>
            <p className="card-text text-center text-muted">{product.price.toFixed(2)} €</p>
            <div className="text-warning text-center fs-5 mb-2">{"★".repeat(5)}</div>
          </div>
          <div className="text-center">
            <span className="btn btn-outline-dark mt-2 fw-semibold">VOIR LE PRODUIT</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
