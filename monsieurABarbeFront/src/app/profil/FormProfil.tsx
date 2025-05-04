"use client";

import { useState, useEffect } from "react";
import styles from "./profil.module.css";
import { AuthStatus, useAuth } from "@/contexts/AuthContext";
import { authStatusToString } from "@/utils/enumToString";
import { redirect } from "next/navigation";

import axios from "axios";
import axiosI from "@/axiosInterceptor";

export default function FormProfil() {
  const [prenom, setPrenom] = useState<string>("");
  const [nom, setNom] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [biographie, setBiographie] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  // const { submitRegister } = useAuth();
  const [error, setError] = useState<string | null>(null);

  type UserProfil = {
    prenom: string;
    nom: string;
    biographie: string;
    userName: string;
  };

  const fetchProfil = async () => {
    try {
      const response = await axios.get<UserProfil>("http://localhost:8080/api/profil", {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      });
      const user = response.data;
      if (user != null) {
        setPrenom(user.prenom);
        setNom(user.nom);
        setUserName(user.userName);
        setBiographie(user.biographie);
      }
    } catch (err) {
      console.error(err);
      setError("Impossible de récupérer le profil.");
    }
  };

  //post maj profil
  async function profilRequest(user: UserProfil) {
    return await axiosI.post("/auth/profil", {
      prenom: user.prenom,
      nom: user.nom,
      bio: user.biographie,
      username: user.userName,
    });
  }

  const submitUpdateProfil = async (user: UserProfil): Promise<AuthStatus> => {
    try {
      const result = await profilRequest({ ...user });
      if (!result) {
        return AuthStatus.ERROR;
      }
      return AuthStatus.OK;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.request.status === 400) {
          //Wrong credentials
          return AuthStatus.INVALID_FORMAT;
        }
        if (err.request.status === 409) {
          //Email already used
          return AuthStatus.LOGIN_UNAVAILABLE;
        }
      }
      return AuthStatus.ERROR;
    }
  };

  const submit = async () => {
    if (prenom && nom && userName && biographie) {
      const status = await submitUpdateProfil({ prenom, nom, biographie, userName });
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

  useEffect(() => {
    fetchProfil();
  }, []);

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
          placeholder="Prénom"
          value={prenom}
          onChange={(e) => setPrenom(e.target.value)}
          autoFocus
          required
        />
      </div>
      <div className="">
        <input
          type="text"
          className={styles.formInputLogin}
          placeholder="Nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          autoFocus
          required
        />
      </div>
      <div className="">
        <input
          type="text"
          className={styles.formInputLogin}
          placeholder="UserName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          autoFocus
          required
        />
      </div>
      <div className="">
        <input
          type="text"
          className={styles.formInputLogin}
          placeholder="Bio"
          value={biographie}
          onChange={(e) => setBiographie(e.target.value)}
          autoFocus
          required
        />
      </div>
      {errorMessage && <div className="">{errorMessage}</div>}

      <button type="submit" className={styles.formButtonLogin}>
        Sauvegarder
      </button>

      <div className="">
        <div onClick={() => redirect("/")} className={styles.formAuthMethod}>
          Annuler
        </div>
      </div>
    </form>
  );
}
