"use client";

import { getCart } from "@/api/cart/cart";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import Cart from "@/types/cart";
import { createStripeSession } from "@/api/stripe/stripe.api";
import Image from "next/image";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

export default function Page() {
  const [cart, setCart] = useState<Cart>();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    const data = await getCart();
    if (data) setCart(data);
  };
  const handlePay = async () => {
    const stripe = await stripePromise;

    const res = await createStripeSession();

    await stripe?.redirectToCheckout({ sessionId: res.sessionId });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        marginTop: "20px",
        flexDirection: "column",
        gap: "15px",
      }}
    >
      {!cart && <>Pas de panier</>}
      {cart && (
        <>
          {/* Récaptitulatif des articles */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              border: "solid",
              borderRadius: "5px",
              borderWidth: "1px",
              padding: "20px 40px",
            }}
          >
            <h4>Récapitulatif de vos articles</h4>
            {cart.cartItems.map((item, i) => (
              <div key={i}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <Image
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                    src={
                      item.product.images[0]
                        ? process.env.NEXT_PUBLIC_BACKEND_URL_IMAGE +
                          item.product.images[0].filePath
                        : ""
                    }
                    alt=""
                  />
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div>{item.product.name}</div>
                    <div>Quantité : {item.quantity}</div>
                    <div>Prix : {(item.product.price * item.quantity).toFixed(2)} €</div>
                  </div>
                </div>
                {/* Ligne de séparation sauf après le dernier item */}
                {i < cart.cartItems.length - 1 && (
                  <div style={{ borderBottom: "1px solid black", margin: "25px 0" }} key={i} />
                )}
              </div>
            ))}
          </div>
          {/* REGION */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              border: "solid",
              borderRadius: "5px",
              borderWidth: "1px",
              padding: "20px",
            }}
          >
            <h4>Livraison</h4>
          </div>
          {/* 💳 Formulaire de paiement */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handlePay();
            }}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              border: "1px solid black",
              borderRadius: "8px",
              padding: "20px",
              width: "100%",
              maxWidth: "600px",
            }}
          >
            <h3>Paiement</h3>
            <button type="submit">Payer</button>
          </form>
        </>
      )}
    </div>
  );
}
