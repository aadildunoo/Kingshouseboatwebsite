"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { siteConfig } from "@/lib/constants";

export function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000);
    const tooltipTimer = setTimeout(() => setShowTooltip(true), 5000);
    const hideTooltip = setTimeout(() => setShowTooltip(false), 12000);
    return () => {
      clearTimeout(timer);
      clearTimeout(tooltipTimer);
      clearTimeout(hideTooltip);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3" id="whatsapp-fab">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            className="bg-white rounded-2xl shadow-2xl p-4 max-w-[260px] relative"
          >
            <button
              onClick={() => setShowTooltip(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              aria-label="Close tooltip"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            <p className="text-sm text-navy-700 font-medium pr-4">
              👋 Need help booking?
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Chat with us on WhatsApp for instant assistance!
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href={`https://wa.me/${siteConfig.whatsapp}?text=Hi%20Kings%20Houseboats%2C%20I%20would%20like%20to%20inquire%20about%20booking%20a%20stay.`}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 transition-shadow"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7 text-white" />
      </motion.a>
    </div>
  );
}
