// HowItWorks — Act III — Trust (STACKED CARDS)
// SVG stroke icons animated — storytelling through 4 steps
"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STEP_KEYS = ["step1", "step2", "step3", "step4"] as const;

const STEPS = [
  {
    color: "#3f67f6",
    // Keyboard shortcut — keys pressing
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M8 12h8M6 16h12" />
      </svg>
    ),
  },
  {
    color: "#ef4444",
    // Microphone with sound waves
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="23" />
        <line x1="8" y1="23" x2="16" y2="23" />
      </svg>
    ),
  },
  {
    color: "#f59e0b",
    // Stop / square with processing spinner
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M12 8v4l2 2" />
      </svg>
    ),
  },
  {
    color: "#10b981",
    // Clipboard with checkmark — done!
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        <path d="M9 14l2 2 4-4" />
      </svg>
    ),
  },
];

export function HowItWorks() {
  const t = useTranslations("howItWorks");
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // SCENE HOWITWORKS.1 — Title word-by-word
      const words = titleRef.current?.querySelectorAll(".word-wrap .word");
      if (words?.length) {
        gsap.fromTo(words,
          { yPercent: 100, opacity: 0 },
          {
            yPercent: 0, opacity: 1,
            duration: 0.8, stagger: 0.06, ease: "expo.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none none" },
          }
        );
      }

      // SCENE HOWITWORKS.2 — Cards scrub entrance + stacking
      const cards = cardsRef.current.filter(Boolean);
      cards.forEach((card, i) => {
        // Entrance from below
        gsap.fromTo(card,
          { y: 60, opacity: 0, scale: 0.95 },
          {
            y: 0, opacity: 1, scale: 1, ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 95%", end: "top 60%", scrub: 1 },
          }
        );

        // Icon draw-in: SVG strokes animate from 0 to full
        const paths = card?.querySelectorAll(".step-icon svg path, .step-icon svg rect, .step-icon svg line, .step-icon svg circle, .step-icon svg polyline");
        if (paths?.length) {
          paths.forEach((path) => {
            const el = path as SVGGeometryElement;
            if (el.getTotalLength) {
              const len = el.getTotalLength();
              gsap.fromTo(el,
                { strokeDasharray: len, strokeDashoffset: len },
                {
                  strokeDashoffset: 0, ease: "power2.inOut",
                  scrollTrigger: { trigger: card, start: "top 85%", end: "top 50%", scrub: 1 },
                }
              );
            }
          });
        }

        // Connecting line between steps (except last)
        const connector = card?.querySelector(".step-connector");
        if (connector) {
          gsap.fromTo(connector,
            { scaleY: 0 },
            {
              scaleY: 1, ease: "power2.inOut",
              scrollTrigger: { trigger: card, start: "top 70%", end: "top 30%", scrub: 1 },
            }
          );
        }

        // Stack: scale down + blur as next covers
        if (i < cards.length - 1) {
          ScrollTrigger.create({
            trigger: card,
            start: "top 15%",
            end: "bottom 15%",
            scrub: 1,
            onUpdate: (self) => {
              const p = self.progress;
              gsap.set(card, {
                scale: 1 - p * 0.06,
                opacity: 1 - p * 0.5,
                filter: `blur(${p * 3}px)`,
              });
            },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const titleText = t("title");

  return (
    <section ref={sectionRef} className="py-20 sm:py-28 px-6">
      <div className="max-w-2xl mx-auto">
        <h2 ref={titleRef} className="text-2xl sm:text-3xl font-bold text-center mb-16">
          {titleText.split(" ").map((word, i) => (
            <span key={i} className="word-wrap inline-block overflow-hidden">
              <span className="word inline-block opacity-0 will-change-transform">{word}&nbsp;</span>
            </span>
          ))}
        </h2>

        {/* Stacked sticky cards */}
        <div className="relative">
          {STEP_KEYS.map((key, i) => {
            const step = STEPS[i];
            return (
              <div
                key={key}
                ref={(el) => { cardsRef.current[i] = el; }}
                className="sticky top-[20vh] mb-10 will-change-transform opacity-0"
                style={{ zIndex: i + 1 }}
              >
                <div
                  className="relative p-6 sm:p-8 rounded-2xl backdrop-blur-sm shadow-xl overflow-hidden"
                  style={{
                    background: "rgba(15,13,24,0.95)",
                    border: `1px solid ${step.color}20`,
                  }}
                >
                  {/* Accent glow at top */}
                  <div
                    className="absolute top-0 left-0 right-0 h-px"
                    style={{ background: `linear-gradient(90deg, transparent, ${step.color}50, transparent)` }}
                  />

                  <div className="flex items-start gap-5">
                    {/* Icon with draw-in animation */}
                    <div
                      className="step-icon shrink-0 w-14 h-14 rounded-xl flex items-center justify-center will-change-transform"
                      style={{ background: `${step.color}12`, color: step.color }}
                    >
                      {step.icon}
                    </div>

                    <div className="flex-1">
                      <span
                        className="inline-block text-[10px] font-mono uppercase tracking-wider mb-2 px-2 py-0.5 rounded-md"
                        style={{ color: step.color, background: `${step.color}10` }}
                      >
                        {t("stepLabel")} {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-lg font-semibold mb-1">{t(key)}</h3>
                      <p className="text-sm text-zinc-500 leading-relaxed">{t(`${key}Desc`)}</p>
                    </div>
                  </div>

                  {/* Connecting line to next step */}
                  {i < STEP_KEYS.length - 1 && (
                    <div
                      className="step-connector absolute -bottom-10 left-9 w-px h-10 origin-top"
                      style={{ background: `linear-gradient(to bottom, ${step.color}40, transparent)` }}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
