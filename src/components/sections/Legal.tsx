export function Legal() {
  return (
    <section id="terminos" className="py-20 scroll-mt-24 bg-muted/60">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8">
        <div id="privacidad" className="rounded-[28px] border border-border/70 bg-card/90 p-6 shadow-lg space-y-3">
          <p className="text-xs uppercase tracking-[0.3em] text-secondary font-semibold">Privacidad</p>
          <h3 className="text-2xl font-semibold text-foreground">Protegemos cada conversación</h3>
          <p className="text-muted-foreground leading-relaxed">
            Los datos se usan solo para operar tus flujos. Aplicamos cifrado en tránsito y reposo, control de accesos y registros de auditoría. Puedes solicitar exportación o eliminación en cualquier momento.
          </p>
        </div>

        <div className="rounded-[28px] border border-border/70 bg-card/90 p-6 shadow-lg space-y-3">
          <p className="text-xs uppercase tracking-[0.3em] text-secondary font-semibold">Términos</p>
          <h3 className="text-2xl font-semibold text-foreground">Uso responsable de Auraliq IA</h3>
          <p className="text-muted-foreground leading-relaxed">
            La automatización se configura con tus reglas y supervisión. No almacenamos credenciales sensibles y solo activamos integraciones autorizadas. Al agendar una demo aceptas recibir comunicaciones operativas y puedes darte de baja cuando quieras.
          </p>
        </div>
      </div>
    </section>
  );
}
