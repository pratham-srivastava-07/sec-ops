"use client"

import { motion } from "framer-motion"

const customers = [
  { name: "TechCorp", logo: "🏢" },
  { name: "DataFlow", logo: "📊" },
  { name: "CloudSync", logo: "☁️" },
  { name: "DevTools", logo: "🛠️" },
  { name: "SecureNet", logo: "🔒" },
  { name: "FastAPI", logo: "⚡" },
  { name: "ScaleUp", logo: "📈" },
  { name: "InnovateLab", logo: "🧪" },
]

export function CustomerLogosSection() {
  return (
    <section className="py-16 px-6 border-b">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-muted-foreground mb-8">Trusted by innovative teams at leading companies</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, staggerChildren: 0.1 }}
        >
          {customers.map((customer, index) => (
            <motion.div
              key={customer.name}
              className="flex flex-col items-center space-y-2 opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 0.6, y: 0 }}
              whileHover={{ opacity: 1, scale: 1.05 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="text-3xl">{customer.logo}</div>
              <div className="text-sm font-medium text-muted-foreground">{customer.name}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
