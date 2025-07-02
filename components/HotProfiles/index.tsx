"use client";
import React from "react";
import { FaFire } from "react-icons/fa";
import HotProfilesGallery from "./HotProfilesGallery";
import Image from "next/image";

interface CardGallerySectionProps {
  title: string;
  icon?: React.ReactNode | string;
  GalleryList: React.ComponentType;
}

const CardGallerySection: React.FC<CardGallerySectionProps> = ({
  title,
  icon,
  GalleryList,
}) => {
  const renderIcon = () => {
    if (!icon) return null;
    if (typeof icon === "string") {
      return (
        <Image
          src={icon}
          alt={title + " icon"}
          width={24}
          height={24}
          className="inline-block"
        />
      );
    }
    return icon;
  };

  return (
    <div className="py-2">
      <h2 className="section-header text-2xl font-bold flex items-center flex-row-reverse gap-2 text-right justify-end text-gray-900 dark:text-gray-100">
        {renderIcon()}
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
