"use client";

import { useState, useRef, useLayoutEffect, useCallback } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";

export default function TestimonialCouple({ couples = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = couples.length;

  const containerRef = useRef(null);
  const cursorRef = useRef(null);
  const imageWrapRef = useRef(null);
  const slidesContainerRef = useRef(null);
  const textContentRef = useRef(null);

  const isAnimating = useRef(false);
  const touchStartRef = useRef(0);
  const xTo = useRef();
  const yTo = useRef();

  useLayoutEffect(() => {
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
  }, []);

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

      // 1. Fade out text first to avoid the "snap" glitch
      tl.to(textContentRef.current, {
        opacity: 0,
        y: 10,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          // Update state mid-animation while text is invisible
          setCurrentIndex(nextIndex);
        },
      });

      // 2. Parallel Slide & Image Parallax
      tl.to(
        currentSlide,
        {
          xPercent: direction === 1 ? -100 : 100,
          duration: 1.1,
          ease: "expo.inOut",
        },
        0.2
      );

      tl.to(
        currentImg,
        {
          xPercent: direction === 1 ? 20 : -20,
          duration: 1.1,
          ease: "expo.inOut",
        },
        0.2
      );

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

      // 3. Reveal new text after image is mostly in place
      tl.to(
        textContentRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.4"
      );
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
      className="relative w-full min-h-screen bg-primary/40  text-bg flex flex-col justify-center overflow-hidden font-body py-20"
    >
      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 z-50 pointer-events-none hidden md:flex items-center justify-center
                   w-20 h-20 rounded-full border border-bg/20 backdrop-blur-md
                   text-bg text-[10px] tracking-widest uppercase font-ui -translate-x-1/2 -translate-y-1/2"
      />

      <div className="max-w-7xl mx-auto w-full px-6 grid grid-cols-1 lg:grid-cols-12 gap-2 md:gap-20 items-center">
        {/* Image Section */}
        <div className="lg:col-span-7 relative group rounded-sm border border-primary">
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
            className="relative aspect-[4/5] md:aspect-[3/4] overflow-hidden cursor-none bg-black/10 rounded-sm"
          >
            <div
              ref={slidesContainerRef}
              className="absolute inset-0 border border-accent shadow-lg shadow-accent/20"
            >
              {couples.map((couple, i) => (
                <div
                  key={couple.id}
                  className="absolute inset-0 will-change-transform overflow-hidden"
                >
                  <Image
                    src={couple.testimonial.coverImage}
                    alt={couple.brideName}
                    fill
                    priority={i === 0}
                    className="object-cover scale-110"
                    sizes="(max-width: 768px) 100vw, 60vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-accent/50 to-transparent" />

                  {/* Optional: Add a subtle vignette effect (darker corners) */}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Fixed Text Section to prevent layout jumping */}
        <div className="lg:col-span-5 flex flex-col space-y-10 min-h-[400px] justify-center">
          <div ref={textContentRef} className="will-change-transform">
            <span className="font-ui text-[.75em] tracking-[0.5em] uppercase text-secondary block mb-4">
              Testimonials
            </span>
            <h2 className="text-5xl md:text-8xl font-display tracking-tighter leading-[0.85] text-primary mb-6">
              {couples[currentIndex].brideName} <br />
              <span className="italic font-light text-primary">
                & {couples[currentIndex].groomName}
              </span>
            </h2>
            <div className="h-[1px] w-32 bg-accent/60 mb-8" />
            <p className="text-xl md:text-3xl text-primary font-light italic leading-snug max-w-lg">
              “{couples[currentIndex].testimonial.caption}”
            </p>
          </div>

          {/* Controls - Separated from animated text container */}
          <div className="flex items-center space-x-10">
            <div className="flex items-center space-x-4">
              <button
                onClick={prev}
                className="group p-4 border border-primary rounded-full text-primary hover:border-accent transition-all duration-500"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="rotate-180 group-hover:-translate-x-1 transition-transform"
                >
                  <path
                    d="M5 12H19M19 12L13 6M19 12L13 18"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="square"
                  />
                </svg>
              </button>
              <button
                onClick={next}
                className="group p-4 border border-primary rounded-full text-primary hover:border-accent transition-all duration-500"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="group-hover:translate-x-1 transition-transform"
                >
                  <path
                    d="M5 12H19M19 12L13 6M19 12L13 18"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="square"
                  />
                </svg>
              </button>
            </div>
            <div className="font-ui text-[12px] tracking-widest uppercase text-primary">
              <span className="text-primary">{currentIndex + 1}</span> / {total}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
