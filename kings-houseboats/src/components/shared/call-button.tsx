"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { siteConfig } from "@/lib/constants";

export function CallButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.a
      href={`tel:${siteConfig.phone}`}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 left-6 z-50 w-14 h-14 bg-navy-600 rounded-full flex items-center justify-center shadow-lg shadow-navy-600/30 hover:shadow-xl hover:bg-navy-500 transition-all md:hidden"
      aria-label="Call Kings Houseboats"
      id="call-fab"
    >
      <Phone className="w-6 h-6 text-gold-300" />
    </motion.a>
  );
}
