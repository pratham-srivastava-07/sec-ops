"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "./ui/button"
import { Menu, MenuIcon, Moon, Sun, Terminal, X } from "lucide-react"
import { useState } from "react"
import { Separator } from "@radix-ui/react-separator"



export default function Navbar() {
    const [isDark, setIsDark] = useState(true)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    return (
    <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full z-50 backdrop-blur-md bg-background/80 border-b"
      >
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div className="flex items-center space-x-2" whileHover={{ scale: 1.05 }}>
            <Terminal className="w-8 h-8 text-orange-500" />
            <span className="text-2xl font-bold">CIRCL</span>
          </motion.div>

          <nav className="hidden md:flex space-x-8">
            {["Features", "How It Works", "Roadmap"].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                className="text-muted-foreground hover:text-orange-500 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item}
              </motion.a>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={() => setIsDark(!isDark)} className="rounded-full">
              <motion.div initial={false} animate={{ rotate: isDark ? 0 : 180 }} transition={{ duration: 0.3 }}>
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </motion.div>
            </Button>

            <Button variant="ghost" className="hidden md:inline-flex">
              Login
            </Button>

            <Button className="bg-orange-500 hover:bg-orange-600">Get Started</Button>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t bg-background/95 backdrop-blur-md"
            >
              <div className="container mx-auto px-6 py-4 space-y-4">
                {["Features", "How It Works", "Roadmap"].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase().replace(" ", "-")}`}
                    className="block text-muted-foreground hover:text-orange-500 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
                <Separator />
                <Button variant="ghost" className="w-full justify-start">
                  Login
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    )
}