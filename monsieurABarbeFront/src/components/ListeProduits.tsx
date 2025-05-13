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
  const [produits] = useState<ProduitType[]>([
    {
      imageUne: "/Gel-douche-burberry-1.jpeg",
      imageDeux: "/Gel-douche-burberry-2.jpg",
      titre: "Crème Hydratante Pour Barbe Burberry",
      prix: "9,90€",
      notes: "3",
    },
    {
      imageUne: "/huile-de-barbe-2.jpg",
      imageDeux: "/huile-de-barbe-4.jpg",
      titre: "Huile pour Barbe Solomon’s",
      prix: "12,90€",
      notes: "5",
    },
    {
      imageUne: "/Shampoing-Barbe-2.jpg",
      imageDeux: "/Shampoing-Barbe-1.jpg",
      titre: "Shampoing pour Barbe Burban",
      prix: "13,90€",
      notes: "4",
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
