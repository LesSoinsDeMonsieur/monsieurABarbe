"use client";

import { Alert, Button } from "@mui/material";
import Link from "next/link";

export default function Page() {
  return (
    <div
      style={{
        marginTop: "10em",
        marginLeft: "32em",
        display: "flex",
        height: "40em",
        flexDirection: "column",
        alignItems: "center",
        gap: "35px",
        maxWidth: "500px",
      }}
    >
      <Alert severity="success">Le payement a bien été effectué !</Alert>
      <div>
        <h1>Merci pour votre Achat !</h1>
        Vous recevrez vos articles dans les plus bref délais vous pouvez consulté l&apos;avancé de
        la livraison sur la page{" "}
        <Link href={"/profile"} style={{ color: "black" }}>
          <strong>Mes commandes</strong>
        </Link>
      </div>
      <Link href={"/"}>
        <Button variant="contained" style={{ backgroundColor: "black" }}>
          Retourner à mes achats
        </Button>
      </Link>
    </div>
  );
}
