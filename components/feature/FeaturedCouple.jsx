"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap  } from "@/lib/gsap";



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
    <div ref={containerRef} className="relative flex items-center justify-between gap-12 h-[80vh] bg-bg px-12">
      <div
        ref={outerWrapper}
        className="relative w-[60vw] h-[50vh] overflow-hidden rounded-sm bg-primary/10"
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
            className="object-cover grayscale group-hover:grayscale-0 transition duration-500 ease-in-out"
          />
        </div>
      </div>

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
