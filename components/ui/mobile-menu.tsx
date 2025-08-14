"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { 
  Menu, 
  Home, 
  Users, 
  Building2, 
  BarChart3, 
  Settings, 
  HelpCircle,
  Briefcase,
  Calendar,
  MessageSquare,
  LogOut,
  X
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"

interface MobileMenuProps {
  className?: string
  user?: {
    name: string
    email: string
    image?: string
  }
}

export default function MobileMenu({ className, user }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const navigationItems = [
    {
      title: "Dashboard",
      icon: Home,
      href: "/",
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/20"
    },
    {
      title: "Properties",
      icon: Building2,
      href: "/properties",
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900/20"
    },
    {
      title: "Clients",
      icon: Users,
      href: "/clients",
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-900/20"
    },
    {
      title: "Transactions",
      icon: BarChart3,
      href: "/transactions",
      color: "text-orange-600",
      bgColor: "bg-orange-100 dark:bg-orange-900/20"
    },
    {
      title: "Calendar",
      icon: Calendar,
      href: "/calendar",
      color: "text-red-600",
      bgColor: "bg-red-100 dark:bg-red-900/20"
    },
    {
      title: "Messages",
      icon: MessageSquare,
      href: "/messages",
      color: "text-indigo-600",
      bgColor: "bg-indigo-100 dark:bg-indigo-900/20"
    },
  ]

  const bottomItems = [
    {
      title: "Portfolio",
      icon: Briefcase,
      href: "/portfolio",
      color: "text-gray-600",
    },
    {
      title: "Settings",
      icon: Settings,
      href: "/settings",
      color: "text-gray-600",
    },
    {
      title: "Help & Support",
      icon: HelpCircle,
      href: "/help",
      color: "text-gray-600",
    },
  ]

  const handleNavigation = (href: string) => {
    router.push(href)
    setIsOpen(false)
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn("md:hidden", className)}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      
      <SheetContent side="left" className="w-80 p-0 bg-background/95 backdrop-blur-sm">
        <div className="flex flex-col h-full">
          {/* Header */}
          <SheetHeader className="px-6 py-6 border-b border-border/50">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-lg font-semibold">PrimeNest</SheetTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            {/* User Info */}
            {user && (
              <motion.div
                className="flex items-center space-x-3 mt-4 p-3 rounded-lg bg-muted/30"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-lg font-semibold text-primary">
                      {user.name.split(" ").map(n => n[0]).join("")}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{user.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                </div>
              </motion.div>
            )}
          </SheetHeader>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto py-6">
            <nav className="px-6">
              <div className="space-y-2">
                {navigationItems.map((item, index) => {
                  const isActive = pathname === item.href
                  const Icon = item.icon

                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <Button
                        variant={isActive ? "secondary" : "ghost"}
                        className={cn(
                          "w-full justify-start h-12 text-left font-medium transition-all duration-200",
                          isActive && "bg-primary/10 text-primary border-primary/20",
                          !isActive && "hover:bg-muted/50"
                        )}
                        onClick={() => handleNavigation(item.href)}
                      >
                        <div className={cn(
                          "w-8 h-8 rounded-lg flex items-center justify-center mr-3",
                          isActive ? "bg-primary/20" : item.bgColor
                        )}>
                          <Icon className={cn(
                            "h-4 w-4",
                            isActive ? "text-primary" : item.color
                          )} />
                        </div>
                        {item.title}
                        {isActive && (
                          <motion.div
                            className="ml-auto w-1 h-6 bg-primary rounded-full"
                            layoutId="activeIndicator"
                          />
                        )}
                      </Button>
                    </motion.div>
                  )
                })}
              </div>

              {/* Quick Actions */}
              <div className="mt-8">
                <h3 className="text-sm font-medium text-muted-foreground mb-3 px-3">
                  Quick Actions
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-16 flex-col space-y-1 hover:bg-primary/5 hover:border-primary/20"
                    onClick={() => {
                      // Handle add property
                      setIsOpen(false)
                    }}
                  >
                    <Building2 className="h-5 w-5 text-primary" />
                    <span className="text-xs">Add Property</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-16 flex-col space-y-1 hover:bg-primary/5 hover:border-primary/20"
                    onClick={() => {
                      // Handle add client
                      setIsOpen(false)
                    }}
                  >
                    <Users className="h-5 w-5 text-primary" />
                    <span className="text-xs">Add Client</span>
                  </Button>
                </div>
              </div>
            </nav>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-border/50 p-6">
            <div className="space-y-1">
              {bottomItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href

                return (
                  <Button
                    key={item.title}
                    variant="ghost"
                    className={cn(
                      "w-full justify-start h-10 text-left font-medium",
                      isActive && "bg-primary/10 text-primary"
                    )}
                    onClick={() => handleNavigation(item.href)}
                  >
                    <Icon className={cn("h-4 w-4 mr-3", item.color)} />
                    {item.title}
                  </Button>
                )
              })}
              
              <Button
                variant="ghost"
                className="w-full justify-start h-10 text-left font-medium text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                onClick={() => {
                  // Handle logout
                  console.log("Logout clicked")
                  setIsOpen(false)
                }}
              >
                <LogOut className="h-4 w-4 mr-3" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
