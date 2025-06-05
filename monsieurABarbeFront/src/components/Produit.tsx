import { useState } from "react";
import Image from "next/image";
import styles from "../app/page.module.css";
import Link from "next/link";

interface ProduitProps {
  produit: {
    imageUne: string;
    imageDeux: string;
    titre: string;
    prix: string;
    notes: string;
  };
}

export default function Produit({ produit }: ProduitProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className={styles.produit}>
      <Image
        className={styles.logo}
        src={hovered ? produit.imageDeux : produit.imageUne}
        alt={produit.titre}
        width={400}
        height={400}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ transition: "3s ease-in-out" }}
      />
      <Link href="/product">
        <strong>{produit.titre}</strong>
      </Link>
      <p>{produit.prix}</p>
      <div className={styles.note}>
        {"★".repeat(Number(produit.notes)) + "☆".repeat(5 - Number(produit.notes))}
      </div>
      <a href="" className={styles.ajout_panier}>
        AJOUTER AU PANIER
      </a>
    </div>
  );
}
