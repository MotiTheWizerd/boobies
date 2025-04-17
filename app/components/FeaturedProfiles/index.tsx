"use client";
import React from "react";
import ProfileCard from "../ProfileCard";
import Carousel from "../Carousel";

// Define the profile interface for type safety
interface Profile {
  id: number;
  name: string;
  imageUrl: string;
  isHot?: boolean;
  isPremium?: boolean;
  isHappyHour?: boolean;
  isTop?: boolean;
}

/**
 * FeaturedProfiles component displaying user profiles in a carousel
 */
const FeaturedProfiles = () => {
  // Sample data for the profiles
  const profiles: Profile[] = [
    {
      id: 1,
      name: "סופיה",
      imageUrl: "/images/profile1.jpg",
      isHappyHour: true,
    },
    { id: 2, name: "Katy", imageUrl: "/images/top-1.jpg", isTop: true },
    { id: 3, name: "ליאה", imageUrl: "/images/top-2.jpg", isPremium: true },
    { id: 4, name: "דניאלה", imageUrl: "/images/top-3.jpg" },
    { id: 5, name: "תמר", imageUrl: "/images/top-4.webp", isHot: true },
    { id: 6, name: "אודטה", imageUrl: "/images/top-5.webp" },
    { id: 7, name: "יסמין", imageUrl: "/images/profile7.jpg" },
    {
      id: 8,
      name: "ליה להיות?",
      imageUrl: "/images/top-1.jpg",
      isHappyHour: true,
      isHot: true,
    },
  ];

  // Render function for each profile
  const renderProfile = (profile: Profile, index: number) => (
    <ProfileCard
      name={profile.name}
      imageUrl={profile.imageUrl}
      isHot={profile.isHot}
      isPremium={profile.isPremium}
      isHappyHour={profile.isHappyHour}
      isTop={profile.isTop}
      delay={index}
      showStats={false}
    />
  );

  return (
    <Carousel<Profile>
      items={profiles}
      renderItem={renderProfile}
      title="סטורים היום"
      rtl={true}
      scrollAmount={300}
    />
  );
};

export default FeaturedProfiles;
