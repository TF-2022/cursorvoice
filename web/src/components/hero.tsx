// Hero — Act I — Frustration → Discovery
"use client";

import { useEffect, useRef } from "react";
import { WifiOff, ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { useDownload } from "@/lib/use-download";
import { WindowsIcon, AppleIcon } from "@/components/icons";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ORBS = [
  { x: "15%", y: "20%", size: 300, color: "from-blue-500/20 to-violet-500/10", delay: 0 },
  { x: "75%", y: "60%", size: 250, color: "from-violet-500/15 to-pink-500/10", delay: 0.5 },
  { x: "85%", y: "15%", size: 180, color: "from-blue-400/10 to-cyan-400/10", delay: 1.0 },
];

export function Hero() {
  const t = useTranslations("hero");
  const { allAssets, platform } = useDownload();
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const freeRef = useRef<HTMLParagraphElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const orbsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // SCENE HERO.1 — Orbs: float + parallax
      orbsRef.current.filter(Boolean).forEach((orb, i) => {
        gsap.to(orb, {
          y: `${-40 - i * 20}`, x: `${(i % 2 === 0 ? 1 : -1) * 15}`,
          duration: 4 + i, ease: "sine.inOut", repeat: -1, yoyo: true, delay: ORBS[i].delay,
        });
        gsap.to(orb, {
          y: -100 - i * 50, ease: "none",
          scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: 1 },
        });
      });

      // SCENE HERO.2 — Entrance orchestration
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(badgeRef.current,
        { y: -30, opacity: 0, filter: "blur(10px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.8 }, 0.3);

      const words = headingRef.current?.querySelectorAll(".word-wrap .word");
      if (words?.length) {
        tl.fromTo(words,
          { yPercent: 120, opacity: 0, rotateX: -45 },
          { yPercent: 0, opacity: 1, rotateX: 0, duration: 0.9, stagger: 0.06, ease: "expo.out" }, 0.5);
      }

      tl.fromTo(descRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: "power2.out" }, 1.1);

      const buttons = ctaRef.current?.children;
      if (buttons?.length) {
        tl.fromTo(buttons,
          { y: 30, opacity: 0, scale: 0.85 },
          { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.15, ease: "back.out(1.8)" }, 1.4);
      }

      tl.fromTo(freeRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 }, 1.9);

      // SCENE HERO.3 — Scroll hint
      tl.fromTo(scrollHintRef.current, { opacity: 0, y: -5 }, { opacity: 1, y: 0, duration: 0.6 }, 2.2);
      gsap.to(scrollHintRef.current, {
        y: 8, opacity: 0.4, duration: 1.5, ease: "sine.inOut", repeat: -1, yoyo: true, delay: 2.8,
      });

      // SCENE HERO.4 — Scale down + fade as section 2 covers us
      // Use global scroll position since hero is sticky
      const contentEl = sectionRef.current?.querySelector(".hero-content");
      if (contentEl) {
        gsap.fromTo(contentEl,
          { scale: 1, opacity: 1 },
          {
            scale: 0.88,
            opacity: 0,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "+=80%",
              scrub: 1,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const heading1 = t("heading1");
  const heading2 = t("heading2");
  const heading3 = t("heading3");

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* Floating gradient orbs */}
      {ORBS.map((orb, i) => (
        <div
          key={i}
          ref={(el) => { orbsRef.current[i] = el; }}
          className={`absolute rounded-full bg-linear-to-br ${orb.color} blur-3xl pointer-events-none will-change-transform`}
          style={{ left: orb.x, top: orb.y, width: orb.size, height: orb.size }}
        />
      ))}

      <div className="hero-content relative z-10 max-w-3xl mx-auto text-center will-change-transform">
        <div ref={badgeRef} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-zinc-400 mb-10 opacity-0">
          <WifiOff className="w-3 h-3" />
          {t("badge")}
        </div>

        <h1 ref={headingRef} className="text-5xl sm:text-7xl font-bold tracking-tight leading-[1.08] mb-8" style={{ perspective: "800px" }}>
          {heading1.split(" ").map((word, i) => (
            <span key={`h1-${i}`} className="word-wrap inline-block overflow-hidden">
              <span className="word inline-block opacity-0 will-change-transform">{word}&nbsp;</span>
            </span>
          ))}
          {heading2.split(" ").map((word, i) => (
            <span key={`h2-${i}`} className="word-wrap inline-block overflow-hidden">
              <span className="word inline-block opacity-0 will-change-transform bg-linear-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">{word}&nbsp;</span>
            </span>
          ))}
          {heading3.split(" ").map((word, i) => (
            <span key={`h3-${i}`} className="word-wrap inline-block overflow-hidden">
              <span className="word inline-block opacity-0 will-change-transform">{word}{i < heading3.split(" ").length - 1 ? "\u00A0" : ""}</span>
            </span>
          ))}
        </h1>

        <p ref={descRef} className="text-lg sm:text-xl text-zinc-400 max-w-xl mx-auto mb-12 leading-relaxed opacity-0">
          {t("description")}
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={allAssets.windows || "#download"}
            data-cursor="download"
            className={`group relative flex items-center gap-3 px-7 py-3.5 rounded-xl font-semibold text-sm hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 opacity-0 ${
              platform === "windows"
                ? "bg-linear-to-r from-blue-500 to-violet-500 text-white shadow-lg shadow-blue-500/25"
                : "border border-white/10 bg-white/5 hover:bg-white/10 text-white"
            }`}
          >
            <WindowsIcon className={`w-4 h-4 ${platform === "windows" ? "text-white/80" : "text-zinc-400 group-hover:text-white transition-colors"}`} />
            {t("downloadWindows")}
            {platform === "windows" && <span className="absolute -top-2 -right-2 px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500 text-white shadow-sm">✓</span>}
          </a>
          <a
            href={allAssets["mac-arm"] || "#download"}
            data-cursor="download"
            className={`group relative flex items-center gap-3 px-7 py-3.5 rounded-xl font-semibold text-sm hover:scale-[1.03] active:scale-[0.97] transition-all duration-200 opacity-0 ${
              platform === "mac-arm" || platform === "mac-intel"
                ? "bg-linear-to-r from-blue-500 to-violet-500 text-white shadow-lg shadow-blue-500/25"
                : "border border-white/10 bg-white/5 hover:bg-white/10 text-white"
            }`}
          >
            <AppleIcon className={`w-4 h-4 ${platform === "mac-arm" || platform === "mac-intel" ? "text-white/80" : "text-zinc-400 group-hover:text-white transition-colors"}`} />
            {t("downloadMac")}
            {(platform === "mac-arm" || platform === "mac-intel") && <span className="absolute -top-2 -right-2 px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-emerald-500 text-white shadow-sm">✓</span>}
          </a>
        </div>

        <p ref={freeRef} className="text-xs text-zinc-600 mt-5 opacity-0">{t("free")}</p>
      </div>

      {/* Scroll hint */}
      <div ref={scrollHintRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0">
        <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-600">{t("scroll")}</span>
        <ChevronDown className="w-4 h-4 text-zinc-600" />
      </div>
    </section>
  );
}
