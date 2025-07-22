"use client"

import { useEffect, useState } from "react"

import type { Session } from "@supabase/supabase-js"
import { createClient } from "@/utils/supabase/browserClient"

export function useUser() {
  const supabase = createClient()
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession()
      setSession(data.session)
    }

    getSession()

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [supabase])

  return session?.user ?? null
}
