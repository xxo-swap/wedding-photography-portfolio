"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function DebugGSAP() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Expose both for debugging
      window.gsap = gsap;
      window.ScrollTrigger = ScrollTrigger;
      console.log("✅ GSAP & ScrollTrigger exposed globally");
      console.log("📊 Active triggers:", ScrollTrigger.getAll().length);
    }
  }, []);

  return null;
}