"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

type TeamMember = {
  name: string;
  role: string;
  bio: string;
  avatar?: string;
};

const team: TeamMember[] = [
  {
    name: "Arturo Moreno",
    role: "Co-CEO / Ingeniero en Sistemas",
    bio: "Diseña la arquitectura conversacional y las integraciones técnicas para que cada flujo funcione desde el primer día.",
    avatar: "/team/arturo.jpg",
  },
  {
    name: "Carlos Lascurain",
    role: "Co-CEO / CFO / Financial Officer",
    bio: "Asegura que la operación sea escalable y rentable, acompañando a clientes en el retorno de inversión de cada automatización.",
    avatar: "/team/carlos.jpg",
  },
];

export function Company() {
  return (
    <section id="empresa" className="py-14 scroll-mt-24 bg-[linear-gradient(180deg,rgba(15,46,58,0.04),transparent_65%)]">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl space-y-4">
          <h2 data-animate="fade-up" className="text-3xl md:text-4xl font-semibold">Equipo</h2>
          <p data-animate="fade-up" className="text-lg text-muted-foreground">
            Ingenieros y operadores enfocados en lanzar agentes conversacionales sin burocracia ni meses de espera.
          </p>
        </div>

        <div data-animate-group="stagger" className="mt-12 grid md:grid-cols-2 gap-6">
          {team.map((member) => (
            <Card key={member.name} className="stagger-item border-border/70 bg-card/90 shadow-xl rounded-[28px]">
              <CardContent className="p-6 flex flex-col sm:flex-row gap-6">
                <div className="w-32 h-32 rounded-3xl bg-muted/60 overflow-hidden flex items-center justify-center text-muted-foreground font-semibold border border-border/70">
                  {member.avatar ? (
                    <Image
                      src={member.avatar}
                      alt={member.name}
                      width={128}
                      height={128}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center border-2 border-dashed border-muted-foreground/40 text-xs uppercase tracking-wide text-muted-foreground/80">
                      Foto
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <p className="text-xl font-semibold text-foreground">{member.name}</p>
                  <p className="text-sm text-secondary font-medium">{member.role}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
