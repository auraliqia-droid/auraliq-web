import type { Metadata } from "next";
import type { CSSProperties } from "react";
import "./globals.css";

const fallbackFontStack =
  "system-ui,-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,\"Helvetica Neue\",Arial,\"Noto Sans\",sans-serif";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "AuraLiqIA | Automatización con IA para PyMEs",
  description:
    "Mejora el desempeño de tu PyME con automatización e IA. Optimiza ventas, soporte y operaciones con resultados medibles.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "AuraLiqIA | Automatización con IA para PyMEs",
    description:
      "Mejora el desempeño de tu PyME con automatización e IA. Optimiza ventas, soporte y operaciones con resultados medibles.",
    type: "website",
    locale: "es_MX",
    url: "/",
    siteName: "AuraLiqIA",
  },
  twitter: {
    card: "summary_large_image",
    title: "AuraLiqIA | Automatización con IA para PyMEs",
    description:
      "Mejora el desempeño de tu PyME con automatización e IA. Optimiza ventas, soporte y operaciones con resultados medibles.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link rel="dns-prefetch" href="//formspree.io" />
        <link rel="preconnect" href="https://formspree.io" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@100..700&display=swap"
        />
      </head>
      <body
        className="antialiased font-sans bg-background text-foreground"
        style={{ "--font-sans": fallbackFontStack } as CSSProperties}
      >
        <main>{children}</main>
      </body>
    </html>
  );
}
