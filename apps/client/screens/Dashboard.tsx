"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { createSupabaseClient } from "@ops/shared"
import { useRouter } from "next/navigation"
import {
  Activity,
  AlertTriangle,
  Calendar,
  User,
  Plus,
  Slack,
  LogOut,
  TrendingUp,
  Clock,
  CheckCircle,
} from "lucide-react"
import axios from "axios"

type DashboardStats = {
  total: number
  byStatus: {
    open: number
    investigating: number
    resolved: number
    closed: number
  }
  bySeverity: {
    critical: number
    high: number
    medium: number
    low: number
  }
}

type Incident = {
  id: string
  title: string
  description: string
  severity: string
  status: string
  category: string
  source: string
  createdAt: string
  updatedAt: string
  createdById: string
  assignedToId: string | null
  investigationNotes: string | null
  mitigationSteps: string | null
  resolutionSummary: string | null
  affectedSystems: string[]
  reportedIP: string | null
  isReportable: boolean
  reportDeadline: string | null
  notifiedAuthorities: boolean
  attachments: any
}

const getSeverityColor = (severity: string) => {
  switch (severity.toLowerCase()) {
    case "critical":
      return "destructive"
    case "high":
      return "destructive"
    case "medium":
      return "default"
    case "low":
      return "secondary"
    default:
      return "outline"
  }
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "open":
      return "destructive"
    case "investigating":
      return "default"
    case "resolved":
      return "secondary"
    case "closed":
      return "outline"
    default:
      return "outline"
  }
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [recentIncidents, setRecentIncidents] = useState<Incident[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createSupabaseClient()
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [summaryResponse, incidentsResponse] = await Promise.all([
          axios.get("http://localhost:3001/api/v1/dashboard/summary"),
          axios.get("http://localhost:3001/api/v1/incidents"),
        ])

        // Handle the API response structure
        setStats(summaryResponse.data.result)
        setRecentIncidents(incidentsResponse.data.result)
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleSignout = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  // Calculate stats for display cards based on actual API response
  const getThisWeekCount = () => {
    if (!recentIncidents) return 0
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
    
    return recentIncidents.filter(incident => 
      new Date(incident.createdAt) >= oneWeekAgo
    ).length
  }

  const getAssignedToMeCount = () => {
    // You'll need to replace this with actual user ID logic
    // For now, counting incidents that have an assignedToId
    return recentIncidents.filter(incident => incident.assignedToId !== null).length
  }

  const statsCards = [
    {
      title: "Open Incidents",
      value: (stats?.byStatus.open as any) + stats?.byStatus.investigating || 0,
      icon: Activity,
      color: "text-red-400",
      bgColor: "bg-red-400/10",
    },
    {
      title: "Critical Issues",
      value: stats?.bySeverity.critical || 0,
      icon: AlertTriangle,
      color: "text-orange-400",
      bgColor: "bg-orange-400/10",
    },
    {
      title: "This Week",
      value: getThisWeekCount(),
      icon: Calendar,
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
    },
    {
      title: "Assigned to Me",
      value: getAssignedToMeCount(),
      icon: User,
      color: "text-green-400",
      bgColor: "bg-green-400/10",
    },
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-800 rounded w-64"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-800 rounded-lg"></div>
              ))}
            </div>
            <div className="h-96 bg-gray-800 rounded-lg"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              CIRCL Dashboard
            </h1>
            <p className="text-gray-400 mt-1">Monitor and manage your incidents</p>
          </div>
          <Button
            variant="outline"
            onClick={handleSignout}
            className="hidden sm:flex border-gray-700 hover:bg-gray-800 text-white bg-transparent"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsCards.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index} className="bg-gray-900/50 border-gray-800 hover:bg-gray-900/70 transition-colors">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">{stat.title}</CardTitle>
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`w-4 h-4 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="flex items-center text-xs text-gray-400 mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    <span>vs last period</span>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Recent Incidents */}
          <div className="xl:col-span-2">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-xl text-white flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-blue-400" />
                  Recent Incidents
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentIncidents.length > 0 ? (
                  recentIncidents.map((incident, index) => (
                    <div key={incident.id}>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-colors cursor-pointer">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-white truncate">{incident.title}</h3>
                          <p className="text-sm text-gray-400 mt-1 line-clamp-2">{incident.description}</p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                            <span>Source: {incident.source}</span>
                            <span>Category: {incident.category}</span>
                            <span>
                              {new Date(incident.createdAt).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                          {incident.affectedSystems.length > 0 && (
                            <div className="mt-2 text-foreground">
                              <span className="text-xs text-gray-500">Affected: </span>
                              {incident.affectedSystems.map((system, i) => (
                                <Badge key={i} variant="outline" className="text-xs mr-1 text-white">
                                  {system}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={getSeverityColor(incident.severity)} className="text-xs">
                            {incident.severity}
                          </Badge>
                          <Badge variant={getStatusColor(incident.status)} className="text-xs">
                            {incident.status}
                          </Badge>
                          {incident.isReportable && (
                            <Badge variant="outline" className="text-xs text-yellow-400 border-yellow-400">
                              Reportable
                            </Badge>
                          )}
                        </div>
                      </div>
                      {index < recentIncidents.length - 1 && <Separator className="bg-gray-800 my-2" />}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-400">
                    <CheckCircle className="w-12 h-12 mx-auto mb-3 text-gray-600" />
                    <p>No recent incidents</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="bg-gray-900/50 border-gray-800 text-foreground">
              <CardHeader>
                <CardTitle className="text-lg text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  onClick={() => router.push("/dashboard/incidents/create")}
                  className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Incident
                </Button>
                <Button
                  variant="outline"
                  onClick={() => alert("TODO: Connect Slack")}
                  className="w-full justify-start border-gray-700 hover:bg-gray-800 text-black"
                >
                  <Slack className="w-4 h-4 mr-2" />
                  Connect Slack
                </Button>
              </CardContent>
            </Card>

            {/* Incident Summary */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-lg text-white">Incident Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-300">By Status</h4>
                  {stats && Object.entries(stats.byStatus).map(([status, count]) => (
                    <div key={status} className="flex items-center justify-between">
                      <span className="text-gray-300 text-sm capitalize">{status}</span>
                      <Badge variant={getStatusColor(status)} className="text-xs">
                        {count}
                      </Badge>
                    </div>
                  ))}
                </div>
                <Separator className="bg-gray-800" />
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-300">By Severity</h4>
                  {stats && Object.entries(stats.bySeverity).map(([severity, count]) => (
                    <div key={severity} className="flex items-center justify-between">
                      <span className="text-gray-300 text-sm capitalize">{severity}</span>
                      <Badge variant={getSeverityColor(severity)} className="text-xs">
                        {count}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-lg text-white">System Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: "API Service", status: "Operational", color: "green" },
                  { label: "Database", status: "Degraded", color: "yellow" },
                  { label: "CDN", status: "Operational", color: "green" },
                ].map(({ label, status, color }, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm">{label}</span>
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          color === "green" ? "bg-green-400" : color === "yellow" ? "bg-yellow-400" : "bg-red-400"
                        }`}
                      ></div>
                      <span
                        className={`text-sm ${
                          color === "green" ? "text-green-400" : color === "yellow" ? "text-yellow-400" : "text-red-400"
                        }`}
                      >
                        {status}
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}