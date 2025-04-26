import styles from "../app/page.module.css";
import Image from "next/image";

interface AvisProps {
  avis: {
    logo: string;
    pseudo: string;
    notes: string;
    date: string;
    description: string;
  };
}

export default function Avis({ avis: avis }: AvisProps) {
  return (
    <div className={styles.avis}>
      <div className={styles.entete}>
        <div className={styles.gauche}>
          {
            <Image
              className={styles.logo}
              src={avis.logo}
              alt="Vercel logomark"
              width={40}
              height={40}
            />
          }
        </div>
        <div className={styles.droite}>
          <div className={styles.auteur_note}>
            <p>{avis.pseudo}</p>
            <p>{avis.notes}</p>
          </div>
          <div className={styles.date}>
            <p>{avis.date}</p>
          </div>
        </div>
      </div>
      <div>
        <p>{avis.description}</p>
      </div>
    </div>
  );
}
