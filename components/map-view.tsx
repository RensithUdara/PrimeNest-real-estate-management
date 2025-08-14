"use client"

import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Search, MapPin, Loader2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface Property {
  title: string
  location: string
  status: string
  price: number
  image: string
  coordinates: { x: number; y: number }
}

export default function MapView() {
  const mapRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [properties, setProperties] = useState<Property[]>([])
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([])

  // Fetch properties for the map
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        // In a real app, this would fetch from the API
        // const response = await fetch('/api/properties?includeCoordinates=true')
        // const data = await response.json()

        // For now, we'll use the mock data
        const data = mockProperties
        setProperties(data)
        setFilteredProperties(data)
      } catch (error) {
        console.error("Error fetching properties for map:", error)
        toast({
          title: "Error",
          description: "Failed to load map data. Please try again later.",
          variant: "destructive",
        })
      } finally {
        // Simulate map loading
        setTimeout(() => {
          setLoading(false)
        }, 1000)
      }
    }

    fetchProperties()
  }, [])

  // Filter properties based on search query
  useEffect(() => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const filtered = properties.filter(
        (property) => property.title.toLowerCase().includes(query) || property.location.toLowerCase().includes(query),
      )
      setFilteredProperties(filtered)
    } else {
      setFilteredProperties(properties)
    }
  }, [searchQuery, properties])

  const handleSearch = () => {
    toast({
      title: "Search Area",
      description: `Searching for properties near "${searchQuery}"`,
    })
    // In a real app, this would trigger a geolocation search
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">Property Map</h2>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-xs">For Sale</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-xs">For Rent</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <span className="text-xs">Pending</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-grow flex items-center relative">
          <Search className="absolute left-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search location..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button className="h-9" onClick={handleSearch}>
          Search Area
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-3">
          <div className="relative border rounded-md h-[500px] bg-gray-100 overflow-hidden">
            {loading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
              </div>
            ) : (
              <>
                {/* This would be replaced with an actual Google Maps component */}
                <div
                  ref={mapRef}
                  className="w-full h-full bg-gray-200"
                  style={{
                    backgroundImage: "url('/placeholder.svg?height=500&width=800&query=sri%20lanka%20map')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {/* Map pins would be dynamically added here */}
                  {filteredProperties.map((property, index) => (
                    <div
                      key={index}
                      className="absolute"
                      style={{
                        top: `${property.coordinates.y}%`,
                        left: `${property.coordinates.x}%`,
                      }}
                    >
                      <div
                        className={`w-6 h-6 -mt-6 -ml-3 flex items-center justify-center ${
                          property.status === "For Sale"
                            ? "text-green-600"
                            : property.status === "For Rent"
                              ? "text-blue-600"
                              : "text-amber-600"
                        }`}
                      >
                        <MapPin className="h-6 w-6 fill-current" />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
        <div className="space-y-4 h-[500px] overflow-y-auto">
          <h3 className="font-semibold">Properties in View ({filteredProperties.length})</h3>
          {filteredProperties.length === 0 ? (
            <p className="text-muted-foreground text-sm">No properties found in this area.</p>
          ) : (
            filteredProperties.map((property, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="aspect-video relative">
                  <img
                    src={property.image || "/placeholder.svg"}
                    alt={property.title}
                    className="object-cover w-full h-full"
                  />
                  <div
                    className={`absolute top-2 left-2 px-2 py-1 rounded text-xs font-medium ${
                      property.status === "For Sale"
                        ? "bg-green-100 text-green-800"
                        : property.status === "For Rent"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {property.status}
                  </div>
                </div>
                <CardContent className="p-3">
                  <div className="font-medium text-sm line-clamp-1">{property.title}</div>
                  <div className="text-xs text-gray-500 flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    {property.location}
                  </div>
                  <div className="text-sm font-semibold mt-1 text-green-600">Rs. {property.price.toLocaleString()}</div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

// Mock data for map properties
const mockProperties = [
  {
    title: "Luxury Villa in Colombo 7",
    location: "Colombo 7, Western Province",
    status: "For Sale",
    price: 125000000,
    image: "/luxury-villa-colombo.png",
    coordinates: { x: 30, y: 40 },
  },
  {
    title: "Apartment in Wellawatte",
    location: "Wellawatte, Colombo",
    status: "For Rent",
    price: 150000,
    image: "/wellawatte-apartment.png",
    coordinates: { x: 35, y: 42 },
  },
  {
    title: "Family Home in Kandy",
    location: "Kandy, Central Province",
    status: "For Sale",
    price: 62500000,
    image: "/whimsical-candy-house.png",
    coordinates: { x: 50, y: 30 },
  },
  {
    title: "Beach Villa in Unawatuna",
    location: "Unawatuna, Southern Province",
    status: "Pending",
    price: 89000000,
    image: "/unawatuna-beach-villa.png",
    coordinates: { x: 45, y: 65 },
  },
  {
    title: "Mountain View Bungalow",
    location: "Nuwara Eliya, Central Province",
    status: "For Sale",
    price: 75000000,
    image: "/nuwara-eliya-bungalow.png",
    coordinates: { x: 60, y: 25 },
  },
  {
    title: "Beachfront Land in Mirissa",
    location: "Mirissa, Southern Province",
    status: "For Sale",
    price: 45000000,
    image: "/placeholder.svg?height=120&width=200&query=beach%20land%20mirissa",
    coordinates: { x: 55, y: 75 },
  },
]
