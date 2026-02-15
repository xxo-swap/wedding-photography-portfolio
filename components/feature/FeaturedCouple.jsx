"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import Link from "next/link";

export const HeartIcon = () => (
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

  const handleStoryNavigation = () => {
    try {
      ScrollTrigger.getAll().forEach((st) => {
        try {
          st.kill(true);
        } catch (e) {
          // ignore
        }
      });
      ScrollTrigger.refresh();
    } catch (err) {
      console.warn("Story: failed to kill ScrollTriggers", err);
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full py-20 md:py-32 bg-gradient-to-br from-bg via-white to-primary/5"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* IMAGE SIDE */}
          <div
            ref={outerWrapper}
            className="relative w-full h-[420px] md:h-[600px] overflow-hidden rounded-xl shadow-xl"
          >
            <div
              ref={featureImageRef}
              className="absolute inset-0 h-[130%] w-full"
            >
              <Image
                src={couple.featuredImage}
                alt={`${couple.brideName} & ${couple.groomName}`}
                fill
                priority={couple.featured}
                className="object-cover transition duration-700 ease-out hover:scale-105"
              />
            </div>

            {/* Subtle overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
          </div>

          {/* CONTENT SIDE */}
          <div className="flex flex-col gap-6 text-center md:text-left">
            <span className="font-ui text-xs tracking-[0.35em] uppercase text-secondary">
              Featured Story
            </span>

            <h3 className="font-display text-3xl sm:text-5xl md:text-6xl leading-tight text-primary">
              {couple.brideName}
              <span className="mx-4 inline-block align-middle">
                {couple.connectingIcon ? <HeartIcon /> : "&"}
              </span>
              {couple.groomName}
            </h3>

            <p className="max-w-lg mx-auto md:mx-0 text-sm md:text-base text-secondary leading-relaxed">
              A celebration of love, elegance, and timeless moments. Explore
              their journey, captured through carefully curated imagery and
              unforgettable memories.
            </p>

            <div className="pt-4">
              <Link
                onClick={handleStoryNavigation}
                href={`/story/${couple.slug}`}
                className="inline-block font-ui text-xs tracking-widest uppercase border border-primary text-primary px-8 py-4 rounded-full hover:bg-primary hover:text-white transition-all duration-300"
              >
                View Story
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
