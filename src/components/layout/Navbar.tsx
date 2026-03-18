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
          {/* Social shortcuts */}
          <a
            href="https://wa.me/5212206251023"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center hover:bg-[#25D366]/15 transition-colors"
          >
            <svg className="w-4 h-4 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.533 5.858L.057 23.571a.75.75 0 0 0 .921.921l5.713-1.476A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.715 9.715 0 0 1-4.953-1.355l-.355-.211-3.688.952.976-3.563-.231-.368A9.715 9.715 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
            </svg>
          </a>
          <a
            href="https://www.instagram.com/auraliqia/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center hover:bg-pink-500/15 transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="url(#ig-grad-nav)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <defs>
                <linearGradient id="ig-grad-nav" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f09433"/>
                  <stop offset="25%" stopColor="#e6683c"/>
                  <stop offset="50%" stopColor="#dc2743"/>
                  <stop offset="75%" stopColor="#cc2366"/>
                  <stop offset="100%" stopColor="#bc1888"/>
                </linearGradient>
              </defs>
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="1" fill="url(#ig-grad-nav)" stroke="none"/>
            </svg>
          </a>

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
