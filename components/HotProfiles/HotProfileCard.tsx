import React, { useState, useRef, useEffect } from "react";
import PlaceholderImage from "../Common/PlaceholderImage";
import { FaFire, FaHeart, FaEye, FaCrown } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { HotProfileProps as BaseHotProfileProps } from "@/app/hooks/useHotProfiles";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn, slideUp } from "@/app/utils/animations";
import { cn } from "@/app/utils/cn";

// Extend the base interface to include the priority prop for rendering
export interface HotProfileProps extends BaseHotProfileProps {
  priority?: boolean;
  onMediaClick?: (index: number) => void;
}

// Media item interface for handling different types of media
interface MediaItem {
  url: string;
  fileType: string;
  fileName: string;
  isDefault?: boolean;
}

const HotProfileCard = ({
  name,
  imageUrl,
  isHappyHour,
  isHot,
  isPremium,
  likesCount,
  viewsCount,
  priority = false,
  media,
  onMediaClick,
}: HotProfileProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [shouldPlayVideo, setShouldPlayVideo] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  
  // Initialize media items from props
  useEffect(() => {
    if (media && media.length > 0) {
      // Find default image first
      const defaultIndex = media.findIndex(item => item.isDefault);
      const initialIndex = defaultIndex !== -1 ? defaultIndex : 0;
      setCurrentIndex(initialIndex);
      
      // Set media items
      const items = media.map(item => ({
        url: item.url,
        fileType: item.fileType || 'image/jpeg',
        fileName: item.fileName,
        isDefault: item.isDefault
      }));
      setMediaItems(items);
      
      // Set initial video playback state
      setShouldPlayVideo(items[initialIndex]?.fileType.startsWith('video/'));
    } else if (imageUrl) {
      setMediaItems([{
        url: imageUrl,
        fileType: 'image/jpeg',
        fileName: 'default.jpg',
        isDefault: true
      }]);
      setCurrentIndex(0);
      setShouldPlayVideo(false);
    }
    
    // Delay visibility to trigger animations
    const visibilityTimer = setTimeout(() => setIsVisible(true), 150);
    const loadedTimer = setTimeout(() => setIsLoaded(true), 300);
    
    return () => {
      clearTimeout(visibilityTimer);
      clearTimeout(loadedTimer);
    };
  }, [media, imageUrl]);

  // Handle video playback when current item changes or hover state changes
  useEffect(() => {
    const isVideo = mediaItems[currentIndex]?.fileType.startsWith('video/');
    setShouldPlayVideo(isVideo && (isHovering || mediaItems[currentIndex]?.isDefault || false));
  }, [currentIndex, isHovering, mediaItems]);

  // Handle navigation between media items
  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (mediaItems.length <= 1) return;
    setCurrentIndex(prev => (prev === 0 ? mediaItems.length - 1 : prev - 1));
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (mediaItems.length <= 1) return;
    setCurrentIndex(prev => (prev === mediaItems.length - 1 ? 0 : prev + 1));
  };

  // Check if current item is video
  const isCurrentVideo = mediaItems[currentIndex]?.fileType.startsWith('video/');

  return (
    <motion.div 
      className={cn(
        "relative group bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700 w-full",
        "transition-all duration-500",
        isLoaded ? "shadow-lg" : "shadow-sm",
        isVisible ? "opacity-100" : "opacity-0",
      )}
      initial={{ y: 20, opacity: 0 }}
      animate={{ 
        y: 0, 
        opacity: 1,
        boxShadow: isHovering ? "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
      }}
      whileHover={{ }}
      transition={{ type: 'spring', stiffness: 300, damping: 15 }} 
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <motion.div 
        className="relative h-96 md:h-[32rem] w-full overflow-hidden"
        onClick={(e) => {
          // Don't trigger if clicking navigation buttons
          if (e.target instanceof Element && e.target.closest('button')) return;
          onMediaClick?.(currentIndex);
        }}
        style={{ cursor: 'pointer' }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Show navigation controls if we have multiple media items */}
        {mediaItems.length > 1 && (
          <>
            <motion.button 
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              aria-label="Previous image"
              whileHover={{ scale: 1.2, backgroundColor: "rgba(0,0,0,0.7)" }}
              whileTap={{ scale: 0.9 }}
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: isHovering ? 1 : 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <FaChevronLeft size={16} />
            </motion.button>
            <motion.button 
              onClick={goToNext}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              aria-label="Next image"
              whileHover={{ scale: 1.2, backgroundColor: "rgba(0,0,0,0.7)" }}
              whileTap={{ scale: 0.9 }}
              initial={{ x: 10, opacity: 0 }}
              animate={{ x: 0, opacity: isHovering ? 1 : 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <FaChevronRight size={16} />
            </motion.button>
            
            {/* Media counter indicator */}
            <motion.div 
              className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-20 bg-black/60 text-white text-sm px-3 py-1.5 rounded-full font-medium backdrop-blur-sm"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: isHovering ? 1 : 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 17, delay: 0.1 }}
            >
              {currentIndex + 1}/{mediaItems.length}
            </motion.div>
          </>
        )}
        
        {/* Display media based on type */}
        <AnimatePresence mode="wait">
          {mediaItems.length > 0 && (
            <motion.div
              key={`media-${currentIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full"
            >
              {isCurrentVideo ? (
                // Video display
                <motion.video
                  ref={videoRef}
                  src={mediaItems[currentIndex].url}
                  autoPlay={shouldPlayVideo}
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ scale: 1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.7 }}
                  onError={(e) => console.error("Video load error:", e)}
                />
              ) : (
                // Image display
                <motion.div className="w-full h-full">
                  <PlaceholderImage
                    src={mediaItems[currentIndex].url}
                    alt={name}
                    fill
                    loading={priority ? "eager" : "lazy"}
                    priority={priority}
                    className="transition-all duration-700"
                    style={{ 
                      objectFit: "cover",
                      transform: "scale(1)"
                    }}
                    backgroundColor="#8a2be2"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                  />
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" 
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovering ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-2 z-20">
          <AnimatePresence>
            {isHappyHour && (
              <motion.span 
                className="bg-gradient-to-r from-yellow-500 to-amber-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg flex items-center"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                whileHover={{ x: 3 }}
              >
                HAPPY HOUR
              </motion.span>
            )}
          </AnimatePresence>
          
          <AnimatePresence>
            {isPremium && (
              <motion.span 
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg flex items-center space-x-1"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                whileHover={{ x: 3 }}
              >
                <motion.div
                  animate={{ rotate: [0, 15, 0] }}
                  transition={{ repeat: Infinity, repeatDelay: 2, duration: 0.5 }}
                >
                  <FaCrown className="text-amber-300 mr-1" size={12} />
                </motion.div>
                <span>PREMIUM</span>
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {isHot && (
            <motion.div 
              className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center z-20"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              whileHover={{ x: -3 }}
            >
              <motion.div
                animate={{ 
                  rotate: [0, 5, -5, 5, 0],
                  scale: [1, 1.2, 1, 1.1, 1]
                }}
                transition={{ 
                  repeat: Infinity, 
                  repeatDelay: 3,
                  duration: 0.5 
                }}
                className="mr-1"
              >
                <FaFire className="text-yellow-300" />
              </motion.div>
              HOT
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats overlay */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent z-10"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <div className="flex justify-between items-center">
            <motion.div 
              className="flex items-center space-x-1.5 bg-white/10 backdrop-blur-sm px-2.5 py-1 rounded-full"
              whileHover={{ backgroundColor: "rgba(255,255,255,0.15)" }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <motion.div
                animate={{ scale: isHovering ? [1, 1.3, 1] : 1 }}
                transition={{ duration: 0.6, repeat: isHovering ? Infinity : 0, repeatDelay: 2 }}
              >
                <FaHeart className="text-pink-400" size={14} />
              </motion.div>
              <span className="text-white text-sm font-medium">{likesCount}</span>
            </motion.div>
            
            <motion.div 
              className="flex items-center space-x-1.5 bg-white/10 backdrop-blur-sm px-2.5 py-1 rounded-full"
              whileHover={{ backgroundColor: "rgba(255,255,255,0.15)" }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <motion.div
                animate={{ opacity: isHovering ? [1, 0.7, 1] : 1 }}
                transition={{ duration: 0.6, repeat: isHovering ? Infinity : 0, repeatDelay: 1.5 }}
              >
                <FaEye className="text-blue-300" size={14} />
              </motion.div>
              <span className="text-white text-sm font-medium">{viewsCount}</span>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div 
        className="p-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        <motion.h3 
          className="text-gray-900 dark:text-white font-bold text-center text-xl transition-colors duration-300"
          animate={{ color: isHovering ? "#9333ea" : "#111827" }}
          transition={{ duration: 0.3 }}

        >
          {name}
        </motion.h3>
      </motion.div>
    </motion.div>
  );
};

export default HotProfileCard;
