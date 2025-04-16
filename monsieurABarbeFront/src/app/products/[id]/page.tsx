"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Product from "@/types/product";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [addToCartError, setAddToCartError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Récupère le token une fois que le composant est monté
  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    setToken(storedToken);
  }, []);

  useEffect(() => {
    if (!token) return;

    const fetchProduct = async () => {
      try {
        const response = await axios.get<Product>(`http://localhost:8080/api/products/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProduct(response.data);
      } catch (err) {
        console.log(err);
        setError("Erreur lors du chargement du produit");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, token]);

  const handleAddToCart = async () => {
    if (!product || !token) return;

    try {
      await axios.post(
        "http://localhost:8080/api/cart/add",
        {
          productId: product.id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      setSuccessMessage("Produit ajouté au panier !");
      setAddToCartError(null);
    } catch (err) {
      console.error(err);
      setAddToCartError("Impossible d'ajouter le produit au panier.");
      setSuccessMessage(null);
    }
  };

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

          {successMessage && <div className="alert alert-success py-2">{successMessage}</div>}
          {addToCartError && <div className="alert alert-danger py-2">{addToCartError}</div>}

          <button className="btn btn-dark px-4 py-2 fw-semibold" onClick={handleAddToCart}>
            Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
