"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap"; // ✅ central import – plugins already registered

export default function SceneBuilder({ scenes }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!scenes?.length || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. REVEAL SECTIONS – SCOPED
      gsap.utils.toArray(".reveal-section", containerRef.current).forEach((section) => {
        gsap.from(section.querySelectorAll(".reveal-item"), {
          y: 60,
          opacity: 0,
          duration: 1.2,
          stagger: 0.2,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
          },
        });
      });

      // 2. PARALLAX IMAGES – SCOPED
      gsap.utils.toArray(".parallax-img", containerRef.current).forEach((img) => {
        gsap.to(img, {
          yPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: img,
            scrub: true,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert(); // ✅ clean only this component
  }, [scenes]);

  return (
    <section ref={containerRef} className="max-w-[1440px] mx-auto px-6 space-y-40 pb-40 mt-40">
      {scenes.map((step, i) => (
        <div
          key={i}
          className={`reveal-section flex flex-col ${
            i % 2 !== 0 ? "md:items-end" : "md:items-start"
          }`}
        >
          {/* Image Box */}
          <div
            className={`relative overflow-hidden bg-primary/5 shadow-2xl ${
              step.type === "wide"
                ? "w-full aspect-video"
                : "w-full md:w-2/3 aspect-[3/4]"
            }`}
          >
            <div className="parallax-img relative w-full h-[120%] -top-[10%]">
              <Image
                src={step.image}
                alt={step.title}
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              />
            </div>
            <div className="absolute top-8 left-8 mix-blend-difference text-bg font-ui text-xs tracking-widest uppercase">
              Scene {String(i + 1).padStart(2, "0")}
            </div>
          </div>

          {/* Text Box */}
          <div
            className={`mt-12 max-w-xl space-y-4 ${
              i % 2 !== 0 ? "md:text-right" : ""
            }`}
          >
            <span className="reveal-item block font-ui text-accent text-xs uppercase tracking-widest">
              {step.tag}
            </span>
            <h2 className="reveal-item font-display text-4xl md:text-6xl text-primary leading-tight">
              {step.title}
            </h2>
            <p className="reveal-item font-body text-lg leading-relaxed text-text/70 italic">
              {step.description}
            </p>
            <div
              className={`reveal-item h-px w-24 bg-primary/20 ${
                i % 2 !== 0 ? "ml-auto" : ""
              }`}
            />
          </div>
        </div>
      ))}
    </section>
  );
}