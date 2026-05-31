import type { Metadata } from "next";
import { AboutPageClient } from "./about-client";

export const metadata: Metadata = {
  title: "About Kings Houseboats — Heritage Luxury on Nigeen Lake, Srinagar",
  description:
    "Discover the rich heritage of Kings Houseboats, a premier luxury houseboat on Nigeen Lake, Srinagar. Over 50 years of authentic Kashmiri hospitality, award-winning service, and timeless charm.",
  alternates: { canonical: "https://kingshouseboats.com/about" },
  openGraph: {
    title: "About Kings Houseboats — Heritage Luxury on Nigeen Lake",
    description:
      "Over 50 years of authentic Kashmiri hospitality. Discover our heritage houseboat on Nigeen Lake, Srinagar.",
    url: "https://kingshouseboats.com/about",
    images: [{ url: "/images/lounge/royal-lounge.png", width: 1200, height: 630 }],
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
