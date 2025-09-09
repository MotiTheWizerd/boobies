"use client";
import React, { useEffect, useState } from "react";
import HotProfileCard from "./HotProfileCard";
import { useHotProfiles, HotProfileProps } from "@/app/hooks/useHotProfiles";
import { useInView } from "react-intersection-observer";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn, slideUp } from "@/app/utils/animations";
import { cn } from "@/app/utils/cn";
// Note: The following import is commented out since we haven't installed the package yet
// import { Virtuoso } from "react-virtuoso";

interface HotProfilesGalleryProps {
  serviceType?: string;
  onMediaClick: (item: { url: string; type: "image" | "video"; altText?: string }, index: number) => void;
}

// Simple loading component
const LoadingComponent = () => (
  <motion.div 
    className="py-4 text-center"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex justify-center">
      <motion.div 
        className="rounded-full bg-purple-500 h-10 w-10 flex items-center justify-center"
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
          borderRadius: ["50%", "30%", "50%"]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <motion.div 
          className="h-6 w-6 rounded-full bg-white/30"
          animate={{ scale: [0.8, 1.1, 0.8] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </motion.div>
    </div>
    <motion.p 
      className="mt-3 text-gray-600 dark:text-gray-400 font-medium"
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    >
      Loading profiles...
    </motion.p>
  </motion.div>
);

// Skeleton card for loading state
const SkeletonCard = () => (
  <motion.div 
    className="relative rounded-xl overflow-hidden shadow-md"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="relative h-72 md:h-80 w-full bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800">
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      />
    </div>
    <div className="p-4 bg-white dark:bg-gray-800">
      <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-full w-3/4 mx-auto">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </div>
  </motion.div>
);

// Initial loading state with multiple skeleton cards
const InitialLoadingState = () => (
  <motion.div 
    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
    initial="initial"
    animate="animate"
    variants={{
      animate: {
        transition: {
          staggerChildren: 0.1
        }
      }
    }}
  >
    {Array(10)
      .fill(0)
      .map((_, index) => (
        <motion.div 
          key={index}
          variants={{
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.4 }}
        >
          <SkeletonCard />
        </motion.div>
      ))}
  </motion.div>
);

// Error component
const ErrorComponent = ({ message }: { message: string }) => (
  <motion.div 
    className="py-8 text-center"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
  >
    <motion.div 
      className="mx-auto w-16 h-16 mb-4 rounded-full bg-red-100 flex items-center justify-center"
      animate={{ rotate: [0, 10, -10, 0] }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </motion.div>
    <motion.p 
      className="text-red-500 text-lg font-medium mb-3"
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      {message}
    </motion.p>
    <motion.button 
      className="mt-2 px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-300"
      whileHover={{ scale: 1.05, backgroundColor: "#f59e0b" }}
      whileTap={{ scale: 0.95 }}
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4 }}
    >
      Try Again
    </motion.button>
  </motion.div>
);

// Main component that integrates with page scrolling
const MainPageScrollGallery = ({
  data,
  loadMore,
  hasMore,
  loading,
  onMediaClick,
}: {
  data: HotProfileProps[];
  loadMore: () => void;
  hasMore: boolean;
  loading: boolean;
  onMediaClick: (item: { url: string; type: "image" | "video"; altText?: string }, index: number) => void;
}) => {
  // Track which profiles are new to animate them
  const [visibleIds, setVisibleIds] = useState<string[]>([]);
  const [animatedIds, setAnimatedIds] = useState<string[]>([]);
  const [lastDataLength, setLastDataLength] = useState(0);

  // Use the intersection observer hook for infinite scrolling
  const { ref: endOfListRef, inView } = useInView({
    threshold: 0,
    rootMargin: "400px",
  });

  // Setup a scroll listener on the window instead of a container
  useEffect(() => {
    const handleScroll = () => {
      // If we're near the bottom of the page and not currently loading, load more
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 1500 &&
        hasMore &&
        !loading
      ) {
        loadMore();
      }
    };

    // Add the event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading, loadMore]);

  // Effect to track which profile IDs are currently visible/loaded
  useEffect(() => {
    // Only run animation logic if we have new data
    if (data.length > lastDataLength) {
      // Get only the newly loaded profiles
      const newProfiles = data.slice(lastDataLength);
      const newIds = newProfiles.map((profile) => profile.id);

      // Update visible IDs immediately
      setVisibleIds((prev) => [...prev, ...newIds]);

      // Set a delay to add these IDs to the animated list
      // This creates a staggered animation effect
      newIds.forEach((id, index) => {
        setTimeout(() => {
          setAnimatedIds((prev) => [...prev, id]);
        }, 150 * (index % 5)); // Stagger with a more noticeable delay
      });

      // Update the last data length
      setLastDataLength(data.length);
    }
  }, [data, lastDataLength]);

  // Effect to handle loading more data when intersection observer detects the end
  useEffect(() => {
    if (inView && hasMore && !loading) {
      loadMore();
    }
  }, [inView, hasMore, loading, loadMore]);

  return (
    <div>
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pb-8"
        initial="initial"
        animate="animate"
        variants={{
          animate: {
            transition: {
              staggerChildren: 0.05
            }
          }
        }}
      >
        {data.map((profile, index) => {
          // Check if this profile should be animated
          const isNewlyLoaded =
            visibleIds.includes(profile.id) &&
            !animatedIds.includes(profile.id);

          // Determine if this is a priority image (in initial visible batch)
          const isPriority = index < 10; // First 10 images load eagerly

          return (
            <motion.div
              key={`profile-${profile.id}-${index}`}
              variants={{
                initial: { opacity: 0, y: 30 },
                animate: { opacity: 1, y: 0 }
              }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 24,
                delay: Math.min(index * 0.05, 1) // Cap the delay at 1 second
              }}
              className={cn(
                "transform transition-all duration-500",
                isNewlyLoaded ? "opacity-0 translate-y-16 scale-95" : ""
              )}
            >
              <HotProfileCard
                id={profile.id}
                name={profile.name}
                imageUrl={profile.imageUrl}
                isHappyHour={profile.isHappyHour}
                isHot={profile.isHot}
                isPremium={profile.isPremium}
                likesCount={profile.likesCount}
                viewsCount={profile.viewsCount}
                priority={isPriority}
                media={profile.media}
                onMediaClick={(mediaIndex) => {
                  const item = profile.media?.[mediaIndex] ?? { url: profile.imageUrl, fileType: "image/jpeg" };
                  onMediaClick({
                    url: item.url,
                    type: item.fileType?.startsWith("video/") ? "video" : "image",
                    altText: profile.name
                  }, index);
                }}
              />
            </motion.div>
          );
        })}
      </motion.div>

      <AnimatePresence mode="wait">
        {loading && (
          <motion.div 
            key="loading"
            className="py-4 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <LoadingComponent />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!hasMore && !loading && data.length > 0 && (
          <motion.div 
            className="py-6 text-center text-gray-600 dark:text-gray-400 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 300,
              damping: 25
            }}
          >
            <motion.div
              className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 px-6 py-3 rounded-full shadow-sm"
              whileHover={{ boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
              transition={{ duration: 0.2 }}
            >
              <motion.span 
                className="text-green-600 dark:text-green-400 text-lg"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: 2, repeatType: "reverse" }}
              >
                ✅
              </motion.span>
              <p className="font-medium">כל הפרופילים נטענו</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Invisible element at the end of the list that triggers loading more */}
      <div
        ref={endOfListRef}
        className="h-10 w-full opacity-0"
        aria-hidden="true"
      />
    </div>
  );
};

const HotProfilesGallery: React.FC<HotProfilesGalleryProps> = ({ serviceType, onMediaClick }) => {
  // Get the profiles using the hook
  const {
    profiles,
    loading,
    error,
    loadMore,
    hasMore,
  } = useHotProfiles(serviceType);

  if (error) {
    return <ErrorComponent message={error} />;
  }

  if (profiles.length === 0 && loading) {
    return <InitialLoadingState />;
  }

  // Convert profiles to gallery items
  const galleryItems = profiles.map((profile) => ({
    url: profile.imageUrl,
    type: "image" as const,
    altText: profile.name,
  }));

  // Return the main page scroll gallery
  return (
    <MainPageScrollGallery
      data={profiles}
      loadMore={loadMore}
      hasMore={hasMore}
      loading={loading}
      onMediaClick={onMediaClick}
    />
  );

  /* React Virtuoso implementation - uncomment once package is installed and adjust for main page scrolling
  return (
    <Virtuoso
      useWindowScroll
      totalCount={profiles.length}
      data={profiles}
      endReached={loadProfiles}
      overscan={1000}
      components={{
        Footer: () => (
          <>
            {loading && <LoadingComponent />}
            {!hasMore && !loading && profiles.length > 0 && (
              <div className="py-4 text-center text-gray-600 dark:text-gray-400 mb-4">
                <p>✅ כל הפרופילים נטענו</p>
              </div>
            )}
          </>
        ),
      }}
      itemContent={(index, profile) => (
        <div className="p-3" key={`virtuoso-profile-${profile.id}-${index}`}>
          <HotProfileCard
            id={profile.id}
            name={profile.name}
            imageUrl={profile.imageUrl}
            isHappyHour={profile.isHappyHour}
            isHot={profile.isHot}
            isPremium={profile.isPremium}
            likesCount={profile.likesCount}
            viewsCount={profile.viewsCount}
          />
        </div>
      )}
    />
  );
  */
};

export default HotProfilesGallery;
