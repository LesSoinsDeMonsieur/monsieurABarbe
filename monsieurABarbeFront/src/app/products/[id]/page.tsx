"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Product from "@/types/product";
import CartItem from "@/types/cartItem";
import { getProduct } from "@/api/products/products";
import { addItemToCart, decrementItemToCart, getCart } from "@/api/cart/cart";
import { LoginState, useAuth } from "@/contexts/AuthContext";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [mainImage, setMainImage] = useState<string | null>(null);
  const { userInfo } = useAuth();

  useEffect(() => {
    if (userInfo && userInfo.state == LoginState.LOGGED_IN) fetchCart();
  }, [userInfo]);

  // Récupère le produit
  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getProduct({ id: Number(id) });
      if (data) {
        setProduct(data);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Récupère le panier
  const fetchCart = async () => {
    const data = await getCart();
    if (data) setCartItems(data.cartItems || []);
    else {
    }
  };

  const getCartItem = () => cartItems.find((item) => item.product.id === Number(id));

  const handleAddToCart = async () => {
    if (!product) return;
    try {
      await addItemToCart({ product });
      await fetchCart();
    } catch (err) {
      console.error(err);
      console.error("Erreur ajout au panier");
    }
  };

  const handleDecrement = async () => {
    if (!product) return;
    try {
      await decrementItemToCart({ product });
      await fetchCart();
    } catch (err) {
      console.error(err);
      console.error("Erreur decrement");
    }
  };

  useEffect(() => {
    console.log(product);
    if (product?.images && product?.images[0]) {
      setMainImage(process.env.NEXT_PUBLIC_BACKEND_URL_IMAGE + product.images[0].filePath);
    }
  }, [product]);

  if (loading) return <div className="p-5 text-center">Chargement…</div>;
  // if (error) return <div className="p-5 text-center text-danger">{error}</div>;
  if (!product) return <div className="p-5 text-center">Produit introuvable.</div>;

  const cartItem = getCartItem();

  return (
    <div className="container py-5">
      <div className="row g-4">
        {/* Colonne image à gauche */}
        <div className="col-md-6">
          <div className="d-flex align-items-start gap-3">
            {/* Liste d’images miniatures */}
            <ul
              className="list-unstyled d-flex flex-column gap-2"
              style={{
                width: "80px", // largeur figée ici
                maxHeight: "500px",
                overflowY: "auto",
                flexShrink: 0, // empêche que ça se réduise
              }}
            >
              {product.images.map((image, idx) => (
                <li key={idx}>
                  <button
                    onClick={() =>
                      setMainImage(process.env.NEXT_PUBLIC_BACKEND_URL_IMAGE + image.filePath)
                    }
                    className="border-0 bg-transparent p-0"
                  >
                    <img
                      src={process.env.NEXT_PUBLIC_BACKEND_URL_IMAGE + image.filePath}
                      alt={product.name}
                      className="img-fluid rounded shadow"
                      style={{
                        height: "60px",
                        width: "60px",
                        objectFit: "cover",
                      }}
                    />
                  </button>
                </li>
              ))}
            </ul>

            {/* Image principale */}
            <img
              // src={process.env.NEXT_PUBLIC_BACKEND_URL_IMAGE + product.images[0].filePath}
              src={
                mainImage || product.images[0]
                  ? process.env.NEXT_PUBLIC_BACKEND_URL_IMAGE + product.images[0].filePath
                  : undefined
              }
              alt={product.name}
              className="img-fluid rounded shadow"
              style={{
                width: "100%",
                maxHeight: "500px",
                objectFit: "cover",
                flex: 1, // occupe l'espace restant
              }}
            />
          </div>
        </div>

        {/* Colonne texte à droite */}
        <div className="col-md-6">
          <h2 className="fw-bold mb-3">{product.name}</h2>
          <p className="text-muted mb-4">{product.description}</p>
          <h4 className="text-dark mb-3">{product.price.toFixed(2)} €</h4>
          <div className="mb-3 text-warning fs-4">{"★".repeat(5)}</div>
          <p className="text-muted mb-4">
            <b>Il ne reste plus que {product.stock} exemplaire(s) en stock.</b>
          </p>

          {cartItem ? (
            <div className="d-flex align-items-center gap-3">
              <button className="btn btn-outline-dark" onClick={handleDecrement}>
                –
              </button>
              <span className="fw-bold">{cartItem.quantity}</span>
              <button className="btn btn-outline-dark" onClick={handleAddToCart}>
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
