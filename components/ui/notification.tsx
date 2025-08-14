"use client"

import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { 
  CheckCircle, 
  AlertCircle, 
  Info, 
  XCircle, 
  X,
  Bell,
  Clock,
  Star,
  Zap
} from "lucide-react"

interface NotificationProps {
  id: string
  type: "success" | "error" | "warning" | "info"
  title: string
  message: string
  timestamp?: Date
  onDismiss?: (id: string) => void
  autoHide?: boolean
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

interface NotificationToastProps extends NotificationProps {
  isVisible: boolean
}

const notificationIcons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info
}

const notificationColors = {
  success: {
    bg: "bg-green-50 dark:bg-green-950",
    border: "border-green-200 dark:border-green-800",
    icon: "text-green-600 dark:text-green-400",
    title: "text-green-800 dark:text-green-200"
  },
  error: {
    bg: "bg-red-50 dark:bg-red-950",
    border: "border-red-200 dark:border-red-800",
    icon: "text-red-600 dark:text-red-400",
    title: "text-red-800 dark:text-red-200"
  },
  warning: {
    bg: "bg-yellow-50 dark:bg-yellow-950",
    border: "border-yellow-200 dark:border-yellow-800",
    icon: "text-yellow-600 dark:text-yellow-400",
    title: "text-yellow-800 dark:text-yellow-200"
  },
  info: {
    bg: "bg-blue-50 dark:bg-blue-950",
    border: "border-blue-200 dark:border-blue-800",
    icon: "text-blue-600 dark:text-blue-400",
    title: "text-blue-800 dark:text-blue-200"
  }
}

export function NotificationToast({
  id,
  type,
  title,
  message,
  timestamp,
  onDismiss,
  autoHide = true,
  duration = 5000,
  action,
  isVisible
}: NotificationToastProps) {
  const Icon = notificationIcons[type]
  const colors = notificationColors[type]

  React.useEffect(() => {
    if (autoHide && isVisible) {
      const timer = setTimeout(() => {
        onDismiss?.(id)
      }, duration)
      
      return () => clearTimeout(timer)
    }
  }, [autoHide, duration, id, onDismiss, isVisible])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 300, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 300, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="relative"
        >
          <Card className={cn(
            "p-4 shadow-lg border-l-4 min-w-[320px] max-w-md",
            colors.bg,
            colors.border
          )}>
            <div className="flex items-start space-x-3">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 600 }}
              >
                <Icon className={cn("h-5 w-5 mt-0.5", colors.icon)} />
              </motion.div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className={cn("text-sm font-semibold", colors.title)}>{title}</h4>
                  {timestamp && (
                    <span className="text-xs text-muted-foreground">
                      {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  )}
                </div>
                
                <p className="text-sm text-muted-foreground mt-1 pr-2">{message}</p>
                
                {action && (
                  <div className="mt-3">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={action.onClick}
                      className="text-xs"
                    >
                      {action.label}
                    </Button>
                  </div>
                )}
              </div>
              
              {onDismiss && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDismiss(id)}
                  className="h-6 w-6 p-0 rounded-full hover:bg-background/80"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            
            {/* Progress bar for auto-hide */}
            {autoHide && (
              <motion.div
                className="absolute bottom-0 left-0 h-1 bg-primary/30 rounded-full"
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: duration / 1000, ease: "linear" }}
              />
            )}
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Toast container component
interface ToastContainerProps {
  notifications: NotificationProps[]
  onDismiss: (id: string) => void
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left"
}

export function ToastContainer({ 
  notifications, 
  onDismiss, 
  position = "top-right" 
}: ToastContainerProps) {
  const positionClasses = {
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4", 
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4"
  }

  return (
    <div className={cn("fixed z-50 flex flex-col space-y-4", positionClasses[position])}>
      <AnimatePresence>
        {notifications.map((notification) => (
          <NotificationToast
            key={notification.id}
            {...notification}
            isVisible={true}
            onDismiss={onDismiss}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

// In-app notification card
interface NotificationCardProps {
  type: "property" | "client" | "transaction" | "system"
  title: string
  message: string
  timestamp: Date
  isRead?: boolean
  onMarkAsRead?: () => void
  onClick?: () => void
  className?: string
}

export function NotificationCard({
  type,
  title,
  message,
  timestamp,
  isRead = false,
  onMarkAsRead,
  onClick,
  className
}: NotificationCardProps) {
  const typeIcons = {
    property: Star,
    client: Bell,
    transaction: Zap,
    system: Info
  }

  const typeColors = {
    property: "text-green-600",
    client: "text-blue-600", 
    transaction: "text-yellow-600",
    system: "text-purple-600"
  }

  const Icon = typeIcons[type]
  const timeAgo = getTimeAgo(timestamp)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className={cn(
        "p-4 border rounded-lg cursor-pointer transition-all duration-200",
        isRead 
          ? "bg-background border-border" 
          : "bg-primary/5 border-primary/20 shadow-sm",
        "hover:shadow-md hover:border-primary/40",
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-start space-x-3">
        <div className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center",
          isRead ? "bg-muted" : "bg-primary/10"
        )}>
          <Icon className={cn("h-4 w-4", typeColors[type])} />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h4 className={cn(
              "text-sm font-medium truncate",
              isRead ? "text-muted-foreground" : "text-foreground"
            )}>
              {title}
            </h4>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-muted-foreground">{timeAgo}</span>
              {!isRead && (
                <div className="w-2 h-2 bg-primary rounded-full" />
              )}
            </div>
          </div>
          
          <p className={cn(
            "text-sm mt-1 line-clamp-2",
            isRead ? "text-muted-foreground" : "text-foreground/80"
          )}>
            {message}
          </p>
        </div>
      </div>
      
      {!isRead && onMarkAsRead && (
        <div className="mt-3 flex justify-end">
          <Button
            size="sm"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation()
              onMarkAsRead()
            }}
            className="text-xs text-primary hover:text-primary/80"
          >
            Mark as read
          </Button>
        </div>
      )}
    </motion.div>
  )
}

// Utility function to calculate time ago
function getTimeAgo(date: Date): string {
  const now = new Date()
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
  
  if (diffInMinutes < 1) return "Just now"
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`
  
  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) return `${diffInHours}h ago`
  
  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 7) return `${diffInDays}d ago`
  
  return date.toLocaleDateString()
}

// Custom hook for managing notifications
export function useNotifications() {
  const [notifications, setNotifications] = React.useState<NotificationProps[]>([])

  const addNotification = React.useCallback((notification: Omit<NotificationProps, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newNotification = { ...notification, id, timestamp: new Date() }
    
    setNotifications(prev => [newNotification, ...prev])
    return id
  }, [])

  const removeNotification = React.useCallback((id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }, [])

  const clearAll = React.useCallback(() => {
    setNotifications([])
  }, [])

  return {
    notifications,
    addNotification,
    removeNotification,
    clearAll
  }
}
