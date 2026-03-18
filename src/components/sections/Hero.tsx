"use client";

import { Button } from "@/components/ui/button";
import { useHeroAnimation } from "@/hooks/useHeroAnimation";
import { MascotVisual } from "@/components/ui/mascot-visual";
import Link from "next/link";

export function Hero() {
  const heroRef = useHeroAnimation();

  return (
    <section ref={heroRef} id="inicio" className="relative scroll-mt-24 overflow-hidden min-h-[90vh] flex items-center">
      <div data-hero-parallax="120" className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div data-hero-parallax="80" className="absolute bottom-0 left-1/4 w-[350px] h-[350px] bg-secondary/10 rounded-full blur-[90px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10 pt-28 pb-16">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 text-left">
            <div data-hero="badge" className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider">Agente de Voz y Texto con IA</span>
            </div>

            <h1 data-hero="title" className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground leading-[1.08]">
              Automatiza cada conversación con un agente que{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">agenda por ti</span>
            </h1>

            <p data-hero="subtitle" className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
              Responde en segundos, califica y agenda sin formularios ni fricción. Tu equipo se enfoca en cerrar.
            </p>

            <div data-hero="cta" className="flex flex-col sm:flex-row items-start gap-4 pt-2">
              <Button asChild size="lg" className="h-14 px-10 text-base rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                <Link href="#booking">Agenda tu demo gratuita</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-14 px-10 text-base rounded-full">
                <Link href="#servicios">Ver Servicios →</Link>
              </Button>
            </div>

            <div data-hero="proof" className="pt-4">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">Confiado por clínicas líderes</p>
              <div className="flex gap-6 opacity-40">
                <span className="flex items-center gap-1.5 font-bold text-sm text-muted-foreground">
                  <span className="material-symbols-outlined text-base">local_hospital</span>MediGroup
                </span>
                <span className="flex items-center gap-1.5 font-bold text-sm text-muted-foreground">
                  <span className="material-symbols-outlined text-base">dentistry</span>DentalCare
                </span>
              </div>
            </div>
          </div>

          <div data-hero="visual" className="relative hidden lg:flex items-center justify-center">
            <MascotVisual className="w-full max-w-4xl scale-125 origin-center" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
}
