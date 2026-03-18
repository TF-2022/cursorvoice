// StackingSection — Sticky card stacking with brand colors
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface StackingSectionProps {
  children: React.ReactNode;
  index: number;
  bg?: string;
  borderColor?: string;
  rounded?: boolean;
  noAnimation?: boolean;
}

export function StackingSection({
  children,
  index,
  bg = "#09090b",
  borderColor,
  rounded = false,
  noAnimation = false,
}: StackingSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || !rounded || noAnimation) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(el,
        { scale: 0.94, opacity: 0.5 },
        {
          scale: 1,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "top 15%",
            scrub: 1,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [rounded, noAnimation]);

  return (
    <div
      ref={sectionRef}
      className={`sticky top-0 will-change-transform ${rounded ? "rounded-t-[2.5rem]" : ""}`}
      style={{
        zIndex: index + 1,
        backgroundColor: bg,
        ...(borderColor && rounded ? {
          borderTop: `2px solid ${borderColor}`,
          boxShadow: `0 -16px 50px ${borderColor}`,
        } : {}),
      }}
    >
      {children}
    </div>
  );
}
