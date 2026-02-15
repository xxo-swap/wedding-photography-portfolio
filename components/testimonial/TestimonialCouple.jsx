"use client";

import { useState, useRef, useLayoutEffect, useCallback } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { HeartIcon } from "../feature/FeaturedCouple";

export default function TestimonialCouple({ couples = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = couples.length;

  const containerRef = useRef(null);
  const cursorRef = useRef(null);
  const imageWrapRef = useRef(null);
  const slidesContainerRef = useRef(null);
  const textContentRef = useRef(null);

  const isAnimating = useRef(false);
  const xTo = useRef();
  const yTo = useRef();

  useLayoutEffect(() => {
    if (!total || !slidesContainerRef.current) return;

    const ctx = gsap.context(() => {
      xTo.current = gsap.quickSetter(cursorRef.current, "x", "px");
      yTo.current = gsap.quickSetter(cursorRef.current, "y", "px");
      gsap.set(cursorRef.current, { opacity: 0, scale: 0 });

      const slides = slidesContainerRef.current.children;
      gsap.set(slides, { xPercent: 100, display: "none" });
      gsap.set(slides[0], { xPercent: 0, display: "block" });
      gsap.set(slidesContainerRef.current.querySelectorAll("img"), {
        scale: 1.15,
      });
    }, containerRef);

    return () => ctx.revert();
  }, [total]);

  const animateSlide = useCallback(
    (direction) => {
      if (isAnimating.current || !total) return;
      isAnimating.current = true;

      const slides = slidesContainerRef.current.children;
      const nextIndex = (currentIndex + direction + total) % total;
      const currentSlide = slides[currentIndex];
      const nextSlide = slides[nextIndex];

      const currentImg = currentSlide.querySelector("img");
      const nextImg = nextSlide.querySelector("img");

      const tl = gsap.timeline({
        onComplete: () => {
          isAnimating.current = false;
          gsap.set(currentSlide, { display: "none" });
        },
      });

      tl.to(textContentRef.current, {
        opacity: 0,
        y: 10,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => setCurrentIndex(nextIndex),
      });

      tl.to(currentSlide, {
        xPercent: direction === 1 ? -100 : 100,
        duration: 1.1,
        ease: "expo.inOut",
      }, 0.2);

      tl.to(currentImg, {
        xPercent: direction === 1 ? 20 : -20,
        duration: 1.1,
        ease: "expo.inOut",
      }, 0.2);

      tl.fromTo(
        nextSlide,
        { xPercent: direction === 1 ? 100 : -100, display: "block" },
        { xPercent: 0, duration: 1.1, ease: "expo.inOut" },
        0.2
      );

      tl.fromTo(
        nextImg,
        { xPercent: direction === 1 ? -20 : 20 },
        { xPercent: 0, duration: 1.1, ease: "expo.inOut" },
        0.2
      );

      tl.to(textContentRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      }, "-=0.4");
    },
    [currentIndex, total]
  );

  const next = () => animateSlide(1);
  const prev = () => animateSlide(-1);

  const handleMouseMove = (e) => {
    if (!xTo.current || !yTo.current) return;
    xTo.current(e.clientX);
    yTo.current(e.clientY);
    gsap.to(cursorRef.current, { opacity: 1, scale: 1, duration: 0.3 });

    const rect = imageWrapRef.current.getBoundingClientRect();
    cursorRef.current.innerText =
      e.clientX - rect.left < rect.width / 2 ? "PREV" : "NEXT";
  };

  if (!total) return null;

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-screen bg-bg text-primary flex items-center overflow-hidden py-20"
    >
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 z-50 pointer-events-none hidden md:flex items-center justify-center w-20 h-20 rounded-full border border-primary/20 backdrop-blur-md text-primary text-[10px] tracking-widest uppercase font-ui -translate-x-1/2 -translate-y-1/2"
      />

      <div className="max-w-7xl mx-auto w-full px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

        {/* IMAGE SIDE */}
        <div className="lg:col-span-7 relative">
          <div
            ref={imageWrapRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() =>
              gsap.to(cursorRef.current, { opacity: 0, scale: 0 })
            }
            onClick={(e) => {
              const rect = imageWrapRef.current.getBoundingClientRect();
              e.clientX - rect.left < rect.width / 2 ? prev() : next();
            }}
            className="relative aspect-[4/5] md:aspect-[3/4] overflow-hidden cursor-none bg-primary/5 rounded-sm border border-primary/10 shadow-2xl"
          >
            <div ref={slidesContainerRef} className="absolute inset-0">
              {couples.map((couple, i) => (
                <div
                  key={`slide-${couple.id || i}`}
                  className="absolute inset-0 will-change-transform overflow-hidden"
                >
                  <Image
                    unoptimized
                    src={couple.testimonial.coverImage}
                    alt={couple.brideName || "Wedding Story"}
                    fill
                    priority={i === 0}
                    className="object-cover scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* TEXT SIDE — FIXED LAYOUT */}
        <div className="lg:col-span-5 flex flex-col h-full justify-center items-center gap-5">

          {/* TEXT BLOCK */}
          <div
            ref={textContentRef}
            className="will-change-transform"
          >
            <p className="text-3xl md:text-6xl xl:text-7xl text-secondary font-light italic leading-[1.15] tracking-tight max-w-2xl max-h-[50vh]  pr-4">
              “{couples[currentIndex]?.testimonial?.caption}”
            </p>
            <div className="h-[1px] w-full bg-gradient-to-r from-accent via-accent/20 to-transparent mb-8 mt-2" />

            <h2 className="text-sm md:text-3xl font-display tracking-tight leading-[1.2] text-primary">
              <span className="font-light">
               - {couples[currentIndex]?.groomName}
              </span>
            </h2>


            
          </div>

          {/* NAVIGATION — LOCKED TO BOTTOM */}
          <div className="mt-auto flex flex-col items-center justify-start gap-2">

            <div className="flex items-center space-x-4">
              <button
                onClick={prev}
                className="group p-4 border border-primary/20 rounded-full text-primary hover:border-accent hover:text-accent transition-all duration-500"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="rotate-180 group-hover:-translate-x-1 transition-transform">
                  <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="1" strokeLinecap="square"/>
                </svg>
              </button>

              <button
                onClick={next}
                className="group p-4 border border-primary/20 rounded-full text-primary hover:border-accent hover:text-accent transition-all duration-500"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="group-hover:translate-x-1 transition-transform">
                  <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="1" strokeLinecap="square"/>
                </svg>
              </button>
            </div>

            <div className="font-ui text-[12px] tracking-widest uppercase text-primary">
              <span className="font-bold">{currentIndex + 1}</span> / {total}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
