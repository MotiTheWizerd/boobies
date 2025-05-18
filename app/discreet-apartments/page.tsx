import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FaRegBuilding } from "react-icons/fa";
import { CardGallerySection } from "@/components/HotProfiles";
import FeaturedProfiles from "@/components/FeaturedProfiles";

export const metadata: Metadata = {
  title: "Discreet Apartments | YourSiteName",
  description:
    "Find discreet apartments for private encounters. Safe, comfortable, and confidential locations. Browse listings now.",
  openGraph: {
    title: "Discreet Apartments | YourSiteName",
    description:
      "Find discreet apartments for private encounters. Safe, comfortable, and confidential locations. Browse listings now.",
    url: "/discreet-apartments",
    type: "website",
  },
  alternates: {
    canonical: "/discreet-apartments",
  },
};

export default function DiscreetApartmentsPage() {
  return (
    <main className="min-h-[60vh] flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-16">
      <div className="w-full max-w-7xl mx-auto">
        <CardGallerySection
          title="דירות דיסקרטיות מומלצות"
          icon={<FaRegBuilding className="text-blue-500" />}
          GalleryList={FeaturedProfiles}
        />
      </div>
    </main>
  );
}
