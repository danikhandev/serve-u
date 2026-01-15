import type { Metadata } from "next";
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";

export const metadata: Metadata = {
  title: "Worker Dashboard - Serve-U",
  description: "Manage your jobs, profile, and earnings on Serve-U.",
};

export default function WorkerDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen">
      <Sidebar type="worker" />
      <div className="flex-1 flex flex-col min-h-screen">
        <DashboardHeader />
        {children}
      </div>
    </div>
  );
}