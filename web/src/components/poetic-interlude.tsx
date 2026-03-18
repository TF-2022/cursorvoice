// PoeticInterlude — Text gradient reveal driven by scroll (Apple-style)
// Breathing section: the text starts dim and "illuminates" word by word
"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface PoeticInterludeProps {
  textKey: "first" | "second";
}

export function PoeticInterlude({ textKey }: PoeticInterludeProps) {
  const t = useTranslations("interludes");
  const sectionRef = useRef<HTMLElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);

  const text = t(textKey);
  const highlightWords = t(`${textKey}Highlight`).split(" ");

  useEffect(() => {
    const ctx = gsap.context(() => {
      const words = wordsRef.current.filter(Boolean);
      if (!words.length) return;

      // SCENE INTERLUDE.1 — Decorative line draws in
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0, opacity: 0 },
          {
            scaleX: 1,
            opacity: 1,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              end: "top 55%",
              scrub: 1,
            },
          }
        );
      }

      // SCENE INTERLUDE.2 — Parallax drift on the text container
      gsap.fromTo(
        sectionRef.current,
        { y: 30 },
        {
          y: -30,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );

      // SCENE INTERLUDE.3 — Text gradient reveal on scrub
      gsap.fromTo(
        words,
        { color: "rgb(39, 39, 42)", filter: "blur(2px)" },
        {
          color: "rgb(244, 244, 245)",
          filter: "blur(0px)",
          stagger: 0.04,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            end: "bottom 45%",
            scrub: 1,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const allWords = text.split(" ");

  return (
    <section ref={sectionRef} className="relative py-28 sm:py-36 px-6">
      {/* Decorative center line */}
      <div
        ref={lineRef}
        className="w-16 h-px mx-auto mb-12 bg-linear-to-r from-transparent via-blue-500/40 to-transparent origin-center opacity-0"
      />

      <div className="max-w-4xl mx-auto text-center">
        <p className="text-2xl sm:text-4xl lg:text-5xl font-extralight leading-snug tracking-tight">
          {allWords.map((word, i) => {
            const isHighlight = highlightWords.includes(word);
            return (
              <span key={i}>
                <span
                  ref={(el) => { wordsRef.current[i] = el; }}
                  className={`inline-block will-change-[color,filter] ${
                    isHighlight
                      ? "font-medium bg-linear-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent"
                      : ""
                  }`}
                  style={isHighlight ? { color: "transparent" } : { color: "rgb(39, 39, 42)" }}
                >
                  {word}
                </span>
                {" "}
              </span>
            );
          })}
        </p>
      </div>
    </section>
  );
}
