import { DashboardHeader } from "@/components/DashboardHeader";
import { RecentActivity } from "@/components/RecentActivity";
import { StatsCards } from "@/components/StatsCard";
import {Plus, Settings, Users } from "lucide-react";

export function Dashboard() {
  return (
    <div className="space-y-6">
      <DashboardHeader />

      <div>
        {/* Optional: Enable this */}
        {/* <StatsCards /> */}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <RecentActivity />
          </div>

          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 rounded-lg bg-gray-800/40 hover:bg-gray-800/60 transition-colors flex items-center space-x-3">
                  <Plus className="w-5 h-5 text-blue-400" />
                  <span className="text-white">Create Incident</span>
                </button>
                <button className="w-full text-left p-3 rounded-lg bg-gray-800/40 hover:bg-gray-800/60 transition-colors flex items-center space-x-3">
                  <Users className="w-5 h-5 text-green-400" />
                  <span className="text-white">Invite User</span>
                </button>
                <button className="w-full text-left p-3 rounded-lg bg-gray-800/40 hover:bg-gray-800/60 transition-colors flex items-center space-x-3">
                  <Settings className="w-5 h-5 text-purple-400" />
                  <span className="text-white">Settings</span>
                </button>
              </div>
            </div>

            {/* System Status */}
            <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">System Status</h3>
              <div className="space-y-3">
                {[
                  { label: "API Service", status: "Operational", color: "green" },
                  { label: "Database", status: "Degraded", color: "yellow" },
                  { label: "CDN", status: "Operational", color: "green" },
                ].map(({ label, status, color }, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-gray-300">{label}</span>
                    <span className="flex items-center space-x-2">
                      <div className={`w-2 h-2 bg-${color}-400 rounded-full`}></div>
                      <span className={`text-${color}-400 text-sm`}>{status}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
