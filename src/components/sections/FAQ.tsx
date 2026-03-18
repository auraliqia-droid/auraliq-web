"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    question: "¿Cómo agendo la demo?",
    answer: "Haz clic en \"Agenda tu demo\", el calendario se abre en la misma página y eliges la hora que prefieras.",
  },
  {
    question: "¿Qué tan rápido puedo salir en vivo?",
    answer: "En 3 a 7 días según el número de flujos. Durante la demo dejamos configurado tu caso de uso principal.",
  },
  {
    question: "¿Se conecta con mis herramientas?",
    answer:
      "Sí. Vía API y webhooks sincronizamos con CRM, calendarios y pagos. También derivamos a tu equipo con contexto completo.",
  },
  {
    question: "¿Qué pasa con la seguridad?",
    answer:
      "Aplicamos roles, permisos, logs de auditoría y cifrado. Solo compartimos información con los usuarios autorizados de tu organización.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-14 scroll-mt-24 bg-[linear-gradient(180deg,rgba(15,46,58,0.04),transparent_60%)]">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
          <div className="space-y-4">
            <h2 data-animate="fade-up" className="text-3xl font-semibold">Preguntas Frecuentes</h2>
            <p data-animate="fade-up" className="text-muted-foreground">Respuestas rápidas sobre el nuevo flujo de demo y las integraciones.</p>
          </div>

          <div data-animate="fade-up" className="rounded-[28px] border border-border/70 bg-card/90 p-6 shadow-xl">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-border/60">
                  <AccordionTrigger className="text-left font-medium text-base">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
