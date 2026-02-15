"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Gallery({ wedding }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const stripRef = useRef(null);

  if (!wedding?.images?.length) return null;

  const images = wedding.images;
  const activeImage = images[activeIndex];

  return (
    <section className="min-h-screen bg-bg py-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">

        {/* HERO HEADER */}
        <div className="mb-16 max-w-3xl">
          <p className="font-ui text-xs tracking-[0.3em] uppercase text-primary/50 mb-4">
            Wedding Story
          </p>

          <h1 className="font-display text-5xl md:text-7xl text-primary italic leading-tight mb-6">
            {wedding.brideName} & {wedding.groomName}
          </h1>

          <p className="font-body text-primary/70 text-lg leading-relaxed mb-8">
            A celebration of presence, emotion, and fleeting moments.
            This collection captures the quiet glances, joyful laughter,
            and timeless elegance of their day.
          </p>

          <div className="flex flex-wrap items-center gap-6">
            <Link
              href="/contact"
              className="px-8 py-3 bg-primary text-bg text-sm tracking-widest uppercase font-ui transition-all duration-300 hover:opacity-80"
            >
              Book Your Story
            </Link>

            <Link
              href="/portfolio"
              className="text-primary text-sm tracking-widest uppercase font-ui border-b border-primary pb-1 hover:opacity-70"
            >
              View More Stories
            </Link>
          </div>
        </div>

        {/* MAIN FEATURE IMAGE */}
        <div className="relative w-full aspect-[4/5] md:aspect-[21/9] mb-12 overflow-hidden rounded-lg shadow-2xl">
          <Image
            src={activeImage.src}
            alt={activeImage.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover transition-transform duration-700 hover:scale-105"
          />
        </div>

        {/* IMAGE STRIP */}
        <div className="overflow-x-auto">
          <div ref={stripRef} className="flex gap-5 w-max">
            {images.map((img, index) => {
              const isActive = index === activeIndex;

              return (
                <div
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`
                    relative
                    w-[160px] md:w-[240px]
                    aspect-[3/4]
                    shrink-0
                    overflow-hidden
                    rounded-md
                    cursor-pointer
                    transition-all duration-500
                    ${isActive ? "scale-105 ring-2 ring-primary" : "opacity-70"}
                  `}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="240px"
                    className="object-cover"
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* FOOTER STORY NOTE */}
        <div className="mt-16 border-t border-primary/10 pt-8 flex justify-between items-end">
          <p className="font-body text-primary/60 italic max-w-md">
            Every wedding is a narrative. Not staged. Not forced.
            Simply lived — and preserved.
          </p>

          <span className="font-ui text-xs tracking-[0.3em] uppercase text-primary/40">
            {activeIndex + 1} / {images.length}
          </span>
        </div>

      </div>
    </section>
  );
}
