"use client"

import { useEffect } from "react"
import { SignUpForm } from "@/components/auth/Signup"
import { useUser } from "@/hooks/useUser"
import { useRouter } from "next/navigation"

export default function SignupPage() {
  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push("/dashboard")
    }
  }, [user, router])

  return <SignUpForm />
}
