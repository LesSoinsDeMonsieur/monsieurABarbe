# 👨‍🦰 Monsieur à Barbe

**Monsieur à Barbe** est une application e-commerce construite avec :

- **Frontend** : [Next.js](https://nextjs.org/)
- **Backend** : [Spring Boot](https://spring.io/projects/spring-boot)
- **Base de données** : PostgreSQL
- **Paiement** : Stripe
- **Hébergement** : [Clever Cloud](https://console.clever-cloud.com/)

---

## 📁 Structure du projet

```
monsieur-a-barbe/
├── monsieurabarbeback/              # Application Spring Boot (API REST, Stripe, DB)
│   └── src/...
│   └── pom.xml
├── monsieurABarbeFront/             # Application Next.js
│   └── src/
│        └── public/
│        └── pages/
│        └── package.json
├── README.md
```

---

## 🚀 Fonctionnalités principales

### Frontend

- Interface boutique (liste produits, panier)
- Connexion / inscription utilisateur
- Paiement Stripe (via session créée côté backend)

### Backend

- API REST sécurisée (utilisateurs, produits, commandes)
- Intégration Stripe (création de session + webhooks)
- Gestion de la base de données (JPA + PostgreSQL)
- Stockage local des images produits

---

## ⚙️ Prérequis

- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)
- [Maven](https://maven.apache.org/)
- [Java 21](https://www.oracle.com/java/technologies/javase/jdk21-archive-downloads.html)
- [PostgreSQL](https://www.postgresql.org/)
- Compte [Stripe](https://stripe.com/) avec clés API

---

## 🖥️ Lancer le projet en local

### 1. Cloner le dépôt

```bash
git clone https://github.com/LesSoinsDeMonsieur/monsieurABarbe.git
cd monsieurABarbe
```

### 2. Démarrer le backend

```bash
cd monsieurabarbeback
cp .env.example .env # ou configure tes variables d’environnement
mvn spring-boot:run
```

> 📌 Le backend démarre sur `http://localhost:8080`

### 3. Démarrer le frontend

```bash
cd monsieurABarbeFront
yarn install
yarn run dev
```

> 📌 Le frontend démarre sur `http://localhost:3000`

---

## 🔐 Variables d’environnement

### Backend `.env`

```
JWT_SECRET=...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
POSTGRESQL_ADDON_HOST=localhost
POSTGRESQL_ADDON_PORT=5432
POSTGRESQL_ADDON_DB=monsieurabarbe
POSTGRESQL_ADDON_USER=postgres
POSTGRESQL_ADDON_PASSWORD=adminDATABASE_USERNAME=postgres
```

### Frontend `.env.local`

```
NEXT_PUBLIC_BACKEND_URL=http://localhost:8080
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_...
```

---

## 🚀 Déploiement

Le déploiement se fait sur un hébergeur différent pour le backend et le frontend

### Backend

- Se rendre sur [Clever Cloud](https://console.clever-cloud.com/) et connectez vous.
- Une fois connecté, allez sur "Create an application" et sélectionner le repo github
- Choisir java + maven et compléter les informations demandés
- Ajouter un Add-on de base de donnée de type "PostgreSQL" (qui sera normalement proposé automatiquement par clever cloud, si ce n'est pas le cas -> Mettre la base en tant que add-on du backend.)
- Dans les variables d'environnement, ajouter les deux variable suivantes :

  > "APP_FOLDER" : monsieurabarbeback

  > "CC_JAVA_VERSION" : 21

- Ajouter les autres variables d'environnements se trouvant dans le fichier .env.sample du backend
- Lancer le backend

### Frontend

- Se rendre sur [Netlify](https://app.netlify.com/) et sélectionner le projet Monsieur à Barbe (allez le chercher sur le git si ce n'est pas fait)
- ajouter les variables d'environnement de dev
- Modifier la version de node pour 20.x dans : project configuration -> build & deploy -> dependency-management

## 🚀 Configuration Netlify

| Champ                     | Valeur                                  |
| ------------------------- | --------------------------------------- |
| **Runtime**               | Next.js                                 |
| **Base directory**        | `monsieurABarbeFront`                   |
| **Package directory**     | _Not set_                               |
| **Build command**         | `yarn build`                            |
| **Publish directory**     | `monsieurABarbeFront/.next`             |
| **Functions directory**   | `monsieurABarbeFront/netlify/functions` |
| **Deploy log visibility** | Logs are public                         |
| **Build status**          | Active                                  |

---

## 📄 Licence

Projet développé à des fins pédagogiques.

---

## 🤛 Auteur

- **Marius BOURSE**
- **Jules CROIZIER**
- **Jonathan BOULAY**
- **Mathis CAPRIN**
