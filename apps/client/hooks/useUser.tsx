import { useEffect, useState } from "react"
import { createSupabaseClient } from "@ops/shared" // your client
import type { Session } from "@supabase/supabase-js"

export function useUser() {
  const supabase = createSupabaseClient()
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
