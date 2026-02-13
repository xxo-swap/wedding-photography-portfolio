"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";


export default function ContactPage() {
  const formRef = useRef(null);
  const infoRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal lines of text
      gsap.from(".reveal-text", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
      });

      // Subtle float for the side info
      gsap.from(infoRef.current, {
        opacity: 0,
        x: -20,
        duration: 1.2,
        delay: 0.3,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="bg-bg min-h-screen text-text selection:bg-primary selection:text-bg">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2">
        
        {/* --- LEFT SIDE: THE VIBE & INFO --- */}
        <section 
          ref={infoRef}
          className="lg:h-screen lg:sticky lg:top-0 p-8 md:p-16 lg:p-24 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-primary/10"
        >
          <div>
            <h1 className="font-display text-6xl md:text-8xl text-primary leading-none mb-8 reveal-text">
              Let’s Make <br /> <span className="italic">History.</span>
            </h1>
            <p className="font-body text-xl text-primary/80 max-w-md reveal-text">
              We only take on a limited number of stories each year to ensure every frame gets the obsession it deserves. Tell us everything.
            </p>
          </div>

          <div className="mt-12 lg:mt-0 space-y-8 reveal-text">
            <div>
              <p className="font-ui text-xs uppercase tracking-[0.2em] text-secondary mb-2">Inquiries</p>
              <a href="mailto:hello@yourstudio.com" className="font-display text-2xl hover:text-accent transition-colors">
                hello@yourstudio.com
              </a>
            </div>
            <div>
              <p className="font-ui text-xs uppercase tracking-[0.2em] text-secondary mb-2">Studio</p>
              <p className="font-body text-xl">
                124 Archive Way, <br />
                Florence, Italy
              </p>
            </div>
            <div className="flex gap-6 pt-4">
              {['Instagram', 'Vimeo', 'Pinterest'].map((social) => (
                <a key={social} href="#" className="font-ui text-xs uppercase tracking-widest hover:text-accent transition-colors">
                  {social}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* --- RIGHT SIDE: THE FORM --- */}
        <section className="p-8 md:p-16 lg:p-24 bg-bg">
          <form ref={formRef} className="space-y-12">
            
            {/* Name Input */}
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

            {/* Date & Location */}
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

            {/* Budget Range (Custom styled select) */}
            <div className="group relative">
              <label className="font-ui text-xs uppercase tracking-widest text-secondary">
                Investment Range
              </label>
              <select className="w-full bg-transparent border-b border-primary/20 py-4 font-body text-xl focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer">
                <option>$8,000 — $12,000</option>
                <option>$12,000 — $20,000</option>
                <option>$20,000 +</option>
              </select>
            </div>

            {/* The Story / Message */}
            <div className="group relative">
              <label className="font-ui text-xs uppercase tracking-widest text-secondary group-focus-within:text-accent transition-colors">
                Tell us your story
              </label>
              <textarea 
                rows={5}
                placeholder="What does your love feel like? What are you most excited for?"
                className="w-full bg-transparent border-b border-primary/20 py-4 font-body text-xl focus:outline-none focus:border-primary transition-colors placeholder:text-primary/20 resize-none"
              />
            </div>

            {/* Submit Button */}
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