"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxProps {
  images: { src: string; alt: string }[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export function Lightbox({ images, initialIndex, isOpen, onClose }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, goNext, goPrev]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={onClose}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Counter */}
          <div className="absolute top-4 left-4 z-10 text-white/60 text-sm bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-sm">
            {currentIndex + 1} / {images.length}
          </div>

          {/* Previous */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            className="absolute left-4 z-10 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Image */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="relative w-full h-full max-w-5xl max-h-[85vh] mx-16 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 80vw"
              priority
            />
          </motion.div>

          {/* Next */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            className="absolute right-4 z-10 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Alt text */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm max-w-md text-center">
            {images[currentIndex].alt}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
