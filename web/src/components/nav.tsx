// Nav — Smart floating toolbar: visible in hero, hides on scroll down, shows on scroll up
// Morphs from full-width transparent → compact floating pill with rounded corners
"use client";

import { useState, useRef, useEffect } from "react";
import { Mic, Github, ChevronDown } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { GITHUB_REPO } from "@/lib/constants";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LOCALES = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
] as const;

export function Nav() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

  function switchLocale(newLocale: string) {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.replace(segments.join("/") || `/${newLocale}`);
    setOpen(false);
  }

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  useEffect(() => {
    const nav = navRef.current;
    const icon = iconRef.current;
    if (!nav) return;

    let lastScroll = 0;
    let isCompact = false;
    const heroHeight = window.innerHeight;

    const ctx = gsap.context(() => {
      // Entrance
      gsap.fromTo(nav,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: 0.3 }
      );

      // Icon spin on entrance
      if (icon) {
        gsap.fromTo(icon,
          { rotate: -180, scale: 0.5 },
          { rotate: 0, scale: 1, duration: 0.8, ease: "back.out(1.5)", delay: 0.4 }
        );
      }

      // Scroll listener: hide/show + morph
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          const scroll = self.scroll();
          const direction = self.direction; // 1 = down, -1 = up
          const pastHero = scroll > heroHeight * 0.8;

          if (pastHero && direction === 1 && !isCompact) {
            // Scrolling DOWN past hero → hide nav (slide up)
            gsap.to(nav, {
              y: -100,
              duration: 0.4,
              ease: "power3.in",
            });
            isCompact = true;
          } else if (direction === -1 && isCompact) {
            // Scrolling UP → show compact floating pill
            isCompact = false;
            gsap.to(nav, {
              y: 0,
              duration: 0.4,
              ease: "power3.out",
            });
          }

          // Morph: transparent → frosted pill
          if (pastHero) {
            nav.classList.add("nav-compact");
            nav.classList.remove("nav-hero");
          } else {
            nav.classList.add("nav-hero");
            nav.classList.remove("nav-compact");
            // Reset if back in hero
            if (isCompact) {
              isCompact = false;
              gsap.set(nav, { y: 0 });
            }
          }

          lastScroll = scroll;
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <nav
      ref={navRef}
      className="nav-hero fixed top-4 left-1/2 -translate-x-1/2 z-60 opacity-0 will-change-transform transition-[max-width,background,border-color,padding,border-radius,box-shadow] duration-500 ease-out
        w-[calc(100%-2rem)] max-w-5xl"
    >
      <div className="px-5 h-12 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5" data-cursor="link">
          <div
            ref={iconRef}
            className="w-7 h-7 rounded-lg flex items-center justify-center will-change-transform"
            style={{ background: "linear-gradient(135deg, #3f67f6, #8b5cf6)" }}
          >
            <Mic className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-sm font-semibold tracking-tight">{t("brand")}</span>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Language selector */}
          <div ref={ref} className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors px-2 py-1.5 rounded-lg hover:bg-white/5"
            >
              <span className="text-sm leading-none">{current.flag}</span>
              <span className="font-medium hidden sm:inline">{current.code.toUpperCase()}</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} />
            </button>

            {open && (
              <div className="absolute right-0 top-full mt-2 w-40 rounded-xl border border-white/10 bg-zinc-900/95 backdrop-blur-xl shadow-2xl overflow-hidden">
                {LOCALES.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => switchLocale(l.code)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-xs transition-colors ${
                      l.code === locale
                        ? "bg-white/5 text-white"
                        : "text-zinc-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span className="text-base leading-none">{l.flag}</span>
                    <span className="font-medium">{l.label}</span>
                    {l.code === locale && (
                      <svg className="w-3 h-3 ml-auto text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 13l4 4L19 7" /></svg>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <a
            href={GITHUB_REPO}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="link"
            className="text-zinc-500 hover:text-white transition-colors"
          >
            <Github className="w-4.5 h-4.5" />
          </a>

          <a
            href="#download"
            data-cursor="download"
            className="text-xs font-semibold px-4 py-1.5 rounded-lg text-white transition-all hover:scale-105 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #3f67f6, #8b5cf6)",
              boxShadow: "0 4px 15px rgba(63,103,246,0.25)",
            }}
          >
            {t("download")}
          </a>
        </div>
      </div>
    </nav>
  );
}
