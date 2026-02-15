"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap, Flip, ScrollTrigger } from "@/lib/gsap";
import {heroImages} from "@/src/data/weddings";


export default function Hero() {
  const wrapperRef = useRef(null);
  const galleryRef = useRef(null);

  useEffect(() => {
    const galleryEl = galleryRef.current;
    const wrapperEl = wrapperRef.current;
    if (!galleryEl || !wrapperEl) return;

    const items = galleryEl.querySelectorAll("div.relative");

    // create matchMedia instance so we can properly revert it on unmount
    const mm = gsap.matchMedia();

    // 1. Create the context (scoped to wrapperRef)
    let ctx = gsap.context(() => {
        // Capture Flip State (desktop)
        galleryEl.classList.add("final-layout");
        const state = Flip.getState(items);
        galleryEl.classList.remove("final-layout");

        const flipAnim = Flip.to(state, {
          ease: "expo.inOut",
          simple: true,
        });

        // Create Timeline (pin) — keep reference so we can clean it up when breakpoint changes
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapperEl, // Use the wrapper
            start: "center center",
            end: "+=100%",
            scrub: true,
            pin: true, // Pin 
            invalidateOnRefresh: true,
            id: "desktop-flip",
          },
        });
        tl.add(flipAnim);

        // IMPORTANT: return a cleanup function for matchMedia so this animation & pin are removed
        return () => {
          try {
            if (tl) tl.kill();
            if (flipAnim && typeof flipAnim.kill === "function") flipAnim.kill();
            // ensure any leftover ScrollTrigger with the same id is removed
            const st = ScrollTrigger.getById && ScrollTrigger.getById("desktop-flip");
            if (st) st.kill(true);
            // remove any empty pin-spacer created by this trigger
            document.querySelectorAll('.pin-spacer').forEach(spacer => {
              try {
                if (!spacer.firstElementChild) spacer.remove();
              } catch(e) {/* ignore */}
            });
          } catch (err) {
            /* swallow cleanup errors */
          }
        };
      ;

 ;
    }, wrapperRef); // Scope to galleryEl

    // 2. Cleanup: revert gsap.context *and* matchMedia so pinned elements / scrollTriggers are removed
    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={wrapperRef} className="relative w-full overflow-hidden">
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
        "
      >
        {heroImages.map((img, index) => {
          const gridClasses = [
            "row-start-1 row-end-3 col-start-1 col-end-2",
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
                src={img.src}
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
