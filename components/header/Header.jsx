"use client";

import Link from "next/link";
import { useRef, useEffect } from "react";
import { gsap , ScrollTrigger} from "@/lib/gsap";


export default function Header() {
  const headerRef = useRef(null);

  useEffect(() => {
    if (!headerRef.current) return;

    const ctx = gsap.context(() => {

      const showAnim = gsap
        .from(headerRef.current, {
          yPercent: -100,
          paused: true,
          duration: 0.3,
        })
        .progress(1);

      ScrollTrigger.create({
        start: "top top",
        end: "max",
        onUpdate: (self) => {
          self.direction === -1
            ? showAnim.play()
            : showAnim.reverse();
        },
      });

      gsap.to(headerRef.current, {
        backgroundColor: "rgba(239, 233, 226, 0.8)",
        backdropFilter: "blur(10px)",
        scrollTrigger: {
          start: "top top",
          end: "+=50",
          scrub: true,
          id: "header-bg",
        },
      });

    }, headerRef);

    return () => ctx.revert();
  }, []);

  // Kill active ScrollTriggers before client-side navigation to avoid pin/spacer race conditions
  const handleNav = () => {
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
      console.warn("Header: failed to kill ScrollTriggers", err);
    }
  };

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-[100] w-full transition-colors duration-300 border-b border-primary/5"
    >
      <div className="max-w-[1440px] h-[70px] px-6 md:px-12 mx-auto flex items-center justify-between">
        <div className="flex-1 flex justify-start space-x-8">
          <Link
            href="/about"
            onClick={handleNav}
            className="font-ui text-xs uppercase md:tracking-[0.2em] text-primary hover:text-accent transition-colors"
          >
            About
          </Link>
        </div>

        <div className="flex-1 flex justify-center">
          <Link
            href="/"
            onClick={handleNav}
            className="font-display text-xl md:text-3xl text-primary tracking-tighter"
          >
            Wedding <span className="italic">Studio</span>
          </Link>
        </div>

        <div className="flex-1 flex justify-end">
          <Link
            href="/contact"
            onClick={handleNav}
            className="font-ui text-xs uppercase md:tracking-[0.2em] text-primary hover:text-accent transition-colors"
          >
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
}
