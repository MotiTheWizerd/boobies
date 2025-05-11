import React from "react";
import { Metadata } from "next";
import AdminSidebar from "./components/Sidebar/AdminSidebar";
import AdminHeader from "./components/Header/AdminHeader";

export const metadata: Metadata = {
  title: "פאבליש בורד - ממשק ניהול",
  description: "ממשק ניהול למנהלי המערכת",
  robots: "noindex, nofollow", // Ensure admin pages aren't indexed for SEO
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-800">{children}</main>
      </div>
    </div>
  );
}
