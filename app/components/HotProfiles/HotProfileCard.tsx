import React from "react";
import PlaceholderImage from "../Common/PlaceholderImage";
import { FaFire } from "react-icons/fa";

export interface HotProfileProps {
  id: number;
  name: string;
  imageUrl: string;
  isHappyHour?: boolean;
  isHot?: boolean;
  isPremium?: boolean;
  likesCount: number;
  viewsCount: number;
  priority?: boolean;
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
}: HotProfileProps) => {
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
          loading={priority ? "eager" : "lazy"}
          priority={priority}
          style={{ objectFit: "cover" }}
          initials={initials}
          backgroundColor="#8a2be2"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
        />

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

      <div className="mt-2 text-center font-medium text-gray-900 dark:text-gray-100">
        {name}
      </div>
    </div>
  );
};

export default HotProfileCard;
