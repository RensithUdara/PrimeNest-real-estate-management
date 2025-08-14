import { NextResponse } from "next/server"

// Mock database - in a real app, this would be MongoDB
const properties = [
  {
    id: "prop-1",
    title: "Modern Villa with Pool",
    location: "Beverly Hills, CA",
    status: "For Sale",
    price: 1250000,
    bedrooms: 5,
    bathrooms: 4.5,
    size: 3200,
    description: "Stunning modern villa featuring an infinity pool, home theater, and panoramic views.",
    amenities: ["Pool", "Home Theater", "Garage", "Garden", "Security System"],
    images: ["/placeholder.svg?height=400&width=600&query=modern%20villa%20with%20pool"],
    coordinates: { lat: 34.0736, lng: -118.4004 },
    agentId: "agent-1",
  },
  {
    id: "prop-2",
    title: "Downtown Apartment",
    location: "Seattle, WA",
    status: "For Rent",
    price: 3500,
    bedrooms: 2,
    bathrooms: 2,
    size: 1100,
    description: "Luxurious downtown apartment with skyline views, modern appliances, and 24/7 concierge service.",
    amenities: ["Gym", "Concierge", "Rooftop Terrace", "Pet Friendly", "In-unit Laundry"],
    images: ["/placeholder.svg?height=400&width=600&query=downtown%20apartment%20seattle"],
    coordinates: { lat: 47.6062, lng: -122.3321 },
    agentId: "agent-2",
  },
  // More properties would be here
]

export async function GET(request: Request) {
  // Get URL parameters
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")
  const status = searchParams.get("status")
  const minPrice = searchParams.get("minPrice")
  const maxPrice = searchParams.get("maxPrice")

  // Filter properties based on parameters
  let filteredProperties = [...properties]

  if (id) {
    filteredProperties = filteredProperties.filter((prop) => prop.id === id)
  }

  if (status) {
    filteredProperties = filteredProperties.filter((prop) => prop.status.toLowerCase() === status.toLowerCase())
  }

  if (minPrice) {
    filteredProperties = filteredProperties.filter((prop) => prop.price >= Number.parseInt(minPrice))
  }

  if (maxPrice) {
    filteredProperties = filteredProperties.filter((prop) => prop.price <= Number.parseInt(maxPrice))
  }

  // Return properties (with a simulated delay to mimic real-world API)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(NextResponse.json(filteredProperties))
    }, 500)
  })
}

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Validate required fields
    if (!data.title || !data.location || !data.status || !data.price) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Generate a new ID
    const newId = `prop-${Date.now()}`

    // Create new property
    const newProperty = {
      id: newId,
      ...data,
      // Set default values for missing fields
      bedrooms: data.bedrooms || 0,
      bathrooms: data.bathrooms || 0,
      size: data.size || 0,
      description: data.description || "",
      amenities: data.amenities || [],
      images: data.images || [],
      coordinates: data.coordinates || { lat: 0, lng: 0 },
    }

    // In a real app, we would save to MongoDB here
    // For this mock, we'll just return the new property

    return NextResponse.json(newProperty, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create property" }, { status: 500 })
  }
}
