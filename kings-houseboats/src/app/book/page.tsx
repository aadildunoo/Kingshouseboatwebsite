import type { Metadata } from "next";
import { BookingClient } from "./booking-client";

export const metadata: Metadata = {
  title: "Book Your Stay — Kings Houseboats",
  description: "Secure your luxury houseboat experience on Nigeen Lake.",
  alternates: { canonical: "https://kingshouseboats.com/book" },
};

import { Suspense } from "react";

export default function BookPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading booking...</div>}>
      <BookingClient />
    </Suspense>
  );
}
