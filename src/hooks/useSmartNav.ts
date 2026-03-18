"use client";
import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap-config";

export function useSmartNav(navId: string = "mainNav") {
  useEffect(() => {
    let lastScroll = 0;
    const trigger = ScrollTrigger.create({
      start: "top top",
      end: "max",
      onUpdate: (self) => {
        const cur = self.scroll();
        const nav = document.getElementById(navId);
        if (!nav) return;
        gsap.to(nav, {
          y: cur > lastScroll && cur > 80 ? -nav.offsetHeight : 0,
          duration: 0.3,
          ease: "power2.inOut",
        });
        lastScroll = cur;
      },
    });
    return () => trigger.kill();
  }, [navId]);
}
