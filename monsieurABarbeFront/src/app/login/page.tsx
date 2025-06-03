"use client";

import styles from "./login.module.css";
import FormLogin from "./FormLogin";

export default function Page() {
  return (
    <div className={styles.loginBody}>
      <h2>Connexion</h2>
      <FormLogin />
    </div>
  );
}
