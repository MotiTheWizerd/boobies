'use client';

import React from 'react';

// Line Chart Component
export function LineChart() {
  return (
    <div className="aspect-[4/3] relative">
      {/* This would be replaced with a real chart library like recharts, chart.js, etc. */}
      <div className="w-full h-full grid grid-cols-7 grid-rows-4 gap-1">
        {/* Simulated line chart bars in ascending then descending pattern */}
        {[3, 2, 4, 3, 5, 4, 2].map((height, i) => (
          <div 
            key={i} 
            className="relative flex items-end"
          >
            <div 
              className="w-full bg-indigo-500 rounded-t-sm opacity-80" 
              style={{ height: `${height * 20}%` }}
            ></div>
          </div>
        ))}
      </div>
      
      {/* X-axis labels */}
      <div className="grid grid-cols-7 mt-2 text-xs text-gray-400">
        {['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ש'].map((day, i) => (
          <div key={i} className="text-center">{day}</div>
        ))}
      </div>
    </div>
  );
}

// Bar Chart Component
export function BarChart() {
  return (
    <div className="aspect-[4/3] relative">
      {/* This would be replaced with a real chart library */}
      <div className="w-full h-full grid grid-cols-5 gap-3">
        {/* Simulated bar chart with different values */}
        {[
          { label: 'A', value: 65, color: 'bg-indigo-500' },
          { label: 'B', value: 40, color: 'bg-purple-500' },
          { label: 'C', value: 85, color: 'bg-pink-500' },
          { label: 'D', value: 30, color: 'bg-red-500' },
          { label: 'E', value: 50, color: 'bg-orange-500' }
        ].map((bar, i) => (
          <div key={i} className="relative flex flex-col items-center">
            <div 
              className={`w-full ${bar.color} rounded-t-sm`} 
              style={{ height: `${bar.value}%` }}
            ></div>
            <div className="text-xs mt-2 text-gray-400">{bar.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Pie Chart Component
export function PieChart() {
  // We're creating a simple visual representation of a pie chart
  // In a real application, you would use a charting library
  return (
    <div className="aspect-square relative max-w-[200px] mx-auto">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Simulated pie slices */}
        <circle cx="50" cy="50" r="40" fill="none" stroke="#6366f1" strokeWidth="20" strokeDasharray="70 100" strokeDashoffset="25" />
        <circle cx="50" cy="50" r="40" fill="none" stroke="#a855f7" strokeWidth="20" strokeDasharray="15 100" strokeDashoffset="-45" />
        <circle cx="50" cy="50" r="40" fill="none" stroke="#ec4899" strokeWidth="20" strokeDasharray="20 100" strokeDashoffset="-60" />
      </svg>
      
      {/* Simple legend */}
      <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs text-gray-300">
        <div className="flex flex-col items-center">
          <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
          <span className="mt-1">40%</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-3 h-3 rounded-full bg-purple-500"></div>
          <span className="mt-1">15%</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-3 h-3 rounded-full bg-pink-500"></div>
          <span className="mt-1">45%</span>
        </div>
      </div>
    </div>
  );
} 