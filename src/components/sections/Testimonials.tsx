"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const testimonials = [
  {
    name: "Lucía M.",
    role: "Líder de Experiencia / Retail",
    quote:
      "En dos semanas pasamos de responder en horas a segundos. Los reportes nos ayudan a priorizar qué conversaciones escalar al equipo.",
  },
  {
    name: "Diego R.",
    role: "Director Comercial / Servicios B2B",
    quote:
      "Auraliq filtra a los leads y agenda reuniones solo con los que cumplen nuestros criterios. El calendario integrado nos ahorra coordinación manual.",
  },
  {
    name: "Mariana M.",
    role: "Operaciones / Educación en línea",
    quote:
      "Automatizamos recordatorios, pagos y dudas frecuentes. La voz del bot suena natural y mantiene el tono de la marca.",
  },
  {
    name: "Felipe T.",
    role: "CX Manager / Turismo",
    quote:
      "Sin formularios ni fricción: los viajeros reservan desde WhatsApp y reciben itinerarios al instante.",
  },
];

export function Testimonials() {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const next = () => setIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const visible = testimonials[index];

  return (
    <section className="py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-semibold">Testimonios</h2>
            <p className="text-primary-foreground/80 text-lg">
              Resultados comprobados en equipos que automatizan ventas y soporte.
            </p>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon" className="bg-transparent border-primary-foreground/30 text-primary-foreground" onClick={prev} aria-label="Anterior">
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="icon" className="bg-transparent border-primary-foreground/30 text-primary-foreground" onClick={next} aria-label="Siguiente">
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <Card className="bg-primary/80 border-primary-foreground/20 rounded-[32px] shadow-2xl">
            <CardContent className="p-8 space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-primary-foreground/10 text-primary-foreground flex items-center justify-center">
                <Quote className="w-6 h-6" />
              </div>
              <motion.p
                key={visible.name}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="text-xl md:text-2xl leading-relaxed text-white"
              >
                “{visible.quote}”
              </motion.p>
              <div>
                <p className="font-semibold text-lg text-white">{visible.name}</p>
                <p className="text-sm text-primary-foreground/70">{visible.role}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <span
              key={i}
              className={`h-2 w-8 rounded-full transition-all ${i === index ? "bg-secondary" : "bg-primary-foreground/30"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
