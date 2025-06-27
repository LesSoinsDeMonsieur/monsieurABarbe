"use client";
import styles from "./contactForm.module.css";

export default function page() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>
        Besoin d’un coup de peigne ? <span>Contactez-nous !</span>
      </h1>

      <p className={styles.description}>
        <em>
          Une question rapide ? Pas besoin de tirer sur le poil ! Avant de nous contacter, jetez un
          œil à notre{" "}
          <a className={styles.link} href="#">
            FAQ
          </a>
          .
        </em>
      </p>
      <p className={styles.description}>
        <em>
          Sinon, laissez-nous un message directement ici, et on vous recontacte sans barboter.
        </em>
      </p>

      <p className={styles.requiredNotice}>
        Les champs marqués d’un <span className={styles.asterisk}>*</span>sont obligatoires
      </p>

      <form className={styles.form}>
        <label className={styles.label}>
          <span className={styles.asterisk}>*</span>
          <input type="text" placeholder="NOM et Prénom" required className={styles.input} />
        </label>

        <label className={styles.label}>
          <span className={styles.asterisk}>*</span>
          <input type="email" placeholder="user@gmail.com" required className={styles.input} />
        </label>

        <label className={styles.label}>
          <span className={styles.asterisk}>*</span>
          <textarea placeholder="Commentaire ou message" required className={styles.textarea} />
        </label>

        <button type="submit" className={styles.button}>
          Envoyer
        </button>
      </form>

      <h2 className={styles.subheading}>
        Vous pouvez aussi envoyer un message via nos réseaux sociaux !
      </h2>
    </div>
  );
}
