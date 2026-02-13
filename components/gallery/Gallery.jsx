"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import Flip from "gsap/Flip";
import Observer from "gsap/Observer";

gsap.registerPlugin(Flip, Observer);

const IMAGES = [
  {
    client1 : {

    }
  }
] 

export default function ModernGallery({gallery}) {
  const [activeId, setActiveId] = useState(0);
  const stripRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // 1. Initial Animation for entrance
    gsap.from(".gallery-title", {
      y: 50,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out",
      skewY: 2
    });

    // 2. Horizontal Strip Scroll Logic
    let x = 0;
    const track = stripRef.current;
    
    const obs = Observer.create({
      target: ".strip-container",
      type: "wheel,pointer,touch",
      onChangeX(self) {
        const maxX = -(track.scrollWidth - track.offsetWidth + 80);
        x = gsap.utils.clamp(maxX, 0, x + self.deltaX * -1.2);
        gsap.to(track, {
          x,
          duration: 1,
          ease: "expo.out",
          overwrite: "auto",
        });
      },
    });

    return () => obs.kill();
  }, []);

  const handleSwap = (id) => {
    if (id === activeId) return;

    // Record the current state of all elements with data-flip-id
    const state = Flip.getState(".gallery-item, .img-inner");

    setActiveId(id);

    // After state change, Flip calculates the delta and animates
    requestAnimationFrame(() => {
      Flip.from(state, {
        duration: 0.8,
        ease: "power4.inOut",
        absolute: true, // Prevents layout collapsing during transition
        scale: true,
        onEnter: elements => gsap.fromTo(elements, {opacity: 0}, {opacity: 1, duration: 0.5}),
        onLeave: elements => gsap.to(elements, {opacity: 0, duration: 0.5})
      });
    });
  };

  const activeImage = IMAGES.find((img) => img.id === activeId);
  const thumbnails = IMAGES.filter((img) => img.id !== activeId);

  return (
    <section ref={containerRef} className="min-h-screen bg-bg py-20 px-4 md:px-12 flex flex-col justify-center">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* HEADER: Using your v5 font-display and primary color */}
        <div className="mb-10 title-container overflow-hidden">
          <h2 className="gallery-title font-display text-5xl md:text-7xl text-primary italic leading-tight">
            The Art of <br /> Presence
          </h2>
        </div>

        {/* MAIN PREVIEW: High-end wide aspect ratio */}
        <div className="relative w-full aspect-[4/5] md:aspect-[21/9] mb-12 overflow-hidden rounded-sm bg-primary/5 shadow-2xl">
          <div 
            data-flip-id="main-img" 
            className="gallery-item w-full h-full"
          >
            <img
              src={activeImage.url}
              className="img-inner w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
              alt="Active View"
            />
          </div>
        </div>

        {/* THUMBNAIL STRIP */}
        <div className="strip-container relative w-full overflow-hidden py-4 cursor-grab active:cursor-grabbing">
          <div ref={stripRef} className="flex gap-6 w-max px-4">
            {thumbnails.map((img) => (
              <div
                key={img.id}
                onClick={() => handleSwap(img.id)}
                className="gallery-item w-[180px] md:w-[280px] aspect-[3/4] md:aspect-[4/3] shrink-0 overflow-hidden rounded-sm bg-primary/10 group relative"
                data-flip-id={img.id === activeId ? "main-img" : `thumb-${img.id}`}
              >
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
                    <span className="text-bg font-ui text-xs tracking-widest uppercase">View Frame</span>
                </div>
                <img
                  src={img.url}
                  className="img-inner w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700"
                  alt="Thumbnail"
                />
              </div>
            ))}
          </div>
        </div>

        {/* FOOTER TEXT */}
        <div className="mt-12 flex flex-col md:flex-row justify-between items-end border-t border-primary/10 pt-6">
            <p className="font-body text-primary/60 max-w-sm italic">
                Capturing moments that are lived, not staged. Every frame tells a silent story of a day that passed too quickly.
            </p>
            <span className="font-ui text-xs tracking-[0.2em] text-primary/40 uppercase mt-4 md:mt-0">
                Portfolio 2026 — 0{activeId + 1}
            </span>
        </div>
      </div>
    </section>
  );
}