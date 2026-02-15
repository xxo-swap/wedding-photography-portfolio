"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function HeroTransition() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "center center",
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[45vh] flex items-center justify-center
                 bg-gradient-to-b from-secondary to-bg"
    >
      <div ref={textRef} className="text-center px-6">
        <span className="font-ui text-xs tracking-[0.4em] uppercase text-secondary">
          Selected Work
        </span>

        <h2 className="mt-6 font-display text-3xl md:text-4xl lg:text-5xl font-light text-primary leading-tight">
          Stories Told{" "}
          <span className="italic text-accent">
            Through Presence
          </span>
        </h2>

        <div className="mt-8 h-px w-24 mx-auto bg-primary/30" />
      </div>
    </section>
  );
}
