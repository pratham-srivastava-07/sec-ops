"use client"

import { useState } from "react"
import { AuthLayout, AuthCard, useAuth } from "./shared"
import { Loader2 } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "@radix-ui/react-label"

export function SignInForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const { handleSignIn, handleSocialAuth, router } = useAuth()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")
    
    const { error } = await handleSignIn(email, password)
    
    setLoading(false)
    if (error) {
      setMessage(`Error: ${error}`)
    } else {
      setMessage("Signed in successfully!")
      router.push("/dashboard")
    }
  }

  const onSocialAuth = async () => {
    setLoading(true)
    setMessage("")
    
    const { error } = await handleSocialAuth("github")
    
    setLoading(false)
    if (error) {
      setMessage(`Error: ${error}`)
    }
  }

  return (
    <AuthLayout title="Welcome Back" description="Sign in to your account">
      <AuthCard
        title="Welcome Back"
        description="Sign in to your account"
        message={message}
        onSocialAuth={onSocialAuth}
      >
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="you@example.com" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              type="password" 
              placeholder="••••••••" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </form>
      </AuthCard>
    </AuthLayout>
  )
}