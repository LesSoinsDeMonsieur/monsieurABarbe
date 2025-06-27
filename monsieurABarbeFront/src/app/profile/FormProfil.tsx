"use client";

import { useEffect, useState } from "react";
import { useAuth, LoginState } from "@/contexts/AuthContext";
import styles from "./profil.module.css";
import ListeCommande from "@/components/ListeCommande";
import { CommandeType, getUserOrders2, getProductById } from "@/api/orders/orders.api";
import { Order } from "@/types/order";

export default function ProfilPage() {
  const { userInfo, retrieveUserInfos, logout } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<"profile" | "orders">("profile");
  const [commandes, setCommandes] = useState<Order[]>([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        await retrieveUserInfos();
        setErrorMessage(null);
      } catch (e) {
        console.error("Erreur lors de la récupération du profil :", e);
        setErrorMessage("Impossible de récupérer le profil.");
      } finally {
        setIsLoading(false);
      }
    };

    fetch();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      if (activeTab !== "orders" || !userInfo || userInfo.state == LoginState.LOGGED_OUT) return;

      setIsLoading(true);

      try {
        const rawOrders = await getUserOrders2(2); // utilise l'ID utilisateur actuel

        const enrichedOrders = await Promise.all(
          rawOrders.map(async (order) => {
            const items = await Promise.all(
              order.orderItems.map(async (item) => {
                const product = await getProductById(item.id); // attention : il te faut `productId` ici
                return {
                  ...item,
                  product,
                };
              }),
            );

            return {
              ...order,
              orderItems: items,
            };
          }),
        );

        setCommandes(enrichedOrders);
      } catch (e) {
        console.error("Erreur lors du chargement des commandes :", e);
        setCommandes([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [activeTab, userInfo]);

  const lesCommandes: CommandeType[] = [
    {
      dateAchat: "16/07/2025",
      dateLivraison: "18/07/2025",
      total: "15,87",
      adresseLivraison: "3 La rue du Plouc, 44110 Le Bougre",
      numeroCommande: "54157845441848",
    },
    {
      dateAchat: "01/08/2025",
      dateLivraison: "03/08/2025",
      total: "29,90",
      adresseLivraison: "12 avenue des Barbus, 75000 Paris",
      numeroCommande: "98765432198765",
    },
  ];

  if (isLoading) return <div>Chargement...</div>;

  if (errorMessage) return <div className="text-red-500">{errorMessage}</div>;

  if (!userInfo || userInfo.state === LoginState.LOGGED_OUT)
    return <div>Vous n&apos;êtes pas connecté.</div>;

  return (
    <div className={styles.profilContainer}>
      <div className={styles.tabContainer}>
        <button
          className={`${styles.tabButton} ${activeTab === "profile" ? styles.active : ""}`}
          onClick={() => setActiveTab("profile")}
        >
          Mon profil
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === "orders" ? styles.active : ""}`}
          onClick={() => setActiveTab("orders")}
        >
          Historique des achats
        </button>
      </div>

      <div className={styles.tabContent}>
        {activeTab === "profile" && (
          <>
            <div>
              <strong>Nom d&apos;utilisateur :</strong> {userInfo.username}
            </div>
            <div>
              <strong>Email :</strong> {userInfo.email}
            </div>
          </>
        )}

        {activeTab === "orders" && <ListeCommande commandes={commandes} isLoading={false} />}
      </div>
      <button
        onClick={() => logout()}
        style={{ display: "flex", justifyContent: "center", width: "100%" }}
      >
        Déconnexion
      </button>
    </div>
  );
}
