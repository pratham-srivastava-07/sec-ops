"use client"

import { motion } from "framer-motion"
import { Terminal } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { footerLinks } from "@/constants/data"

export function Footer() {
  return (
    <footer className="py-12 px-6 border-t">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div className="flex items-center space-x-2 mb-4 md:mb-0" whileHover={{ scale: 1.05 }}>
            <Terminal className="w-6 h-6 text-orange-500" />
            <span className="text-xl font-bold text-foreground">CIRCL</span>
          </motion.div>

          <div className="flex items-center space-x-6">
            {footerLinks.map((item) => (
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
          <p>Built with passion by developers, for developers.</p>
        </div>
      </div>
    </footer>
  )
}
