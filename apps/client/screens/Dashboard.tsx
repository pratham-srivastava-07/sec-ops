"use client";

import { Button } from "@/components/ui/button";
import { createSupabaseClient } from "@ops/shared";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, AlertTriangle, Users, Settings } from "lucide-react";

export default function Dashboard() {
  const supabase = createSupabaseClient();
  const router = useRouter();

  const handleSignout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <div className="flex min-h-screen bg-gray-950 text-white">
      {/* Main content */}
      <main className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <Button onClick={handleSignout}>Logout</Button>
        </div>
        <p className="text-gray-400">Welcome to CIRCL. Start managing your incidents here.</p>
      </main>
    </div>
  );
}
