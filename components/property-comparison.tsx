"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowLeft, Trash2, Plus, X, MapPin, BedDouble, Bath, Move, Calendar, CheckCircle2, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { useComparison } from "@/context/comparison-context"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function PropertyComparison() {
  const router = useRouter()
  const { comparisonList, removeFromComparison, clearComparison } = useComparison()
  const [activeTab, setActiveTab] = useState("overview")
  const [isClient, setIsClient] = useState(false)

  // Fix hydration issues by only rendering client-side
  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <ComparisonSkeleton />
  }

  // If no properties are selected for comparison
  if (comparisonList.length === 0) {
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
            onClick={() => router.push("/")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center py-16 px-4 border rounded-lg bg-muted/30"
        >
          <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <Home className="h-8 w-8 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold mb-2">No Properties to Compare</h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">
            You haven't added any properties to your comparison list yet. Browse properties and click the "Add to
            Compare" button to start comparing.
          </p>
          <Button onClick={() => router.push("/")}>Browse Properties</Button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <Button
            variant="ghost"
            size="sm"
            className="mb-2 hover:bg-muted transition-colors"
            onClick={() => router.push("/")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          <h1 className="text-2xl font-bold">Compare Properties</h1>
          <p className="text-muted-foreground">
            Comparing {comparisonList.length} {comparisonList.length === 1 ? "property" : "properties"}
          </p>
        </div>
        <Button variant="outline" onClick={clearComparison} className="w-full md:w-auto">
          <Trash2 className="mr-2 h-4 w-4" />
          Clear All
        </Button>
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 w-full max-w-md mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="amenities">Amenities</TabsTrigger>
          <TabsTrigger value="location">Location</TabsTrigger>
        </TabsList>

        <ScrollArea className="w-full">
          <div className="min-w-max">
            <TabsContent value="overview" className="mt-0">
              <div className="grid grid-cols-[200px_repeat(auto-fill,minmax(250px,1fr))]">
                {/* Headers */}
                <div className="sticky left-0 bg-background z-10 border-r">
                  <div className="h-[250px] flex items-end p-4 font-semibold">Property</div>
                  <div className="border-t p-4 font-semibold">Price</div>
                  <div className="border-t p-4 font-semibold">Location</div>
                  <div className="border-t p-4 font-semibold">Status</div>
                  <div className="border-t p-4 font-semibold">Bedrooms</div>
                  <div className="border-t p-4 font-semibold">Bathrooms</div>
                  <div className="border-t p-4 font-semibold">Size</div>
                  <div className="border-t p-4 font-semibold">Property Type</div>
                  <div className="border-t p-4 font-semibold">Year Built</div>
                  <div className="border-t p-4 font-semibold">Actions</div>
                </div>

                {/* Property columns */}
                {comparisonList.map((property) => (
                  <div key={property.id} className="border-r last:border-r-0">
                    <div className="p-4 h-[250px]">
                      <div className="relative h-full w-full overflow-hidden rounded-md group">
                        <Image
                          src={property.image || "/placeholder.svg"}
                          alt={property.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-3">
                          <h3 className="text-white font-semibold line-clamp-2">{property.title}</h3>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm hover:bg-background"
                          onClick={() => removeFromComparison(property.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="border-t p-4 font-semibold text-primary">
                      Rs. {property.price.toLocaleString()}
                      {property.status === "For Rent" && (
                        <span className="text-sm font-normal text-muted-foreground">/month</span>
                      )}
                    </div>
                    <div className="border-t p-4 flex items-center">
                      <MapPin className="h-4 w-4 mr-1 text-muted-foreground flex-shrink-0" />
                      <span className="line-clamp-1">{property.location}</span>
                    </div>
                    <div className="border-t p-4">
                      <Badge
                        className={`
                          ${
                            property.status === "For Sale"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                              : property.status === "For Rent"
                                ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                                : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                          }
                        `}
                      >
                        {property.status}
                      </Badge>
                    </div>
                    <div className="border-t p-4">
                      <div className="flex items-center">
                        <BedDouble className="h-4 w-4 mr-1 text-muted-foreground" />
                        {property.bedrooms}
                      </div>
                    </div>
                    <div className="border-t p-4">
                      <div className="flex items-center">
                        <Bath className="h-4 w-4 mr-1 text-muted-foreground" />
                        {property.bathrooms}
                      </div>
                    </div>
                    <div className="border-t p-4">
                      <div className="flex items-center">
                        <Move className="h-4 w-4 mr-1 text-muted-foreground" />
                        {property.size} sq ft
                      </div>
                    </div>
                    <div className="border-t p-4">
                      <Badge variant="outline">{property.propertyType || "N/A"}</Badge>
                    </div>
                    <div className="border-t p-4">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                        {property.yearBuilt || "N/A"}
                      </div>
                    </div>
                    <div className="border-t p-4">
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                          onClick={() => router.push(`/properties/${property.id}`)}
                        >
                          View
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="w-full"
                          onClick={() => removeFromComparison(property.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Add more properties column */}
                {comparisonList.length < 4 && (
                  <div className="border-r">
                    <div className="p-4 h-[250px]">
                      <Button
                        variant="outline"
                        className="h-full w-full border-dashed flex flex-col items-center justify-center"
                        onClick={() => router.push("/")}
                      >
                        <Plus className="h-8 w-8 mb-2" />
                        <span>Add Property</span>
                      </Button>
                    </div>
                    <div className="border-t p-4"></div>
                    <div className="border-t p-4"></div>
                    <div className="border-t p-4"></div>
                    <div className="border-t p-4"></div>
                    <div className="border-t p-4"></div>
                    <div className="border-t p-4"></div>
                    <div className="border-t p-4"></div>
                    <div className="border-t p-4"></div>
                    <div className="border-t p-4"></div>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="details" className="mt-0">
              <div className="grid grid-cols-[200px_repeat(auto-fill,minmax(250px,1fr))]">
                {/* Headers */}
                <div className="sticky left-0 bg-background z-10 border-r">
                  <div className="h-[60px] flex items-center p-4 font-semibold">Property</div>
                  <div className="border-t p-4 font-semibold">Description</div>
                </div>

                {/* Property columns */}
                {comparisonList.map((property) => (
                  <div key={property.id} className="border-r last:border-r-0">
                    <div className="p-4 h-[60px] font-semibold">{property.title}</div>
                    <div className="border-t p-4">
                      <p className="text-sm text-muted-foreground">
                        {property.description || "No description available"}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Add more properties column */}
                {comparisonList.length < 4 && (
                  <div className="border-r">
                    <div className="p-4 h-[60px]"></div>
                    <div className="border-t p-4"></div>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="amenities" className="mt-0">
              <div className="grid grid-cols-[200px_repeat(auto-fill,minmax(250px,1fr))]">
                {/* Headers */}
                <div className="sticky left-0 bg-background z-10 border-r">
                  <div className="h-[60px] flex items-center p-4 font-semibold">Property</div>
                  <div className="border-t p-4 font-semibold">Air Conditioning</div>
                  <div className="border-t p-4 font-semibold">Swimming Pool</div>
                  <div className="border-t p-4 font-semibold">Garden</div>
                  <div className="border-t p-4 font-semibold">Parking</div>
                  <div className="border-t p-4 font-semibold">Security System</div>
                  <div className="border-t p-4 font-semibold">High-Speed Internet</div>
                  <div className="border-t p-4 font-semibold">Modern Kitchen</div>
                  <div className="border-t p-4 font-semibold">Balcony</div>
                </div>

                {/* Property columns */}
                {comparisonList.map((property) => (
                  <div key={property.id} className="border-r last:border-r-0">
                    <div className="p-4 h-[60px] font-semibold">{property.title}</div>
                    {[
                      "Air Conditioning",
                      "Swimming Pool",
                      "Garden",
                      "Parking",
                      "Security System",
                      "High-Speed Internet",
                      "Modern Kitchen",
                      "Balcony",
                    ].map((amenity) => (
                      <div key={amenity} className="border-t p-4">
                        {property.amenities?.includes(amenity) ? (
                          <div className="flex items-center text-green-600">
                            <CheckCircle2 className="h-5 w-5 mr-1" />
                            <span>Yes</span>
                          </div>
                        ) : (
                          <div className="flex items-center text-red-500">
                            <X className="h-5 w-5 mr-1" />
                            <span>No</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ))}

                {/* Add more properties column */}
                {comparisonList.length < 4 && (
                  <div className="border-r">
                    <div className="p-4 h-[60px]"></div>
                    <div className="border-t p-4"></div>
                    <div className="border-t p-4"></div>
                    <div className="border-t p-4"></div>
                    <div className="border-t p-4"></div>
                    <div className="border-t p-4"></div>
                    <div className="border-t p-4"></div>
                    <div className="border-t p-4"></div>
                    <div className="border-t p-4"></div>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="location" className="mt-0">
              <div className="grid grid-cols-[200px_repeat(auto-fill,minmax(250px,1fr))]">
                {/* Headers */}
                <div className="sticky left-0 bg-background z-10 border-r">
                  <div className="h-[60px] flex items-center p-4 font-semibold">Property</div>
                  <div className="border-t p-4 font-semibold">Location</div>
                  <div className="border-t p-4 font-semibold h-[250px]">Map</div>
                </div>

                {/* Property columns */}
                {comparisonList.map((property) => (
                  <div key={property.id} className="border-r last:border-r-0">
                    <div className="p-4 h-[60px] font-semibold">{property.title}</div>
                    <div className="border-t p-4">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1 text-muted-foreground flex-shrink-0" />
                        <span>{property.location}</span>
                      </div>
                    </div>
                    <div className="border-t p-4 h-[250px]">
                      <div className="relative h-full w-full rounded-md overflow-hidden bg-muted">
                        {/* This would be a real map in a production app */}
                        <Image src="/property-map.png" alt="Property location map" fill className="object-cover" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                          <div className="h-6 w-6 bg-primary rounded-full flex items-center justify-center animate-pulse">
                            <div className="h-3 w-3 bg-white rounded-full"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Add more properties column */}
                {comparisonList.length < 4 && (
                  <div className="border-r">
                    <div className="p-4 h-[60px]"></div>
                    <div className="border-t p-4"></div>
                    <div className="border-t p-4 h-[250px]"></div>
                  </div>
                )}
              </div>
            </TabsContent>
          </div>
        </ScrollArea>
      </Tabs>
    </div>
  )
}

// Skeleton loader for comparison
function ComparisonSkeleton() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <Skeleton className="h-10 w-32 mb-4" />
        <Skeleton className="h-8 w-64 mb-2" />
        <Skeleton className="h-4 w-40" />
      </div>

      <Skeleton className="h-10 w-96 mb-6" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <div className="aspect-video relative overflow-hidden">
              <Skeleton className="h-full w-full" />
            </div>
            <CardContent className="p-4 space-y-4">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <div className="flex justify-between">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-16" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
