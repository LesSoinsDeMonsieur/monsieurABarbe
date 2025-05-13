import styles from "./register.module.css";
import FormRegister from "./FormRegister";

export default function Page() {
  return (
    <div className={styles.loginBody}>
      <h2 className="">Création de compte</h2>
      <FormRegister />
    </div>
  );
}
