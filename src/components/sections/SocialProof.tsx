"use client";

import Image from "next/image";

export function SocialProof() {
  return (
    <section className="py-14 bg-[radial-gradient(circle_at_left,_rgba(15,46,58,0.08),_transparent_60%)]">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 items-center">
          <div className="space-y-5">
            <p className="text-xs uppercase tracking-[0.3em] text-secondary font-semibold">Impacto real</p>
            <h2 data-animate="fade-up" className="text-3xl md:text-4xl font-semibold text-foreground leading-tight">
              Conversaciones más cortas, agendas llenas y clientes atendidos sin esperar
            </h2>
            <p data-animate="fade-up" className="text-muted-foreground leading-relaxed">
              Los equipos reducen tiempos de respuesta, automatizan seguimiento y mantienen visibilidad completa en un solo panel.
            </p>
            <div data-animate="fade-up" className="mt-6 rounded-2xl overflow-hidden border border-border/70 shadow-lg">
              <Image
                src="/bienvenido.jpg"
                alt="Bienvenido a la era de la automatización"
                width={800}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          <div data-animate-group="stagger" className="grid grid-cols-2 gap-4">
            <div className="stagger-item rounded-[26px] border border-border/70 bg-card/90 px-6 py-5 shadow-lg transition-transform hover:-translate-y-1 hover:shadow-xl">
              <p className="text-2xl font-semibold text-primary">
                <span data-counter data-target="12000" data-prefix="+">0</span>
              </p>
              <p className="text-sm text-muted-foreground">Mensajes atendidos/mes</p>
            </div>
            <div className="stagger-item rounded-[26px] border border-border/70 bg-card/90 px-6 py-5 shadow-lg transition-transform hover:-translate-y-1 hover:shadow-xl">
              <p className="text-2xl font-semibold text-primary">
                <span data-counter data-target="200" data-prefix="+">0</span>
              </p>
              <p className="text-sm text-muted-foreground">Horas ahorradas/mes</p>
            </div>
            <div className="stagger-item rounded-[26px] border border-border/70 bg-card/90 px-6 py-5 shadow-lg transition-transform hover:-translate-y-1 hover:shadow-xl">
              <p className="text-2xl font-semibold text-primary">
                <span data-counter data-target="86" data-suffix="%">0</span>
              </p>
              <p className="text-sm text-muted-foreground">Citas agendadas desde chat</p>
            </div>
            <div className="stagger-item rounded-[26px] border border-border/70 bg-card/90 px-6 py-5 shadow-lg transition-transform hover:-translate-y-1 hover:shadow-xl">
              <p className="text-2xl font-semibold text-primary">
                <span data-counter data-target="4.8" data-suffix="/5" data-decimals="1">0</span>
              </p>
              <p className="text-sm text-muted-foreground">Satisfacción del cliente</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
