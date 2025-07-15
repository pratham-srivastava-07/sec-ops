"use client"

import { Button } from "@/components/ui/button"
import { createSupabaseClient } from "@ops/shared"
import {useRouter} from "next/navigation"

export default function Dashboard() {

    const supabase = createSupabaseClient()
    const router = useRouter()

    const handleSignout = async () => {
        await supabase.auth.signOut()
        router.push("/")
    }
    return <div>
        Dashboard
        <Button onClick={handleSignout}>
            Logout
        </Button>
    </div>
}