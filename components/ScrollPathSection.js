"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function ScrollPathSection() {
    const sectionRef = useRef(null);
    const pathRef = useRef(null);
    const ballRef = useRef(null);

    useEffect(() => {
        if (!sectionRef.current || !pathRef.current || !ballRef.current) return;

        const ctx = gsap.context(() => {
            // Reset ball
            gsap.set(ballRef.current, {
                opacity: 0,
                transformOrigin: "50% 50%",
                force3D: true,
            });

            // 1. Ball follows motion path
            const mainTl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1,
                    anticipatePin: 1,
                },
            });

            mainTl.to(ballRef.current, {
                motionPath: {
                    path: pathRef.current,
                    align: pathRef.current,
                    alignOrigin: [0.5, 0.5],
                    autoRotate: true,
                },
                keyframes: {
                    "0%": { opacity: 0 },
                    "10%": { opacity: 1 },
                    "90%": { opacity: 1 },
                    "100%": { opacity: 0 },
                },
                ease: "none",
            });

            // 2. Breakpoint animation – scoped to sectionRef
            gsap.utils.toArray(".breakpoint", sectionRef.current).forEach((point) => {
                ScrollTrigger.create({
                    trigger: point,
                    start: "top bottom",
                    end: "bottom center",
                    onToggle: (self) => {
                        if (!ballRef.current) return;
                        gsap.to(ballRef.current, {
                            attr: { rx: self.isActive ? 12 : 10, ry: self.isActive ? 6 : 5 },
                            duration: self.isActive ? 0.4 : 0.3,
                        });
                    },
                });
            });

            // 3. Image skew – scoped
            gsap.utils.toArray(".image-square", sectionRef.current).forEach((el) => {
                gsap.fromTo(
                    el,
                    { skewX: 0 },
                    {
                        skewX: -6,
                        force3D: true,
                        scrollTrigger: {
                            trigger: el,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: true,
                        },
                    }
                );
            });
        }, sectionRef); // 👈 EVERYTHING SCOPED

        return () => ctx.revert(); // ✅ CLEAN ONLY WHAT THIS COMPONENT CREATED
    }, []);

    return (
        <section ref={sectionRef} className="relative min-h-[600vh] overflow-hidden max-w-[1440px] mx-auto bg-bg">
            <svg
                className="pointer-events-none absolute inset-0 h-full w-full z-10"
                viewBox="0 0 1000 6000"
                preserveAspectRatio="none"
                style={{
                    willChange: "transform",
                    WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%)",
                    maskImage: "linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%)"
                }}
            >
                <path
                    ref={pathRef}
                    vectorEffect="non-scaling-stroke"
                    d="M 500 0 
                       C 100 400, 100 600, 500 1000 
                       C 900 1400, 900 1600, 500 2000
                       C 100 2400, 100 2600, 500 3000
                       C 900 3400, 900 3600, 500 4000
                       C 100 4400, 100 4600, 500 5000
                       C 900 5400, 900 5600, 500 6000"
                    className="stroke-primary/20"
                    strokeWidth="1"
                    fill="none"
                />

                <ellipse
                    ref={ballRef}
                    rx="10"
                    ry="5"
                    fill="#3b3028"
                    style={{
                        willChange: "transform, opacity",
                        vectorEffect: "non-scaling-stroke"
                    }}
                />
            </svg>

            <div className="relative mx-auto max-w-6xl px-6 z-20">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="breakpoint flex min-h-screen items-center">
                        <div className={`grid grid-cols-1 md:grid-cols-12 w-full gap-12 ${i % 2 !== 0 ? 'md:text-right' : ''}`}>
                            <div className={`col-span-1 md:col-span-5  ${i % 2 !== 0 ? 'md:col-start-8' : ''}`}>
                                <p className="font-display text-2xl md:text-3xl leading-relaxed text-primary italic">
                                    {i === 0 && "Remember the first time a film leaves you breathless, or the quiet fear of realizing someone you love is no longer here — there are moments that remind us what it means to feel...."}
                                    {i === 1 && "A wedding carries that same weight. Months of preparation, emotion held in anticipation and the unspoken awareness that it will all pass too quickly...."}
                                    {i === 2 && "We understand that truth."}
                                    {i === 3 && "For you, and for us, this is not about a single day. It is about preserving a feeling — so that years later, on a long night or a quiet morning, the frame does not merely play back, but brings you right back."}
                                    {i === 4 && "It works not because of technique, lighting, or equipment, but because you were truly there — and we were present enough to witness it."}
                                    {i === 5 && "Stories that are lived, not staged. Remembered."}
                                </p>
                                <div className="image-square mt-8 w-full aspect-square bg-primary/10 rounded-sm" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}