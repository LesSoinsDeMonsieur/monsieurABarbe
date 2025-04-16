"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Cart from "@/types/cart";
import CartItem from "@/types/cartItem";

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    setToken(storedToken);
  }, []);

  useEffect(() => {
    if (!token) return;

    const fetchCart = async () => {
      try {
        const response = await axios.get<Cart>("http://localhost:8080/api/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCartItems(Array.from(response.data.cartItems));
      } catch (err) {
        console.error(err);
        setError("Impossible de récupérer le panier.");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [token]);

  const handleRemoveItem = async (itemId: number) => {
    if (!token) return;

    try {
      await axios.delete(`http://localhost:8080/api/cart/remove/${itemId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    } catch (err) {
      console.error("Erreur lors de la suppression de l'article", err);
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
  };

  if (loading) return <div className="p-5 text-center">Chargement du panier...</div>;
  if (error) return <div className="p-5 text-center text-danger">{error}</div>;

  return (
    <div className="container py-5">
      <h2 className="mb-4">Votre panier</h2>

      {cartItems.length === 0 ? (
        <div className="alert alert-info">Votre panier est vide.</div>
      ) : (
        <>
          <div className="row g-3">
            {cartItems.map((item) => (
              <div className="col-md-6" key={item.id}>
                <div className="card p-3 shadow-sm h-100 d-flex flex-row">
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="rounded"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                  />
                  <div className="ms-3 flex-grow-1">
                    <h5 className="mb-1">{item.product.name}</h5>
                    <p className="mb-1">Quantité : {item.quantity}</p>
                    <p className="mb-2">
                      Prix total : {(item.product.price * item.quantity).toFixed(2)} €
                    </p>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <h4>Total : {getTotalPrice().toFixed(2)} €</h4>
            <button className="btn btn-success mt-3">Procéder au paiement</button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
