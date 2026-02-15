"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "@/lib/gsap";

export default function Portfolio({ weddings }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!weddings?.length || !containerRef.current) return;

    const ctx = gsap.context(() => {
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

    return () => ctx.revert();
  }, [weddings]);

  return (
    <section
      ref={containerRef}
      className="max-w-[1440px] mx-auto px-6 space-y-40 pb-40 mt-40"
    >
      {weddings.map((wedding, i) => (
        <div
          key={wedding.slug}
          className={`reveal-section flex flex-col ${
            i % 2 !== 0 ? "md:items-end" : "md:items-start"
          }`}
        >
          {/* IMAGE */}
          <Link
            href={`/story/${wedding.slug}`}
            className={`relative overflow-hidden bg-primary/5 shadow-2xl block ${
              "w-full md:w-2/3 aspect-[3/4]"
            }`}
          >
            <div className="parallax-img relative w-full h-[160%] -top-[10%]">
              <Image
                src={wedding.featuredImage}
                alt={wedding.featuredAlt}
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              />
            </div>

            <div className="absolute top-8 left-8 mix-blend-difference text-bg font-ui text-xs tracking-widest uppercase">
              Story {String(i + 1).padStart(2, "0")}
            </div>
          </Link>

          {/* TEXT */}
          <div
            className={`mt-12 max-w-xl space-y-4 ${
              i % 2 !== 0 ? "md:text-right" : ""
            }`}
          >
            <span className="reveal-item block font-ui text-accent text-xs uppercase tracking-widest">
              Wedding Story
            </span>

            <h2 className="reveal-item font-display text-4xl md:text-6xl text-primary leading-tight">
              {wedding.brideName} & {wedding.groomName}
            </h2>

            <p className="reveal-item font-body text-lg leading-relaxed text-text/70 italic">
              A curated collection capturing presence, emotion, and timeless
              moments from their celebration.
            </p>

            <div
              className={`reveal-item h-px w-24 bg-primary/20 ${
                i % 2 !== 0 ? "ml-auto" : ""
              }`}
            />

            <Link
              href={`/story/${wedding.slug}`}
              className="reveal-item inline-block font-ui text-xs tracking-widest uppercase border-b border-primary pb-1 hover:opacity-70"
            >
              View Story
            </Link>
          </div>
        </div>
      ))}
    </section>
  );
}
