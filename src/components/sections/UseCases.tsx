"use client";

import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon, MessagesSquare, Workflow, ShieldCheck } from "lucide-react";

const capabilities = [
  {
    icon: MessagesSquare,
    title: "Conversaciones que se sienten humanas",
    description:
      "Mensajes claros, en español neutro, y con la información exacta que tu equipo ya usa para responder.",
    points: ["Scripts entrenados con tu marca", "Escalada a humanos con contexto", "Reportes listos para compartir"],
  },
  {
    icon: Workflow,
    title: "Procesos que se adaptan a tu operación",
    description:
      "Calificación, reservas, soporte o pagos. Los flujos se conectan a tus APIs sin agregar pasos extra para el usuario.",
    points: ["Plantillas reutilizables", "Recordatorios y tareas automáticas", "Sincronización con CRM y calendarios"],
  },
  {
    icon: ShieldCheck,
    title: "Seguridad y gobierno del dato",
    description:
      "Roles, permisos y almacenamiento seguro de la información para equipos que crecen rápido.",
    points: ["Control de acceso por canal", "Logs de auditoría", "Cifrado en tránsito y reposo"],
  },
];

export function UseCases() {
  return (
    <section id="casos" className="py-14 scroll-mt-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl space-y-4">
          <h2 data-animate="fade-up" className="text-3xl md:text-4xl font-semibold">Lo que verás funcionando en vivo</h2>
          <p data-animate="fade-up" className="text-lg text-muted-foreground">
            Conversaciones guiadas, reglas claras y reportes listos para compartir con tu equipo.
          </p>
        </div>

        <div data-animate-group="stagger" className="mt-12 space-y-6">
          {capabilities.map((item) => (
            <div key={item.title} className="stagger-item">
              <CapabilityCard {...item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CapabilityCard({ icon: Icon, title, description, points }: { icon: LucideIcon; title: string; description: string; points: string[] }) {
  return (
    <Card className="border-border/70 bg-card/95 shadow-xl rounded-[28px]">
      <CardContent className="p-8 flex flex-col md:flex-row gap-6">
        <div className="h-14 w-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
          <Icon className="w-7 h-7" />
        </div>
        <div className="flex-1 space-y-4">
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold text-foreground">{title}</h3>
            <p className="text-muted-foreground leading-relaxed">{description}</p>
          </div>
          <ul className="grid gap-2 md:grid-cols-3">
            {points.map((point) => (
              <li key={point} className="flex items-center gap-3 text-sm text-foreground/80 font-medium">
                <span className="h-2 w-2 rounded-full bg-secondary" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
