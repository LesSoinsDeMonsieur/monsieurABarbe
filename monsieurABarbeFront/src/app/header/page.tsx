"use client";
import Link from "next/link";
import Image from "next/image";
import styles from "./header.module.css";
import { useState } from "react";
function Header() {
  const [ongletsMilieu /*, setongletsMilieu*/] = useState<
    { nom: string; url: string }[]
  >([
    { nom: "Box", url: "/Box" },
    { nom: "Shop", url: "/Shop" },
    { nom: "Offrir", url: "/Offrir" },
    { nom: "Notre concept", url: "/Notre-concept" },
    { nom: "Marques partenaires", url: "/Marques-partenaires" },
    { nom: "Contact", url: "/Contact" },
    { nom: "Blog", url: "/Blog" },
  ]);
  const [texteBandeau /*, settexteBandeau*/] = useState<string>(
    "Livraison offerte sur tous les abonnements à une box"
  );

  const [imgDroit /*, setimgDroit*/] = useState<
    { chemin: string; url: string }[]
  >([
    { chemin: "/user.png", url: "/profile" },
    { chemin: "/bag.png", url: "/panier" },
  ]);

  const bandeau = (
    <div className={styles.bandeau}>
      <p className={styles.bandeauTexte}>{texteBandeau}</p>
    </div>
  );

  const headerGauche = (
    <Link href="/">
      <Image
        src="/logo.png"
        alt="Logo"
        className={styles.logo}
        width={185}
        height={40}
      />
    </Link>
  );

  const headerMilieu = ongletsMilieu.map((onglet, index) => (
    <div key={index} className={styles.navItem}>
      <Link href={onglet.url} className={styles.boutonHeaderMilieu}>
        {onglet.nom}
      </Link>
    </div>
  ));

  const headerDroit = imgDroit.map((img, index) => (
    <div key={index} className={styles.HeaderDroitObjet}>
      <Link href={img.url}>
        <Image
          src={img.chemin}
          alt="Logo"
          className={styles.logoIcon}
          width={48}
          height={48}
        />
      </Link>
    </div>
  ));

  return (
    <div>
      {bandeau}
      <div className={styles.header}>
        <div className={styles.headerGauche}>{headerGauche}</div>
        <div className={styles.headerMilieu}>{headerMilieu}</div>
        <div className={styles.headerDroit}>{headerDroit}</div>
      </div>
    </div>
  );
}

export default Header;
