import { z } from "zod";

export const contactSchema = z.object({
  fullName: z.string().trim().min(2, "Ingresa tu nombre completo.").max(120),
  email: z.string().trim().email("Ingresa un correo válido.").max(160),
  company: z.string().trim().min(2, "Ingresa el nombre de tu empresa.").max(160),
  interest: z.string().trim().min(1, "Selecciona un servicio.").max(80),
  message: z.string().trim().max(800).optional().or(z.literal("")),
  plan: z.string().trim().max(40).optional().or(z.literal("")),
  turnstileToken: z.string().trim().optional().or(z.literal("")),
});

export type ContactPayload = z.infer<typeof contactSchema>;
