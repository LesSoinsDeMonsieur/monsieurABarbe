import { useState } from "react";
import styles from "../app/page.module.css";

interface AbonnementProps {
  abonnement: {
    titre: string;
    description: string;
    texteBouton: string;
  };
}

export default function Abonnement({ abonnement }: AbonnementProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className={styles.abonnement}>
      <div className={styles.contenu}>
        <h2>
          <strong> {abonnement.titre} </strong>
        </h2>
        <p>{abonnement.description}</p>
        <a href="">{abonnement.texteBouton}</a>
      </div>
    </div>
  );
}
