"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Shield,
  Zap,
  Users,
  Terminal,
  GitBranch,
  Clock,
  Sun,
  Moon,
  Github,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Activity,
  Menu,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import Navbar from "@/components/Navbar"
import HeroSection from "@/components/HeroSection"

export default function CIRCLLanding() {
  const [isDark, setIsDark] = useState(true)
  const [activeIncident, setActiveIncident] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Simulate live incident updates
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIncident((prev) => (prev + 1) % 3)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const incidents = [
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

  const features = [
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

  const steps = [
    { step: "01", title: "Login & Create", description: "Authenticate and start incident tracking instantly" },
    { step: "02", title: "Collaborate Live", description: "Real-time team coordination with live updates" },
    { step: "03", title: "Resolve & Document", description: "Close incidents with complete timeline documentation" },
  ]

  const roadmapItems = [
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

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? "dark bg-gray-900" : "bg-white"}`}>
      {/* Header */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Problem & Solution */}
      <motion.section
        className="py-20 px-6 bg-muted/50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto text-center">
          <motion.h2
            className="text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Incidents are <span className="text-red-500">chaotic</span>. CIRCL brings{" "}
            <span className="text-green-500">clarity</span>.
          </motion.h2>
          <motion.p
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Poor coordination and delayed responses cost valuable time. CIRCL provides real-time collaboration and
            structured incident management for technical teams.
          </motion.p>
        </div>
      </motion.section>

      {/* Live Preview */}
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
                          <AlertTriangle
                            className={`w-5 h-5 ${
                              incident.severity === "High"
                                ? "text-red-500"
                                : incident.severity === "Medium"
                                  ? "text-yellow-500"
                                  : "text-green-500"
                            }`}
                          />
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
                            variant={
                              incident.status === "Active"
                                ? "destructive"
                                : incident.status === "Investigating"
                                  ? "secondary"
                                  : "default"
                            }
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

      {/* Features */}
      <section id="features" className="py-20 px-6 bg-muted/50">
        <div className="container mx-auto">
          <motion.h2
            className="text-4xl font-bold text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Key Features
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="text-orange-500 mb-2">{feature.icon}</div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6">
        <div className="container mx-auto">
          <motion.h2
            className="text-4xl font-bold text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            How It Works
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {steps.map((step, index) => (
              <motion.div key={index} className="text-center" variants={itemVariants} whileHover={{ scale: 1.05 }}>
                <motion.div
                  className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-2xl font-bold mb-6 mx-auto"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  {step.step}
                </motion.div>
                <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why CIRCL */}
      <section className="py-20 px-6 bg-muted/50">
        <div className="container mx-auto">
          <motion.h2
            className="text-4xl font-bold text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Why CIRCL?
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-red-400">Traditional Approach</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {[
                      "Email chains and scattered communication",
                      "Manual status updates",
                      "No real-time collaboration",
                      "Delayed incident resolution",
                    ].map((item, index) => (
                      <motion.li
                        key={index}
                        className="flex items-center space-x-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.4 }}
                      >
                        <span className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></span>
                        <span className="text-muted-foreground">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-green-400">With CIRCL</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {[
                      "Centralized incident tracking",
                      "Live updates and collaboration",
                      "Developer-friendly interface",
                      "Faster incident resolution",
                    ].map((item, index) => (
                      <motion.li
                        key={index}
                        className="flex items-center space-x-3"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.4 }}
                      >
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card className="max-w-4xl mx-auto">
              <CardContent className="p-12">
                <motion.p
                  className="text-2xl md:text-3xl mb-6 italic"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  "We reduced response time by 50% after switching to CIRCL."
                </motion.p>
                <motion.div
                  className="flex items-center justify-center space-x-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-orange-500 text-white">JS</AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <p className="font-semibold">Jane Smith</p>
                    <p className="text-muted-foreground">DevOps Engineer</p>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Roadmap */}
      <section id="roadmap" className="py-20 px-6 bg-muted/50">
        <div className="container mx-auto">
          <motion.h2
            className="text-4xl font-bold text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Future Plans
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {roadmapItems.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="text-orange-500 mb-2">{item.icon}</div>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <Badge
                        variant={
                          item.status === "In Progress"
                            ? "default"
                            : item.status === "Planned"
                              ? "secondary"
                              : "outline"
                        }
                        className="text-xs"
                      >
                        {item.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{item.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div className="flex items-center space-x-2 mb-4 md:mb-0" whileHover={{ scale: 1.05 }}>
              <Terminal className="w-6 h-6 text-orange-500" />
              <span className="text-xl font-bold">CIRCL</span>
            </motion.div>

            <div className="flex items-center space-x-6">
              {["GitHub", "Docs", "Login", "Terms"].map((item) => (
                <motion.a
                  key={item}
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </div>

          <Separator className="my-8" />

          <div className="text-center text-muted-foreground">
            <p>Built with ❤️ by developers, for developers.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
