import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
      <main className={styles.main}>
        {/* <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        /> */}
        {/* <ol>
          <li>
            Get started by editing <code>src/app/page.tsx</code>.
          </li>
          <li>Save and see your changes instantly.</li>
        </ol> */}
        <div className={styles.intro}>
          <h1>La box pensée <br/> 
            pour chaque <br/> 
            Monsieur à Barbe</h1>

          <div className={styles.ctas}>
            <a
              className={styles.primary}
              href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              JE LA VEUX
            </a>
            {/* <a
              href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.secondary}
            >
              Read our docs
            </a> */}
          </div>
        </div>
        <h1>Nouveau mois, nouvel homme</h1>
        <div className={styles.decouverte}>
          { <Image
                  className={styles.logo}
                  src="/Produits-cosmetiques.jpg"
                  alt="Vercel logomark"
                  width={20}
                  height={20}
                /> }
          <div className={styles.contenu}>
            <p>La <strong>seule</strong> box pour barbe sur abonnement : l’élégance et le soin offerts chaque mois avec <strong>Monsieur à Barbe !</strong></p>
            <p>Chaque mois, recevez une nouvelle box contenant des produits pour entretenir et prendre soin de votre barbe…</p>
            <a href="">JE DÉCOUVRE</a>
          </div>
        </div>
        <div className={styles.tutoriel}>
          <h1>Comment ça marche</h1>
          <div className={styles.etapes}>
            <div className={styles.etape}>
            { <Image
                  className={styles.logo}
                  src="/Produits-cosmetiques.jpg"
                  alt="Vercel logomark"
                  width={20}
                  height={20}
                /> }
              <h2>1</h2>
              <p>Je choisis mon abonnement</p>
            </div>

            <div className={styles.etape}>
            { <Image
                  className={styles.logo}
                  src="/Produits-cosmetiques.jpg"
                  alt="Vercel logomark"
                  width={20}
                  height={20}
                /> }
              <h2>2</h2>
              <p>Je reçois ma Box</p>
            </div>

            <div className={styles.etape}>
            { <Image
                  className={styles.logo}
                  src="/Produits-cosmetiques.jpg"
                  alt="Vercel logomark"
                  width={20}
                  height={20}
                /> }
              <h2>3</h2>
              <p>Je découvre ce qu'on m'a préparé</p>
            </div>
          </div>
          <a href="">PLUS DE DÉTAILS</a>
        </div>
        <div className={styles.section_abonnements}>
          <h1> Nos offres d’abonnement </h1>
          <div className={styles.abonnements}>
            <div className={styles.abonnement}>
              <div className={styles.contenu}>
                <h2><strong>35,90€</strong> / mois</h2>
                <p>- Sans engagement (résiliable à tout moment)</p>
                <a href="">JE LA VEUX</a>
              </div>
            </div>
            <div className={styles.abonnement}>
              <div className={styles.contenu}>
                <h2><strong>35,90€</strong> / mois</h2>
                <p>- Engagement 3 mois</p>
                <a href="">JE LA VEUX</a>
              </div>
            </div>
            <div className={styles.abonnement}>
              <div className={styles.contenu}>
                <h2><strong>1re box offerte </strong></h2>
                <p>- Puis 35,90€/mois <br />
                   - Engagement 12 mois
                </p>
                <a href="">J'EN PROFITE</a>
              </div>
            </div>
          </div>
          <a href="">J'OFFRE UN ABONNEMENT</a>
          <div className={styles.section_avis}>
            <div className={styles.voir_tous_les_avis}>
              <h2>Les avis parlent d'eux-mêmes</h2>
              <p>Consultez les avis de nos clients avant de vous lancer</p>
              <a href="">VOIR TOUS LES AVIS</a>
            </div>
            <div className={styles.liste_avis}>
              <div className={styles.avis}>
                <div className={styles.entete}>
                  <div className={styles.gauche}>
                    { <Image
                    className={styles.logo}
                    src="/Produits-cosmetiques.jpg"
                    alt="Vercel logomark"
                    width={40}
                    height={40}
                    /> }
                  </div>
                  <div className={styles.droite}>
                    <div className={styles.auteur_note}>
                      <p>Marc Leberch</p>
                      <p>NOTES</p>
                    </div>
                    <div className={styles.date}>
                      <p>novembre 28, 2024</p>
                    </div>
                  </div>
                </div>
                <div>
                  <p>Une super surprise à chaque fois que je reçois ma box. On sent que les produits sont sélectionnés avec soin. Un vrai must pour les barbus !</p>
                </div>
              </div>
              <div className={styles.avis}>
                <div className={styles.entete}>
                  <div className={styles.gauche}>
                    { <Image
                    className={styles.logo}
                    src="/Produits-cosmetiques.jpg"
                    alt="Vercel logomark"
                    width={40}
                    height={40}
                    /> }
                  </div>
                  <div className={styles.droite}>
                    <div className={styles.auteur_note}>
                      <p>Marc Leberch</p>
                      <p>NOTES</p>
                    </div>
                    <div className={styles.date}>
                      <p>novembre 28, 2024</p>
                    </div>
                  </div>
                </div>
                <div>
                  <p>Une super surprise à chaque fois que je reçois ma box. On sent que les produits sont sélectionnés avec soin. Un vrai must pour les barbus !</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.section_produits}>
          <h1>Dans vos box, retrouvez ces produits</h1>
          <div className={styles.produits}>
            <div className={styles.produit}>
              { <Image
                className={styles.logo}
                src="/Produits-cosmetiques.jpg"
                alt="Vercel logomark"
                width={400}
                height={400}
              /> }
              <a href=""> <strong>Crème Hydratante Pour Barbe Burberry</strong></a>
              <p>9,90€</p>
              <p>NOTES</p>
              <a href="" className={styles.ajout_panier}>AJOUTER AU PANIER</a>
            </div>
            <div className={styles.produit}>
              { <Image
                className={styles.logo}
                src="/Produits-cosmetiques.jpg"
                alt="Vercel logomark"
                width={400}
                height={400}
              /> }
              <a href=""> <strong>Crème Hydratante Pour Barbe Burberry</strong></a>
              <p>9,90€</p>
              <p>NOTES</p>
              <a href="" className={styles.ajout_panier}>AJOUTER AU PANIER</a>
            </div>
            <div className={styles.produit}>
              { <Image
                className={styles.logo}
                src="/Produits-cosmetiques.jpg"
                alt="Vercel logomark"
                width={400}
                height={400}
              /> }
              <a href=""> <strong>Crème Hydratante Pour Barbe Burberry</strong></a>
              <p>9,90€</p>
              <p>NOTES</p>
              <a href="" className={styles.ajout_panier}>AJOUTER AU PANIER</a>
            </div>
          </div>
          <div>
            <a href="" className={styles.voir_tous_les_produits}>VOIR TOUS LES PRODUITS</a>
          </div>
        </div>
      </main>
    // <div>HomePage</div>
  );
}
