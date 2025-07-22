import { Sidebar } from "@/components/layout/Sidebar";
import { createClient } from "@/utils/supabase";
import { redirect } from "next/navigation";


export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if(!user) {
    redirect("/login")
  }

  return (
    <div className="flex h-screen bg-gray-950 text-white">
      <Sidebar />
      <main className="flex-1 p-6 overflow-auto">{children}</main>
    </div>
  );
}
