"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const services = [
  {
    icon: "database",
    title: "Automatización de CRM",
    description:
      "Sincroniza datos de pacientes entre plataformas clínicas sin esfuerzo. Mantén tus registros actualizados en tiempo real.",
  },
  {
    icon: "calendar_month",
    title: "Calendarios inteligentes",
    description:
      "Reprogramación automática y gestión de disponibilidad con IA. Maximiza tus horas facturables al llenar cancelaciones.",
  },
  {
    icon: "description",
    title: "Planes de nutrición",
    description:
      "Generación automática de guías alimenticias personalizadas con datos clínicos para recomendaciones inmediatas.",
  },
  {
    icon: "verified_user",
    title: "Calificación de pacientes",
    description:
      "Filtra y categoriza pacientes potenciales. Tu equipo solo atiende consultas que cumplen con tus criterios.",
  },
  {
    icon: "schedule",
    title: "Agenda 24/7 para pacientes",
    description:
      "Nuestro bot de agenda opera sin intervención humana. Desde el primer mensaje hasta la cita confirmada en tu calendario, todo el proceso es autónomo, reduciendo la carga administrativa hasta 80%.",
    wide: true,
  },
];

const integrations = [
  { icon: "chat", title: "Messenger", subtitle: "Ecosistema Facebook", color: "text-[#00B2FF]", bg: "bg-[#00B2FF]/10" },
  { icon: "photo_camera", title: "Instagram", subtitle: "Engagement visual", color: "text-[#E4405F]", bg: "bg-[#E4405F]/10" },
  { icon: "movie", title: "TikTok", subtitle: "Crecimiento y alcance", color: "text-black dark:text-white", bg: "bg-black/10 dark:bg-white/10" },
];

export function LandingPage() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="bg-background text-foreground">
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-[#131022]/80 border-b border-white/30 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary p-1.5 rounded-lg text-white">
              <span className="material-symbols-outlined block text-[24px]">clinical_notes</span>
            </div>
            <span className="text-xl font-extrabold tracking-tight">
              AuraLiq<span className="text-primary">IA</span>
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-10">
            <a className="text-sm font-semibold hover:text-primary transition-colors" href="#inicio">Inicio</a>
            <a className="text-sm font-semibold hover:text-primary transition-colors" href="#soluciones">Soluciones</a>
            <a className="text-sm font-semibold hover:text-primary transition-colors" href="#integraciones">Integraciones</a>
            <a className="text-sm font-semibold hover:text-primary transition-colors" href="#equipo">Equipo</a>
            <a className="text-sm font-semibold hover:text-primary transition-colors" href="#contacto">Contacto</a>
          </nav>
          <div className="flex items-center gap-4">
            <button className="hidden sm:block text-sm font-bold px-4 py-2 rounded-lg bg-white/70 dark:bg-white/10 hover:bg-white transition-all">
              Iniciar sesión
            </button>
            <a
              className="bg-primary text-white text-sm font-bold px-6 py-2.5 rounded-lg shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all flex items-center gap-2"
              href="#contacto"
            >
              <span>Agendar Demo</span>
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
            <span className="material-symbols-outlined text-primary text-[120px]">neurology</span>
          </div>
          <div className="absolute bottom-1/4 left-[5%] opacity-10 dark:opacity-20">
            <span className="material-symbols-outlined text-primary text-[80px]">dentistry</span>
          </div>
          <div className="absolute top-1/2 right-1/4 opacity-10 dark:opacity-20">
            <span className="material-symbols-outlined text-primary text-[60px]">health_and_safety</span>
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
                <span className="text-xs font-bold uppercase tracking-wider">Liderando la salud con IA</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight text-foreground">
                Revoluciona tu{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">Clínica</span>{" "}
                con IA
              </h1>
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
                Automatizamos la gestión de pacientes y optimizamos tus procesos clínicos con soluciones de Inteligencia Artificial a medida. Menos administración, más cuidado médico.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#contacto"
                  className="bg-primary text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-primary/25 hover:scale-[1.02] transition-transform flex items-center justify-center gap-3"
                >
                  Agendar Demo Gratuita
                  <span className="material-symbols-outlined">calendar_today</span>
                </a>
                <a
                  href="#soluciones"
                  className="bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 dark:hover:bg-white/10 transition-colors flex items-center justify-center gap-3"
                >
                  Ver Soluciones
                  <span className="material-symbols-outlined">smart_toy</span>
                </a>
              </div>

              <div className="mt-12 flex flex-col gap-4">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Confiado por clínicas líderes</p>
                <div className="flex flex-wrap gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined">local_hospital</span>
                    <span className="font-bold text-lg">MediGroup</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined">oncology</span>
                    <span className="font-bold text-lg">BioClinic</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined">dentistry</span>
                    <span className="font-bold text-lg">DentalCare</span>
                  </div>
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
                <div
                  className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-60"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBMf48jrFObM3jtshQHGX9Jp_bD60YLjIlxgfGJjf2w_73HT6gfigiySUUT_wBN1fnRlGJ8rIq4THv8P2BHpOujDVHNwfxmtpaC6aUASQPCvjob9U_AEsAg3MJ2lSGC3EiZZYC-4Qk33OyoURYCoFwdJvTgMWrhV-4_12ogzBV8ZhNSWq1TFuC9Nmlvcl_MhXoUsLxavsCrfd1nuzwdnY83JtAJSWtA2hdtc0I23M5QIPAVdj4wWU9PnA-1vbx2FhI3G4_8Sx5J53I')",
                  }}
                />
                <div className="relative z-20 flex flex-col items-center text-center p-8">
                  <div className="w-24 h-24 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center mb-6 border border-white/20">
                    <span className="material-symbols-outlined text-white text-[48px]">psychology</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">IA Predictiva</h3>
                  <p className="text-white/80 max-w-xs text-sm">
                    Nuestros modelos analizan miles de puntos de datos para mejorar el diagnóstico preventivo.
                  </p>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 z-30 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-slate-100 dark:border-white/10">
                <div className="w-12 h-12 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined">trending_up</span>
                </div>
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-bold">Eficiencia Clínica</p>
                  <p className="text-xl font-extrabold text-slate-900 dark:text-white">+40%</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <section id="soluciones" className="py-16 px-4 text-center scroll-mt-24">
        <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary uppercase tracking-wider mb-4">
          Nuestras soluciones
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight max-w-3xl mx-auto">
          Servicios de IA especializados para{" "}
          <span className="text-primary text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">
            clínicas médicas
          </span>
        </h2>
        <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
          Automatiza el viaje del paciente y simplifica tareas administrativas con nuestro ecosistema de IA diseñado para profesionales de la salud.
        </p>
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
            <button className="flex items-center gap-2 px-8 py-3 bg-primary text-white font-bold rounded-lg hover:shadow-lg hover:shadow-primary/25 transition-all group">
              Ver todas las integraciones
              <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
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
              Co-CEOs enfocados en transformar la experiencia médica con automatización inteligente.
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
                role: "Co-CEO / CFO / Financial Officer",
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
              Impulsa tu Clínica con Inteligencia Artificial
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Agenda una consulta gratuita y descubre cómo optimizar tus procesos y la atención al paciente.
            </p>
          </div>
          <div className="bg-white dark:bg-[#1e1a3a] rounded-2xl shadow-xl overflow-hidden border border-border">
            <div className="grid md:grid-cols-2">
              <div className="bg-primary p-8 md:p-12 text-white flex flex-col justify-between relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-6">Información de Contacto</h3>
                  <p className="text-white/80 mb-8 leading-relaxed">
                    Estamos listos para transformar tu práctica médica. Déjanos tus datos y nos pondremos en contacto en menos de 24 horas.
                  </p>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <span className="material-symbols-outlined">call</span>
                      <span className="text-sm font-medium">+1 (555) 000-1234</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="material-symbols-outlined">mail</span>
                      <span className="text-sm font-medium">contacto@auraliqia.com</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="material-symbols-outlined">location_on</span>
                      <span className="text-sm font-medium">Ciudad de México, México</span>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-10 -right-10 size-40 bg-white/10 rounded-full blur-3xl" />
              </div>

              <div className="p-8 md:p-12">
                <form className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-foreground text-sm font-semibold">Nombre Completo</label>
                    <input
                      className="w-full h-12 px-4 rounded-lg border border-border bg-white dark:bg-background text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-gray-400"
                      placeholder="Ej. Dr. Alejandro García"
                      type="text"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-foreground text-sm font-semibold">Correo Institucional</label>
                    <input
                      className="w-full h-12 px-4 rounded-lg border border-border bg-white dark:bg-background text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-gray-400"
                      placeholder="ejemplo@clinica.com"
                      type="email"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-foreground text-sm font-semibold">Servicio de Interés</label>
                    <select
                      defaultValue=""
                      className="w-full h-12 px-4 rounded-lg border border-border bg-white dark:bg-background text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none bg-no-repeat bg-[right_1rem_center]"
                    >
                      <option disabled value="">
                        Selecciona un servicio
                      </option>
                      <option value="recepcionista">Recepcionista AI 24/7</option>
                      <option value="citas">Automatización de Citas</option>
                      <option value="pacientes">Seguimiento de Pacientes</option>
                      <option value="otro">Otro Servicio Especializado</option>
                    </select>
                  </div>
                  <div className="pt-4">
                    <button className="w-full bg-primary text-white font-bold h-12 rounded-lg hover:shadow-lg hover:shadow-primary/30 transition-all flex items-center justify-center gap-2" type="submit">
                      Enviar Mensaje
                      <span className="material-symbols-outlined text-[18px]">send</span>
                    </button>
                    <p className="text-center text-[11px] text-muted-foreground mt-4">
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
                Liderando la revolución de automatización inteligente para el sector salud y clínicas especializadas.
              </p>
              <div className="flex items-center gap-4">
                <a className="size-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-all group" href="#">
                  <span className="material-symbols-outlined text-[20px] group-hover:scale-110">share</span>
                </a>
                <a className="size-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-all group" href="#">
                  <span className="material-symbols-outlined text-[20px] group-hover:scale-110">link</span>
                </a>
                <a className="size-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-all group" href="#">
                  <span className="material-symbols-outlined text-[20px] group-hover:scale-110">public</span>
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-6">Plataforma</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><a className="hover:text-white transition-colors" href="#">Características</a></li>
                <li><a className="hover:text-white transition-colors" href="#">Seguridad de Datos</a></li>
                <li><a className="hover:text-white transition-colors" href="#">Integraciones</a></li>
                <li><a className="hover:text-white transition-colors" href="#">API para Médicos</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">Empresa</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li><a className="hover:text-white transition-colors" href="#">Sobre Nosotros</a></li>
                <li><a className="hover:text-white transition-colors" href="#">Blog de Salud IA</a></li>
                <li><a className="hover:text-white transition-colors" href="#">Carreras</a></li>
                <li><a className="hover:text-white transition-colors" href="#">Prensa</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">Ubicación</h4>
              <div className="rounded-xl overflow-hidden h-32 w-full mb-4">
                <img
                  className="w-full h-full object-cover grayscale opacity-50"
                  alt="Mapa de Ciudad de México"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAn6FPQTM9Mkf-9dd1RqA8s6zeQbX5sV8HFHzyK_LHn20Pln4YmkjDDTzYbPlO3bziaeExO7gyoZH8f_gTm4caSZcyyUZInzgV3af7_yb0nur6gUwKtl2GJtoJG4hQe2dfMLHZo_0OARykqactYLt1O_YAmwHkXkbS3-GRfQYDPGl_ZqiIaWBSyxDONQqwbHfDZIa7fnLXu5I39GhtGfEtGvuJAbMSrZE_ARoVBA5uAAleYCsX4r3eg6rgWQhMddacUz1qNcHQ9zzM"
                />
              </div>
              <p className="text-xs text-gray-500">Av. Insurgentes Sur 1200, Ciudad de México.</p>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
            <p>© 2024 AuraLiqIA. Todos los derechos reservados.</p>
            <div className="flex gap-8">
              <a className="hover:text-white transition-colors" href="#">Términos y Condiciones</a>
              <a className="hover:text-white transition-colors" href="#">Aviso de Privacidad</a>
              <a className="hover:text-white transition-colors" href="#">Configuración de Cookies</a>
            </div>
          </div>
        </div>
        <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 size-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      </footer>
    </div>
  );
}
