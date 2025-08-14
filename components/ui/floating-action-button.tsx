"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Plus, Home, Users, Calendar, MessageCircle, Phone, X, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface FloatingActionButtonProps {
  className?: string
  onAddProperty?: () => void
  onAddClient?: () => void
  onScheduleTour?: () => void
  onContact?: () => void
}

export default function FloatingActionButton({
  className,
  onAddProperty,
  onAddClient,
  onScheduleTour,
  onContact,
}: FloatingActionButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const actions = [
    {
      icon: Home,
      label: "Add Property",
      onClick: onAddProperty,
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      icon: Users,
      label: "Add Client",
      onClick: onAddClient,
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      icon: Calendar,
      label: "Schedule Tour",
      onClick: onScheduleTour,
      color: "bg-purple-500 hover:bg-purple-600",
    },
    {
      icon: Phone,
      label: "Contact",
      onClick: onContact,
      color: "bg-orange-500 hover:bg-orange-600",
    },
  ]

  return (
    <div className={cn("fixed bottom-6 right-6 z-50", className)}>
      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            className="mb-4"
          >
            <Button
              variant="outline"
              size="icon"
              onClick={scrollToTop}
              className="h-12 w-12 rounded-full shadow-lg bg-background/80 backdrop-blur-sm hover:bg-background"
            >
              <ChevronUp className="h-5 w-5" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Buttons */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-16 right-0 space-y-3"
          >
            {actions.map((action, index) => (
              <motion.div
                key={action.label}
                initial={{ scale: 0, x: 20 }}
                animate={{ scale: 1, x: 0 }}
                exit={{ scale: 0, x: 20 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-3"
              >
                <motion.div
                  className="bg-background/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg border border-border/50"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="text-sm font-medium text-foreground whitespace-nowrap">
                    {action.label}
                  </span>
                </motion.div>
                <Button
                  size="icon"
                  className={cn(
                    "h-12 w-12 rounded-full shadow-lg text-white",
                    action.color
                  )}
                  onClick={() => {
                    action.onClick?.()
                    setIsOpen(false)
                  }}
                >
                  <action.icon className="h-5 w-5" />
                </Button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "h-14 w-14 rounded-full shadow-xl bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300",
            isOpen && "rotate-45"
          )}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
        </Button>
      </motion.div>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
