"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown, HelpCircle, Search } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { CTABanner } from "@/components/shared/cta-banner";
import { getFAQSchema } from "@/lib/schema";

const faqs = [
  {
    question: "What is the best houseboat in Nigeen Lake?",
    answer: "Kings Houseboats is consistently rated among the best houseboats on Nigeen Lake, Srinagar. With a 4.8-star rating from over 320 guests and a TripAdvisor Traveler's Choice Award, we offer luxury heritage accommodation featuring hand-carved walnut woodwork, stunning lake views, authentic Kashmiri cuisine, and warm family-run hospitality. Our location on the pristine Nigeen Lake — known for clearer waters and more tranquility than Dal Lake — sets us apart from other houseboats in Srinagar.",
  },
  {
    question: "How far is Kings Houseboats from Srinagar Airport?",
    answer: "Kings Houseboats is approximately 18 kilometres from Sheikh ul-Alam International Airport (Srinagar Airport), which is about a 30–40 minute drive depending on traffic. We provide complimentary airport pickup and drop-off services for all guests. Our driver will meet you at the airport arrivals hall with a welcome sign and comfortably escort you to our houseboat on Nigeen Lake.",
  },
  {
    question: "Are airport transfers available?",
    answer: "Yes, we provide complimentary airport transfers for all our guests. Upon booking confirmation, we will share your dedicated driver's contact details. The driver will be waiting at the airport with a personalised welcome sign. This service includes both arrival pickup and departure drop-off, ensuring a smooth and hassle-free journey to and from Nigeen Lake.",
  },
  {
    question: "Is WiFi available at Kings Houseboats?",
    answer: "Yes, we offer free high-speed WiFi throughout the houseboat, including in all guest rooms, the lounge, dining area, and the outdoor deck. The connection is reliable for video calls, streaming, and regular internet browsing, so you can stay connected while enjoying the serenity of Nigeen Lake.",
  },
  {
    question: "Do you offer sightseeing packages?",
    answer: "Absolutely! Our dedicated travel desk can arrange comprehensive sightseeing packages covering all major attractions including Gulmarg (56 km), Pahalgam (95 km), Sonamarg (80 km), Mughal Gardens (Nishat, Shalimar, Pari Mahal), and local Srinagar attractions. We work with experienced, English-speaking local guides and provide comfortable transport. Packages can be customised based on your interests and duration of stay.",
  },
  {
    question: "Is Kings Houseboats suitable for families?",
    answer: "Kings Houseboats is an excellent choice for families. We offer spacious family rooms that comfortably accommodate parents and children, with extra bedding available on request. Our calm location on Nigeen Lake is safe and peaceful, and children love the Shikara rides. We also prepare child-friendly meals alongside our traditional Kashmiri cuisine. Many families have rated us as the highlight of their Kashmir vacation.",
  },
  {
    question: "What kind of food is served?",
    answer: "We serve a delightful mix of authentic Kashmiri Wazwan cuisine and Indian/Continental dishes. Our family chef prepares traditional specialties including Rogan Josh, Gushtaba, Yakhni, Dum Aloo, and Tabak Maaz using recipes passed through generations. Breakfast includes freshly baked Kashmiri bread (lavasa/tsochwör), omelettes, seasonal fruits, and tea/coffee. We also accommodate dietary preferences and restrictions with advance notice.",
  },
  {
    question: "What is the best time to visit Kashmir?",
    answer: "Kashmir is beautiful year-round, each season offering a unique experience. Spring (March–May) brings tulips and blossoming gardens. Summer (June–August) is the peak season with pleasant temperatures of 25–30°C, ideal for sightseeing and Shikara rides. Autumn (September–November) transforms Kashmir into a golden wonderland with chinar trees. Winter (December–February) covers everything in pristine snow, perfect for skiing in Gulmarg. We recommend April–October for first-time visitors.",
  },
  {
    question: "How do I book a stay at Kings Houseboats?",
    answer: "You can book your stay through multiple channels: 1) WhatsApp us directly for instant communication and booking; 2) Fill out the inquiry form on our Contact page; 3) Call us directly; or 4) Email us at our official email address. We recommend booking at least 2–3 weeks in advance during peak season (April–October) to secure your preferred room type and dates.",
  },
  {
    question: "Do you provide Shikara rides?",
    answer: "Yes, Shikara rides are one of the signature experiences we offer. Our personal Shikara boats are available for guests to enjoy rides on the serene Nigeen Lake. You can take a sunrise ride for stunning mountain reflections, visit the floating vegetable market, or enjoy a romantic sunset cruise. The experience of gliding through crystal-clear waters with the Zabarwan mountains as your backdrop is truly unforgettable.",
  },
  {
    question: "Is laundry service available?",
    answer: "Yes, we offer laundry service for all guests. Clothes handed in by morning are typically returned by evening the same day. This is especially convenient for travellers on extended trips through Kashmir who want to pack light.",
  },
  {
    question: "What is the check-in and check-out time?",
    answer: "Our standard check-in time is 2:00 PM and check-out time is 11:00 AM. Early check-in and late check-out can be arranged based on availability — please let us know in advance and we'll do our best to accommodate your schedule.",
  },
  {
    question: "Is Kings Houseboats suitable for honeymoon couples?",
    answer: "Kings Houseboats is one of the most romantic destinations in Kashmir for honeymoon couples. Our Royal Suite offers complete privacy with panoramic lake and mountain views, perfect for intimate moments. We can arrange special touches like flower decoration, candle-lit dinners on the deck, private Shikara rides at sunset, and Kashmiri Kahwa tea for two under the stars. Many couples describe their stay as the most magical part of their honeymoon.",
  },
  {
    question: "What safety measures are in place?",
    answer: "Guest safety is our top priority. Our houseboat is equipped with fire safety equipment, life jackets, first-aid kits, and well-maintained structural integrity. The Nigeen Lake area is well-lit and monitored. Our staff is trained in emergency procedures and we maintain relationships with local medical facilities. The calm waters of Nigeen Lake are inherently safe, and our experienced team ensures your peace of mind throughout your stay.",
  },
  {
    question: "Can you arrange a Wazwan feast?",
    answer: "Yes! We can arrange an authentic multi-course Kashmiri Wazwan feast for our guests. This traditional banquet features a sequence of aromatic dishes including Methi Maaz, Tabak Maaz, Seekh Kebabs, Rogan Josh, Aab Gosht, Gushtaba, and more — all prepared by our experienced family chef. This is a must-try culinary experience for food enthusiasts visiting Kashmir. Please request at least one day in advance.",
  },
];

export function FAQPageClient() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Inject FAQ Schema
  const faqSchemaData = getFAQSchema(
    faqs.map((f) => ({ question: f.question, answer: f.answer }))
  );

  return (
    <>
      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaData) }}
      />

      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-navy-800">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-20 w-80 h-80 bg-gold-400 rounded-full blur-[120px]" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-5 py-2 rounded-full text-xs font-semibold tracking-[0.2em] uppercase bg-white/10 text-gold-300 border border-gold-400/20 mb-4"
          >
            Help Center
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold font-[family-name:var(--font-playfair)] text-white mb-4"
          >
            Frequently Asked Questions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/60 max-w-2xl mx-auto mb-8"
          >
            Everything you need to know about staying at Kings Houseboats on Nigeen Lake, Srinagar.
          </motion.p>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative max-w-xl mx-auto"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-300" />
            <input
              type="text"
              placeholder="Search for a question..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setOpenIndex(null);
              }}
              className="w-full pl-12 pr-4 py-3.5 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-gold-400/50 focus:bg-white/15 transition-all"
              id="faq-search"
            />
          </motion.div>
        </div>
      </section>

      {/* FAQ List */}
      <section className="py-16 md:py-24 bg-beige-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12">
              <HelpCircle className="w-12 h-12 text-navy-200 mx-auto mb-4" />
              <p className="text-navy-400">No questions match your search. Try a different term.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredFaqs.map((faq, i) => (
                <motion.div
                  key={faq.question}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03 }}
                  className="bg-white rounded-xl border border-beige-300/50 hover:border-gold-400/40 transition-colors shadow-sm"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left"
                    aria-expanded={openIndex === i}
                  >
                    <span className="font-medium text-navy-700 pr-4 text-sm md:text-base flex items-start gap-3">
                      <HelpCircle className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                      {faq.question}
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
                    <div className="px-5 pb-5 pl-13">
                      <div className="h-[1px] bg-beige-300/50 mb-4" />
                      <p className="text-navy-400 text-sm leading-relaxed">{faq.answer}</p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <CTABanner
        title="Still Have Questions?"
        subtitle="We're here to help. Reach out via WhatsApp, call, or email and our team will respond promptly."
      />
    </>
  );
}
