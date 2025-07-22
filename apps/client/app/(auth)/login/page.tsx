"use client"

import { useEffect } from "react"
import { SignInForm } from "@/components/auth/Signin"
import { useUser } from "@/hooks/useUser"
import { useRouter } from "next/navigation"

export default function SigninPage() {
  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push("/dashboard")
    }
  }, [user, router])

  return <SignInForm />
}
