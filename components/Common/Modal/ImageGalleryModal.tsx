"use client";

import React, { useState, useCallback, useEffect } from "react";
import Modal from "./index.tsx";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight, FaExpand, FaCompress } from "react-icons/fa";
import { GalleryErrorBoundary } from "./GalleryErrorBoundary";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn, slideUp } from "@/app/utils/animations";
import { cn } from "@/app/utils/cn";

export interface GalleryItem {
  url: string;
  type: "image" | "video";
  altText?: string;
}

interface ImageGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: GalleryItem[];
  initialIndex?: number;
}

// Validate gallery item
function isValidGalleryItem(item: GalleryItem): boolean {
  return (
    typeof item === 'object' &&
    item !== null &&
    typeof item.url === 'string' &&
    (item.type === 'image' || item.type === 'video') &&
    (item.altText === undefined || typeof item.altText === 'string')
  );
}

export default function ImageGalleryModal({
  isOpen,
  onClose,
  items = [],
  initialIndex = 0,
}: ImageGalleryModalProps) {
  // All hooks need to be called before any conditional returns
  const [currentIndex, setCurrentIndex] = useState(() => {
    // Ensure initialIndex is within bounds
    return Math.min(Math.max(0, initialIndex), Math.max(0, items.length - 1));
  });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right, 0 for initial

  const handleNext = useCallback(() => {
    if (!items.length) return;
    setDirection(1);
    setIsLoading(true);
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const handlePrev = useCallback(() => {
    if (!items.length) return;
    setDirection(-1);
    setIsLoading(true);
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);
  
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          handlePrev();
          break;
        case "ArrowRight":
          handleNext();
          break;
        case "f":
          toggleFullscreen();
          break;
        case "Escape":
          if (isFullscreen) {
            document.exitFullscreen();
            setIsFullscreen(false);
            e.preventDefault(); // Prevent modal from closing
            e.stopPropagation();
          }
          break;
        default:
          break;
      }
    },
    [handleNext, handlePrev, toggleFullscreen, isFullscreen]
  );

  // Reset currentIndex when items change
  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, Math.max(0, items.length - 1)));
  }, [items.length]);
  
  // Reset loading state when current item changes
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [currentIndex]);
  
  // Handle fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // After all hooks, we can have conditional logic
  if (!items.length || !isOpen) {
    return null;
  }

  const currentItem = items[currentIndex];

  // Initialize before returning the UI
  if (!items.length || !isOpen) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      preventClose={false}
      hideCloseButton={false}
    >
      <GalleryErrorBoundary>
        <motion.div
          className={cn(
            "relative h-[80vh] w-full overflow-hidden",
            isFullscreen ? "bg-black" : "bg-gradient-to-b from-gray-900 via-purple-900/40 to-black"
          )}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          {/* Background decorative elements */}
          <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(120,50,255,0.15),transparent_70%)]" />
            <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,rgba(255,70,120,0.15),transparent_70%)]" />
          </div>
        {/* Navigation Buttons */}
        <motion.button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 z-50 -translate-y-1/2 rounded-full bg-black/70 p-3 text-white hover:bg-black/90 shadow-[0_0_15px_rgba(0,0,0,0.5)] border border-white/10"
          aria-label="Previous image"
          whileHover={{ backgroundColor: "rgba(0,0,0,0.8)", boxShadow: "0 0 20px rgba(120,50,255,0.3)" }}
          whileTap={{ scale: 0.9 }}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <FaChevronLeft className="h-6 w-6" />
        </motion.button>
        <motion.button
          onClick={handleNext}
          className="absolute right-4 top-1/2 z-50 -translate-y-1/2 rounded-full bg-black/70 p-3 text-white hover:bg-black/90 shadow-[0_0_15px_rgba(0,0,0,0.5)] border border-white/10"
          aria-label="Next image"
          whileHover={{ backgroundColor: "rgba(0,0,0,0.8)", boxShadow: "0 0 20px rgba(120,50,255,0.3)" }}
          whileTap={{ scale: 0.9 }}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <FaChevronRight className="h-6 w-6" />
        </motion.button>
        
        {/* Fullscreen toggle */}
        <motion.button
          onClick={toggleFullscreen}
          className="absolute right-4 top-4 z-50 rounded-full bg-black/70 p-3 text-white hover:bg-black/90 shadow-[0_0_15px_rgba(0,0,0,0.5)] border border-white/10"
          aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          whileHover={{ backgroundColor: "rgba(0,0,0,0.8)", boxShadow: "0 0 20px rgba(120,50,255,0.3)" }}
          whileTap={{ scale: 0.9 }}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
        >
          {isFullscreen ? <FaCompress className="h-5 w-5" /> : <FaExpand className="h-5 w-5" />}
        </motion.button>

        {/* Profile Info - Positioned at bottom center */}
        <motion.div
          className="absolute bottom-16 left-1/2 z-50"
          style={{
            transform: 'translateX(-50%)',
            width: 'max-content',
            minWidth: '200px',
            direction: 'rtl'
          }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className="bg-black/70 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/10 shadow-[0_0_15px_rgba(0,0,0,0.5)] text-center">
            <motion.h3 
              className="text-lg font-bold text-white mb-1 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
            >
              {currentItem.altText || "Hot Profile"}
            </motion.h3>
            <motion.p 
              className="text-xs text-gray-300 mb-2 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              צפייה בתמונות ובסרטונים של הפרופיל
            </motion.p>
            <motion.a
              href="#"
              className="block w-full px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-md text-xs font-medium shadow-md text-center"
              whileHover={{ 
                boxShadow: "0 0 15px rgba(168, 85, 247, 0.5)",
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              כנס לפרטים מלאים
            </motion.a>
          </div>
        </motion.div>
        
        {/* Media Display */}
        <div className="relative h-full w-full overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            {isValidGalleryItem(currentItem) ? (
              <motion.div
                key={`gallery-item-${currentIndex}`}
                className="h-full w-full"
                initial={{ 
                  opacity: 0,
                  x: direction * 100
                }}
                animate={{ 
                  opacity: 1,
                  x: 0,
                  scale: isLoading ? 0.95 : 1
                }}
                exit={{ 
                  opacity: 0,
                  x: direction * -100
                }}
                transition={{ 
                  type: "spring",
                  stiffness: 300,
                  damping: 30
                }}
              >
                {currentItem.type === "video" ? (
                   <motion.div
                     className="relative h-full w-full flex items-center justify-center"
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     transition={{ delay: 0.2 }}
                   >
                     <video
                       src={currentItem.url}
                       autoPlay
                       loop
                       muted
                       playsInline
                       className="h-full w-full object-contain"
                       onError={(e) => console.error("Video load error:", e)}
                     />
                     {isLoading && (
                       <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
                         <div className="h-12 w-12 rounded-full border-4 border-t-transparent border-purple-500 animate-spin"></div>
                       </div>
                     )}
                   </motion.div>
                ) : (
                  <motion.div
                     className="relative h-full w-full flex items-center justify-center"
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     transition={{ delay: 0.2 }}
                   >
                     <div className="relative w-full h-full">
                       <Image
                         src={currentItem.url}
                         alt={currentItem.altText || ""}
                         fill
                         className="object-contain z-20 relative"
                         quality={100}
                         priority
                         onError={(e) => console.error("Image load error:", e)}
                         onLoad={() => setIsLoading(false)}
                       />
                       
                       {/* Image glow effect */}
                       <div className="absolute inset-0 z-0 opacity-50 blur-xl scale-90 transform-gpu">
                         <Image
                           src={currentItem.url}
                           alt=""
                           fill
                           className="object-contain"
                           quality={10}
                         />
                       </div>
                     </div>
                     
                     {isLoading && (
                       <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm">
                         <div className="h-12 w-12 rounded-full border-4 border-t-transparent border-purple-500 animate-spin"></div>
                       </div>
                     )}
                   </motion.div>
                )}
              </motion.div>
            ) : (
              <motion.div 
                className="flex h-full w-full items-center justify-center text-gray-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <p className="text-xl font-medium">Media not available</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Counter - Positioned at bottom */}
        <motion.div 
          className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/70 backdrop-blur-sm px-4 py-2 text-white font-medium border border-white/10 z-40 shadow-[0_0_15px_rgba(0,0,0,0.5)]"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 300, damping: 20 }}
          whileHover={{ backgroundColor: "rgba(0,0,0,0.8)", boxShadow: "0 0 20px rgba(120,50,255,0.3)" }}
        >
          {currentIndex + 1} / {items.length}
        </motion.div>
        
        {/* Decorative corner elements */}
        <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-white/20 rounded-tl-lg opacity-70"></div>
        <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white/20 rounded-tr-lg opacity-70"></div>
        <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-white/20 rounded-bl-lg opacity-70"></div>
        <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-white/20 rounded-br-lg opacity-70"></div>
      </motion.div>
      </GalleryErrorBoundary>
    </Modal>
  );
}
