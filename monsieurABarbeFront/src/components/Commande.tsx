import styles from "../app/profile/profil.module.css";
import { Order, statusLabels } from "@/types/order";
import Link from "next/link";

export default function Commande({ commande }: { commande: Order }) {
  const { id, total, createdAt, status, items } = commande;

  return (
    <div className={styles.commande}>
      <div className={styles.informationsCommandes}>
        <div className={styles.information}>
          <p>Commande effectuée le :</p>
          <p>{createdAt ? new Date(createdAt).toLocaleDateString() : "Date inconnue"}</p>
        </div>
        <div className={styles.information}>
          <p>Total :</p>
          <p>{total?.toFixed(2)} €</p>
        </div>
        <div className={styles.information}>
          <p>Statut :</p>
          <p>{statusLabels[status] ?? status}</p>
        </div>
        <div className={styles.information}>
          <p>Numéro de commande :</p>
          <p>{id}</p>
        </div>
        {/* <button>Facture</button> */}
      </div>

      <div className={styles.detailsCommandes}>
        <h5>Articles achetés :</h5>
        <div className={styles.listeProduits}>
          {Array.isArray(items) && items.length > 0 ? (
            items.map((item) => (
              <div key={item.productId} className={styles.informationProduit}>
                <p>
                  <strong>{item.productName}</strong>
                </p>
                <p>
                  {item.quantity} × {item.unitPrice.toFixed(2)} €
                </p>
                <div className={styles.informationsHorizontales}>
                  <Link href={`/products/${item.productId}`}>
                    <div className="text-center">
                      <span className="btn btn-outline-dark mt-2 fw-semibold">VOIR LE PRODUIT</span>
                    </div>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p>Aucun article trouvé.</p>
          )}
        </div>
      </div>
    </div>
  );
}
