import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
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
  themeColor: "#141414",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Veyra — Identidad con tu palma para cobrar y acceder",
  description:
    "Presencia, identidad y acción autorizada. Cobra, da acceso o haz check-in con la palma. Para retail, gyms, hoteles y eventos en México.",
  icons: {
    icon: [
      { url: "/brand/veyra-favicon.svg", type: "image/svg+xml" },
      { url: "/brand/veyra-favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/brand/veyra-favicon-48.png", sizes: "48x48", type: "image/png" },
    ],
    apple: [{ url: "/brand/veyra-apple-touch.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: "Veyra — Identidad con tu palma para cobrar y acceder",
    description:
      "Menos fricción en caja y acceso. Una palma reconoce, autoriza y avanza la acción.",
    type: "website",
    locale: "es_MX",
    siteName: "Veyra",
    url: "/",
    images: [
      {
        url: "/brand/veyra-checkout-palm.png",
        width: 1200,
        height: 675,
        alt: "Terminal Veyra: pago y acceso con la palma",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Veyra — Identidad con tu palma para cobrar y acceder",
    description:
      "Menos fricción en caja y acceso. Una palma reconoce, autoriza y avanza la acción.",
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
      className={`${outfit.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
