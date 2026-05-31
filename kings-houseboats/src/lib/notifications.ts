// Notification Utilities

/**
 * Generate a pre-filled WhatsApp link for the guest to send to the Admin
 */
export function generateGuestWhatsAppLink(booking: any, adminPhone: string) {
  const message = `*New Booking Request!* 🛥️
  
*Guest Name:* ${booking.fullName}
*Booking ID:* ${booking.reservationNumber}

*Check-In:* ${booking.checkIn}
*Check-Out:* ${booking.checkOut}
*Guests:* ${booking.adults} Adults, ${booking.children} Children
*Room:* ${booking.roomName || 'Luxury Room'}

*Payment Selected:* ${booking.paymentOption === 'full' ? 'Full Payment' : booking.paymentOption === 'advance' ? '50% Advance' : 'Pay Later'}
*Amount Due Now:* ₹${booking.amountDue}
*Total Amount:* ₹${booking.totalPrice}

Please confirm my booking. Thank you!`;

  return `https://wa.me/${adminPhone}?text=${encodeURIComponent(message)}`;
}

/**
 * Generate a pre-filled WhatsApp link for the Admin to send to the Guest
 */
export function generateAdminWhatsAppLink(booking: any, guestPhone: string) {
  const message = `Hello ${booking.fullName},

Thank you for choosing Kings Houseboats! 🌟

Your booking *${booking.reservationNumber}* is *CONFIRMED*.
Dates: ${booking.checkIn} to ${booking.checkOut}

We have received your payment of ₹${booking.amountPaid || 0}. 
(Balance due at check-in: ₹${booking.totalPrice - (booking.amountPaid || 0)})

We look forward to hosting you. Let us know if you need airport pickup!
- Kings Houseboats Team`;

  return `https://wa.me/${guestPhone}?text=${encodeURIComponent(message)}`;
}

/**
 * Placeholder for Email Notification Service
 * To be implemented with Resend, SendGrid, etc.
 */
export async function sendEmailNotification(to: string, subject: string, html: string) {
  if (!process.env.RESEND_API_KEY) {
    console.log(`[Email Mock] To: ${to} | Subject: ${subject}`);
    return { success: true, mock: true };
  }

  // Example implementation using fetch (if Resend API key exists)
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "Kings Houseboats <reservations@kingshouseboats.com>",
        to,
        subject,
        html
      })
    });
    
    if (!res.ok) throw new Error(await res.text());
    
    return { success: true };
  } catch (error) {
    console.error("Email sending failed:", error);
    return { success: false, error };
  }
}
