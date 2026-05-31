import { Users, IndianRupee, BedDouble, CalendarCheck } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-navy-800 font-[family-name:var(--font-playfair)] mb-8">Dashboard Overview</h1>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {[
          { label: "Total Bookings", value: "142", icon: CalendarCheck, trend: "+12% this month" },
          { label: "Revenue (MTD)", value: "₹4.2L", icon: IndianRupee, trend: "+8% this month" },
          { label: "Occupancy Rate", value: "85%", icon: BedDouble, trend: "High demand" },
          { label: "Upcoming Arrivals", value: "8", icon: Users, trend: "Next 7 days" }
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-beige-200">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-full bg-gold-400/10 flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-gold-600" />
              </div>
            </div>
            <p className="text-sm font-medium text-navy-500 mb-1">{stat.label}</p>
            <p className="text-3xl font-bold text-navy-800 mb-2">{stat.value}</p>
            <p className="text-xs text-green-600 font-medium">{stat.trend}</p>
          </div>
        ))}
      </div>

      {/* Recent Bookings Placeholder */}
      <div className="bg-white rounded-2xl shadow-sm border border-beige-200 overflow-hidden">
        <div className="p-6 border-b border-beige-200 flex justify-between items-center">
          <h2 className="text-lg font-bold text-navy-800">Recent Reservations</h2>
          <button className="text-sm text-gold-600 font-semibold hover:text-gold-700">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-beige-50 text-navy-500 text-xs uppercase tracking-wider">
                <th className="p-4 font-semibold">Booking ID</th>
                <th className="p-4 font-semibold">Guest</th>
                <th className="p-4 font-semibold">Dates</th>
                <th className="p-4 font-semibold">Room</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Payment</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {[1, 2, 3].map((_, i) => (
                <tr key={i} className="border-b border-beige-100 hover:bg-beige-50 transition-colors">
                  <td className="p-4 font-medium text-navy-800">KH-84920{i}</td>
                  <td className="p-4">John Doe</td>
                  <td className="p-4 text-navy-500">Oct 15 - Oct 18</td>
                  <td className="p-4">Royal Suite</td>
                  <td className="p-4"><span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Confirmed</span></td>
                  <td className="p-4"><span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Paid</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
