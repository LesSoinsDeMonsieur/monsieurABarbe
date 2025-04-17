import Produit from "./Produit";
import styles from "../app/page.module.css";
import { useState } from "react";

interface ProduitType {
  imageUne: string;
  imageDeux: string;
  titre: string;
  prix: string;
  notes: string;
}

export default function ListeProduits() {
  const [produits, setProduit] = useState<ProduitType[]>([
    {
      imageUne: "/Produits-cosmetiques.jpg",
      imageDeux: "/banniere-1.png",
      titre: "Crème Hydratante Pour Barbe Burberry",
      prix: "9,90€",
      notes: "NOTES",
    },
    {
      imageUne: "/Produits-cosmetiques.jpg",
      imageDeux: "/banniere-1.png",
      titre: "Huile pour Barbe Solomon’s",
      prix: "12,90€",
      notes: "NOTES",
    },
    {
      imageUne: "/Produits-cosmetiques.jpg",
      imageDeux: "/banniere-1.png",
      titre: "Shampoing pour Barbe Burban",
      prix: "13,90€",
      notes: "NOTES",
    },
  ]);

  return (
    <div className={styles.produits}>
      {produits.map((produit, index) => (
        <Produit key={index} produit={produit} />
      ))}
    </div>
  );
}
