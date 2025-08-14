"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Plus, Edit, Trash2, MapPin, BedDouble, Bath, Move, Filter, Loader2, Eye, Check } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { motion, AnimatePresence } from "framer-motion"
import { Skeleton } from "@/components/ui/skeleton"
import { useRouter } from "next/navigation"
// Add this import at the top
import { useComparison } from "@/context/comparison-context"

interface Property {
  id: string | number
  title: string
  location: string
  status: string
  price: number
  bedrooms: number
  bathrooms: number
  size: number
  image: string
  description?: string
  amenities?: string[]
}

export default function PropertyList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [view, setView] = useState("grid")
  const [properties, setProperties] = useState<Property[]>([])
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [propertyType, setPropertyType] = useState("all")
  const [newProperty, setNewProperty] = useState<Partial<Property>>({
    title: "",
    location: "",
    status: "For Sale",
    price: 0,
    bedrooms: 0,
    bathrooms: 0,
    size: 0,
    image: "/diverse-property-showcase.png",
    description: "",
  })
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const router = useRouter()

  // Inside the PropertyList component, add this line after other state declarations
  const { addToComparison, removeFromComparison, isInComparison } = useComparison()

  // Add this function inside the component
  const handleCompareToggle = (property: Property) => {
    if (isInComparison(property.id)) {
      removeFromComparison(property.id)
    } else {
      addToComparison(property)
    }
  }

  // Fetch properties from API
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true)
        // In a real app, this would fetch from the API
        // const response = await fetch('/api/properties')
        // const data = await response.json()

        // For now, we'll use the mock data with a simulated delay
        setTimeout(() => {
          const data = mockProperties
          setProperties(data)
          setFilteredProperties(data)
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching properties:", error)
        toast({
          title: "Error",
          description: "Failed to load properties. Please try again later.",
          variant: "destructive",
        })
        setLoading(false)
      }
    }

    fetchProperties()
  }, [])

  // Filter properties based on search query and property type
  useEffect(() => {
    let filtered = [...properties]

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (property) => property.title.toLowerCase().includes(query) || property.location.toLowerCase().includes(query),
      )
    }

    // Filter by property type
    if (propertyType !== "all") {
      filtered = filtered.filter((property) => {
        if (propertyType === "house")
          return property.title.toLowerCase().includes("house") || property.title.toLowerCase().includes("home")
        if (propertyType === "apartment") return property.title.toLowerCase().includes("apartment")
        if (propertyType === "villa") return property.title.toLowerCase().includes("villa")
        if (propertyType === "land") return property.title.toLowerCase().includes("land")
        return true
      })
    }

    setFilteredProperties(filtered)
  }, [searchQuery, propertyType, properties])

  const handleAddProperty = async () => {
    try {
      setIsSubmitting(true)

      // Validate form
      if (!newProperty.title || !newProperty.location || !newProperty.price) {
        toast({
          title: "Validation Error",
          description: "Please fill in all required fields.",
          variant: "destructive",
        })
        return
      }

      // In a real app, this would send to the API
      // const response = await fetch('/api/properties', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(newProperty)
      // })
      // const data = await response.json()

      // For now, we'll simulate adding to the local state with a delay
      setTimeout(() => {
        const newId = `prop-${Date.now()}`
        const addedProperty = {
          ...newProperty,
          id: newId,
        } as Property

        setProperties((prev) => [addedProperty, ...prev])

        toast({
          title: "Success",
          description: "Property added successfully!",
        })

        // Reset form and close dialog
        setNewProperty({
          title: "",
          location: "",
          status: "For Sale",
          price: 0,
          bedrooms: 0,
          bathrooms: 0,
          size: 0,
          image: "/diverse-property-showcase.png",
          description: "",
        })
        setIsAddDialogOpen(false)
        setIsSubmitting(false)
      }, 1000)
    } catch (error) {
      console.error("Error adding property:", error)
      toast({
        title: "Error",
        description: "Failed to add property. Please try again.",
        variant: "destructive",
      })
      setIsSubmitting(false)
    }
  }

  const handleDeleteProperty = async (id: string | number) => {
    if (confirm("Are you sure you want to delete this property?")) {
      try {
        // In a real app, this would send to the API
        // await fetch(`/api/properties/${id}`, {
        //   method: 'DELETE'
        // })

        // For now, we'll just update the local state
        setProperties((prev) => prev.filter((property) => property.id !== id))

        toast({
          title: "Success",
          description: "Property deleted successfully!",
        })
      } catch (error) {
        console.error("Error deleting property:", error)
        toast({
          title: "Error",
          description: "Failed to delete property. Please try again.",
          variant: "destructive",
        })
      }
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <motion.h2
          className="text-2xl font-bold"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          Properties
        </motion.h2>
        <motion.div
          className="flex gap-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            variant={view === "grid" ? "default" : "outline"}
            size="sm"
            className="h-9 transition-all duration-300"
            onClick={() => setView("grid")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-1"
            >
              <rect width="7" height="7" x="3" y="3" rx="1" />
              <rect width="7" height="7" x="14" y="3" rx="1" />
              <rect width="7" height="7" x="14" y="14" rx="1" />
              <rect width="7" height="7" x="3" y="14" rx="1" />
            </svg>
            Grid
          </Button>
          <Button
            variant={view === "list" ? "default" : "outline"}
            size="sm"
            className="h-9 transition-all duration-300"
            onClick={() => setView("list")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-1"
            >
              <line x1="8" x2="21" y1="6" y2="6" />
              <line x1="8" x2="21" y1="12" y2="12" />
              <line x1="8" x2="21" y1="18" y2="18" />
              <line x1="3" x2="3.01" y1="6" y2="6" />
              <line x1="3" x2="3.01" y1="12" y2="12" />
              <line x1="3" x2="3.01" y1="18" y2="18" />
            </svg>
            List
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="h-9 transition-all duration-300 hover:scale-105" size="sm">
                <Plus className="h-4 w-4 mr-1" />
                Add Property
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Property</DialogTitle>
                <DialogDescription>Fill in the details to add a new property to the system.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label htmlFor="title" className="text-right">
                      Title*
                    </Label>
                    <Input
                      id="title"
                      value={newProperty.title}
                      onChange={(e) => setNewProperty({ ...newProperty, title: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="location" className="text-right">
                      Location*
                    </Label>
                    <Input
                      id="location"
                      value={newProperty.location}
                      onChange={(e) => setNewProperty({ ...newProperty, location: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="status" className="text-right">
                      Status
                    </Label>
                    <Select
                      value={newProperty.status}
                      onValueChange={(value) => setNewProperty({ ...newProperty, status: value })}
                    >
                      <SelectTrigger id="status" className="mt-1">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="For Sale">For Sale</SelectItem>
                        <SelectItem value="For Rent">For Rent</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="price" className="text-right">
                      Price (Rs.)*
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      value={newProperty.price || ""}
                      onChange={(e) => setNewProperty({ ...newProperty, price: Number(e.target.value) })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="bedrooms" className="text-right">
                      Bedrooms
                    </Label>
                    <Input
                      id="bedrooms"
                      type="number"
                      value={newProperty.bedrooms || ""}
                      onChange={(e) => setNewProperty({ ...newProperty, bedrooms: Number(e.target.value) })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="bathrooms" className="text-right">
                      Bathrooms
                    </Label>
                    <Input
                      id="bathrooms"
                      type="number"
                      step="0.5"
                      value={newProperty.bathrooms || ""}
                      onChange={(e) => setNewProperty({ ...newProperty, bathrooms: Number(e.target.value) })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="size" className="text-right">
                      Size (sq ft)
                    </Label>
                    <Input
                      id="size"
                      type="number"
                      value={newProperty.size || ""}
                      onChange={(e) => setNewProperty({ ...newProperty, size: Number(e.target.value) })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="image" className="text-right">
                      Image URL
                    </Label>
                    <Input
                      id="image"
                      value={newProperty.image}
                      onChange={(e) => setNewProperty({ ...newProperty, image: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      value={newProperty.description || ""}
                      onChange={(e) => setNewProperty({ ...newProperty, description: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddProperty} disabled={isSubmitting} className="relative overflow-hidden">
                  {isSubmitting ? (
                    <>
                      <span className="opacity-0">Add Property</span>
                      <Loader2 className="absolute inset-0 m-auto h-4 w-4 animate-spin" />
                    </>
                  ) : (
                    "Add Property"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </motion.div>
      </div>

      <motion.div
        className="flex flex-col md:flex-row gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="flex-grow flex items-center relative">
          <Search className="absolute left-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search properties..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={propertyType} onValueChange={setPropertyType}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Property Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="house">House</SelectItem>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="villa">Villa</SelectItem>
              <SelectItem value="land">Land</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon" className="hover:bg-muted transition-colors">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>

      {loading ? (
        view === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="aspect-video relative overflow-hidden">
                  <Skeleton className="h-full w-full" />
                </div>
                <CardHeader className="pb-2">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2 mt-2" />
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-1/4" />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-8 w-16" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <Skeleton className="h-4 w-24" />
                  </TableHead>
                  <TableHead>
                    <Skeleton className="h-4 w-24" />
                  </TableHead>
                  <TableHead>
                    <Skeleton className="h-4 w-16" />
                  </TableHead>
                  <TableHead>
                    <Skeleton className="h-4 w-16" />
                  </TableHead>
                  <TableHead>
                    <Skeleton className="h-4 w-24" />
                  </TableHead>
                  <TableHead className="text-right">
                    <Skeleton className="h-4 w-16 ml-auto" />
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[...Array(6)].map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Skeleton className="h-10 w-full" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-16" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-8 w-20 ml-auto" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )
      ) : filteredProperties.length === 0 ? (
        <motion.div
          className="text-center py-10 border rounded-md"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-muted-foreground">No properties found. Try adjusting your search criteria.</p>
        </motion.div>
      ) : view === "grid" ? (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence>
            {filteredProperties.map((property) => (
              <motion.div key={property.id} variants={itemVariants} layout>
                <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group">
                  <div
                    className="aspect-video relative overflow-hidden cursor-pointer"
                    onClick={() => router.push(`/properties/${property.id}`)}
                  >
                    <img
                      src={property.image || "/placeholder.svg"}
                      alt={property.title}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-sm font-medium text-green-600 shadow-sm">
                      Rs. {property.price.toLocaleString()}
                    </div>
                    <div
                      className={`absolute top-2 left-2 px-2 py-1 rounded text-xs font-medium shadow-sm backdrop-blur-sm ${
                        property.status === "For Sale"
                          ? "bg-green-100/90 text-green-800"
                          : property.status === "For Rent"
                            ? "bg-blue-100/90 text-blue-800"
                            : "bg-amber-100/90 text-amber-800"
                      }`}
                    >
                      {property.status}
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle
                      className="text-lg group-hover:text-primary transition-colors cursor-pointer"
                      onClick={() => router.push(`/properties/${property.id}`)}
                    >
                      {property.title}
                    </CardTitle>
                    <CardDescription className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1 text-gray-400" />
                      {property.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <BedDouble className="h-4 w-4 mr-1 text-gray-400" />
                        {property.bedrooms} Beds
                      </div>
                      <div className="flex items-center">
                        <Bath className="h-4 w-4 mr-1 text-gray-400" />
                        {property.bathrooms} Baths
                      </div>
                      <div className="flex items-center">
                        <Move className="h-4 w-4 mr-1 text-gray-400" />
                        {property.size} sq ft
                      </div>
                    </div>
                  </CardContent>
                  {/* In the grid view, add a compare button in the CardFooter */}
                  {/* Find the CardFooter section and replace it with: */}
                  <CardFooter className="flex justify-between">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" className="hover:bg-muted transition-colors">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors"
                        onClick={() => handleDeleteProperty(property.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                    <Button
                      variant={isInComparison(property.id) ? "default" : "outline"}
                      size="sm"
                      className={isInComparison(property.id) ? "bg-primary text-primary-foreground" : ""}
                      onClick={() => handleCompareToggle(property)}
                    >
                      {isInComparison(property.id) ? (
                        <>
                          <Check className="h-4 w-4 mr-1" />
                          Comparing
                        </>
                      ) : (
                        "Compare"
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div
          className="border rounded-md overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Property</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Details</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence>
                {filteredProperties.map((property, index) => (
                  <motion.tr
                    key={property.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="group"
                  >
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-md bg-gray-200 relative overflow-hidden">
                          <img
                            src={property.image || "/placeholder.svg"}
                            alt={property.title}
                            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
                        <div
                          className="font-medium group-hover:text-primary transition-colors cursor-pointer"
                          onClick={() => router.push(`/properties/${property.id}`)}
                        >
                          {property.title}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{property.location}</TableCell>
                    <TableCell>
                      <div
                        className={`px-2 py-1 rounded-full text-xs font-medium inline-block ${
                          property.status === "For Sale"
                            ? "bg-green-100 text-green-800"
                            : property.status === "For Rent"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {property.status}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">Rs. {property.price.toLocaleString()}</TableCell>
                    <TableCell className="text-sm">
                      {property.bedrooms} bd | {property.bathrooms} ba | {property.size} sq ft
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 opacity-70 hover:opacity-100 transition-opacity"
                          onClick={() => router.push(`/properties/${property.id}`)}
                        >
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 opacity-70 hover:opacity-100 transition-opacity"
                        >
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        {/* In the list view, add a compare button in the actions cell */}
                        {/* Find the TableCell with actions and add this button: */}
                        <Button
                          variant={isInComparison(property.id) ? "default" : "ghost"}
                          size="sm"
                          className="h-8 w-8 p-0 opacity-70 hover:opacity-100 transition-opacity"
                          onClick={() => handleCompareToggle(property)}
                        >
                          {isInComparison(property.id) ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <line x1="18" y1="6" x2="6" y2="18"></line>
                              <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                          )}
                          <span className="sr-only">
                            {isInComparison(property.id) ? "Remove from comparison" : "Add to comparison"}
                          </span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 opacity-70 hover:opacity-100 transition-all"
                          onClick={() => handleDeleteProperty(property.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </TableBody>
          </Table>
        </motion.div>
      )}
    </div>
  )
}

// Mock data for properties
const mockProperties = [
  {
    id: 1,
    title: "Luxury Villa in Colombo 7",
    location: "Colombo 7, Western Province",
    status: "For Sale",
    price: 125000000,
    bedrooms: 5,
    bathrooms: 4.5,
    size: 3200,
    image: "/luxury-villa-colombo.png",
    description: "Stunning luxury villa in the heart of Colombo 7 with modern amenities and spacious living areas.",
  },
  {
    id: 2,
    title: "Apartment in Wellawatte",
    location: "Wellawatte, Colombo",
    status: "For Rent",
    price: 150000,
    bedrooms: 2,
    bathrooms: 2,
    size: 1100,
    image: "/wellawatte-apartment.png",
    description: "Modern apartment with sea view in Wellawatte, close to shopping centers and restaurants.",
  },
  {
    id: 3,
    title: "Family Home in Kandy",
    location: "Kandy, Central Province",
    status: "For Sale",
    price: 62500000,
    bedrooms: 4,
    bathrooms: 3,
    size: 2400,
    image: "/whimsical-candy-house.png",
    description: "Beautiful family home in Kandy with garden and mountain views, perfect for a growing family.",
  },
  {
    id: 4,
    title: "Beach Villa in Unawatuna",
    location: "Unawatuna, Southern Province",
    status: "For Sale",
    price: 89000000,
    bedrooms: 3,
    bathrooms: 2,
    size: 1800,
    image: "/unawatuna-beach-villa.png",
    description: "Beachfront villa with direct access to Unawatuna beach, perfect for vacation or rental investment.",
  },
  {
    id: 5,
    title: "Mountain View Bungalow",
    location: "Nuwara Eliya, Central Province",
    status: "For Sale",
    price: 75000000,
    bedrooms: 3,
    bathrooms: 2,
    size: 1600,
    image: "/nuwara-eliya-bungalow.png",
    description: "Charming bungalow with panoramic mountain views in the cool climate of Nuwara Eliya.",
  },
  {
    id: 6,
    title: "Luxury Penthouse in Colombo",
    location: "Colombo 3, Western Province",
    status: "Pending",
    price: 180000000,
    bedrooms: 4,
    bathrooms: 4.5,
    size: 3800,
    image: "/luxury-penthouse-colombo.png",
    description: "Exclusive penthouse with 360-degree views of Colombo city and the Indian Ocean.",
  },
]
