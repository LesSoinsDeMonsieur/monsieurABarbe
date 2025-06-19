import styles from "./profil.module.css";
import FormProfil from "./FormProfil";

export default function Page() {
  return (
    <div className={styles.loginBody}>
      <h2 className="">Votre Profile</h2>
      <FormProfil />
    </div>
  );
}
