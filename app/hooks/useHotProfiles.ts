import { useState, useEffect, useCallback } from "react";

// Define the profile interface (matching the existing HotProfileProps)
export interface HotProfileProps {
  id: number;
  name: string;
  imageUrl: string;
  isHappyHour?: boolean;
  isHot?: boolean;
  isPremium?: boolean;
  likesCount: number;
  viewsCount: number;
}

// Mock data function - replace with actual API call in production
const fetchMoreProfiles = async (
  page: number,
  limit: number,
  existingProfilesCount: number
): Promise<HotProfileProps[]> => {
  // Simulate network delay (shorter for better UX)
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Generate mock profiles - in production, this would be an API call
  return Array(limit)
    .fill(0)
    .map((_, i) => {
      // Make sure each profile has a unique ID based on the total count so far
      const uniqueId = existingProfilesCount + i + 1;
      return {
        id: uniqueId,
        name: `פרופיל ${uniqueId}`,
        imageUrl: `/images/hot-${(uniqueId % 3) + 1}.webp`,
        isHappyHour: Math.random() > 0.7,
        isHot: Math.random() > 0.7,
        isPremium: Math.random() > 0.8,
        likesCount: Math.floor(Math.random() * 1000),
        viewsCount: Math.floor(Math.random() * 5000),
      };
    });
};

export const useHotProfiles = (initialLimit = 20) => {
  const [profiles, setProfiles] = useState<HotProfileProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  const loadProfiles = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      // Pass the current count of profiles to ensure unique IDs
      const newProfiles = await fetchMoreProfiles(
        page,
        initialLimit,
        profiles.length
      );

      // Limit the total number of profiles to 100 for this demo
      if (
        newProfiles.length === 0 ||
        profiles.length + newProfiles.length >= 100
      ) {
        setHasMore(false);
      } else {
        setProfiles((prev) => [...prev, ...newProfiles]);
        setPage((prev) => prev + 1);
      }
    } catch (err) {
      setError("Failed to load profiles");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, page, initialLimit, profiles.length]);

  // Load initial batch
  useEffect(() => {
    loadProfiles();
  }, [loadProfiles]);

  return { profiles, loading, error, hasMore, loadProfiles };
};
