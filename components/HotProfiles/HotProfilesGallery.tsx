"use client";
import React, { useEffect, useState } from "react";
import HotProfileCard from "./HotProfileCard";
import { useHotProfiles, HotProfileProps } from "@/app/hooks/useHotProfiles";
import { useInView } from "react-intersection-observer";
// Note: The following import is commented out since we haven't installed the package yet
// import { Virtuoso } from "react-virtuoso";

interface HotProfilesGalleryProps {
  serviceType?: string;
  onMediaClick: (item: { url: string; type: "image" | "video"; altText?: string }, index: number) => void;
}

// Simple loading component
const LoadingComponent = () => (
  <div className="py-4 text-center">
    <div className="animate-pulse flex space-x-4 justify-center">
      <div className="rounded-full bg-slate-300 dark:bg-slate-700 h-10 w-10"></div>
    </div>
    <p className="mt-2 text-gray-600 dark:text-gray-400">Loading profiles...</p>
  </div>
);

// Skeleton card for loading state
const SkeletonCard = () => (
  <div className="relative rounded overflow-hidden animate-pulse">
    <div className="relative h-72 md:h-80 w-full bg-slate-300 dark:bg-slate-700"></div>
    <div className="mt-2 text-center">
      <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-3/4 mx-auto"></div>
    </div>
  </div>
);

// Initial loading state with multiple skeleton cards
const InitialLoadingState = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
    {Array(10)
      .fill(0)
      .map((_, index) => (
        <SkeletonCard key={index} />
      ))}
  </div>
);

// Error component
const ErrorComponent = ({ message }: { message: string }) => (
  <div className="py-4 text-center text-red-500">
    <p>{message}</p>
    <button className="mt-2 px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600 transition">
      Try Again
    </button>
  </div>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pb-8">
        {data.map((profile, index) => {
          // Check if this profile should be animated
          const isNewlyLoaded =
            visibleIds.includes(profile.id) &&
            !animatedIds.includes(profile.id);

          // Determine if this is a priority image (in initial visible batch)
          const isPriority = index < 10; // First 10 images load eagerly

          return (
            <div
              key={`profile-${profile.id}-${index}`}
              className={`
                transform transition-all duration-700 ease-out
                ${
                  isNewlyLoaded
                    ? "opacity-0 translate-y-16 scale-95"
                    : "opacity-100 translate-y-0 scale-100"
                }
              `}
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
            </div>
          );
        })}
      </div>

      {loading && (
        <div className="py-4 mb-4 animate-pulse">
          <LoadingComponent />
        </div>
      )}

      {!hasMore && !loading && data.length > 0 && (
        <div className="py-4 text-center text-gray-600 dark:text-gray-400 mb-4 animate-fadeIn">
          <p>✅ כל הפרופילים נטענו</p>
        </div>
      )}

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
