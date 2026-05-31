"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Wifi, Car, Users, UtensilsCrossed, Sparkles, Ship,
  Droplets, Headphones, ShirtIcon, MapPin, Star, ChevronDown,
  BedDouble, Eye, Mountain, Coffee, Camera, ShoppingBag,
  ChevronLeft, ChevronRight, Quote, HelpCircle, ChevronRight as ArrowRight,
  Phone, Mail,
} from "lucide-react";
import { useInView, useCountUp } from "@/lib/hooks";
import { SectionHeading } from "@/components/shared/section-heading";
import { CTABanner } from "@/components/shared/cta-banner";
import { siteConfig } from "@/lib/constants";
import { useState, useEffect, useCallback } from "react";
import { BookingWidget } from "@/components/booking/booking-widget";

/* ================================================================
   HERO SECTION
================================================================ */
function HeroSection() {
  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden" id="hero">
      {/* Background Image with Ken Burns */}
      <div className="absolute inset-0 animate-ken-burns">
        <Image
          src="/images/hero/hero-lake-mountains.png"
          alt="Kings Houseboats on Nigeen Lake with snow-capped Himalayan mountains, Srinagar, Kashmir"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={85}
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 hero-overlay" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gold-300/30 rounded-full"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.7,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-6"
        >
          <span className="inline-block px-5 py-2 rounded-full text-xs font-semibold tracking-[0.2em] uppercase bg-white/10 backdrop-blur-sm text-gold-300 border border-gold-400/20">
            ✦ Premium Heritage Houseboat · Since 1972
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-[family-name:var(--font-playfair)] text-white leading-[1.1] mb-6 text-shadow-lg"
        >
          Experience Royal Kashmiri
          <br />
          <span className="gold-text">Hospitality on Nigeen Lake</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          Discover luxury houseboat living on the tranquil waters of Nigeen Lake.
          Enjoy authentic Kashmiri hospitality, elegant interiors, breathtaking
          lake views, and unforgettable memories in Srinagar.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/contact"
            className="gold-gradient text-navy-800 px-8 py-4 rounded-full text-base font-semibold hover:shadow-2xl hover:shadow-gold-400/30 transition-all hover:scale-105 min-w-[200px]"
            id="hero-book-now"
          >
            Book Your Stay
          </Link>
          <a
            href={`https://wa.me/${siteConfig.whatsapp}?text=Hi%2C%20I%20am%20interested%20in%20booking%20Kings%20Houseboats.`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600/90 backdrop-blur-sm text-white px-8 py-4 rounded-full text-base font-semibold hover:bg-green-500 hover:shadow-xl hover:shadow-green-500/20 transition-all hover:scale-105 border border-green-400/20 min-w-[200px]"
            id="hero-whatsapp"
          >
            Contact on WhatsApp
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/50 text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown className="w-5 h-5 text-gold-300 scroll-indicator" />
      </motion.div>
    </section>
  );
}

/* ================================================================
   ABOUT PREVIEW SECTION
================================================================ */
function AboutSection() {
  const { count: yearsCount, ref: yearsRef } = useCountUp(50, 2000);
  const { count: guestsCount, ref: guestsRef } = useCountUp(5000, 2000);
  const { count: roomsCount, ref: roomsRef } = useCountUp(8, 1500);
  const { ref: ratingRef } = useInView(0.3);

  const { ref: contentRef, isInView: contentInView } = useInView(0.2);

  return (
    <section className="py-20 md:py-28 bg-beige-50 relative overflow-hidden" id="about-preview">
      {/* Decorative bg */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-400/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-navy-400/5 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={contentRef} className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={contentInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-navy-800/20">
              <Image
                src="/images/hero/hero-entrance.png"
                alt="Grand entrance of Kings Houseboats featuring traditional Kashmiri lattice woodwork and turquoise pillars"
                width={600}
                height={500}
                className="object-cover w-full h-[400px] sm:h-[500px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-800/30 to-transparent" />
            </div>
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={contentInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -bottom-6 -right-4 sm:right-4 glass-dark rounded-2xl p-5 shadow-xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 gold-gradient rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-navy-800" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gold-300 font-[family-name:var(--font-playfair)]">
                    4.8/5
                  </p>
                  <p className="text-xs text-white/60">320+ Reviews</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={contentInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-[0.15em] uppercase bg-gold-400/10 text-gold-600 border border-gold-400/20 mb-4">
              Our Heritage
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-playfair)] text-navy-700 mb-6 leading-tight">
              A Legacy of Kashmiri Warmth on the Waters of Nigeen Lake
            </h2>
            <div className="h-[2px] w-16 gold-gradient mb-6" />
            <p className="text-navy-400 leading-relaxed mb-4 text-base">
              Nestled on the pristine waters of Nigeen Lake, Kings Houseboats is a
              living testament to over five decades of authentic Kashmiri hospitality.
              Our heritage houseboat, adorned with exquisite hand-carved walnut
              woodwork and traditional Kashmiri craftsmanship, offers guests an
              experience unlike any hotel or resort.
            </p>
            <p className="text-navy-400 leading-relaxed mb-8 text-base">
              Wake to the serene reflection of snow-capped Zabarwan mountains on
              crystal-clear waters, savour traditional Wazwan cuisine prepared by
              our family chefs, and let the gentle rhythm of Nigeen Lake become the
              soundtrack to your most cherished memories. Whether you seek a romantic
              honeymoon retreat, a family adventure, or a solo journey of discovery,
              Kings Houseboats is your sanctuary in paradise.
            </p>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 gold-gradient text-navy-800 px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-gold-400/20 transition-all hover:scale-105 text-sm"
            >
              Discover Our Story
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
          {[
            { ref: yearsRef, count: yearsCount, suffix: "+", label: "Years of Heritage", icon: Sparkles },
            { ref: guestsRef, count: guestsCount, suffix: "+", label: "Happy Guests", icon: Users },
            { ref: roomsRef, count: roomsCount, suffix: "", label: "Luxury Rooms", icon: BedDouble },
            { ref: ratingRef, count: 4.8, suffix: "/5", label: "Guest Rating", icon: Star, isFixed: true },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              ref={stat.ref}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center p-6 rounded-2xl bg-white shadow-lg shadow-navy-800/5 border border-beige-300/50 hover:shadow-xl hover:border-gold-400/30 transition-all group"
            >
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gold-400/10 flex items-center justify-center group-hover:bg-gold-400/20 transition-colors">
                <stat.icon className="w-6 h-6 text-gold-500" />
              </div>
              <p className="text-3xl font-bold text-navy-700 font-[family-name:var(--font-playfair)]">
                {stat.isFixed ? "4.8" : stat.count}{stat.suffix}
              </p>
              <p className="text-sm text-navy-400 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   ACCOMMODATION PREVIEW
================================================================ */
const rooms = [
  {
    name: "Royal Suite",
    image: "/images/rooms/royal-suite.jpg",
    description: "Our most exquisite room with panoramic lake and mountain views, hand-carved walnut wood ceiling, and premium Kashmiri furnishings.",
    amenities: ["Lake & Mountain View", "King Bed", "Private Seating", "En-suite Bath"],
    occupancy: "2 Adults + 1 Child",
  },
  {
    name: "Deluxe Lake View",
    image: "/images/rooms/deluxe-lake-view.jpg",
    description: "Twin-bedded room overlooking the tranquil Nigeen Lake, featuring traditional woodwork ceiling and crewel-embroidered bedding.",
    amenities: ["Direct Lake View", "Twin Beds", "Writing Desk", "Hot Water"],
    occupancy: "2 Adults",
  },
  {
    name: "Heritage Room",
    image: "/images/rooms/heritage-room.png",
    description: "A spacious room blending authentic Kashmiri heritage with comfort. Intricate wood paneling and cozy seating area with lake glimpses.",
    amenities: ["Heritage Decor", "Double Bed", "Sitting Area", "Room Service"],
    occupancy: "2 Adults + 1 Child",
  },
];

function AccommodationSection() {
  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden" id="accommodation-preview">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Accommodation"
          title="Luxury Rooms on the Lake"
          subtitle="Each room is a masterpiece of traditional Kashmiri craftsmanship, offering lake views, hand-carved woodwork, and modern comforts for an unforgettable stay."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room, i) => (
            <motion.div
              key={room.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="group bg-beige-50 rounded-2xl overflow-hidden shadow-lg shadow-navy-800/5 hover:shadow-2xl hover:shadow-navy-800/10 transition-all duration-500 border border-beige-300/50"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={room.image}
                  alt={`${room.name} at Kings Houseboats - luxury houseboat room on Nigeen Lake, Srinagar`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-800/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-4 right-4 bg-gold-400/90 text-navy-800 text-xs font-bold px-3 py-1.5 rounded-full">
                  Lake View
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold font-[family-name:var(--font-playfair)] text-navy-700 mb-2">
                  {room.name}
                </h3>
                <p className="text-sm text-navy-400 mb-4 leading-relaxed">
                  {room.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {room.amenities.map((a) => (
                    <span
                      key={a}
                      className="text-xs bg-gold-400/10 text-gold-700 px-3 py-1 rounded-full border border-gold-400/20"
                    >
                      {a}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-beige-300/50">
                  <span className="text-xs text-navy-400 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    {room.occupancy}
                  </span>
                  <Link
                    href="/accommodation"
                    className="text-sm font-semibold text-gold-600 hover:text-gold-500 flex items-center gap-1 transition-colors"
                  >
                    View Details
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/accommodation"
            className="inline-flex items-center gap-2 bg-navy-700 text-white px-8 py-3.5 rounded-full font-semibold hover:bg-navy-600 transition-colors hover:shadow-lg text-sm"
          >
            View All Rooms
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   AMENITIES SECTION
================================================================ */
const amenities = [
  { icon: Wifi, label: "Free WiFi", desc: "High-speed connectivity" },
  { icon: Car, label: "Airport Transfers", desc: "Complimentary pickup" },
  { icon: Users, label: "Family Rooms", desc: "Spacious accommodation" },
  { icon: UtensilsCrossed, label: "Kashmiri Cuisine", desc: "Authentic Wazwan" },
  { icon: Sparkles, label: "Housekeeping", desc: "Daily room service" },
  { icon: Ship, label: "Shikara Rides", desc: "Lake excursions" },
  { icon: Droplets, label: "Hot Water", desc: "24/7 availability" },
  { icon: Headphones, label: "24/7 Support", desc: "Always available" },
  { icon: ShirtIcon, label: "Laundry Service", desc: "Same-day delivery" },
  { icon: MapPin, label: "Sightseeing", desc: "Tour assistance" },
  { icon: Coffee, label: "Room Service", desc: "In-room dining" },
  { icon: Eye, label: "Travel Desk", desc: "Trip planning" },
];

function AmenitiesSection() {
  return (
    <section className="py-20 md:py-28 bg-navy-800 relative overflow-hidden" id="amenities">
      {/* Decorative */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gold-400/5 rounded-full blur-[200px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Amenities"
          title="Everything You Need"
          subtitle="From complimentary airport transfers to enchanting Shikara rides, every detail is curated for your comfort and delight."
          light
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {amenities.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              className="glass rounded-xl p-5 text-center group hover:bg-white/15 transition-all duration-300 cursor-default"
            >
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gold-400/10 flex items-center justify-center group-hover:bg-gold-400/20 group-hover:scale-110 transition-all duration-300">
                <item.icon className="w-6 h-6 text-gold-300" />
              </div>
              <h3 className="text-sm font-semibold text-white mb-1">{item.label}</h3>
              <p className="text-xs text-white/50">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   GALLERY PREVIEW
================================================================ */
const galleryPreview = [
  { src: "/images/lounge/royal-lounge.png", alt: "Royal lounge with chandeliers and carved walnut ceiling at Kings Houseboats" },
  { src: "/images/rooms/royal-suite.jpg", alt: "Luxury bedroom with panoramic lake and mountain views" },
  { src: "/images/dining/dining-area.jpg", alt: "Traditional Kashmiri dining area with hand-carved chairs" },
  { src: "/images/lounge/carved-entrance.jpg", alt: "Intricately carved walnut wood entrance of the houseboat" },
  { src: "/images/rooms/deluxe-lake-view.jpg", alt: "Deluxe room overlooking Nigeen Lake with reflection views" },
  { src: "/images/lounge/sitting-area.png", alt: "Cozy sitting area with Traveler's Choice award display" },
];

function GalleryPreview() {
  return (
    <section className="py-20 md:py-28 bg-beige-50 relative" id="gallery-preview">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Gallery"
          title="A Glimpse of Paradise"
          subtitle="Explore the timeless beauty of Kings Houseboats through our collection of images showcasing luxury interiors, serene lake views, and authentic Kashmiri craftsmanship."
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryPreview.map((img, i) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`relative overflow-hidden rounded-xl group cursor-pointer ${
                i === 0 ? "md:col-span-2 md:row-span-2 h-64 md:h-full" : "h-48 md:h-56"
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                sizes={i === 0 ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 50vw, 33vw"}
              />
              <div className="absolute inset-0 bg-navy-800/0 group-hover:bg-navy-800/40 transition-all duration-500 flex items-center justify-center">
                <span className="text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  View Gallery
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 gold-gradient text-navy-800 px-8 py-3.5 rounded-full font-semibold hover:shadow-lg hover:shadow-gold-400/20 transition-all hover:scale-105 text-sm"
          >
            View Full Gallery
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   TESTIMONIALS / GUEST REVIEWS
================================================================ */
const reviews = [
  {
    name: "Sarah Mitchell",
    country: "United Kingdom",
    rating: 5,
    text: "An absolutely magical experience! The houseboat is beautifully maintained with the most intricate Kashmiri woodwork I've ever seen. Waking up to the serene Nigeen Lake was pure bliss. The staff treated us like family, and the traditional Kashmiri dinner was unforgettable. This is not just accommodation; it's a cultural immersion.",
  },
  {
    name: "Rajesh & Priya Kumar",
    country: "Mumbai, India",
    rating: 5,
    text: "We chose Kings Houseboats for our family vacation and it exceeded every expectation. The kids loved the Shikara rides, the rooms were spacious and spotlessly clean, and the food — especially the Rogan Josh — was the best we've had anywhere. The views of the Zabarwan mountains from our room were spectacular.",
  },
  {
    name: "Emma & James Thompson",
    country: "Australia",
    rating: 5,
    text: "The most romantic stay we could have asked for during our honeymoon. From the moment we were picked up from the airport, everything was perfect. The lake at sunset, the hand-carved interiors, the warm Kashmiri hospitality — it was like stepping into a fairy tale. We'll treasure these memories forever.",
  },
  {
    name: "David Moreau",
    country: "France",
    rating: 5,
    text: "As a travel photographer, I've stayed in many unique accommodations worldwide. Kings Houseboats stands out for its authenticity and warmth. Every corner is photogenic — the carved ceilings, the turquoise lattice work, the lake reflections at dawn. The hosts arranged an incredible guided tour of old Srinagar. Highly recommended.",
  },
  {
    name: "Akiko Tanaka",
    country: "Japan",
    rating: 5,
    text: "A hidden gem on Nigeen Lake! The tranquility here is unmatched. I came seeking peace and found so much more — genuine kindness, delicious traditional meals served with care, and a window view that belongs on a postcard. The Shikara ride to the floating market was a highlight of my entire India trip.",
  },
];

function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const goNext = useCallback(() => {
    setCurrent((prev) => (prev + 1) % reviews.length);
  }, []);

  const goPrev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + reviews.length) % reviews.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(goNext, 6000);
    return () => clearInterval(interval);
  }, [goNext]);

  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden" id="testimonials">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-80 h-80 bg-gold-400 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Testimonials"
          title="What Our Guests Say"
          subtitle="Heartfelt words from travellers around the world who have experienced the magic of Kings Houseboats."
        />

        <div className="relative">
          <div className="overflow-hidden">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-beige-50 rounded-2xl p-8 md:p-12 shadow-lg border border-beige-300/50 text-center"
            >
              <Quote className="w-10 h-10 text-gold-300 mx-auto mb-6" />
              <p className="text-navy-600 text-base md:text-lg leading-relaxed mb-8 italic">
                &ldquo;{reviews[current].text}&rdquo;
              </p>
              <div className="flex items-center justify-center gap-1 mb-4">
                {[...Array(reviews[current].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-gold-400 fill-gold-400" />
                ))}
              </div>
              <p className="font-semibold text-navy-700 font-[family-name:var(--font-playfair)] text-lg">
                {reviews[current].name}
              </p>
              <p className="text-sm text-navy-400 mt-1">{reviews[current].country}</p>
            </motion.div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={goPrev}
              className="w-10 h-10 rounded-full border border-navy-200 flex items-center justify-center hover:bg-navy-700 hover:text-white hover:border-navy-700 transition-all text-navy-400"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    i === current ? "bg-gold-400 w-8" : "bg-navy-200 hover:bg-navy-300"
                  }`}
                  aria-label={`Go to review ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={goNext}
              className="w-10 h-10 rounded-full border border-navy-200 flex items-center justify-center hover:bg-navy-700 hover:text-white hover:border-navy-700 transition-all text-navy-400"
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   THINGS TO DO PREVIEW
================================================================ */
const destinations = [
  { name: "Gulmarg", distance: "56 km", desc: "Ski paradise & gondola rides", icon: Mountain },
  { name: "Shalimar Garden", distance: "12 km", desc: "Mughal heritage garden", icon: Sparkles },
  { name: "Pahalgam", distance: "95 km", desc: "Valley of Shepherds", icon: Mountain },
  { name: "Shikara Ride", distance: "On-site", desc: "Lake excursion on traditional boat", icon: Ship },
  { name: "Kashmiri Cuisine", distance: "On-site", desc: "Authentic Wazwan dining", icon: UtensilsCrossed },
  { name: "Local Shopping", distance: "5 km", desc: "Handicrafts & pashmina", icon: ShoppingBag },
];

function ThingsToDoPreview() {
  return (
    <section className="py-20 md:py-28 bg-beige-50 relative" id="things-to-do-preview">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Explore Kashmir"
          title="Things To Do"
          subtitle="From enchanting Shikara rides on Nigeen Lake to snow-capped adventures in Gulmarg, Kashmir offers endless experiences waiting to be discovered."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest, i) => (
            <motion.div
              key={dest.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-white rounded-xl p-6 shadow-md border border-beige-300/50 hover:shadow-xl hover:border-gold-400/30 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-full bg-gold-400/10 flex items-center justify-center mb-4 group-hover:bg-gold-400/20 transition-colors">
                <dest.icon className="w-6 h-6 text-gold-500" />
              </div>
              <h3 className="text-lg font-semibold text-navy-700 font-[family-name:var(--font-playfair)] mb-1">
                {dest.name}
              </h3>
              <p className="text-sm text-navy-400 mb-3">{dest.desc}</p>
              <span className="text-xs text-gold-600 font-medium bg-gold-400/10 px-3 py-1 rounded-full">
                {dest.distance}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/things-to-do"
            className="inline-flex items-center gap-2 bg-navy-700 text-white px-8 py-3.5 rounded-full font-semibold hover:bg-navy-600 transition-colors hover:shadow-lg text-sm"
          >
            Explore All Activities
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   FAQ PREVIEW
================================================================ */
const faqs = [
  {
    q: "What is the best houseboat in Nigeen Lake?",
    a: "Kings Houseboats is consistently rated among the best houseboats on Nigeen Lake, Srinagar. With a 4.8-star rating from 320+ guests and a TripAdvisor Traveler's Choice award, we offer luxury heritage accommodation, stunning lake views, authentic cuisine, and warm Kashmiri hospitality that sets us apart.",
  },
  {
    q: "How far is Kings Houseboats from Srinagar Airport?",
    a: "Kings Houseboats is approximately 18 kilometres from Sheikh ul-Alam International Airport (Srinagar Airport), which is about a 30-40 minute drive. We offer complimentary airport pickup and drop-off services for all our guests.",
  },
  {
    q: "Are airport transfers available?",
    a: "Yes! We provide complimentary airport transfers for all guests. Our driver will meet you at the airport with a welcome sign and escort you directly to our houseboat on Nigeen Lake. Departure transfers are also included in your stay.",
  },
  {
    q: "Is Kings Houseboats suitable for families?",
    a: "Absolutely! Kings Houseboats is perfect for families of all sizes. We have spacious family rooms, child-friendly meals, and activities like Shikara rides that children love. The calm waters of Nigeen Lake and the warm hospitality make it an ideal family destination.",
  },
];

function FAQPreview() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 md:py-28 bg-white" id="faq-preview">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="FAQs"
          title="Frequently Asked Questions"
          subtitle="Find answers to common questions about staying at Kings Houseboats on Nigeen Lake."
        />

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="border border-beige-300 rounded-xl overflow-hidden hover:border-gold-400/40 transition-colors"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
                aria-expanded={openIndex === i}
              >
                <span className="font-medium text-navy-700 pr-4 text-sm md:text-base flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-gold-400 shrink-0" />
                  {faq.q}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gold-400 shrink-0 transition-transform duration-300 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <motion.div
                initial={false}
                animate={{
                  height: openIndex === i ? "auto" : 0,
                  opacity: openIndex === i ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="px-5 pb-5 pl-13 text-navy-400 text-sm leading-relaxed">
                  {faq.a}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 text-gold-600 hover:text-gold-500 font-semibold text-sm transition-colors"
          >
            View All FAQs
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   CONTACT CTA SECTION
================================================================ */
function ContactCTA() {
  const { ref, isInView } = useInView(0.2);

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
      id="contact-cta"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(/images/lounge/royal-lounge.png)` }}
      />
      <div className="absolute inset-0 bg-navy-800/85" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="inline-block px-5 py-2 rounded-full text-xs font-semibold tracking-[0.15em] uppercase bg-white/10 text-gold-300 border border-gold-400/20 mb-6"
        >
          Get In Touch
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold font-[family-name:var(--font-playfair)] text-white mb-8 text-shadow-lg"
        >
          Begin Your Kashmiri Journey Today
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="grid sm:grid-cols-3 gap-4 mb-10"
        >
          <a
            href={`tel:${siteConfig.phone}`}
            className="glass rounded-xl p-5 hover:bg-white/15 transition-all group"
          >
            <Phone className="w-8 h-8 text-gold-300 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <p className="text-white font-medium text-sm">Call Us</p>
            <p className="text-white/50 text-xs mt-1">{siteConfig.phone}</p>
          </a>
          <a
            href={`https://wa.me/${siteConfig.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="glass rounded-xl p-5 hover:bg-white/15 transition-all group"
          >
            <Phone className="w-8 h-8 text-green-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <p className="text-white font-medium text-sm">WhatsApp</p>
            <p className="text-white/50 text-xs mt-1">Chat Now</p>
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="glass rounded-xl p-5 hover:bg-white/15 transition-all group"
          >
            <Mail className="w-8 h-8 text-gold-300 mx-auto mb-2 group-hover:scale-110 transition-transform" />
            <p className="text-white font-medium text-sm">Email</p>
            <p className="text-white/50 text-xs mt-1">{siteConfig.email}</p>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
        >
          <Link
            href="/contact"
            className="gold-gradient text-navy-800 px-10 py-4 rounded-full text-base font-semibold hover:shadow-2xl hover:shadow-gold-400/30 transition-all hover:scale-105 inline-block"
          >
            Send Us an Inquiry
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ================================================================
   MAIN HOME PAGE
================================================================ */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BookingWidget />
      <AboutSection />
      <AccommodationSection />
      <AmenitiesSection />
      <GalleryPreview />
      <CTABanner
        title="Your Dream Kashmir Getaway Awaits"
        subtitle="Let us craft the perfect houseboat experience on Nigeen Lake for you and your loved ones."
        bgImage="/images/exterior/heritage-exterior.jpg"
      />
      <TestimonialsSection />
      <ThingsToDoPreview />
      <FAQPreview />
      <ContactCTA />
    </>
  );
}
