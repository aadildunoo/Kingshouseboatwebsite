"use client";

import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { siteConfig } from "@/lib/constants";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  checkin: z.string().optional(),
  checkout: z.string().optional(),
  guests: z.string().optional(),
  roomType: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

const contactCards = [
  {
    icon: Phone,
    title: "Call Us",
    detail: siteConfig.phone,
    subtitle: "Mon–Sun, 8 AM – 10 PM IST",
    href: `tel:${siteConfig.phone}`,
    color: "text-gold-400",
    bg: "bg-gold-400/10",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    detail: "Chat Now",
    subtitle: "Instant replies, 24/7",
    href: `https://wa.me/${siteConfig.whatsapp}?text=Hi%2C%20I%20would%20like%20to%20inquire%20about%20booking.`,
    color: "text-green-400",
    bg: "bg-green-400/10",
    external: true,
  },
  {
    icon: Mail,
    title: "Email",
    detail: siteConfig.email,
    subtitle: "Reply within 24 hours",
    href: `mailto:${siteConfig.email}`,
    color: "text-gold-400",
    bg: "bg-gold-400/10",
  },
  {
    icon: MapPin,
    title: "Location",
    detail: "Nigeen Lake, Srinagar",
    subtitle: "Jammu & Kashmir, India",
    href: "https://maps.google.com/?q=Nigeen+Lake+Srinagar",
    color: "text-gold-400",
    bg: "bg-gold-400/10",
    external: true,
  },
];

export function ContactPageClient() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    // Build WhatsApp message with form data
    const message = `New Booking Inquiry from Website:
    
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Check-in: ${data.checkin || 'Not specified'}
Check-out: ${data.checkout || 'Not specified'}
Guests: ${data.guests || 'Not specified'}
Room Type: ${data.roomType || 'Not specified'}
Message: ${data.message}`;

    // Open WhatsApp with the inquiry
    window.open(
      `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`,
      "_blank"
    );

    setIsSubmitted(true);
    reset();
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-navy-800">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-20 w-80 h-80 bg-gold-400 rounded-full blur-[120px]" />
          <div className="absolute bottom-10 left-20 w-60 h-60 bg-gold-400 rounded-full blur-[100px]" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-5 py-2 rounded-full text-xs font-semibold tracking-[0.2em] uppercase bg-white/10 text-gold-300 border border-gold-400/20 mb-4"
          >
            Contact Us
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold font-[family-name:var(--font-playfair)] text-white mb-4"
          >
            Get In Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/60 max-w-2xl mx-auto"
          >
            We&apos;d love to hear from you. Whether you&apos;re planning your first visit or returning for another magical stay, our team is here to help.
          </motion.p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-16 bg-beige-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactCards.map((card, i) => (
              <motion.a
                key={card.title}
                href={card.href}
                target={card.external ? "_blank" : undefined}
                rel={card.external ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-md border border-beige-300/50 hover:shadow-xl hover:border-gold-400/30 transition-all group text-center"
                id={`contact-${card.title.toLowerCase().replace(" ", "-")}`}
              >
                <div className={`w-14 h-14 rounded-full ${card.bg} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <card.icon className={`w-7 h-7 ${card.color}`} />
                </div>
                <h3 className="font-semibold text-navy-700 mb-1">{card.title}</h3>
                <p className="text-sm text-navy-600 font-medium">{card.detail}</p>
                <p className="text-xs text-navy-400 mt-1">{card.subtitle}</p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form + Map */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <SectionHeading
                badge="Book Your Stay"
                title="Send Us an Inquiry"
                subtitle="Fill out the form below and we'll get back to you within 24 hours."
                centered={false}
              />

              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                  <p className="text-green-700 text-sm">
                    Thank you! Your inquiry has been sent via WhatsApp. We&apos;ll respond shortly.
                  </p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" id="inquiry-form">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-navy-600 mb-1.5">Full Name *</label>
                    <input
                      {...register("name")}
                      className="w-full px-4 py-3 rounded-xl border border-beige-300 bg-beige-50 text-navy-700 placeholder:text-navy-300 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400/30 transition-all text-sm"
                      placeholder="Your full name"
                      id="form-name"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy-600 mb-1.5">Email Address *</label>
                    <input
                      {...register("email")}
                      type="email"
                      className="w-full px-4 py-3 rounded-xl border border-beige-300 bg-beige-50 text-navy-700 placeholder:text-navy-300 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400/30 transition-all text-sm"
                      placeholder="your@email.com"
                      id="form-email"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-navy-600 mb-1.5">Phone Number *</label>
                    <input
                      {...register("phone")}
                      type="tel"
                      className="w-full px-4 py-3 rounded-xl border border-beige-300 bg-beige-50 text-navy-700 placeholder:text-navy-300 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400/30 transition-all text-sm"
                      placeholder="+91 98765 43210"
                      id="form-phone"
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy-600 mb-1.5">Room Preference</label>
                    <select
                      {...register("roomType")}
                      className="w-full px-4 py-3 rounded-xl border border-beige-300 bg-beige-50 text-navy-700 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400/30 transition-all text-sm"
                      id="form-room-type"
                    >
                      <option value="">Select a room</option>
                      <option value="Royal Suite">Royal Suite</option>
                      <option value="Deluxe Lake View">Deluxe Lake View</option>
                      <option value="Heritage Room">Heritage Room</option>
                      <option value="Family Room">Family Room</option>
                    </select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-navy-600 mb-1.5">Check-in Date</label>
                    <input
                      {...register("checkin")}
                      type="date"
                      className="w-full px-4 py-3 rounded-xl border border-beige-300 bg-beige-50 text-navy-700 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400/30 transition-all text-sm"
                      id="form-checkin"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy-600 mb-1.5">Check-out Date</label>
                    <input
                      {...register("checkout")}
                      type="date"
                      className="w-full px-4 py-3 rounded-xl border border-beige-300 bg-beige-50 text-navy-700 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400/30 transition-all text-sm"
                      id="form-checkout"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy-600 mb-1.5">Guests</label>
                    <select
                      {...register("guests")}
                      className="w-full px-4 py-3 rounded-xl border border-beige-300 bg-beige-50 text-navy-700 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400/30 transition-all text-sm"
                      id="form-guests"
                    >
                      <option value="">Select</option>
                      <option value="1">1 Guest</option>
                      <option value="2">2 Guests</option>
                      <option value="3">3 Guests</option>
                      <option value="4">4 Guests</option>
                      <option value="5">5 Guests</option>
                      <option value="6+">6+ Guests</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy-600 mb-1.5">Your Message *</label>
                  <textarea
                    {...register("message")}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-beige-300 bg-beige-50 text-navy-700 placeholder:text-navy-300 focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400/30 transition-all text-sm resize-none"
                    placeholder="Tell us about your travel plans, special requests, or any questions..."
                    id="form-message"
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full gold-gradient text-navy-800 py-3.5 rounded-full font-semibold hover:shadow-lg hover:shadow-gold-400/30 transition-all hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  id="form-submit"
                >
                  <Send className="w-4 h-4" />
                  {isSubmitting ? "Sending..." : "Send Inquiry via WhatsApp"}
                </button>
              </form>
            </motion.div>

            {/* Map + Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="rounded-2xl overflow-hidden shadow-xl h-[400px] border border-beige-300">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3302.1!2d74.82!3d34.1!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38e1857b07c7d4f7%3A0x8c5b0e43a57e2d39!2sNigeen%20Lake!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Kings Houseboats location on Nigeen Lake, Srinagar"
                />
              </div>

              <div className="bg-beige-50 rounded-xl p-6 border border-beige-300/50">
                <h3 className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-navy-700 mb-4">
                  How to Reach Us
                </h3>
                <div className="space-y-3 text-sm text-navy-500">
                  <p className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-gold-500 mt-0.5 shrink-0" />
                    <span>
                      <strong>Address:</strong> {siteConfig.address}
                    </span>
                  </p>
                  <p className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-gold-500 mt-0.5 shrink-0" />
                    <span>
                      <strong>From Airport:</strong> 18 km (~30-40 min drive). Free pickup included.
                    </span>
                  </p>
                  <p className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-gold-500 mt-0.5 shrink-0" />
                    <span>
                      <strong>Check-in:</strong> 2:00 PM · <strong>Check-out:</strong> 11:00 AM
                    </span>
                  </p>
                </div>
              </div>

              <div className="bg-navy-700 rounded-xl p-6 text-center">
                <p className="text-gold-300 font-medium mb-2">Prefer to talk directly?</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={`tel:${siteConfig.phone}`}
                    className="flex-1 flex items-center justify-center gap-2 bg-white/10 text-white py-3 rounded-full font-medium hover:bg-white/20 transition-colors text-sm"
                  >
                    <Phone className="w-4 h-4" />
                    Call Now
                  </a>
                  <a
                    href={`https://wa.me/${siteConfig.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-full font-medium hover:bg-green-500 transition-colors text-sm"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
