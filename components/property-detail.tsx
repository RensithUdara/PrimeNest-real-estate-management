"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowLeft,
  Heart,
  Share2,
  MapPin,
  BedDouble,
  Bath,
  Move,
  Calendar,
  Tag,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Edit,
  Trash2,
  Phone,
  Mail,
  MessageSquare,
  Check,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "@/components/ui/use-toast"
import { useComparison } from "@/context/comparison-context"

interface PropertyDetailProps {
  id: string
}

export default function PropertyDetail({ id }: PropertyDetailProps) {
  const router = useRouter()
  const [property, setProperty] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const [activeTab, setActiveTab] = useState("details")
  const [similarProperties, setSimilarProperties] = useState<any[]>([])

  const { addToComparison, removeFromComparison, isInComparison } = useComparison()

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true)
        // In a real app, this would fetch from the API
        // const response = await fetch(`/api/properties/${id}`)
        // const data = await response.json()

        // For now, we'll simulate fetching with a delay
        setTimeout(() => {
          // Find the property in our mock data
          const foundProperty = mockProperties.find((p) => p.id.toString() === id)

          if (foundProperty) {
            setProperty({
              ...foundProperty,
              // Add additional details for the property detail page
              description: foundProperty.description || "Stunning property with modern amenities and beautiful views.",
              yearBuilt: 2020,
              propertyType: foundProperty.title.toLowerCase().includes("apartment")
                ? "Apartment"
                : foundProperty.title.toLowerCase().includes("villa")
                  ? "Villa"
                  : "House",
              amenities: [
                "Air Conditioning",
                "Swimming Pool",
                "Garden",
                "Parking",
                "Security System",
                "High-Speed Internet",
                "Modern Kitchen",
                "Balcony",
              ],
              images: [foundProperty.image, "/modern-house.png", "/modern-apartment-building.png", "/beach-condo.png"],
              agent: {
                id: "agent-1",
                name: "Sarah Johnson",
                phone: "+94 77 123 4567",
                email: "sarah.j@primenest.lk",
                image: "/user-avatar.png",
                properties: 24,
                rating: 4.8,
              },
              location: {
                address: foundProperty.location,
                coordinates: { lat: 6.9271, lng: 79.8612 },
              },
            })

            // Get similar properties (excluding current one)
            const similar = mockProperties
              .filter(
                (p) =>
                  p.id.toString() !== id &&
                  (p.status === foundProperty.status || p.location.includes(foundProperty.location.split(",")[0])),
              )
              .slice(0, 3)

            setSimilarProperties(similar)
          } else {
            toast({
              title: "Error",
              description: "Property not found",
              variant: "destructive",
            })
            router.push("/")
          }

          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching property:", error)
        toast({
          title: "Error",
          description: "Failed to load property details. Please try again later.",
          variant: "destructive",
        })
        setLoading(false)
        router.push("/")
      }
    }

    fetchProperty()
  }, [id, router])

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? property?.images.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === property?.images.length - 1 ? 0 : prev + 1))
  }

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev)
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: isFavorite ? "Property removed from your favorites" : "Property added to your favorites",
    })
  }

  const handleShare = () => {
    // In a real app, this would open a share dialog
    navigator.clipboard.writeText(window.location.href)
    toast({
      title: "Link copied",
      description: "Property link copied to clipboard",
    })
  }

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this property?")) {
      toast({
        title: "Property deleted",
        description: "The property has been deleted successfully",
      })
      router.push("/")
    }
  }

  const handleContactAgent = () => {
    toast({
      title: "Contact request sent",
      description: `Your message has been sent to ${property?.agent.name}`,
    })
  }

  const handleCompareToggle = () => {
    if (property) {
      if (isInComparison(property.id)) {
        removeFromComparison(property.id)
      } else {
        addToComparison(property)
      }
    }
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <Button
          variant="ghost"
          size="sm"
          className="mb-4 hover:bg-muted transition-colors"
          onClick={() => router.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Properties
        </Button>
      </motion.div>

      {loading ? (
        <PropertyDetailSkeleton />
      ) : property ? (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Image Gallery */}
            <motion.div
              className="lg:col-span-2 relative"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative aspect-[16/9] overflow-hidden rounded-xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={property.images[currentImageIndex] || "/placeholder.svg"}
                      alt={property.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>

                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background"
                  onClick={handlePrevImage}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background"
                  onClick={handleNextImage}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                  {property.images.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all ${
                        currentImageIndex === index ? "bg-white scale-125" : "bg-white/50 hover:bg-white/80"
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </div>

                <div className="absolute top-4 right-4 flex space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className={`bg-background/80 backdrop-blur-sm hover:bg-background ${
                      isFavorite ? "text-red-500 hover:text-red-600" : ""
                    }`}
                    onClick={toggleFavorite}
                  >
                    <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
                  </Button>

                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-background/80 backdrop-blur-sm hover:bg-background"
                    onClick={handleShare}
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="absolute bottom-4 left-4">
                  <Badge
                    className={`
                      px-3 py-1 text-sm font-medium shadow-sm backdrop-blur-sm
                      ${
                        property.status === "For Sale"
                          ? "bg-green-100/90 text-green-800 dark:bg-green-900/90 dark:text-green-300"
                          : property.status === "For Rent"
                            ? "bg-blue-100/90 text-blue-800 dark:bg-blue-900/90 dark:text-blue-300"
                            : "bg-amber-100/90 text-amber-800 dark:bg-amber-900/90 dark:text-amber-300"
                      }
                    `}
                  >
                    {property.status}
                  </Badge>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-4 gap-2">
                {property.images.map((image, index) => (
                  <div
                    key={index}
                    className={`
                      aspect-[4/3] rounded-md overflow-hidden cursor-pointer relative
                      ${currentImageIndex === index ? "ring-2 ring-primary" : "opacity-80 hover:opacity-100"}
                      transition-all duration-200
                    `}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${property.title} - Image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Property Info */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div>
                <div className="flex justify-between items-start">
                  <h1 className="text-2xl font-bold">{property.title}</h1>
                  <div className="text-2xl font-bold text-primary">
                    Rs. {property.price.toLocaleString()}
                    {property.status === "For Rent" && (
                      <span className="text-sm font-normal text-muted-foreground">/month</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center mt-1 text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{property.location.address}</span>
                </div>
              </div>

              <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                <div className="text-center">
                  <BedDouble className="h-5 w-5 mx-auto text-muted-foreground" />
                  <div className="mt-1 font-medium">{property.bedrooms}</div>
                  <div className="text-xs text-muted-foreground">Bedrooms</div>
                </div>
                <div className="text-center">
                  <Bath className="h-5 w-5 mx-auto text-muted-foreground" />
                  <div className="mt-1 font-medium">{property.bathrooms}</div>
                  <div className="text-xs text-muted-foreground">Bathrooms</div>
                </div>
                <div className="text-center">
                  <Move className="h-5 w-5 mx-auto text-muted-foreground" />
                  <div className="mt-1 font-medium">{property.size}</div>
                  <div className="text-xs text-muted-foreground">Sq Ft</div>
                </div>
                <div className="text-center">
                  <Calendar className="h-5 w-5 mx-auto text-muted-foreground" />
                  <div className="mt-1 font-medium">{property.yearBuilt}</div>
                  <div className="text-xs text-muted-foreground">Year Built</div>
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="text-lg font-semibold">Property Type</h2>
                <Badge variant="outline" className="px-3 py-1">
                  {property.propertyType}
                </Badge>
              </div>

              <div className="space-y-2">
                <h2 className="text-lg font-semibold">Listed By</h2>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <div className="relative h-12 w-12 rounded-full overflow-hidden">
                        <Image
                          src={property.agent.image || "/placeholder.svg"}
                          alt={property.agent.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium">{property.agent.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {property.agent.properties} properties | {property.agent.rating} ★
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1" onClick={handleContactAgent}>
                        <Phone className="h-4 w-4 mr-2" />
                        Call
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1" onClick={handleContactAgent}>
                        <Mail className="h-4 w-4 mr-2" />
                        Email
                      </Button>
                      <Button variant="default" size="sm" className="flex-1" onClick={handleContactAgent}>
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Message
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" className="flex-1" onClick={() => router.push(`/properties/edit/${id}`)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Property
                </Button>
                <Button variant="destructive" className="flex-1" onClick={handleDelete}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Property
                </Button>
              </div>
              <Button
                variant={property && isInComparison(property.id) ? "default" : "outline"}
                className="mt-2 w-full"
                onClick={handleCompareToggle}
              >
                {property && isInComparison(property.id) ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Added to Comparison
                  </>
                ) : (
                  <>
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
                      className="mr-2"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                    Add to Comparison
                  </>
                )}
              </Button>
            </motion.div>
          </div>

          {/* Tabs Section */}
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 w-full max-w-md">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="amenities">Amenities</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="mt-6 space-y-4">
                <div>
                  <h2 className="text-xl font-semibold mb-2">Description</h2>
                  <p className="text-muted-foreground">{property.description}</p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-2">Property Details</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-2">
                      <Tag className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Property ID</p>
                        <p className="text-sm text-muted-foreground">{property.id}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <BedDouble className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Bedrooms</p>
                        <p className="text-sm text-muted-foreground">{property.bedrooms}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Bath className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Bathrooms</p>
                        <p className="text-sm text-muted-foreground">{property.bathrooms}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Move className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Property Size</p>
                        <p className="text-sm text-muted-foreground">{property.size} sq ft</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Year Built</p>
                        <p className="text-sm text-muted-foreground">{property.yearBuilt}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Tag className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Property Type</p>
                        <p className="text-sm text-muted-foreground">{property.propertyType}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="amenities" className="mt-6">
                <h2 className="text-xl font-semibold mb-4">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="location" className="mt-6">
                <h2 className="text-xl font-semibold mb-4">Location</h2>
                <div className="aspect-[16/9] rounded-lg overflow-hidden bg-muted relative">
                  {/* This would be a real map in a production app */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Image src="/property-map.png" alt="Property location map" fill className="object-cover" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="h-6 w-6 bg-primary rounded-full flex items-center justify-center animate-pulse">
                        <div className="h-3 w-3 bg-white rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="mt-2 text-muted-foreground">{property.location.address}</p>
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* Similar Properties */}
          {similarProperties.length > 0 && (
            <motion.div
              className="mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <h2 className="text-2xl font-bold mb-6">Similar Properties</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {similarProperties.map((similarProperty) => (
                  <Card
                    key={similarProperty.id}
                    className="overflow-hidden h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group"
                  >
                    <div className="aspect-video relative overflow-hidden">
                      <Image
                        src={similarProperty.image || "/placeholder.svg"}
                        alt={similarProperty.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-sm font-medium text-green-600 shadow-sm">
                        Rs. {similarProperty.price.toLocaleString()}
                      </div>
                      <div
                        className={`absolute top-2 left-2 px-2 py-1 rounded text-xs font-medium shadow-sm backdrop-blur-sm ${
                          similarProperty.status === "For Sale"
                            ? "bg-green-100/90 text-green-800"
                            : similarProperty.status === "For Rent"
                              ? "bg-blue-100/90 text-blue-800"
                              : "bg-amber-100/90 text-amber-800"
                        }`}
                      >
                        {similarProperty.status}
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold group-hover:text-primary transition-colors line-clamp-1">
                        {similarProperty.title}
                      </h3>
                      <div className="flex items-center mt-1 text-muted-foreground text-sm">
                        <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                        <span className="truncate">{similarProperty.location}</span>
                      </div>
                      <div className="flex items-center justify-between mt-4 text-sm">
                        <div className="flex items-center">
                          <BedDouble className="h-4 w-4 mr-1 text-muted-foreground" />
                          {similarProperty.bedrooms} Beds
                        </div>
                        <div className="flex items-center">
                          <Bath className="h-4 w-4 mr-1 text-muted-foreground" />
                          {similarProperty.bathrooms} Baths
                        </div>
                        <div className="flex items-center">
                          <Move className="h-4 w-4 mr-1 text-muted-foreground" />
                          {similarProperty.size} sq ft
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        className="w-full mt-4"
                        onClick={() => router.push(`/properties/${similarProperty.id}`)}
                      >
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold">Property not found</h2>
          <p className="text-muted-foreground mt-2">
            The property you're looking for doesn't exist or has been removed.
          </p>
          <Button className="mt-4" onClick={() => router.push("/")}>
            Return to Dashboard
          </Button>
        </div>
      )}
    </div>
  )
}

// Skeleton loader for property details
function PropertyDetailSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Skeleton className="aspect-[16/9] w-full rounded-xl" />
        <div className="mt-4 grid grid-cols-4 gap-2">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="aspect-[4/3] rounded-md" />
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <Skeleton className="h-8 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2" />
        </div>

        <Skeleton className="h-24 w-full rounded-lg" />

        <div className="space-y-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-8 w-24" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-32 w-full rounded-md" />
        </div>

        <div className="flex space-x-2">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
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
    description:
      "Stunning luxury villa in the heart of Colombo 7 with modern amenities and spacious living areas. This property features a private swimming pool, home theater, and panoramic views of the city. Perfect for those seeking luxury living in a prime location.",
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
    description:
      "Modern apartment with sea view in Wellawatte, close to shopping centers and restaurants. This fully furnished unit offers contemporary living with all modern conveniences including high-speed internet, air conditioning, and 24-hour security.",
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
    description:
      "Beautiful family home in Kandy with garden and mountain views, perfect for a growing family. This charming property is situated in a quiet neighborhood with easy access to schools, hospitals, and the Kandy city center.",
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
    description:
      "Beachfront villa with direct access to Unawatuna beach, perfect for vacation or rental investment. This stunning property offers breathtaking ocean views and is just steps away from one of Sri Lanka's most beautiful beaches.",
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
    description:
      "Charming bungalow with panoramic mountain views in the cool climate of Nuwara Eliya. This colonial-style property features beautiful gardens, a cozy fireplace, and is located close to the famous Nuwara Eliya Golf Club.",
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
    description:
      "Exclusive penthouse with 360-degree views of Colombo city and the Indian Ocean. This premium property offers the ultimate in luxury living with high-end finishes, smart home technology, and access to building amenities including a rooftop infinity pool.",
  },
]
