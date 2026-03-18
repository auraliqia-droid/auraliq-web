"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const saved = localStorage.getItem("theme");
    const isDark = saved ? saved === "dark" : prefersDark;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <nav id="mainNav" className="fixed top-0 left-0 w-full z-50 bg-background/90 backdrop-blur-xl border-b border-border/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="#inicio" className="flex items-center gap-3 font-bold text-lg text-foreground">
          <div className="relative h-9 w-9 rounded-xl overflow-hidden border border-border/60 shadow-sm bg-white">
            <Image src="/auraliq-logo.svg" alt="Auraliq IA" fill className="object-cover" sizes="36px" priority />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-base">Auraliq IA</span>
            <span className="text-xs font-semibold text-muted-foreground">Agente de voz y texto</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link href="#inicio" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Inicio</Link>
          <Link href="#servicios" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Servicios</Link>
          <Link href="#empresa" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Empresa</Link>
          <Link href="#faq" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">FAQ</Link>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
            aria-label="Cambiar tema"
          >
            <span className="material-symbols-outlined text-base text-foreground">
              {dark ? "light_mode" : "dark_mode"}
            </span>
          </button>
          <Button asChild className="hidden sm:inline-flex bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
            <Link href="#booking">Agenda tu demo</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
