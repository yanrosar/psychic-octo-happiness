"use client"

import { Button } from "@/components/ui/button"
import type { ReactNode } from "react"

interface ActionButtonProps {
  onClick: () => void
  disabled?: boolean
  loading?: boolean
  variant?: "primary" | "secondary" | "success"
  children: ReactNode
  subtitle?: string
  icon?: ReactNode
  className?: string
}

export function ActionButton({
  onClick,
  disabled = false,
  loading = false,
  variant = "primary",
  children,
  subtitle,
  icon,
  className = "",
}: ActionButtonProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return "bg-gradient-to-r from-green-500 via-green-600 to-emerald-600 hover:from-green-600 hover:via-green-700 hover:to-emerald-700 text-white"
      case "secondary":
        return "bg-yellow-400 hover:bg-yellow-500 text-black"
      case "success":
        return "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
      default:
        return "bg-gradient-to-r from-green-500 via-green-600 to-emerald-600 hover:from-green-600 hover:via-green-700 hover:to-emerald-700 text-white"
    }
  }

  return (
    <Button
      onClick={onClick}
      disabled={disabled || loading}
      className={`w-full font-bold py-4 px-4 sm:py-6 sm:px-8 rounded-2xl text-base sm:text-lg border-0 shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 relative overflow-hidden group min-h-[60px] sm:min-h-[80px] ${getVariantStyles()} ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      {!loading && icon && (
        <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-6 sm:h-6 bg-yellow-400 rounded-full animate-bounce"></div>
      )}
      <div className="relative flex flex-col items-center justify-center gap-1 text-center px-2">
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm sm:text-base">Processando...</span>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">{children}</div>
            {subtitle && <div className="text-xs sm:text-sm opacity-90 font-medium mt-1 leading-tight">{subtitle}</div>}
          </>
        )}
      </div>
    </Button>
  )
}
