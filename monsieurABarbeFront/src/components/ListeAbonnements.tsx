import Abonnement from "./Abonnement";
import styles from "../app/page.module.css";
import { useState } from "react";

interface AbonnementType {
  titre: string;
  description: string;
  texteBouton: string;
}

export default function ListeAbonnements() {
  const [abonnements, _] = useState<AbonnementType[]>([
    {
      titre: "35,90€ / mois",
      description: "- Sans engagement (résiliable à tout moment)\n ",
      texteBouton: "JE LA VEUX",
    },
    {
      titre: "35,90€ / mois",
      description: "- Engagement 3 mois\n ",
      texteBouton: "JE LA VEUX",
    },
    {
      titre: "lre box offerte",
      description: "- Puis 35,90€/mois\n- Engagement 12 mois",
      texteBouton: "J'EN PROFITE",
    },
  ]);

  return (
    <div className={styles.abonnements}>
      {abonnements.map((abonnement, index) => (
        <Abonnement key={index} abonnement={abonnement} />
      ))}
    </div>
  );
}
