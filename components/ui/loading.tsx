"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Loader2, Home, Building } from "lucide-react"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  className?: string
  text?: string
}

interface LoadingSkeletonProps {
  variant?: "card" | "list" | "table" | "dashboard"
  count?: number
  className?: string
}

export function LoadingSpinner({ size = "md", className, text }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8"
  }

  return (
    <div className={cn("flex flex-col items-center justify-center space-y-2", className)}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        <Loader2 className={cn(sizeClasses[size], "text-primary")} />
      </motion.div>
      {text && (
        <p className="text-sm text-muted-foreground font-medium">{text}</p>
      )}
    </div>
  )
}

export function LoadingSkeleton({ variant = "card", count = 1, className }: LoadingSkeletonProps) {
  const renderCardSkeleton = () => (
    <div className="space-y-6">
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-background border border-border rounded-lg p-6 shadow-sm"
        >
          <div className="space-y-4">
            {/* Image placeholder */}
            <div className="h-48 bg-muted rounded-lg animate-pulse" />
            
            {/* Content placeholders */}
            <div className="space-y-3">
              <div className="h-6 bg-muted rounded animate-pulse w-3/4" />
              <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
              <div className="flex space-x-4">
                <div className="h-4 bg-muted rounded animate-pulse w-16" />
                <div className="h-4 bg-muted rounded animate-pulse w-16" />
                <div className="h-4 bg-muted rounded animate-pulse w-20" />
              </div>
              <div className="h-4 bg-muted rounded animate-pulse w-full" />
              <div className="h-4 bg-muted rounded animate-pulse w-2/3" />
            </div>
            
            {/* Button placeholders */}
            <div className="flex space-x-2 pt-4">
              <div className="h-9 bg-muted rounded animate-pulse flex-1" />
              <div className="h-9 bg-muted rounded animate-pulse w-20" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )

  const renderListSkeleton = () => (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
          className="flex items-center space-x-4 p-4 bg-background border border-border rounded-lg"
        >
          <div className="h-12 w-12 bg-muted rounded-full animate-pulse" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
            <div className="h-3 bg-muted rounded animate-pulse w-1/2" />
          </div>
          <div className="h-6 bg-muted rounded animate-pulse w-20" />
        </motion.div>
      ))}
    </div>
  )

  const renderTableSkeleton = () => (
    <div className="space-y-4">
      {/* Table header */}
      <div className="grid grid-cols-5 gap-4 p-4 bg-muted/50 rounded-lg">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="h-4 bg-muted rounded animate-pulse" />
        ))}
      </div>
      
      {/* Table rows */}
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="grid grid-cols-5 gap-4 p-4 bg-background border border-border rounded-lg"
        >
          {Array.from({ length: 5 }).map((_, colIndex) => (
            <div key={colIndex} className="h-4 bg-muted rounded animate-pulse" />
          ))}
        </motion.div>
      ))}
    </div>
  )

  const renderDashboardSkeleton = () => (
    <div className="space-y-8">
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-background border border-border rounded-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
                <div className="h-8 bg-muted rounded animate-pulse w-1/2" />
                <div className="h-3 bg-muted rounded animate-pulse w-2/3" />
              </div>
              <div className="h-12 w-12 bg-muted rounded-full animate-pulse" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Content areas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Array.from({ length: 2 }).map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            className="bg-background border border-border rounded-lg p-6 space-y-6"
          >
            <div className="flex items-center justify-between">
              <div className="h-6 bg-muted rounded animate-pulse w-1/3" />
              <div className="h-4 bg-muted rounded animate-pulse w-16" />
            </div>
            
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, itemIndex) => (
                <div key={itemIndex} className="flex items-center space-x-4">
                  <div className="h-10 w-10 bg-muted rounded animate-pulse" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
                    <div className="h-3 bg-muted rounded animate-pulse w-1/2" />
                  </div>
                  <div className="h-6 bg-muted rounded animate-pulse w-20" />
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )

  const skeletonVariants = {
    card: renderCardSkeleton,
    list: renderListSkeleton,
    table: renderTableSkeleton,
    dashboard: renderDashboardSkeleton
  }

  return (
    <div className={cn("animate-pulse", className)}>
      {skeletonVariants[variant]()}
    </div>
  )
}

// Property-specific loading component
export function PropertyLoadingGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          className="bg-background border border-border rounded-lg overflow-hidden shadow-sm"
        >
          {/* Image placeholder */}
          <div className="h-48 bg-muted animate-pulse relative">
            <div className="absolute top-3 left-3 h-6 w-16 bg-background/80 rounded animate-pulse" />
            <div className="absolute bottom-3 right-3 h-8 w-20 bg-background/80 rounded animate-pulse" />
          </div>
          
          {/* Content */}
          <div className="p-4 space-y-4">
            <div className="space-y-2">
              <div className="h-6 bg-muted rounded animate-pulse w-full" />
              <div className="h-4 bg-muted rounded animate-pulse w-2/3" />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex space-x-4">
                <div className="h-4 bg-muted rounded animate-pulse w-8" />
                <div className="h-4 bg-muted rounded animate-pulse w-8" />
                <div className="h-4 bg-muted rounded animate-pulse w-12" />
              </div>
              <div className="h-4 bg-muted rounded animate-pulse w-8" />
            </div>
            
            <div className="h-4 bg-muted rounded animate-pulse w-full" />
            
            <div className="flex space-x-2 pt-2">
              <div className="h-9 bg-muted rounded animate-pulse flex-1" />
              <div className="h-9 bg-muted rounded animate-pulse flex-1" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

// Animated property loading with floating icons
export function AnimatedPropertyLoading() {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-8">
      <div className="relative">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 3, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
          className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center"
        >
          <Home className="h-8 w-8 text-primary" />
        </motion.div>
        
        <motion.div
          animate={{ 
            x: [0, 20, 0],
            y: [0, -10, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center"
        >
          <Building className="h-4 w-4 text-blue-600" />
        </motion.div>
      </div>
      
      <div className="text-center space-y-2">
        <motion.h3 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-lg font-semibold text-foreground"
        >
          Loading Properties
        </motion.h3>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-muted-foreground"
        >
          Finding the best properties for you...
        </motion.p>
      </div>
      
      <div className="flex space-x-1">
        {Array.from({ length: 3 }).map((_, index) => (
          <motion.div
            key={index}
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ 
              duration: 1,
              repeat: Infinity,
              delay: index * 0.2
            }}
            className="w-2 h-2 bg-primary rounded-full"
          />
        ))}
      </div>
    </div>
  )
}
