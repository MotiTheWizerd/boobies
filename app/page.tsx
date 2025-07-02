"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import SecondaryMenu from "@/components/MainMenu/SecondaryMenu";
import HotProfiles from "@/components/HotProfiles";
import FeaturedProfiles from "@/components/FeaturedProfiles";
import AreaSelector from "@/components/Areas/AreaSelector";
import { pageTransition } from "@/app/utils/animations";

export default function Home() {
  const [selectedAreaId, setSelectedAreaId] = useState<string | number | null>(null);

  const handleAreaChange = (areaId: string | number | null) => {
    console.log('Area changed to:', areaId);
    setSelectedAreaId(areaId);
    // TODO: Filter content based on selected area
  };

  return (
    <motion.div
      initial="initial"
      animate="enter"
      exit="exit"
      variants={pageTransition}
      dir="rtl"
      className="min-h-screen w-full bg-white dark:bg-gray-900 text-[var(--foreground)]"
      style={{
        direction: "rtl",
      }}
    >
      <motion.div
        className="container mx-auto px-4 -mt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        dir="rtl"
      >
        {/* Area Selector Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-6"
        >
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  בחר אזור
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  סנן תוצאות לפי אזור גיאוגרפי
                </p>
              </div>
              <div className="w-full sm:w-80">
                <AreaSelector
                  selectedAreaId={selectedAreaId}
                  onChange={handleAreaChange}
                  placeholder="כל האזורים"
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          dir="rtl"
          className="space-y-2"
        >
          <FeaturedProfiles />
          <HotProfiles />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
