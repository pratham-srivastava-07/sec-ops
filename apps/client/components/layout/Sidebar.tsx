"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, AlertTriangle, Users, Settings } from "lucide-react";

const navItems = [
  { href: "/dashboard/overview", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/incidents", label: "Incidents", icon: AlertTriangle },
  { href: "/dashboard/users", label: "Users", icon: Users },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gray-900 border-r border-gray-800 p-4 space-y-4">
      <h1 className="text-2xl font-bold">CIRCLLE</h1>
      <nav className="space-y-2">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center px-3 py-2 rounded-md ${
              pathname === href ? "bg-gray-800" : "hover:bg-gray-800"
            }`}
          >
            <Icon className="w-4 h-4 mr-2" />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
