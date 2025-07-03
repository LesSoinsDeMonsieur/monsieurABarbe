"use client";

import Image from "next/image";
import styles from "./offrir.module.css";
import ListeAbonnements from "@/components/ListeAbonnements";

export default function Offrir() {
  return (
    <div style={{ backgroundColor: "white", fontFamily: "sans-serif" }}>
      {/* Haut - Bandeau gris avec image de fond */}
      <div
        style={{
          backgroundImage: "url('/Box-Produits-Barbe.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          padding: "40px",
          color: "black",
          justifyContent: "space-between",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <div style={{ maxWidth: "600px", flex: "1 1 300px" }}>
          <h1 style={{ fontSize: "2rem", fontStyle: "italic", marginBottom: "1rem" }}>
            La Box l’Essentiel du Barbu,
            <br />
            <span style={{ fontStyle: "normal", fontWeight: "bold" }}>c’est le CADEAU idéal</span>
          </h1>
          <p>
            3 Formules aux choix.
            <br />
            Offrez bien plus qu’une simple box de produits,
            <br />
            Offrez une expérience mensuelle unique.
          </p>
          <button
            style={{
              marginTop: "1rem",
              padding: "10px 20px",
              backgroundColor: "black",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "1rem",
            }}
          >
            OFFRIR
          </button>
        </div>
      </div>

      {/* Partie centrale - grille responsive */}
      <div className={styles.gridContainer}>
        {/* Coin haut gauche */}
        <div style={{ gridColumn: 1, gridRow: 1, textAlign: "center" }}>
          <h3>
            <strong>Pour toutes les occasions :</strong>
          </h3>
          <p>
            <em>Anniversaire, Noël, fête des pères, ou simplement pour faire plaisir</em>
          </p>
          <Image
            className={styles.arrowLarge}
            src="/arrow-up-left.png"
            alt="arrow up left"
            width={70}
            height={70}
            priority
          />
        </div>

        {/* Haut centre - flèche vers le bas */}
        <div style={{ gridColumn: 2, gridRow: 3, textAlign: "center" }}>
          <Image
            className={styles.arrowLarge}
            src="/arrow-down.png"
            alt="arrow down"
            width={40}
            height={40}
            priority
          />
        </div>

        {/* Coin haut droit */}
        <div style={{ gridColumn: 3, gridRow: 1, textAlign: "center" }}>
          <h3>
            <strong>Un cadeau flexible et sans contraintes :</strong>
          </h3>
          <p>
            <em>
              Pas sûr de ses goûts exacts ? Bonne nouvelle.{" "}
              <span style={{ color: "blue" }}>
                Chaque mois, il découvrira de nouveaux produits variés et de qualité
              </span>
            </em>
          </p>

          <Image
            className={styles.arrowLarge}
            src="/arrow-up-right.png"
            alt="arrow up right"
            width={70}
            height={70}
            priority
          />
        </div>

        {/* Centre - bloc principal */}
        <div style={{ gridColumn: 2, gridRow: 2, textAlign: "center" }}>
          <h2>
            <strong>Une attention qui fait la différence</strong>
          </h2>
        </div>

        {/* Coin bas centre */}
        <div style={{ gridColumn: 2, gridRow: 4, textAlign: "center" }}>
          <h3>
            <strong>Un cadeau qui dure :</strong>
          </h3>
          <p>
            <em>Un effet ‘waouh’ dure tout au long de l’abonnement</em>
          </p>
        </div>

        {/* Coin bas gauche */}
        <div style={{ gridColumn: 1, gridRow: 3, textAlign: "center" }}>
          <Image
            className={styles.arrowLarge}
            src="/arrow-down-left.png"
            alt="arrow down left"
            width={70}
            height={70}
            priority
          />
          <h3>
            <strong>Pour tous les barbus :</strong>
          </h3>
          <p>
            <em>Pour les débutants, amateurs ou expert des soins de barbe</em>
          </p>
        </div>

        {/* Coin bas droit */}
        <div style={{ gridColumn: 3, gridRow: 3, textAlign: "center" }}>
          <Image
            className={styles.arrowLarge}
            src="/arrow-down-right.png"
            alt="arrow down right"
            width={70}
            height={70}
            priority
          />
          <h3>
            <strong>Le meilleur des marques :</strong>
          </h3>
          <p>
            <em>Des produits d’excellence, haut de gamme et naturels</em>
          </p>
        </div>
      </div>

      {/* Section tutoriel */}
      <div className={styles.tutoriel}>
        <h1>Comment ça marche</h1>
        <div className={styles.etapes}>
          <div className={styles.etape}>
            <Image
              className={styles.logo}
              src="/tuto_etape1.png"
              alt="Étape 1"
              width={200}
              height={200}
              priority
            />
            <h2>1</h2>
            <p>Je choisis mon abonnement</p>
          </div>

          <div className={styles.etape}>
            <Image
              className={styles.logo}
              src="/tuto_etape2.png"
              alt="Étape 2"
              width={200}
              height={200}
              priority
            />
            <h2>2</h2>
            <p>Je reçois ma Box</p>
          </div>

          <div className={styles.etape}>
            <Image
              className={styles.logo}
              src="/tuto_etape3.png"
              alt="Étape 3"
              width={200}
              height={200}
              priority
            />
            <h2>3</h2>
            <p>Je découvre ce qu’on m’a préparé</p>
          </div>
        </div>
        <a href="">PLUS DE DÉTAILS</a>
      </div>

      {/* Section abonnements */}
      <div className={styles.section_abonnements}>
        <h1> Nos offres d’abonnement </h1>
        <ListeAbonnements />
        <a href="">J’OFFRE UN ABONNEMENT</a>
      </div>
    </div>
  );
}
