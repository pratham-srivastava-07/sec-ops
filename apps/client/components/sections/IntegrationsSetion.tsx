"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

const integrations = [
  { name: "Slack", logo: "💬", color: "bg-purple-500" },
  { name: "GitHub", logo: "🐙", color: "bg-gray-800" },
  { name: "Jira", logo: "🔷", color: "bg-blue-500" },
  { name: "PagerDuty", logo: "📟", color: "bg-green-500" },
  { name: "Discord", logo: "🎮", color: "bg-indigo-500" },
  { name: "Teams", logo: "👥", color: "bg-blue-600" },
  { name: "Webhook", logo: "🔗", color: "bg-orange-500" },
  { name: "Email", logo: "📧", color: "bg-red-500" },
]

export function IntegrationsSection() {
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            Integrates with your <span className="text-orange-500">favorite tools</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Connect CIRCL with the tools your team already uses for seamless incident management
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, staggerChildren: 0.1 }}
        >
          {integrations.map((integration, index) => (
            <motion.div
              key={integration.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardContent className="p-6 text-center">
                  <motion.div
                    className={`w-12 h-12 ${integration.color} rounded-lg flex items-center justify-center text-2xl mb-3 mx-auto`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {integration.logo}
                  </motion.div>
                  <div className="font-semibold text-foreground">{integration.name}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <p className="text-muted-foreground">+ 50 more integrations available through our API</p>
        </motion.div>
      </div>
    </section>
  )
}
