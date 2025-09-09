import { useState, useEffect, useCallback } from "react";

// Define the profile interface (matching the existing HotProfileProps)
export interface HotProfileProps {
  id: string;
  name: string;
  imageUrl: string;
  isHappyHour?: boolean;
  isHot?: boolean;
  isPremium?: boolean;
  likesCount: number;
  viewsCount: number;
  media?: Array<{
    fileName: string;
    fileSize: number;
    fileType: string;
    isDefault?: boolean;
    originalName: string;
    url: string;
  }>;
}

// Interface for the Ad data from the API
interface AdData {
  id: string;
  name: string;
  description?: string;
  isHappyHour: boolean;
  isHot: boolean;
  isPremium: boolean;
  likesCount: number;
  viewsCount: number;
  images?: Array<{
    fileName: string;
    fileSize: number;
    fileType: string;
    isDefault: boolean;
    originalName: string;
    url: string;
  }> | null;
}

// Function to get the default image URL from ad images
const getDefaultImageUrl = (images?: AdData['images']): string => {
  console.log('getDefaultImageUrl - images:', images);
  
  if (!images || images.length === 0) {
    console.log('No images found, using placeholder');
    return '/images/placeholder.webp'; // Fallback image
  }
  
  // Look for the default image first, then fall back to the first image
  const defaultImage = images.find(img => img.isDefault && img.fileType.startsWith('image/'));
  const firstImage = images.find(img => img.fileType.startsWith('image/'));
  
  const selectedImage = defaultImage || firstImage;
  const imageUrl = selectedImage ? selectedImage.url : '/images/placeholder.webp';
  console.log('Using image URL:', imageUrl);
  return imageUrl;
};

// Function to convert Ad data to HotProfileProps
const mapAdToProfile = (ad: AdData): HotProfileProps => {
  console.log('mapAdToProfile - ad data:', ad);
  return {
    id: ad.id,
    name: ad.name,
    imageUrl: getDefaultImageUrl(ad.images),
    isHappyHour: ad.isHappyHour,
    isHot: ad.isHot,
    isPremium: ad.isPremium,
    likesCount: ad.likesCount,
    viewsCount: ad.viewsCount,
    media: ad.images || [],
  };
};

// Fetch ads from the API
const fetchAds = async (serviceType?: string): Promise<HotProfileProps[]> => {
  try {
    const url = serviceType 
      ? `/api/ads?serviceType=${serviceType}`
      : '/api/ads';
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Handle both array response and object with data property
    const ads = Array.isArray(data) ? data : (data.data || []);
    
    return ads.map(mapAdToProfile);
  } catch (error) {
    console.error('Error fetching ads:', error);
    throw error;
  }
};

export const useHotProfiles = (serviceType?: string) => {
  const [profiles, setProfiles] = useState<HotProfileProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false); // Set to false since we're loading all ads at once for now

  const loadProfiles = useCallback(async () => {
    if (loading) return;

    setLoading(true);
    setError(null);
    
    try {
      const fetchedProfiles = await fetchAds(serviceType);
      setProfiles(fetchedProfiles);
      setHasMore(false); // No pagination for now - loading all ads at once
    } catch (err) {
      setError("Failed to load profiles");
      console.error('Error loading profiles:', err);
    } finally {
      setLoading(false);
    }
  }, [serviceType]); // Remove loading from dependencies

  // Load ads on component mount
  useEffect(() => {
    loadProfiles();
  }, [loadProfiles]);

  return { profiles, loading, error, hasMore, loadProfiles };
};
