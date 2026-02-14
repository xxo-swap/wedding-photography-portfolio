"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "@/lib/gsap";

export default function ScrollWrapper({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    // Log active ScrollTriggers + pin-spacers to help find lingering triggers
    try {
      const triggers = ScrollTrigger.getAll();
      if (triggers.length) {
        console.groupCollapsed(`ScrollWrapper: ${triggers.length} active ScrollTrigger(s)`);
        triggers.forEach((st, i) => {
          console.log(i, {
            id: st.id || (st.vars && st.vars.id) || null,
            trigger: st.trigger ? `${st.trigger.tagName}${st.trigger.id ? `#${st.trigger.id}` : ''}` : null,
            inDOM: !!(st.trigger && document.body.contains(st.trigger)),
            hasPin: !!st.pin,
            pinSpacerPresent: !!(st.pin && document.body.contains(st.pin)),
          });
        });
        console.groupEnd();
      }

      // Defensive cleanup: kill any ScrollTriggers whose trigger is no longer in the DOM
      triggers.forEach((st) => {
        if (st.trigger && !document.body.contains(st.trigger)) {
          st.kill(true);
        }
      });

      // remove any empty/orphaned pin-spacer elements left behind
      document.querySelectorAll('.pin-spacer').forEach((spacer) => {
        try {
          if (!spacer.firstElementChild) spacer.remove();
        } catch (err) {
          /* ignore */
        }
      });
    } catch (err) {
      console.warn("ScrollWrapper: cleanup error", err);
    }

    ScrollTrigger.refresh();
  }, [pathname]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1,
      easing: (t) => t * (2 - t),
      smooth: true,
    });

    let rafId = null;
    const onRaf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(onRaf);
    };
    rafId = requestAnimationFrame(onRaf);

    const onLenisScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onLenisScroll);

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

    const onRefresh = () => lenis.resize();
    ScrollTrigger.addEventListener("refresh", onRefresh);
    ScrollTrigger.refresh();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      lenis.off && lenis.off("scroll", onLenisScroll);
      lenis.destroy();
      ScrollTrigger.removeEventListener("refresh", onRefresh);
      // clear scrollerProxy so ScrollTrigger doesn't reference the destroyed lenis
      ScrollTrigger.scrollerProxy(document.body, null);
    };
  }, []);

  return <>{children}</>;
}
