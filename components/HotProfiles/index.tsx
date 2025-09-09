"use client";

import React, { useState, useEffect } from "react";
import { FaFire } from "react-icons/fa";
import HotProfilesGallery from "./HotProfilesGallery";
import Image from "next/image";
import { useHotProfiles } from "@/app/hooks/useHotProfiles";
import type { HotProfileProps } from "./HotProfileCard";
import ImageGalleryModal, { GalleryItem } from "../Common/Modal/ImageGalleryModal";
import { getGalleryItems } from "@/app/utils/gallery";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn, slideUp } from "@/app/utils/animations";
import { cn } from "@/app/utils/cn";

interface CardGallerySectionProps {
  title: string;
  icon?: React.ReactNode | string;
  GalleryList: React.ComponentType<{ onMediaClick: (item: { url: string; type: "image" | "video"; altText?: string }, index: number) => void; profiles?: HotProfileProps[] }>;
  onMediaClick: (item: { url: string; type: "image" | "video"; altText?: string }, index: number) => void;
  profiles?: HotProfileProps[];
  className?: string;
}

const CardGallerySection: React.FC<CardGallerySectionProps> = ({
  title,
  icon,
  GalleryList,
  onMediaClick,
  profiles,
  className,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Delay visibility to trigger animation after component mounts
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

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
    <motion.div 
      className={cn("py-4 relative overflow-hidden", className)}
      initial="hidden"
      animate="visible"
      variants={slideUp}
    >
      <motion.div 
        className="absolute -z-10 top-0 left-0 w-full h-full bg-gradient-to-r from-amber-50/30 to-transparent dark:from-amber-900/10 dark:to-transparent rounded-xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
      <motion.h2 
        className="section-header text-2xl font-bold flex items-center flex-row-reverse gap-2 text-right justify-end text-gray-900 dark:text-gray-100 mb-4"
        variants={fadeIn}
      >
        <motion.span 
          whileHover={{ scale: 1.05 }} 
          className="flex items-center gap-2"
        >
          {renderIcon()}
          <span>{title}</span>
        </motion.span>
      </motion.h2>
      <motion.div 
        className="mt-3"
        variants={fadeIn}
        transition={{ delay: 0.2 }}
      >
        <GalleryList onMediaClick={onMediaClick} profiles={profiles} />
      </motion.div>
    </motion.div>
  );
};

const HotProfiles = () => {
  const { profiles } = useHotProfiles();
  const [selectedProfileIndex, setSelectedProfileIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading state for smoother animations
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const selectedProfile = profiles[selectedProfileIndex];
  const { items: galleryItems, defaultIndex } = selectedProfile ? getGalleryItems(selectedProfile) : { items: [], defaultIndex: 0 };

  const handleMediaClick = (_item: GalleryItem, profileIndex: number) => {
    setSelectedProfileIndex(profileIndex);
    
    const profile = profiles[profileIndex];
    if (!profile) return;

    const { defaultIndex } = getGalleryItems(profile);
    // Always start with the default image when opening the gallery
    setSelectedIndex(defaultIndex);
    setIsGalleryOpen(true);
  };

  return (
    <motion.div 
      className="relative py-4 px-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="absolute -z-10 inset-0 bg-gradient-to-b from-amber-50/10 to-transparent dark:from-amber-900/5 dark:to-transparent rounded-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      />
      
      <AnimatePresence mode="wait">
        <motion.div
          key="gallery-section"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={fadeIn}
        >
          <CardGallerySection
            title="חם בלעדי"
            icon={
              <motion.div
                whileHover={{ rotate: 15, scale: 1.2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <FaFire className="fire-icon text-amber-500" />
              </motion.div>
            }
            GalleryList={HotProfilesGallery}
            onMediaClick={handleMediaClick}
            profiles={profiles}
            className="backdrop-blur-sm bg-white/30 dark:bg-gray-900/30 rounded-xl p-4 shadow-lg"
          />
        </motion.div>
      </AnimatePresence>
      
      <AnimatePresence>
        {isGalleryOpen && (
          <ImageGalleryModal
            isOpen={isGalleryOpen}
            onClose={() => setIsGalleryOpen(false)}
            items={galleryItems}
            initialIndex={selectedIndex}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default HotProfiles;
export { CardGallerySection };
