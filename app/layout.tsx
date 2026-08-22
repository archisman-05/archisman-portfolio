import type { Metadata } from "next";
import {
  Bodoni_Moda,
  Playfair_Display,
  IBM_Plex_Mono,
} from "next/font/google";
import "./globals.css";

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
        {children}
      </body>
    </html>
  );
}