"use client";
import React from "react";
import { FaFire } from "react-icons/fa";
import HotProfilesGallery from "./HotProfilesGallery";

interface CardGallerySectionProps {
  title: string;
  icon?: React.ReactNode;
  GalleryList: React.ComponentType;
}

const CardGallerySection: React.FC<CardGallerySectionProps> = ({
  title,
  icon,
  GalleryList,
}) => {
  return (
    <div className="py-2">
      <h2 className="section-header text-2xl font-bold flex items-center flex-row-reverse gap-2 text-right justify-end text-gray-900 dark:text-gray-100">
        {icon}
        <span>{title}</span>
      </h2>
      <div className="mt-3">
        <GalleryList />
      </div>
    </div>
  );
};

const HotProfiles = () => {
  return (
    <CardGallerySection
      title="חם בלעדי"
      icon={<FaFire className="fire-icon text-amber-500" />}
      GalleryList={HotProfilesGallery}
    />
  );
};

export default HotProfiles;
export { CardGallerySection };
