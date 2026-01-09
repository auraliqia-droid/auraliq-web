export function SocialProof() {
  return (
    <section className="py-20 bg-[radial-gradient(circle_at_left,_rgba(15,46,58,0.08),_transparent_60%)]">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 items-center">
          <div className="space-y-5">
            <p className="text-xs uppercase tracking-[0.3em] text-secondary font-semibold">Impacto real</p>
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground leading-tight">
              Conversaciones más cortas, agendas llenas y clientes atendidos sin esperar
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Los equipos reducen tiempos de respuesta, automatizan seguimiento y mantienen visibilidad completa en un solo panel.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[{ label: "Mensajes atendidos/mes", value: "+12,000" }, { label: "Horas ahorradas/mes", value: "+200" }, { label: "Citas agendadas desde chat", value: "86%" }, { label: "Satisfacción del cliente", value: "4.8/5" }].map((item) => (
              <div
                key={item.label}
                className="rounded-[26px] border border-border/70 bg-card/90 px-6 py-5 shadow-lg transition-transform hover:-translate-y-1 hover:shadow-xl"
              >
                <p className="text-2xl font-semibold text-primary">{item.value}</p>
                <p className="text-sm text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
