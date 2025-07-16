"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Terminal, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { navigationItems } from "@/constants/data"
import Link from "next/link"
import { useUser } from "@/hooks/useUser"

interface NavbarProps {
  isDark: boolean
  onThemeToggle: () => void
}

export function Navbar({ isDark, onThemeToggle }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const user = useUser()

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full z-50 backdrop-blur-md bg-background/80 border-b transition-colors"
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <motion.div className="flex items-center space-x-2" whileHover={{ scale: 1.05 }}>
          <Terminal className="w-8 h-8 text-orange-500 dark:text-orange-400" />
          <span className="text-2xl font-bold text-foreground">CIRCL</span>
        </motion.div>

        <nav className="hidden md:flex space-x-8">
          {navigationItems.map((item) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase().replace(" ", "-")}`}
              className="text-muted-foreground hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {item}
            </motion.a>
          ))}
        </nav>

        <div className="flex items-center space-x-4 text-foreground cursor-pointer">
          <ThemeToggle isDark={isDark} onToggle={onThemeToggle} />

          <Link href={`${user ? "/dashboard" : "/login"}`}>
            <Button className="bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 cursor-pointer">
              Get Started
            </Button>
          </Link>
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden cursor-pointer" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
              {navigationItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(" ", "-")}`}
                  className="block text-muted-foreground hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <Separator />
              <Link href={"/login"}>
                  <Button variant="ghost" className="w-full justify-start cursor-pointer">
                    Login
                  </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}