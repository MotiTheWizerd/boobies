import React, { useState, useRef, useEffect } from "react";
import PlaceholderImage from "../Common/PlaceholderImage";
import { FaFire, FaHeart, FaEye, FaCrown } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { HotProfileProps as BaseHotProfileProps } from "@/app/hooks/useHotProfiles";
import Image from "next/image";
import { motion } from "framer-motion";

// Extend the base interface to include the priority prop for rendering
export interface HotProfileProps extends BaseHotProfileProps {
  priority?: boolean;
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
}: HotProfileProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);

  // Initialize media items from props
  useEffect(() => {
    // If we have media array, use it
    if (media && media.length > 0) {
      setMediaItems(media);
    }
    // Otherwise create a single item from imageUrl
    else if (imageUrl) {
      setMediaItems([{
        url: imageUrl,
        fileType: 'image/jpeg', // Assume image
        fileName: 'default.jpg'
      }]);
    }
  }, [media, imageUrl]);

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
      className="relative group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700"
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300 }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="relative h-72 md:h-80 w-full">
        {/* Show navigation controls if we have multiple media items */}
        {mediaItems.length > 1 && (
          <>
            <button 
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              aria-label="Previous image"
            >
              <FaChevronLeft size={16} />
            </button>
            <button 
              onClick={goToNext}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              aria-label="Next image"
            >
              <FaChevronRight size={16} />
            </button>
            
            {/* Media counter indicator */}
            <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20 bg-black/50 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {currentIndex + 1}/{mediaItems.length}
            </div>
          </>
        )}
        
        {/* Display media based on type */}
        {mediaItems.length > 0 && (
          isCurrentVideo ? (
            // Video display
            <video
              ref={videoRef}
              src={mediaItems[currentIndex].url}
              autoPlay={isHovering}
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={(e) => console.error("Video load error:", e)}
            />
          ) : (
            // Image display
            <PlaceholderImage
              src={mediaItems[currentIndex].url}
              alt={name}
              fill
              loading={priority ? "eager" : "lazy"}
              priority={priority}
              className="group-hover:scale-105 transition-transform duration-500"
              style={{ objectFit: "cover" }}
              backgroundColor="#8a2be2"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
            />
          )
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-2">
          {isHappyHour && (
            <span className="bg-gradient-to-r from-yellow-500 to-amber-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg transform -translate-x-1 group-hover:translate-x-0 transition-transform duration-300">
              HAPPY HOUR
            </span>
          )}
          
          {isPremium && (
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg flex items-center space-x-1 transform -translate-x-1 group-hover:translate-x-0 transition-transform duration-300 delay-100">
              <FaCrown className="text-amber-300" size={12} />
              <span>PREMIUM</span>
            </span>
          )}
        </div>

        {isHot && (
          <div className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg transform translate-x-1 group-hover:translate-x-0 transition-transform duration-300">
            <FaFire className="inline-block mr-1" />
            HOT
          </div>
        )}

        {/* Stats overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-1.5 bg-white/10 backdrop-blur-sm px-2.5 py-1 rounded-full">
              <FaHeart className="text-pink-400" size={14} />
              <span className="text-white text-sm font-medium">{likesCount}</span>
            </div>
            
            <div className="flex items-center space-x-1.5 bg-white/10 backdrop-blur-sm px-2.5 py-1 rounded-full">
              <FaEye className="text-blue-300" size={14} />
              <span className="text-white text-sm font-medium">{viewsCount}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-3">
        <h3 className="text-gray-900 dark:text-white font-semibold text-center text-lg group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
          {name}
        </h3>
      </div>
    </motion.div>
  );
};

export default HotProfileCard;
