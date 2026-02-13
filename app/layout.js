import { Cormorant_Garamond, Source_Serif_4, Inter } from "next/font/google";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import ScrollWrapper from "@/components/animations/ScrollWrapper";
import DebugGSAP from "@/Debug"; // 👈 Import debug component
import "./globals.css";

/* FONT DEFINITIONS */
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-cormorant",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["300"],
  variable: "--font-source-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["200"],
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
        <DebugGSAP /> {/* 👈 Add this – exposes GSAP after mount */}
        <ScrollWrapper>
          <Header />
          <main className="pt-[70px]">{children}</main>
          <Footer />
        </ScrollWrapper>
      </body>
    </html>
  );
}