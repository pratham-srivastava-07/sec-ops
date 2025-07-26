import { Activity } from "lucide-react";

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: "incident",
      title: "Database connection timeout",
      description: "High priority incident reported by multiple users",
      time: "2 minutes ago",
      status: "open",
      priority: "high"
    },
    {
      id: 2,
      type: "resolved",
      title: "Login service restored",
      description: "Authentication service is now fully operational",
      time: "15 minutes ago",
      status: "resolved",
      priority: "medium"
    },
    {
      id: 3,
      type: "user",
      title: "New team member added",
      description: "Sarah Johnson joined the incident response team",
      time: "1 hour ago",
      status: "info",
      priority: "low"
    },
    {
      id: 4,
      type: "incident",
      title: "Payment gateway slow response",
      description: "Payment processing experiencing delays",
      time: "2 hours ago",
      status: "investigating",
      priority: "medium"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'resolved': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'investigating': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '⚪';
    }
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800/50 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
        <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
          View all
        </button>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-4 p-4 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-colors">
            <div className="flex-shrink-0">
              <Activity className="w-5 h-5 text-gray-400 mt-0.5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <h4 className="text-sm font-medium text-white truncate">{activity.title}</h4>
                <span className="text-sm">{getPriorityIcon(activity.priority)}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(activity.status)}`}>
                  {activity.status}
                </span>
              </div>
              <p className="text-sm text-gray-400 mb-2">{activity.description}</p>
              <p className="text-xs text-gray-500">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}