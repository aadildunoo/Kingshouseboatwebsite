import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// This route receives webhooks from the payment gateway to confirm payment status
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { bookingId, status, transactionRef, amount } = body;

    // Validate request
    if (!bookingId || !status) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.log("Mock Payment Webhook Received:", body);
      return NextResponse.json({ success: true, mock: true });
    }

    // Initialize Supabase admin client for bypassing RLS in webhook
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    // Update Payment Status
    const paymentStatus = status === 'success' ? 'paid' : status === 'partial' ? 'partial' : 'pending';
    const bookingStatus = status === 'success' ? 'confirmed' : 'pending';

    // 1. Record the Payment
    const { error: paymentError } = await supabaseAdmin
      .from("payments")
      .insert({
        booking_id: bookingId,
        amount: amount || 0,
        status: status,
        transaction_ref: transactionRef,
      });

    if (paymentError) throw paymentError;

    // 2. Update Booking Status
    const { error: bookingError } = await supabaseAdmin
      .from("bookings")
      .update({
        payment_status: paymentStatus,
        status: bookingStatus,
      })
      .eq("id", bookingId);

    if (bookingError) throw bookingError;

    // TODO: Trigger Email/WhatsApp Notification Here

    return NextResponse.json({ success: true, bookingId, status: bookingStatus });

  } catch (error: any) {
    console.error("Payment webhook error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
