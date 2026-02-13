import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import ScrollWrapper from "@/components/animations/ScrollWrapper";
import "./globals.css";

import { Cormorant_Garamond, Source_Serif_4, Inter } from "next/font/google";

/* FONT DEFINITIONS */

/* 1. Display / Editorial */
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400"], // Regular
  variable: "--font-cormorant",
  display: "swap",
});

/* 2. Body serif */
const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["300"], // Light
  variable: "--font-source-serif",
  display: "swap",
});

/* 3. UI / Utility */
const inter = Inter({
  subsets: ["latin"],
  weight: ["200"], // Extra Light
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "Luxury Wedding Photographer | Aarav Studios",
  description: "Cinematic wedding photography in Delhi NCR.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`
        ${cormorant.variable}
        ${sourceSerif.variable}
        ${inter.variable}
        scroll-smooth
      `}
    >
      <body className="bg-black text-white font-source">
        <ScrollWrapper>
          <Header />

          {/* Page content offset for fixed header */}
          <main className="pt-[70px]">
            {children}
          </main>

          <Footer />
        </ScrollWrapper>
      </body>
    </html>
  );
}
