"use client"

import type React from "react"
import { usePathname, useRouter } from "next/navigation"
import { syncUserToBackend } from "@ops/shared"
import { createClient } from "@/utils/supabase/browserClient"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Github, Terminal } from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"

export const AuthLayout = ({ children, title, description }: { 
  children: React.ReactNode
  title: string
  description: string
}) => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-muted/50">
      <motion.div
        className="lg:w-1/2 flex flex-col items-center justify-center p-8 text-center lg:text-left bg-gradient-to-br from-gray-900 to-gray-800 text-white"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="flex items-center space-x-4 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Terminal className="w-16 h-16 text-orange-500" />
          <h1 className="text-5xl font-bold">CIRCL</h1>
        </motion.div>
        <motion.p className="text-2xl font-semibold mb-4 max-w-md" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}>
          Real-Time Incident Collaboration for DevSecOps Teams
        </motion.p>
        <motion.p className="text-lg text-gray-300 max-w-md" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.6 }}>
          Report, respond, and resolve security or operational incidents — together, in real time.
        </motion.p>
      </motion.div>

      <motion.div
        className="lg:w-1/2 flex items-center justify-center p-8"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        {children}
      </motion.div>
    </div>
  )
}

export const AuthCard = ({ 
  children, 
  title, 
  description,
  showSocialAuth = true,
  message,
  onSocialAuth
}: { 
  children: React.ReactNode
  title: string
  description: string
  showSocialAuth?: boolean
  message?: string
  onSocialAuth?: () => void
}) => {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold text-foreground">
          {title}
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {children}
        
        {showSocialAuth && (
          <>
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
            <Button 
              variant="outline" 
              className="w-full bg-transparent" 
              onClick={onSocialAuth}
            >
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Button>
          </>
        )}
        
        {message && <p className="text-center text-sm mt-4 text-muted-foreground">{message}</p>}
      </CardContent>
    </Card>
  )
}

export const useAuth = () => {
  const supabase = createClient()
  const router = useRouter()
  
  return {
    supabase,
    router,
    handleSocialAuth: async (provider: "github") => {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: { redirectTo: `${window.location.origin}/auth/callback` },
      })
      if (error) {
        return { error: error.message }
      }
      return { success: true }
    },
    handleSignUp: async (email: string, password: string, name: string) => {
      const authResponse = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            name
          }
        },
      })
      
      if (authResponse?.data?.user) {
        syncUserToBackend({
          id: authResponse.data.user.id,
          name,
          email,
          webhookUrl: process.env.NEXT_PUBLIC_WEBHOOK_URL || "",
        })
      }
      
      if (authResponse.error) {
        return { error: authResponse.error.message }
      }
      return { success: true }
    },
    handleSignIn: async (email: string, password: string) => {
      const authResponse = await supabase.auth.signInWithPassword({ email, password })
      
      if (authResponse.error) {
        return { error: authResponse.error.message }
      }
      return { success: true }
    }
  }
}