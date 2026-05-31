"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Mountain, Flower2, TreePine, Sun, Camera,
  ShoppingBag, UtensilsCrossed, Ship, MapPin,
  Landmark, Tent,
} from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { CTABanner } from "@/components/shared/cta-banner";

const srinagarAttractions = [
  { name: "Nishat Garden", desc: "The 'Garden of Bliss' — a stunning terraced Mughal garden overlooking Dal Lake with twelve terraces representing the zodiac signs.", distance: "10 km", icon: Flower2 },
  { name: "Shalimar Garden", desc: "Emperor Jahangir's 'Abode of Love' — a magnificent Mughal garden famous for its cascading fountains, chinar trees, and romantic history.", distance: "12 km", icon: Flower2 },
  { name: "Hazratbal Shrine", desc: "A sacred marble shrine on the banks of Dal Lake, housing a relic believed to be the hair of Prophet Muhammad (PBUH). A spiritual landmark of Kashmir.", distance: "8 km", icon: Landmark },
  { name: "Pari Mahal", desc: "The 'Palace of Fairies' — a seven-terraced garden perched atop Zabarwan hills, offering panoramic views of Dal Lake and Srinagar city below.", distance: "9 km", icon: Mountain },
  { name: "Tulip Garden", desc: "Asia's largest tulip garden with over 1.5 million tulips in breathtaking bloom during spring (March–April). A photographer's paradise.", distance: "11 km", icon: Flower2 },
  { name: "Shankaracharya Temple", desc: "An ancient hilltop temple dedicated to Lord Shiva, dating back to 200 BC. Offers magnificent 360-degree views of the entire Kashmir Valley.", distance: "7 km", icon: Landmark },
];

const dayTrips = [
  { name: "Gulmarg", desc: "The 'Meadow of Flowers' transforms into a world-class ski resort in winter and a lush green paradise in summer. Home to the world's highest gondola ride at 4,200 metres, Gulmarg offers breathtaking views of Nanga Parbat and alpine meadows.", distance: "56 km · 1.5 hrs", icon: Mountain },
  { name: "Sonamarg", desc: "The 'Meadow of Gold' is the gateway to the great Himalayan passes. Famous for the stunning Thajiwas Glacier, this alpine valley is a trekker's paradise with snow-fed streams, wildflower meadows, and pristine mountain air.", distance: "80 km · 2.5 hrs", icon: Sun },
  { name: "Pahalgam", desc: "The 'Valley of Shepherds' is one of Kashmir's most beautiful retreats. Visit the Betaab Valley, take a pony ride through pine forests, explore Aru Valley, or simply sit by the gushing Lidder River and absorb the tranquility.", distance: "95 km · 3 hrs", icon: TreePine },
  { name: "Doodhpathri", desc: "The 'Valley of Milk' is a hidden gem — a vast, undulating meadow surrounded by dense pine forests at 2,730 metres. Less touristy than Gulmarg, it offers an authentic, peaceful Kashmir experience.", distance: "42 km · 1.5 hrs", icon: Tent },
  { name: "Yusmarg", desc: "A serene meadow nestled in the Pir Panjal range at 2,396 metres. Known for its untouched beauty, horse riding trails, and the nearby Doodh Ganga river, Yusmarg is perfect for those seeking off-the-beaten-path adventures.", distance: "47 km · 2 hrs", icon: Mountain },
];

const experiences = [
  { name: "Shikara Ride", desc: "Glide across the mirror-like waters of Nigeen Lake on a traditional hand-carved Shikara. Watch kingfishers dive, lotus flowers bloom, and the Zabarwan mountains turn golden at sunset — all from the comfort of your cushioned boat.", icon: Ship },
  { name: "Shopping in Srinagar", desc: "Explore Srinagar's vibrant markets for world-renowned Pashmina shawls, hand-knotted carpets, walnut wood carvings, saffron, and papier-mâché art. Our team can guide you to trusted artisan workshops.", icon: ShoppingBag },
  { name: "Kashmiri Cuisine Experience", desc: "Immerse yourself in an authentic Wazwan feast — a multi-course banquet of aromatic dishes like Rogan Josh, Gushtaba, Tabak Maaz, and Yakhni, prepared by master chefs using recipes passed through generations.", icon: UtensilsCrossed },
  { name: "Photography Tours", desc: "Kashmir is a photographer's dream. We arrange guided photo tours covering sunrise over Nigeen Lake, the old city's wooden architecture, Mughal gardens, and the dramatically lit Zabarwan mountains at golden hour.", icon: Camera },
  { name: "Cultural Experiences", desc: "Attend a traditional Sufiyana music performance, visit master carpet weavers, watch papier-mâché artists at work, or join a Kashmiri cooking class. We bring Kashmir's rich culture to life through immersive experiences.", icon: Landmark },
];

function AttractionCard({ item, index }: { item: typeof srinagarAttractions[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="bg-white rounded-xl p-6 shadow-md border border-beige-300/50 hover:shadow-xl hover:border-gold-400/30 transition-all duration-300 group"
    >
      <div className="w-12 h-12 rounded-full bg-gold-400/10 flex items-center justify-center mb-4 group-hover:bg-gold-400/20 transition-colors">
        <item.icon className="w-6 h-6 text-gold-500" />
      </div>
      <h3 className="text-lg font-semibold text-navy-700 font-[family-name:var(--font-playfair)] mb-2">
        {item.name}
      </h3>
      <p className="text-sm text-navy-400 leading-relaxed mb-3">{item.desc}</p>
      {"distance" in item && (
        <span className="inline-flex items-center gap-1 text-xs text-gold-600 font-medium bg-gold-400/10 px-3 py-1 rounded-full">
          <MapPin className="w-3 h-3" />
          {item.distance}
        </span>
      )}
    </motion.div>
  );
}

export function ThingsToDoPageClient() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[350px] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/hero/hero-lake-mountains.png"
          alt="Snow-capped Himalayan mountains and Nigeen Lake, the gateway to Kashmir adventures"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-navy-800/55" />
        <div className="relative z-10 text-center px-4">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-5 py-2 rounded-full text-xs font-semibold tracking-[0.2em] uppercase bg-white/10 backdrop-blur-sm text-gold-300 border border-gold-400/20 mb-4"
          >
            Explore Kashmir
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold font-[family-name:var(--font-playfair)] text-white text-shadow-lg"
          >
            Things To Do in Kashmir
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-white/70 mt-4 max-w-2xl mx-auto"
          >
            From snow-capped mountains to serene lake rides, Kashmir offers endless adventures
          </motion.p>
        </div>
      </section>

      {/* Srinagar Attractions */}
      <section className="py-20 md:py-28 bg-beige-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Srinagar"
            title="Srinagar Attractions"
            subtitle="Discover the iconic landmarks and cultural treasures of Srinagar, just a short drive from Kings Houseboats."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {srinagarAttractions.map((item, i) => (
              <AttractionCard key={item.name} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Day Trips */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Day Trips"
            title="Unforgettable Day Excursions"
            subtitle="Venture beyond Srinagar to explore Kashmir's most spectacular landscapes. Our travel desk arranges everything for you."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dayTrips.map((item, i) => (
              <AttractionCard key={item.name} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Experiences */}
      <section className="py-20 md:py-28 bg-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Experiences"
            title="Authentic Kashmiri Experiences"
            subtitle="Immerse yourself in the rich culture, cuisine, and traditions of Kashmir — curated exclusively for our guests."
            light
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {experiences.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="glass rounded-xl p-6 hover:bg-white/15 transition-all group"
              >
                <div className="w-12 h-12 rounded-full bg-gold-400/10 flex items-center justify-center mb-4 group-hover:bg-gold-400/20 transition-colors">
                  <item.icon className="w-6 h-6 text-gold-300" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 font-[family-name:var(--font-playfair)]">
                  {item.name}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTABanner
        title="Let Us Plan Your Kashmir Adventure"
        subtitle="Our travel desk arranges everything from day trips to cultural experiences. Get in touch to start planning."
      />
    </>
  );
}
