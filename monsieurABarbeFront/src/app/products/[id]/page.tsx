// src/app/products/[id]/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
}

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0IiwiaWF0IjoxNzQ0NzA5MTczLCJleHAiOjE3NDQ3OTU1NzN9.I8W2cb21VlG2gAyvT_rWC9z56x9P8j2DRRBtColJqr4";

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get<Product>(
          `http://localhost:8080/api/products/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProduct(response.data);
      } catch (err: any) {
        setError("Erreur lors du chargement du produit");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div className="p-5 text-center">Chargement...</div>;
  if (error) return <div className="p-5 text-center text-danger">{error}</div>;
  if (!product) return <div className="p-5 text-center">Produit introuvable.</div>;

  return (
    <div className="container py-5">
      <div className="row g-4">
        <div className="col-md-6">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="img-fluid rounded shadow"
            style={{ maxHeight: "500px", objectFit: "cover" }}
          />
        </div>
        <div className="col-md-6">
          <h2 className="fw-bold mb-3">{product.name}</h2>
          <p className="text-muted mb-4">{product.description}</p>
          <h4 className="text-dark mb-3">{product.price.toFixed(2)} €</h4>
          <div className="mb-3 text-warning fs-4">{"★".repeat(5)}</div>
          <button className="btn btn-dark px-4 py-2 fw-semibold">Ajouter au panier</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
