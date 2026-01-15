import { NextResponse } from 'next/server';
import { contactSchema } from '@/lib/contactSchema';
import { env } from '@/lib/env';
import { allowRequest } from '@/lib/rateLimiter';

export async function POST(request: Request) {
  try {
    const ip = (request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown') as string;

    // Rate limiting (in-memory token-bucket). For production use a shared store (Redis).
    if (!allowRequest(ip)) {
      return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
    }

    const body = await request.json();
    const parse = contactSchema.safeParse(body);
    if (!parse.success) {
      return NextResponse.json({ error: 'Invalid payload', issues: parse.error.issues }, { status: 400 });
    }

    const data = parse.data;

    // Optional Turnstile verification if token and secret are provided
    if (env.TURNSTILE_SECRET) {
      const token = (data as any).turnstileToken ?? '';
      if (!token) {
        return NextResponse.json({ error: 'Missing Turnstile token' }, { status: 400 });
      }

      const params = new URLSearchParams();
      params.append('secret', env.TURNSTILE_SECRET);
      params.append('response', token);

      const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        body: params,
      });

      const verifyJson = await verifyRes.json();
      if (!verifyJson.success) {
        return NextResponse.json({ error: 'Turnstile verification failed', details: verifyJson }, { status: 403 });
      }
    }

    // Send email via Resend if configured
    if (env.RESEND_API_KEY && env.RESEND_FROM && env.RESEND_TO) {
      try {
        const html = `
          <p>Nuevo contacto desde la landing:</p>
          <ul>
            <li><strong>Nombre:</strong> ${escapeHtml(data.name)}</li>
            <li><strong>Email:</strong> ${escapeHtml(data.email)}</li>
            <li><strong>Empresa:</strong> ${escapeHtml(data.company ?? '')}</li>
            <li><strong>Plan inferido:</strong> ${escapeHtml((data as any).inferredPlan ?? '')}</li>
          </ul>
          <p>Mensaje:</p>
          <p>${escapeHtml(data.message)}</p>
        `;

        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: env.RESEND_FROM,
            to: [env.RESEND_TO],
            subject: `Nuevo contacto: ${data.name} <${data.email}>`,
            html,
          }),
        });
      } catch (err) {
        // Log the error server-side (consider Sentry or similar in production)
        // Do not expose internal error details to the client
        console.error('Resend send error', err);
        return NextResponse.json({ error: 'Failed to send notification' }, { status: 502 });
      }
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error('Contact route error', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

function escapeHtml(input: string) {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}