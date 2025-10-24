"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Heart, Home, FileText, Calendar, MessageSquare, Zap, Settings } from "lucide-react"

export default function PatientSidebar() {
  const pathname = usePathname()

  const menuItems = [
    { icon: Home, label: "Dashboard", href: "/dashboard/patient" },
    { icon: FileText, label: "Medical Reports", href: "/dashboard/patient/reports" },
    { icon: Calendar, label: "Appointments", href: "/dashboard/patient/appointments" },
    { icon: MessageSquare, label: "Consultations", href: "/dashboard/patient/consultations" },
    { icon: Zap, label: "AI Assistant", href: "/dashboard/patient/ai-assistant" },
    { icon: Settings, label: "Settings", href: "/dashboard/patient/settings" },
  ]

  return (
    <div className="w-64 border-r border-border bg-background flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-border flex items-center gap-2">
        <Heart className="w-6 h-6 text-primary" />
        <span className="font-bold text-lg">Nirogya</span>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-input hover:text-foreground"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border text-xs text-muted-foreground text-center">
        <p>Nirogya v1.0</p>
        <p>Secure Healthcare</p>
      </div>
    </div>
  )
}
