import type { Metadata } from "next";
import { satoshi, timesRoman, unbounded } from "@/app/fonts";
import "@/app/globals.css";
import Providers from "@/contexts/Providers";

export const metadata: Metadata = {
  title: "Worker - Serve-U",
  description: "Worker section of Serve-U.",
};

export default function WorkerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${satoshi.variable} ${timesRoman.variable} ${unbounded.variable} font-sans antialiased text-text bg-background text-base`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
