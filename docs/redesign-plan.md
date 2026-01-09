# Rediseño landing Auralic IA

## Estructura propuesta de la landing
**Contexto regional:** base operativa y horarios en Ciudad de México; mensajes y ofertas aplican para toda Latinoamérica sin referencias a Brasil.

- **Hero (Inicio)**: propuesta de valor, CTA principal a calendario.
- **Beneficios**: cuadricula de ventajas clave.
- **Servicios**: detalle de automatización conversacional.
- **Prueba social**: métricas/logos.
- **Adaptabilidad por industria**: bloque "Listo para cualquier industria" con capacidades transversales.
- **Cómo funciona**: pasos de implementación.
- **Empresa**: misión, visión y equipo (Arturo, Carlos).
- **Agenda tu demo**: botón directo a CAL, sin formularios.
- **Testimonios**: carrusel de texto.
- **FAQ**: preguntas alineadas al nuevo flujo.
- **Footer**: enlaces legales esenciales.

## Plan de acción (to-do list)
- [ ] Actualizar navegación con anclas Inicio, Servicios, Empresa y CTA demo. **Responsable sugerido:** Frontend. **Prioridad:** Alta. **Esfuerzo:** 1h.
- [ ] Implementar sección Empresa (misión, visión, equipo). **Responsable sugerido:** UX/Content + Frontend. **Prioridad:** Alta. **Esfuerzo:** 2h.
- [ ] Reemplazar testimonios en video por carrusel de texto. **Responsable sugerido:** Frontend. **Prioridad:** Alta. **Esfuerzo:** 2h.
- [ ] Cambiar bloque de industrias a copy genérico adaptable. **Responsable sugerido:** UX/Content + Frontend. **Prioridad:** Media. **Esfuerzo:** 1.5h.
- [ ] Simplificar "Agenda tu demo" a botón que abre CAL directamente. **Responsable sugerido:** Frontend. **Prioridad:** Alta. **Esfuerzo:** 1h.
- [ ] Definir la única variable de entorno necesaria para el calendario en producción. **Responsable sugerido:** Frontend/DevOps. **Prioridad:** Alta. **Esfuerzo:** 0.25h.
- [ ] Revisar y ajustar FAQ a nuevos flujos. **Responsable sugerido:** UX/Content. **Prioridad:** Media. **Esfuerzo:** 1h.
- [ ] Simplificar footer y eliminar contactos redundantes. **Responsable sugerido:** Frontend. **Prioridad:** Media. **Esfuerzo:** 0.5h.
- [ ] QA responsivo y accesibilidad mínima (focus, contraste). **Responsable sugerido:** QA/Frontend. **Prioridad:** Alta. **Esfuerzo:** 1h.

## Borradores de copy
- **Misión:** "Automatizar conversaciones que generan valor. Facilitar que cualquier empresa atienda, guíe y agende a sus clientes en segundos, integrando IA y operaciones humanas de forma transparente."
- **Visión:** "Ser la capa conversacional de confianza en LATAM, desplegando agentes que entienden cada contexto, respetan la privacidad y crean experiencias consistentes en todos los canales."
- **Servicios (genérico):** "Automatización conversacional en WhatsApp, Instagram, Messenger, web y voz. Configuración rápida, integraciones vía API/webhooks y reportes accionables."
- **CTA principal:** "Agenda tu demo gratuita" / "Agendar ahora".
- **Testimonios (tono):** Enfocados en velocidad de respuesta, filtrado de leads, coordinación automática y experiencia sin formularios.
- **Footer:** "© Auralic IA. Todos los derechos reservados." + enlaces a Términos y Política de privacidad.

## Variables de entorno necesarias
(Ver `.env.example` para formato)
- `NEXT_PUBLIC_CAL_URL`: enlace directo al calendario de agendamiento. Usar la URL proporcionada para mostrar el embed en la landing. No hay otras variables regionales; los horarios se manejan en CDMX por defecto.

## Checklist antes de deploy/merge
- [ ] Botón de "Agenda tu demo" abre directamente el flujo de CAL (sin formularios ni pasos extra).
- [ ] Navegación enlaza correctamente a Inicio, Servicios, Empresa, FAQ y CTA.
- [ ] Sección de industrias muestra copy genérico (sin referencia médica) y comunica adaptabilidad.
- [ ] Testimonios solo en formato texto/carrusel; no hay videos embebidos.
- [ ] Footer reducido a enlaces legales y marca actualizada.
- [ ] Variable de entorno del calendario configurada y probada con la URL oficial.
- [ ] Vista responsiva validada en mobile y desktop.
- [ ] Contraste y foco accesible en botones/links principales.
- [ ] Limpieza de componentes/formularios obsoletos confirmada.
- [ ] Metadatos/SEO básicos revisados (título, descripción). 
