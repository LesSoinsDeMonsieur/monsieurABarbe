"use client";
import Image from "next/image";
import styles from "./page.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import ListeProduits from "@/components/ListeProduits";
import ListeAbonnements from "@/components/ListeAbonnements";
import ListeAvis from "@/components/ListeAvis";

export default function Home() {
  const [lesAvis, setAvis] = useState<
    {
      logo: string;
      pseudo: string;
      notes: string;
      date: string;
      description: string;
    }[]
  >([
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

  const listAvis = lesAvis.map((avis, index) => (
    <div key={index} className={styles.avis}>
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
  ));

  return (
    <main className={styles.main}>
      <div className={styles.intro}>
        <h1>
          La box pensée <br />
          pour chaque <br />
          Monsieur à Barbe
        </h1>

        <div className={styles.ctas}>
          <a
            className={styles.primary}
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            JE LA VEUX
          </a>
        </div>
      </div>
      <h1>Nouveau mois, nouvel homme</h1>
      <div className={styles.decouverte}>
        {
          <Image
            className={styles.logo}
            src="/Produits-cosmetiques.jpg"
            alt="Vercel logomark"
            width={20}
            height={20}
          />
        }
        <div className={styles.contenu}>
          <p>
            La <strong>seule</strong> box pour barbe sur abonnement : l’élégance et le soin offerts
            chaque mois avec <strong>Monsieur à Barbe !</strong>
          </p>
          <p>
            Chaque mois, recevez une nouvelle box contenant des produits pour entretenir et prendre
            soin de votre barbe…
          </p>
          <a href="">JE DÉCOUVRE</a>
        </div>
      </div>
      <div className={styles.tutoriel}>
        <h1>Comment ça marche</h1>
        <div className={styles.etapes}>
          <div className={styles.etape}>
            {
              <Image
                className={styles.logo}
                src="/tuto_etape1.png"
                alt="Vercel logomark"
                width={200}
                height={200}
              />
            }
            <h2>1</h2>
            <p>Je choisis mon abonnement</p>
          </div>

          <div className={styles.etape}>
            {
              <Image
                className={styles.logo}
                src="/tuto_etape2.png"
                alt="Vercel logomark"
                width={300}
                height={300}
              />
            }
            <h2>2</h2>
            <p>Je reçois ma Box</p>
          </div>

          <div className={styles.etape}>
            {
              <Image
                className={styles.logo}
                src="/tuto_etape3.png"
                alt="Vercel logomark"
                width={200}
                height={200}
              />
            }
            <h2>3</h2>
            <p>Je découvre ce qu'on m'a préparé</p>
          </div>
        </div>
        <a href="">PLUS DE DÉTAILS</a>
      </div>
      <div className={styles.section_abonnements}>
        <h1> Nos offres d’abonnement </h1>
        <ListeAbonnements />
        <a href="">J'OFFRE UN ABONNEMENT</a>
        <div className={styles.section_avis}>
          <div className={styles.voir_tous_les_avis}>
            <h2>Les avis parlent d'eux-mêmes</h2>
            <p>Consultez les avis de nos clients avant de vous lancer</p>
            <a href="">VOIR TOUS LES AVIS</a>
          </div>
          <ListeAvis />
        </div>
      </div>
      <div className={styles.section_produits}>
        <h1>Dans vos box, retrouvez ces produits</h1>
        <ListeProduits />
        <div>
          <a href="" className={styles.voir_tous_les_produits}>
            VOIR TOUS LES PRODUITS
          </a>
        </div>
      </div>
    </main>
  );
}
