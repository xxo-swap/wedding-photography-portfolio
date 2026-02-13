"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { gsap, Flip, Observer } from "@/lib/gsap"; // ✅ Observer added

const IMAGES = [
  {
    id: 0,
    url: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=1200&q=80",
    alt: "Bride portrait",
  },
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1200&q=80",
    alt: "Groom portrait",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1200&q=80",
    alt: "Wedding ceremony",
  },
];

export default function ModernGallery() {
  const [activeId, setActiveId] = useState(0);
  const stripRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !IMAGES.length) return;

    const ctx = gsap.context(() => {
      // 1. ENTRANCE ANIMATION
      const title = containerRef.current.querySelector(".gallery-title");
      if (title) {
        gsap.from(title, {
          y: 50,
          opacity: 0,
          duration: 1.2,
          ease: "power4.out",
          skewY: 2,
        });
      }

      // 2. HORIZONTAL STRIP – Observer
      let x = 0;
      const track = stripRef.current;
      if (!track) return;

      const obs = Observer.create({
        target: containerRef.current.querySelector(".strip-container"),
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
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSwap = (id) => {
    if (id === activeId || !containerRef.current) return;

    const state = Flip.getState(
      containerRef.current.querySelectorAll(".gallery-item, .img-inner")
    );

    setActiveId(id);

    requestAnimationFrame(() => {
      Flip.from(state, {
        duration: 0.8,
        ease: "power4.inOut",
        absolute: true,
        scale: true,
        onEnter: (elements) =>
          gsap.fromTo(elements, { opacity: 0 }, { opacity: 1, duration: 0.5 }),
        onLeave: (elements) =>
          gsap.to(elements, { opacity: 0, duration: 0.5 }),
      });
    });
  };

  if (!IMAGES.length) return null;

  const activeImage = IMAGES.find((img) => img.id === activeId);
  const thumbnails = IMAGES.filter((img) => img.id !== activeId);

  return (
    <section
      ref={containerRef}
      className="min-h-screen bg-bg py-20 px-4 md:px-12 flex flex-col justify-center"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* HEADER */}
        <div className="mb-10 title-container overflow-hidden">
          <h2 className="gallery-title font-display text-5xl md:text-7xl text-primary italic leading-tight">
            The Art of <br /> Presence
          </h2>
        </div>

        {/* MAIN PREVIEW */}
        <div className="relative w-full aspect-[4/5] md:aspect-[21/9] mb-12 overflow-hidden rounded-sm bg-primary/5 shadow-2xl">
          <div data-flip-id="main-img" className="gallery-item w-full h-full">
            <Image
              src={activeImage.url}
              alt={activeImage.alt}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 80vw"
              className="img-inner object-cover transition-transform duration-1000 hover:scale-105"
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
                  <span className="text-bg font-ui text-xs tracking-widest uppercase">
                    View Frame
                  </span>
                </div>
                <Image
                  src={img.url}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 180px, 280px"
                  className="img-inner object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700"
                />
              </div>
            ))}
          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-12 flex flex-col md:flex-row justify-between items-end border-t border-primary/10 pt-6">
          <p className="font-body text-primary/60 max-w-sm italic">
            Capturing moments that are lived, not staged. Every frame tells a
            silent story of a day that passed too quickly.
          </p>
          <span className="font-ui text-xs tracking-[0.2em] text-primary/40 uppercase mt-4 md:mt-0">
            Portfolio 2026 — 0{activeId + 1}
          </span>
        </div>
      </div>
    </section>
  );
}