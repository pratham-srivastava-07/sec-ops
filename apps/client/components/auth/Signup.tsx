"use client"

import { useState } from "react"
import { AuthLayout, AuthCard, useAuth } from "./shared"
import { Loader2 } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "@radix-ui/react-label"

export function SignUpForm() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const { handleSignUp, handleSocialAuth, router } = useAuth()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")
    
    const { error } = await handleSignUp(email, password, name)
    
    setLoading(false)
    if (error) {
      setMessage(`Error: ${error}`)
    } else {
      setMessage("Check your email for a confirmation link!")
      router.push("/check-your-email")
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
    <AuthLayout title="Join CIRCL" description="Create your account to get started">
      <AuthCard
        title="Join CIRCL"
        description="Create your account to get started"
        message={message}
        onSocialAuth={onSocialAuth}
      >
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input 
              id="name" 
              type="text" 
              placeholder="John Doe" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </div>
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
            {loading ? "Signing Up..." : "Sign Up"}
          </Button>
        </form>
      </AuthCard>
    </AuthLayout>
  )
}