import { AlertTriangle, Users, Clock, Shield, TrendingUp } from "lucide-react";
import { stats } from "./global/Stats";

export function StatsCards() {
  

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-xl p-6 hover:border-gray-700/50 transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">{stat.title}</p>
              <p className="text-2xl font-bold text-white mt-2">{stat.value}</p>
              <div className="flex items-center mt-2 space-x-1">
                <TrendingUp className={`w-4 h-4 ${
                  stat.changeType === 'increase' ? 'text-green-400' : 'text-red-400'
                }`} />
                <span className={`text-sm font-medium ${
                  stat.changeType === 'increase' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {stat.change}
                </span>
                <span className="text-gray-400 text-sm">vs last month</span>
              </div>
            </div>
            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} bg-opacity-40 flex items-center justify-center`}>
              {/* <stat.icon className="w-6 h-6 text-white" /> */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}