"use client"

import React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { 
  TrendingUp, 
  TrendingDown, 
  Minus,
  ArrowUp,
  ArrowDown,
  Target,
  Calendar,
  Zap
} from "lucide-react"

interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
  change?: {
    value: number
    period: string
    trend: "up" | "down" | "neutral"
  }
  progress?: {
    value: number
    max: number
    label?: string
  }
  icon: React.ReactNode
  gradient?: boolean
  color?: "blue" | "green" | "yellow" | "red" | "purple" | "primary"
  className?: string
}

const colorVariants = {
  blue: {
    gradient: "from-blue-500/10 to-blue-500/5",
    border: "border-blue-500/20",
    icon: "bg-blue-500/20 text-blue-600",
    badge: "bg-blue-500/10 text-blue-600 border-blue-500/20"
  },
  green: {
    gradient: "from-green-500/10 to-green-500/5",
    border: "border-green-500/20",
    icon: "bg-green-500/20 text-green-600",
    badge: "bg-green-500/10 text-green-600 border-green-500/20"
  },
  yellow: {
    gradient: "from-yellow-500/10 to-yellow-500/5",
    border: "border-yellow-500/20",
    icon: "bg-yellow-500/20 text-yellow-600",
    badge: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20"
  },
  red: {
    gradient: "from-red-500/10 to-red-500/5",
    border: "border-red-500/20", 
    icon: "bg-red-500/20 text-red-600",
    badge: "bg-red-500/10 text-red-600 border-red-500/20"
  },
  purple: {
    gradient: "from-purple-500/10 to-purple-500/5",
    border: "border-purple-500/20",
    icon: "bg-purple-500/20 text-purple-600",
    badge: "bg-purple-500/10 text-purple-600 border-purple-500/20"
  },
  primary: {
    gradient: "from-primary/10 to-primary/5",
    border: "border-primary/20",
    icon: "bg-primary/20 text-primary",
    badge: "bg-primary/10 text-primary border-primary/20"
  }
}

export function StatCard({
  title,
  value,
  subtitle,
  change,
  progress,
  icon,
  gradient = true,
  color = "primary",
  className
}: StatCardProps) {
  const colors = colorVariants[color]
  
  const getTrendIcon = (trend: "up" | "down" | "neutral") => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-3 w-3 mr-1" />
      case "down":
        return <TrendingDown className="h-3 w-3 mr-1" />
      default:
        return <Minus className="h-3 w-3 mr-1" />
    }
  }

  const getTrendColor = (trend: "up" | "down" | "neutral") => {
    switch (trend) {
      case "up":
        return "text-green-600 dark:text-green-400"
      case "down":
        return "text-red-600 dark:text-red-400"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ duration: 0.2 }}
      className={className}
    >
      <Card className={cn(
        "overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300",
        gradient && `bg-gradient-to-br ${colors.gradient}`,
        colors.border
      )}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2 flex-1">
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
              <div className="space-y-1">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                  {value}
                </h3>
                {subtitle && (
                  <p className="text-sm text-muted-foreground">{subtitle}</p>
                )}
              </div>
              
              {change && (
                <div className={cn(
                  "flex items-center text-sm font-medium",
                  getTrendColor(change.trend)
                )}>
                  {getTrendIcon(change.trend)}
                  <span>
                    {change.trend === "up" ? "+" : change.trend === "down" ? "-" : ""}
                    {Math.abs(change.value)}% {change.period}
                  </span>
                </div>
              )}
            </div>
            
            <div className="relative">
              <motion.div
                className={cn(
                  "w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-sm",
                  colors.icon
                )}
                whileHover={{ rotate: 15 }}
                transition={{ duration: 0.2 }}
              >
                {icon}
              </motion.div>
              
              {/* Animated ring */}
              <motion.div
                className={cn("absolute inset-0 rounded-full", colors.icon.split(' ')[0])}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                style={{ opacity: 0.3 }}
              />
            </div>
          </div>
          
          {progress && (
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  {progress.label || "Progress"}
                </span>
                <span className="font-medium">
                  {Math.round((progress.value / progress.max) * 100)}%
                </span>
              </div>
              <Progress 
                value={(progress.value / progress.max) * 100} 
                className="h-2" 
              />
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Analytics Overview Component
interface AnalyticsOverviewProps {
  data: {
    totalProperties: number
    activeClients: number
    monthlyRevenue: number
    pendingDeals: number
    salesThisMonth: number
    newLeads: number
    conversionRate: number
    avgDealValue: number
  }
  className?: string
}

export function AnalyticsOverview({ data, className }: AnalyticsOverviewProps) {
  const stats = [
    {
      title: "Total Properties",
      value: data.totalProperties,
      change: { value: 8, period: "from last month", trend: "up" as const },
      progress: { value: data.totalProperties, max: 150, label: "Target: 150" },
      icon: <Target className="h-8 w-8" />,
      color: "primary" as const
    },
    {
      title: "Active Clients", 
      value: data.activeClients,
      change: { value: 12, period: "from last month", trend: "up" as const },
      progress: { value: data.activeClients, max: 100, label: "Engagement Rate" },
      icon: <TrendingUp className="h-8 w-8" />,
      color: "blue" as const
    },
    {
      title: "Monthly Revenue",
      value: `Rs. ${(data.monthlyRevenue / 1000000).toFixed(1)}M`,
      change: { value: 23, period: "from last month", trend: "up" as const },
      progress: { value: data.monthlyRevenue, max: 50000000, label: "Monthly Target" },
      icon: <Calendar className="h-8 w-8" />,
      color: "green" as const
    },
    {
      title: "Pending Deals",
      value: data.pendingDeals,
      change: { value: 4, period: "from last month", trend: "up" as const },
      progress: { value: data.pendingDeals, max: 25, label: "Conversion Pipeline" },
      icon: <Zap className="h-8 w-8" />,
      color: "yellow" as const
    }
  ]

  return (
    <div className={cn("space-y-6", className)}>
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <StatCard {...stat} />
          </motion.div>
        ))}
      </motion.div>
      
      {/* Additional insights */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="p-6 bg-gradient-to-br from-background to-muted/20">
          <div className="text-center space-y-2">
            <h4 className="text-lg font-semibold">Sales This Month</h4>
            <div className="text-3xl font-bold text-primary">{data.salesThisMonth}</div>
            <p className="text-sm text-muted-foreground">Properties Sold</p>
          </div>
        </Card>
        
        <Card className="p-6 bg-gradient-to-br from-background to-muted/20">
          <div className="text-center space-y-2">
            <h4 className="text-lg font-semibold">New Leads</h4>
            <div className="text-3xl font-bold text-blue-600">{data.newLeads}</div>
            <p className="text-sm text-muted-foreground">This Week</p>
          </div>
        </Card>
        
        <Card className="p-6 bg-gradient-to-br from-background to-muted/20">
          <div className="text-center space-y-2">
            <h4 className="text-lg font-semibold">Conversion Rate</h4>
            <div className="text-3xl font-bold text-green-600">{data.conversionRate}%</div>
            <p className="text-sm text-muted-foreground">Lead to Sale</p>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
