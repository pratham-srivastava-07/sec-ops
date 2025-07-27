"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Terminal, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
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
  const [activeItem, setActiveItem] = useState("")
  const user = useUser()

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full z-50 backdrop-blur-md transition-colors"
    >
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo - Left Side */}
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Terminal className="w-7 h-7 sm:w-8 sm:h-8 text-orange-500 dark:text-orange-400" />
            <span className="text-xl sm:text-2xl font-bold text-foreground">CIRCL</span>
          </motion.div>

          {/* Navigation - Center (Desktop) */}
          <nav className="hidden lg:block">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center space-x-1 bg-muted/50 backdrop-blur-sm rounded-full px-2 py-2 border border-border/50"
            >
              {navigationItems.map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase().replace(" ", "-")}`}
                  className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-full"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onHoverStart={() => setActiveItem(item)}
                  onHoverEnd={() => setActiveItem("")}
                >
                  {activeItem === item && (
                    <motion.div
                      layoutId="navbar-active"
                      className="absolute inset-0 bg-orange-500/10 dark:bg-orange-400/10 rounded-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item}</span>
                </motion.a>
              ))}
            </motion.div>
          </nav>

          {/* Actions - Right Side */}
          <div className="flex items-center space-x-2 sm:space-x-4 text-foreground">
            {/* <ThemeToggle isDark={isDark} onToggle={onThemeToggle} /> */}

            <Link href={`${user ? "/dashboard" : "/login"}`} className="hidden sm:block">
              <Button
                className="bg-orange-500 hover:bg-orange-600 cursor-pointer dark:bg-orange-600 dark:hover:bg-orange-700 text-white font-medium px-4 py-2 rounded-full transition-all duration-200 hover:scale-105"
                size="sm"
              >
                Get Started
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden rounded-full"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <motion.div animate={{ rotate: mobileMenuOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.div>
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden mt-4 overflow-hidden"
            >
              <div className="bg-muted/30 backdrop-blur-sm rounded-2xl border border-border/50 p-4 space-y-2">
                {navigationItems.map((item, index) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase().replace(" ", "-")}`}
                    className="block px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-orange-500/10 dark:hover:bg-orange-400/10 transition-all duration-200 rounded-xl font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {item}
                  </motion.a>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navigationItems.length * 0.1 }}
                  className="pt-2 mt-4 border-t border-border/50"
                >
                  <Link href={`${user ? "/dashboard" : "/login"}`}>
                    <Button
                      className="w-full bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 text-white font-medium rounded-xl"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Get Started
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
