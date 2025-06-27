import styles from "../app/profile/profil.module.css";
import Commande from "./Commande";
import { Order } from "@/types/order";

export default function ListeCommande({
  commandes,
  isLoading,
}: {
  commandes: Order[];
  isLoading: boolean;
}) {
  if (isLoading) return <p>Chargement des commandes...</p>;

  if (!commandes.length) return <p>Aucune commande trouvée pour le moment.</p>;

  return (
    <div className={styles.profilItem}>
      <h3>Historique de vos achats</h3>
      {commandes.map((commande) => (
        <Commande key={commande.id} commande={commande} />
      ))}
    </div>
  );
}
