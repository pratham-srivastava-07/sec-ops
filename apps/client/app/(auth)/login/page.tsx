"use client"
import { AuthForm } from "@/components/auth/auth-form";
import { useUser } from "@/hooks/useUser";
import {redirect} from "next/navigation"

export default function SigninPage() {
    const user = useUser()
    if(user) {
        redirect("/dashboard")
    }
    return (
        <div>
            <AuthForm />
        </div>
    )
}