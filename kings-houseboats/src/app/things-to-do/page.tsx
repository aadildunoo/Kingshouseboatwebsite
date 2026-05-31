import type { Metadata } from "next";
import { ThingsToDoPageClient } from "./things-to-do-client";

export const metadata: Metadata = {
  title: "Things To Do in Kashmir — Sightseeing & Experiences from Kings Houseboats",
  description:
    "Explore the best things to do in Kashmir from Kings Houseboats. Visit Gulmarg, Pahalgam, Mughal Gardens, enjoy Shikara rides on Nigeen Lake, and experience authentic Kashmiri culture.",
  alternates: { canonical: "https://kingshouseboats.com/things-to-do" },
  openGraph: {
    title: "Things To Do in Kashmir — Kings Houseboats",
    description: "Explore Gulmarg, Pahalgam, Mughal Gardens, Shikara rides & more. Plan your Kashmir adventure from Nigeen Lake.",
    url: "https://kingshouseboats.com/things-to-do",
  },
};

export default function ThingsToDoPage() {
  return <ThingsToDoPageClient />;
}
