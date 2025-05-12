"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/Card";
import { BarChart, LineChart, PieChart } from "./components/Dashboard/Charts";
import { Calendar } from "./components/ui/Calendar";
import DashboardStats from "./components/Dashboard/DashboardStats";

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-white">לוח בקרה</h1>

      <DashboardStats />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>סטטיסטיקת צפיות</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>קמפיינים פעילים</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>התפלגות לקוחות</CardTitle>
          </CardHeader>
          <CardContent>
            <PieChart />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>לוח שנה</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar mode="single" className="rounded-md border border-gray-700 text-gray-100" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>משימות אחרונות</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {[1, 2, 3, 4, 5].map((item) => (
                <li key={item} className="p-3 bg-gray-800 rounded-md shadow-sm border border-gray-700">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-100">משימה {item}</span>
                    <span className="text-sm text-gray-400">
                      לפני {item} ימים
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">
                    תיאור קצר למשימה שצריך לבצע במערכת.
                  </p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
