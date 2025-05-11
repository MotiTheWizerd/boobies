"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FileText,
  MessageSquare,
  Settings,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  BarChart,
} from "lucide-react";

const navItems = [
  { title: "לוח בקרה", href: "/office", icon: LayoutDashboard },
  { title: "לקוחות", href: "/office/clients", icon: Users },
  { title: "קמפיינים", href: "/office/campaigns", icon: BarChart },
  { title: "הודעות", href: "/office/messages", icon: MessageSquare },
  { title: "הגדרות", href: "/office/settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`${
        collapsed ? "w-16" : "w-64"
      } bg-gray-950 border-l border-gray-700 h-screen flex flex-col transition-all duration-300 ease-in-out`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {!collapsed && (
          <Link href="/office" className="flex items-center space-x-2 ml-2">
            <span className="font-bold text-xl text-white">פאבליש בורד</span>
          </Link>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-md hover:bg-gray-800 text-gray-400 hover:text-white"
        >
          {collapsed ? (
            <PanelLeftOpen size={20} />
          ) : (
            <PanelLeftClose size={20} />
          )}
        </button>
      </div>

      <nav className="flex-1 pt-5 px-2">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center ${
                    !collapsed ? "justify-start" : "justify-center"
                  } px-3 py-2.5 rounded-md ${
                    isActive
                      ? "bg-indigo-700 text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  <Icon size={20} className={collapsed ? "me-0" : "me-3"} />
                  {!collapsed && <span>{item.title}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-700">
        <button
          className={`flex items-center ${
            !collapsed ? "justify-start w-full" : "justify-center"
          } px-3 py-2.5 text-red-400 hover:bg-gray-800 hover:text-red-300 rounded-md`}
        >
          <LogOut size={20} className={collapsed ? "me-0" : "me-3"} />
          {!collapsed && <span>התנתק</span>}
        </button>
      </div>
    </aside>
  );
}
