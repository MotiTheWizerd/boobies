import type { Metadata } from "next";
import { Geist, Geist_Mono, Open_Sans } from "next/font/google";
import "@/app/globals.css";
import "@/app/output.css";
import { ThemeProvider } from "@/components/ThemeToggle/ThemeProvider";
import { CustomToaster } from "@/components/CustomToaster";
import AdminHeader from "@/app/office/components/Header/AdminHeader";
import AdminSidebar from "@/app/office/components/Sidebar/AdminSidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin", "hebrew"],
});

export const metadata: Metadata = {
  title: "bOObies.co.il - משרד",
  description: "אזור ניהול למשרד באתר bOObies.co.il",
};

export default function OfficeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!children) {
    return null;
  }

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} ${openSans.variable} antialiased rtl-fix`}
      dir="rtl"
    >
      <ThemeProvider>
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <AdminHeader />
          <CustomToaster />
          <div className="flex w-full">
            <AdminSidebar />
            <div className="flex-1 p-6">{children}</div>
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
}
