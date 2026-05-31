"use client";

import { useState, useRef, useEffect } from "react";
import { format, addDays } from "date-fns";
import { Calendar as CalendarIcon, Users, ChevronDown, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";

export function BookingWidget() {
  const router = useRouter();
  
  // Date State
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 2),
  });
  
  // Guests State
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);

  // Popover State
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [isGuestOpen, setIsGuestOpen] = useState(false);

  // Refs for outside click
  const dateRef = useRef<HTMLDivElement>(null);
  const guestRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dateRef.current && !dateRef.current.contains(event.target as Node)) {
        setIsDateOpen(false);
      }
      if (guestRef.current && !guestRef.current.contains(event.target as Node)) {
        setIsGuestOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (dateRange?.from) params.set("checkin", format(dateRange?.from, "yyyy-MM-dd"));
    if (dateRange?.to) params.set("checkout", format(dateRange?.to, "yyyy-MM-dd"));
    params.set("adults", adults.toString());
    params.set("children", children.toString());
    params.set("rooms", rooms.toString());

    router.push(`/book?${params.toString()}`);
  };

  return (
    <div className="relative z-20 w-full max-w-4xl mx-auto -mt-16 md:-mt-24 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-2xl p-2 md:p-4 border border-beige-300 flex flex-col md:flex-row items-center gap-2 md:gap-4 relative">
        
        {/* Dates Select */}
        <div className="relative flex-1 w-full" ref={dateRef}>
          <button
            onClick={() => { setIsDateOpen(!isDateOpen); setIsGuestOpen(false); }}
            className="w-full flex items-center justify-between px-4 py-3 md:py-4 rounded-xl hover:bg-beige-50 transition-colors border border-transparent hover:border-beige-200"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gold-400/10 flex items-center justify-center shrink-0">
                <CalendarIcon className="w-5 h-5 text-gold-600" />
              </div>
              <div className="text-left">
                <p className="text-xs text-navy-400 font-medium uppercase tracking-wider mb-0.5">Check In — Check Out</p>
                <p className="text-sm md:text-base font-semibold text-navy-800">
                  {dateRange?.from ? (
                    dateRange.to ? (
                      <>{format(dateRange.from, "MMM dd")} — {format(dateRange.to, "MMM dd")}</>
                    ) : (
                      <>{format(dateRange.from, "MMM dd")} — Select</>
                    )
                  ) : (
                    <span>Add dates</span>
                  )}
                </p>
              </div>
            </div>
            <ChevronDown className="w-4 h-4 text-navy-300" />
          </button>

          <AnimatePresence>
            {isDateOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full left-0 mt-2 bg-white rounded-2xl shadow-2xl border border-beige-300 p-4 z-50 origin-top-left"
              >
                <Calendar
                  mode="range"
                  selected={dateRange}
                  onSelect={(range) => {
                    setDateRange(range as any);
                    if (range?.from && range?.to) setIsDateOpen(false);
                  }}
                  numberOfMonths={window.innerWidth > 768 ? 2 : 1}
                  disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                  className="rounded-md border-none shadow-none"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px h-12 bg-beige-200" />

        {/* Guests Select */}
        <div className="relative flex-1 w-full" ref={guestRef}>
          <button
            onClick={() => { setIsGuestOpen(!isGuestOpen); setIsDateOpen(false); }}
            className="w-full flex items-center justify-between px-4 py-3 md:py-4 rounded-xl hover:bg-beige-50 transition-colors border border-transparent hover:border-beige-200"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-navy-800/5 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5 text-navy-600" />
              </div>
              <div className="text-left">
                <p className="text-xs text-navy-400 font-medium uppercase tracking-wider mb-0.5">Guests & Rooms</p>
                <p className="text-sm md:text-base font-semibold text-navy-800">
                  {adults + children} Guests, {rooms} Room{rooms > 1 ? "s" : ""}
                </p>
              </div>
            </div>
            <ChevronDown className="w-4 h-4 text-navy-300" />
          </button>

          <AnimatePresence>
            {isGuestOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-beige-300 p-5 z-50 origin-top-right space-y-6"
              >
                {/* Adults */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-navy-800">Adults</p>
                    <p className="text-xs text-navy-400">Age 13+</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setAdults(Math.max(1, adults - 1))}
                      className="w-8 h-8 rounded-full border border-beige-300 flex items-center justify-center text-navy-600 hover:border-navy-600 transition-colors disabled:opacity-30"
                      disabled={adults <= 1}
                    >-</button>
                    <span className="w-4 text-center font-medium text-navy-800">{adults}</span>
                    <button
                      onClick={() => setAdults(Math.min(10, adults + 1))}
                      className="w-8 h-8 rounded-full border border-beige-300 flex items-center justify-center text-navy-600 hover:border-navy-600 transition-colors"
                    >+</button>
                  </div>
                </div>

                {/* Children */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-navy-800">Children</p>
                    <p className="text-xs text-navy-400">Ages 2-12</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setChildren(Math.max(0, children - 1))}
                      className="w-8 h-8 rounded-full border border-beige-300 flex items-center justify-center text-navy-600 hover:border-navy-600 transition-colors disabled:opacity-30"
                      disabled={children <= 0}
                    >-</button>
                    <span className="w-4 text-center font-medium text-navy-800">{children}</span>
                    <button
                      onClick={() => setChildren(Math.min(6, children + 1))}
                      className="w-8 h-8 rounded-full border border-beige-300 flex items-center justify-center text-navy-600 hover:border-navy-600 transition-colors"
                    >+</button>
                  </div>
                </div>

                {/* Rooms */}
                <div className="flex items-center justify-between pt-4 border-t border-beige-200">
                  <div>
                    <p className="font-semibold text-navy-800">Rooms</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setRooms(Math.max(1, rooms - 1))}
                      className="w-8 h-8 rounded-full border border-beige-300 flex items-center justify-center text-navy-600 hover:border-navy-600 transition-colors disabled:opacity-30"
                      disabled={rooms <= 1}
                    >-</button>
                    <span className="w-4 text-center font-medium text-navy-800">{rooms}</span>
                    <button
                      onClick={() => setRooms(Math.min(4, rooms + 1))}
                      className="w-8 h-8 rounded-full border border-beige-300 flex items-center justify-center text-navy-600 hover:border-navy-600 transition-colors"
                    >+</button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action Button */}
        <div className="w-full md:w-auto mt-2 md:mt-0 p-1">
          <button
            onClick={handleSearch}
            className="w-full md:w-auto gold-gradient text-navy-800 px-8 py-3.5 md:py-4 rounded-xl font-bold hover:shadow-lg hover:shadow-gold-400/30 transition-all flex items-center justify-center gap-2"
          >
            <Search className="w-5 h-5" />
            Check Availability
          </button>
        </div>
      </div>
    </div>
  );
}
