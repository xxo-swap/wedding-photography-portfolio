"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import Link from "next/link";

const HeartIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-[1em] h-[1em] min-w-[24px] min-h-[24px] text-primary inline-block"
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

export default function FeaturedCouple({ couple }) {
  const featureImageRef = useRef(null);
  const outerWrapper = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!outerWrapper.current) return;

    const ctx = gsap.context(() => {
      gsap.to(featureImageRef.current, {
        y: -150,
        ease: "none",
        scrollTrigger: {
          trigger: outerWrapper.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="mx-auto relative flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12 h-auto md:h-[80vh] bg-bg px-6 md:px-12 py-12"
    >
      <div
        ref={outerWrapper}
        className="relative mx-auto w-full md:w-[60vw] h-[40vh] md:h-[50vh] overflow-hidden rounded-sm bg-primary/10"
      >
        <div
          ref={featureImageRef}
          className="group absolute inset-0 w-full h-[140%]"
        >
          <Image
            src={couple.featuredImage} // Using chosen image
            alt={`${couple.brideName} & ${couple.groomName}`}
            fill
            priority={couple.featured} // Optimization for featured images
            className="object-cover grayscale  group-hover:grayscale-0 transition duration-500 ease-in-out"
          />
        </div>
      </div>

      <div className="relative flex flex-col gap-3 md:gap-5 w-full md:w-[30vw] flex-wrap">
        <span className="font-ui text-xs uppercase tracking-[0.2em] text-center md:text-start text-secondary">
          Featured Story
        </span>
        <h3 className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-primary leading-tight flex items-center justify-center md:justify-start gap-4">
          {couple.brideName}
          {couple.connectingIcon ? <HeartIcon /> : " + "}
          {couple.groomName}
        </h3>
        <div className="flex justify-start">
          <button className="font-ui text-xs uppercase tracking-widest border border-primary text-primary px-6 md:px-8 py-3 md:py-4 rounded-full hover:bg-primary hover:text-bg transition-all duration-300 w-full md:w-auto text-center">
            View Story
          </button>

        </div>
      </div>
    </div>
  );
}
