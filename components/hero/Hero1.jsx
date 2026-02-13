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
      tl.to(imageWrapRef.current, {
        yPercent: 20,
        ease: "none",
      }, 0);

      // Parallax text
      tl.to(heroTextRef.current, {
        yPercent: -50,
        opacity: 0,
        ease: "none",
      }, 0);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-screen max-w-[1440px] mx-auto overflow-hidden bg-black"
    >
      {/* Background Image Container */}
      <div
        ref={imageWrapRef}
        className="absolute inset-0 z-0 scale-[1.3]"
      >
        <Image
          src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1600&q=80"
          alt="Wedding Hero"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/20 z-10" />
      </div>

      {/* Hero Content */}
      <div
        ref={heroTextRef}
        className="relative z-30 flex flex-col items-center justify-center h-full text-center px-6"
      >
        <h1 className="text-6xl md:text-8xl font-display text-white drop-shadow-lg">
          Some Moments Deserve <br /> to Last Forever
        </h1>

        <Link href="#featured" className="mt-8">
          <button className="px-8 py-3 rounded-full font-ui bg-white text-black font-medium hover:bg-opacity-90 transition-all">
            Explore Stories
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Hero1;
