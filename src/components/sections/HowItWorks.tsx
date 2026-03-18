"use client";

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Mapa rápido",
      description: "En 15 minutos entendemos tu flujo y definimos reglas claras."
    },
    {
      number: "02",
      title: "Configuración",
      description: "Entrenamos el agente con tu tono, plantillas y conexiones al CRM."
    },
    {
      number: "03",
      title: "Lanzamiento",
      description: "Publicamos en tus canales y empiezas a agendar desde el primer día."
    }
  ];

  return (
    <section className="py-14 bg-[linear-gradient(180deg,transparent,rgba(15,46,58,0.04))]">
      <div className="container mx-auto px-4">
        <div className="text-left max-w-3xl space-y-4">
          <h2 data-animate="fade-up" className="text-3xl md:text-4xl font-semibold">¿Cómo funciona?</h2>
          <p data-animate="fade-up" className="text-lg text-muted-foreground">
            Implementación simple y rápida. Sin complicaciones técnicas.
          </p>
        </div>

        <div className="mt-12 max-w-4xl border-l border-border/70 pl-6 space-y-8">
          {steps.map((step) => (
            <div
              key={step.number}
              data-animate="fade-up"
              className="relative"
            >
              <span className="absolute -left-9 top-1 h-8 w-8 rounded-full bg-primary text-primary-foreground text-sm font-semibold flex items-center justify-center">
                {step.number}
              </span>
              <div className="rounded-[24px] border border-border/70 bg-card/90 p-6 shadow-lg">
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
