"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Card, CardProps } from "./card"

interface EnhancedCardProps extends CardProps {
  hover?: boolean
  glow?: boolean
  gradient?: boolean
  glass?: boolean
  children: React.ReactNode
}

const EnhancedCard = React.forwardRef<HTMLDivElement, EnhancedCardProps>(
  ({ className, hover = true, glow = false, gradient = false, glass = false, children, ...props }, ref) => {
    const baseClasses = "transition-all duration-300"
    const hoverClasses = hover ? "hover:shadow-lg hover:-translate-y-1" : ""
    const glowClasses = glow ? "shadow-glow hover:shadow-glow-green" : ""
    const gradientClasses = gradient ? "bg-gradient-to-br from-card to-muted/50" : ""
    const glassClasses = glass ? "glass-effect dark:glass-effect-dark backdrop-blur-sm" : ""

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={hover ? { scale: 1.02 } : {}}
      >
        <Card
          ref={ref}
          className={cn(
            baseClasses,
            hoverClasses,
            glowClasses,
            gradientClasses,
            glassClasses,
            className
          )}
          {...props}
        >
          {children}
        </Card>
      </motion.div>
    )
  }
)

EnhancedCard.displayName = "EnhancedCard"

export { EnhancedCard, type EnhancedCardProps }
