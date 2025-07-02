"use client";

import React from "react";
import { Bell, Search, User } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle/ThemeToggle";

export default function AdminHeader() {
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 h-16 flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center w-full max-w-md">
        <div className="relative w-full">
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <Search className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </div>
          <input
            type="search"
            className="block w-full py-2 pr-10 pl-4 text-sm text-gray-800 dark:text-gray-100 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-500 dark:placeholder-gray-400"
            placeholder="חיפוש..."
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <ThemeToggle className="ml-2" />
        
        <button className="relative p-2 text-gray-600 dark:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
          <Bell className="h-6 w-6" />
          <span className="absolute top-1 left-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-[10px] text-white">
            3
          </span>
        </button>

        <div className="flex items-center space-x-3">
          <div className="flex flex-col items-end">
            <span className="text-sm font-medium text-gray-800 dark:text-gray-100">
              מנהל המערכת
            </span>
            <span className="text-xs text-gray-600 dark:text-gray-400">admin@example.com</span>
          </div>
          <div className="h-9 w-9 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-200">
            <User className="h-5 w-5" />
          </div>
        </div>
      </div>
    </header>
  );
}
