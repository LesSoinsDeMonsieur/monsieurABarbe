"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import Product from "@/types/product";
import axiosI from "@/axiosInterceptor";

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        axiosI
          .get("http://localhost:8080/api/products", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            setProducts(response.data);
          })
          .catch((error) => {
            console.error("Erreur lors de la récupération des produits :", error);
          });
      } catch (err) {
        console.error(err);
        const error = err as Error;
        setError(error.message || "Erreur inconnue");
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
