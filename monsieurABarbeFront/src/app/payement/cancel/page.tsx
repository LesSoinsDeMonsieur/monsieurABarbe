"use client";

import { Alert } from "@mui/material";

export default function Page() {
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "35px",
      }}
    >
      <Alert severity="error">Une erreur est survenue durant le payement</Alert>
      Vous pouvez retourner sur la page de payement pour éssayer une nouvelle fois
    </div>
  );
}
