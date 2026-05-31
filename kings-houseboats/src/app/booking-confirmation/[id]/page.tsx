import type { Metadata } from "next";
import { ConfirmationClient } from "./confirmation-client";

export const metadata: Metadata = {
  title: "Booking Confirmed — Kings Houseboats",
  description: "Your reservation at Kings Houseboats is confirmed.",
};

import { Suspense } from "react";

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-32 text-center text-navy-500">Loading confirmation...</div>}>
      <ConfirmationClient />
    </Suspense>
  );
}
