"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase/browserClient"

export default function AuthCallback() {
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    const handleCallback = async () => {
      const { error } = await supabase.auth.getSession() // session already exists if user clicked the magic link

      if (error) {
        console.error("Error getting session", error)
        router.push("/signin") // or show error message
      } else {
        router.push("/dashboard")
      }
    }

    handleCallback()
  }, [router, supabase])

  return <p className="text-center mt-10">Signing you in...</p>
}
