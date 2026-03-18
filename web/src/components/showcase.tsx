// Showcase — "Works everywhere" — Infinity brand marquee + stats
"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ── Brand SVG Icons ──────────────────────────────────────────
function VSCodeIcon() { return <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63L2.92 6.06a.998.998 0 0 0-1.277.04L.32 7.282a1 1 0 0 0 0 1.437L4.12 12 .32 15.282a1 1 0 0 0 0 1.437l1.323 1.18a.998.998 0 0 0 1.277.041l4.124-3.07 9.46 8.63a1.492 1.492 0 0 0 1.705.29l4.94-2.377A1.498 1.498 0 0 0 24 19.92V4.08a1.498 1.498 0 0 0-.85-1.493zM17.66 17.41l-7.11-5.41 7.11-5.41z"/></svg>; }
function NotionIcon() { return <svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z"/></svg>; }
function SlackIcon() { return <svg viewBox="0 0 24 24" fill="currentColor"><path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zm0 1.271a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zm10.122 2.521a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zm-1.268 0a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zm-2.523 10.122a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zm0-1.268a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/></svg>; }
function GmailIcon() { return <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/></svg>; }
function TerminalIcon() { return <svg viewBox="0 0 24 24" fill="currentColor"><path d="M0 2v20h24V2zm22 18H2V6h20zm-8-4h6v2h-6zm-3.172-2.414L7.414 17l-1.828-1.828L8.172 12.5 5.586 10.828 7.414 9l3.414 3.586z"/></svg>; }
function ChromeIcon() { return <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C8.21 0 4.831 1.757 2.632 4.501l3.953 6.848A5.454 5.454 0 0 1 12 6.545h10.691A12 12 0 0 0 12 0zM1.931 5.47A11.943 11.943 0 0 0 0 12c0 6.012 4.42 10.991 10.189 11.864l3.953-6.847a5.45 5.45 0 0 1-6.865-2.29zm13.342 2.166a5.446 5.446 0 0 1 1.819 7.555l-3.954 6.848A12.012 12.012 0 0 0 24 12c0-1.578-.315-3.08-.873-4.457zM12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z"/></svg>; }
function DiscordIcon() { return <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z"/></svg>; }
function FigmaIcon() { return <svg viewBox="0 0 24 24" fill="currentColor"><path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.354-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.098-7.509a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.354 3.019 3.019 3.019h.098c1.665 0 3.019-1.354 3.019-3.019 0-1.665-1.354-3.019-3.019-3.019h-.098z"/></svg>; }
function WordIcon() { return <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.004 1.5q.41 0 .703.293t.293.703v19.008q0 .41-.293.703t-.703.293H6.996q-.41 0-.703-.293T6 21.504V18H.996q-.41 0-.703-.293T0 17.004V6.996q0-.41.293-.703T.996 6H6V2.496q0-.41.293-.703t.703-.293zM6.035 11.203l1.442 4.735h1.64l1.57-7.876H9.036l-.937 4.653-1.325-4.5H5.38l-1.406 4.523-.938-4.676H1.312l1.57 7.876h1.641zM22.5 21v-3h-15v3zm0-4.5v-3.75H12v3.75zm0-5.25V7.5H12v3.75zm0-5.25V3h-15v3z"/></svg>; }
function GoogleDocsIcon() { return <svg viewBox="0 0 24 24" fill="currentColor"><path d="M14.727 6.727H14V0h.727zM24 6.727h-.727V0H24zM6.545 0H6v6.727h.545zm12.727 0v6.727h.728V0zM0 6.727V24h24V6.727zm21.818 15.091H2.182V8.909h19.636zM4.364 12.545h7.854v1.091H4.364zm0 2.727h15.272v1.091H4.364zm0 2.728h15.272v1.091H4.364z"/></svg>; }

// ── Marquee data ──────────────────────────────────────────
const ROW_1 = [
  { icon: VSCodeIcon, name: "VS Code", color: "#3b82f6" },
  { icon: NotionIcon, name: "Notion", color: "#e4e4e7" },
  { icon: SlackIcon, name: "Slack", color: "#8b5cf6" },
  { icon: GmailIcon, name: "Gmail", color: "#ef4444" },
  { icon: TerminalIcon, name: "Terminal", color: "#10b981" },
  { icon: ChromeIcon, name: "Chrome", color: "#f59e0b" },
  { icon: FigmaIcon, name: "Figma", color: "#a855f7" },
  { icon: WordIcon, name: "Word", color: "#2563eb" },
  { icon: DiscordIcon, name: "Discord", color: "#5865f2" },
  { icon: GoogleDocsIcon, name: "Docs", color: "#3b82f6" },
];

const ROW_2 = [
  { icon: ChromeIcon, name: "Chrome", color: "#f59e0b" },
  { icon: TerminalIcon, name: "Terminal", color: "#10b981" },
  { icon: GoogleDocsIcon, name: "Docs", color: "#3b82f6" },
  { icon: SlackIcon, name: "Slack", color: "#8b5cf6" },
  { icon: FigmaIcon, name: "Figma", color: "#a855f7" },
  { icon: VSCodeIcon, name: "VS Code", color: "#3b82f6" },
  { icon: GmailIcon, name: "Gmail", color: "#ef4444" },
  { icon: WordIcon, name: "Word", color: "#2563eb" },
  { icon: NotionIcon, name: "Notion", color: "#e4e4e7" },
  { icon: DiscordIcon, name: "Discord", color: "#5865f2" },
];

const STAT_CONFIG = [
  { target: 90, suffix: "+", key: "languages", prefix: "" },
  { target: 2, suffix: "s", key: "transcription", prefix: "~" },
  { target: 0, suffix: "", key: "dataSent", prefix: "" },
] as const;

function MarqueeRow({ items, reverse = false }: { items: typeof ROW_1; reverse?: boolean }) {
  const content = items.map((item, i) => (
    <li key={i} className="flex items-center gap-3 px-5 py-3 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/[0.1] transition-all duration-300 flex-shrink-0 group">
      <div className="w-7 h-7 flex-shrink-0 opacity-50 group-hover:opacity-100 transition-opacity duration-300" style={{ color: item.color }}>
        <item.icon />
      </div>
      <span className="text-sm font-medium text-zinc-500 group-hover:text-zinc-300 transition-colors whitespace-nowrap">
        {item.name}
      </span>
    </li>
  ));

  return (
    <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <ul className={`flex gap-4 ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}>
        {content}
        {content}
      </ul>
    </div>
  );
}

export function Showcase() {
  const t = useTranslations("showcase");
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const statValuesRef = useRef<(HTMLDivElement | null)[]>([]);

  const STATS = STAT_CONFIG;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // SCENE SHOWCASE.1 — Header entrance (scrub for smooth)
      gsap.fromTo(headerRef.current,
        { y: 40, opacity: 0, filter: "blur(6px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", ease: "power4.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", end: "top 55%", scrub: 1 } }
      );

      // SCENE SHOWCASE.2 — Marquee entrance
      gsap.fromTo(marqueeRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, ease: "power3.out",
          scrollTrigger: { trigger: marqueeRef.current, start: "top 90%", end: "top 65%", scrub: 1 } }
      );

      // SCENE SHOWCASE.3 — Stats entrance with counter animation
      gsap.fromTo(statsRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, ease: "power3.out",
          scrollTrigger: { trigger: statsRef.current, start: "top 90%", toggleActions: "play none none none" } }
      );

      // Animate each stat counter
      STATS.forEach((stat, i) => {
        const el = statValuesRef.current[i];
        if (!el || stat.target === 0) return;

        const counter = { value: 0 };
        gsap.to(counter, {
          value: stat.target,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: { trigger: statsRef.current, start: "top 85%", toggleActions: "play none none none" },
          onUpdate: () => {
            if (el) el.textContent = `${stat.prefix || ""}${Math.round(counter.value)}${stat.suffix}`;
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 sm:py-28 overflow-hidden">
      {/* Header */}
      <div ref={headerRef} className="text-center mb-10 px-6 opacity-0">
        <h2 className="text-2xl sm:text-4xl font-bold mb-2">{t("title")}</h2>
        <p className="text-sm text-zinc-500">{t("subtitle")}</p>
      </div>

      {/* Infinity brand marquee */}
      <div ref={marqueeRef} className="space-y-4 mb-12 opacity-0">
        <MarqueeRow items={ROW_1} />
        <MarqueeRow items={ROW_2} reverse />
      </div>

      {/* Stats strip — Remotion-style colored counters with glow */}
      <div ref={statsRef} className="flex flex-wrap justify-center gap-12 sm:gap-20 px-6 opacity-0">
        {STATS.map((stat, i) => {
          const colors = ["#3f67f6", "#8b5cf6", "#10b981"];
          const color = colors[i];
          return (
            <div key={stat.key} className="flex flex-col items-center gap-2">
              <div
                ref={(el) => { statValuesRef.current[i] = el; }}
                className="text-4xl sm:text-5xl font-black tabular-nums tracking-tight"
                style={{ color, textShadow: `0 0 40px ${color}44` }}
              >
                {stat.target === 0 ? "0" : `${stat.prefix || ""}0${stat.suffix}`}
              </div>
              <div className="text-[11px] text-zinc-400 tracking-wide">
                {t(stat.key)}
              </div>
              <div className="w-8 h-0.5 rounded-full mt-1" style={{ background: `${color}30` }} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
