"use client";
import styles from "./profil.module.css";
import FormProfil from "./FormProfil";
import { LoginState, useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const { userInfo } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!userInfo || userInfo.state == LoginState.LOGGED_OUT) {
      router.push("/login");
    }
  }, []);
  return (
    <div className={styles.loginBody}>
      <h2 className="">Mon Profile</h2>
      <FormProfil />
    </div>
  );
}
