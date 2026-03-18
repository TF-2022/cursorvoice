// Custom Cursor — Lerp lag + text morph + magnetic
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

// Cursor text per data-cursor type
const CURSOR_CONFIG: Record<string, { size: number; text: string; bg: boolean }> = {
  download: { size: 80, text: "↓ Go!", bg: true },
  cta: { size: 72, text: "Click", bg: true },
  card: { size: 64, text: "Explore", bg: false },
  video: { size: 80, text: "▶ Play", bg: true },
  link: { size: 56, text: "→", bg: false },
};

export function CustomCursor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      if (containerRef.current) containerRef.current.style.display = "none";
      return;
    }

    const ring = ringRef.current;
    const dot = dotRef.current;
    const textEl = textRef.current;
    if (!ring || !dot || !textEl) return;

    const pos = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };

    const onMouseMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };

    const lerp = (a: number, b: number, n: number) => a + (b - a) * n;
    let rafId: number;

    const animate = () => {
      pos.x = lerp(pos.x, target.x, 0.12);
      pos.y = lerp(pos.y, target.y, 0.12);

      const ringSize = ring.offsetWidth;
      ring.style.transform = `translate3d(${pos.x - ringSize / 2}px, ${pos.y - ringSize / 2}px, 0)`;
      dot.style.transform = `translate3d(${target.x - 3}px, ${target.y - 3}px, 0)`;

      rafId = requestAnimationFrame(animate);
    };

    // Morph on enter
    const onEnter = (e: Event) => {
      const el = (e.target as HTMLElement).closest("[data-cursor]");
      if (!el) return;
      const type = el.getAttribute("data-cursor") || "";
      const config = CURSOR_CONFIG[type];
      if (!config) return;

      textEl.textContent = config.text;
      gsap.to(ring, {
        width: config.size,
        height: config.size,
        borderColor: config.bg ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.3)",
        backgroundColor: config.bg ? "rgba(255,255,255,0.95)" : "transparent",
        duration: 0.35,
        ease: "power2.out",
      });
      gsap.to(textEl, { opacity: 1, scale: 1, duration: 0.25, ease: "back.out(1.5)" });
      gsap.to(dot, { opacity: 0, scale: 0, duration: 0.2 });
    };

    // Reset on leave
    const onLeave = () => {
      textEl.textContent = "";
      gsap.to(ring, {
        width: 36,
        height: 36,
        borderColor: "rgba(255,255,255,0.15)",
        backgroundColor: "transparent",
        duration: 0.4,
        ease: "elastic.out(1, 0.4)",
      });
      gsap.to(textEl, { opacity: 0, scale: 0.8, duration: 0.2 });
      gsap.to(dot, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(1.5)" });
    };

    document.addEventListener("mousemove", onMouseMove);

    // Use MutationObserver to catch dynamically added elements
    const attachListeners = () => {
      const targets = document.querySelectorAll("[data-cursor]");
      targets.forEach((t) => {
        t.removeEventListener("mouseenter", onEnter);
        t.removeEventListener("mouseleave", onLeave);
        t.addEventListener("mouseenter", onEnter);
        t.addEventListener("mouseleave", onLeave);
      });
    };

    attachListeners();

    // Re-attach on DOM changes (for scroll-triggered content)
    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    rafId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      observer.disconnect();
      const targets = document.querySelectorAll("[data-cursor]");
      targets.forEach((t) => {
        t.removeEventListener("mouseenter", onEnter);
        t.removeEventListener("mouseleave", onLeave);
      });
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div ref={containerRef}>
      {/* Ring — lerp lag */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-9 h-9 rounded-full border border-white/15 pointer-events-none z-100 will-change-transform flex items-center justify-center"
      >
        <span
          ref={textRef}
          className="text-[10px] uppercase tracking-wider text-zinc-900 font-semibold opacity-0 scale-75 will-change-transform whitespace-nowrap"
        />
      </div>
      {/* Dot — instant */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-white pointer-events-none z-100 will-change-transform"
      />
    </div>
  );
}
