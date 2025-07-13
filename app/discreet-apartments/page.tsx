import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FaRegBuilding } from "react-icons/fa";
import { CardGallerySection } from "@/components/HotProfiles";
import FeaturedProfiles from "@/components/FeaturedProfiles";
import HotProfilesGallery from "@/components/HotProfiles/HotProfilesGallery";

export const metadata: Metadata = {
  title: "דירות דיסקרטיות בישראל | bOObies.co.il",
  description:
    "מצאו דירות דיסקרטיות בישראל למפגשים פרטיים באווירה בטוחה, נוחה ודיסקרטית. כל הדירות באתר bOObies.co.il מאומתות, מתוחזקות ומותאמות לפרטיותכם המלאה.",
  openGraph: {
    title: "דירות דיסקרטיות בישראל | bOObies.co.il",
    description:
      "מצאו דירות דיסקרטיות בישראל למפגשים פרטיים באווירה בטוחה, נוחה ודיסקרטית. כל הדירות באתר bOObies.co.il מאומתות, מתוחזקות ומותאמות לפרטיותכם המלאה.",
    url: "/discreet-apartments",
    type: "website",
  },
  alternates: {
    canonical: "/discreet-apartments",
  },
};

const DiscreetApartmentsHotProfilesGallery = () => {
  const handleMediaClick = (
    item: { url: string; type: "image" | "video"; altText?: string },
    index: number
  ) => {
    // Handle media click
    console.log("Media clicked:", item, "at index:", index);
    // You can implement a lightbox or modal here
  };

  return <HotProfilesGallery serviceType="INCALL_OR_MIXED" onMediaClick={handleMediaClick} />;
};

export default function DiscreetApartmentsPage() {
  return (
    <main className="min-h-[60vh] flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-16">
      <div className="w-full max-w-7xl mx-auto">
        <CardGallerySection
          title="דירות דיסקרטיות מומלצות"
          icon={<FaRegBuilding className="text-pink-500" />}
          GalleryList={DiscreetApartmentsHotProfilesGallery}
          onMediaClick={(item, index) => {
            console.log("Media clicked:", item, "at index:", index);
            // Implement media click handling here
          }}
        />
        <section className="mt-6 text-lg text-right max-w-3xl mx-auto px-2">
          <p>
            מצאו דירות דיסקרטיות בישראל למפגשים פרטיים באווירה בטוחה, נוחה
            ודיסקרטית. כל הדירות באתר bOObies.co.il מאומתות, מתוחזקות ומותאמות
            לפרטיותכם המלאה.
          </p>
        </section>
      </div>
    </main>
  );
}
