// this should fetch data from db and show it live using  ws connection

"use client"

import { motion } from "framer-motion"
import { AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader } from "@ops/ui"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@ops/ui"
import { Separator } from "@ops/ui"
import { incidents } from "@/constants/data"
import type { Incident } from "@/types"

interface LivePreviewProps {
  activeIncident: number
}

export function LivePreviewSection({ activeIncident }: LivePreviewProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  const getSeverityColor = (severity: Incident["severity"]) => {
    switch (severity) {
      case "High":
        return "text-red-500"
      case "Medium":
        return "text-yellow-500"
      case "Low":
        return "text-green-500"
      default:
        return "text-gray-500"
    }
  }

  const getStatusVariant = (status: Incident["status"]) => {
    switch (status) {
      case "Active":
        return "destructive"
      case "Investigating":
        return "secondary"
      case "Resolved":
        return "default"
      default:
        return "secondary"
    }
  }

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Card className="shadow-2xl overflow-hidden">
            <CardHeader className="bg-muted/50">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="ml-4 text-muted-foreground">CIRCL Incident Dashboard</span>
                <div className="ml-auto">
                  <Badge variant="secondary" className="bg-green-500/20 text-green-600">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                      className="w-2 h-2 bg-green-500 rounded-full mr-1"
                    />
                    Live
                  </Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Active Incidents</h3>
                <div className="flex items-center space-x-2">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                    className="w-2 h-2 bg-green-500 rounded-full"
                  />
                  <span className="text-sm text-muted-foreground">8 users online</span>
                </div>
              </div>

              <motion.div className="space-y-4" variants={containerVariants} initial="hidden" animate="visible">
                {incidents.map((incident, index) => (
                  <motion.div
                    key={incident.id}
                    variants={itemVariants}
                    className={`p-4 rounded-lg border transition-all duration-300 ${
                      activeIncident === index
                        ? "border-orange-500 bg-orange-500/10 shadow-lg"
                        : "border-border bg-muted/30"
                    }`}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <AlertTriangle className={`w-5 h-5 ${getSeverityColor(incident.severity)}`} />
                        <span className="font-medium">{incident.title}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="flex -space-x-1">
                          {incident.users.map((user, userIndex) => (
                            <Avatar key={userIndex} className="w-6 h-6 border border-background">
                              <AvatarFallback className="text-xs">{user}</AvatarFallback>
                            </Avatar>
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">{incident.time}</span>
                        <Badge
                          variant={getStatusVariant(incident.status)}
                          className={incident.status === "Resolved" ? "bg-green-500/20 text-green-600" : ""}
                        >
                          {incident.status}
                        </Badge>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <Separator className="my-6" />

              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-sm text-muted-foreground">Avg Response Time</div>
                    <div className="text-2xl font-bold text-orange-500">2.3m</div>
                    <div className="text-xs text-green-500">↓ 45% faster</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-sm text-muted-foreground">Team Efficiency</div>
                    <div className="text-2xl font-bold text-orange-500">94%</div>
                    <div className="text-xs text-green-500">↑ 12% improved</div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
