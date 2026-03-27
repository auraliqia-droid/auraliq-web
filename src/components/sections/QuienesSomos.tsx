"use client";

import Image from "next/image";

export function QuienesSomos() {
  return (
    <section id="quienes-somos" className="py-20 scroll-mt-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <h2 data-animate="fade-up" className="text-3xl md:text-4xl font-semibold mb-4">
            Quiénes somos
          </h2>
          <p data-animate="fade-up" className="text-lg text-muted-foreground">
            Una empresa 100% mexicana que convierte la tecnología en un aliado real para las pymes.
          </p>
        </div>

        {/* Content grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div data-animate="fade-up" className="space-y-6">
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              En <span className="text-foreground font-semibold">Auraliqia</span> creemos que la eficiencia no debe ser un lujo, sino una herramienta accesible para cualquier negocio. Por eso, diseñamos e implementamos sistemas que optimizan procesos, automatizan operaciones y permiten a las empresas enfocarse en lo que realmente importa: crecer.
            </p>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Acompañamos a las pymes en su transformación digital, ayudándolas a fortalecer su presencia en línea, mejorar su productividad y tomar decisiones más estratégicas basadas en datos.
            </p>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Nuestro objetivo es claro: convertir la tecnología en un aliado real para que cada empresa sea más eficiente, competitiva y visible en el entorno digital.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-4">
              {[
                { value: "100%", label: "Empresa mexicana" },
                { value: "24/7", label: "Soporte continuo" },
                { value: "Pymes", label: "Nuestro enfoque" },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-4 rounded-2xl bg-muted/40 border border-border/60">
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div data-animate="fade-up" className="relative rounded-[28px] overflow-hidden border border-border/60 shadow-2xl bg-muted/30">
            <Image
              src="/Gemini_Generated_Image_gzlijzgzlijzgzli.png"
              alt="Auraliqia — plataforma de automatización para pymes"
              width={900}
              height={580}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
