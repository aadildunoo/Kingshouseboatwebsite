"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star, Heart, Shield, Award, Users, Utensils, Ship, Mountain, Sparkles, Clock } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { CTABanner } from "@/components/shared/cta-banner";
import { useInView } from "@/lib/hooks";

const whyChooseUs = [
  { icon: Star, title: "Award-Winning Hospitality", desc: "TripAdvisor Traveler's Choice with 4.8-star rating from 320+ genuine guest reviews across the globe." },
  { icon: Heart, title: "Authentic Kashmiri Warmth", desc: "Our family has welcomed guests for over five decades, offering personalized care that transforms visitors into lifelong friends." },
  { icon: Shield, title: "Heritage Craftsmanship", desc: "Every inch of our houseboat showcases master artisanship — from hand-carved walnut wood ceilings to crewel-embroidered textiles." },
  { icon: Award, title: "Prime Nigeen Lake Location", desc: "Situated on pristine Nigeen Lake, away from the bustle of Dal Lake, offering unmatched tranquility and crystal-clear waters." },
  { icon: Utensils, title: "Authentic Wazwan Cuisine", desc: "Our family chefs prepare traditional Kashmiri Wazwan cuisine — Rogan Josh, Gushtaba, Yakhni — using recipes passed through generations." },
  { icon: Ship, title: "Curated Experiences", desc: "From Shikara rides at sunrise to guided tours of Mughal gardens, we craft bespoke itineraries for every guest." },
];

const timeline = [
  { year: "1972", title: "The Beginning", desc: "Our family patriarch established the first Kings Houseboat on the serene waters of Nigeen Lake, beginning a legacy of Kashmiri hospitality." },
  { year: "1990", title: "Heritage Restoration", desc: "Major restoration with master craftsmen, preserving original walnut woodwork while adding modern comforts for discerning international travellers." },
  { year: "2010", title: "International Recognition", desc: "Earned widespread acclaim on global travel platforms, welcoming guests from over 40 countries and establishing Kings Houseboats as a premier Kashmir destination." },
  { year: "2022", title: "Traveler's Choice Award", desc: "Received the prestigious TripAdvisor Traveler's Choice Award, recognizing our consistently exceptional guest experiences and outstanding hospitality." },
  { year: "Present", title: "A Living Legacy", desc: "Today, the third generation continues our family tradition, blending timeless Kashmiri heritage with modern luxury on the pristine waters of Nigeen Lake." },
];

export function AboutPageClient() {
  const { ref: storyRef, isInView: storyInView } = useInView(0.2);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/lounge/royal-lounge.png"
          alt="Royal lounge of Kings Houseboats with ornate carved ceiling and crystal chandelier"
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
            Our Story
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold font-[family-name:var(--font-playfair)] text-white text-shadow-lg"
          >
            About Kings Houseboats
          </motion.h1>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 md:py-28 bg-beige-50" ref={storyRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={storyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-[0.15em] uppercase bg-gold-400/10 text-gold-600 border border-gold-400/20 mb-4">
                Heritage Since 1972
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-playfair)] text-navy-700 mb-6">
                A Floating Legacy of Kashmiri Warmth
              </h2>
              <div className="h-[2px] w-16 gold-gradient mb-6" />

              <div className="space-y-4 text-navy-500 leading-relaxed">
                <p>
                  The story of Kings Houseboats begins in 1972, when our family patriarch envisioned
                  a place where travellers from across the world could experience the genuine warmth
                  of Kashmiri culture while cradled on the crystalline waters of Nigeen Lake. What
                  started as a humble family endeavour has blossomed into one of Srinagar&apos;s most
                  celebrated heritage accommodations.
                </p>
                <p>
                  Unlike the crowded shores of Dal Lake, our location on Nigeen Lake offers an oasis
                  of tranquility. Here, the water is clearer, the mountains seem closer, and time
                  moves at a pace that invites reflection and genuine connection. Every morning begins
                  with the soft call of kingfishers and the gentle lapping of lake water against
                  century-old cedar wood — a symphony that no luxury hotel can replicate.
                </p>
                <p>
                  Our houseboat is not merely a place to sleep; it is a living museum of Kashmiri artistry.
                  Master craftsmen spent years carving the intricate walnut woodwork that adorns every
                  room — from the elaborate ceiling patterns inspired by Persian geometry to the delicate
                  floral motifs on door frames that tell stories of Kashmir&apos;s rich cultural heritage.
                  The crewel-embroidered curtains, papier-mâché artefacts, and hand-knotted carpets are
                  all sourced from local artisan families we have partnered with for generations.
                </p>
                <p>
                  Today, the third generation of our family carries forward this legacy with the same
                  passion and dedication. We have thoughtfully modernised our amenities — adding high-speed
                  WiFi, premium bedding, and contemporary bathrooms — while preserving the soul of our
                  heritage houseboat. Our commitment remains unchanged: to offer every guest a deeply
                  personal, culturally enriching, and utterly unforgettable stay on the pristine waters
                  of Nigeen Lake.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={storyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/hero/hero-entrance.png"
                  alt="Traditional Kashmiri entrance of Kings Houseboats with turquoise lattice work and carved pillars"
                  width={600}
                  height={400}
                  className="w-full h-[300px] object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src="/images/lounge/sitting-area.png"
                    alt="Cozy sitting area with TripAdvisor Traveler's Choice award"
                    width={300}
                    height={250}
                    className="w-full h-[200px] object-cover"
                  />
                </div>
                <div className="rounded-xl overflow-hidden shadow-lg">
                  <Image
                    src="/images/dining/dining-area.jpg"
                    alt="Kashmiri dining area with hand-carved wooden chairs and chandelier"
                    width={300}
                    height={250}
                    className="w-full h-[200px] object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Our Journey"
            title="Milestones in Heritage"
            subtitle="Five decades of crafting unforgettable experiences on the waters of Nigeen Lake."
          />

          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-gold-300 via-gold-400 to-gold-300" />

            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`relative flex items-start gap-6 md:gap-12 mb-12 last:mb-0 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : ""} pl-12 md:pl-0`}>
                  <span className="text-gold-500 font-bold text-lg font-[family-name:var(--font-playfair)]">
                    {item.year}
                  </span>
                  <h3 className="text-xl font-semibold text-navy-700 mt-1 font-[family-name:var(--font-playfair)]">
                    {item.title}
                  </h3>
                  <p className="text-navy-400 mt-2 text-sm leading-relaxed">{item.desc}</p>
                </div>

                <div className="absolute left-2.5 md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full gold-gradient border-4 border-white shadow-md mt-1" />

                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 md:py-28 bg-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Why Choose Us"
            title="The Kings Houseboats Difference"
            subtitle="Here's what sets us apart from every other accommodation in Kashmir."
            light
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((item, i) => (
              <motion.div
                key={item.title}
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
                  {item.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTABanner />
    </>
  );
}
