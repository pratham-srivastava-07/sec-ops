import { Search, Bell, Plus } from "lucide-react";

export function DashboardHeader() {
  return (
    <header className="bg-gray-900/50 backdrop-blur-xl border-b border-gray-800/50 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400 mt-1">Welcome back! Here's what's happening with your incidents.</p>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-gray-800/50 border border-gray-700/50 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 w-64"
            />
          </div>
          
          {/* Notifications */}
          <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>
          
          {/* Add new */}
          <button className="bg-blue-500/80 hover:bg-blue-500/90 text-white/90 px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>New Incident</span>
          </button>
        </div>
      </div>
    </header>
  );
}