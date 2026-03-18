// MouseSpotlight — Full-page gradient that follows cursor
"use client";

import { useEffect, useRef } from "react";

export function MouseSpotlight() {
  const spotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const spot = spotRef.current;
    if (!spot) return;

    const pos = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };

    const onMouseMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };

    const lerp = (a: number, b: number, n: number) => a + (b - a) * n;
    let rafId: number;

    const animate = () => {
      pos.x = lerp(pos.x, target.x, 0.05);
      pos.y = lerp(pos.y, target.y, 0.05);

      spot.style.background = `radial-gradient(600px circle at ${pos.x}px ${pos.y}px, rgba(99,102,241,0.04), rgba(139,92,246,0.02) 40%, transparent 70%)`;

      rafId = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", onMouseMove);
    rafId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={spotRef}
      className="fixed inset-0 pointer-events-none z-1 will-change-[background]"
    />
  );
}
