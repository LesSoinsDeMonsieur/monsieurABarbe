import styles from "../app/profile/profil.module.css";
import Image from "next/image";
import { Order } from "@/types/order";

export default function Commande({ commande }: { commande: Order }) {
  const { id, total, createdAt, orderItems } = commande;

  return (
    <div className={styles.commande}>
      <div className={styles.informationsCommandes}>
        <div className={styles.information}>
          <p>Commande effectuée le :</p>
          <p>{createdAt ? new Date(createdAt).toLocaleDateString() : "Date inconnue"}</p>
        </div>
        <div className={styles.information}>
          <p>Total :</p>
          <p>{total.toFixed(2)} €</p>
        </div>
        <div className={styles.information}>
          <p>Numéro de commande :</p>
          <p>{id ?? "N/A"}</p>
        </div>
        <button>Facture</button>
      </div>

      <div className={styles.detailsCommandes}>
        <h5>Articles achetés :</h5>
        {orderItems.map((item) => (
          <div key={item.id} className={styles.information}>
            <p>
              <strong>{item.item?.name ?? "Produit inconnu"}</strong> – {item.quantity} ×{" "}
              {item.unitPrice.toFixed(2)} €
            </p>
            <div className={styles.informationsHorizontales}>
              {item.item?.images?.[0]?.filePath && (
                <Image
                  className={styles.logo}
                  src={item.item.images[0].filePath}
                  alt={item.item.name}
                  width={100}
                  height={100}
                />
              )}
              <a href={`/produits/${item.item.id}`}>Voir la fiche produit</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
