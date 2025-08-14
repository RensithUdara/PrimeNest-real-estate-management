import { NextResponse } from "next/server"

// Mock database - in a real app, this would be MongoDB
const clients = [
  {
    id: "client-1",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "(555) 123-4567",
    type: "Buyer",
    properties: ["prop-3"],
    notes: "Looking for a family home in the suburbs with at least 4 bedrooms.",
    budget: 650000,
    joined: "2023-01-15",
  },
  {
    id: "client-2",
    name: "Maria Rodriguez",
    email: "maria.r@example.com",
    phone: "(555) 234-5678",
    type: "Seller",
    properties: ["prop-1"],
    notes: "Selling home due to relocation. Wants to close within 3 months.",
    budget: null,
    joined: "2023-02-03",
  },
  // More clients would be here
]

export async function GET(request: Request) {
  // Get URL parameters
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")
  const type = searchParams.get("type")

  // Filter clients based on parameters
  let filteredClients = [...clients]

  if (id) {
    filteredClients = filteredClients.filter((client) => client.id === id)
  }

  if (type) {
    filteredClients = filteredClients.filter((client) => client.type.toLowerCase() === type.toLowerCase())
  }

  // Return clients (with a simulated delay to mimic real-world API)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(NextResponse.json(filteredClients))
    }, 300)
  })
}

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Validate required fields
    if (!data.name || !data.email || !data.type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Generate a new ID
    const newId = `client-${Date.now()}`

    // Create new client
    const newClient = {
      id: newId,
      ...data,
      // Set default values for missing fields
      phone: data.phone || "",
      properties: data.properties || [],
      notes: data.notes || "",
      budget: data.budget || null,
      joined: new Date().toISOString().split("T")[0],
    }

    // In a real app, we would save to MongoDB here
    // For this mock, we'll just return the new client

    return NextResponse.json(newClient, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create client" }, { status: 500 })
  }
}
