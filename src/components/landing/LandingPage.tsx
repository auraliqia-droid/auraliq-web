"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "";
const contactPhone = process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "+52 220 625 1023";
const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "522206251023";
const whatsappMessage =
  process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE ?? "Hola AuraLiqIA, quiero información sobre sus servicios.";
const instagramUrl =
  process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "https://www.instagram.com/auraliqia/?utm_source=ig_web_button_share_sheet";
const whatsappIcon = "/assets/whatsapp.svg";
const instagramIcon = "/assets/instagram.svg";

const heroImage = "/hero-auraliq-nuevo.webp";

const services = [
  {
    icon: "support_agent",
    title: "Chatbots sofisticados para clientes",
    description:
      "Atiende consultas, cotiza y resuelve FAQs con conversaciones naturales que mantienen a tus clientes atendidos 24/7.",
  },
  {
    icon: "language",
    title: "Creación de páginas web",
    description:
      "Diseñamos sitios modernos, rápidos y enfocados en conversiones para reforzar la presencia digital de tu negocio.",
  },
  {
    icon: "event_available",
    title: "Secretaría virtual inteligente",
    description:
      "Confirma citas, envía recordatorios y responde rápido a cada solicitud sin saturar a tu equipo.",
  },
  {
    icon: "hub",
    title: "Integraciones multicanal",
    description:
      "Conecta WhatsApp, webchat, email y herramientas internas para una atención fluida y sin fricciones.",
  },
];

const integrations = [
  {
    icon: "chat",
    title: "WhatsApp",
    subtitle: "Conversaciones directas",
    color: "text-[#25D366]",
    bg: "bg-[#25D366]/10",
  },
  {
    icon: "language",
    title: "Webchat",
    subtitle: "Atención en tu sitio",
    color: "text-[#4F46E5]",
    bg: "bg-[#4F46E5]/10",
  },
  {
    icon: "storefront",
    title: "Google Business",
    subtitle: "Presencia local",
    color: "text-[#4285F4]",
    bg: "bg-[#4285F4]/10",
  },
];

const pricingPlans = [
  {
    id: "auraweb",
    name: "AuraWeb",
    description: "Lanza una web profesional que vende por ti, con soporte continuo y presencia impecable en todos los dispositivos.",
    initialPrice: "$5,000 MXN",
    monthlyPrice: "$1,000 MXN",
    bullets: [
      "Administración integral de tu sitio.",
      "Dominio, hosting y mantenimiento técnico incluidos.",
      "Derecho a 5 modificaciones mensuales de contenido.",
      "Soporte continuo para mantener tu web siempre actualizada.",
    ],
  },
  {
    id: "aurabot-ia",
    name: "AuraBot IA",
    description: "Atiende leads 24/7 con un agente conversacional que califica prospectos y conecta con tu CRM al instante.",
    initialPrice: "$12,000 MXN",
    monthlyPrice: "$3,000 MXN",
    bullets: [
      "Agente conversacional especializado en tu negocio.",
      "Captura activa de prospectos (leads).",
      "Conexión directa a tu CRM.",
      "Soporte técnico permanente.",
    ],
  },
  {
    id: "aurasuite",
    name: "AuraSuite",
    description: "Integra sitio web y automatización IA para maximizar conversiones y proyectar un ecosistema digital premium.",
    initialPrice: "$15,000 MXN",
    monthlyPrice: "$3,000 MXN",
    featured: true,
    bullets: [
      "Web profesional + IA en un solo ecosistema.",
      "Mayor conversión con atención 24/7.",
      "Integración total de servicios para máxima eficiencia.",
      "Ahorro de tiempo operativo y más cierres.",
    ],
  },
];


export function LandingPage() {
  const reduceMotion = useReducedMotion() ?? false;
  const [activeSection, setActiveSection] = useState("inicio");

  const sectionIds = useMemo(
    () => ["inicio", "servicios", "mision", "quienes-somos", "integraciones", "precios", "equipo", "contacto"],
    []
  );

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0.1 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [sectionIds]);

  const contactCards = [
    {
      id: "whatsapp",
      label: "WhatsApp",
      description: "Respuesta rápida y asesoría directa en minutos.",
      detail: contactPhone,
      href: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`,
      icon: whatsappIcon,
      className: "bg-[#25D366]/10 border-[#25D366]/30 text-[#1a7f3c]",
      external: false,
    },
    {
      id: "instagram",
      label: "Instagram",
      description: "Conoce casos y novedades en nuestro perfil oficial.",
      detail: "@auraliqia",
      href: instagramUrl,
      icon: instagramIcon,
      className: "bg-gradient-to-br from-[#f58529]/15 via-[#dd2a7b]/15 to-[#515bd4]/15 border-[#dd2a7b]/30 text-[#a01b5b]",
      external: true,
    },
  ];

  const socialLinks = [
    {
      type: "whatsapp",
      href: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`,
      label: "Abrir WhatsApp",
    },
    {
      type: "instagram",
      href: instagramUrl,
      label: "Instagram",
    },
    contactEmail
      ? {
          type: "mail",
          href: `mailto:${contactEmail}`,
          label: "Enviar correo",
        }
      : null,
  ].filter(Boolean) as Array<{ type: "whatsapp" | "instagram" | "mail"; href: string; label: string }>;

  const navItems = [
    { href: "#inicio", label: "Inicio" },
    { href: "#servicios", label: "Servicios" },
    { href: "#quienes-somos", label: "Quiénes somos" },
    { href: "#integraciones", label: "Integraciones" },
    { href: "#precios", label: "Precios" },
    { href: "#equipo", label: "Equipo" },
    { href: "#contacto", label: "Contacto" },
  ];

  const trackEvent = (eventName: string, detail?: Record<string, string>) => {
    if (typeof window === "undefined") return;
    if (window.gtag) {
      window.gtag("event", eventName, detail ?? {});
    }
    window.dispatchEvent(new CustomEvent("auraliqia:cta", { detail: { eventName, ...detail } }));
  };

  const buildWhatsappLink = (message?: string) =>
    whatsappNumber
      ? `https://wa.me/${whatsappNumber}${message ? `?text=${encodeURIComponent(message)}` : ""}`
      : "/#contacto";

  const buildPlanLink = (planName: string) =>
    buildWhatsappLink(`Hola AuraLiqIA, me interesa el plan ${planName}. ¿Podemos platicar?`);

  return (
    <div className="bg-background text-foreground">
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-[#131022]/80 border-b border-white/30 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary p-1.5 rounded-lg text-white">
              <span className="material-symbols-outlined block text-[24px]">auto_graph</span>
            </div>
            <span className="text-xl font-extrabold tracking-tight">
              AuraLiq<span className="text-primary">IA</span>
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <a
                  key={item.href}
                  className={`text-sm font-semibold transition-colors hover:text-primary ${
                    isActive ? "text-primary" : "text-foreground"
                  }`}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-3">
              <a
                href={buildWhatsappLink(whatsappMessage)}
                className="inline-flex items-center justify-center size-10 rounded-full border border-primary/30 hover:bg-primary/10 transition-colors"
                aria-label="Abrir WhatsApp Business"
                onClick={() => trackEvent("cta_whatsapp_header")}
              >
                <Image src={whatsappIcon} alt="" width={20} height={20} className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href={instagramUrl}
                className="inline-flex items-center justify-center size-10 rounded-full border border-border hover:border-primary hover:bg-primary/5 transition-colors"
                aria-label="Abrir Instagram AuraLiqIA"
                target="_blank"
                rel="noreferrer"
                onClick={() => trackEvent("cta_instagram_header")}
              >
                <Image src={instagramIcon} alt="" width={20} height={20} className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
            <a
              href="#contacto"
              className="bg-primary text-white text-sm font-bold px-6 py-2.5 rounded-lg shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all flex items-center gap-2"
              onClick={() => trackEvent("cta_contacto_header")}
            >
              <span>Contactar</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
          </div>
        </div>
      </header>

      <main id="inicio" className="relative min-h-screen pt-28 pb-16 flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px]" />
          <div className="absolute top-1/3 right-[10%] opacity-20 dark:opacity-40 animate-pulse">
            <span className="material-symbols-outlined text-primary text-[120px]">business_center</span>
          </div>
          <div className="absolute bottom-1/4 left-[5%] opacity-10 dark:opacity-20">
            <span className="material-symbols-outlined text-primary text-[80px]">insights</span>
          </div>
          <div className="absolute top-1/2 right-1/4 opacity-10 dark:opacity-20">
            <span className="material-symbols-outlined text-primary text-[60px]">storefront</span>
          </div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col gap-8 max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full w-fit">
                <span className="material-symbols-outlined text-sm">verified</span>
                <span className="text-xs font-bold uppercase tracking-wider">Automatización IA para PyMEs</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight text-foreground">
                Conecta tu{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">negocio</span>{" "}
                con IA
              </h1>
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
                Creamos chatbots y flujos inteligentes que actúan como tu secretaria virtual, mejoran la atención al cliente y optimizan procesos internos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#contacto"
                  className="bg-primary text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-primary/25 hover:scale-[1.02] transition-transform flex items-center justify-center gap-3"
                  onClick={() => trackEvent("cta_contacto_hero")}
                >
                  Solicitar diagnóstico
                  <span className="material-symbols-outlined">calendar_today</span>
                </a>
                <a
                  href="#contacto"
                  className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 dark:hover:bg-white/10 transition-colors flex items-center justify-center gap-3"
                >
                  Contactar ahora
                  <span className="material-symbols-outlined">chat</span>
                </a>
              </div>
              <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">smart_toy</span>
                  <span>Chatbots personalizados</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">schedule</span>
                  <span>Recordatorios automáticos</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">insights</span>
                  <span>Métricas en tiempo real</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              className="relative hidden lg:block"
            >
              <div className="relative z-10 w-full aspect-square rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-primary/20 to-purple-600/20 border border-white/20">
                <Image
                  src={heroImage}
                  alt="Robot de AuraLiqIA"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <section id="servicios" className="py-16 px-4 text-center scroll-mt-24">
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary uppercase tracking-wider mb-4">
            Servicios para PyMEs
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight max-w-3xl mx-auto">
            Automatización inteligente para{" "}
            <span className="text-primary text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">
              negocios en crecimiento
            </span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
            Integramos IA en cada punto de contacto con tus clientes y tus operaciones internas para liberar tiempo y aumentar ingresos.
          </p>
        </motion.div>
      </section>

      <section className="w-full flex justify-center px-4 pb-16">
        <div className="w-full max-w-[1200px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.45, ease: "easeOut" }}
                className="group flex flex-col gap-4 rounded-xl border border-border bg-card p-8 shadow-sm hover:shadow-md hover:border-primary/30 transition-all"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-3xl">{service.icon}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-foreground text-xl font-bold">{service.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-center">
            <a
              href="#contacto"
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all"
            >
              Contactar ahora
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </a>
          </div>
        </div>
      </section>

      <section id="mision" className="py-16 px-4 scroll-mt-24">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-foreground text-3xl md:text-4xl font-bold leading-tight tracking-tight">Misión y Visión</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mt-3">
              Una hoja de ruta clara para impulsar el crecimiento de las PyMEs con automatización responsable.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="rounded-2xl border border-border bg-card shadow-sm p-8 flex flex-col gap-4"
            >
              <div className="flex items-center gap-3 text-primary">
                <span className="material-symbols-outlined">track_changes</span>
                <h3 className="text-xl font-bold">Misión</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Mejorar el desempeño empresarial de PyMEs mediante automatización con IA, entregando resultados medibles y un servicio sofisticado.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Como empresa 100% mexicana, creada por mexicanos para mexicanos, reforzamos nuestro compromiso de impulsar a los negocios a su mejor
                desempeño mediante soluciones digitales e Inteligencia Artificial que generan valor real.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease: "easeOut", delay: 0.1 }}
              className="rounded-2xl border border-border bg-card shadow-sm p-8 flex flex-col gap-4"
            >
              <div className="flex items-center gap-3 text-primary">
                <span className="material-symbols-outlined">public</span>
                <h3 className="text-xl font-bold">Visión</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Ser referentes en innovación, crecimiento sustentable y eficiencia automatizada para PyMEs en México y LATAM.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Desde México, buscamos consolidarnos como una empresa mexicana referente en automatización y productividad empresarial,
                apoyando a negocios nacionales a crecer y competir con tecnología de clase mundial.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="quienes-somos" className="py-20 px-6 scroll-mt-24 bg-slate-50/60 dark:bg-white/5">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-foreground text-3xl md:text-4xl font-bold leading-tight tracking-tight">Quiénes somos</h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto mt-4">
              En AuraLiqIA somos una empresa especializada en automatización de procesos e implementación de soluciones de
              inteligencia artificial para organizaciones que buscan escalar, optimizar su operación y mejorar la interacción
              con sus clientes mediante tecnología avanzada.
            </p>
          </div>
          <div className="grid lg:grid-cols-[1.05fr,0.95fr] gap-8">
            <div className="rounded-2xl border border-border bg-card p-8 shadow-sm space-y-4">
              <h3 className="text-xl font-bold text-foreground">Nuestra esencia</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Diseñamos e integramos sistemas inteligentes que permiten a las empresas reducir fricciones operativas,
                automatizar tareas repetitivas y transformar datos en decisiones, sin perder el enfoque estratégico del negocio.
                Nuestro trabajo se centra en crear soluciones confiables, escalables y alineadas a los objetivos reales de cada organización.
              </p>
              <h4 className="text-lg font-semibold text-foreground">Nuestra visión y enfoque</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                En AuraLiqIA creemos que la inteligencia artificial debe ser una herramienta práctica, medible y orientada a resultados,
                no un experimento tecnológico. Por ello, combinamos arquitectura de sistemas de alto nivel con análisis estratégico y visión financiera,
                asegurando que cada implementación genere valor sostenible.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-8 shadow-sm space-y-4">
              <h3 className="text-xl font-bold text-foreground">Nuestro enfoque se distingue por</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary text-base">check_circle</span>
                  Diseño de arquitecturas de automatización robustas y escalables.
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary text-base">check_circle</span>
                  Integración de IA en procesos comerciales, operativos y administrativos.
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary text-base">check_circle</span>
                  Optimización de la comunicación entre empresas y sus clientes.
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary text-base">check_circle</span>
                  Enfoque claro en eficiencia, crecimiento y retorno de inversión.
                </li>
              </ul>
              <p className="text-sm text-muted-foreground leading-relaxed pt-2">
                Trabajamos con empresas que buscan profesionalizar su operación y prepararse para un entorno cada vez más digital y competitivo.
              </p>
              <h4 className="text-lg font-semibold text-foreground">Nuestro compromiso</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                En AuraLiqIA acompañamos a nuestros clientes desde el diseño hasta la implementación y optimización continua de sus sistemas
                de automatización. Nos comprometemos a construir soluciones que no solo funcionen hoy, sino que se adapten al crecimiento y a los
                retos futuros de cada organización. Creemos en la tecnología como un habilitador estratégico, capaz de transformar la manera en que
                las empresas operan, se comunican y generan valor.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="integraciones" className="w-full flex justify-center py-16 bg-white dark:bg-[#1c1933]/50 scroll-mt-24">
        <div className="w-full max-w-[1200px] px-8">
          <div className="flex flex-col items-center mb-10">
            <h2 className="text-foreground text-2xl font-bold leading-tight tracking-tight text-center">
              Integraciones para automatización multicanal
            </h2>
            <div className="h-1 w-20 bg-primary mt-4 rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {integrations.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.4, ease: "easeOut" }}
                className="flex items-center gap-5 rounded-xl border border-border bg-card p-6 hover:-translate-y-1 transition-transform shadow-sm"
              >
                <div className={`flex size-14 items-center justify-center rounded-full ${item.bg} ${item.color}`}>
                  <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                </div>
                <div className="flex flex-col">
                  <h4 className="text-foreground text-lg font-bold">{item.title}</h4>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{item.subtitle}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            <a
              href="#integraciones"
              className="flex items-center gap-2 px-8 py-3 bg-primary text-white font-bold rounded-lg hover:shadow-lg hover:shadow-primary/25 transition-all group"
              onClick={() => trackEvent("cta_integraciones")}
            >
              Ver todas las integraciones
              <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </a>
          </div>
        </div>
      </section>

      <section id="precios" className="py-20 px-6 text-center scroll-mt-24">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-foreground text-3xl md:text-4xl font-bold leading-tight tracking-tight mb-4">
              ⚡ Elige el plan ideal para impulsar tu negocio
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Soluciones digitales diseñadas para escalar, desde presencia básica hasta automatización con Inteligencia Artificial.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.1 }}
                className={`rounded-2xl border bg-card shadow-lg p-8 text-left flex flex-col gap-6 hover:-translate-y-1 transition-transform ${
                  plan.featured ? "border-primary/60 ring-2 ring-primary/40 bg-primary/5" : "border-border"
                }`}
              >
                <div>
                  {plan.featured ? (
                    <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary uppercase tracking-wider">
                      Ecosistema digital
                    </span>
                  ) : null}
                  <p className="text-sm font-semibold text-primary uppercase tracking-wider mt-3">Plan</p>
                  <h3 className="text-2xl font-extrabold text-foreground mt-2">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
                  <div className="mt-4 grid gap-2">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">Pago inicial</p>
                      <p className="text-lg font-semibold text-foreground">{plan.initialPrice}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">Mensualidad</p>
                      <p className="text-lg font-semibold text-foreground">{plan.monthlyPrice}</p>
                    </div>
                  </div>
                </div>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {plan.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-primary text-base">check_circle</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={buildPlanLink(plan.name)}
                  onClick={() => trackEvent("cta_plan", { plan: plan.name })}
                  className="w-full bg-primary text-white font-bold h-12 rounded-lg hover:shadow-lg hover:shadow-primary/30 transition-all flex items-center justify-center gap-2"
                >
                  Cotizar por WhatsApp
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </a>
              </motion.div>
            ))}
          </div>
          <div className="mt-12 rounded-2xl border border-border bg-slate-50/70 dark:bg-white/5 p-8 text-left shadow-sm">
            <h3 className="text-2xl font-bold text-foreground mb-3">🛠️ ¿Por qué elegir a AuraLiq?</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              En AuraLiq no solo creamos páginas, construimos herramientas de ventas. Ya sea que necesites una presencia digital elegante o un
              sistema automatizado inteligente, tenemos la tecnología para hacerlo realidad.
            </p>
          </div>
        </div>
      </section>

      <section id="equipo" className="py-20 px-6 scroll-mt-24">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-foreground text-3xl md:text-4xl font-bold leading-tight tracking-tight mb-4">
              Equipo fundador
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Equipo directivo enfocado en acelerar el crecimiento con automatización inteligente.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: "Arturo Moreno",
                role: "Co-Founder & Chief Technology Officer",
                bio: "Ingeniero mecatrónico con especialización en sistemas computacionales. Arturo diseña la arquitectura de sistemas, automatización e integración tecnológica, asegurando estabilidad, seguridad y escalabilidad en cada plataforma.",
                avatar: "/team/arturo.jpg",
              },
              {
                name: "Carlos Lascurain",
                role: "Co-Founder & Chief Financial Officer",
                bio: "Financiero con experiencia global en gestión estratégica y estructuración financiera. Carlos conecta la tecnología con la rentabilidad y el crecimiento, alineando cada solución con objetivos financieros claros.",
                avatar: "/team/carlos.svg",
              },
            ].map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.45, ease: "easeOut" }}
                className="rounded-2xl border border-border bg-card shadow-lg p-6 flex flex-col sm:flex-row gap-6"
              >
                <div className="w-32 h-32 rounded-2xl overflow-hidden border border-border bg-muted">
                  <Image src={member.avatar} alt={member.name} width={128} height={128} className="object-cover w-full h-full" />
                </div>
                <div className="space-y-2">
                  <p className="text-xl font-semibold">{member.name}</p>
                  <p className="text-sm text-primary font-semibold">{member.role}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="contacto" className="py-20 px-6 scroll-mt-24">
        <div className="max-w-[960px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-foreground text-3xl md:text-4xl font-bold leading-tight tracking-tight mb-4">
              Impulsa el desempeño de tu PyME
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Agenda una consulta gratuita y descubre cómo optimizar ventas, operaciones y atención al cliente con IA.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 mb-10">
            {contactCards.map((card) => (
              <a
                key={card.id}
                href={card.href}
                className={`group rounded-2xl border p-8 text-left transition-all hover:-translate-y-1 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${card.className}`}
                aria-label={`Abrir ${card.label} AuraLiqIA`}
                target={card.external ? "_blank" : undefined}
                rel={card.external ? "noreferrer" : undefined}
                onClick={() => trackEvent(`cta_${card.id}_contacto`)}
              >
                <div className="flex items-center gap-4">
                  <div className="flex size-14 items-center justify-center rounded-2xl bg-white">
                    <Image
                      src={card.icon}
                      alt=""
                      width={40}
                      height={40}
                      className="h-10 w-10 md:h-8 md:w-8"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-foreground">{card.label}</p>
                    {card.detail ? <p className="text-sm text-muted-foreground">{card.detail}</p> : null}
                  </div>
                </div>
                <p className="mt-5 text-sm text-foreground/70">{card.description}</p>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  Escribir ahora
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <div className="fixed bottom-[calc(1.5rem+env(safe-area-inset-bottom))] right-6 z-50 flex flex-col gap-3">
        <a
          href={buildWhatsappLink(whatsappMessage)}
          className="group relative flex items-center justify-center size-12 rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-xl transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          aria-label="Abrir WhatsApp Business"
          title="WhatsApp"
          onClick={() => trackEvent("cta_whatsapp_fab")}
        >
          <Image src={whatsappIcon} alt="" width={32} height={32} className="h-8 w-8" aria-hidden="true" />
          <span className="pointer-events-none absolute right-full mr-3 hidden sm:inline-flex rounded-md bg-[#0f172a] px-3 py-1 text-xs font-semibold text-white opacity-0 shadow-md transition-opacity group-hover:opacity-100">
            WhatsApp
          </span>
        </a>
        <a
          href={instagramUrl}
          className="group relative flex items-center justify-center size-12 rounded-full bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#515bd4] text-white shadow-lg hover:shadow-xl transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          aria-label="Abrir Instagram AuraLiqIA"
          title="Instagram"
          target="_blank"
          rel="noreferrer"
          onClick={() => trackEvent("cta_instagram_fab")}
        >
          <Image src={instagramIcon} alt="" width={32} height={32} className="h-8 w-8" aria-hidden="true" />
          <span className="pointer-events-none absolute right-full mr-3 hidden sm:inline-flex rounded-md bg-[#0f172a] px-3 py-1 text-xs font-semibold text-white opacity-0 shadow-md transition-opacity group-hover:opacity-100">
            Instagram
          </span>
        </a>
      </div>

      <footer className="relative w-full overflow-hidden bg-gradient-to-br from-[#1a1a2e] via-[#131022] to-primary/20 text-white py-16">
        <div className="max-w-[1280px] mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-3 text-white mb-6">
                <div className="size-6">
                  <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold">AuraLiqIA</h2>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Automatización inteligente para PyMEs que buscan crecer con procesos claros, medibles y escalables.
              </p>
              {socialLinks.length ? (
                <div className="flex items-center gap-4">
                  {socialLinks.map((link) => {
                    const isExternal = link.href.startsWith("http");
                    const isBrand = link.type === "whatsapp" || link.type === "instagram";
                    const iconSrc = link.type === "whatsapp" ? whatsappIcon : instagramIcon;
                    return (
                      <a
                        key={link.label}
                        className="size-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-all group"
                        href={link.href}
                        aria-label={link.label}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noreferrer" : undefined}
                      >
                        {isBrand ? (
                          <Image
                            src={iconSrc}
                            alt=""
                            width={20}
                            height={20}
                            className="h-5 w-5 opacity-90 group-hover:opacity-100"
                            aria-hidden="true"
                          />
                        ) : (
                          <span className="material-symbols-outlined text-[20px] group-hover:scale-110">mail</span>
                        )}
                      </a>
                    );
                  })}
                </div>
              ) : null}
            </div>
            <div>
              <h4 className="font-bold mb-6">Plataforma</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><a className="hover:text-white transition-colors" href="#servicios">Servicios</a></li>
                <li><a className="hover:text-white transition-colors" href="#integraciones">Integraciones</a></li>
                <li><a className="hover:text-white transition-colors" href="#precios">Precios</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">Empresa</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><a className="hover:text-white transition-colors" href="#mision">Misión y Visión</a></li>
                <li><a className="hover:text-white transition-colors" href="#quienes-somos">Quiénes somos</a></li>
                <li><a className="hover:text-white transition-colors" href="#equipo">Equipo</a></li>
                <li><a className="hover:text-white transition-colors" href="#contacto">Contacto</a></li>
                <li><a className="hover:text-white transition-colors" href="#precios">Paquetes</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">Comienza hoy</h4>
              <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm text-gray-300 mb-4">
                  Activa tu estrategia de automatización y recibe un diagnóstico gratuito.
                </p>
                <a
                  href="#contacto"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-primary transition-colors"
                  onClick={() => trackEvent("cta_contacto_footer")}
                >
                  Contactar
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </a>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
            <p>© 2024 AuraLiqIA. Todos los derechos reservados.</p>
          </div>
        </div>
        <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 size-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      </footer>
    </div>
  );
}
