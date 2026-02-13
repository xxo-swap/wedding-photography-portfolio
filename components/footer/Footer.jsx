"use client";

import { FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function FooterMinimal() {
  return (
    <footer className="w-full bg-bg py-16 md:py-24 px-8 border-t border-primary/10">
      <div className="max-w-[1600px] mx-auto grid grid-cols-2 md:grid-cols-5 gap-12 font-ui text-sm uppercase tracking-widest text-primary">
        
        {/* Brand / Tagline */}
        <div className="col-span-2 md:col-span-2">
          <h3 className="font-display text-2xl mb-4 text-primary">Studio Name</h3>
          <p className="text-primary/70 max-w-sm text-xs md:text-sm">Crafting cinematic wedding films with a focus on raw emotion.</p>
        </div>

        {/* Links Column */}
        <div className="flex flex-col gap-3 text-xs md:text-sm">
          <span className="text-secondary mb-2">Navigation</span>
          <a href="about" className="hover:text-secondary">About</a>
          <a href="portfolio" className="hover:text-secondary">Portfolio</a>
        </div>

        {/* Contact Column */}
        <div className="flex flex-col gap-3 text-xs md:text-sm">
          <span className="text-secondary mb-2">Contact</span>
          <a href="tel:6386760485" className="hover:text-secondary">+91 6386760485</a>
          <a href="mailto:contact@email.com" className="hover:text-secondary">Email</a>
        </div>

        {/* Social Column */}
        <div className="flex flex-col gap-3 text-xs md:text-sm">
          <span className="text-secondary mb-2">Social</span>
          <div className="flex gap-4 text-lg">
            <a href="https://instagram.com" className="hover:text-secondary"><FaInstagram /></a>
            <a href="https://wa.me/916386760485" className="hover:text-secondary"><FaWhatsapp /></a>
          </div>
        </div>

      </div>
    </footer>
  );
}