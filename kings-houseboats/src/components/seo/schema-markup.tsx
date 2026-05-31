import { getLocalBusinessSchema, getHotelSchema, getReviewSchema } from "@/lib/schema";

export function SchemaMarkup() {
  const localBusiness = getLocalBusinessSchema();
  const hotel = getHotelSchema();
  const reviews = getReviewSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hotel) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviews) }}
      />
    </>
  );
}
