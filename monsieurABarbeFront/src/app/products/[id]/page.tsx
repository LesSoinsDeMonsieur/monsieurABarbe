"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Product from "@/types/product";

interface CartItem {
  id: number;
  quantity: number;
  product: Product;
}

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string | null>(null);

  // Récupère le token une fois que le composant est monté
  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    setToken(storedToken);
  }, []);

  // Récupère le produit
  useEffect(() => {
    if (!token) return;
    const fetchProduct = async () => {
      try {
        const response = await axios.get<Product>(`http://localhost:8080/api/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProduct(response.data);
      } catch (err) {
        console.error(err);
        setError("Erreur lors du chargement du produit");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, token]);

  // Récupère le panier
  const fetchCart = async () => {
    if (!token) return;
    try {
      const response = await axios.get(`http://localhost:8080/api/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(response.data?.cartItems || []);
    } catch (err) {
      console.error(err);
      console.error("Erreur lors du chargement du panier");
    }
  };

  useEffect(() => {
    if (token) fetchCart();
  }, [token]);

  const getCartItem = () => cartItems.find((item) => item.product.id === Number(id));

  const handleAddToCart = async () => {
    if (!product || !token) return;
    try {
      await axios.post(
        "http://localhost:8080/api/cart/add",
        { productId: product.id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      await fetchCart();
    } catch (err) {
      console.error(err);
      console.error("Erreur ajout au panier");
    }
  };

  const handleIncrement = async () => {
    if (!product || !token) return;
    try {
      await axios.post(
        "http://localhost:8080/api/cart/add",
        { productId: product.id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      await fetchCart();
    } catch (err) {
      console.error(err);
      console.error("Erreur increment");
    }
  };

  const handleDecrement = async () => {
    if (!product || !token) return;
    try {
      await axios.post(
        "http://localhost:8080/api/cart/decrement",
        { productId: product.id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      await fetchCart();
    } catch (err) {
      console.error(err);
      console.error("Erreur decrement");
    }
  };

  if (loading) return <div className="p-5 text-center">Chargement…</div>;
  if (error) return <div className="p-5 text-center text-danger">{error}</div>;
  if (!product) return <div className="p-5 text-center">Produit introuvable.</div>;

  const cartItem = getCartItem();

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

          {/* Affichage dynamique des boutons */}
          {cartItem ? (
            <div className="d-flex align-items-center gap-3">
              <button className="btn btn-outline-dark" onClick={handleDecrement}>
                –
              </button>
              <span className="fw-bold">{cartItem.quantity}</span>
              <button className="btn btn-outline-dark" onClick={handleIncrement}>
                +
              </button>
            </div>
          ) : (
            <button className="btn btn-dark px-4 py-2 fw-semibold" onClick={handleAddToCart}>
              Ajouter au panier
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
