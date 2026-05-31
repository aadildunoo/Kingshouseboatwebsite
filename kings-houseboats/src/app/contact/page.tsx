import type { Metadata } from "next";
import { ContactPageClient } from "./contact-client";

export const metadata: Metadata = {
  title: "Contact Us — Kings Houseboats, Nigeen Lake, Srinagar",
  description:
    "Get in touch with Kings Houseboats on Nigeen Lake, Srinagar. Call, WhatsApp, or email us to book your luxury houseboat stay in Kashmir. Free airport transfers included.",
  alternates: { canonical: "https://kingshouseboats.com/contact" },
  openGraph: {
    title: "Contact Kings Houseboats — Nigeen Lake, Srinagar",
    description: "Book your luxury houseboat stay. Call, WhatsApp, or email us. Free airport transfers included.",
    url: "https://kingshouseboats.com/contact",
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
