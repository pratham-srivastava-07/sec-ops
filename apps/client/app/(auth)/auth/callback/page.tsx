"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase/browserClient"

export default function AuthCallback() {
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    const handleMagicLink = async () => {
      const hash = window.location.hash.substring(1)
      const params = new URLSearchParams(hash)

      const access_token = params.get("access_token")
      const refresh_token = params.get("refresh_token")

      if (access_token && refresh_token) {
        const { error } = await supabase.auth.setSession({
          access_token,
          refresh_token,
        })

        if (error) {
          console.error("Error setting session from magic link:", error)
          return router.push("/error")
        }

        // At this point, middleware will now see the session
        router.replace("/dashboard")
      } else {
        console.error("Magic link tokens not found in URL")
        router.push("/error")
      }
    }

    handleMagicLink()
  }, [router, supabase])

  return <p className="text-center mt-10">Signing you in...</p>
}
