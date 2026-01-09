"use client";

import { Sparkles, Timer, Shield, CalendarClock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion, useReducedMotion } from "framer-motion";

const benefits = [
  {
    icon: Timer,
    title: "Responde en segundos",
    description: "Atención 24/7 con mensajes claros y sin esperas para tus leads."
  },
  {
    icon: CalendarClock,
    title: "Agenda sin fricción",
    description: "Califica y abre el calendario en el mismo chat. Se acabaron los formularios."
  },
  {
    icon: Shield,
    title: "Sin perder el control",
    description: "Cumple reglas de negocio, deriva a humanos y registra todo en tu CRM."
  },
  {
    icon: Sparkles,
    title: "Listo en días, no meses",
    description: "Flujos prearmados para WhatsApp, Instagram y web, ajustados a tu marca."
  }
];

export function BenefitsGrid() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative py-16">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,46,58,0.04),transparent_55%)]" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.45, ease: "easeOut" }}
            >
              <Card className="h-full border-border/70 bg-card/90 shadow-lg backdrop-blur transition-transform hover:-translate-y-1 hover:shadow-xl">
                <CardContent className="p-8 flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                      <benefit.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">{benefit.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
