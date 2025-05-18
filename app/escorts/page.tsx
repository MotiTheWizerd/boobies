import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FaFire } from "react-icons/fa";
import { CardGallerySection } from "@/components/HotProfiles";
import HotProfilesGallery from "@/components/HotProfiles/HotProfilesGallery";

export const metadata: Metadata = {
  title: "Escorts | YourSiteName",
  description:
    "Discover top escorts in your area. Browse profiles, photos, and more. Safe, discreet, and up-to-date listings.",
  openGraph: {
    title: "Escorts | YourSiteName",
    description:
      "Discover top escorts in your area. Browse profiles, photos, and more. Safe, discreet, and up-to-date listings.",
    url: "/escorts",
    type: "website",
  },
  alternates: {
    canonical: "/escorts",
  },
};

export default function EscortsPage() {
  return (
    <main className="min-h-[60vh] flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-16">
      <div className="w-full max-w-7xl mx-auto">
        <CardGallerySection
          title="חם בלעדי"
          icon={<FaFire className="fire-icon text-amber-500" />}
          GalleryList={HotProfilesGallery}
        />
      </div>
    </main>
  );
}
