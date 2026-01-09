"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Bot, CalendarCheck, Workflow, Check } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const services = [
  {
    icon: Bot,
    title: "Agente omnicanal",
    description: "Un mismo cerebro para WhatsApp, Instagram, web y voz, con tono coherente en todos los puntos de contacto.",
    bullets: ["Respuestas guiadas y contextuales", "Handoff a humanos en un clic"],
  },
  {
    icon: CalendarCheck,
    title: "Califica y agenda",
    description: "Filtra curiosos, valida interés y abre el calendario sin salir del chat para cerrar más rápido.",
    bullets: ["Reglas claras de priorización", "Horarios y feriados ya configurados"],
  },
  {
    icon: Workflow,
    title: "Seguimiento automático",
    description: "Recordatorios, reactivación y notificaciones al CRM para que nada se pierda en la bandeja.",
    bullets: ["Sincronización con tus sistemas", "Alertas al equipo cuando importa"],
  }
];

export function ServicesGrid() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="servicios" className="py-24 scroll-mt-24 bg-[linear-gradient(180deg,#FBF8F1,transparent_65%)]">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 items-start">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground">Lo esencial de Auraliq IA</h2>
            <p className="text-lg text-muted-foreground">
              Tres bloques claros para vender y dar soporte sin agregar complejidad.
            </p>
          </div>

          <div className="space-y-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
              >
                <Card className="border-border/70 bg-card/90 shadow-xl rounded-[28px] transition-transform hover:-translate-y-1 hover:shadow-2xl">
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                      <service.icon className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-center text-sm text-muted-foreground">
                          <Check className="w-4 h-4 mr-2 text-secondary" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
