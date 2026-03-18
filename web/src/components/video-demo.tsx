// VideoDemo — Simple GSAP scrub (no motion/react — avoids ScrollTrigger conflicts)
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function VideoDemo() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(videoRef.current,
        { scale: 0.85, opacity: 0, rotateX: 8 },
        {
          scale: 1, opacity: 1, rotateX: 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 30%",
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-6 sm:py-10 px-6" style={{ perspective: "1000px" }}>
      <div
        ref={videoRef}
        data-cursor="video"
        className="relative max-w-3xl mx-auto rounded-2xl overflow-hidden will-change-transform opacity-0"
        style={{
          border: "1px solid rgba(63,103,246,0.12)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
        }}
      >
        <div className="absolute top-0 left-0 right-0 h-px z-10" style={{ background: "linear-gradient(90deg, transparent, #3f67f6, #8b5cf6, transparent)" }} />
        <video autoPlay loop muted playsInline className="w-full h-auto block" src="/demo.mp4" />
        <div className="absolute bottom-0 left-0 right-0 h-px z-10" style={{ background: "linear-gradient(90deg, transparent, #8b5cf6, #3f67f6, transparent)" }} />
      </div>
    </section>
  );
}
