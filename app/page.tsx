"use client";
import React from "react";
import { motion } from "framer-motion";
import SecondaryMenu from "@/components/MainMenu/SecondaryMenu";
import HotProfiles from "@/components/HotProfiles";
import FeaturedProfiles from "@/components/FeaturedProfiles";
import { pageTransition } from "@/app/utils/animations";

export default function Home() {
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
