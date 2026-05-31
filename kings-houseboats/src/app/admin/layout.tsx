import { LayoutDashboard, Calendar, Users, Settings, LogOut } from "lucide-react";
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-beige-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-navy-900 text-white flex flex-col fixed h-full z-50">
        <div className="p-6 border-b border-navy-800">
          <h2 className="text-xl font-bold font-[family-name:var(--font-playfair)] text-gold-400">Kings Admin</h2>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-navy-800 text-sm font-medium transition-colors">
            <LayoutDashboard className="w-5 h-5 text-gold-500" />
            Dashboard
          </Link>
          <Link href="/admin/reservations" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-navy-800 text-sm font-medium transition-colors">
            <Users className="w-5 h-5 text-gold-500" />
            Reservations
          </Link>
          <Link href="/admin/calendar" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-navy-800 text-sm font-medium transition-colors">
            <Calendar className="w-5 h-5 text-gold-500" />
            Calendar & Rates
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-navy-800 text-sm font-medium transition-colors">
            <Settings className="w-5 h-5 text-gold-500" />
            Settings
          </Link>
        </nav>

        <div className="p-4 border-t border-navy-800">
          <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl hover:bg-red-500/10 hover:text-red-400 text-sm font-medium transition-colors text-navy-300">
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        {children}
      </main>
    </div>
  );
}
