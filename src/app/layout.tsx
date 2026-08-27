import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { DM_Sans, Geist_Mono, Syne } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
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
  themeColor: "#07090c",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Veyra — Tu identidad es tu cartera",
  description:
    "Identifícate, entra y paga con biometría. Veyra separa tu identidad de tus métodos de pago para una experiencia presencial segura y sin fricción.",
  icons: {
    icon: [{ url: "/brand/veyra-wordmark.svg", type: "image/svg+xml" }],
    apple: [{ url: "/brand/veyra-wordmark.png" }],
  },
  openGraph: {
    title: "Veyra — Tu identidad es tu cartera",
    description:
      "Identifícate. Entra. Paga. Plataforma de identidad biométrica para pagos y acceso.",
    type: "website",
    locale: "es_MX",
    siteName: "Veyra",
    url: "/",
    images: [
      {
        url: "/brand/veyra-hero-authorize.jpg",
        width: 1200,
        height: 900,
        alt: "Veyra — autorización biométrica",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Veyra — Tu identidad es tu cartera",
    description:
      "Identifícate. Entra. Paga. Plataforma de identidad biométrica para pagos y acceso.",
    images: ["/brand/veyra-hero-authorize.jpg"],
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
      className={`${syne.variable} ${dmSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
