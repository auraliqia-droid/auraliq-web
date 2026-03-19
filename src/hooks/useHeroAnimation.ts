"use client";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";

export function useHeroAnimation() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from("[data-hero='badge']", { y: isMobile ? 15 : 25, opacity: 0, duration: 0.7 })
        .from("[data-hero='title']", { y: isMobile ? 25 : 50, opacity: 0, duration: 0.9 }, "-=0.4")
        .from("[data-hero='subtitle']", { y: isMobile ? 18 : 35, opacity: 0, duration: 0.7 }, "-=0.5")
        .from("[data-hero='cta']", { y: isMobile ? 15 : 25, opacity: 0, duration: 0.6 }, "-=0.4")
        .from("[data-hero='proof']", { y: isMobile ? 10 : 20, opacity: 0, duration: 0.5 }, "-=0.3")
        .from("[data-hero='visual']", { scale: 0.88, opacity: 0, duration: 1.2, ease: "power2.out" }, "-=0.8");

      // Parallax on hero background orbs (desktop only)
      if (window.innerWidth >= 1024) {
        gsap.utils.toArray<HTMLElement>("[data-hero-parallax]").forEach((el) => {
          gsap.to(el, {
            y: parseFloat(el.dataset.heroParallax || "100"),
            ease: "none",
            scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: 1 },
          });
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return heroRef;
}
