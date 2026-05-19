import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FJ Diseño & Media | Portafolio Profesional",
  description:
    "Portafolio profesional de Jonathan Flores — Diseño gráfico, identidad corporativa, publicidad, contenido digital y diseño web. República Dominicana.",
  keywords: [
    "FJ Diseño & Media",
    "Jonathan Flores",
    "diseño gráfico",
    "identidad corporativa",
    "publicidad",
    "branding",
    "República Dominicana",
    "portafolio",
  ],
  authors: [{ name: "Jonathan Flores" }],
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "FJ Diseño & Media | Portafolio Profesional",
    description:
      "Diseño gráfico, identidad corporativa, publicidad y contenido digital.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${oswald.variable} font-sans antialiased`}
        style={{ fontFamily: "var(--font-inter), sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
