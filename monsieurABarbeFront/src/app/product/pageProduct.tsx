"use client";

import { useState } from "react";
import styles from "./product.module.css";
import Image from "next/image";

interface Product {
  product: {
    name: string;
    description: string;
    price: string;
    stock: string;
    imageUrl: string;
    image2: string;
    image3: string;
  };
}

export default function Product({ product }: Product) {
  const [mainImage, setMainImage] = useState(product.imageUrl);

  return (
    <div className={styles.fiche_produit}>
      <div className={styles.product}>
        <div className={styles.images}>
          <ul>
            {[product.imageUrl, product.image2, product.image3].map((img, idx) => (
              <li key={idx}>
                <button onClick={() => setMainImage(img)}>
                  <Image
                    className={styles.logos}
                    src={img}
                    alt={`Miniature ${idx + 1}`}
                    width={60}
                    height={60}
                  />
                </button>
              </li>
            ))}
          </ul>
          {
            <Image
              className={styles.logo}
              src={mainImage}
              alt="Vercel logomark"
              width={400}
              height={400}
            />
          }
        </div>
        <div className={styles.contenu}>
          <h3>{product.name}</h3>
          <div dangerouslySetInnerHTML={{ __html: product.description }} />
          <div className={styles.details}>
            <div>Prix : {product.price}</div>
            <div>Quantité restantes : {product.stock}</div>
          </div>
          <a className={styles.ajouter_panier} href="">
            AJOUTER AU PANIER
          </a>
        </div>
      </div>
    </div>
  );
}
