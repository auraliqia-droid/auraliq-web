"use client";

import Image from "next/image";
import Script from "next/script";
import { useSearchParams } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { contactSchema, type ContactPayload } from "@/lib/contactSchema";

type ChatMessage = {
  id: string;
  role: "user" | "bot";
  text: string;
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    handleTurnstile?: (token: string) => void;
  }
}

const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "";
const contactPhone = process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "";
const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL ?? "";
const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";
const whatsappDefaultMessage =
  process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE ??
  "Hola, me gustaría conocer más sobre automatización con IA para mi PyME.";
const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

const heroImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBMf48jrFObM3jtshQHGX9Jp_bD60YLjIlxgfGJjf2w_73HT6gfigiySUUT_wBN1fnRlGJ8rIq4THv8P2BHpOujDVHNwfxmtpaC6aUASQPCvjob9U_AEsAg3MJ2lSGC3EiZZYC-4Qk33OyoURYCoFwdJvTgMWrhV-4_12ogzBV8ZhNSWq1TFuC9Nmlvcl_MhXoUsLxavsCrfd1nuzwdnY83JtAJSWtA2hdtc0I23M5QIPAVdj4wWU9PnA-1vbx2FhI3G4_8Sx5J53I";

const services = [
  {
    icon: "support_agent",
    title: "Chatbots sofisticados para clientes",
    description:
      "Atiende consultas, cotiza y resuelve FAQs con conversaciones naturales que mantienen a tus clientes atendidos 24/7.",
  },
  {
    icon: "event_available",
    title: "Secretaría virtual inteligente",
    description:
      "Confirma citas, envía recordatorios y responde rápido a cada solicitud sin saturar a tu equipo.",
  },
  {
    icon: "lan",
    title: "Automatización de leads y CRM",
    description:
      "Captura prospectos, califícalos y asigna seguimientos automáticos para acelerar el cierre de ventas.",
  },
  {
    icon: "payments",
    title: "Cobranza y seguimiento",
    description:
      "Envía recordatorios de pago y reduce cuentas vencidas con mensajes personalizados y oportunos.",
  },
  {
    icon: "insights",
    title: "Reportes y BI ejecutivo",
    description:
      "Visualiza métricas de ventas y operación para tomar decisiones rápidas basadas en datos reales.",
  },
  {
    icon: "hub",
    title: "Integraciones omnicanal",
    description:
      "Conecta WhatsApp, webchat, email y herramientas internas para una atención fluida y sin fricciones.",
    wide: true,
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
    id: "basico",
    name: "Básico",
    price: "$2,500 MXN",
    description: "Automatización esencial para iniciar con IA en tu PyME.",
    bullets: [
      "Automatización de comunicación principal",
      "Chatbot básico con FAQs",
      "Soporte inicial y puesta en marcha",
    ],
  },
  {
    id: "avanzado",
    name: "Avanzado",
    price: "$6,000 MXN",
    description: "Escala la experiencia con IA y flujos más completos.",
    bullets: [
      "Chatbot avanzado y respuestas contextuales",
      "Recordatorios automatizados",
      "Integración de flujos clave",
    ],
  },
];

const demoPrompts = [
  "Quiero automatizar ventas",
  "¿Cómo funcionan los recordatorios?",
  "¿Cuánto cuesta el plan avanzado?",
  "Necesito soporte para clientes",
];

const getDemoResponse = (input: string) => {
  const normalized = input.toLowerCase();
  if (normalized.includes("precio") || normalized.includes("cuesta")) {
    return "El plan básico comienza en $2,500 MXN al mes y el avanzado en $6,000 MXN. ¿Quieres que te recomiende el ideal para tu PyME?";
  }
  if (normalized.includes("recordatorio") || normalized.includes("cita")) {
    return "Podemos enviar recordatorios automáticos por WhatsApp o email, confirmar asistencia y reprogramar si es necesario.";
  }
  if (normalized.includes("ventas") || normalized.includes("lead")) {
    return "Automatizamos la captación de leads y entregamos prospectos listos para tu equipo, con seguimiento inmediato.";
  }
  if (normalized.includes("soporte") || normalized.includes("clientes")) {
    return "Nuestro bot responde FAQs y escala casos críticos a tu equipo para que no pierdas clientes.";
  }
  return "Entendido. Te propongo una demo personalizada para tu operación. ¿Qué proceso te gustaría automatizar primero?";
};

function DemoChat({
  compact = false,
  reduceMotion,
  onEvent,
}: {
  compact?: boolean;
  reduceMotion: boolean;
  onEvent: (eventName: string) => void;
}) {
  const messageIdRef = useRef(0);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "bot",
      text: "Hola, soy Aura. Puedo ayudarte a automatizar atención, ventas y recordatorios. ¿Qué necesitas hoy?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }, [messages, isTyping, reduceMotion]);

  const handleSend = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    messageIdRef.current += 1;
    const userMessage: ChatMessage = {
      id: `${messageIdRef.current}-user`,
      role: "user",
      text: trimmed,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    onEvent("demo_message_sent");
    setIsTyping(true);
    const delay = reduceMotion ? 200 : 600;
    window.setTimeout(() => {
      messageIdRef.current += 1;
      const botMessage: ChatMessage = {
        id: `${messageIdRef.current}-bot`,
        role: "bot",
        text: getDemoResponse(trimmed),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, delay);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSend(input);
  };

  return (
    <div className={`rounded-2xl border border-border bg-card shadow-lg ${compact ? "p-4" : "p-6"}`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm font-semibold text-primary uppercase tracking-wider">Demo interactiva</p>
          <h3 className="text-lg font-bold">Simulador de conversación</h3>
        </div>
        <button
          type="button"
          onClick={() => {
            setMessages([
              {
                id: "welcome",
                role: "bot",
                text: "Hola, soy Aura. Puedo ayudarte a automatizar atención, ventas y recordatorios. ¿Qué necesitas hoy?",
              },
            ]);
            onEvent("demo_reset");
          }}
          className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
        >
          Reiniciar
        </button>
      </div>
      <div
        ref={listRef}
        className={`space-y-3 overflow-y-auto rounded-xl bg-muted/60 p-4 ${compact ? "h-48" : "h-64"}`}
        aria-live="polite"
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm leading-relaxed ${
              message.role === "user"
                ? "ml-auto bg-primary text-white"
                : "bg-white text-slate-700"
            }`}
          >
            {message.text}
          </div>
        ))}
        {isTyping ? (
          <div className="max-w-[60%] rounded-2xl px-4 py-2 text-sm bg-white text-slate-500">
            Aura está escribiendo...
          </div>
        ) : null}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {demoPrompts.map((prompt) => (
          <button
            key={prompt}
            type="button"
            onClick={() => handleSend(prompt)}
            className="rounded-full border border-border px-3 py-1 text-xs font-semibold text-foreground hover:border-primary hover:text-primary transition-colors"
          >
            {prompt}
          </button>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
        <input
          className="flex-1 h-10 px-4 rounded-full border border-border bg-white dark:bg-background text-sm text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          placeholder="Escribe tu mensaje..."
          value={input}
          onChange={(event) => setInput(event.target.value)}
          aria-label="Mensaje para el demo"
        />
        <button
          type="submit"
          className="h-10 px-5 rounded-full bg-primary text-white text-sm font-bold hover:shadow-lg hover:shadow-primary/30 transition-all"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}

export function LandingPage() {
  const reduceMotion = useReducedMotion();
  const searchParams = useSearchParams();
  const [activeSection, setActiveSection] = useState("inicio");
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [formState, setFormState] = useState({
    fullName: "",
    email: "",
    company: "",
    interest: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formError, setFormError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [demoLead, setDemoLead] = useState({
    fullName: "",
    email: "",
    company: "",
  });
  const [demoStatus, setDemoStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [demoError, setDemoError] = useState("");
  const [demoFieldErrors, setDemoFieldErrors] = useState<Record<string, string>>({});

  const sectionIds = useMemo(
    () => ["inicio", "servicios", "demo", "mision", "integraciones", "precios", "equipo", "contacto"],
    []
  );

  const normalizedPlan = useMemo(() => {
    const plan = searchParams.get("plan");
    if (plan === "avanzado") return "Avanzado";
    if (plan === "basico") return "Básico";
    return "";
  }, [searchParams]);

  useEffect(() => {
    if (!turnstileSiteKey) return;
    window.handleTurnstile = (token: string) => setTurnstileToken(token);
    return () => {
      window.handleTurnstile = undefined;
    };
  }, []);

  const inferredPlan = useMemo(() => {
    if (normalizedPlan) return normalizedPlan;
    if (formState.interest.startsWith("Plan ")) {
      return formState.interest.replace("Plan ", "");
    }
    return "";
  }, [formState.interest, normalizedPlan]);

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

  const demoLink = calendlyUrl
    ? calendlyUrl
    : whatsappNumber
      ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappDefaultMessage)}`
      : "/#contacto";

  const isExternalDemo = demoLink.startsWith("http");

  const contactDetails = [
    contactPhone
      ? {
          icon: "call",
          label: contactPhone,
          href: `tel:${contactPhone.replace(/\s+/g, "")}`,
        }
      : null,
    contactEmail
      ? {
          icon: "mail",
          label: contactEmail,
          href: `mailto:${contactEmail}`,
        }
      : null,
    whatsappNumber
      ? {
          icon: "chat",
          label: "WhatsApp Empresarial",
          href: `https://wa.me/${whatsappNumber}`,
        }
      : null,
  ].filter(Boolean) as Array<{ icon: string; label: string; href: string }>;

  const socialLinks = [
    whatsappNumber
      ? {
          icon: "chat",
          href: `https://wa.me/${whatsappNumber}`,
          label: "Abrir WhatsApp",
        }
      : null,
    contactEmail
      ? {
          icon: "mail",
          href: `mailto:${contactEmail}`,
          label: "Enviar correo",
        }
      : null,
  ].filter(Boolean) as Array<{ icon: string; href: string; label: string }>;

  const navItems = [
    { href: "#inicio", label: "Inicio" },
    { href: "#servicios", label: "Servicios" },
    { href: "#demo", label: "Demo" },
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

  const mapFieldErrors = (errors: Record<string, string[] | undefined>) => {
    const mappedErrors: Record<string, string> = {};
    Object.entries(errors).forEach(([key, value]) => {
      if (value?.length) {
        mappedErrors[key] = value[0] ?? "";
      }
    });
    return mappedErrors;
  };

  const submitContactPayload = async (payload: ContactPayload) => {
    const result = contactSchema.safeParse(payload);
    if (!result.success) {
      return {
        ok: false,
        fieldErrors: mapFieldErrors(result.error.flatten().fieldErrors),
        message: "Por favor revisa los campos marcados.",
      };
    }

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(result.data),
    });

    if (!response.ok) {
      const data = (await response.json()) as { error?: string };
      return {
        ok: false,
        fieldErrors: {},
        message: data.error ?? "No se pudo enviar. Intenta de nuevo.",
      };
    }

    return { ok: true, fieldErrors: {}, message: "" };
  };

  const handleChange =
    (field: keyof typeof formState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setFormState((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormStatus("loading");
    setFormError("");
    setFieldErrors({});

    const result = await submitContactPayload({
      ...formState,
      plan: inferredPlan,
      turnstileToken,
    });

    if (!result.ok) {
      setFieldErrors(result.fieldErrors);
      setFormStatus("error");
      setFormError(result.message);
      return;
    }

    setFormStatus("success");
    setFormState({
      fullName: "",
      email: "",
      company: "",
      interest: "",
      message: "",
    });
  };

  const handleDemoLeadChange =
    (field: keyof typeof demoLead) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      setDemoLead((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const handleDemoSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setDemoStatus("loading");
    setDemoError("");
    setDemoFieldErrors({});

    const result = await submitContactPayload({
      fullName: demoLead.fullName,
      email: demoLead.email,
      company: demoLead.company,
      interest: "Demo interactiva",
      message: "Solicitud de demo desde el modal interactivo.",
      plan: inferredPlan,
      turnstileToken,
    });

    if (!result.ok) {
      setDemoFieldErrors(result.fieldErrors);
      setDemoStatus("error");
      setDemoError(result.message);
      return;
    }

    setDemoStatus("success");
    setDemoLead({ fullName: "", email: "", company: "" });
  };

  const buildPlanLink = (planId: string) => `/?plan=${planId}#contacto`;

  return (
    <div className="bg-background text-foreground">
      {turnstileSiteKey ? <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="lazyOnload" /> : null}
      <Dialog open={isDemoOpen} onOpenChange={setIsDemoOpen}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Agenda una demo personalizada</DialogTitle>
            <DialogDescription>
              Déjanos tus datos y conversa con nuestro simulador para descubrir cómo automatizar tu PyME.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 lg:grid-cols-[1fr,1.1fr]">
            <form className="space-y-4" onSubmit={handleDemoSubmit} noValidate>
              <div className="space-y-2">
                <label className="text-sm font-semibold" htmlFor="demo-name">Nombre completo</label>
                <input
                  id="demo-name"
                  name="demo-name"
                  className="w-full h-11 px-4 rounded-lg border border-border bg-white dark:bg-background text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  placeholder="Ej. Andrea López"
                  value={demoLead.fullName}
                  onChange={handleDemoLeadChange("fullName")}
                  aria-invalid={Boolean(demoFieldErrors.fullName)}
                  aria-describedby={demoFieldErrors.fullName ? "demo-name-error" : undefined}
                  required
                />
                {demoFieldErrors.fullName ? (
                  <p id="demo-name-error" className="text-xs text-red-500">{demoFieldErrors.fullName}</p>
                ) : null}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold" htmlFor="demo-email">Correo corporativo</label>
                <input
                  id="demo-email"
                  name="demo-email"
                  type="email"
                  className="w-full h-11 px-4 rounded-lg border border-border bg-white dark:bg-background text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  placeholder="equipo@empresa.com"
                  value={demoLead.email}
                  onChange={handleDemoLeadChange("email")}
                  aria-invalid={Boolean(demoFieldErrors.email)}
                  aria-describedby={demoFieldErrors.email ? "demo-email-error" : undefined}
                  required
                />
                {demoFieldErrors.email ? (
                  <p id="demo-email-error" className="text-xs text-red-500">{demoFieldErrors.email}</p>
                ) : null}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold" htmlFor="demo-company">Empresa</label>
                <input
                  id="demo-company"
                  name="demo-company"
                  className="w-full h-11 px-4 rounded-lg border border-border bg-white dark:bg-background text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  placeholder="Ej. Comercial ABC"
                  value={demoLead.company}
                  onChange={handleDemoLeadChange("company")}
                  aria-invalid={Boolean(demoFieldErrors.company)}
                  aria-describedby={demoFieldErrors.company ? "demo-company-error" : undefined}
                  required
                />
                {demoFieldErrors.company ? (
                  <p id="demo-company-error" className="text-xs text-red-500">{demoFieldErrors.company}</p>
                ) : null}
              </div>
              <div className="space-y-3">
                <button
                  type="submit"
                  disabled={demoStatus === "loading"}
                  className="w-full bg-primary text-white font-bold h-11 rounded-lg hover:shadow-lg hover:shadow-primary/30 transition-all disabled:opacity-70"
                >
                  {demoStatus === "loading" ? "Enviando..." : "Solicitar demo"}
                </button>
                {demoStatus === "success" ? (
                  <p className="text-xs text-green-600" role="status">¡Listo! Te contactaremos pronto.</p>
                ) : null}
                {demoStatus === "error" ? (
                  <p className="text-xs text-red-500" role="status">{demoError}</p>
                ) : null}
              </div>
              <div className="rounded-lg border border-border bg-muted/60 p-4 text-xs text-muted-foreground">
                ¿Prefieres agendar con calendario?{" "}
                <a
                  href={demoLink}
                  target={isExternalDemo ? "_blank" : undefined}
                  rel={isExternalDemo ? "noreferrer" : undefined}
                  className="text-primary font-semibold"
                >
                  Agenda aquí
                </a>
              </div>
            </form>
            <DemoChat reduceMotion={reduceMotion} compact onEvent={(event) => trackEvent(event)} />
          </div>
        </DialogContent>
      </Dialog>

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
            <button
              type="button"
              className="bg-primary text-white text-sm font-bold px-6 py-2.5 rounded-lg shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all flex items-center gap-2"
              onClick={() => {
                setIsDemoOpen(true);
                trackEvent("cta_demo_header");
              }}
            >
              <span>Agendar Demo</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
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
                <button
                  type="button"
                  onClick={() => {
                    setIsDemoOpen(true);
                    trackEvent("cta_demo_hero");
                  }}
                  className="bg-primary text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-primary/25 hover:scale-[1.02] transition-transform flex items-center justify-center gap-3"
                >
                  Agendar Demo
                  <span className="material-symbols-outlined">calendar_today</span>
                </button>
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
              <div className="relative z-10 w-full aspect-square rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-primary/20 to-purple-600/20 flex items-center justify-center border border-white/20">
                <div className="absolute inset-0 mix-blend-overlay opacity-60">
                  <Image
                    src={heroImage}
                    alt="Panel de automatización empresarial"
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    priority
                  />
                </div>
                <div className="relative z-20 flex flex-col items-center text-center p-8">
                  <div className="w-24 h-24 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center mb-6 border border-white/20">
                    <span className="material-symbols-outlined text-white text-[48px]">psychology</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">IA para productividad</h3>
                  <p className="text-white/80 max-w-xs text-sm">
                    Automatiza tu operación con respuestas inmediatas, confirmaciones inteligentes y métricas accionables.
                  </p>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 z-30 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-slate-100 dark:border-white/10">
                <div className="w-12 h-12 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined">trending_up</span>
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-bold">Eficiencia operativa</p>
                  <p className="text-xl font-extrabold text-slate-900 dark:text-white">+40%</p>
                </div>
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
                className={`group flex flex-col gap-4 rounded-xl border border-border bg-card p-8 shadow-sm hover:shadow-md hover:border-primary/30 transition-all ${service.wide ? "lg:col-span-2" : ""}`}
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

      <section id="demo" className="py-20 px-6 scroll-mt-24">
        <div className="max-w-[1200px] mx-auto grid lg:grid-cols-[1.05fr,0.95fr] gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="space-y-6"
          >
            <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary uppercase tracking-wider">
              Demo en vivo
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Prueba cómo se siente una conversación inteligente
            </h2>
            <p className="text-muted-foreground text-lg">
              Simula una conversación real con nuestro chatbot IA para ver cómo responde preguntas, agenda recordatorios y guía a tus clientes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={() => {
                  setIsDemoOpen(true);
                  trackEvent("cta_demo_section");
                }}
                className="bg-primary text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all"
              >
                Agendar demo
              </button>
              <a
                href="#precios"
                className="px-6 py-3 rounded-xl border border-border font-bold text-foreground hover:border-primary transition-colors"
              >
                Ver planes
              </a>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-border bg-card p-4">
                <p className="text-xs font-bold text-primary uppercase">Caso típico</p>
                <p className="text-sm text-muted-foreground mt-2">
                  &quot;Necesito confirmar citas y responder mensajes sin estar conectado todo el día&quot;.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-4">
                <p className="text-xs font-bold text-primary uppercase">Respuesta IA</p>
                <p className="text-sm text-muted-foreground mt-2">
                  &quot;Puedo confirmar automáticamente y avisarte solo cuando necesites intervenir&quot;.
                </p>
              </div>
            </div>
          </motion.div>
          <DemoChat reduceMotion={reduceMotion} onEvent={(event) => trackEvent(event)} />
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
            </motion.div>
          </div>
        </div>
      </section>

      <section id="integraciones" className="w-full flex justify-center py-16 bg-white dark:bg-[#1c1933]/50 scroll-mt-24">
        <div className="w-full max-w-[1200px] px-8">
          <div className="flex flex-col items-center mb-10">
            <h2 className="text-foreground text-2xl font-bold leading-tight tracking-tight text-center">
              Integraciones para automatización omnicanal
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
            <h2 className="text-foreground text-3xl md:text-4xl font-bold leading-tight tracking-tight mb-4">Precios y Paquetes</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Elige el plan que se adapta al ritmo de tu negocio y escala cuando lo necesites.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.1 }}
                className="rounded-2xl border border-border bg-card shadow-lg p-8 text-left flex flex-col gap-6 hover:-translate-y-1 transition-transform"
              >
                <div>
                  <p className="text-sm font-semibold text-primary uppercase tracking-wider">Plan {plan.name}</p>
                  <h3 className="text-3xl font-extrabold text-foreground mt-2">{plan.price}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
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
                  href={buildPlanLink(plan.id)}
                  onClick={() => trackEvent("cta_plan", { plan: plan.name })}
                  className="w-full bg-primary text-white font-bold h-12 rounded-lg hover:shadow-lg hover:shadow-primary/30 transition-all flex items-center justify-center gap-2"
                >
                  Elegir plan
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </a>
              </motion.div>
            ))}
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
              Co-CEOs enfocados en acelerar el crecimiento de PyMEs con automatización inteligente.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: "Arturo Moreno",
                role: "Co-CEO / Ingeniero en Sistemas",
                bio: "Diseña la arquitectura conversacional y las integraciones técnicas para que cada flujo funcione desde el primer día.",
                avatar: "/team/arturo.jpg",
              },
              {
                name: "Carlos Lascurain",
                role: "Co-CEO / CFO",
                bio: "Asegura que la operación sea escalable y rentable, acompañando a clientes en el retorno de inversión de cada automatización.",
                avatar: "/team/carlos.jpg",
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
          <div className="bg-white dark:bg-[#1e1a3a] rounded-2xl shadow-xl overflow-hidden border border-border">
            <div className="grid md:grid-cols-2">
              <div className="bg-primary p-8 md:p-12 text-white flex flex-col justify-between relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-6">Información de Contacto</h3>
                  <p className="text-white/80 mb-8 leading-relaxed">
                    Cuéntanos sobre tu negocio y te compartiremos un plan de automatización con impacto en ingresos y productividad.
                  </p>
                  {contactDetails.length ? (
                    <div className="space-y-6">
                      {contactDetails.map((detail) => (
                        <a key={detail.label} href={detail.href} className="flex items-center gap-4 text-sm font-medium hover:text-white/80">
                          <span className="material-symbols-outlined">{detail.icon}</span>
                          <span>{detail.label}</span>
                        </a>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-white/80">Completa el formulario y nuestro equipo te responderá en menos de 24 horas.</p>
                  )}
                </div>
                <div className="absolute -bottom-10 -right-10 size-40 bg-white/10 rounded-full blur-3xl" />
              </div>

              <div className="p-8 md:p-12">
                <form className="space-y-5" onSubmit={handleSubmit} noValidate>
                  <div className="space-y-2">
                    <label className="text-foreground text-sm font-semibold" htmlFor="fullName">Nombre Completo</label>
                    <input
                      id="fullName"
                      name="fullName"
                      className="w-full h-12 px-4 rounded-lg border border-border bg-white dark:bg-background text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-gray-400"
                      placeholder="Ej. Paola Hernández"
                      type="text"
                      autoComplete="name"
                      value={formState.fullName}
                      onChange={handleChange("fullName")}
                      aria-invalid={Boolean(fieldErrors.fullName)}
                      aria-describedby={fieldErrors.fullName ? "fullName-error" : undefined}
                      required
                    />
                    {fieldErrors.fullName ? (
                      <p id="fullName-error" className="text-xs text-red-500">{fieldErrors.fullName}</p>
                    ) : null}
                  </div>
                  <div className="space-y-2">
                    <label className="text-foreground text-sm font-semibold" htmlFor="email">Correo Institucional</label>
                    <input
                      id="email"
                      name="email"
                      className="w-full h-12 px-4 rounded-lg border border-border bg-white dark:bg-background text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-gray-400"
                      placeholder="ejemplo@empresa.com"
                      type="email"
                      autoComplete="email"
                      value={formState.email}
                      onChange={handleChange("email")}
                      aria-invalid={Boolean(fieldErrors.email)}
                      aria-describedby={fieldErrors.email ? "email-error" : undefined}
                      required
                    />
                    {fieldErrors.email ? (
                      <p id="email-error" className="text-xs text-red-500">{fieldErrors.email}</p>
                    ) : null}
                  </div>
                  <div className="space-y-2">
                    <label className="text-foreground text-sm font-semibold" htmlFor="company">Empresa</label>
                    <input
                      id="company"
                      name="company"
                      className="w-full h-12 px-4 rounded-lg border border-border bg-white dark:bg-background text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-gray-400"
                      placeholder="Ej. Comercial ABC"
                      type="text"
                      autoComplete="organization"
                      value={formState.company}
                      onChange={handleChange("company")}
                      aria-invalid={Boolean(fieldErrors.company)}
                      aria-describedby={fieldErrors.company ? "company-error" : undefined}
                      required
                    />
                    {fieldErrors.company ? (
                      <p id="company-error" className="text-xs text-red-500">{fieldErrors.company}</p>
                    ) : null}
                  </div>
                  <div className="space-y-2">
                    <label className="text-foreground text-sm font-semibold" htmlFor="interest">Servicio de Interés</label>
                    <select
                      id="interest"
                      name="interest"
                      className="w-full h-12 px-4 rounded-lg border border-border bg-white dark:bg-background text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none bg-no-repeat bg-[right_1rem_center]"
                      value={formState.interest || (normalizedPlan ? `Plan ${normalizedPlan}` : "")}
                      onChange={handleChange("interest")}
                      aria-invalid={Boolean(fieldErrors.interest)}
                      aria-describedby={fieldErrors.interest ? "interest-error" : undefined}
                      required
                    >
                      <option value="">Selecciona un servicio</option>
                      <option value="Chatbots">Chatbots y atención al cliente</option>
                      <option value="Secretaría virtual">Secretaría virtual y recordatorios</option>
                      <option value="Automatización de CRM">Automatización de leads/CRM</option>
                      <option value="Cobranza">Cobranza y seguimiento</option>
                      <option value="Reportes">Reportes y BI</option>
                      <option value="Plan Básico">Plan Básico</option>
                      <option value="Plan Avanzado">Plan Avanzado</option>
                      <option value="Otro">Otro servicio especializado</option>
                    </select>
                    {fieldErrors.interest ? (
                      <p id="interest-error" className="text-xs text-red-500">{fieldErrors.interest}</p>
                    ) : null}
                  </div>
                  <div className="space-y-2">
                    <label className="text-foreground text-sm font-semibold" htmlFor="message">Mensaje (opcional)</label>
                    <textarea
                      id="message"
                      name="message"
                      className="w-full min-h-[120px] px-4 py-3 rounded-lg border border-border bg-white dark:bg-background text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-gray-400"
                      placeholder="Cuéntanos sobre tu operación y objetivos."
                      value={formState.message}
                      onChange={handleChange("message")}
                    />
                  </div>
                  <input type="hidden" name="plan" value={inferredPlan} />
                  {turnstileSiteKey ? (
                    <div className="pt-2">
                      <div className="cf-turnstile" data-sitekey={turnstileSiteKey} data-callback="handleTurnstile" />
                      {fieldErrors.turnstileToken ? (
                        <p className="text-xs text-red-500 mt-2">{fieldErrors.turnstileToken}</p>
                      ) : null}
                    </div>
                  ) : null}
                  <div className="pt-4 space-y-3">
                    <button
                      className="w-full bg-primary text-white font-bold h-12 rounded-lg hover:shadow-lg hover:shadow-primary/30 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                      type="submit"
                      disabled={formStatus === "loading"}
                    >
                      {formStatus === "loading" ? "Enviando..." : "Enviar Mensaje"}
                      <span className="material-symbols-outlined text-[18px]">send</span>
                    </button>
                    {formStatus === "success" ? (
                      <p className="text-center text-xs text-green-600" role="status" aria-live="polite">
                        ¡Gracias! Tu mensaje fue enviado. Te contactaremos pronto.
                      </p>
                    ) : null}
                    {formStatus === "error" ? (
                      <p className="text-center text-xs text-red-500" role="status" aria-live="polite">
                        {formError}
                      </p>
                    ) : null}
                    <p className="text-center text-[11px] text-muted-foreground">
                      Tu información está protegida bajo nuestras políticas de privacidad.
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

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
                    return (
                      <a
                        key={link.label}
                        className="size-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-all group"
                        href={link.href}
                        aria-label={link.label}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noreferrer" : undefined}
                      >
                        <span className="material-symbols-outlined text-[20px] group-hover:scale-110">{link.icon}</span>
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
                <li><a className="hover:text-white transition-colors" href="#demo">Demo</a></li>
                <li><a className="hover:text-white transition-colors" href="#integraciones">Integraciones</a></li>
                <li><a className="hover:text-white transition-colors" href="#precios">Precios</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">Empresa</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><a className="hover:text-white transition-colors" href="#mision">Misión y Visión</a></li>
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
                <button
                  type="button"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-primary transition-colors"
                  onClick={() => {
                    setIsDemoOpen(true);
                    trackEvent("cta_demo_footer");
                  }}
                >
                  Agendar Demo
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
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
