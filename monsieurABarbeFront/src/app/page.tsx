import Image from "next/image";
import styles from "./page.module.css";
import Footer from "./Footer/page";

export default function Home() {
  return (
    <div className={styles.page}>
      <Footer/>
    </div>
  );
}
