"use client";
import Image from "next/image";
import styles from "./offrir.module.css";
import ListeAbonnements from "@/components/ListeAbonnements";

export default function Offrir() {
  return (
    <div style={{ backgroundColor: "white", fontFamily: "sans-serif" }}>
      {/* Haut - Bandeau gris */}
      <div
        style={{
          backgroundImage: "url('/Box-Produits-Barbe.jpg')",
          display: "flex",
          padding: "40px",
          color: "black",
          justifyContent: "space-between",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <div style={{ maxWidth: "600px" }}>
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
            }}
          >
            OFFRIR
          </button>
        </div>
      </div>

      {/* Partie centrale */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gridTemplateRows: "1fr auto 1fr",
          margin: "100px auto",
          position: "relative",
          gap: "40px",
          paddingRight: "10%",
          paddingLeft: "10%",
        }}
      >
        {/* Coin haut gauche */}
        <div style={{ gridColumn: 1, gridRow: 1, textAlign: "center" }}>
          <h3>
            <strong>Pour toutes les occasions :</strong>
          </h3>
          <p>
            <em>Anniversaire, Noël, fête des pères, ou simplement pour faire plaisir</em>
          </p>
          <img
            src="/arrow-up-left.png"
            alt="arrow down left"
            style={{ width: "70px", height: "auto" }}
          />
        </div>

        {/* Haut centre - flèche vers le bas */}
        <div style={{ gridColumn: 2, gridRow: 3, textAlign: "center" }}>
          <img src="/arrow-down.png" alt="arrow down" style={{ width: "40px", height: "auto" }} />
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

          <img
            src="/arrow-up-right.png"
            alt="arrow down left"
            style={{ width: "70px", height: "auto" }}
          />
        </div>

        {/* Centre - bloc principal */}
        <div style={{ gridColumn: "2", gridRow: "2", textAlign: "center" }}>
          <h2>
            <strong>Une attention qui fait la différence</strong>
          </h2>
        </div>

        {/* Coin bas centre */}
        <div style={{ gridColumn: "2", gridRow: "4", textAlign: "center" }}>
          <h3>
            <strong>Un cadeau qui dure :</strong>
          </h3>
          <p>
            <em>Un effet ‘waouh’ dure tout au long de l’abonnement</em>
          </p>
        </div>

        {/* Coin bas gauche */}
        <div style={{ gridColumn: 1, gridRow: 3, textAlign: "center" }}>
          <img
            src="/arrow-down-left.png"
            alt="arrow down left"
            style={{ width: "70px", height: "auto" }}
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
          <img
            src="/arrow-down-right.png"
            alt="arrow down right"
            style={{ width: "70px", height: "auto" }}
          />
          <h3>
            <strong>Le meilleur des marques :</strong>
          </h3>
          <p>
            <em>Des produits d’excellence, haut de gamme et naturels</em>
          </p>
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
            <p>Je découvre ce qu’on m’a préparé</p>
          </div>
        </div>
        <a href="">PLUS DE DÉTAILS</a>
      </div>

      <div className={styles.section_abonnements}>
        <h1> Nos offres d’abonnement </h1>
        <ListeAbonnements />
        <a href="">J’OFFRE UN ABONNEMENT</a>
      </div>
    </div>
  );
}
