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

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Welcome back, {user.name.split(' ')[0]}! 👋
          </h1>
          <p className="text-muted-foreground text-lg">
            Here's what's happening with your real estate portfolio today.
          </p>
        </motion.div>

        {/* Enhanced Stats Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} whileHover="hover">
            <Card className="overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Properties</p>
                    <h3 className="text-3xl font-bold mt-2 text-foreground">124</h3>
                    <div className="mt-3 flex items-center space-x-2">
                      <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +8%
                      </Badge>
                      <span className="text-xs text-muted-foreground">vs last month</span>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center backdrop-blur-sm">
                      <Home className="h-8 w-8 text-primary" />
                    </div>
                    <motion.div
                      className="absolute inset-0 rounded-full bg-primary/20"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <Progress value={75} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">75% target achieved</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants} whileHover="hover">
            <Card className="overflow-hidden bg-gradient-to-br from-blue-500/5 to-blue-500/10 border-blue-500/20 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Clients</p>
                    <h3 className="text-3xl font-bold mt-2 text-foreground">76</h3>
                    <div className="mt-3 flex items-center space-x-2">
                      <Badge variant="secondary" className="bg-blue-500/10 text-blue-600 border-blue-500/20">
                        <ArrowUp className="h-3 w-3 mr-1" />
                        +12%
                      </Badge>
                      <span className="text-xs text-muted-foreground">vs last month</span>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center backdrop-blur-sm">
                      <Users className="h-8 w-8 text-blue-600" />
                    </div>
                    <motion.div
                      className="absolute inset-0 rounded-full bg-blue-500/20"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <Progress value={68} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">68% engagement rate</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants} whileHover="hover">
            <Card className="overflow-hidden bg-gradient-to-br from-green-500/5 to-green-500/10 border-green-500/20 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Monthly Revenue</p>
                    <h3 className="text-3xl font-bold mt-2 text-foreground">Rs. 42.5M</h3>
                    <div className="mt-3 flex items-center space-x-2">
                      <Badge variant="secondary" className="bg-green-500/10 text-green-600 border-green-500/20">
                        <DollarSign className="h-3 w-3 mr-1" />
                        +23%
                      </Badge>
                      <span className="text-xs text-muted-foreground">vs last month</span>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center backdrop-blur-sm">
                      <Banknote className="h-8 w-8 text-green-600" />
                    </div>
                    <motion.div
                      className="absolute inset-0 rounded-full bg-green-500/20"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <Progress value={85} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">85% of monthly target</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants} whileHover="hover">
            <Card className="overflow-hidden bg-gradient-to-br from-amber-500/5 to-amber-500/10 border-amber-500/20 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Pending Deals</p>
                    <h3 className="text-3xl font-bold mt-2 text-foreground">18</h3>
                    <div className="mt-3 flex items-center space-x-2">
                      <Badge variant="secondary" className="bg-amber-500/10 text-amber-600 border-amber-500/20">
                        <Activity className="h-3 w-3 mr-1" />
                        +4%
                      </Badge>
                      <span className="text-xs text-muted-foreground">vs last month</span>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-amber-500/20 flex items-center justify-center backdrop-blur-sm">
                      <BarChart3 className="h-8 w-8 text-amber-600" />
                    </div>
                    <motion.div
                      className="absolute inset-0 rounded-full bg-amber-500/20"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <Progress value={45} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">45% conversion rate</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Enhanced Tabs Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid grid-cols-5 md:w-[700px] p-1.5 bg-muted/50 backdrop-blur-sm rounded-xl border border-border/50">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-lg transition-all duration-300 rounded-lg font-medium"
              >
                <Home className="h-4 w-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="properties"
                className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-lg transition-all duration-300 rounded-lg font-medium"
              >
                <Home className="h-4 w-4 mr-2" />
                Properties
              </TabsTrigger>
              <TabsTrigger
                value="clients"
                className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-lg transition-all duration-300 rounded-lg font-medium"
              >
                <Users className="h-4 w-4 mr-2" />
                Clients
              </TabsTrigger>
              <TabsTrigger
                value="transactions"
                className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-lg transition-all duration-300 rounded-lg font-medium"
              >
                <Banknote className="h-4 w-4 mr-2" />
                Transactions
              </TabsTrigger>
              <TabsTrigger
                value="map"
                className="data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-lg transition-all duration-300 rounded-lg font-medium"
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Map View
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                {/* Quick Actions Section */}
                <Card className="overflow-hidden bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Zap className="h-5 w-5 mr-2 text-primary" />
                      Quick Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <Button variant="outline" className="h-20 flex-col space-y-2 hover:bg-primary/5 hover:border-primary/40 transition-all duration-200">
                        <Home className="h-6 w-6 text-primary" />
                        <span className="text-sm font-medium">Add Property</span>
                      </Button>
                      <Button variant="outline" className="h-20 flex-col space-y-2 hover:bg-primary/5 hover:border-primary/40 transition-all duration-200">
                        <Users className="h-6 w-6 text-primary" />
                        <span className="text-sm font-medium">New Client</span>
                      </Button>
                      <Button variant="outline" className="h-20 flex-col space-y-2 hover:bg-primary/5 hover:border-primary/40 transition-all duration-200">
                        <Calendar className="h-6 w-6 text-primary" />
                        <span className="text-sm font-medium">Schedule Tour</span>
                      </Button>
                      <Button variant="outline" className="h-20 flex-col space-y-2 hover:bg-primary/5 hover:border-primary/40 transition-all duration-200">
                        <Banknote className="h-6 w-6 text-primary" />
                        <span className="text-sm font-medium">New Transaction</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activity Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-xl font-semibold flex items-center">
                        <Star className="h-5 w-5 mr-2 text-primary" />
                        Recent Properties
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentProperties.map((property, index) => (
                          <motion.div
                            key={property.id}
                            className="flex items-center space-x-4 p-3 rounded-lg border border-border/50 hover:bg-muted/30 hover:border-primary/20 transition-all duration-300 cursor-pointer group"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                          >
                            <div className="w-16 h-16 rounded-xl bg-muted relative overflow-hidden">
                              <img
                                src={property.image || "/placeholder.svg"}
                                alt={property.title}
                                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-semibold truncate text-foreground group-hover:text-primary transition-colors">{property.title}</h4>
                              <p className="text-xs text-muted-foreground flex items-center mt-1">
                                <MapPin className="h-3 w-3 mr-1" />
                                {property.location}
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-bold text-primary">
                                Rs. {(property.price / 1000000).toFixed(1)}M
                              </div>
                              <Badge variant="secondary" className="text-xs mt-1">
                                New
                              </Badge>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-xl font-semibold flex items-center">
                        <Award className="h-5 w-5 mr-2 text-primary" />
                        Recent Clients
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentClients.map((client, index) => (
                          <motion.div
                            key={client.id}
                            className="flex items-center space-x-4 p-3 rounded-lg border border-border/50 hover:bg-muted/30 hover:border-primary/20 transition-all duration-300 cursor-pointer group"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                          >
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center text-primary font-bold text-sm transition-transform duration-300 group-hover:scale-110">
                              {client.initials}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-semibold truncate text-foreground group-hover:text-primary transition-colors">{client.name}</h4>
                              <p className="text-xs text-muted-foreground truncate">{client.email}</p>
                            </div>
                            <div className="text-right">
                              <Badge 
                                variant="secondary" 
                                className={`text-xs ${
                                  client.type === 'Buyer' 
                                    ? 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-800' 
                                    : client.type === 'Seller'
                                    ? 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900 dark:text-green-300 dark:border-green-800'
                                    : 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900 dark:text-purple-300 dark:border-purple-800'
                                }`}
                              >
                                {client.type}
                              </Badge>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Performance Metrics */}
                <Card className="overflow-hidden bg-gradient-to-r from-background to-muted/20">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Target className="h-5 w-5 mr-2 text-primary" />
                      Performance Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center p-4 rounded-lg bg-muted/30">
                        <div className="text-2xl font-bold text-primary mb-2">92%</div>
                        <div className="text-sm text-muted-foreground">Client Satisfaction</div>
                        <Progress value={92} className="mt-3 h-2" />
                      </div>
                      <div className="text-center p-4 rounded-lg bg-muted/30">
                        <div className="text-2xl font-bold text-primary mb-2">15.2 days</div>
                        <div className="text-sm text-muted-foreground">Avg. Sale Time</div>
                        <Progress value={75} className="mt-3 h-2" />
                      </div>
                      <div className="text-center p-4 rounded-lg bg-muted/30">
                        <div className="text-2xl font-bold text-primary mb-2">₹2.1Cr</div>
                        <div className="text-sm text-muted-foreground">This Quarter</div>
                        <Progress value={68} className="mt-3 h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
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
        </motion.div>
      </main>

      {/* Enhanced Scroll to Top Button */}
      {showScrollTop && (
        <motion.button
          className="fixed bottom-8 right-8 p-4 rounded-full bg-primary text-primary-foreground shadow-xl z-50 backdrop-blur-sm border border-primary/20 hover:shadow-2xl"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.5, y: 100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 100 }}
          whileHover={{ scale: 1.1, rotate: 15 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <ArrowUp className="h-6 w-6" />
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
