"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { format, differenceInDays, parseISO } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Calendar, Users, BedDouble, ArrowRight, CheckCircle, ArrowLeft, Loader2, ShieldCheck, CreditCard } from "lucide-react";
import { getAvailableRooms, createBooking } from "@/lib/actions/booking";

// Guest Form Schema
const guestSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number required"),
  country: z.string().min(2, "Country is required"),
  city: z.string().min(2, "City is required"),
  specialRequests: z.string().optional(),
});

type GuestFormData = z.infer<typeof guestSchema>;

export function BookingClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Booking State
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [roomsCount, setRoomsCount] = useState(1);
  
  // Data State
  const [availableRooms, setAvailableRooms] = useState<any[]>([]);
  const [isLoadingRooms, setIsLoadingRooms] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState<any | null>(null);
  const [paymentOption, setPaymentOption] = useState<"full" | "advance" | "pay_later">("full");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize from URL params
  useEffect(() => {
    const ci = searchParams.get("checkin");
    const co = searchParams.get("checkout");
    const a = searchParams.get("adults");
    const c = searchParams.get("children");
    const r = searchParams.get("rooms");

    if (ci) setCheckIn(parseISO(ci));
    else setCheckIn(new Date()); // default today

    if (co) setCheckOut(parseISO(co));
    else setCheckOut(new Date(Date.now() + 86400000)); // default tomorrow

    if (a) setAdults(parseInt(a));
    if (c) setChildren(parseInt(c));
    if (r) setRoomsCount(parseInt(r));
  }, [searchParams]);

  // Fetch Available Rooms
  useEffect(() => {
    async function fetchRooms() {
      if (!checkIn || !checkOut) return;
      setIsLoadingRooms(true);
      try {
        const rooms = await getAvailableRooms(
          format(checkIn, "yyyy-MM-dd"),
          format(checkOut, "yyyy-MM-dd"),
          adults,
          children
        );
        setAvailableRooms(rooms);
      } catch (error) {
        console.error("Failed to fetch rooms", error);
      } finally {
        setIsLoadingRooms(false);
      }
    }
    fetchRooms();
  }, [checkIn, checkOut, adults, children]);

  // Form Setup
  const { register, handleSubmit, formState: { errors, isValid }, trigger } = useForm<GuestFormData>({
    resolver: zodResolver(guestSchema),
    mode: "onChange",
  });

  // Calculations
  const nights = checkIn && checkOut ? Math.max(1, differenceInDays(checkOut, checkIn)) : 1;
  const roomPricePerNight = selectedRoom?.base_price || 0;
  const totalRoomPrice = roomPricePerNight * nights * roomsCount;
  const taxes = totalRoomPrice * 0.18; // 18% GST example
  const grandTotal = totalRoomPrice + taxes;

  const getPaymentAmount = () => {
    if (paymentOption === "full") return grandTotal;
    if (paymentOption === "advance") return grandTotal * 0.5; // 50% advance
    return 0; // pay later
  };

  // Submit Booking
  const onFinalSubmit = async (data: GuestFormData) => {
    if (!selectedRoom || !checkIn || !checkOut) return;
    setIsSubmitting(true);
    
    try {
      const bookingData = {
        ...data,
        roomId: selectedRoom.id,
        checkIn: format(checkIn, "yyyy-MM-dd"),
        checkOut: format(checkOut, "yyyy-MM-dd"),
        adults,
        children,
        totalPrice: grandTotal,
        paymentOption
      };

      const result = await createBooking(bookingData);
      
      if (result.success) {
        // Redirect to Payment Gateway or Confirmation
        if (paymentOption === "pay_later") {
          router.push(`/booking-confirmation/${result.bookingId}`);
        } else {
          // Placeholder for Payment Gateway Redirect
          const paymentUrl = process.env.NEXT_PUBLIC_PAYMENT_GATEWAY_URL || "https://your-payment-gateway.com/pay";
          const returnUrl = `${process.env.NEXT_PUBLIC_SITE_URL || window.location.origin}/booking-confirmation/${result.bookingId}`;
          
          // In a real scenario, you'd generate a payment session on your backend and get a URL.
          // For now, we simulate the redirect with URL params.
          window.location.href = `${paymentUrl}?amount=${getPaymentAmount()}&bookingId=${result.bookingId}&returnUrl=${encodeURIComponent(returnUrl)}`;
        }
      }
    } catch (error) {
      console.error("Booking submission failed", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-beige-50 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Steps Header */}
        <div className="mb-8 flex items-center justify-between max-w-3xl">
          {[
            { num: 1, title: "Choose Room" },
            { num: 2, title: "Your Details" },
            { num: 3, title: "Confirm & Pay" }
          ].map((s, i) => (
            <div key={s.num} className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                step >= s.num ? "bg-navy-800 text-white" : "bg-beige-200 text-navy-400"
              }`}>
                {step > s.num ? <CheckCircle className="w-4 h-4" /> : s.num}
              </div>
              <span className={`hidden sm:block text-sm font-semibold ${
                step >= s.num ? "text-navy-800" : "text-navy-400"
              }`}>{s.title}</span>
              {i < 2 && <div className="hidden sm:block w-12 h-px bg-beige-300 mx-2" />}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {/* STEP 1: ROOM SELECTION */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold font-[family-name:var(--font-playfair)] text-navy-800">Available Rooms</h2>
                    <button onClick={() => router.push("/")} className="text-sm text-navy-500 hover:text-navy-800 flex items-center gap-1">
                      <ArrowLeft className="w-4 h-4" /> Change Dates
                    </button>
                  </div>

                  {isLoadingRooms ? (
                    <div className="py-20 flex flex-col items-center justify-center text-navy-400">
                      <Loader2 className="w-8 h-8 animate-spin mb-4 text-gold-500" />
                      <p>Searching for available rooms...</p>
                    </div>
                  ) : availableRooms.length === 0 ? (
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-beige-200 text-center">
                      <BedDouble className="w-12 h-12 text-navy-200 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-navy-800 mb-2">No Rooms Available</h3>
                      <p className="text-navy-500 mb-6">We don't have any rooms matching your criteria for these dates.</p>
                      <button onClick={() => router.push("/")} className="bg-navy-800 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-navy-700 transition-colors">
                        Try Different Dates
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {availableRooms.map((room) => (
                        <div key={room.id} className={`bg-white rounded-2xl overflow-hidden border transition-all ${
                          selectedRoom?.id === room.id ? "border-gold-400 shadow-md ring-1 ring-gold-400" : "border-beige-200 shadow-sm hover:shadow-md"
                        }`}>
                          <div className="flex flex-col sm:flex-row h-full">
                            <div className="relative w-full sm:w-1/3 h-48 sm:h-auto shrink-0">
                              <Image src={room.image_url || "/images/rooms/royal-suite.jpg"} alt={room.name} fill className="object-cover" />
                            </div>
                            <div className="p-5 flex flex-col flex-1 justify-between">
                              <div>
                                <div className="flex justify-between items-start mb-2">
                                  <h3 className="text-xl font-bold font-[family-name:var(--font-playfair)] text-navy-800">{room.name}</h3>
                                  <div className="text-right">
                                    <p className="text-lg font-bold text-navy-800">₹{room.base_price}</p>
                                    <p className="text-xs text-navy-400">per night</p>
                                  </div>
                                </div>
                                <p className="text-sm text-navy-500 mb-4 line-clamp-2">{room.description}</p>
                                <div className="flex items-center gap-4 text-xs text-navy-500 mb-4">
                                  <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> Up to {room.capacity_adults + room.capacity_children}</span>
                                  <span className="flex items-center gap-1"><BedDouble className="w-3.5 h-3.5" /> 1 King Bed</span>
                                </div>
                              </div>
                              <button 
                                onClick={() => { setSelectedRoom(room); setStep(2); }}
                                className="w-full sm:w-auto self-end gold-gradient text-navy-800 px-6 py-2 rounded-full text-sm font-semibold hover:shadow-md hover:scale-105 transition-all"
                              >
                                Select Room
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {/* STEP 2: GUEST DETAILS */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-2xl shadow-sm border border-beige-200 p-6 md:p-8"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold font-[family-name:var(--font-playfair)] text-navy-800">Guest Information</h2>
                    <button onClick={() => setStep(1)} className="text-sm text-navy-500 hover:text-navy-800 flex items-center gap-1">
                      <ArrowLeft className="w-4 h-4" /> Back to Rooms
                    </button>
                  </div>

                  <form className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-navy-600 mb-1.5">Full Name *</label>
                        <input {...register("fullName")} className="w-full px-4 py-3 rounded-xl border border-beige-300 bg-beige-50 focus:ring-1 focus:ring-gold-400 outline-none" placeholder="John Doe" />
                        {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-navy-600 mb-1.5">Email Address *</label>
                        <input {...register("email")} type="email" className="w-full px-4 py-3 rounded-xl border border-beige-300 bg-beige-50 focus:ring-1 focus:ring-gold-400 outline-none" placeholder="john@example.com" />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-navy-600 mb-1.5">Phone Number *</label>
                        <input {...register("phone")} className="w-full px-4 py-3 rounded-xl border border-beige-300 bg-beige-50 focus:ring-1 focus:ring-gold-400 outline-none" placeholder="+1 234 567 8900" />
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-navy-600 mb-1.5">Country *</label>
                          <input {...register("country")} className="w-full px-4 py-3 rounded-xl border border-beige-300 bg-beige-50 focus:ring-1 focus:ring-gold-400 outline-none" placeholder="UK" />
                          {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-navy-600 mb-1.5">City *</label>
                          <input {...register("city")} className="w-full px-4 py-3 rounded-xl border border-beige-300 bg-beige-50 focus:ring-1 focus:ring-gold-400 outline-none" placeholder="London" />
                          {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy-600 mb-1.5">Special Requests</label>
                      <textarea {...register("specialRequests")} rows={3} className="w-full px-4 py-3 rounded-xl border border-beige-300 bg-beige-50 focus:ring-1 focus:ring-gold-400 outline-none resize-none" placeholder="Dietary requirements, estimated arrival time, etc." />
                    </div>

                    <div className="pt-4 border-t border-beige-200 flex justify-end">
                      <button 
                        type="button"
                        onClick={async () => {
                          const valid = await trigger();
                          if (valid) setStep(3);
                        }}
                        className="gold-gradient text-navy-800 px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all flex items-center gap-2"
                      >
                        Continue to Payment <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* STEP 3: PAYMENT */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-2xl shadow-sm border border-beige-200 p-6 md:p-8"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold font-[family-name:var(--font-playfair)] text-navy-800">Payment Options</h2>
                    <button onClick={() => setStep(2)} className="text-sm text-navy-500 hover:text-navy-800 flex items-center gap-1">
                      <ArrowLeft className="w-4 h-4" /> Back to Details
                    </button>
                  </div>

                  <div className="space-y-4 mb-8">
                    {/* Option 1: Full Payment */}
                    <label className={`block p-4 border rounded-xl cursor-pointer transition-all ${
                      paymentOption === "full" ? "border-gold-400 bg-gold-400/5 ring-1 ring-gold-400" : "border-beige-200 hover:border-beige-300"
                    }`}>
                      <div className="flex items-start gap-4">
                        <div className="mt-1">
                          <input type="radio" name="payment" value="full" checked={paymentOption === "full"} onChange={() => setPaymentOption("full")} className="w-4 h-4 text-gold-500 focus:ring-gold-400" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <span className="font-semibold text-navy-800">Pay in Full</span>
                            <span className="font-bold text-navy-800">₹{grandTotal.toLocaleString()}</span>
                          </div>
                          <p className="text-sm text-navy-500 mt-1">Pay the total amount now and relax.</p>
                        </div>
                      </div>
                    </label>

                    {/* Option 2: Advance Payment */}
                    <label className={`block p-4 border rounded-xl cursor-pointer transition-all ${
                      paymentOption === "advance" ? "border-gold-400 bg-gold-400/5 ring-1 ring-gold-400" : "border-beige-200 hover:border-beige-300"
                    }`}>
                      <div className="flex items-start gap-4">
                        <div className="mt-1">
                          <input type="radio" name="payment" value="advance" checked={paymentOption === "advance"} onChange={() => setPaymentOption("advance")} className="w-4 h-4 text-gold-500 focus:ring-gold-400" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <span className="font-semibold text-navy-800">Pay 50% Advance</span>
                            <span className="font-bold text-navy-800">₹{(grandTotal * 0.5).toLocaleString()}</span>
                          </div>
                          <p className="text-sm text-navy-500 mt-1">Pay half now to secure booking, rest at check-in.</p>
                        </div>
                      </div>
                    </label>

                    {/* Option 3: Pay Later */}
                    <label className={`block p-4 border rounded-xl cursor-pointer transition-all ${
                      paymentOption === "pay_later" ? "border-gold-400 bg-gold-400/5 ring-1 ring-gold-400" : "border-beige-200 hover:border-beige-300"
                    }`}>
                      <div className="flex items-start gap-4">
                        <div className="mt-1">
                          <input type="radio" name="payment" value="pay_later" checked={paymentOption === "pay_later"} onChange={() => setPaymentOption("pay_later")} className="w-4 h-4 text-gold-500 focus:ring-gold-400" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <span className="font-semibold text-navy-800">Request Booking (Pay Later)</span>
                            <span className="font-bold text-navy-800">₹0 now</span>
                          </div>
                          <p className="text-sm text-navy-500 mt-1">Submit request. Admin will contact you for payment.</p>
                        </div>
                      </div>
                    </label>
                  </div>

                  <div className="bg-navy-50 rounded-xl p-4 flex items-start gap-3 mb-8">
                    <ShieldCheck className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-navy-800">Secure Payment Gateway</p>
                      <p className="text-xs text-navy-500 mt-1">You will be redirected to our secure payment partner. Your details are encrypted.</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-beige-200 flex justify-end">
                    <button 
                      onClick={handleSubmit(onFinalSubmit)}
                      disabled={isSubmitting}
                      className="gold-gradient text-navy-800 px-8 py-3 rounded-full font-bold hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-70"
                    >
                      {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <CreditCard className="w-5 h-5" />}
                      {isSubmitting ? "Processing..." : paymentOption === "pay_later" ? "Submit Booking Request" : "Proceed to Payment"}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-md border border-beige-200 overflow-hidden sticky top-32">
              <div className="bg-navy-800 p-5 text-white">
                <h3 className="font-bold font-[family-name:var(--font-playfair)] text-xl">Booking Summary</h3>
              </div>
              
              <div className="p-5 space-y-4">
                {/* Dates */}
                <div className="flex gap-4 p-4 bg-beige-50 rounded-xl border border-beige-200">
                  <div className="flex-1">
                    <p className="text-xs text-navy-400 uppercase font-semibold">Check In</p>
                    <p className="text-sm font-bold text-navy-800 mt-1">{checkIn ? format(checkIn, "MMM dd, yyyy") : "-"}</p>
                  </div>
                  <div className="w-px bg-beige-300" />
                  <div className="flex-1">
                    <p className="text-xs text-navy-400 uppercase font-semibold">Check Out</p>
                    <p className="text-sm font-bold text-navy-800 mt-1">{checkOut ? format(checkOut, "MMM dd, yyyy") : "-"}</p>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-2 py-2 border-b border-beige-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-navy-500">Duration</span>
                    <span className="font-semibold text-navy-800">{nights} Night{nights > 1 ? "s" : ""}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-navy-500">Guests</span>
                    <span className="font-semibold text-navy-800">{adults} Adults, {children} Children</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-navy-500">Rooms</span>
                    <span className="font-semibold text-navy-800">{roomsCount}</span>
                  </div>
                </div>

                {/* Room */}
                {selectedRoom && (
                  <div className="py-2 border-b border-beige-200">
                    <p className="font-semibold text-navy-800">{selectedRoom.name}</p>
                    <p className="text-xs text-navy-500 mt-1 line-clamp-1">{selectedRoom.amenities?.join(" • ")}</p>
                  </div>
                )}

                {/* Pricing */}
                <div className="space-y-2 pt-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-navy-500">{selectedRoom ? `₹${roomPricePerNight} x ${nights} nights x ${roomsCount} rooms` : "Room Total"}</span>
                    <span className="font-semibold text-navy-800">₹{totalRoomPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-navy-500">Taxes & Fees (18%)</span>
                    <span className="font-semibold text-navy-800">₹{taxes.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex justify-between items-center pt-4 mt-4 border-t border-beige-300">
                    <span className="font-bold text-navy-800">Total</span>
                    <span className="text-2xl font-bold text-gold-600">₹{grandTotal.toLocaleString()}</span>
                  </div>
                  {step === 3 && paymentOption !== "full" && (
                    <div className="flex justify-between items-center pt-2">
                      <span className="font-bold text-navy-800">Due Now</span>
                      <span className="text-xl font-bold text-navy-800">₹{getPaymentAmount().toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
