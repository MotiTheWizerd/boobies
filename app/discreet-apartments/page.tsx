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

export default function DiscreetApartmentsPage() {
  return (
    <main className="min-h-[60vh] flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-16">
      <div className="w-full max-w-7xl mx-auto">
        <CardGallerySection
          title="דירות דיסקרטיות מומלצות"
          icon={<FaRegBuilding className="text-blue-500" />}
          GalleryList={HotProfilesGallery}
        />
        <section className="mt-6 text-lg text-right max-w-3xl mx-auto px-2">
          <p>
            מצאו דירות דיסקרטיות בישראל למפגשים פרטיים באווירה בטוחה, נוחה
            ודיסקרטית. כל הדירות באתר bOObies.co.il מאומתות, מתוחזקות ומותאמות
            לפרטיותכם המלאה ולחוויה איכותית.
          </p>
        </section>
      </div>
    </main>
  );
}
