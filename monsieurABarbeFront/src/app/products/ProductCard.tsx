"use client";

import React from "react";
import Link from "next/link";
import Product from "@/types/product";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link href={`/products/${product.id}`} className="text-decoration-none text-dark">
      <div className="card h-100 shadow-sm border-0">
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: 250, width: "100%", overflow: "hidden", background: "#f8f9fa" }}
        >
          <Image
            src={
              product.images[0]
                ? process.env.NEXT_PUBLIC_BACKEND_URL_IMAGE + product.images[0].filePath
                : "/image.png"
            }
            alt={product.name}
            width={300}
            height={250}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
            }}
          />
        </div>
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
