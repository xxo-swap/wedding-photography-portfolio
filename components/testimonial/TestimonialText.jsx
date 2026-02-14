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

      // 4. Remove any pin-spacer elements manually (defensive - avoid DOM removeChild races)
      const pinSpacers = Array.from(document.querySelectorAll('.pin-spacer'));
      pinSpacers.forEach((spacer) => {
        try {
          // only handle spacers that contain our section
          if (!sectionRef.current || !spacer.contains(sectionRef.current)) return;
          const parent = spacer.parentNode;
          if (!parent) return;

          // move children out safely
          while (spacer.firstChild) {
            const child = spacer.firstChild;
            if (!child) break;
            // insertBefore may throw if DOM changed concurrently, so guard it
            if (parent.contains(spacer)) parent.insertBefore(child, spacer);
            else break;
          }

          // remove spacer if still attached
          if (parent.contains(spacer)) parent.removeChild(spacer);
        } catch (err) {
          // don't throw during unmount — just log for debugging
          console.warn('TestimonialText: pin-spacer cleanup failed', err);
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
            start: "+=20% top",
            end: "+=50%",
            scrub: true,
            pin: true,
            anticipatePin: 1,
            
          },
        });

        tl.fromTo(
          splitHeading.chars,
          { opacity: .1, y: 0 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.05,
            ease: "power2.out",
          }
        );

        tl.fromTo(
          splitPara.chars,
          { opacity: .1, y: 0  },
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
      className="h-[70vh] md:h-screen flex flex-col items-center justify-center text-center gap-4 overflow-hidden"
      style={{ opacity: isReady ? 1 : 0 }}
    >
      <h1
        ref={headingRef}
        className="text-2xl  md:text-5xl font-black uppercase tracking-wide whitespace-nowrap"
      >
        Listen to their stories.
      </h1>

      <p
        ref={paraRef}
        className="text-xs md:text-lg font-black uppercase tracking-wide max-w-[50ch] md:max-w-[90ch]"
      >
        Every wedding leaves a memory behind. Here&apos;s what our couples carried with them.
      </p>
    </section>
  );
}