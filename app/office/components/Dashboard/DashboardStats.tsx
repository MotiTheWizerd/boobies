"use client";

import React from "react";
import { Users, FileText, BarChart2, Eye } from "lucide-react";

const statCards = [
  {
    title: "לקוחות פעילים",
    value: "24",
    change: "+4%",
    positive: true,
    icon: Users,
    bgColor: "bg-blue-100 dark:bg-blue-900/50",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    title: "מודעות פעילות",
    value: "103",
    change: "+12%",
    positive: true,
    icon: FileText,
    bgColor: "bg-purple-100 dark:bg-purple-900/50",
    iconColor: "text-purple-600 dark:text-purple-400",
  },
  {
    title: "קמפיינים",
    value: "38",
    change: "+7%",
    positive: true,
    icon: BarChart2,
    bgColor: "bg-green-100 dark:bg-green-900/50",
    iconColor: "text-green-600 dark:text-green-400",
  },
  {
    title: "צפיות החודש",
    value: "14,352",
    change: "-3%",
    positive: false,
    icon: Eye,
    bgColor: "bg-amber-100 dark:bg-amber-900/50",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
];

export default function DashboardStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-850 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
              <p className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">{stat.value}</p>
              <div className="flex items-center mt-2">
                <span
                  className={`text-sm ${
                    stat.positive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {stat.change}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400 mr-1">מהחודש הקודם</span>
              </div>
            </div>
            <div
              className={`p-3 rounded-full ${stat.bgColor} ${stat.iconColor}`}
            >
              <stat.icon size={24} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
