"use client";

import Link from "next/link";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Header() {
  const headerRef = useRef(null);

  useEffect(() => {
    // Hide header on scroll down, show on scroll up
    const showAnim = gsap.from(headerRef.current, { 
      yPercent: -100,
      paused: true,
      duration: 0.3
    }).progress(1);

    ScrollTrigger.create({
      start: "top top",
      end: "max",
      onUpdate: (self) => {
        // self.direction: 1 is down, -1 is up
        self.direction === -1 ? showAnim.play() : showAnim.reverse();
      }
    });

    // Optional: Fade out background only when at the very top
    gsap.to(headerRef.current, {
      backgroundColor: "rgba(239, 233, 226, 0.8)", // Your --color-bg with alpha
      backdropFilter: "blur(10px)",
      scrollTrigger: {
        start: "top top",
        end: "+=50",
        scrub: true,
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-[100] w-full transition-colors duration-300 border-b border-primary/5"
    >
      <div className="max-w-[1440px] h-[70px] px-6 md:px-12 mx-auto flex items-center justify-between ">
        
        {/* Navigation Left */}
        <div className="flex-1 flex justify-start space-x-8">
          <Link href="/about" className="font-ui text-xs uppercase tracking-[0.2em] text-primary hover:text-accent transition-colors">
            About
          </Link>
        </div>

        {/* Logo Center */}
        <div className="flex-1 flex justify-center">
          <Link href="/" className="font-display text-2xl md:text-3xl text-primary tracking-tighter">
            Wedding <span className="italic">Studio</span>
          </Link>
        </div>

        {/* Navigation Right */}
        <div className="flex-1 flex justify-end">
          <Link href="/contact" className="font-ui text-xs uppercase tracking-[0.2em] text-primary hover:text-accent transition-colors">
            Contact
          </Link>
        </div>

      </div>
    </header>
  );
}