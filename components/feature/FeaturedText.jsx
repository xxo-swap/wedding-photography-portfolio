"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedText() {
  const top = useRef(null);
  const middle = useRef(null);
  const bottom = useRef(null);
  const containerRef = useRef(null);


  useEffect(() => {
    

    const handleResize = () => {
      [top, middle, bottom].forEach((r) => centerMiddleSpan(r));
    };
    window.addEventListener("resize", handleResize);

    const ctx = gsap.context(() => {
      // Lagged parallax movement
      gsap.to(top.current, {
        xPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: top.current,
          start: "top 40%",
          end: "bottom 40%",
          scrub: 1,
          markers:true
        },
      });


      gsap.to(bottom.current, {
        xPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: bottom.current,
          start: "top 40%",
          end: "bottom 40%",
          scrub: 1,
        },
      });
    }, containerRef);

    return () => {
      window.removeEventListener("resize", handleResize);
      ctx.revert();
    };
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="h-[100vh] flex flex-col items-center justify-center gap-8 md:gap-10 overflow-hidden select-none bg-bg"
    >
      
      {/* Top Line - Emotional Context */}
      <div 
        ref={top} 
        className="text-4xl md:text-6xl uppercase whitespace-nowrap flex gap-12 font-display text-primary italic opacity-80"
      >
        {Array(5).fill("Every couple is unique in their own way.").map((t, i) => (
          <span key={i} className={i === 2 ? "opacity-100" : "opacity-5"}>
            {t}
          </span>
        ))}
      </div>

      {/* Middle Line - The Brand Statement */}
      <div 
        ref={middle} 
        className="text-4xl md:text-8xl uppercase leading-none whitespace-nowrap flex gap-16 font-display italic font-semibold text-primary"
      >
        {Array(5).fill("Featured Stories.").map((t, i) => (
          <span key={i} className={i === 2 ? "opacity-100" : "opacity-10"}>
            {t}
          </span>
        ))}
      </div>

      {/* Bottom Line - The Philosophy */}
      <div 
        ref={bottom} 
        className="text-sm md:text-base uppercase tracking-[0.5em] whitespace-nowrap flex gap-20 font-display text-secondary font-medium"
      >
        {Array(5).fill("Here are stories embracing their best moments.").map((t, i) => (
          <span key={i} className={i === 2 ? "opacity-100" : "opacity-20"}>
            {t}
          </span>
        ))}
      </div>

    </section>
  );
}