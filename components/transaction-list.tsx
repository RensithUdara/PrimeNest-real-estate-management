"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Plus, FileText, CheckCircle, XCircle, Clock, AlertCircle, Loader2 } from "lucide-react"
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

interface Transaction {
  id: string
  property: string
  type: string
  client: string
  date: string
  amount: number
  status: string
  notes?: string
}

export default function TransactionList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState("all")
  const [newTransaction, setNewTransaction] = useState<Partial<Transaction>>({
    property: "",
    type: "Sale",
    client: "",
    amount: 0,
    status: "Pending",
    notes: "",
  })
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Fetch transactions from API
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true)
        // In a real app, this would fetch from the API
        // const response = await fetch('/api/transactions')
        // const data = await response.json()

        // For now, we'll use the mock data
        const data = mockTransactions
        setTransactions(data)
        setFilteredTransactions(data)
      } catch (error) {
        console.error("Error fetching transactions:", error)
        toast({
          title: "Error",
          description: "Failed to load transactions. Please try again later.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchTransactions()
  }, [])

  // Filter transactions based on search query and status
  useEffect(() => {
    let filtered = [...transactions]

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (transaction) =>
          transaction.property.toLowerCase().includes(query) ||
          transaction.client.toLowerCase().includes(query) ||
          transaction.id.toLowerCase().includes(query),
      )
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((transaction) => transaction.status.toLowerCase() === statusFilter.toLowerCase())
    }

    setFilteredTransactions(filtered)
  }, [searchQuery, statusFilter, transactions])

  // Calculate total values
  const totalValue = filteredTransactions.reduce((sum, t) => sum + t.amount, 0)
  const completedValue = filteredTransactions
    .filter((t) => t.status === "Completed")
    .reduce((sum, t) => sum + t.amount, 0)
  const pendingValue = filteredTransactions.filter((t) => t.status === "Pending").reduce((sum, t) => sum + t.amount, 0)

  const handleAddTransaction = async () => {
    try {
      setIsSubmitting(true)

      // Validate form
      if (!newTransaction.property || !newTransaction.client || !newTransaction.amount) {
        toast({
          title: "Validation Error",
          description: "Please fill in all required fields.",
          variant: "destructive",
        })
        return
      }

      // In a real app, this would send to the API
      // const response = await fetch('/api/transactions', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(newTransaction)
      // })
      // const data = await response.json()

      // For now, we'll simulate adding to the local state
      const today = new Date()
      const formattedDate = `${today.toLocaleString("default", { month: "short" })} ${today.getDate()}, ${today.getFullYear()}`

      const transactionId = `TRX-${Math.floor(10000 + Math.random() * 90000)}`

      const addedTransaction = {
        ...newTransaction,
        id: transactionId,
        date: formattedDate,
      } as Transaction

      setTransactions((prev) => [addedTransaction, ...prev])

      toast({
        title: "Success",
        description: "Transaction added successfully!",
      })

      // Reset form and close dialog
      setNewTransaction({
        property: "",
        type: "Sale",
        client: "",
        amount: 0,
        status: "Pending",
        notes: "",
      })
      setIsAddDialogOpen(false)
    } catch (error) {
      console.error("Error adding transaction:", error)
      toast({
        title: "Error",
        description: "Failed to add transaction. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">Transactions</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="h-9 w-fit" size="sm">
              <Plus className="h-4 w-4 mr-1" />
              New Transaction
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Transaction</DialogTitle>
              <DialogDescription>Fill in the details to add a new transaction to the system.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="property" className="text-right">
                    Property*
                  </Label>
                  <Input
                    id="property"
                    value={newTransaction.property}
                    onChange={(e) => setNewTransaction({ ...newTransaction, property: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="client" className="text-right">
                    Client*
                  </Label>
                  <Input
                    id="client"
                    value={newTransaction.client}
                    onChange={(e) => setNewTransaction({ ...newTransaction, client: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="type" className="text-right">
                    Transaction Type
                  </Label>
                  <Select
                    value={newTransaction.type}
                    onValueChange={(value) => setNewTransaction({ ...newTransaction, type: value })}
                  >
                    <SelectTrigger id="type" className="mt-1">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Sale">Sale</SelectItem>
                      <SelectItem value="Rental">Rental</SelectItem>
                      <SelectItem value="Lease">Lease</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="amount" className="text-right">
                    Amount (Rs.)*
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    value={newTransaction.amount || ""}
                    onChange={(e) => setNewTransaction({ ...newTransaction, amount: Number(e.target.value) })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="status" className="text-right">
                    Status
                  </Label>
                  <Select
                    value={newTransaction.status}
                    onValueChange={(value) => setNewTransaction({ ...newTransaction, status: value })}
                  >
                    <SelectTrigger id="status" className="mt-1">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Canceled">Canceled</SelectItem>
                      <SelectItem value="Failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2">
                  <Label htmlFor="notes" className="text-right">
                    Notes
                  </Label>
                  <Input
                    id="notes"
                    value={newTransaction.notes || ""}
                    onChange={(e) => setNewTransaction({ ...newTransaction, notes: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddTransaction} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  "Add Transaction"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rs. {totalValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">From {filteredTransactions.length} transactions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rs. {completedValue.toLocaleString()}</div>
            <p className="text-xs text-green-600 mt-1">
              {totalValue ? Math.round((completedValue / totalValue) * 100) : 0}% of total value
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rs. {pendingValue.toLocaleString()}</div>
            <p className="text-xs text-amber-600 mt-1">
              {totalValue ? Math.round((pendingValue / totalValue) * 100) : 0}% of total value
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-grow flex items-center relative">
          <Search className="absolute left-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search transactions..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="canceled">Canceled</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : filteredTransactions.length === 0 ? (
        <div className="text-center py-10 border rounded-md">
          <p className="text-muted-foreground">No transactions found. Try adjusting your search criteria.</p>
        </div>
      ) : (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Property</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-mono text-xs">{transaction.id}</TableCell>
                  <TableCell>
                    <div className="font-medium">{transaction.property}</div>
                    <div className="text-xs text-gray-500">{transaction.type}</div>
                  </TableCell>
                  <TableCell>{transaction.client}</TableCell>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell className="font-medium">Rs. {transaction.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {transaction.status === "Completed" ? (
                        <>
                          <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                          <span className="text-green-700">Completed</span>
                        </>
                      ) : transaction.status === "Pending" ? (
                        <>
                          <Clock className="h-4 w-4 mr-1 text-amber-500" />
                          <span className="text-amber-700">Pending</span>
                        </>
                      ) : transaction.status === "Canceled" ? (
                        <>
                          <XCircle className="h-4 w-4 mr-1 text-gray-500" />
                          <span className="text-gray-700">Canceled</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="h-4 w-4 mr-1 text-red-500" />
                          <span className="text-red-700">Failed</span>
                        </>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <FileText className="h-4 w-4 mr-1" />
                      Details
                    </Button>
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

// Mock data for transactions
const mockTransactions = [
  {
    id: "TRX-78901",
    property: "Luxury Villa in Colombo 7",
    type: "Sale",
    client: "Ashan Perera",
    date: "May 15, 2023",
    amount: 125000000,
    status: "Completed",
    notes: "Full payment received. Transfer of ownership completed.",
  },
  {
    id: "TRX-78902",
    property: "Apartment in Wellawatte",
    type: "Rental",
    client: "Dinesh Kumar",
    date: "May 18, 2023",
    amount: 1800000,
    status: "Completed",
    notes: "12-month lease agreement signed. Security deposit received.",
  },
  {
    id: "TRX-78903",
    property: "Family Home in Kandy",
    type: "Sale",
    client: "Malini Fernando",
    date: "May 22, 2023",
    amount: 62500000,
    status: "Pending",
    notes: "Waiting for bank approval of mortgage.",
  },
  {
    id: "TRX-78904",
    property: "Beach Villa in Unawatuna",
    type: "Sale",
    client: "Rohan Mendis",
    date: "May 25, 2023",
    amount: 89000000,
    status: "Pending",
    notes: "Offer accepted. Waiting for documentation.",
  },
  {
    id: "TRX-78905",
    property: "Mountain View Bungalow",
    type: "Sale",
    client: "Priyanka Jayawardena",
    date: "May 28, 2023",
    amount: 75000000,
    status: "Canceled",
    notes: "Client withdrew offer due to financing issues.",
  },
  {
    id: "TRX-78906",
    property: "Luxury Penthouse in Colombo",
    type: "Sale",
    client: "Nuwan Bandara",
    date: "June 1, 2023",
    amount: 180000000,
    status: "Failed",
    notes: "Transaction failed due to legal issues with property title.",
  },
]
