import React from "react";
import Link from "next/link";
import Image from "next/image";
import style from "./footer.module.css";

function Footer() {
  return (
    <div className={style.footer}>
      <div className={style.image}>
        <Image
          src="/logoWhite.png"
          alt="Logo Monsieur à Barbe"
          width={268}
          height={60}
          className={style.logo}
        />
      </div>
      <div className={style.footerContent}>
        <div className={style.APropos}>
          <div className={style.titre}>
            <h2>À Propos</h2>
            <div className={style.ligne}></div>
          </div>
          <div className={style.liste}>
            <Link href="/contact" className={style.contact}>
              Contact
            </Link>
            <Link href="/blog" className={style.blog}>
              Blog
            </Link>
            <Link href="/faq" className={style.faq}>
              FAQ
            </Link>
            <Link href="/CGV" className={style.CGV}>
              CGV & Mentions Légales
            </Link>
            <Link href="/paiements-securises" className={style.paiementsSecurises}>
              Paiements Sécurisés
            </Link>
          </div>
        </div>
        <div className={style.Explorer}>
          <div className={style.titre}>
            <h2>Explorer</h2>
            <div className={style.ligne}></div>
          </div>
          <div className={style.liste}>
            <Link href="/box" className={style.box}>
              Box
            </Link>
            <Link href="/Shop" className={style.Shop}>
              Shop
            </Link>
            <Link href="/Offrir" className={style.Offrir}>
              Offrir
            </Link>
            <Link href="/Concept" className={style.Concept}>
              Notre Concept
            </Link>
            <Link href="/Marques" className={style.Marques}>
              Nos Marques Partenaires
            </Link>
          </div>
        </div>
        <div className={style.NousSuivre}>
          <div className={style.titre}>
            <h2>Nous suivre</h2>
            <div className={style.ligne}></div>
          </div>
          <div className={style.icones}>
            <Link href="https://www.facebook.com/profile.php?id=61567811841372&locale=fr_FR">
              <Image src="/facebook.png" alt="Facebook" width={24} height={24} />
            </Link>
            <Link href="https://www.instagram.com/monsieur_a_barbe/">
              <Image src="/instagram.png" alt="Instagram" width={24} height={24} />
            </Link>
            <Link href="https://www.tiktok.com/monsieurabarbe/" target="_blank">
              <Image src="/tiktok.png" alt="tiktok" width={24} height={24} />
            </Link>
            <Link href="https://www.linkedin.com/monsieurabarbe/">
              <Image src="/linkedin.png" alt="linkedin" width={24} height={24} />
            </Link>
          </div>
        </div>
        <div className={style.Newsletter}>
          <div className={style.titre}>
            <h2>Rejoignez les messieurs à barbe</h2>
            <div className={style.ligne}></div>
          </div>
          <div className={style.description}>
            <p className={style.descriptionText}>
              Pour recevoir des surprises dans votre boîte aux lettres tous les mois, rejoignez
              Monsieur à Barbe.
            </p>
            <form className={style.newsletterForm}>
              <input
                type="text"
                name="nom"
                placeholder="Nom et prénom"
                className={style.inputField}
              />
              <input type="email" name="email" placeholder="Email" className={style.inputField} />
              <button type="submit" className={style.submitButton}>
                S&apos;inscrire
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
