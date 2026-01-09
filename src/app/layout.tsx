import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "AuraLiqIA | Innovación en IA para clínicas",
  description: "Automatización de atención en redes sociales con IA. Agenda tu demo.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "AuraLiqIA | Innovación en IA para clínicas",
    description: "Automatización de atención en redes sociales con IA. Agenda tu demo.",
    type: "website",
    locale: "es_MX",
    url: "/",
    siteName: "AuraLiqIA",
  },
  twitter: {
    card: "summary_large_image",
    title: "AuraLiqIA | Innovación en IA para clínicas",
    description: "Automatización de atención en redes sociales con IA. Agenda tu demo.",
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
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@100..700&display=swap"
        />
      </head>
      <body className={`${manrope.variable} antialiased font-sans bg-background text-foreground`}>
        <main>{children}</main>
      </body>
    </html>
  );
}
