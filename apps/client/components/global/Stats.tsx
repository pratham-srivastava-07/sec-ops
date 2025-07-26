import { AlertTriangle, Clock, Shield, Users } from "lucide-react";

export const stats = [
    {
      title: "Total Incidents",
      value: "1,234",
      change: "+12%",
      changeType: "increase",
      icon: <AlertTriangle/>,
      color: "from-red-500 to-orange-500"
    },
    {
      title: "Active Users",
      value: "892",
      change: "+8%",
      changeType: "increase",
      icon: Users,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Response Time",
      value: "2.4m",
      change: "-15%",
      changeType: "decrease",
      icon: Clock,
      color: "from-green-500 to-teal-500"
    },
    {
      title: "Resolution Rate",
      value: "94.2%",
      change: "+3%",
      changeType: "increase",
      icon: Shield,
      color: "from-purple-500 to-pink-500"
    }
  ];