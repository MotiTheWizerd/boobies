"use client";
import React from "react";
import { FaFire } from "react-icons/fa";
import HotProfilesGallery from "./HotProfilesGallery";

const HotProfiles = () => {
  return (
    <div className="py-2">
      <h2 className="section-header text-2xl font-bold flex items-center flex-row-reverse gap-2 text-right justify-end text-gray-900 dark:text-gray-100">
        <FaFire className="fire-icon text-amber-500" />
        <span>חם בלעדי</span>
      </h2>

      <div className="mt-3">
        <HotProfilesGallery />
      </div>
    </div>
  );
};

export default HotProfiles;
