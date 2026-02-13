"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap"; // ✅ central import

export default function ContactPage() {
  const containerRef = useRef(null);
  const infoRef = useRef(null);
  const dropdownRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("₹8,000 — ₹12,000");

  const options = ["₹8,000 — ₹12,000", "₹12,000 — ₹20,000", "₹20,000 +"];

  // GSAP ANIMATIONS – SCOPED
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const elements = containerRef.current.querySelectorAll(".reveal-text");

      gsap.from(elements, {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
      });

      if (infoRef.current) {
        gsap.from(infoRef.current, {
          opacity: 0,
          x: -20,
          duration: 1.2,
          delay: 0.3,
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // CLICK OUTSIDE DROPDOWN
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        e.target instanceof Node &&
        !dropdownRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <main
      ref={containerRef}
      className="bg-bg min-h-screen text-text selection:bg-primary selection:text-bg"
    >
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2">
        {/* LEFT SIDE */}
        <section
          ref={infoRef}
          className="lg:h-screen lg:sticky lg:top-0 p-8 md:p-16 lg:p-24 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-primary/10"
        >
          <div>
            <h1 className="font-display text-6xl md:text-8xl text-primary leading-none mb-8 reveal-text">
              Let’s Make <br /> <span className="italic">History.</span>
            </h1>
            <p className="font-body text-xl text-primary/80 max-w-md reveal-text">
              We only take on a limited number of stories each year to ensure
              every frame gets the obsession it deserves. Tell us everything.
            </p>
          </div>

          <div className="mt-12 lg:mt-0 space-y-8 reveal-text">
            <div>
              <p className="font-ui text-xs uppercase tracking-[0.2em] text-secondary mb-2">
                Inquiries
              </p>
              <a
                href="mailto:support@swastikpictures.com"
                className="font-display text-2xl hover:text-accent transition-colors"
              >
                support@swastikpictures.com
              </a>
            </div>
            <div>
              <p className="font-ui text-xs uppercase tracking-[0.2em] text-secondary mb-2">
                Studio
              </p>
              <p className="font-body text-xl">
                124 Archive Way, <br />
                Florence, Italy
              </p>
            </div>
            <div className="flex gap-6 pt-4">
              {["Instagram", "Vimeo", "Pinterest"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="font-ui text-xs uppercase tracking-widest hover:text-accent transition-colors"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* RIGHT SIDE */}
        <section className="p-8 md:p-16 lg:p-24 bg-bg">
          <form className="space-y-12">
            {/* Names */}
            <div className="group relative">
              <label className="font-ui text-xs uppercase tracking-widest text-secondary group-focus-within:text-accent transition-colors">
                Names of the couple
              </label>
              <input
                type="text"
                placeholder="Who are we celebrating?"
                className="w-full bg-transparent border-b border-primary/20 py-4 font-body text-xl focus:outline-none focus:border-primary transition-colors placeholder:text-primary/20"
              />
            </div>

            {/* Date + Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="group relative">
                <label className="font-ui text-xs uppercase tracking-widest text-secondary group-focus-within:text-accent transition-colors">
                  The Date
                </label>
                <input
                  type="text"
                  placeholder="MM/DD/YYYY"
                  className="w-full bg-transparent border-b border-primary/20 py-4 font-body text-xl focus:outline-none focus:border-primary transition-colors placeholder:text-primary/20"
                />
              </div>
              <div className="group relative">
                <label className="font-ui text-xs uppercase tracking-widest text-secondary group-focus-within:text-accent transition-colors">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="City, Country"
                  className="w-full bg-transparent border-b border-primary/20 py-4 font-body text-xl focus:outline-none focus:border-primary transition-colors placeholder:text-primary/20"
                />
              </div>
            </div>

            {/* Investment Dropdown */}
            <div ref={dropdownRef} className="relative">
              <label className="font-ui text-xs uppercase tracking-widest text-secondary">
                Investment Range
              </label>
              <div
                onClick={() => setOpen((prev) => !prev)}
                className="w-full border-b border-primary/20 py-4 font-body text-xl cursor-pointer flex justify-between items-center transition-colors hover:border-primary"
              >
                {selected}
                <span
                  className={`transition-transform duration-300 text-secondary ${
                    open ? "rotate-180" : ""
                  }`}
                >
                  ▾
                </span>
              </div>
              <div
                className={`absolute left-0 w-full mt-2 bg-bg border border-primary/10 shadow-xl overflow-hidden transition-all duration-300 ${
                  open ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                {options.map((option) => (
                  <div
                    key={option}
                    onClick={() => {
                      setSelected(option);
                      setOpen(false);
                    }}
                    className="px-6 py-4 font-body text-lg text-primary hover:bg-primary hover:text-bg transition-colors cursor-pointer"
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>

            {/* Story */}
            <div className="group relative">
              <label className="font-ui text-xs uppercase tracking-widest text-secondary group-focus-within:text-accent transition-colors">
                Tell us your story
              </label>
              <textarea
                rows={5}
                placeholder="What does your love feel like?"
                className="w-full bg-transparent border-b border-primary/20 py-4 font-body text-xl focus:outline-none focus:border-primary transition-colors placeholder:text-primary/20 resize-none"
              />
            </div>

            {/* Submit */}
            <div className="pt-8">
              <button
                type="submit"
                className="w-full md:w-auto px-12 py-5 bg-primary text-bg font-ui uppercase tracking-[0.2em] text-xs rounded-full hover:bg-accent hover:scale-105 transition-all duration-500 shadow-xl shadow-primary/10"
              >
                Send Inquiry
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}