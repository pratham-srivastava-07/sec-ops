"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  AlertTriangle,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useUser } from "@/hooks/useUser";
import { createClient } from "@/utils/supabase/browserClient";
import { useState } from "react";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/users", label: "Users", icon: Users },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const user = useUser();
  const supabase = createClient();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);

  const handleSignout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <aside
      className={`h-full bg-black backdrop-blur-xl border-r border-gray-800/50 flex flex-col transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Logo and Toggle */}
      <div className="p-6 border-b border-gray-800/50 sticky top-0 z-10 bg-gray-900/70 backdrop-blur-xl flex items-center justify-between">
        {isOpen ? (
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            CIRCL
          </h1>
        ) : null}
        <button
          onClick={toggleSidebar}
          className="p-1 rounded-full hover:bg-gray-800/50 text-gray-400 hover:text-white transition-colors"
        >
          {isOpen ? (
            <ChevronLeft className="w-5 h-5" />
          ) : (
            <ChevronRight className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;

          return (
            <Link
              key={href}
              href={href}
              className={`group flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                  : "text-gray-300 hover:bg-gray-800/50 hover:text-white"
              }`}
            >
              <Icon
                className={`w-5 h-5 ${
                  isOpen ? "mr-3" : "mx-auto"
                } transition-colors ${
                  isActive
                    ? "text-blue-400"
                    : "text-gray-400 group-hover:text-gray-300"
                }`}
              />
              {isOpen && (
                <span className="font-medium truncate">{label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-gray-800/50">
        <div
          className={`flex items-center ${
            isOpen ? "space-x-3 p-3" : "justify-center p-2"
          } rounded-lg bg-gray-800/30`}
        >
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-sm font-semibold text-white">
            {user?.email?.split("")[0].toUpperCase()}
          </div>
          {isOpen && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {user?.user_metadata?.name}
              </p>
              <p className="text-xs text-gray-400 truncate">
                {user?.email || "user@gmail.com"}
              </p>
            </div>
          )}
          <button
            className={`p-1 text-gray-400 hover:text-white transition-colors ${
              !isOpen ? "ml-1" : ""
            }`}
            aria-label="Logout"
            onClick={handleSignout}
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}