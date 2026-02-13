"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap, Flip } from "@/lib/gsap";
import heroImages from "../data";

// Simple debounce helper
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export default function Hero() {
  const galleryRef = useRef(null);

  useEffect(() => {
    const galleryEl = galleryRef.current;
    if (!galleryEl) return;
    
    const items = galleryEl.querySelectorAll("div.relative");
    if (!items.length) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // DESKTOP
      mm.add("(min-width: 768px)", () => {
        let flipCtx;
        let flipTimeline;

        const createFlip = () => {
          if (flipCtx) flipCtx.revert();
          if (flipTimeline) {
            flipTimeline.scrollTrigger?.kill();
            flipTimeline.kill();
          }

          flipCtx = gsap.context(() => {
            galleryEl.classList.add("final-layout");
            const state = Flip.getState(items);
            galleryEl.classList.remove("final-layout");

            const flip = Flip.to(state, {
              ease: "expo.inOut",
              simple: true
            });

            flipTimeline = gsap.timeline({
              scrollTrigger: {
                trigger: galleryEl,
                start: "center center",
                end: "+=100%",
                scrub: true,
                pin: galleryEl.parentNode
              }
            }).add(flip);
          }, galleryEl);
        };

        createFlip();
        
        const resizeHandler = debounce(createFlip, 250);
        window.addEventListener("resize", resizeHandler);

        return () => {
          window.removeEventListener("resize", resizeHandler);
          if (flipTimeline) {
            flipTimeline.scrollTrigger?.kill();
            flipTimeline.kill();
          }
          if (flipCtx) flipCtx.revert();
        };
      });

      // MOBILE
      mm.add("(max-width: 767px)", () => {
        const tl = gsap.from(items, {
          y: 60,
          opacity: 0,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: galleryEl,
            start: "top 80%",
            end: "bottom top",
          }
        });

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      });

      return () => mm.revert();
    }, galleryEl);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative w-full ">
      <div
        ref={galleryRef}
        className="
          max-w-[1440px] mx-auto 
          overflow-hidden
          grid
          grid-cols-[repeat(3, 32.5vw)]
          grid-rows-[repeat(4, 23vh)]
          gap-[1vh]
          w-full
          h-[100vh]
          px-[2vw]
          transition-all
        "
      >
        {heroImages.map((img, index) => {
          const gridClasses = [
            "row-start-1 row-end-3 col-start-1 col-end-2 ",
            "row-start-1 row-end-2 col-start-2 col-end-3",
            "row-start-2 row-end-4 col-start-2 col-end-3",
            "row-start-1 row-end-3 col-start-3 col-end-4",
            "row-start-3 row-end-4 col-start-1 col-end-2",
            "row-start-3 row-end-4 col-start-3 col-end-4",
            "row-start-4 row-end-5 col-start-1 col-end-2",
            "row-start-4 row-end-5 col-start-2 col-end-3",
            "row-start-4 row-end-5 col-start-3 col-end-4",
          ];

          return (
            <div
              key={img.id}
              className={`relative overflow-hidden ${gridClasses[index]}`}
            >
              <Image
                src={img.url}
                alt={img.alt}
                fill
                sizes="33vw"
                className="object-cover"
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}