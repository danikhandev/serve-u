import type { Metadata } from "next";
import { satoshi, timesRoman, unbounded } from "../fonts";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "@/contexts/Providers";

export const metadata: Metadata = {
  title: "Serve-U - Home Services Marketplace",
  description: "Connect with verified professionals for plumbing, electrical, cleaning, and more. Fast, secure, and reliable home services.",
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
        <Providers>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
