// SectionReveal — Cinematic section transitions
// Wraps a section and reveals it with clip-path + parallax driven by scroll
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type RevealType = "inset-up" | "circle-center" | "inset-sides" | "scale-up";

interface SectionRevealProps {
  children: React.ReactNode;
  type?: RevealType;
  bg?: string;
  borderColor?: string;
  className?: string;
}

export function SectionReveal({
  children,
  type = "inset-up",
  bg = "#0c101c",
  borderColor = "rgba(59,130,246,0.15)",
  className = "",
}: SectionRevealProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const inner = innerRef.current;
    if (!wrapper || !inner) return;

    const ctx = gsap.context(() => {
      // Reveal animation based on type
      if (type === "inset-up") {
        // Section reveals from bottom to top like a curtain lifting
        gsap.fromTo(inner,
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: wrapper,
              start: "top 85%",
              end: "top 30%",
              scrub: 1,
            },
          }
        );
      } else if (type === "circle-center") {
        // Iris opening from center
        gsap.fromTo(inner,
          { clipPath: "circle(0% at 50% 50%)" },
          {
            clipPath: "circle(100% at 50% 50%)",
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: wrapper,
              start: "top 80%",
              end: "top 20%",
              scrub: 1,
            },
          }
        );
      } else if (type === "inset-sides") {
        // Opens from center horizontally
        gsap.fromTo(inner,
          { clipPath: "inset(0% 50% 0% 50%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "expo.inOut",
            scrollTrigger: {
              trigger: wrapper,
              start: "top 85%",
              end: "top 30%",
              scrub: 1,
            },
          }
        );
      } else if (type === "scale-up") {
        // Scales up from small with rounded corners
        gsap.fromTo(inner,
          { scale: 0.85, borderRadius: "3rem", opacity: 0.5 },
          {
            scale: 1,
            borderRadius: "2rem 2rem 0 0",
            opacity: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: wrapper,
              start: "top 85%",
              end: "top 20%",
              scrub: 1,
            },
          }
        );
      }

      // Parallax: the section content lifts slightly as you scroll through
      gsap.fromTo(inner,
        { y: 30 },
        {
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: wrapper,
            start: "top bottom",
            end: "top top",
            scrub: 1,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [type]);

  return (
    <div ref={wrapperRef} className={`relative ${className}`} style={{ zIndex: 1 }}>
      <div
        ref={innerRef}
        className="rounded-t-[2rem] overflow-hidden will-change-[clip-path,transform]"
        style={{
          backgroundColor: bg,
          borderTop: `2px solid ${borderColor}`,
          boxShadow: `0 -12px 40px ${borderColor}`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
