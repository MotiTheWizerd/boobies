import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FaFire, FaUserTie } from "react-icons/fa";
import { CardGallerySection } from "@/components/HotProfiles";
import HotProfilesGallery from "@/components/HotProfiles/HotProfilesGallery";

export const metadata: Metadata = {
  title: "ליווי יוקרתי בישראל | bOObies.co.il",
  description:
    "גלו מלוות יוקרתיות בישראל עם פרופילים מאומתים, תמונות אמיתיות ודיסקרטיות מלאה. כל המודעות מעודכנות, אמינות ומותאמות לפרטיותכם.",
  openGraph: {
    title: "ליווי יוקרתי בישראל | bOObies.co.il",
    description:
      "גלו מלוות יוקרתיות בישראל עם פרופילים מאומתים, תמונות אמיתיות ודיסקרטיות מלאה. כל המודעות מעודכנות, אמינות ומותאמות לפרטיותכם.",
    url: "/escorts",
    type: "website",
  },
  alternates: {
    canonical: "/escorts",
  },
};

const EscortsHotProfilesGallery = () => {
  const handleMediaClick = (
    item: { url: string; type: "image" | "video"; altText?: string },
    index: number
  ) => {
    // Handle media click
    console.log("Media clicked:", item, "at index:", index);
    // You can implement a lightbox or modal here
  };

  return <HotProfilesGallery serviceType="OUTCALL_OR_MIXED" onMediaClick={handleMediaClick} />;
};

export default function EscortsPage() {
  return (
    <main className="min-h-[60vh] flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-16">
      <div className="w-full max-w-7xl mx-auto">
        <CardGallerySection
          title="ליווי יוקרתי"
          icon={<FaUserTie className="text-pink-500" />}
          GalleryList={EscortsHotProfilesGallery}
        />
        <section className="mt-6 text-lg text-right max-w-3xl mx-auto px-2">
          <p>
            גלו מלוות יוקרתיות בישראל עם פרופילים מאומתים, תמונות אמיתיות
            ודיסקרטיות מלאה. כל המודעות באתר bOObies.co.il מעודכנות, אמינות
            ומותאמות לפרטיותכם ולחוויה בלתי נשכחת.
          </p>
        </section>
      </div>
    </main>
  );
}
