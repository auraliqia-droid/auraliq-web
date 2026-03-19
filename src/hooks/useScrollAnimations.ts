"use client";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";

export function useScrollAnimations() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;

      // Fade up
      gsap.utils.toArray<HTMLElement>("[data-animate='fade-up']").forEach((el) => {
        const delay = parseFloat(el.dataset.delay || "0");
        gsap.from(el, {
          y: isMobile ? 25 : 50, opacity: 0, duration: 0.8, delay, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
        });
      });

      // Fade left
      gsap.utils.toArray<HTMLElement>("[data-animate='fade-left']").forEach((el) => {
        gsap.from(el, {
          x: isMobile ? -25 : -50, opacity: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      // Fade right
      gsap.utils.toArray<HTMLElement>("[data-animate='fade-right']").forEach((el) => {
        gsap.from(el, {
          x: isMobile ? 25 : 50, opacity: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      // Scale up
      gsap.utils.toArray<HTMLElement>("[data-animate='scale-up']").forEach((el) => {
        gsap.from(el, {
          scale: 0.88, opacity: 0, duration: 1, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      // Stagger groups
      gsap.utils.toArray<HTMLElement>("[data-animate-group='stagger']").forEach((group) => {
        const items = group.querySelectorAll(".stagger-item");
        gsap.from(items, {
          y: isMobile ? 20 : 40, opacity: 0, duration: 0.7, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: group, start: "top 85%" },
        });
      });

      // Counters
      gsap.utils.toArray<HTMLElement>("[data-counter]").forEach((el) => {
        const target = parseFloat(el.dataset.target || "0");
        const prefix = el.dataset.prefix || "";
        const suffix = el.dataset.suffix || "";
        const decimals = parseInt(el.dataset.decimals || "0");
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target, duration: 2, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
          onUpdate: () => {
            el.textContent = prefix + (decimals ? obj.val.toFixed(decimals) : Math.round(obj.val).toLocaleString()) + suffix;
          },
        });
      });

      // Parallax (desktop only)
      if (window.innerWidth >= 1024) {
        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          const speed = parseFloat(el.dataset.speed || "-50");
          gsap.to(el, {
            y: speed, ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1 },
          });
        });
      }

      // Glow dividers
      gsap.utils.toArray<HTMLElement>(".glow-divider").forEach((line) => {
        gsap.fromTo(line,
          { opacity: 0, scaleX: 0 },
          { opacity: 0.5, scaleX: 1, duration: 1.2,
            scrollTrigger: { trigger: line, start: "top 92%", toggleActions: "play none none none" }
          }
        );
      });

      // Smooth scroll
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", (e) => {
          const href = anchor.getAttribute("href");
          if (!href || href === "#") return;
          const target = document.querySelector(href);
          if (!target) return;
          e.preventDefault();
          gsap.to(window, { scrollTo: { y: target, offsetY: 60 }, duration: 0.9, ease: "power3.inOut" });
        });
      });

      // Scroll progress bar
      const progressBar = document.getElementById("scrollProgressBar");
      if (progressBar) {
        gsap.to(progressBar, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: 0.3 },
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return containerRef;
}
