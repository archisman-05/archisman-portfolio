import type { Metadata } from "next";
import {
  Bodoni_Moda,
  Playfair_Display,
  IBM_Plex_Mono,
} from "next/font/google";

import "./globals.css";
import MusicPlayer from "./components/MusicPlayer";
import { PageTurnProvider } from "./components/PageTurnProvider";

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-bodoni",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "The Archisman Daily",
  description: "The personal portfolio of Archisman Kundu",

  metadataBase: new URL(
    "https://thearchismandaily.vercel.app"
  ),

  openGraph: {
    title: "The Archisman Daily",
    description: "The personal portfolio of Archisman Kundu",
    url: "https://thearchismandaily.vercel.app",
    siteName: "The Archisman Daily",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "The Archisman Daily",
      },
    ],

    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "The Archisman Daily",
    description: "The personal portfolio of Archisman Kundu",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bodoni.variable} ${playfair.variable} ${mono.variable}`}
      >
        <PageTurnProvider>
          {children}
        </PageTurnProvider>

        <MusicPlayer />
      </body>
    </html>
  );
}