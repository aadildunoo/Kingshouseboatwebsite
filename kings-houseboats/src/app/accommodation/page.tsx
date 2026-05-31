import type { Metadata } from "next";
import { AccommodationPageClient } from "./accommodation-client";

export const metadata: Metadata = {
  title: "Luxury Rooms & Accommodation — Kings Houseboats, Nigeen Lake",
  description:
    "Explore our luxury houseboat rooms on Nigeen Lake, Srinagar. From the Royal Suite to Heritage Rooms — hand-carved interiors, lake views, premium bedding & authentic Kashmiri décor.",
  alternates: { canonical: "https://kingshouseboats.com/accommodation" },
  openGraph: {
    title: "Luxury Houseboat Rooms — Kings Houseboats, Srinagar",
    description: "Hand-carved interiors, panoramic lake views, premium bedding. Explore our luxury houseboat rooms on Nigeen Lake.",
    url: "https://kingshouseboats.com/accommodation",
    images: [{ url: "/images/rooms/royal-suite.jpg", width: 1200, height: 630 }],
  },
};

export default function AccommodationPage() {
  return <AccommodationPageClient />;
}
