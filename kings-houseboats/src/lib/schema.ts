import { siteConfig } from "./constants";

export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    image: `${siteConfig.url}/images/hero/hero-lake-mountains.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Nigeen Lake",
      addressLocality: "Srinagar",
      addressRegion: "Jammu & Kashmir",
      postalCode: "190006",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.coordinates.lat,
      longitude: siteConfig.coordinates.lng,
    },
    priceRange: "$$",
    starRating: {
      "@type": "Rating",
      ratingValue: "4.8",
    },
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Free WiFi", value: true },
      { "@type": "LocationFeatureSpecification", name: "Room Service", value: true },
      { "@type": "LocationFeatureSpecification", name: "Airport Transfer", value: true },
      { "@type": "LocationFeatureSpecification", name: "Lake View", value: true },
      { "@type": "LocationFeatureSpecification", name: "Traditional Cuisine", value: true },
      { "@type": "LocationFeatureSpecification", name: "Shikara Rides", value: true },
    ],
    sameAs: [
      siteConfig.social.instagram,
      siteConfig.social.facebook,
      siteConfig.social.tripadvisor,
    ],
  };
}

export function getHotelSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: siteConfig.name,
    description:
      "Luxury heritage houseboat accommodation on the pristine Nigeen Lake in Srinagar, Kashmir. Traditional Kashmiri woodwork, lake-facing rooms, authentic cuisine, and warm hospitality.",
    url: siteConfig.url,
    telephone: siteConfig.phone,
    checkinTime: "14:00",
    checkoutTime: "11:00",
    numberOfRooms: 4,
    petsAllowed: false,
    image: [
      `${siteConfig.url}/images/hero/hero-entrance.png`,
      `${siteConfig.url}/images/rooms/royal-suite.jpg`,
      `${siteConfig.url}/images/lounge/royal-lounge.png`,
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Nigeen Lake",
      addressLocality: "Srinagar",
      addressRegion: "Jammu & Kashmir",
      postalCode: "190006",
      addressCountry: "IN",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "320",
      bestRating: "5",
    },
  };
}

export function getFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function getReviewSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: siteConfig.name,
    review: [
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Sarah Mitchell" },
        datePublished: "2024-10-15",
        reviewBody:
          "An absolutely magical experience! The houseboat is beautifully maintained with intricate Kashmiri woodwork. Waking up to the serene Nigeen Lake was pure bliss.",
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      },
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Rajesh Kumar" },
        datePublished: "2024-09-20",
        reviewBody:
          "Best houseboat experience in Srinagar! The staff was incredibly warm and the food was outstanding. Perfect for our family vacation.",
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      },
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Emma Thompson" },
        datePublished: "2024-11-05",
        reviewBody:
          "The most romantic stay we could have asked for during our honeymoon. The lake views and traditional interiors are breathtaking.",
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "320",
      bestRating: "5",
    },
  };
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  };
}
