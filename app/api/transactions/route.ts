import { NextResponse } from "next/server"

// Mock database - in a real app, this would be MongoDB
const transactions = [
  {
    id: "TRX-78901",
    property: {
      id: "prop-1",
      title: "Modern Villa with Pool",
      location: "Beverly Hills, CA",
    },
    type: "Sale",
    client: {
      id: "client-1",
      name: "John Smith",
    },
    agent: {
      id: "agent-1",
      name: "Sarah Johnson",
    },
    date: "2023-05-15",
    amount: 1250000,
    status: "Completed",
    documents: ["contract.pdf", "closing.pdf"],
    notes: "Smooth transaction. Buyer very satisfied.",
  },
  {
    id: "TRX-78902",
    property: {
      id: "prop-2",
      title: "Downtown Apartment",
      location: "Seattle, WA",
    },
    type: "Rental",
    client: {
      id: "client-3",
      name: "David Lee",
    },
    agent: {
      id: "agent-2",
      name: "Michael Chen",
    },
    date: "2023-05-18",
    amount: 42000,
    status: "Completed",
    documents: ["rental-agreement.pdf"],
    notes: "12-month lease agreement signed.",
  },
  // More transactions would be here
]

export async function GET(request: Request) {
  // Get URL parameters
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")
  const status = searchParams.get("status")
  const clientId = searchParams.get("clientId")
  const propertyId = searchParams.get("propertyId")

  // Filter transactions based on parameters
  let filteredTransactions = [...transactions]

  if (id) {
    filteredTransactions = filteredTransactions.filter((tx) => tx.id === id)
  }

  if (status) {
    filteredTransactions = filteredTransactions.filter((tx) => tx.status.toLowerCase() === status.toLowerCase())
  }

  if (clientId) {
    filteredTransactions = filteredTransactions.filter((tx) => tx.client.id === clientId)
  }

  if (propertyId) {
    filteredTransactions = filteredTransactions.filter((tx) => tx.property.id === propertyId)
  }

  // Return transactions (with a simulated delay to mimic real-world API)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(NextResponse.json(filteredTransactions))
    }, 400)
  })
}

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Validate required fields
    if (!data.property || !data.client || !data.type || !data.amount) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Generate a new ID
    const newId = `TRX-${Math.floor(10000 + Math.random() * 90000)}`

    // Create new transaction
    const newTransaction = {
      id: newId,
      ...data,
      date: data.date || new Date().toISOString().split("T")[0],
      status: data.status || "Pending",
      documents: data.documents || [],
      notes: data.notes || "",
    }

    // In a real app, we would save to MongoDB here
    // For this mock, we'll just return the new transaction

    return NextResponse.json(newTransaction, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create transaction" }, { status: 500 })
  }
}
