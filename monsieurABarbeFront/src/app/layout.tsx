import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "@/contexts/AuthContext";
import styles from "./page.module.css";
import Header from "@/components/header/header";
import Footer from "@/components/footer/page";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Monsieur A Barbe",
  description: "Le site en construction de Monsieur A Barbe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AuthProvider>
          <div className={styles.page}>
            <Header />
            {children}
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
