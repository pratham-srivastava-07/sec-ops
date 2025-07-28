// import { DashboardHeader } from "@/components/DashboardHeader";
// import { RecentActivity } from "@/components/RecentActivity";
// import { StatsCards } from "@/components/StatsCard";
// import {Plus, Settings, Users } from "lucide-react";

// export function Dashboard() {
//   return (
//     <div className="space-y-6">
//       <DashboardHeader />

//       <div>
//         {/* Optional: Enable this */}
//         {/* <StatsCards /> */}

//         <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
//           <div className="xl:col-span-2">
//             <RecentActivity />
//           </div>

//           <div className="space-y-6">
//             {/* Quick Actions */}
//             <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-xl p-6">
//               <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
//               <div className="space-y-3">
//                 <button className="w-full text-left p-3 rounded-lg bg-gray-800/40 hover:bg-gray-800/60 transition-colors flex items-center space-x-3">
//                   <Plus className="w-5 h-5 text-blue-400" />
//                   <span className="text-white">Create Incident</span>
//                 </button>
//                 <button className="w-full text-left p-3 rounded-lg bg-gray-800/40 hover:bg-gray-800/60 transition-colors flex items-center space-x-3">
//                   <Users className="w-5 h-5 text-green-400" />
//                   <span className="text-white">Invite User</span>
//                 </button>
//                 <button className="w-full text-left p-3 rounded-lg bg-gray-800/40 hover:bg-gray-800/60 transition-colors flex items-center space-x-3">
//                   <Settings className="w-5 h-5 text-purple-400" />
//                   <span className="text-white">Settings</span>
//                 </button>
//               </div>
//             </div>

//             {/* System Status */}
//             <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-xl p-6">
//               <h3 className="text-lg font-semibold text-white mb-4">System Status</h3>
//               <div className="space-y-3">
//                 {[
//                   { label: "API Service", status: "Operational", color: "green" },
//                   { label: "Database", status: "Degraded", color: "yellow" },
//                   { label: "CDN", status: "Operational", color: "green" },
//                 ].map(({ label, status, color }, i) => (
//                   <div key={i} className="flex items-center justify-between">
//                     <span className="text-gray-300">{label}</span>
//                     <span className="flex items-center space-x-2">
//                       <div className={`w-2 h-2 bg-${color}-400 rounded-full`}></div>
//                       <span className={`text-${color}-400 text-sm`}>{status}</span>
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createSupabaseClient } from "@ops/shared"
import { useRouter } from "next/navigation"

type DashboardStats = {
  open: number
  critical: number
  thisWeek: number
  assignedToMe: number
}

type Incident = {
  id: string
  title: string
  severity: string
  status: string
  createdAt: string
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [recentIncidents, setRecentIncidents] = useState<Incident[]>([])
  const supabase = createSupabaseClient()
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      const res1 = await fetch("http://localhost:3001/api/dashboard/summary")
      const summary = await res1.json()
      setStats(summary)

      const res2 = await fetch("http://localhost:3001/api/incidents?limit=5")
      const recent = await res2.json()
      setRecentIncidents(recent)
    }

    fetchData()
  }, [])

  const handleSignout = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">CIRCLLE Dashboard</h1>
        <Button variant="outline" onClick={handleSignout}>
          Logout
        </Button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats && (
          <>
            <Card>
              <CardHeader><CardTitle>Open</CardTitle></CardHeader>
              <CardContent className="text-2xl">{stats.open}</CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Critical</CardTitle></CardHeader>
              <CardContent className="text-2xl">{stats.critical}</CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>This Week</CardTitle></CardHeader>
              <CardContent className="text-2xl">{stats.thisWeek}</CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Assigned to Me</CardTitle></CardHeader>
              <CardContent className="text-2xl">{stats.assignedToMe}</CardContent>
            </Card>
          </>
        )}
      </div>

      {/* RECENT INCIDENTS */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Recent Incidents</h2>
        <div className="space-y-2">
          {recentIncidents.map((incident) => (
            <Card key={incident.id}>
              <CardContent className="p-4">
                <div className="font-medium">{incident.title}</div>
                <div className="text-sm text-gray-500">
                  {incident.severity} • {incident.status} •{" "}
                  {new Date(incident.createdAt).toLocaleDateString()}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="flex gap-4 pt-4">
        <Button onClick={() => router.push("/dashboard/incidents/create")}>Create Incident</Button>
        <Button variant="secondary" onClick={() => alert("TODO: Connect Slack")}>Connect Slack</Button>
      </div>
    </div>
  )
}
