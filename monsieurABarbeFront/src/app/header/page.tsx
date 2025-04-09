import Link from 'next/link';
import styles from "./header.module.css";

function Header() {
    return (
        <div className={styles.header}>
            <img src="/logo.png" alt="Logo" className={styles.logo} />
            <Link href="/" className={styles.title}> <h1>Les soins de Monsieur</h1></Link>
                <div>
                <div className={styles.loginContainer}>
                    <Link href="header" className={styles.loginLink}>Se connecter</Link>
                </div>
            </div>
        </div>
    );
};

export default Header;
