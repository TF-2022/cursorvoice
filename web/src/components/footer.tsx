// Footer — Brand signature + scroll-driven entrance
"use client";

import { useEffect, useRef } from "react";
import { Mic, Github } from "lucide-react";
import { useTranslations } from "next-intl";
import { GITHUB_REPO } from "@/lib/constants";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const t = useTranslations("footer");
  const footerRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // SCENE FOOTER.1 — Gradient line draws in from center
      if (lineRef.current) {
        gsap.fromTo(lineRef.current,
          { scaleX: 0, opacity: 0 },
          {
            scaleX: 1, opacity: 1, ease: "power2.inOut",
            scrollTrigger: { trigger: footerRef.current, start: "top 95%", end: "top 75%", scrub: 1 },
          }
        );
      }

      // SCENE FOOTER.2 — Brand logo + content fades up
      if (brandRef.current) {
        gsap.fromTo(brandRef.current,
          { y: 20, opacity: 0 },
          {
            y: 0, opacity: 1, ease: "power3.out",
            scrollTrigger: { trigger: footerRef.current, start: "top 90%", end: "top 70%", scrub: 1 },
          }
        );
      }

      if (contentRef.current) {
        gsap.fromTo(contentRef.current,
          { y: 15, opacity: 0 },
          {
            y: 0, opacity: 1, ease: "power2.out",
            scrollTrigger: { trigger: footerRef.current, start: "top 85%", end: "top 65%", scrub: 1 },
          }
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="relative py-14 sm:py-20 px-6 overflow-hidden">
      {/* Gradient separator line */}
      <div
        ref={lineRef}
        className="w-full max-w-md mx-auto h-px mb-12 origin-center opacity-0 will-change-transform"
        style={{ background: "linear-gradient(90deg, transparent, rgba(63,103,246,0.3), rgba(139,92,246,0.3), transparent)" }}
      />

      {/* Brand signature */}
      <div ref={brandRef} className="flex flex-col items-center gap-4 mb-10 opacity-0">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #3f67f6, #8b5cf6)" }}
          >
            <Mic className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight">{t("brand")}</span>
        </div>
        <p className="text-xs text-zinc-600 max-w-xs text-center leading-relaxed">
          Open source voice dictation. 100% offline.
        </p>
      </div>

      {/* Links */}
      <div ref={contentRef} className="flex items-center justify-center gap-6 text-xs text-zinc-600 opacity-0">
        <a
          href={GITHUB_REPO}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 hover:text-zinc-300 transition-colors"
        >
          <Github className="w-3.5 h-3.5" />
          {t("github")}
        </a>
        <span className="w-px h-3 bg-zinc-800" />
        <a
          href={`${GITHUB_REPO}/blob/main/LICENSE`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-zinc-300 transition-colors"
        >
          AGPL-3.0
        </a>
        <span className="w-px h-3 bg-zinc-800" />
        <span className="text-zinc-700">
          cursorvoice.prapp.dev
        </span>
      </div>
    </footer>
  );
}
