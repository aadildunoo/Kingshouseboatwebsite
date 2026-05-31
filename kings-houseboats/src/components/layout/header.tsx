"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Anchor } from "lucide-react";
import { navLinks, siteConfig } from "@/lib/constants";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-navy-800/95 backdrop-blur-xl shadow-2xl shadow-navy-900/50 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group" id="header-logo">
            <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center shadow-lg shadow-gold-400/20 group-hover:shadow-gold-400/40 transition-shadow">
              <Anchor className="w-5 h-5 text-navy-800" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-white font-[family-name:var(--font-playfair)] tracking-wide">
                Kings Houseboats
              </h1>
              <p className="text-[10px] text-gold-300 tracking-[0.2em] uppercase hidden sm:block">
                Nigeen Lake · Srinagar
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1" id="desktop-nav">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                  pathname === link.href
                    ? "text-gold-300 bg-gold-400/10"
                    : "text-white/80 hover:text-gold-300 hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:${siteConfig.phone}`}
              className="flex items-center gap-2 text-sm text-white/80 hover:text-gold-300 transition-colors"
              id="header-phone"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden xl:inline">Call Now</span>
            </a>
            <Link
              href="/contact"
              className="gold-gradient text-navy-800 px-6 py-2.5 rounded-full text-sm font-semibold hover:shadow-lg hover:shadow-gold-400/30 transition-all duration-300 hover:scale-105"
              id="header-book-now"
            >
              Book Your Stay
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Toggle navigation menu"
            id="mobile-menu-toggle"
          >
            {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden fixed inset-0 top-0 bg-navy-800/98 backdrop-blur-2xl z-40"
          >
            <div className="flex flex-col items-center justify-center h-full gap-2 px-6">
              {/* Close button at top */}
              <button
                onClick={() => setIsMobileOpen(false)}
                className="absolute top-5 right-4 text-white p-2 hover:bg-white/10 rounded-lg"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Logo */}
              <div className="mb-8 text-center">
                <div className="w-14 h-14 rounded-full gold-gradient flex items-center justify-center mx-auto mb-3 shadow-lg shadow-gold-400/30">
                  <Anchor className="w-7 h-7 text-navy-800" />
                </div>
                <p className="text-gold-300 text-xs tracking-[0.3em] uppercase">
                  Nigeen Lake · Srinagar
                </p>
              </div>

              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileOpen(false)}
                    className={`block text-center text-lg py-3 px-8 rounded-xl transition-all ${
                      pathname === link.href
                        ? "text-gold-300 bg-gold-400/10 font-semibold"
                        : "text-white/80 hover:text-gold-300"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
                className="mt-6 flex flex-col gap-3 w-full max-w-xs"
              >
                <a
                  href={`https://wa.me/${siteConfig.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-full font-semibold hover:bg-green-500 transition-colors"
                >
                  WhatsApp Us
                </a>
                <Link
                  href="/contact"
                  onClick={() => setIsMobileOpen(false)}
                  className="flex items-center justify-center gap-2 gold-gradient text-navy-800 py-3 rounded-full font-semibold"
                >
                  Book Your Stay
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
