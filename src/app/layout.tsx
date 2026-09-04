import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { DM_Sans, Fraunces, Geist_Mono, Sora } from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://veyra.app";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Veyra — Paga y entra con tu palma",
  description:
    "Sin tarjeta ni teléfono en la caja. Acerca la palma y listo. Ideal para cafés, retail, gyms y hoteles en México.",
  icons: {
    icon: [{ url: "/brand/veyra-wordmark.svg", type: "image/svg+xml" }],
    apple: [{ url: "/brand/veyra-wordmark.png" }],
  },
  openGraph: {
    title: "Veyra — Paga y entra con tu palma",
    description:
      "Cobras más rápido. Tus clientes se van feliz. La mano es la nueva forma de pagar.",
    type: "website",
    locale: "es_MX",
    siteName: "Veyra",
    url: "/",
    images: [
      {
        url: "/brand/veyra-checkout-palm.png",
        width: 1200,
        height: 675,
        alt: "Pagar con la palma usando Veyra",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Veyra — Paga y entra con tu palma",
    description:
      "Cobras más rápido. Tus clientes se van feliz. La mano es la nueva forma de pagar.",
    images: ["/brand/veyra-checkout-palm.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${sora.variable} ${fraunces.variable} ${dmSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
