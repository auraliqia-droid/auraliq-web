This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses a system font stack by default to avoid external font fetches during builds.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Variables de entorno

Crea un archivo `.env.local` con las siguientes variables para habilitar los flujos de demo, contacto y seguridad:

```bash
# URL pública del sitio (SEO y validación de origen)
NEXT_PUBLIC_SITE_URL=https://www.auraliqia.com

# Contacto visible en la landing
NEXT_PUBLIC_CONTACT_EMAIL=contacto@tuempresa.com
NEXT_PUBLIC_CONTACT_PHONE=+52 55 1234 5678
NEXT_PUBLIC_WHATSAPP_NUMBER=5215512345678
NEXT_PUBLIC_WHATSAPP_MESSAGE="Hola, quiero automatizar mi PyME con IA."

# Demo agendada (opcional)
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/tuempresa/demo

# Turnstile (anti-spam opcional)
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_turnstile_site_key
TURNSTILE_SECRET_KEY=your_turnstile_secret_key

# Resend (envío de correos del formulario)
RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL="AuraLiqIA <no-reply@tuempresa.com>"
RESEND_TO_EMAIL=contacto@tuempresa.com

```

Si no configuras `NEXT_PUBLIC_CALENDLY_URL`, los botones de demo abrirán WhatsApp cuando exista `NEXT_PUBLIC_WHATSAPP_NUMBER`.
Si no configuras Turnstile, el formulario seguirá funcionando sin verificación adicional.
