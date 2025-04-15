"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  boxItems: any[];
  orderItems: any[];
  cartItems: any[];
}

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0IiwiaWF0IjoxNzQ0NzA5MTczLCJleHAiOjE3NDQ3OTU1NzN9.I8W2cb21VlG2gAyvT_rWC9z56x9P8j2DRRBtColJqr4";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>(
          "http://localhost:8080/api/products",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProducts(response.data);
      } catch (err: any) {
        setError(err.message || "Erreur inconnue");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p className="text-center mt-5">Chargement des produits...</p>;
  if (error) return <p className="text-danger text-center mt-5">Erreur : {error}</p>;

  return (
    <div className="container py-5">
      <h1 className="display-5 fw-bold text-center mb-5">Nos Produits</h1>
      <div className="row g-4">
        {products.map((product) => (
          <div key={product.id} className="col-12 col-md-6 col-lg-4">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
