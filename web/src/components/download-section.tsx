// DownloadSection — Act IV — "Retrouvez votre voix" (CLIP-PATH IRIS + REMOTION CTA STYLE)
"use client";

import { useEffect, useRef } from "react";
import { Download } from "lucide-react";
import { useTranslations } from "next-intl";
import { useDownload } from "@/lib/use-download";
import { WindowsIcon, AppleIcon } from "@/components/icons";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Deterministic orb positions
const ORBS = [
  { x: "35%", y: "30%", size: 450, color: "rgba(63,103,246,0.12)" },
  { x: "65%", y: "60%", size: 350, color: "rgba(139,92,246,0.08)" },
];

export function DownloadSection() {
  const t = useTranslations("download");
  const { allAssets } = useDownload();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const intelRef = useRef<HTMLAnchorElement>(null);
  const urlRef = useRef<HTMLDivElement>(null);
  const orbsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // SCENE DOWNLOAD.1 — Orbs float
      orbsRef.current.filter(Boolean).forEach((orb, i) => {
        gsap.to(orb, {
          y: `${(i % 2 === 0 ? -1 : 1) * 30}`,
          x: `${(i % 2 === 0 ? 1 : -1) * 20}`,
          duration: 5 + i * 2,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });

      // SCENE DOWNLOAD.2 — Content enters via scrub (smooth, no jank)
      gsap.fromTo(descRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", end: "top 40%", scrub: 1 } });

      const words = titleRef.current?.querySelectorAll(".word-wrap .word");
      if (words?.length) {
        gsap.fromTo(words,
          { yPercent: 100, opacity: 0 },
          { yPercent: 0, opacity: 1, stagger: 0.03, ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 70%", end: "top 30%", scrub: 1 } });
      }

      const buttons = buttonsRef.current?.children;
      if (buttons?.length) {
        gsap.fromTo(buttons,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.05, ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 55%", end: "top 20%", scrub: 1 } });
      }

      gsap.fromTo(intelRef.current,
        { opacity: 0 },
        { opacity: 1, ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 40%", end: "top 15%", scrub: 1 } });

      gsap.fromTo(urlRef.current,
        { opacity: 0 },
        { opacity: 1, ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 30%", end: "top 10%", scrub: 1 } });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const titleText = t("title");

  return (
    <section
      ref={sectionRef}
      id="download"
      className="relative min-h-[80vh] flex items-center justify-center px-6 overflow-hidden"
    >
      {/* Floating gradient orbs */}
      {ORBS.map((orb, i) => (
        <div
          key={i}
          ref={(el) => { orbsRef.current[i] = el; }}
          className="absolute rounded-full pointer-events-none will-change-transform"
          style={{
            left: orb.x,
            top: orb.y,
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 60%)`,
            filter: "blur(60px)",
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Small tag */}
        <p ref={descRef} className="text-sm uppercase tracking-[0.2em] text-zinc-500 font-light mb-8">
          {t("description")}
        </p>

        {/* Main headline — word-by-word */}
        <h2 ref={titleRef} className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] mb-10">
          {titleText.split(" ").map((word, i) => (
            <span key={i} className="word-wrap inline-block overflow-hidden">
              <span className="word inline-block opacity-0 will-change-transform">{word}&nbsp;</span>
            </span>
          ))}
        </h2>

        {/* Download buttons — Remotion CTA style */}
        <div ref={buttonsRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          {/* Primary — gradient */}
          <a
            href={allAssets.windows || "#download"}
            data-cursor="download"
            className="group flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-base text-white transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
            style={{
              background: "linear-gradient(135deg, #3f67f6, #8b5cf6)",
              boxShadow: "0 10px 40px rgba(63,103,246,0.25)",
            }}
          >
            <WindowsIcon className="w-5 h-5 text-white/80" />
            {t("windows")}
            <Download className="w-4 h-4 text-white/60 group-hover:translate-y-0.5 transition-transform" />
          </a>

          {/* Secondary — bordered */}
          <a
            href={allAssets["mac-arm"] || "#download"}
            data-cursor="download"
            className="group flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-base text-white border transition-all duration-200 hover:scale-[1.03] hover:bg-white/5 active:scale-[0.97]"
            style={{ borderColor: "rgba(63,63,70,0.5)" }}
          >
            <AppleIcon className="w-5 h-5 text-white/60" />
            {t("mac")}
            <Download className="w-4 h-4 text-white/40 group-hover:translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Intel link */}
        <a
          ref={intelRef}
          href={allAssets["mac-intel"] || "#download"}
          className="inline-block text-xs text-zinc-600 hover:text-zinc-400 transition-colors underline underline-offset-4"
        >
          {t("macIntel")}
        </a>

        {/* Bottom URL */}
        <div ref={urlRef} className="mt-16">
          <span className="text-sm font-semibold text-zinc-600 tracking-widest uppercase">
            cursorvoice.prapp.dev
          </span>
        </div>
      </div>
    </section>
  );
}
