"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "@/lib/hooks";
import { siteConfig } from "@/lib/constants";

interface CTABannerProps {
  title?: string;
  subtitle?: string;
  bgImage?: string;
}

export function CTABanner({
  title = "Ready to Experience Kashmir?",
  subtitle = "Book your luxury houseboat stay on Nigeen Lake and create memories that last a lifetime.",
  bgImage = "/images/hero/hero-lake-mountains.png",
}: CTABannerProps) {
  const { ref, isInView } = useInView(0.2);

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
      id="cta-banner"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="absolute inset-0 bg-navy-800/80" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold font-[family-name:var(--font-playfair)] text-white mb-4 text-shadow-lg"
        >
          {title}
        </motion.h2>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="h-[2px] w-20 gold-gradient mx-auto mb-6"
        />

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg text-white/80 mb-10 max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/contact"
            className="gold-gradient text-navy-800 px-8 py-3.5 rounded-full font-semibold text-base hover:shadow-xl hover:shadow-gold-400/30 transition-all hover:scale-105"
          >
            Book Your Stay
          </Link>
          <a
            href={`https://wa.me/${siteConfig.whatsapp}?text=Hi%2C%20I%20am%20interested%20in%20booking%20Kings%20Houseboats.`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 text-white px-8 py-3.5 rounded-full font-semibold text-base hover:bg-green-500 hover:shadow-xl hover:shadow-green-500/20 transition-all hover:scale-105"
          >
            Chat on WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
