"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import {gsap} from "@/lib/gsap";


export default function AboutPage() {
  const containerRef = useRef(null);
  const teamRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
    // Fade in team members on scroll
      gsap.utils.toArray(".team-card").forEach((card, i) => {
        gsap.from(card, {
          y: 60,
          opacity: 0,
          duration: 1,
          delay: i * 0.2,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
        });
      });

      // Parallax effect for the "Love for Video" large image
      gsap.to(".parallax-img", {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: ".parallax-container",
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="bg-bg text-text selection:bg-primary selection:text-bg">
      
      {/* --- SECTION 1: PHILOSOPHY --- */}
      <section className="relative px-6 py-24 md:py-40 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7">
            <h2 className="font-display text-5xl md:text-7xl text-primary leading-tight">
              We don’t just record <br /> 
              <span className="italic">we witness.</span>
            </h2>
          </div>
          <div className="md:col-span-5">
            <p className="font-body text-lg md:text-xl leading-relaxed text-text/80">
              Our love for videography started with a simple realization: a photo shows you the moment, but a film makes you feel the heartbeat. We are obsessed with the way light hits a veil and the quiet, shaky breath taken before an &quot;I do.&quot;
            </p>
          </div>
        </div>
      </section>

      {/* --- SECTION 2: THE "LOVE FOR VIDEO" VISUAL --- */}
      <section className="parallax-container relative h-[70vh] overflow-hidden bg-primary">
        <Image
          src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=2000"
          alt="Cinematography"
          fill
          className="parallax-img object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-1000"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-6">
            <span className="font-ui uppercase tracking-[0.3em] text-bg/80 text-sm mb-4 block">Our Obsession</span>
            <h3 className="font-display text-4xl md:text-6xl text-bg max-w-3xl">
              Capturing the cinematic rhythm of human emotion.
            </h3>
          </div>
        </div>
      </section>

      {/* --- SECTION 3: THE TEAM --- */}
      <section className="px-6 py-24 md:py-40 bg-bg">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="font-display text-5xl md:text-6xl text-primary mb-4">The Filmmakers</h2>
              <p className="font-body text-lg text-secondary">The souls behind the lens.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              { name: "Julian Thorne", role: "Lead Cinematographer", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800" },
              { name: "Elena Rossi", role: "Creative Director", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800" },
              { name: "Marcus Chen", role: "Master Editor", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800" },
            ].map((member, i) => (
              <div key={i} className="team-card group cursor-none">
                <div className="relative aspect-[3/4] overflow-hidden rounded-sm mb-6 bg-primary/10">
                  <Image
                    src={member.img}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <h4 className="font-display text-2xl text-primary">{member.name}</h4>
                <p className="font-ui text-sm uppercase tracking-widest text-text/60 mt-2">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 4: CALL TO ACTION --- */}
      <section className="pb-40 px-6">
        <div className="max-w-4xl mx-auto text-center border-t border-primary/10 pt-24">
          <p className="font-body text-2xl md:text-3xl text-primary italic mb-10">
            &quot;We are looking for stories that aren&apos;t afraid of the dark, or the light, or the messy in-between.&quot;
          </p>
          <button className="font-ui uppercase tracking-widest text-sm bg-primary text-bg px-10 py-4 rounded-full hover:bg-accent transition-colors duration-500">
            Tell Us Your Story
          </button>
        </div>
      </section>
    </main>
  );
}