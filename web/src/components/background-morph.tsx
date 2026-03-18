// BackgroundMorph — Gradient background that shifts through sections
// Creates depth by morphing the ambient color as user scrolls through acts
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function BackgroundMorph() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bg = bgRef.current;
    if (!bg) return;

    const ctx = gsap.context(() => {
      // Morph background gradient based on scroll progress
      ScrollTrigger.create({
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        onUpdate: (self) => {
          const p = self.progress;

          // Act I (0-30%): deep indigo
          // Act II (30-60%): deep blue-violet
          // Act III (60-100%): deep purple → back to dark
          let r: number, g: number, b: number;

          if (p < 0.3) {
            // zinc-950 → slight indigo
            const t = p / 0.3;
            r = 9 + t * 4;
            g = 9 + t * 2;
            b = 11 + t * 12;
          } else if (p < 0.6) {
            // indigo → deep blue
            const t = (p - 0.3) / 0.3;
            r = 13 - t * 3;
            g = 11 + t * 4;
            b = 23 + t * 8;
          } else {
            // deep blue → back to dark
            const t = (p - 0.6) / 0.4;
            r = 10 - t * 1;
            g = 15 - t * 6;
            b = 31 - t * 20;
          }

          bg.style.backgroundColor = `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={bgRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ backgroundColor: "rgb(9, 9, 11)" }}
    />
  );
}
