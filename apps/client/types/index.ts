import type React from "react"
export interface Incident {
  id: number
  title: string
  severity: "High" | "Medium" | "Low"
  time: string
  status: "Active" | "Investigating" | "Resolved"
  users: string[]
}

export interface Feature {
  icon: React.ReactNode
  title: string
  description: string
}

export interface Step {
  step: string
  title: string
  description: string
}

export interface RoadmapItem {
  icon: React.ReactNode
  title: string
  description: string
  status: "In Progress" | "Planned" | "Research"
}

export interface Testimonial {
  quote: string
  author: string
  role: string
  initials: string
}
