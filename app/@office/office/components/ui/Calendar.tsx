"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type CalendarProps = {
  mode?: "single" | "range" | "multiple";
  className?: string;
  selectedDate?: Date;
  onSelect?: (date: Date) => void;
};

export function Calendar({
  mode = "single",
  className = "",
  selectedDate: initialDate,
  onSelect,
}: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(initialDate || new Date());
  const [viewDate, setViewDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    initialDate || null
  );

  const hebrewDays = ["א", "ב", "ג", "ד", "ה", "ו", "ש"];
  const hebrewMonths = [
    "ינואר",
    "פברואר",
    "מרץ",
    "אפריל",
    "מאי",
    "יוני",
    "יולי",
    "אוגוסט",
    "ספטמבר",
    "אוקטובר",
    "נובמבר",
    "דצמבר",
  ];

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const handlePrevMonth = () => {
    setViewDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };

  const handleNextMonth = () => {
    setViewDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };

  const handleDateSelect = (day: number) => {
    const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    setSelectedDate(newDate);
    if (onSelect) {
      onSelect(newDate);
    }
  };

  const renderCalendarDays = () => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();

    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);

    const days = [];

    // Add empty cells for days before the first day of month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-10 w-10"></div>);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected =
        selectedDate &&
        selectedDate.getDate() === day &&
        selectedDate.getMonth() === month &&
        selectedDate.getFullYear() === year;

      const isToday =
        new Date().getDate() === day &&
        new Date().getMonth() === month &&
        new Date().getFullYear() === year;

      days.push(
        <button
          key={day}
          onClick={() => handleDateSelect(day)}
          className={`h-10 w-10 rounded-full flex items-center justify-center text-sm ${
            isSelected
              ? "bg-indigo-600 text-white"
              : isToday
              ? "bg-indigo-900/30 text-indigo-300"
              : "hover:bg-gray-700 text-gray-300"
          }`}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  return (
    <div className={`p-3 bg-gray-850 rounded-md text-gray-200 ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handlePrevMonth}
          className="p-2 hover:bg-gray-700 rounded-full transition-colors text-gray-400 hover:text-white"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
        <div className="font-medium text-gray-100">
          {hebrewMonths[viewDate.getMonth()]} {viewDate.getFullYear()}
        </div>
        <button
          onClick={handleNextMonth}
          className="p-2 hover:bg-gray-700 rounded-full transition-colors text-gray-400 hover:text-white"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {hebrewDays.map((day, i) => (
          <div
            key={i}
            className="h-10 w-10 flex items-center justify-center text-xs text-gray-400"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">{renderCalendarDays()}</div>
    </div>
  );
}
