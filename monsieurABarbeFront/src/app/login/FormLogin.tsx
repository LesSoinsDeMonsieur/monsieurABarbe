"use client";

import { useState } from "react";
import styles from "./login.module.css";
import { AuthStatus, useAuth } from "@/contexts/AuthContext";
import { authStatusToString } from "@/utils/enumToString";
import { redirect } from "next/navigation";

export default function FormLogin() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { submitLogin } = useAuth();

  const submit = async () => {
    if (email && password) {
      const status = await submitLogin({ email, password });
      if (status != AuthStatus.OK) {
        setErrorMessage(authStatusToString(status));
        return;
      }
    } else {
      setErrorMessage("Veuillez remplir tous les champs");
      return;
    }
    redirect("/");
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      // action={""}
      className={styles.formLogin}
    >
      <div className="">
        <input
          type="text"
          className={styles.formInputLogin}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
          required
        />
      </div>

      <div className="">
        <input
          type="password"
          className={styles.formInputLogin}
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {errorMessage && <div className="">{errorMessage}</div>}

      <button type="submit" className={styles.formButtonLogin}>
        Se connecter
      </button>

      <div className="">
        <div onClick={() => redirect("/register")} className={styles.formAuthMethod}>
          Créer un compte
        </div>
      </div>
    </form>
  );
}
