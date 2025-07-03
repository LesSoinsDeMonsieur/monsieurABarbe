"use client";
import Image from "next/image";
import styles from "./concept.module.css";
import Link from "next/link";

export default function Concept() {
  return (
    <main className={styles.main}>
      <h1>Monsieur à Barbe, l’alliance du style et du soin.</h1>
      <div className={styles.createur}>
        <div className={styles.image}>
          {
            <Image
              className={styles.logo}
              src="/Photo-du-createur-de-Monsieur-a-Barbe.jpg"
              alt="Vercel logomark"
              width={280}
              height={325}
            />
          }
        </div>
        <div className={styles.contenu}>
          <h2>Qui ce cache derrière ce concept ?</h2>
          <p>
            Un Monsieur à Barbe, évidemment ! C’est le surnom qu’un petit bonhomme m’a donné un jour
            (d’où le nom de la marque).
          </p>
          <p>
            Inspiré par ce moment, j’ai eu l’idée de créer un projet dédié à la barbe et à ceux qui
            en prennent soin ou qui veulent le faire mais ne savent pas quoi appliquer !
          </p>
          <p>
            Et oui , nous savons qu’il n’est pas toujours facile de choisir les bons produits
            adaptés à ses besoins. C’est pour cela que nous avons créé La Box L’Essentiel du Barbu :
            une solution idéale pour découvrir, tester, et adopter les produits parfaits pour votre
            barbe.
          </p>
          <p>
            Fini les hésitations, prenez soin de vos poils avec des produits triés sur le volet pour
            répondre à vos attentes.
          </p>
          <a href="">JE DÉCOUVRE</a>
        </div>
      </div>
      <div className={styles.abonnements}>
        <div className={styles.contenu}>
          <h2>Pourquoi s’abonner à la box ?</h2>
          <p>
            Pour prendre soin de vous ou pour offrir une expérience avec des produits de qualité,
            spécialement conçus pour répondre aux attentes des hommes barbus. Notre concept a été
            pensé pour allier confort et excellence.
          </p>
          <p>
            Dans chaque box, vous découvrirez tous les moins, 5 produits essentiels pour l’entretien
            de votre barbe, accompagnés d’un guide pratique pour bien les utiliser. Que vous soyez
            un barbu chevronné, un novice en soins cosmétiques, un curieux en quête de nouveautés ou
            simplement quelqu’un à la recherche d’un cadeau original, La Box L’Essentiel du Barbu
            est faite pour vous.
          </p>
          <p>
            Et pour plus de praticité, choisissez la livraison qui vous convient : chez vous, en
            point relais ou directement chez la personne à qui vous souhaitez offrir l’abonnement
          </p>
          <a href="">JE DÉCOUVRE</a>
        </div>
        <div className={styles.image}>
          {
            <Image
              className={styles.logo}
              src="/photo-dun-homme-qui-se-brosse-la-barbe-devant-un-miroir.jpg"
              alt="Vercel logomark"
              width={280}
              height={325}
            />
          }
        </div>
      </div>
      <div className={styles.valeurs}>
        <div className={styles.image}>
          {
            <Image
              className={styles.logo}
              src="/Produits-cosmetiques.jpg"
              alt="Vercel logomark"
              width={320}
              height={285}
            />
          }
        </div>
        <div className={styles.contenu}>
          <h2>Nos valeurs</h2>
          <p>
            À la fois curieux, ambitieux et à la recherche d’hédonisme, je suis déterminé à vous
            offrir des soins de qualité, avec un service flexible et efficace. Mon objectif,
            derrière ce concept, est de vous faire découvrir des produits qui répondent parfaitement
            à vos attentes.
          </p>
          <p>
            Pour ce faire, je sélectionne chaque marque en analysant minutieusement la composition
            de leurs cosmétiques. Je privilégie les produits avec des ingrédients bénéfiques pour la
            peau, sans risques pour votre santé.
          </p>
          <p>
            Ensuite, je vérifie l’efficacité de chaque produit et je m’assure qu’il correspond à vos
            besoins et à vos préférences.
          </p>
          <Link href="/marques">LES MARQUES PARTENAIRES</Link>
        </div>
      </div>
    </main>
  );
}
