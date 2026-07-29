import type { Metadata } from "next";
import { Geist_Mono, Source_Sans_3 } from "next/font/google";

import "./globals.css";
import { cn } from "@/lib/utils";

// Source Sans 3 is the current release of Source Sans Pro and is the required
// DH-branded product typeface. It drives --font-sans, so `font-sans` (applied
// on <html>) makes it the default for the whole app shell.
const sourceSans3 = Source_Sans_3({ subsets: ["latin"], variable: "--font-sans" });

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "DH Tools",
  description: "Internal DH tools: UTM builder, wireframe-to-content, and the memo brander.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("antialiased", sourceSans3.variable, geistMono.variable, "font-sans")}>
      <body>{children}</body>
    </html>
  );
}
