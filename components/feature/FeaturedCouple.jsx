"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Ensure ScrollTrigger is registered
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const HeartIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    // Added min-w-[24px] min-h-[24px] as a fail-safe for small screens
    className="w-[1em] h-[1em] min-w-[24px] min-h-[24px] text-primary inline-block"
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

export default function FeaturedCouple({ couple }) {
  const featureImageRef = useRef(null);
  const outerWrapper = useRef(null);

  useEffect(() => {
    if (!featureImageRef.current || !outerWrapper.current) return;

    gsap.to(featureImageRef.current, {
      y: -200, // Moves image upward as user scrolls down
      ease: "none",
      force3D: true, // Forces GPU acceleration, similar to translate3d
      scrollTrigger: {
        trigger: outerWrapper.current,
        start: "top bottom", // Starts when top of image hits bottom of viewport
        end: "bottom top", // Ends when bottom of image leaves top of viewport
        scrub: true, // Smoothly links animation to scroll position
      },
    });
  }, []);

  return (
    <div
      id="featured"
      className="relative flex items-center justify-between gap-12 h-[80vh] bg-bg px-12"
    >
      {/* --- PARALLAX IMAGE BOX --- */}
      <div
        ref={outerWrapper}
        className="relative w-[60vw] h-[50vh] overflow-hidden rounded-sm bg-primary/10 shadow-inner"
      >
        <div ref={featureImageRef} className=" group absolute inset-0 w-full h-[150%]">
          <Image
            src={couple.img}
            alt={`Wedding of ${couple.name}`}
            fill
            className="object-cover  grayscale group-hover:grayscale-0 transition duration-500 ease-in-out"
          />
        </div>
      </div>

      {/* --- TEXT & CTA --- */}
      <div className="flex flex-col gap-6 w-[30vw]">
        <span className="font-ui text-xs uppercase tracking-[0.3em] text-secondary">
          Featured Story
        </span>
        <h3 className="font-display text-5xl md:text-6xl text-primary leading-tight flex items-center gap-4">
          {couple.brideName}
          {couple.connectingIcon ? <HeartIcon /> : " + "}
          {couple.groomName}
        </h3>
        <div className="flex justify-start">
          <button className="font-ui text-xs uppercase tracking-widest border border-primary text-primary px-8 py-4 rounded-full hover:bg-primary hover:text-bg transition-all duration-300">
            View Story
          </button>
        </div>
      </div>
    </div>
  );
}
