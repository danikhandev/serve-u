import type { Metadata } from "next";
import { satoshi, timesRoman, unbounded } from "@/app/fonts";
import "@/app/globals.css";
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";
import Providers from "@/contexts/Providers";

export const metadata: Metadata = {
  title: "Worker Dashboard - Serve-U",
  description: "Manage your jobs, profile, and earnings on Serve-U.",
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
            <Sidebar type="worker" />
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