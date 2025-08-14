"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Plus, Edit, Trash2, MoreHorizontal, User, Phone, Mail, FileText, Loader2 } from "lucide-react"
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
import { toast } from "@/components/ui/use-toast"

interface Client {
  id: string | number
  name: string
  email: string
  phone: string
  type: string
  properties: number
  joined: string
  notes?: string
}

export default function ClientList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [clients, setClients] = useState<Client[]>([])
  const [filteredClients, setFilteredClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [clientType, setClientType] = useState("all")
  const [newClient, setNewClient] = useState<Partial<Client>>({
    name: "",
    email: "",
    phone: "",
    type: "Buyer",
    properties: 0,
    notes: "",
  })
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Fetch clients from API
  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true)
        // In a real app, this would fetch from the API
        // const response = await fetch('/api/clients')
        // const data = await response.json()

        // For now, we'll use the mock data
        const data = mockClients
        setClients(data)
        setFilteredClients(data)
      } catch (error) {
        console.error("Error fetching clients:", error)
        toast({
          title: "Error",
          description: "Failed to load clients. Please try again later.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchClients()
  }, [])

  // Filter clients based on search query and client type
  useEffect(() => {
    let filtered = [...clients]

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (client) =>
          client.name.toLowerCase().includes(query) ||
          client.email.toLowerCase().includes(query) ||
          client.phone.includes(query),
      )
    }

    // Filter by client type
    if (clientType !== "all") {
      filtered = filtered.filter((client) => client.type.toLowerCase() === clientType.toLowerCase())
    }

    setFilteredClients(filtered)
  }, [searchQuery, clientType, clients])

  const handleAddClient = async () => {
    try {
      setIsSubmitting(true)

      // Validate form
      if (!newClient.name || !newClient.email || !newClient.type) {
        toast({
          title: "Validation Error",
          description: "Please fill in all required fields.",
          variant: "destructive",
        })
        return
      }

      // In a real app, this would send to the API
      // const response = await fetch('/api/clients', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(newClient)
      // })
      // const data = await response.json()

      // For now, we'll simulate adding to the local state
      const today = new Date()
      const formattedDate = `${today.toLocaleString("default", { month: "short" })} ${today.getDate()}, ${today.getFullYear()}`

      const addedClient = {
        ...newClient,
        id: `client-${Date.now()}`,
        joined: formattedDate,
        properties: newClient.properties || 0,
      } as Client

      setClients((prev) => [addedClient, ...prev])

      toast({
        title: "Success",
        description: "Client added successfully!",
      })

      // Reset form and close dialog
      setNewClient({
        name: "",
        email: "",
        phone: "",
        type: "Buyer",
        properties: 0,
        notes: "",
      })
      setIsAddDialogOpen(false)
    } catch (error) {
      console.error("Error adding client:", error)
      toast({
        title: "Error",
        description: "Failed to add client. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteClient = async (id: string | number) => {
    if (confirm("Are you sure you want to delete this client?")) {
      try {
        // In a real app, this would send to the API
        // await fetch(`/api/clients/${id}`, {
        //   method: 'DELETE'
        // })

        // For now, we'll just update the local state
        setClients((prev) => prev.filter((client) => client.id !== id))

        toast({
          title: "Success",
          description: "Client deleted successfully!",
        })
      } catch (error) {
        console.error("Error deleting client:", error)
        toast({
          title: "Error",
          description: "Failed to delete client. Please try again.",
          variant: "destructive",
        })
      }
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">Clients</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="h-9 w-fit" size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Add Client
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Client</DialogTitle>
              <DialogDescription>Fill in the details to add a new client to the system.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="name" className="text-right">
                    Full Name*
                  </Label>
                  <Input
                    id="name"
                    value={newClient.name}
                    onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="email" className="text-right">
                    Email Address*
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={newClient.email}
                    onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="phone" className="text-right">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    value={newClient.phone}
                    onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="type" className="text-right">
                    Client Type*
                  </Label>
                  <Select value={newClient.type} onValueChange={(value) => setNewClient({ ...newClient, type: value })}>
                    <SelectTrigger id="type" className="mt-1">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Buyer">Buyer</SelectItem>
                      <SelectItem value="Seller">Seller</SelectItem>
                      <SelectItem value="Agent">Agent</SelectItem>
                      <SelectItem value="Investor">Investor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="properties" className="text-right">
                    Properties
                  </Label>
                  <Input
                    id="properties"
                    type="number"
                    value={newClient.properties || ""}
                    onChange={(e) => setNewClient({ ...newClient, properties: Number(e.target.value) })}
                    className="mt-1"
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="notes" className="text-right">
                    Notes
                  </Label>
                  <Input
                    id="notes"
                    value={newClient.notes || ""}
                    onChange={(e) => setNewClient({ ...newClient, notes: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddClient} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  "Add Client"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-grow flex items-center relative">
          <Search className="absolute left-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search clients..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={clientType} onValueChange={setClientType}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Client Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="buyer">Buyer</SelectItem>
              <SelectItem value="seller">Seller</SelectItem>
              <SelectItem value="agent">Agent</SelectItem>
              <SelectItem value="investor">Investor</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : filteredClients.length === 0 ? (
        <div className="text-center py-10 border rounded-md">
          <p className="text-muted-foreground">No clients found. Try adjusting your search criteria.</p>
        </div>
      ) : (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Properties</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
                        <User className="h-4 w-4 text-gray-600" />
                      </div>
                      <div>
                        <div className="font-medium">{client.name}</div>
                        <div className="text-xs text-gray-500">Added {client.joined}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Mail className="h-3 w-3 mr-1 text-gray-400" />
                      {client.email}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Phone className="h-3 w-3 mr-1 text-gray-400" />
                      {client.phone}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-medium inline-block ${
                        client.type === "Buyer"
                          ? "bg-blue-100 text-blue-800"
                          : client.type === "Seller"
                            ? "bg-green-100 text-green-800"
                            : client.type === "Agent"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {client.type}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <FileText className="h-3 w-3 mr-1 text-gray-400" />
                      {client.properties} properties
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleDeleteClient(client.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">More</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}

// Mock data for clients
const mockClients = [
  {
    id: 1,
    name: "Ashan Perera",
    email: "ashan.perera@example.com",
    phone: "(+94) 77-123-4567",
    type: "Buyer",
    properties: 2,
    joined: "Jan 15, 2023",
    notes: "Looking for a luxury villa in Colombo 7 area.",
  },
  {
    id: 2,
    name: "Malini Fernando",
    email: "malini.f@example.com",
    phone: "(+94) 71-234-5678",
    type: "Seller",
    properties: 1,
    joined: "Feb 3, 2023",
    notes: "Selling property in Kandy due to relocation.",
  },
  {
    id: 3,
    name: "Dinesh Kumar",
    email: "dinesh.kumar@example.com",
    phone: "(+94) 76-345-6789",
    type: "Buyer",
    properties: 3,
    joined: "Mar 12, 2023",
    notes: "Interested in investment properties in Colombo.",
  },
  {
    id: 4,
    name: "Samanthi Silva",
    email: "s.silva@example.com",
    phone: "(+94) 70-456-7890",
    type: "Agent",
    properties: 8,
    joined: "Nov 5, 2022",
    notes: "Specializes in luxury properties in Colombo.",
  },
  {
    id: 5,
    name: "Rohan Mendis",
    email: "r.mendis@example.com",
    phone: "(+94) 77-567-8901",
    type: "Investor",
    properties: 5,
    joined: "Apr 22, 2023",
    notes: "Looking for commercial properties in Colombo and Kandy.",
  },
  {
    id: 6,
    name: "Priyanka Jayawardena",
    email: "priyanka.j@example.com",
    phone: "(+94) 75-678-9012",
    type: "Seller",
    properties: 2,
    joined: "May 18, 2023",
    notes: "Selling beach property in Unawatuna.",
  },
  {
    id: 7,
    name: "Nuwan Bandara",
    email: "nuwan.b@example.com",
    phone: "(+94) 78-789-0123",
    type: "Buyer",
    properties: 1,
    joined: "Jun 7, 2023",
    notes: "Looking for a family home in Kandy area.",
  },
]
