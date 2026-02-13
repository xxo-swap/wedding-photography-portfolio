"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Hero1() {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const heroTextRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !imageRef.current || !heroTextRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroTextRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true, // Smoothly links animation to scroll
      },
    });

    // PARALLAX LOGIC:
    // 1. Move the image slower (or scale it) to create depth
    tl.to(imageRef.current, {
      yPercent: 20, // Moves image down slightly as you scroll down
      ease: "none",
    }, 0);

    // 2. Move text faster or fade it out
    tl.to(heroTextRef.current, {
      yPercent: -50, // Moves text up faster than the scroll
      opacity: 0,
      ease: "none",
    }, 0);

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative h-screen max-w-[1440px] mx-auto overflow-hidden bg-black">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <Image
          ref={imageRef}
          src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1600&q=80"
          alt="Wedding Hero"
          fill
          priority
          className="object-cover scale-[1.3]" // Start slightly zoomed for movement room
        />
        {/* Subtle Overlay to make text pop */}
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