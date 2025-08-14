"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button, ButtonProps } from "./button"
import { Loader2 } from "lucide-react"

interface EnhancedButtonProps extends ButtonProps {
  isLoading?: boolean
  loadingText?: string
  icon?: React.ReactNode
  gradient?: boolean
  pulse?: boolean
  bounce?: boolean
}

const EnhancedButton = React.forwardRef<HTMLButtonElement, EnhancedButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    children, 
    isLoading = false, 
    loadingText, 
    icon, 
    gradient = false,
    pulse = false,
    bounce = false,
    disabled,
    ...props 
  }, ref) => {
    const baseClasses = "relative overflow-hidden transition-all duration-300"
    const gradientClasses = gradient 
      ? "bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-primary-foreground" 
      : ""
    
    const motionProps = {
      whileHover: bounce ? { scale: 1.05 } : { scale: 1.02 },
      whileTap: { scale: 0.95 },
      transition: { type: "spring", stiffness: 400, damping: 17 }
    }

    const pulseAnimation = pulse ? {
      animate: { scale: [1, 1.05, 1] },
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
    } : {}

    return (
      <motion.div {...motionProps} {...pulseAnimation}>
        <Button
          ref={ref}
          variant={gradient ? "default" : variant}
          size={size}
          className={cn(
            baseClasses,
            gradientClasses,
            isLoading && "cursor-not-allowed opacity-70",
            className
          )}
          disabled={disabled || isLoading}
          {...props}
        >
          {/* Shimmer effect for gradient buttons */}
          {gradient && (
            <motion.div
              className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ translateX: "100%" }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          )}
          
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {loadingText || "Loading..."}
            </>
          ) : (
            <>
              {icon && <span className="mr-2">{icon}</span>}
              {children}
            </>
          )}
        </Button>
      </motion.div>
    )
  }
)

EnhancedButton.displayName = "EnhancedButton"

export { EnhancedButton, type EnhancedButtonProps }
