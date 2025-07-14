"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const faqs = [
  {
    question: "How does CIRCL differ from other incident management tools?",
    answer:
      "CIRCL focuses specifically on real-time collaboration during incidents. Unlike traditional tools that are more suited for ticket management, CIRCL provides live updates, real-time chat, and collaborative features designed for fast incident resolution.",
  },
  {
    question: "Can I integrate CIRCL with my existing tools?",
    answer:
      "Yes! CIRCL integrates with 50+ popular tools including Slack, GitHub, Jira, PagerDuty, and more. We also provide webhooks and a REST API for custom integrations.",
  },
  {
    question: "Is there a free trial available?",
    answer:
      "All paid plans come with a 14-day free trial. No credit card required to get started. You can explore all features during the trial period.",
  },
  {
    question: "How secure is my incident data?",
    answer:
      "Security is our top priority. We're SOC 2 Type II certified, GDPR compliant, and use end-to-end encryption. Your data is stored in secure, geographically distributed data centers.",
  },
  {
    question: "Can I customize workflows for my team?",
    answer:
      "Yes, Professional and Enterprise plans include custom workflow capabilities. You can define incident types, severity levels, escalation rules, and notification preferences to match your team's processes.",
  },
  {
    question: "What kind of support do you provide?",
    answer:
      "We offer different support levels based on your plan: Community support for free users, priority email support for Professional users, and dedicated support with SLA guarantees for Enterprise customers.",
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            Frequently asked <span className="text-orange-500">questions</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about CIRCL and incident management.
          </p>
        </motion.div>

        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, staggerChildren: 0.1 }}
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <Card className="overflow-hidden">
                <motion.button
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                >
                  <span className="font-semibold text-foreground pr-4">{faq.question}</span>
                  <motion.div animate={{ rotate: openIndex === index ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  </motion.div>
                </motion.button>
                <motion.div
                  initial={false}
                  animate={{
                    height: openIndex === index ? "auto" : 0,
                    opacity: openIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <CardContent className="pt-0 pb-6">
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </motion.div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
