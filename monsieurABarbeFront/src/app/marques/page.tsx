"use client";
import Image from "next/image";
import styles from "./marques.module.css";

export default function Marques() {
  return (
    <main className={styles.main}>
      <h1>Nos Marques Partenaires : L’Excellence pour votre Barbe</h1>
      <h2>Comment sélectionnons nous les marques et les produits :</h2>
      <p>
        Chez Monsieur à Barbe, la sélection de nos produits repose sur des critères stricts qui
        allient qualité, efficacité et respect de l’environnement. Voici comment nous procédons pour
        choisir les meilleures marques et produits pour votre routine de soin :{" "}
      </p>
      <p>
        <strong>Ingrédients naturels et sûrs :</strong> Nous priorisons les produits fabriqués à
        partir d’ingrédients naturels, sans parabènes, sulfates ou autres substances nocives. Chaque
        cosmétique proposé est minutieusement analysé pour s’assurer qu’il soit bénéfique pour la
        peau et ne présente aucun risque d’irritation. Nous choisissons exclusivement des produits
        dont les formulations respectent à la fois la peau et l’environnement.
      </p>
      <p>
        <strong>Efficacité prouvée :</strong> Nous sélectionnons des produits dont l’efficacité est
        validée par des tests cliniques, des études scientifiques et les retours des utilisateurs.
        Nous veillons à ce que chaque produit réponde aux attentes de nos clients, qu’il s’agisse de
        renforcer l’hydratation, de faciliter le coiffage ou de nourrir les poils de manière
        optimale.
      </p>
      <p>
        <strong>Engagement éthique et durable :</strong> Nos partenaires sont choisis en fonction de
        leur engagement à proposer des produits durables et responsables. Nous privilégions des
        marques qui s’engagent pour la fabrication locale, la réduction de l’empreinte carbone et la
        transparence des ingrédients. Les marques doivent également adopter des pratiques éthiques,
        telles que le respect des droits des travailleurs et des pratiques de fabrication
        respectueuses de l’environnement.
      </p>
      <p>
        <strong>Adaptabilité aux préférences des consommateurs :</strong> Enfin, nous nous assurons
        que les produits que nous proposons correspondent aux besoins et préférences de notre
        clientèle. Pour cela, nous recueillons régulièrement les retours des utilisateurs, que ce
        soit sur la texture, l’odeur ou les résultats obtenus. Cela nous permet de vous offrir des
        produits qui correspondent à vos attentes, qu’il s’agisse d’une huile, d’un shampoing ou
        d’une crème.
      </p>
      <p>
        En résumé, chaque produit que nous proposons est sélectionné avec soin pour garantir non
        seulement sa qualité, mais aussi son efficacité, son respect de l’environnement et sa
        capacité à répondre aux besoins spécifiques des hommes qui prennent soin de leur barbe.
      </p>
    </main>
  );
}
