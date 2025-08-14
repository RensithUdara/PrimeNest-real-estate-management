"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PropertyList from "./property-list"
import ClientList from "./client-list"
import TransactionList from "./transaction-list"
import MapView from "./map-view"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Home, Users, Banknote, Bell, ArrowUp, TrendingUp, DollarSign, Activity, Calendar, Star, Award, Target, Zap } from "lucide-react"
import Image from "next/image"
import { ThemeToggle } from "./theme-toggle"
import { useTheme } from "next-themes"
import { UserProfileMenu } from "./user-profile-menu"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useComparison } from "@/context/comparison-context"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const { comparisonList } = useComparison()
  const router = useRouter()

  // Prevent hydration mismatch by only rendering theme-dependent elements after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  // Handle scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Only show the appropriate logo after component has mounted
  const logoSrc = !mounted ? "/logo.png" : resolvedTheme === "dark" ? "/logo-dark.png" : "/logo.png"

  // User information
  const user = {
    name: "Jayantha Dissanayake",
    email: "jayantha.d@primenest.lk",
    initials: "JD",
    image: "/user-avatar.png",
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 20,
      },
    },
  }

  const statCardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <header className="glass-effect dark:glass-effect-dark border-b border-border/50 shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-2 sm:px-4 py-3 sm:py-4 flex justify-between items-center">
          <motion.div
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative h-8 sm:h-10 md:h-12 w-auto">
              <Image
                src={logoSrc || "/placeholder.svg"}
                alt="PrimeNest Real Estate"
                width={200}
                height={60}
                className="object-contain h-full w-auto transition-all duration-300 hover:scale-105 drop-shadow-sm"
                priority
              />
            </div>
            <div className="hidden lg:block">
              <Badge variant="secondary" className="text-xs font-medium bg-primary/10 text-primary border-primary/20">
                Premium Dashboard
              </Badge>
            </div>
          </motion.div>
          <motion.nav
            className="hidden md:flex space-x-1"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <a href="#" className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-all duration-200 relative group rounded-lg hover:bg-primary/5">
              Dashboard
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></span>
            </a>
            <a href="#" className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-all duration-200 relative group rounded-lg hover:bg-primary/5">
              Properties
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></span>
            </a>
            <a href="#" className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-all duration-200 relative group rounded-lg hover:bg-primary/5">
              Clients
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></span>
            </a>
            <a href="#" className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-all duration-200 relative group rounded-lg hover:bg-primary/5">
              Transactions
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></span>
            </a>
            <a href="#" className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-all duration-200 relative group rounded-lg hover:bg-primary/5">
              Analytics
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></span>
            </a>
          </motion.nav>
          <motion.div
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <ThemeToggle />
            {comparisonList.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                className="rounded-full relative bg-background/50 backdrop-blur-sm border-primary/20 hover:bg-primary/5 hover:border-primary/40 transition-all duration-200"
                onClick={() => router.push("/comparison")}
              >
                <BarChart3 className="h-4 w-4 text-primary" />
                <span className="sr-only">Compare Properties</span>
                {comparisonList.length > 0 && (
                  <motion.span
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  >
                    {comparisonList.length}
                  </motion.span>
                )}
              </Button>
            )}
            <Button variant="ghost" size="icon" className="rounded-full relative hover:bg-primary/5 transition-all duration-200">
              <Bell className="h-5 w-5 text-foreground/70" />
              <span className="sr-only">Notifications</span>
              <motion.span
                className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </Button>
            <UserProfileMenu
              userName={user.name}
              userEmail={user.email}
              userInitials={user.initials}
              userImage={user.image}
            />
          </motion.div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Properties</p>
                    <h3 className="text-2xl font-bold mt-1">124</h3>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center transition-transform duration-500 hover:rotate-12">
                    <Home className="h-6 w-6 text-green-600 dark:text-green-300" />
                  </div>
                </div>
                <div className="mt-4 text-xs text-green-600 dark:text-green-400 flex items-center">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  <span>+8% from last month</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Clients</p>
                    <h3 className="text-2xl font-bold mt-1">76</h3>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center transition-transform duration-500 hover:rotate-12">
                    <Users className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                  </div>
                </div>
                <div className="mt-4 text-xs text-green-600 dark:text-green-400 flex items-center">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  <span>+12% from last month</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                    <h3 className="text-2xl font-bold mt-1">Rs. 42.5M</h3>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center transition-transform duration-500 hover:rotate-12">
                    <Banknote className="h-6 w-6 text-green-600 dark:text-green-300" />
                  </div>
                </div>
                <div className="mt-4 text-xs text-green-600 dark:text-green-400 flex items-center">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  <span>+23% from last month</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Pending Deals</p>
                    <h3 className="text-2xl font-bold mt-1">18</h3>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center transition-transform duration-500 hover:rotate-12">
                    <BarChart3 className="h-6 w-6 text-amber-600 dark:text-amber-300" />
                  </div>
                </div>
                <div className="mt-4 text-xs text-green-600 dark:text-green-400 flex items-center">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  <span>+4% from last month</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-5 md:w-[600px] p-1 bg-muted/80 backdrop-blur-sm">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm transition-all duration-200"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="properties"
              className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm transition-all duration-200"
            >
              Properties
            </TabsTrigger>
            <TabsTrigger
              value="clients"
              className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm transition-all duration-200"
            >
              Clients
            </TabsTrigger>
            <TabsTrigger
              value="transactions"
              className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm transition-all duration-200"
            >
              Transactions
            </TabsTrigger>
            <TabsTrigger
              value="map"
              className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm transition-all duration-200"
            >
              Map View
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h2 className="text-xl font-bold">Recent Activity</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">Recent Properties</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentProperties.map((property, index) => (
                        <motion.div
                          key={property.id}
                          className="flex items-center space-x-3 border-b border-border pb-3 last:border-0 hover:bg-muted/50 p-2 rounded-md transition-colors"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="w-12 h-12 rounded-md bg-muted relative overflow-hidden">
                            <img
                              src={property.image || "/placeholder.svg"}
                              alt={property.title}
                              className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{property.title}</p>
                            <p className="text-xs text-muted-foreground">{property.location}</p>
                          </div>
                          <div className="text-sm font-medium text-green-600 dark:text-green-400">
                            Rs. {property.price.toLocaleString()}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">Recent Clients</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentClients.map((client, index) => (
                        <motion.div
                          key={client.id}
                          className="flex items-center space-x-3 border-b border-border pb-3 last:border-0 hover:bg-muted/50 p-2 rounded-md transition-colors"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-foreground font-medium transition-transform duration-300 hover:scale-110">
                            {client.initials}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{client.name}</p>
                            <p className="text-xs text-muted-foreground">{client.email}</p>
                          </div>
                          <div className="text-xs px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
                            {client.type}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </TabsContent>
          <TabsContent value="properties">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <PropertyList />
            </motion.div>
          </TabsContent>
          <TabsContent value="clients">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <ClientList />
            </motion.div>
          </TabsContent>
          <TabsContent value="transactions">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <TransactionList />
            </motion.div>
          </TabsContent>
          <TabsContent value="map">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <MapView />
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Scroll to top button */}
      {showScrollTop && (
        <motion.button
          className="fixed bottom-6 right-6 p-3 rounded-full bg-primary text-primary-foreground shadow-lg z-50"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </div>
  )
}

const recentProperties = [
  {
    id: 1,
    title: "Luxury Villa in Colombo 7",
    location: "Colombo 7, Western Province",
    price: 125000000,
    image: "/luxury-villa-colombo.png",
  },
  {
    id: 2,
    title: "Apartment in Wellawatte",
    location: "Wellawatte, Colombo",
    price: 45000000,
    image: "/wellawatte-apartment.png",
  },
  {
    id: 3,
    title: "Family Home in Kandy",
    location: "Kandy, Central Province",
    price: 62500000,
    image: "/whimsical-candy-house.png",
  },
  {
    id: 4,
    title: "Beach Villa in Unawatuna",
    location: "Unawatuna, Southern Province",
    price: 89000000,
    image: "/unawatuna-beach-villa.png",
  },
]

const recentClients = [
  { id: 1, name: "Ashan Perera", email: "ashan.perera@example.com", type: "Buyer", initials: "AP" },
  { id: 2, name: "Malini Fernando", email: "malini.f@example.com", type: "Seller", initials: "MF" },
  { id: 3, name: "Dinesh Kumar", email: "dinesh.kumar@example.com", type: "Buyer", initials: "DK" },
  { id: 4, name: "Samanthi Silva", email: "s.silva@example.com", type: "Agent", initials: "SS" },
]
