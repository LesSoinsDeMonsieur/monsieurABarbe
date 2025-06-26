"use client";

import { useEffect, useState } from "react";
import { useAuth, LoginState } from "@/contexts/AuthContext";
import styles from "./profil.module.css";

export default function ProfilPage() {
  const { userInfo, retrieveUserInfos } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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

  if (isLoading) return <div>Chargement...</div>;

  if (errorMessage) return <div className="text-red-500">{errorMessage}</div>;

  if (!userInfo || userInfo.state === LoginState.LOGGED_OUT)
    return <div>Vous n'êtes pas connecté.</div>;

  return (
    <div className={styles.profilContainer}>
      <h2>Mon profil</h2>
      <div className={styles.profilItem}>
        <strong>Nom d'utilisateur :</strong> {userInfo.userName}
      </div>
      <div className={styles.profilItem}>
        <strong>Email :</strong> {userInfo.email}
      </div>
    </div>
  );
}
