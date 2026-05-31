import type { Metadata } from "next";
import { FAQPageClient } from "./faq-client";

export const metadata: Metadata = {
  title: "FAQs — Kings Houseboats, Nigeen Lake, Srinagar",
  description:
    "Find answers to frequently asked questions about Kings Houseboats on Nigeen Lake, Srinagar. Learn about booking, airport transfers, amenities, cuisine, activities, and more.",
  alternates: { canonical: "https://kingshouseboats.com/faq" },
  openGraph: {
    title: "FAQs — Kings Houseboats, Nigeen Lake, Srinagar",
    description: "Everything you need to know about staying at Kings Houseboats. Booking, transfers, amenities & more.",
    url: "https://kingshouseboats.com/faq",
  },
};

export default function FAQPage() {
  return <FAQPageClient />;
}
