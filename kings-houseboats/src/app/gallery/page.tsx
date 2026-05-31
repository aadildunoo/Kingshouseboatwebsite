import type { Metadata } from "next";
import { GalleryPageClient } from "./gallery-client";

export const metadata: Metadata = {
  title: "Photo Gallery — Kings Houseboats, Nigeen Lake, Srinagar",
  description:
    "Browse our stunning photo gallery. See luxury rooms, Kashmiri interiors, lake views, dining areas, and the beauty of Nigeen Lake at Kings Houseboats, Srinagar.",
  alternates: { canonical: "https://kingshouseboats.com/gallery" },
  openGraph: {
    title: "Photo Gallery — Kings Houseboats, Nigeen Lake",
    description: "Explore stunning photos of our luxury houseboat on Nigeen Lake — rooms, interiors, lake views & more.",
    url: "https://kingshouseboats.com/gallery",
    images: [{ url: "/images/lounge/royal-lounge.png", width: 1200, height: 630 }],
  },
};

export default function GalleryPage() {
  return <GalleryPageClient />;
}
