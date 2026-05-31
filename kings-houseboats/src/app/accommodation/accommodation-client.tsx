"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BedDouble, Users, Eye, Wifi, Droplets, Coffee,
  ShirtIcon, Sparkles, ChevronRight, Mountain, Star,
} from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { CTABanner } from "@/components/shared/cta-banner";
import { siteConfig } from "@/lib/constants";
import { useState } from "react";

const allRooms = [
  {
    name: "Royal Suite",
    tagline: "The Crown Jewel of Nigeen Lake",
    images: ["/images/rooms/royal-suite.jpg", "/images/rooms/room-5.jpg"],
    description:
      "Our most prestigious accommodation, the Royal Suite commands panoramic views of Nigeen Lake and the majestic Zabarwan mountain range. The room features an intricately hand-carved walnut wood ceiling that took master craftsmen over six months to complete, king-sized bed dressed in premium Kashmiri crewel-embroidered linens, and a private seating area overlooking the lake. Awake each morning to the sight of snow-capped peaks reflected in crystal-clear waters — an experience that no luxury hotel in the world can replicate.",
    amenities: ["Panoramic Lake & Mountain View", "King-Size Bed", "Hand-Carved Walnut Ceiling", "Private Seating Area", "En-suite Bathroom", "Premium Kashmiri Bedding", "Writing Desk", "Room Service"],
    occupancy: "2 Adults + 1 Child",
    size: "280 sq ft",
    view: "Lake & Mountain",
  },
  {
    name: "Deluxe Lake View Room",
    tagline: "Serenity Overlooking Nigeen Lake",
    images: ["/images/rooms/deluxe-lake-view.jpg", "/images/rooms/room-6.jpg"],
    description:
      "The Deluxe Lake View Room offers twin beds positioned to maximise the breathtaking views of Nigeen Lake, where lotus flowers float gently on mirrored waters. The room's traditional Kashmiri woodwork ceiling, adorned with geometric patterns, creates a warm and intimate atmosphere. Crewel-embroidered bedspreads in soft florals complement the hand-woven carpet underfoot, while sheer curtains filter the golden lake light. This room is perfect for friends travelling together or couples who prefer twin bedding.",
    amenities: ["Direct Lake View", "Twin Beds", "Traditional Woodwork Ceiling", "Kashmiri Carpet", "Writing Desk", "En-suite Bathroom", "Hot Water 24/7", "Bedside Lamps"],
    occupancy: "2 Adults",
    size: "240 sq ft",
    view: "Lake View",
  },
  {
    name: "Heritage Room",
    tagline: "Where History Meets Luxury",
    images: ["/images/rooms/heritage-room.png", "/images/rooms/room-7.jpg"],
    description:
      "The Heritage Room is a celebration of Kashmir's artistic legacy. Every surface tells a story — from the intricate wood-paneled walls featuring traditional chinar leaf motifs to the hand-embroidered tapestries that depict scenes from Kashmiri folklore. A comfortable double bed with premium bedding sits beneath a meticulously carved ceiling, while a cozy sitting area with bolster cushions invites you to relax with a cup of traditional Kashmiri Kahwa tea. Lake-facing windows frame views that change with every hour of the day.",
    amenities: ["Heritage Wood Paneling", "Double Bed", "Cozy Sitting Area", "Lake-Facing Windows", "Traditional Tapestries", "En-suite Bathroom", "Room Service", "Wardrobe"],
    occupancy: "2 Adults + 1 Child",
    size: "260 sq ft",
    view: "Lake Glimpses",
  },
  {
    name: "Family Room",
    tagline: "Space for Memories Together",
    images: ["/images/rooms/family-room.png", "/images/rooms/room-8.jpg"],
    description:
      "Designed with families in mind, our spacious Family Room comfortably accommodates parents and children alike. Multiple beds ensure everyone has their own cozy space, while the generous floor area provides room for children to play. Traditional Kashmiri décor creates a magical atmosphere that delights young and old — from the ornate ceiling to the colourful hand-woven textiles. The room opens to lake views that make bedtime stories come alive with tales of Kashmiri kings and queens.",
    amenities: ["Multiple Beds", "Spacious Layout", "Lake Views", "Child-Friendly", "En-suite Bathroom", "Room Service", "Extra Bedding Available", "24/7 Hot Water"],
    occupancy: "2 Adults + 2 Children",
    size: "320 sq ft",
    view: "Lake View",
  },
];

const commonAmenities = [
  { icon: Wifi, label: "Free High-Speed WiFi" },
  { icon: Droplets, label: "24/7 Hot Water" },
  { icon: Coffee, label: "Complimentary Tea & Kahwa" },
  { icon: Sparkles, label: "Daily Housekeeping" },
  { icon: ShirtIcon, label: "Laundry Service" },
  { icon: Mountain, label: "Sightseeing Assistance" },
];

function RoomCard({ room, index }: { room: typeof allRooms[0]; index: number }) {
  const [currentImage, setCurrentImage] = useState(0);
  const isReversed = index % 2 !== 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
        isReversed ? "lg:direction-rtl" : ""
      }`}
    >
      {/* Image */}
      <div className={`${isReversed ? "lg:order-2" : ""}`}>
        <div className="relative rounded-2xl overflow-hidden shadow-xl h-[350px] md:h-[450px]">
          <Image
            src={room.images[currentImage]}
            alt={`${room.name} at Kings Houseboats - luxury houseboat accommodation on Nigeen Lake Srinagar`}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          {/* Image dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {room.images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentImage(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === currentImage ? "bg-gold-400 w-6" : "bg-white/60"
                }`}
                aria-label={`View image ${i + 1} of ${room.name}`}
              />
            ))}
          </div>
          <div className="absolute top-4 left-4 bg-gold-400/90 text-navy-800 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
            <Eye className="w-3 h-3" />
            {room.view}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={`${isReversed ? "lg:order-1" : ""}`}>
        <span className="text-gold-500 text-sm font-medium tracking-wide">{room.tagline}</span>
        <h3 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-playfair)] text-navy-700 mt-2 mb-4">
          {room.name}
        </h3>
        <div className="h-[2px] w-12 gold-gradient mb-4" />
        <p className="text-navy-400 leading-relaxed text-sm mb-6">{room.description}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {room.amenities.map((a) => (
            <span
              key={a}
              className="text-xs bg-gold-400/10 text-gold-700 px-3 py-1.5 rounded-full border border-gold-400/20"
            >
              {a}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-6 text-sm text-navy-400 mb-6">
          <span className="flex items-center gap-1.5">
            <Users className="w-4 h-4 text-gold-500" />
            {room.occupancy}
          </span>
          <span className="flex items-center gap-1.5">
            <BedDouble className="w-4 h-4 text-gold-500" />
            {room.size}
          </span>
        </div>

        <a
          href={`https://wa.me/${siteConfig.whatsapp}?text=Hi%2C%20I%20would%20like%20to%20book%20the%20${encodeURIComponent(room.name)}%20at%20Kings%20Houseboats.`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 gold-gradient text-navy-800 px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-gold-400/20 transition-all hover:scale-105 text-sm"
        >
          Inquire About This Room
          <ChevronRight className="w-4 h-4" />
        </a>
      </div>
    </motion.div>
  );
}

export function AccommodationPageClient() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/rooms/royal-suite.jpg"
          alt="Luxury Royal Suite bedroom with panoramic lake and mountain views at Kings Houseboats"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-navy-800/60" />
        <div className="relative z-10 text-center px-4">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-5 py-2 rounded-full text-xs font-semibold tracking-[0.2em] uppercase bg-white/10 backdrop-blur-sm text-gold-300 border border-gold-400/20 mb-4"
          >
            Our Rooms
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold font-[family-name:var(--font-playfair)] text-white text-shadow-lg"
          >
            Luxury Accommodation
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-white/70 mt-4 max-w-2xl mx-auto"
          >
            Exquisitely crafted rooms where traditional Kashmiri heritage meets modern luxury
          </motion.p>
        </div>
      </section>

      {/* Rooms */}
      <section className="py-20 md:py-28 bg-beige-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 md:space-y-28">
          {allRooms.map((room, i) => (
            <RoomCard key={room.name} room={room} index={i} />
          ))}
        </div>
      </section>

      {/* Common Amenities */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Included In Every Room"
            title="Standard Amenities"
          />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {commonAmenities.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3 p-4 rounded-xl border border-beige-300/50 bg-beige-50"
              >
                <div className="w-10 h-10 rounded-full bg-gold-400/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-gold-500" />
                </div>
                <span className="text-sm font-medium text-navy-600">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTABanner
        title="Find Your Perfect Room"
        subtitle="Contact us to check availability and book your luxury houseboat room on Nigeen Lake."
      />
    </>
  );
}
