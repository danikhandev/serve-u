import type { Metadata } from "next";
import { satoshi, timesRoman, unbounded } from "../fonts";
import "../globals.css";
import Providers from "@/contexts/Providers";

export const metadata: Metadata = {
  title: "Serve U- Auth - Secure Mental serve-u",
  description:
    "Transforming mental healthcare through secure, accessible, and compassionate Serve U technology. Connect with mental professionals seamlessly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${satoshi.variable} ${timesRoman.variable} ${unbounded.variable} ${satoshi.className} font-sans antialiased text-text bg-background text-base`}
      >
        <main className="min-h-screen">
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}
