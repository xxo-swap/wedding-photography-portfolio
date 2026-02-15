"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

function Hero1() {
  const containerRef = useRef(null);
  const imageWrapRef = useRef(null);
  const heroTextRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroTextRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Parallax image
      tl.to(
        imageWrapRef.current,
        {
          yPercent: 20,
          ease: "none",
        },
        0
      );

      // Parallax text
      tl.to(
        heroTextRef.current,
        {
          yPercent: -50,
          opacity: 0,
          ease: "none",
        },
        0
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-screen max-w-[1440px] mx-auto overflow-hidden bg-bg"
    >
      {/* Background Video */}
      <div ref={imageWrapRef} className="absolute inset-0 z-0 scale-[1.3]">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/heroVideo.mp4"
          autoPlay
          muted
          loop
          playsInline
        />

        {/* Overlay for contrast */}
        <div className="absolute inset-0 bg-black/40 z-10" />
      </div>

      {/* Content */}
      <div
        ref={heroTextRef}
        className="relative z-30 flex flex-col items-center justify-center h-full text-center px-6"
      >
        <span className="font-ui text-xs tracking-[0.35em] uppercase text-white/70 mb-6">
          Wedding Films
        </span>

        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.1] text-white font-light">
          Some Moments Deserve
          <br />
          <span className="italic font-normal text-white/90">
            to Last Forever
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-sm md:text-base text-white/70 leading-relaxed">
          Capturing emotion, presence, and atmosphere — not just events, but the
          feeling that lives beyond the day.
        </p>

        <Link href="#featured" className="mt-10">
          <button className="px-10 py-4 rounded-full font-ui text-xs tracking-widest uppercase border border-white/40 text-white hover:bg-white hover:text-primary transition-all duration-500">
            Explore Stories
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Hero1;
