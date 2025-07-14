"use client"

import { motion } from "framer-motion"
import { Shield, Lock, Eye, Server } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const securityFeatures = [
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Enterprise Security",
    description: "SOC 2 Type II certified with end-to-end encryption for all data in transit and at rest.",
  },
  {
    icon: <Lock className="w-8 h-8" />,
    title: "SSO & SAML",
    description: "Single sign-on integration with your existing identity providers like Okta, Azure AD, and more.",
  },
  {
    icon: <Eye className="w-8 h-8" />,
    title: "Audit Logs",
    description: "Complete audit trail of all actions and changes for compliance and security monitoring.",
  },
  {
    icon: <Server className="w-8 h-8" />,
    title: "Data Residency",
    description: "Choose where your data is stored with multiple regions available worldwide.",
  },
]

const certifications = [
  { name: "SOC 2", description: "Type II Certified" },
  { name: "GDPR", description: "Compliant" },
  { name: "ISO 27001", description: "Certified" },
  { name: "HIPAA", description: "Ready" },
]

export function SecuritySection() {
  return (
    <section className="py-20 px-6 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-green-500/5">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            <span className="text-blue-500">Enterprise-grade</span> security
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your incident data is protected with the highest security standards and compliance certifications.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, staggerChildren: 0.1 }}
        >
          {securityFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="text-blue-500 mb-2">{feature.icon}</div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.name}
              className="text-center p-6 bg-background/50 backdrop-blur-sm rounded-lg border"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-2xl font-bold text-blue-500 mb-1">{cert.name}</div>
              <div className="text-sm text-muted-foreground">{cert.description}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
