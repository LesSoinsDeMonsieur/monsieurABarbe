"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // 👈 ajoute ça

interface HeaderProps {
  hiddenRoutes?: string[];
}

function Header({ hiddenRoutes = [] }: HeaderProps) {
  const pathname = usePathname();

  if (hiddenRoutes.includes(pathname)) {
    return null;
  }

  const ongletsMilieu = [
    { nom: "Box", url: "/Box" },
    { nom: "Shop", url: "/products" },
    { nom: "Offrir", url: "/Offrir" },
    { nom: "Notre concept", url: "/Notre-concept" },
    { nom: "Marques partenaires", url: "/Marques-partenaires" },
    { nom: "Contact", url: "/Contact" },
    { nom: "Blog", url: "/Blog" },
  ];

  const bandeauTexte = "Livraison offerte sur tous les abonnements à une box";

  return (
    <>
      {/* Bandeau promo */}
      <div className="bg-dark text-white text-center py-2">
        <p className="mb-0">{bandeauTexte}</p>
      </div>

      {/* Header Navbar */}
      <nav className="navbar navbar-expand-lg bg-white border-bottom">
        <div className="container">
          {/* Logo */}
          <Link className="navbar-brand" href="/">
            <Image src="/logo.png" alt="Logo" width={185} height={40} />
          </Link>

          {/* Burger */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Liens */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto">
              {ongletsMilieu.map((onglet, index) => (
                <li key={index} className="nav-item">
                  <Link className="nav-link" href={onglet.url}>
                    {onglet.nom}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Icônes à droite */}
            <div className="d-flex align-items-center">
              <Link href="/profile" className="me-3">
                <Image src="/user.png" alt="Profile" width={32} height={32} />
              </Link>
              <Link href="/panier">
                <Image src="/bag.png" alt="Panier" width={32} height={32} />
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
