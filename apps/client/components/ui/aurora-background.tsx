"use client"
import { cn } from "@/lib/utils"
import type React from "react"
import type { ReactNode } from "react"

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode
  showRadialGradient?: boolean
  fullPage?: boolean
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  fullPage = false,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <div
      className={cn(
        "relative transition-bg",
        fullPage
          ? "min-h-screen w-full bg-zinc-50 text-slate-950 dark:bg-zinc-900"
          : "flex h-[100vh] flex-col items-center justify-center bg-zinc-50 text-slate-950 dark:bg-zinc-900",
        className,
      )}
      {...props}
    >
      <div
        className="absolute inset-0 overflow-hidden"
        style={
          {
            "--aurora": "repeating-linear-gradient(100deg,#ea580c_10%,#fb923c_15%,#fdba74_20%,#fed7aa_25%,#f97316_30%)",
            "--dark-gradient":
              "repeating-linear-gradient(100deg,#000_0%,#000_7%,transparent_10%,transparent_12%,#000_16%)",
            "--white-gradient":
              "repeating-linear-gradient(100deg,#fff_0%,#fff_7%,transparent_10%,transparent_12%,#fff_16%)",
            "--orange-300": "#fdba74",
            "--orange-400": "#fb923c",
            "--orange-500": "#f97316",
            "--orange-600": "#ea580c",
            "--orange-200": "#fed7aa",
            "--black": "#000",
            "--white": "#fff",
            "--transparent": "transparent",
          } as React.CSSProperties
        }
      >
        <div
          className={cn(
            `after:animate-aurora pointer-events-none absolute -inset-[10px] opacity-30 blur-[10px] invert filter will-change-transform`,
            `[background-image:var(--white-gradient),var(--aurora)] [background-size:300%,_200%] [background-position:50%_50%,50%_50%]`,
            `[--aurora:repeating-linear-gradient(100deg,var(--orange-500)_10%,var(--orange-400)_15%,var(--orange-300)_20%,var(--orange-200)_25%,var(--orange-600)_30%)]`,
            `[--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)]`,
            `[--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)]`,
            `after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)] after:[background-size:200%,_100%] after:[background-attachment:fixed] after:mix-blend-difference after:content-[""]`,
            `dark:[background-image:var(--dark-gradient),var(--aurora)] dark:invert-0 after:dark:[background-image:var(--dark-gradient),var(--aurora)]`,
            showRadialGradient && `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`,
          )}
        ></div>
      </div>
      <div className="relative z-10 w-full">{children}</div>
    </div>
  )
}
