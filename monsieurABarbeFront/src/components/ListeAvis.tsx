import Avis from "./Avis";
import styles from "../app/page.module.css";
import { useState } from "react";

interface AvisType {
  logo: string;
  pseudo: string;
  notes: string;
  date: string;
  description: string;
}

export default function ListeAvis() {
  const [lesAvis] = useState<AvisType[]>([
    {
      logo: "/Produits-cosmetiques.jpg",
      pseudo: "Marc Leberch",
      notes: "NOTES",
      date: "novembre 28, 2024",
      description:
        "Une super surprise à chaque fois que je reçois ma box. On sent que les produits sont sélectionnés avec soin. Un vrai must pour les barbus !",
    },
    {
      logo: "/Produits-cosmetiques.jpg",
      pseudo: "Marc Leberch",
      notes: "NOTES",
      date: "novembre 28, 2024",
      description:
        "Une super surprise à chaque fois que je reçois ma box. On sent que les produits sont sélectionnés avec soin. Un vrai must pour les barbus !",
    },
    {
      logo: "/Produits-cosmetiques.jpg",
      pseudo: "Marc Leberch",
      notes: "NOTES",
      date: "novembre 28, 2024",
      description:
        "Une super surprise à chaque fois que je reçois ma box. On sent que les produits sont sélectionnés avec soin. Un vrai must pour les barbus !",
    },
  ]);

  return (
    <div className={styles.liste_avis}>
      {lesAvis.map((avis, index) => (
        <Avis key={index} avis={avis} />
      ))}
    </div>
  );
}
