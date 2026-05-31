import Link from "next/link";
import { Anchor, MapPin, Phone, Mail, Globe, ExternalLink } from "lucide-react";
import { siteConfig, navLinks } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-navy-800 text-white relative overflow-hidden" id="footer">
      {/* Gold divider */}
      <div className="section-divider" />

      {/* Decorative background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-gold-400 blur-[120px]" />
        <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full bg-gold-400 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="w-12 h-12 rounded-full gold-gradient flex items-center justify-center shadow-lg shadow-gold-400/20">
                <Anchor className="w-6 h-6 text-navy-800" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-[family-name:var(--font-playfair)]">
                  Kings Houseboats
                </h3>
                <p className="text-[10px] text-gold-300 tracking-[0.2em] uppercase">
                  Nigeen Lake · Srinagar
                </p>
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Experience the timeless charm of Kashmiri hospitality aboard our luxury
              heritage houseboat on the serene Nigeen Lake, Srinagar.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-gold-400/20 hover:border-gold-400/30 transition-all"
                aria-label="Follow us on Instagram"
              >
                <Globe className="w-4 h-4 text-white/70" />
              </a>
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-gold-400/20 hover:border-gold-400/30 transition-all"
                aria-label="Follow us on Facebook"
              >
                <ExternalLink className="w-4 h-4 text-white/70" />
              </a>
              <a
                href={siteConfig.social.tripadvisor}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-gold-400/20 hover:border-gold-400/30 transition-all text-white/70 text-xs font-bold"
                aria-label="View us on TripAdvisor"
              >
                TA
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-[family-name:var(--font-playfair)] text-lg font-semibold mb-6 text-gold-300">
              Explore
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-gold-300 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Experiences */}
          <div>
            <h4 className="font-[family-name:var(--font-playfair)] text-lg font-semibold mb-6 text-gold-300">
              Experiences
            </h4>
            <ul className="space-y-3">
              {[
                "Shikara Lake Rides",
                "Kashmiri Cuisine",
                "Mughal Gardens Visit",
                "Gulmarg Day Trip",
                "Local Handicraft Shopping",
                "Photography Tours",
                "Cultural Experiences",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="/things-to-do"
                    className="text-white/60 hover:text-gold-300 transition-colors text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-[family-name:var(--font-playfair)] text-lg font-semibold mb-6 text-gold-300">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold-400 mt-0.5 shrink-0" />
                <span className="text-white/60 text-sm leading-relaxed">
                  {siteConfig.address}
                </span>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="flex items-center gap-3 text-white/60 hover:text-gold-300 transition-colors text-sm"
                >
                  <Phone className="w-5 h-5 text-gold-400 shrink-0" />
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-3 text-white/60 hover:text-gold-300 transition-colors text-sm"
                >
                  <Mail className="w-5 h-5 text-gold-400 shrink-0" />
                  {siteConfig.email}
                </a>
              </li>
            </ul>

            {/* CTA Buttons */}
            <div className="mt-6 flex flex-col gap-2">
              <a
                href={`https://wa.me/${siteConfig.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-green-600/90 text-white py-2.5 rounded-full text-sm font-medium hover:bg-green-500 transition-colors"
                id="footer-whatsapp"
              >
                Chat on WhatsApp
              </a>
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 gold-gradient text-navy-800 py-2.5 rounded-full text-sm font-semibold hover:shadow-lg hover:shadow-gold-400/20 transition-all"
                id="footer-book"
              >
                Book Your Stay
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/40">
          <p>© {new Date().getFullYear()} Kings Houseboats. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/faq" className="hover:text-gold-300 transition-colors">
              FAQs
            </Link>
            <Link href="/contact" className="hover:text-gold-300 transition-colors">
              Contact
            </Link>
            <span>Srinagar, Kashmir</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
