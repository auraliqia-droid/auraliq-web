"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Check } from "lucide-react";

const plans = [
  {
    badge: null,
    name: "AuraWeb",
    description: "Lanza una web profesional que vende por ti, con soporte continuo y presencia impecable en todos los dispositivos.",
    price: "$1,000",
    currency: "MXN",
    period: "Mensualidad",
    bullets: [
      "Administración integral de tu sitio.",
      "Dominio, hosting y mantenimiento técnico incluidos.",
      "Soporte continuo para mantener tu web siempre actualizada.",
    ],
    highlight: false,
  },
  {
    badge: null,
    name: "AuraBot IA",
    description: "Atiende leads 24/7 con un agente conversacional que califica prospectos y conecta con tu CRM al instante.",
    price: "$3,000",
    currency: "MXN",
    period: "Mensualidad",
    bullets: [
      "Agente conversacional especializado en tu negocio.",
      "Captura activa de prospectos (leads).",
      "Conexión directa a tu CRM.",
      "Soporte técnico permanente.",
    ],
    highlight: false,
  },
  {
    badge: "Ecosistema digital",
    name: "AuraSuite",
    description: "Integra sitio web y automatización IA para maximizar conversiones y proyectar un ecosistema digital premium.",
    price: "$3,500",
    currency: "MXN",
    period: "Mensualidad",
    bullets: [
      "Web profesional + IA en un solo ecosistema.",
      "Mayor conversión con atención 24/7.",
      "Integración total de servicios para máxima eficiencia.",
      "Ahorro de tiempo operativo y más cierres.",
    ],
    highlight: true,
  },
];

const WA_LINK = "https://wa.me/529221530320?text=Hola%2C%20quiero%20cotizar%20un%20plan%20de%20Auraliq";

export function Pricing() {
  return (
    <section id="precios" className="py-14 scroll-mt-24 bg-[linear-gradient(180deg,transparent,rgba(75,43,238,0.04)_60%,transparent)]">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <p className="text-xs uppercase tracking-[0.3em] text-secondary font-semibold">Plan</p>
          <h2 data-animate="fade-up" className="text-3xl md:text-4xl font-semibold text-foreground">
            Elige el plan ideal para impulsar tu negocio
          </h2>
          <p data-animate="fade-up" className="text-muted-foreground text-lg">
            Soluciones digitales diseñadas para escalar, desde presencia básica hasta automatización con Inteligencia Artificial.
          </p>
        </div>

        <div data-animate-group="stagger" className="grid md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan) => (
            <div key={plan.name} className="stagger-item flex">
              <Card
                className={`flex flex-col w-full rounded-[32px] border transition-transform hover:-translate-y-1 hover:shadow-2xl ${
                  plan.highlight
                    ? "border-primary bg-primary text-primary-foreground shadow-2xl shadow-primary/20"
                    : "border-border/70 bg-card/90 shadow-xl"
                }`}
              >
                <CardHeader className="space-y-3 pb-4">
                  {plan.badge && (
                    <span className="inline-block text-xs font-semibold uppercase tracking-widest bg-primary-foreground/15 text-primary-foreground px-3 py-1 rounded-full w-fit">
                      {plan.badge}
                    </span>
                  )}
                  <p className={`text-xs font-semibold uppercase tracking-[0.3em] ${plan.highlight ? "text-primary-foreground/70" : "text-secondary"}`}>
                    Plan
                  </p>
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                  <p className={`text-sm leading-relaxed ${plan.highlight ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                    {plan.description}
                  </p>
                </CardHeader>

                <CardContent className="flex flex-col flex-1 gap-6">
                  <div>
                    <p className={`text-xs font-semibold uppercase tracking-widest mb-1 ${plan.highlight ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                      {plan.period}
                    </p>
                    <p className="text-4xl font-bold">
                      {plan.price}{" "}
                      <span className={`text-xl font-medium ${plan.highlight ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                        {plan.currency}
                      </span>
                    </p>
                  </div>

                  <ul className="space-y-3 flex-1">
                    {plan.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm">
                        <Check className={`w-4 h-4 mt-0.5 shrink-0 ${plan.highlight ? "text-secondary" : "text-secondary"}`} />
                        <span className={plan.highlight ? "text-primary-foreground/90" : "text-muted-foreground"}>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    asChild
                    size="lg"
                    className={`w-full rounded-full font-semibold ${
                      plan.highlight
                        ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                        : "bg-primary text-primary-foreground"
                    }`}
                  >
                    <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
                      Cotizar por WhatsApp
                      <span className="material-symbols-outlined text-base ml-1">arrow_forward</span>
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
