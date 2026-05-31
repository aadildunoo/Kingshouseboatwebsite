"use server";

import { createClient } from "@/lib/supabase/server";

export async function getAvailableRooms(checkIn: string, checkOut: string, adults: number, children: number) {
  // Check if DB is configured before creating client
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === 'your_supabase_project_url') {
    return getMockRooms();
  }

  const supabase = await createClient();

  // 1. Fetch all rooms that meet capacity requirements
  const { data: rooms, error: roomsError } = await supabase
    .from("rooms")
    .select("*")
    .gte("capacity_adults", adults)
    .gte("capacity_children", children);

  if (roomsError) {
    console.error("Error fetching rooms:", roomsError);
    return [];
  }

  // 2. Check for blocked dates
  const { data: blockedDates, error: blockedError } = await supabase
    .from("blocked_dates")
    .select("room_id")
    .lte("start_date", checkOut)
    .gte("end_date", checkIn);

  if (blockedError) {
    console.error("Error fetching blocked dates:", blockedError);
  }

  // 3. Check for existing overlapping bookings
  const { data: bookings, error: bookingsError } = await supabase
    .from("bookings")
    .select("room_id")
    .in("status", ["confirmed", "pending"])
    .lt("check_in", checkOut)
    .gt("check_out", checkIn);

  if (bookingsError) {
    console.error("Error fetching bookings:", bookingsError);
  }

  // Extract unavailable room IDs
  const unavailableRoomIds = new Set([
    ...(blockedDates?.map(b => b.room_id) || []),
    ...(bookings?.map(b => b.room_id) || [])
  ]);

  // Filter out unavailable rooms
  const availableRooms = rooms.filter(room => !unavailableRoomIds.has(room.id));

  return availableRooms;
}

export async function createBooking(data: any) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === 'your_supabase_project_url') {
    // Mock successful booking creation
    return { success: true, bookingId: 'mock-booking-id-123', reservationNumber: 'KH-' + Math.floor(Math.random() * 10000) };
  }

  const supabase = await createClient();

  // 1. Create Guest
  const { data: guest, error: guestError } = await supabase
    .from("guests")
    .insert({
      full_name: data.fullName,
      email: data.email,
      phone: data.phone,
      country: data.country,
      city: data.city,
      special_requests: data.specialRequests,
    })
    .select()
    .single();

  if (guestError) throw new Error(guestError.message);

  // 2. Create Booking
  const reservationNumber = 'KH-' + Date.now().toString().slice(-6);
  
  const { data: booking, error: bookingError } = await supabase
    .from("bookings")
    .insert({
      guest_id: guest.id,
      room_id: data.roomId,
      check_in: data.checkIn,
      check_out: data.checkOut,
      adults: data.adults,
      children: data.children,
      total_price: data.totalPrice,
      status: 'pending',
      payment_status: 'pending',
      reservation_number: reservationNumber
    })
    .select()
    .single();

  if (bookingError) throw new Error(bookingError.message);

  return { success: true, bookingId: booking.id, reservationNumber };
}

// Fallback mock data when DB isn't connected yet
function getMockRooms() {
  return [
    {
      id: "1",
      name: "Royal Suite",
      description: "Our most exquisite room with panoramic lake and mountain views.",
      base_price: 15000,
      capacity_adults: 2,
      capacity_children: 1,
      amenities: ["Panoramic Lake & Mountain View", "King-Size Bed", "Hand-Carved Walnut Ceiling"],
      image_url: "/images/rooms/royal-suite.jpg"
    },
    {
      id: "2",
      name: "Deluxe Lake View",
      description: "Twin-bedded room overlooking the tranquil Nigeen Lake.",
      base_price: 12000,
      capacity_adults: 2,
      capacity_children: 0,
      amenities: ["Direct Lake View", "Twin Beds", "Traditional Woodwork Ceiling"],
      image_url: "/images/rooms/deluxe-lake-view.jpg"
    }
  ];
}
