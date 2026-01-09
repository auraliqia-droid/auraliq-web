"use client";

import { Button } from "@/components/ui/button";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="inicio"
      className="relative scroll-mt-24 overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(217,140,63,0.25),_transparent_55%)]"
    >
      <div className="absolute -top-40 right-0 h-[420px] w-[420px] rounded-full bg-secondary/20 blur-3xl" />
      <div className="absolute -bottom-32 left-0 h-[360px] w-[360px] rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(15,46,58,0.08),transparent_60%)]" />

      <div className="container mx-auto px-4 relative z-10 pt-28 pb-16">
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center"
        >
          <div className="space-y-6 text-left">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-foreground leading-[1.05]">
              Automatiza cada conversación con un agente de voz y texto que agenda por ti
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Responde en segundos, califica y agenda sin formularios ni fricción. Tu equipo se enfoca en cerrar mientras Auraliq IA mantiene el tono y las reglas de tu marca.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
              <Button
                asChild
                size="lg"
                className="h-14 px-10 text-base rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:-translate-y-0.5"
              >
                <Link href="#booking">Agenda tu demo gratuita</Link>
              </Button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="relative"
          >
            <div className="rounded-[32px] border border-border/70 bg-card/80 p-8 shadow-2xl backdrop-blur">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <span className="h-3 w-3 rounded-full bg-secondary" />
                  <span className="h-3 w-3 rounded-full bg-primary/60" />
                  <span className="h-3 w-3 rounded-full bg-muted-foreground/30" />
                </div>
                <div className="space-y-4">
                  <div className="h-4 w-3/4 rounded-full bg-muted" />
                  <div className="h-4 w-full rounded-full bg-muted" />
                  <div className="h-4 w-5/6 rounded-full bg-muted" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-border/70 bg-background/80 p-4">
                    <div className="h-3 w-16 rounded-full bg-primary/30" />
                    <div className="mt-4 h-8 w-12 rounded-lg bg-secondary/30" />
                  </div>
                  <div className="rounded-2xl border border-border/70 bg-background/80 p-4">
                    <div className="h-3 w-20 rounded-full bg-primary/30" />
                    <div className="mt-4 h-8 w-16 rounded-lg bg-secondary/30" />
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -right-6 -bottom-6 h-20 w-20 rounded-3xl border border-border/70 bg-background/80 shadow-xl" />
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
}
