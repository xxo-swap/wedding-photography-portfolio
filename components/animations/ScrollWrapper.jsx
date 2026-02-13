"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "@/lib/gsap";

export default function ScrollWrapper({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    ScrollTrigger.refresh();
  }, [pathname]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1,
      easing: (t) => t * (2 - t),
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenis.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (arguments.length) {
          lenis.scrollTo(value);
        } else {
          return lenis.scroll;
        }
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    ScrollTrigger.addEventListener("refresh", () => lenis.resize());
    ScrollTrigger.refresh();

    return () => {
      lenis.destroy();
      ScrollTrigger.removeEventListener("refresh", () => lenis.resize()); };
  }, []);

  return <>{children}</>;
}
