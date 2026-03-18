// Features — Horizontal scroll with GSAP pin (the version that WORKED)
"use client";

import { useEffect, useRef, useCallback } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    key: "globalShortcut",
    color: "#3f67f6",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M8 12h8M6 16h12" />
      </svg>
    ),
  },
  {
    key: "offline",
    color: "#10b981",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    key: "autoPaste",
    color: "#8b5cf6",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        <path d="M9 14l2 2 4-4" />
      </svg>
    ),
  },
  {
    key: "multiLanguage",
    color: "#60a5fa",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    key: "fast",
    color: "#f59e0b",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    key: "openSource",
    color: "#a1a1aa",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
] as const;

function FeatureCard({
  title,
  description,
  color,
  icon,
  index,
}: {
  title: string;
  description: string;
  color: string;
  icon: React.ReactNode;
  index: number;
}) {
  const innerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = innerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty("--glow-x", `${x}px`);
    el.style.setProperty("--glow-y", `${y}px`);
    gsap.to(el, {
      rotateY: (x / rect.width - 0.5) * 10,
      rotateX: -(y / rect.height - 0.5) * 10,
      duration: 0.3, ease: "power2.out",
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    const el = innerRef.current;
    if (!el) return;
    gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
  }, []);

  return (
    <div
      ref={innerRef}
      data-cursor="card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex-shrink-0 w-[320px] sm:w-[360px] p-6 rounded-2xl overflow-hidden group will-change-transform"
      style={{
        perspective: "1000px", transformStyle: "preserve-3d",
        background: `linear-gradient(135deg, ${color}08, rgba(255,255,255,0.02))`,
        border: `1px solid ${color}25`, boxShadow: `0 4px 20px ${color}08`,
      }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(circle 160px at var(--glow-x, 50%) var(--glow-y, 50%), ${color}18, transparent 70%)` }} />
      <div className="absolute top-0 left-6 right-6 h-px" style={{ background: `linear-gradient(90deg, transparent, ${color}40, transparent)` }} />
      <div className="relative z-10 flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
          style={{ background: `${color}18`, color, boxShadow: `0 0 20px ${color}15` }}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold mb-1.5">{title}</h3>
          <p className="text-sm text-zinc-500 leading-relaxed">{description}</p>
        </div>
      </div>
      <span className="absolute bottom-3 right-5 text-[72px] font-bold leading-none select-none" style={{ color: `${color}06` }}>
        {String(index + 1).padStart(2, "0")}
      </span>
    </div>
  );
}

export function Features() {
  const t = useTranslations("features");
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      const updateCounter = (self: ScrollTrigger) => {
        if (!counterRef.current) return;
        const total = FEATURES.length;
        const idx = Math.min(total, Math.floor(self.progress * total) + 1);
        counterRef.current.textContent = `${String(idx).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
      };

      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth + 100),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${track.scrollWidth - window.innerWidth + 100}`,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: updateCounter,
        },
      });

      // Cards parallax: alternate up/down during scroll
      track.querySelectorAll("[data-cursor='card']").forEach((card, i) => {
        const dir = i % 2 === 0 ? -15 : 15;
        gsap.fromTo(card,
          { y: -dir },
          { y: dir, ease: "none",
            scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: 1 } }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const titleText = t("title");

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      <div className="absolute top-16 sm:top-20 left-0 right-0 z-10 px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <h2 className="text-2xl sm:text-3xl font-bold">
            {titleText.split(" ").map((word, i) => (
              <span key={i} className="word-wrap inline-block overflow-hidden">
                <span className="word inline-block will-change-transform">{word}&nbsp;</span>
              </span>
            ))}
          </h2>
          <div ref={counterRef} className="text-xs font-mono text-zinc-600 tabular-nums">
            01 / {String(FEATURES.length).padStart(2, "0")}
          </div>
        </div>
      </div>
      <div ref={trackRef} className="flex items-center gap-8 pl-[15vw] pr-[15vw] min-h-screen pt-32">
        {FEATURES.map((f, i) => (
          <FeatureCard
            key={f.key}
            title={t(f.key)}
            description={t(`${f.key}Desc`)}
            color={f.color}
            icon={f.icon}
            index={i}
          />
        ))}
      </div>
    </section>
  );
}
