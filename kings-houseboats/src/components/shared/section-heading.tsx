"use client";

import { motion } from "framer-motion";
import { useInView } from "@/lib/hooks";
import { ReactNode } from "react";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
  children?: ReactNode;
}

export function SectionHeading({
  badge,
  title,
  subtitle,
  centered = true,
  light = false,
  children,
}: SectionHeadingProps) {
  const { ref, isInView } = useInView(0.2);

  return (
    <div
      ref={ref}
      className={`mb-12 md:mb-16 ${centered ? "text-center" : ""}`}
    >
      {badge && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <span
            className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-[0.15em] uppercase ${
              light
                ? "bg-white/10 text-gold-300 border border-gold-400/20"
                : "bg-gold-400/10 text-gold-600 border border-gold-400/20"
            }`}
          >
            {badge}
          </span>
        </motion.div>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={`text-3xl sm:text-4xl md:text-5xl font-bold font-[family-name:var(--font-playfair)] leading-tight ${
          light ? "text-white" : "text-navy-700"
        }`}
      >
        {title}
      </motion.h2>

      {/* Gold decorative line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
        className={`mt-4 mb-6 h-[2px] w-20 gold-gradient ${
          centered ? "mx-auto" : ""
        }`}
      />

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`text-base sm:text-lg max-w-2xl leading-relaxed ${
            centered ? "mx-auto" : ""
          } ${light ? "text-white/70" : "text-navy-400"}`}
        >
          {subtitle}
        </motion.p>
      )}

      {children}
    </div>
  );
}
