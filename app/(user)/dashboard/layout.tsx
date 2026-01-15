import type { Metadata } from "next";
import { satoshi, timesRoman, unbounded } from "@/app/fonts";
import "@/app/globals.css";
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";
import Providers from "@/contexts/Providers";

export const metadata: Metadata = {
  title: "serve-u",
  description: "Dashboard for serve-u",
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
            <Sidebar type="consumer" />
            <div className="flex-1 flex flex-col min-h-screen">
              <DashboardHeader />
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
