import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { contactSchema, type ContactPayload } from "@/lib/contactSchema";

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const resendApiKey = process.env.RESEND_API_KEY;
const resendFrom = process.env.RESEND_FROM_EMAIL;
const resendTo = process.env.RESEND_TO_EMAIL ?? "auraliqia@gmail.com";
const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;

const sanitize = (value: string) =>
  value
    .replace(/<[^>]*>/g, "")
    .replace(/[<>]/g, "")
    .trim();

const getIp = (request: NextRequest) => {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() ?? "unknown";
  }
  return request.headers.get("x-real-ip") ?? "unknown";
};

const isRateLimited = (ip: string) => {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_LIMIT_MAX) {
    return true;
  }
  entry.count += 1;
  rateLimitMap.set(ip, entry);
  return false;
};

const verifyTurnstile = async (token: string, ip: string) => {
  if (!turnstileSecret) {
    return true;
  }
  if (!token) {
    return false;
  }
  const formData = new FormData();
  formData.append("secret", turnstileSecret);
  formData.append("response", token);
  formData.append("remoteip", ip);

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: formData,
  });
  if (!response.ok) {
    return false;
  }
  const data = (await response.json()) as { success?: boolean };
  return Boolean(data.success);
};

const sendEmail = async (payload: ContactPayload, context: { origin: string; timestamp: string }) => {
  if (!(resendApiKey && resendFrom && resendTo)) {
    console.info("Email delivery skipped: missing RESEND_* env vars.");
    return { ok: true, skipped: true };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: resendFrom,
      to: resendTo,
      subject: "Nuevo lead - AuraLiqIA",
      text: [
        `Nombre: ${payload.fullName}`,
        `Email: ${payload.email}`,
        payload.phone ? `Teléfono: ${payload.phone}` : null,
        `Empresa: ${payload.company}`,
        `Interés: ${payload.interest}`,
        payload.plan ? `Plan: ${payload.plan}` : null,
        `Mensaje: ${payload.message}`,
        `Página origen: ${context.origin}`,
        `Timestamp: ${context.timestamp}`,
      ]
        .filter(Boolean)
        .join("\n"),
    }),
  });

  return { ok: response.ok, skipped: false };
};

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (origin && !origin.startsWith(siteUrl)) {
    return NextResponse.json({ error: "Origen no permitido." }, { status: 403 });
  }
  const referer = request.headers.get("referer") ?? origin ?? siteUrl;

  const ip = getIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Demasiadas solicitudes. Intenta más tarde." }, { status: 429 });
  }

  const payload = await request.json();
  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: "Datos inválidos.", details: parsed.error.flatten() }, { status: 400 });
  }

  const sanitized = {
    ...parsed.data,
    fullName: sanitize(parsed.data.fullName),
    email: sanitize(parsed.data.email),
    phone: parsed.data.phone ? sanitize(parsed.data.phone) : "",
    company: sanitize(parsed.data.company),
    interest: sanitize(parsed.data.interest),
    message: sanitize(parsed.data.message),
    plan: parsed.data.plan ? sanitize(parsed.data.plan) : "",
    website: parsed.data.website ? sanitize(parsed.data.website) : "",
    turnstileToken: parsed.data.turnstileToken ?? "",
  };

  if (sanitized.website) {
    return NextResponse.json({ error: "Verificación anti-spam fallida." }, { status: 400 });
  }

  const isTurnstileOk = await verifyTurnstile(sanitized.turnstileToken ?? "", ip);
  if (!isTurnstileOk) {
    return NextResponse.json({ error: "Verificación anti-spam fallida." }, { status: 400 });
  }

  const result = await sendEmail(sanitized, {
    origin: referer,
    timestamp: new Date().toISOString(),
  });
  if (!result.ok) {
    return NextResponse.json({ error: "No se pudo enviar el mensaje." }, { status: 500 });
  }

  return NextResponse.json({ ok: true, skipped: result.skipped });
}
