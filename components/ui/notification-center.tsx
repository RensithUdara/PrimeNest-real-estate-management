"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  Bell, 
  X, 
  Home, 
  Users, 
  Calendar, 
  DollarSign, 
  AlertCircle,
  CheckCircle,
  Info,
  TrendingUp,
  MessageSquare,
  Clock
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Notification {
  id: string
  type: "info" | "success" | "warning" | "error"
  title: string
  message: string
  category: "property" | "client" | "transaction" | "system" | "message"
  timestamp: Date
  read: boolean
  actionUrl?: string
}

interface NotificationCenterProps {
  className?: string
}

export default function NotificationCenter({ className }: NotificationCenterProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([])

  // Mock notifications for demo
  useEffect(() => {
    const mockNotifications: Notification[] = [
      {
        id: "1",
        type: "success",
        title: "New Property Added",
        message: "Luxury Villa in Colombo 7 has been successfully added to your portfolio",
        category: "property",
        timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
        read: false,
      },
      {
        id: "2",
        type: "info",
        title: "Client Inquiry",
        message: "Ashan Perera is interested in viewing the Wellawatte Apartment",
        category: "client",
        timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
        read: false,
      },
      {
        id: "3",
        type: "warning",
        title: "Price Alert",
        message: "Property prices in Colombo area have increased by 5% this month",
        category: "system",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        read: true,
      },
      {
        id: "4",
        type: "success",
        title: "Transaction Completed",
        message: "Beach Villa sale completed - Rs. 89M transaction finalized",
        category: "transaction",
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
        read: true,
      },
      {
        id: "5",
        type: "info",
        title: "Tour Scheduled",
        message: "Property viewing scheduled for tomorrow at 2:00 PM",
        category: "property",
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        read: true,
      },
    ]
    setNotifications(mockNotifications)
  }, [])

  const unreadCount = notifications.filter(n => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    )
  }

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }

  const getIcon = (category: string, type: string) => {
    if (type === "success") return CheckCircle
    if (type === "warning") return AlertCircle
    if (type === "error") return AlertCircle
    
    switch (category) {
      case "property": return Home
      case "client": return Users
      case "transaction": return DollarSign
      case "message": return MessageSquare
      default: return Info
    }
  }

  const getIconColor = (type: string) => {
    switch (type) {
      case "success": return "text-green-500"
      case "warning": return "text-amber-500"
      case "error": return "text-red-500"
      default: return "text-blue-500"
    }
  }

  const formatTime = (timestamp: Date) => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    
    if (diff < 60 * 1000) return "Just now"
    if (diff < 60 * 60 * 1000) return `${Math.floor(diff / (60 * 1000))} minutes ago`
    if (diff < 24 * 60 * 60 * 1000) return `${Math.floor(diff / (60 * 60 * 1000))} hours ago`
    return `${Math.floor(diff / (24 * 60 * 60 * 1000))} days ago`
  }

  return (
    <div className={cn("relative", className)}>
      {/* Notification Bell */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="relative rounded-full hover:bg-primary/5 transition-all duration-200"
      >
        <Bell className="h-5 w-5 text-foreground/70" />
        {unreadCount > 0 && (
          <motion.div
            className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-medium"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 15 }}
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </motion.div>
        )}
      </Button>

      {/* Notification Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Notification Card */}
            <motion.div
              className="absolute top-12 right-0 z-50"
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="w-96 max-h-[600px] shadow-2xl border-border/50 backdrop-blur-sm bg-background/95">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Notifications</CardTitle>
                    <div className="flex items-center space-x-2">
                      {unreadCount > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={markAllAsRead}
                          className="text-xs h-8"
                        >
                          Mark all read
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsOpen(false)}
                        className="h-8 w-8"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  {unreadCount > 0 && (
                    <div className="text-sm text-muted-foreground">
                      You have {unreadCount} unread notification{unreadCount > 1 ? "s" : ""}
                    </div>
                  )}
                </CardHeader>

                <CardContent className="p-0">
                  <ScrollArea className="h-[500px]">
                    <div className="space-y-1 p-3">
                      {notifications.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                          <Bell className="h-12 w-12 mx-auto mb-3 opacity-50" />
                          <p>No notifications yet</p>
                        </div>
                      ) : (
                        notifications.map((notification) => {
                          const Icon = getIcon(notification.category, notification.type)
                          const iconColor = getIconColor(notification.type)

                          return (
                            <motion.div
                              key={notification.id}
                              layout
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 20 }}
                              className={cn(
                                "p-3 rounded-lg border transition-all duration-200 cursor-pointer group",
                                notification.read 
                                  ? "bg-muted/30 border-border/50" 
                                  : "bg-primary/5 border-primary/20 shadow-sm"
                              )}
                              onClick={() => markAsRead(notification.id)}
                            >
                              <div className="flex items-start space-x-3">
                                <div className={cn("mt-1 flex-shrink-0", iconColor)}>
                                  <Icon className="h-4 w-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between mb-1">
                                    <h4 className={cn(
                                      "text-sm font-medium truncate",
                                      !notification.read && "text-foreground"
                                    )}>
                                      {notification.title}
                                    </h4>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        deleteNotification(notification.id)
                                      }}
                                      className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                      <X className="h-3 w-3" />
                                    </Button>
                                  </div>
                                  <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                                    {notification.message}
                                  </p>
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                      <Badge variant="secondary" className="text-xs">
                                        {notification.category}
                                      </Badge>
                                      {!notification.read && (
                                        <div className="h-2 w-2 bg-primary rounded-full" />
                                      )}
                                    </div>
                                    <div className="flex items-center text-xs text-muted-foreground">
                                      <Clock className="h-3 w-3 mr-1" />
                                      {formatTime(notification.timestamp)}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )
                        })
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
