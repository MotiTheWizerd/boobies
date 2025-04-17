"use client";
import React from "react";
import PlaceholderImage from "../Common/PlaceholderImage";
import { FaFire } from "react-icons/fa";

interface HotProfileProps {
  id: number;
  name: string;
  imageUrl: string;
  isHappyHour?: boolean;
  isHot?: boolean;
  isPremium?: boolean;
  likesCount: number;
  viewsCount: number;
}

const HotProfileCard = ({
  name,
  imageUrl,
  isHappyHour,
  isHot,
  isPremium,
  likesCount,
  viewsCount,
}: HotProfileProps) => {
  // Get initials for fallback
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);

  return (
    <div className="relative rounded overflow-hidden">
      <div className="relative h-72 md:h-80 w-full">
        <PlaceholderImage
          src={imageUrl}
          alt={name}
          fill
          style={{ objectFit: "cover" }}
          initials={initials}
          backgroundColor="#8a2be2"
        />

        {/* Badges */}
        {isHappyHour && (
          <div className="absolute top-2 left-2 happy-hour-badge">
            HAPPY HOUR
          </div>
        )}

        {isHot && <div className="absolute top-2 right-2 hot-badge">HOT</div>}

        {isPremium && (
          <div className="absolute bottom-20 right-2 premium-badge flex items-center justify-center">
            <span className="text-xs">PREMIUM</span>
          </div>
        )}

        {/* Stats at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-black bg-opacity-50">
          <div className="flex justify-between">
            <div className="heart-count">
              <span className="heart-icon">❤️</span>
              <span>{likesCount}</span>
            </div>

            <div className="view-count">
              <span className="view-icon">👁️</span>
              <span>{viewsCount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Profile name with proper contrast */}
      <div className="mt-2 text-center font-medium text-gray-900 dark:text-gray-100">
        {name}
      </div>
    </div>
  );
};

const HotProfiles = () => {
  // Sample data for hot profiles
  const hotProfiles = [
    {
      id: 1,
      name: "אלינה",
      imageUrl: "/images/hot-1.webp",
      isHappyHour: true,
      likesCount: 239,
      viewsCount: 1052,
      isPremium: false,
    },
    {
      id: 2,
      name: "מאיה",
      imageUrl: "/images/hot-2.webp",
      isHappyHour: true,
      likesCount: 646,
      viewsCount: 14,
      isPremium: false,
    },
    {
      id: 3,
      name: "אנסטסיה",
      imageUrl: "/images/hot-3.webp",
      isHot: true,
      likesCount: 40,
      viewsCount: 5,
      isPremium: false,
    },
  ];

  return (
    <div className="py-2">
      <h2 className="section-header text-2xl font-bold text-center flex items-center justify-center gap-2 text-gray-900 dark:text-gray-100">
        <FaFire className="fire-icon text-amber-500" />
        <span>חם בלעדי</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-3">
        {hotProfiles.map((profile) => (
          <HotProfileCard
            key={profile.id}
            id={profile.id}
            name={profile.name}
            imageUrl={profile.imageUrl}
            isHappyHour={profile.isHappyHour}
            isHot={profile.isHot}
            isPremium={profile.isPremium}
            likesCount={profile.likesCount}
            viewsCount={profile.viewsCount}
          />
        ))}
      </div>
    </div>
  );
};

export default HotProfiles;
