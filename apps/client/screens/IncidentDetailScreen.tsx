"use client"
import { useState, useEffect } from "react"
import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import {
  ArrowLeft,
  AlertTriangle,
  CheckCircle,
  Clock,
  XCircle,
  Calendar,
  User,
  MapPin,
  Shield,
  FileText,
  Activity,
  Globe,
  Server,
  RefreshCw,
  Edit,
  MessageSquare,
  ExternalLink,
  Copy,
  CheckCheck,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/hooks/use-toast"

const PORT = process.env.PORT || 3001

export default function IncidentDetail() {
  const params = useParams()
  const router = useRouter()
  const [incident, setIncident] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  const incidentId = params.id as string

  async function fetchIncident() {
    try {
      setLoading(true)
      const res = await axios.get(`http://localhost:${PORT}/api/v1/incidents/${incidentId}`)
      setIncident(res.data.result)
    } catch (e) {
      console.log("Error occurred fetching incident", e)
      toast({
        title: "Error",
        description: "Failed to fetch incident details",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (incidentId) {
      fetchIncident()
    }
  }, [incidentId])

  const getStatusIcon = (status: string) => {
    switch (status?.toUpperCase()) {
      case "OPEN":
        return <AlertTriangle className="w-5 h-5" />
      case "INVESTIGATING":
        return <Clock className="w-5 h-5" />
      case "RESOLVED":
        return <CheckCircle className="w-5 h-5" />
      case "CLOSED":
        return <XCircle className="w-5 h-5" />
      default:
        return <AlertTriangle className="w-5 h-5" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status?.toUpperCase()) {
      case "OPEN":
        return "bg-red-500/10 text-red-400 border-red-500/20"
      case "INVESTIGATING":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
      case "RESOLVED":
        return "bg-green-500/10 text-green-400 border-green-500/20"
      case "CLOSED":
        return "bg-gray-500/10 text-gray-400 border-gray-500/20"
      default:
        return "bg-red-500/10 text-red-400 border-red-500/20"
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity?.toUpperCase()) {
      case "CRITICAL":
        return "bg-red-500/10 text-red-400 border-red-500/20"
      case "HIGH":
        return "bg-orange-500/10 text-orange-400 border-orange-500/20"
      case "MEDIUM":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
      case "LOW":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20"
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/20"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    })
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    toast({
      title: "Copied!",
      description: "Incident ID copied to clipboard",
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <RefreshCw className="w-8 h-8 animate-spin text-primary" />
            <span className="ml-3 text-lg text-muted-foreground">Loading incident details...</span>
          </div>
        </div>
      </div>
    )
  }

  if (!incident) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-12">
            <AlertTriangle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">Incident Not Found</h2>
            <p className="text-muted-foreground mb-6">
              The incident you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => router.back()} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => router.back()} className="hover:bg-accent">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Incident ID:</span>
                <code className="px-2 py-1 bg-muted rounded text-sm font-mono">{incident.id.split("-")[0]}...</code>
                <Button variant="ghost" size="sm" onClick={() => copyToClipboard(incident.id)} className="h-6 w-6 p-0">
                  {copied ? <CheckCheck className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <Button size="sm">
                <MessageSquare className="w-4 h-4 mr-2" />
                Add Note
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* Title and Status */}
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-2 flex-1">
              <h1 className="text-3xl font-bold text-foreground leading-tight">{incident.title}</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">{incident.description}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <Badge variant="outline" className={`${getStatusColor(incident.status)} px-3 py-1`}>
              <div className="flex items-center gap-2">
                {getStatusIcon(incident.status)}
                <span className="font-medium">{incident.status}</span>
              </div>
            </Badge>
            <Badge variant="outline" className={`${getSeverityColor(incident.severity)} px-3 py-1`}>
              <span className="font-medium">{incident.severity} SEVERITY</span>
            </Badge>
            <Badge variant="secondary" className="px-3 py-1">
              {incident.category}
            </Badge>
            {incident.isReportable && (
              <Badge variant="outline" className="bg-amber-500/10 text-amber-400 border-amber-500/20 px-3 py-1">
                <Shield className="w-3 h-3 mr-1" />
                Reportable
              </Badge>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Timeline
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Incident Created</span>
                        <span className="text-sm text-muted-foreground">{formatDate(incident.createdAt)}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">Initial incident report submitted</p>
                    </div>
                  </div>

                  {incident.updatedAt !== incident.createdAt && (
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Last Updated</span>
                          <span className="text-sm text-muted-foreground">{formatDate(incident.updatedAt)}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">Incident details modified</p>
                      </div>
                    </div>
                  )}

                  {incident.reportDeadline && (
                    <div className="flex items-center gap-3 p-3 bg-amber-500/10 rounded-lg border border-amber-500/20">
                      <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-amber-400">Report Deadline</span>
                          <span className="text-sm text-amber-400">{formatDate(incident.reportDeadline)}</span>
                        </div>
                        <p className="text-sm text-amber-400/80 mt-1">Regulatory reporting required</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Investigation Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Investigation Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {incident.investigationNotes ? (
                  <div>
                    <h4 className="font-medium mb-2">Investigation Notes</h4>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <p className="text-sm leading-relaxed">{incident.investigationNotes}</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No investigation notes available yet</p>
                    <Button variant="outline" size="sm" className="mt-3 bg-transparent">
                      Add Investigation Notes
                    </Button>
                  </div>
                )}

                {incident.mitigationSteps && (
                  <div>
                    <h4 className="font-medium mb-2">Mitigation Steps</h4>
                    <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                      <p className="text-sm leading-relaxed">{incident.mitigationSteps}</p>
                    </div>
                  </div>
                )}

                {incident.resolutionSummary && (
                  <div>
                    <h4 className="font-medium mb-2">Resolution Summary</h4>
                    <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                      <p className="text-sm leading-relaxed">{incident.resolutionSummary}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Affected Systems */}
            {incident.affectedSystems && incident.affectedSystems.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Server className="w-5 h-5" />
                    Affected Systems
                  </CardTitle>
                  <CardDescription>Systems and services impacted by this incident</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {incident.affectedSystems.map((system: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        <Server className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">{system}</span>
                        <Badge variant="outline" size="sm" className="ml-auto">
                          Affected
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Key Information */}
            <Card>
              <CardHeader>
                <CardTitle>Key Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Source</p>
                      <p className="text-sm text-muted-foreground">{incident.source}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Created</p>
                      <p className="text-sm text-muted-foreground">{formatDate(incident.createdAt)}</p>
                    </div>
                  </div>

                  {incident.assignedToId && (
                    <div className="flex items-center gap-3">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Assigned To</p>
                        <p className="text-sm text-muted-foreground">{incident.assignedToId}</p>
                      </div>
                    </div>
                  )}

                  {incident.reporterIP && (
                    <div className="flex items-center gap-3">
                      <Globe className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Reporter IP</p>
                        <code className="text-sm text-muted-foreground font-mono">{incident.reporterIP}</code>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Compliance */}
            {incident.isReportable && (
              <Card className="border-amber-500/20 bg-amber-500/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-amber-400">
                    <Shield className="w-5 h-5" />
                    Compliance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Reportable Incident</span>
                    <Badge variant="outline" className="bg-amber-500/10 text-amber-400 border-amber-500/20">
                      Yes
                    </Badge>
                  </div>

                  {incident.reportDeadline && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Report Deadline</span>
                      <span className="text-sm text-amber-400">
                        {new Date(incident.reportDeadline).toLocaleDateString()}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Authorities Notified</span>
                    <Badge variant={incident.notifiedAuthorities ? "default" : "secondary"}>
                      {incident.notifiedAuthorities ? "Yes" : "No"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Incident
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <User className="w-4 h-4 mr-2" />
                  Assign to User
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Add Comment
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Export Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
