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
  title: "Veyra — Checkout y acceso con presencia",
  description:
    "Lleva pagos biométricos y acceso a tu negocio. Menos filas, más conversión y una experiencia que diferencia tu marca. Demo para operadores en México.",
  icons: {
    icon: [{ url: "/brand/veyra-wordmark.svg", type: "image/svg+xml" }],
    apple: [{ url: "/brand/veyra-wordmark.png" }],
  },
  openGraph: {
    title: "Veyra — Checkout y acceso con presencia",
    description:
      "Más velocidad en caja, mejor captación y una experiencia premium. Agenda una demo para tu negocio.",
    type: "website",
    locale: "es_MX",
    siteName: "Veyra",
    url: "/",
    images: [
      {
        url: "/brand/veyra-checkout-palm.png",
        width: 1200,
        height: 675,
        alt: "Veyra — pago con la palma",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Veyra — Checkout y acceso con presencia",
    description:
      "Más velocidad en caja, mejor captación y una experiencia premium. Agenda una demo para tu negocio.",
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
