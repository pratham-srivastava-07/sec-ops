"use client"
import { AuthForm } from "@/components/auth/auth-form";
import { useUser } from "@/hooks/useUser";
import {useRouter} from "next/navigation"
import { useEffect } from "react";

export default function SigninPage() {
   const user = useUser()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push("/dashboard") // ✅ this is allowed in client
    }
  }, [user])
    return (
        <div>
            <AuthForm />
        </div>
    )
}