"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, SplitText } from "@/lib/gsap";

export default function TestimonialText() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const paraRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    let splitHeading;
    let splitPara;
    let tl;
    let isCleanedUp = false;

    const cleanup = () => {
      if (isCleanedUp) return;
      isCleanedUp = true;

      // 1. Kill timeline and its ScrollTrigger
      if (tl) {
        if (tl.scrollTrigger) {
          tl.scrollTrigger.kill(true);
        }
        tl.kill();
      }

      // 2. Kill ALL ScrollTriggers on this element
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === sectionRef.current) {
          st.kill(true);
        }
      });

      // 3. Revert SplitText
      if (splitHeading) splitHeading.revert();
      if (splitPara) splitPara.revert();

      // 4. Remove any pin-spacer elements manually
      const pinSpacers = document.querySelectorAll('.pin-spacer');
      pinSpacers.forEach(spacer => {
        if (spacer.contains(sectionRef.current)) {
          const parent = spacer.parentNode;
          while (spacer.firstChild) {
            parent.insertBefore(spacer.firstChild, spacer);
          }
          spacer.remove();
        }
      });
    };

    const ctx = gsap.context(() => {
      document.fonts.ready.then(() => {
        if (isCleanedUp) return;

        // Split text into characters
        splitHeading = new SplitText(headingRef.current, {
          type: "chars",
        });

        splitPara = new SplitText(paraRef.current, {
          type: "chars",
        });

        // Timeline with pinning
        tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=1000",
            scrub: true,
            pin: true,
            anticipatePin: 1,
          },
        });

        tl.fromTo(
          splitHeading.chars,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.05,
            ease: "power2.out",
          }
        );

        tl.fromTo(
          splitPara.chars,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.02,
            ease: "power2.out",
          },
          "-=0.3"
        );

        ScrollTrigger.refresh();
        setIsReady(true);
      });
    }, sectionRef);

    return () => {
      cleanup();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="h-screen flex flex-col items-center justify-center text-center gap-4 overflow-hidden"
      style={{ opacity: isReady ? 1 : 0 }}
    >
      <h1
        ref={headingRef}
        className="text-5xl font-black uppercase tracking-wide whitespace-nowrap"
      >
        Listen to their stories.
      </h1>

      <p
        ref={paraRef}
        className="text-sm font-black uppercase tracking-wide max-w-[90vw]"
      >
        Every wedding leaves a memory behind. Here&apos;s what our couples carried with them.
      </p>
    </section>
  );
}