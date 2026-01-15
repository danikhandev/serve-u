import type { Metadata } from "next";
import { satoshi, timesRoman, unbounded } from "@/app/fonts";
import "@/app/globals.css";
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";
import Providers from "@/contexts/Providers";

export const metadata: Metadata = {
  title: "SuperAdmin - serve-u",
  description: "SuperAdmin Dashboard for serve-u",
};

export default function RootLayout({
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
          <div className="flex min-h-screen">
            <Sidebar type="admin" />
            <div className="flex-1 flex flex-col min-h-screen">
              <main className="flex-1 bg-gradient-to-br from-primary/5 to-secondary/5">
                <div className="p-4lg:p-8">{children}</div>
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
