import { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";

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
    <main className="min-h-[60vh] flex flex-col items-center justify-center bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-16">
      {/* Content intentionally left empty for now */}
    </main>
  );
}
