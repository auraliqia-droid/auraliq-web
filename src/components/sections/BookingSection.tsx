"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useMemo } from "react";

export function BookingSection() {
  const calLink = useMemo(
    () => process.env.NEXT_PUBLIC_CAL_URL || "https://cal.com/carlos-lascurain-cazqi7/15min",
    []
  );

  const embedUrl = useMemo(() => {
    const hasQuery = calLink.includes("?");
    const embedParams = "embed=inline&layout=month_view";
    return `${calLink}${hasQuery ? "&" : "?"}${embedParams}`;
  }, [calLink]);

  return (
    <section id="booking" className="py-24 scroll-mt-24 bg-[radial-gradient(circle_at_bottom,_rgba(217,140,63,0.18),_transparent_55%)]">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-10 items-start">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-semibold">Agenda tu diagnóstico gratuito</h2>
            <p className="text-lg text-muted-foreground">
              Abre el calendario, elige tu horario y listo. Sin formularios intermedios. Mostramos la zona horaria de Ciudad de México.
            </p>
            <div className="rounded-[28px] border border-border/70 bg-card/90 p-6 shadow-lg space-y-4">
              <div className="space-y-2">
                <p className="text-xs font-semibold text-secondary uppercase tracking-[0.3em]">Diagnóstico 1 a 1</p>
                <h3 className="text-2xl font-semibold text-foreground">30 minutos, sin fricción</h3>
                <p className="text-muted-foreground">
                  Te mostramos el flujo completo y dejamos listo tu caso de uso principal en vivo.
                </p>
              </div>
                <Button
                  size="lg"
                  className="w-full bg-primary text-primary-foreground"
                  onClick={() => window.open(calLink, "_blank", "noopener,noreferrer")}
                >
                  Abrir en nueva pestaña
                </Button>
            </div>
          </div>

          <Card className="border-border/70 bg-card/90 shadow-2xl rounded-[32px]">
            <CardContent className="p-4">
              <div className="w-full h-[660px] bg-background border border-border/70 rounded-[24px] overflow-hidden">
                <iframe
                  src={embedUrl}
                  className="w-full h-full"
                  allow="microphone; camera; autoplay; clipboard-read; clipboard-write"
                  title="Calendario de diagnóstico"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
