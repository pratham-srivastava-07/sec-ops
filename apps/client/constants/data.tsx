import { Shield, Zap, Users, Terminal, GitBranch, Clock, Activity } from "lucide-react"
import type { Feature, Step, RoadmapItem, Testimonial, Incident } from "@/types"

export const incidents: Incident[] = [
  {
    id: 1,
    title: "Database Connection Timeout",
    severity: "High",
    time: "2m ago",
    status: "Active",
    users: ["JD", "SM"],
  },
  {
    id: 2,
    title: "API Rate Limit Exceeded",
    severity: "Medium",
    time: "5m ago",
    status: "Investigating",
    users: ["AL"],
  },
  {
    id: 3,
    title: "SSL Certificate Expiry",
    severity: "Low",
    time: "12m ago",
    status: "Resolved",
    users: ["KR", "MJ"],
  },
]

export const features: Feature[] = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Real-Time Logs",
    description: "Live collaboration over WebSockets with instant updates",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Supabase Auth",
    description: "Easy, secure user access with GitHub integration",
  },
  {
    icon: <GitBranch className="w-6 h-6" />,
    title: "Incident Metadata",
    description: "Track severity, timeline, and status with structured data",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Presence Awareness",
    description: "Know who's actively responding to incidents",
  },
  {
    icon: <Terminal className="w-6 h-6" />,
    title: "CLI Tool (Coming)",
    description: "Manage incidents directly from your terminal",
  },
  {
    icon: <Activity className="w-6 h-6" />,
    title: "Smart Analytics",
    description: "Track response times and team performance",
  },
]

export const steps: Step[] = [
  {
    step: "01",
    title: "Login & Create",
    description: "Authenticate and start incident tracking instantly",
  },
  {
    step: "02",
    title: "Collaborate Live",
    description: "Real-time team coordination with live updates",
  },
  {
    step: "03",
    title: "Resolve & Document",
    description: "Close incidents with complete timeline documentation",
  },
]

export const roadmapItems: RoadmapItem[] = [
  {
    icon: <Terminal className="w-8 h-8" />,
    title: "CLI Tool",
    description: "Terminal-based incident management",
    status: "In Progress",
  },
  {
    icon: <Activity className="w-8 h-8" />,
    title: "Integrations",
    description: "Connect with monitoring tools",
    status: "Planned",
  },
  {
    icon: <Clock className="w-8 h-8" />,
    title: "Smart Alerts",
    description: "Automated incident detection",
    status: "Planned",
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Team Roles",
    description: "Advanced permission management",
    status: "Research",
  },
]

export const testimonial: Testimonial = {
  quote: "We reduced response time by 50% after switching to CIRCL.",
  author: "Jane Smith",
  role: "DevOps Engineer",
  initials: "JS",
}



export const navigationItems = ["Features", "How It Works", "Roadmap", "About Us", "Contact"]

export const footerLinks = ["GitHub", "Docs", "Login", "Terms"]
