"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2, Calendar, MapPin, Mail, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export function ConfirmationClient() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [booking, setBooking] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const bookingId = params.id as string;
  const paymentStatus = searchParams.get("payment"); // 'success' from gateway return url

  useEffect(() => {
    async function fetchBooking() {
      if (!bookingId) return;
      
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === 'your_supabase_project_url') {
        // Mock data
        setBooking({
          reservation_number: "KH-102938",
          check_in: "2025-06-15",
          check_out: "2025-06-18",
          total_price: 35400,
          payment_status: paymentStatus === 'success' ? 'paid' : 'pending',
          guests: { full_name: "Mock Guest", email: "guest@example.com" },
          rooms: { name: "Royal Suite" }
        });
        setLoading(false);
        return;
      }

      const supabase = createClient();

      const { data, error } = await supabase
        .from("bookings")
        .select("*, guests(*), rooms(*)")
        .eq("id", bookingId)
        .single();

      if (data) setBooking(data);
      setLoading(false);
    }

    fetchBooking();
  }, [bookingId, paymentStatus]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center bg-beige-50">
        <Loader2 className="w-10 h-10 animate-spin text-gold-500" />
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center bg-beige-50 text-center px-4">
        <h1 className="text-3xl font-bold text-navy-800 mb-4">Booking Not Found</h1>
        <p className="text-navy-500 mb-8">We couldn't find a reservation with this ID.</p>
        <button onClick={() => router.push("/")} className="gold-gradient px-8 py-3 rounded-full text-navy-800 font-semibold">Return Home</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 bg-beige-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden border border-beige-200"
        >
          {/* Header */}
          <div className="bg-navy-800 text-center py-12 px-6 relative">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
               <div className="absolute -top-24 -right-24 w-64 h-64 bg-gold-400 rounded-full blur-[80px]" />
            </div>
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-500/30">
                <CheckCircle2 className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-playfair)] text-white mb-2">
                Booking Confirmed!
              </h1>
              <p className="text-white/80">Thank you, {booking.guests?.full_name}. Your reservation is secured.</p>
            </div>
          </div>

          {/* Details */}
          <div className="p-8 md:p-10">
            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div>
                <p className="text-sm text-navy-400 mb-1">Reservation Number</p>
                <p className="text-xl font-bold text-navy-800">{booking.reservation_number}</p>
              </div>
              <div>
                <p className="text-sm text-navy-400 mb-1">Payment Status</p>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                  booking.payment_status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                }`}>
                  {booking.payment_status === 'paid' ? 'Payment Successful' : 'Payment Pending'}
                </span>
              </div>
            </div>

            <div className="bg-beige-50 rounded-2xl p-6 mb-10 border border-beige-200">
              <h3 className="font-semibold text-navy-800 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-gold-500" />
                Stay Details
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-xs text-navy-400 uppercase font-semibold">Check In</p>
                  <p className="font-medium text-navy-800 mt-1">{booking.check_in}</p>
                  <p className="text-xs text-navy-500 mt-1">From 12:00 PM</p>
                </div>
                <div>
                  <p className="text-xs text-navy-400 uppercase font-semibold">Check Out</p>
                  <p className="font-medium text-navy-800 mt-1">{booking.check_out}</p>
                  <p className="text-xs text-navy-500 mt-1">Until 11:00 AM</p>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-beige-200">
                <p className="text-xs text-navy-400 uppercase font-semibold">Room</p>
                <p className="font-medium text-navy-800 mt-1">{booking.rooms?.name}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gold-400/10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-gold-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-navy-800">Confirmation Email Sent</h4>
                  <p className="text-sm text-navy-500 mt-1">We've sent a detailed confirmation to {booking.guests?.email}. Please check your spam folder if you don't see it.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gold-400/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-gold-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-navy-800">Getting Here</h4>
                  <p className="text-sm text-navy-500 mt-1">We offer complimentary airport transfers. Please reply to your confirmation email with your flight details if you haven't already.</p>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-beige-200 text-center">
              <Link href="/" className="inline-flex items-center gap-2 text-navy-600 hover:text-navy-800 font-semibold transition-colors">
                Return to Homepage <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
