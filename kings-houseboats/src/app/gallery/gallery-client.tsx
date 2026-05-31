"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Lightbox } from "@/components/shared/lightbox";
import { SectionHeading } from "@/components/shared/section-heading";
import { CTABanner } from "@/components/shared/cta-banner";

type GalleryCategory = "all" | "exterior" | "rooms" | "living" | "dining" | "lake" | "interiors";

const categories: { key: GalleryCategory; label: string }[] = [
  { key: "all", label: "All Photos" },
  { key: "exterior", label: "Exterior" },
  { key: "rooms", label: "Rooms" },
  { key: "living", label: "Living Areas" },
  { key: "dining", label: "Dining" },
  { key: "lake", label: "Lake Views" },
  { key: "interiors", label: "Interiors" },
];

const galleryImages: { src: string; alt: string; category: GalleryCategory }[] = [
  // Exterior
  { src: "/images/hero/hero-entrance.png", alt: "Grand Kashmiri entrance with turquoise lattice woodwork", category: "exterior" },
  { src: "/images/exterior/heritage-exterior.jpg", alt: "Heritage houseboat exterior on Nigeen Lake", category: "exterior" },
  { src: "/images/exterior/houseboat-exterior.png", alt: "Houseboat exterior view from Nigeen Lake", category: "exterior" },
  { src: "/images/exterior/ext-1.jpg", alt: "Kings Houseboats from the lake shore", category: "exterior" },
  { src: "/images/exterior/ext-2.jpg", alt: "Wooden houseboat facade on Nigeen Lake", category: "exterior" },

  // Rooms
  { src: "/images/rooms/royal-suite.jpg", alt: "Royal Suite with panoramic lake and mountain views", category: "rooms" },
  { src: "/images/rooms/deluxe-lake-view.jpg", alt: "Deluxe room with twin beds overlooking the lake", category: "rooms" },
  { src: "/images/rooms/heritage-room.png", alt: "Heritage room with traditional wood paneling", category: "rooms" },
  { src: "/images/rooms/family-room.png", alt: "Spacious family room with lake views", category: "rooms" },
  { src: "/images/rooms/room-5.jpg", alt: "Luxury bedroom with Nigeen Lake views", category: "rooms" },
  { src: "/images/rooms/room-6.jpg", alt: "Cozy houseboat room with Kashmiri decor", category: "rooms" },
  { src: "/images/rooms/room-7.jpg", alt: "Traditional bedroom with carved ceiling", category: "rooms" },
  { src: "/images/rooms/room-8.jpg", alt: "Comfortable bedroom with heritage furnishings", category: "rooms" },

  // Living Areas
  { src: "/images/lounge/royal-lounge.png", alt: "Royal lounge with crystal chandeliers and carved ceiling", category: "living" },
  { src: "/images/lounge/sitting-area.png", alt: "Sitting area with TripAdvisor award", category: "living" },
  { src: "/images/lounge/carved-entrance.jpg", alt: "Carved walnut wood entrance archway", category: "living" },
  { src: "/images/lounge/lounge-2.jpg", alt: "Additional lounge seating area", category: "living" },

  // Dining
  { src: "/images/dining/dining-area.jpg", alt: "Traditional dining area with hand-carved chairs", category: "dining" },
  { src: "/images/dining/dining-2.jpg", alt: "Kashmiri dining setup with crystal chandelier", category: "dining" },
  { src: "/images/dining/dining-3.jpg", alt: "Dining room with wooden paneling", category: "dining" },

  // Lake Views
  { src: "/images/hero/hero-lake-mountains.png", alt: "Nigeen Lake with snow-capped mountains and houseboat", category: "lake" },
  { src: "/images/lake/lake-1.jpg", alt: "Sunset reflections on Nigeen Lake", category: "lake" },
  { src: "/images/lake/lake-2.jpg", alt: "Morning view of the lake from the houseboat", category: "lake" },
  { src: "/images/lake/lake-3.jpg", alt: "Crystal clear waters of Nigeen Lake", category: "lake" },
  { src: "/images/lake/lake-4.jpg", alt: "Lotus flowers on Nigeen Lake", category: "lake" },
  { src: "/images/lake/lake-5.jpg", alt: "Zabarwan mountain reflections on the lake", category: "lake" },

  // Interiors
  { src: "/images/gallery/interiors-1.jpg", alt: "Intricate woodwork interior details", category: "interiors" },
  { src: "/images/gallery/heritage-interior.jpg", alt: "Heritage houseboat interior craftsmanship", category: "interiors" },
  { src: "/images/gallery/gallery-1.jpg", alt: "Traditional Kashmiri decor elements", category: "interiors" },
  { src: "/images/gallery/gallery-2.jpg", alt: "Hand-carved wooden details", category: "interiors" },
  { src: "/images/gallery/gallery-3.jpg", alt: "Crewel embroidery and textiles", category: "interiors" },
  { src: "/images/gallery/gallery-4.jpg", alt: "Papier-mâché artwork display", category: "interiors" },
  { src: "/images/gallery/gallery-5.jpg", alt: "Traditional ceiling pattern close-up", category: "interiors" },
  { src: "/images/gallery/gallery-6.jpg", alt: "Kashmiri carpet and furnishing details", category: "interiors" },
];

export function GalleryPageClient() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filteredImages =
    activeCategory === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[350px] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/lounge/carved-entrance.jpg"
          alt="Intricately carved walnut wood entrance archway of Kings Houseboats"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-navy-800/65" />
        <div className="relative z-10 text-center px-4">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-5 py-2 rounded-full text-xs font-semibold tracking-[0.2em] uppercase bg-white/10 backdrop-blur-sm text-gold-300 border border-gold-400/20 mb-4"
          >
            Gallery
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold font-[family-name:var(--font-playfair)] text-white text-shadow-lg"
          >
            A Visual Journey
          </motion.h1>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 md:py-24 bg-beige-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat.key
                    ? "gold-gradient text-navy-800 shadow-md shadow-gold-400/20"
                    : "bg-white text-navy-500 border border-beige-300 hover:border-gold-400/40 hover:text-gold-600"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Masonry Grid */}
          <motion.div layout className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            <AnimatePresence mode="popLayout">
              {filteredImages.map((img, i) => (
                <motion.div
                  key={img.src}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: i * 0.03 }}
                  className="break-inside-avoid relative group cursor-pointer rounded-xl overflow-hidden"
                  onClick={() => openLightbox(i)}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={400}
                    height={300 + (i % 3) * 80}
                    className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-navy-800/0 group-hover:bg-navy-800/40 transition-all duration-300 flex items-center justify-center">
                    <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                      View
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox
        images={filteredImages}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />

      {/* CTA */}
      <CTABanner
        title="Love What You See?"
        subtitle="Book your stay at Kings Houseboats and experience this beauty in person."
      />
    </>
  );
}
