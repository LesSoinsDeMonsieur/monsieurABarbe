import Abonnement from "./Abonnement";
import styles from "../app/page.module.css";
import { useState } from "react";

interface AbonnementType {
  titre: string;
  description: string;
  texteBouton: string;
}

export default function ListeAbonnements() {
  const [abonnements, setAbonnement] = useState<AbonnementType[]>([
    {
      titre: "35,90€ / mois",
      description: "- Sans engagement (résiliable à tout moment)",
      texteBouton: "JE LA VEUX",
    },
    {
      titre: "35,90€ / mois",
      description: "- Sans engagement (résiliable à tout moment)",
      texteBouton: "JE LA VEUX",
    },
    {
      titre: "35,90€ / mois",
      description: "- Sans engagement (résiliable à tout moment)",
      texteBouton: "JE LA VEUX",
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
