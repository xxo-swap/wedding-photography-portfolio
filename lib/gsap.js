import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { SplitText } from "gsap/SplitText";
import Observer from "gsap/Observer";


if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, Flip, MotionPathPlugin, SplitText, Observer);
}

export { gsap, ScrollTrigger, Flip, MotionPathPlugin, SplitText, Observer };
    