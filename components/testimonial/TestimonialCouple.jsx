"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";

export default function TestimonialCouple({ couples = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cursorRef = useRef(null);
  const imageWrapRef = useRef(null);
  const containerRef = useRef(null);

  const total = couples.length;

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      if (!cursorRef.current) return;

      gsap.set(cursorRef.current, {
        x: -100,
        y: -100,
        opacity: 0,
        scale: 1,
      });
    }, containerRef);

    return () => {
      ctx.revert();
      if (cursorRef.current) {
        gsap.killTweensOf(cursorRef.current);
      }
    };
  }, []);

  const next = () => {
    if (!total) return;
    setCurrentIndex((i) => (i + 1) % total);
  };

  const prev = () => {
    if (!total) return;
    setCurrentIndex((i) => (i - 1 + total) % total);
  };

  const handleMove = (e) => {
    if (!cursorRef.current || !imageWrapRef.current || !total) return;

    const rect = imageWrapRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const isLeft = x < rect.width / 2;

    cursorRef.current.innerText = isLeft ? "←" : "→";

    gsap.killTweensOf(cursorRef.current);

    gsap.to(cursorRef.current, {
      x: e.clientX,
      y: e.clientY,
      opacity: 1,
      duration: 0.25,
      ease: "power3.out",
    });
  };

  const handleLeave = () => {
    if (!cursorRef.current) return;

    gsap.killTweensOf(cursorRef.current);

    gsap.to(cursorRef.current, {
      opacity: 0,
      duration: 0.2,
      ease: "power2.out",
    });
  };

  const handleClick = (e) => {
    if (!cursorRef.current || !imageWrapRef.current || !total) return;

    gsap.killTweensOf(cursorRef.current);

    gsap.to(cursorRef.current, {
      scale: 0.85,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.out",
    });

    const rect = imageWrapRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;

    x < rect.width / 2 ? prev() : next();
  };

  return (
    <div
      ref={containerRef}
      className="h-screen flex flex-col items-center justify-center gap-6 bg-bg"
    >
      {total > 0 && (
        <>
          <div
            ref={imageWrapRef}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            onClick={handleClick}
            className="relative w-full h-[70vh] overflow-hidden cursor-none"
          >
            <Image
              src={couples[currentIndex].testimonial.coverImage}
              alt={couples[currentIndex].testimonial.coverAlt}
              fill
              priority
              className="object-cover"
            />
          </div>

          <div className="flex flex-col items-center justify-center text-center px-6">
            <div className="text-sm uppercase tracking-widest opacity-70">
              {couples[currentIndex].brideName} &{" "}
              {couples[currentIndex].groomName}
            </div>

            <p className="text-base md:text-lg leading-relaxed opacity-80 italic max-w-2xl">
              “{couples[currentIndex].testimonial.caption}”
            </p>
          </div>
        </>
      )}

      <div
        ref={cursorRef}
        className="fixed top-0 left-0 z-50 pointer-events-none opacity-0
        border border-primary text-primary rounded-full w-16 h-16 
        flex items-center justify-center 
        -translate-x-1/2 -translate-y-1/2"
      >
        →
      </div>
    </div>
  );
}
