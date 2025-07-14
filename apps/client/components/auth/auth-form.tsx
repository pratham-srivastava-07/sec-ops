"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createSupabaseClient } from "@ops/shared"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Github, Loader2 } from "lucide-react"

export function AuthForm() {
  const router = useRouter()
  const supabase = createSupabaseClient()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [tab, setTab] = useState("signin") // 'signin' or 'signup'

  const handleAuth = async (e: React.FormEvent, type: "signin" | "signup") => {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    let authResponse
    if (type === "signup") {
      authResponse = await supabase.auth.signUp({ email, password })
    } else {
      authResponse = await supabase.auth.signInWithPassword({ email, password })
    }

    setLoading(false)

    if (authResponse.error) {
      setMessage(`Error: ${authResponse.error.message}`)
    } else {
      if (type === "signup") {
        setMessage("Check your email for a confirmation link!")
        // For signup, we might want to redirect to a "check email" page or profile setup
        router.push("/check-your-email")
      } else {
        setMessage("Signed in successfully!")
        router.push("/dashboard")
      }
    }
  }

  const handleSocialAuth = async (provider: "github") => {
    setLoading(true)
    setMessage("")
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`, // Ensure this matches your Supabase redirect URL
      },
    })
    setLoading(false)
    if (error) {
      setMessage(`Error: ${error.message}`)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted/50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-foreground">
            {tab === "signin" ? "Welcome Back" : "Join CIRCL"}
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {tab === "signin" ? "Sign in to your account" : "Create your account to get started"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={tab} onValueChange={setTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="signin" className="mt-6">
              <form onSubmit={(e) => handleAuth(e, "signin")} className="space-y-4">
                <div>
                  <Label htmlFor="email-signin">Email</Label>
                  <Input
                    id="email-signin"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password-signin">Password</Label>
                  <Input
                    id="password-signin"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  {loading ? "Signing In..." : "Sign In"}
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="signup" className="mt-6">
              <form onSubmit={(e) => handleAuth(e, "signup")} className="space-y-4">
                <div>
                  <Label htmlFor="email-signup">Email</Label>
                  <Input
                    id="email-signup"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password-signup">Password</Label>
                  <Input
                    id="password-signup"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  {loading ? "Signing Up..." : "Sign Up"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

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
            onClick={() => handleSocialAuth("github")}
            disabled={loading}
          >
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Github className="mr-2 h-4 w-4" />}
            GitHub
          </Button>

          {message && <p className="text-center text-sm mt-4 text-muted-foreground">{message}</p>}
        </CardContent>
      </Card>
    </div>
  )
}
