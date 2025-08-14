"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { toast } from "@/components/ui/use-toast"

// Define the property type for our context
export interface ComparisonProperty {
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
  yearBuilt?: number
  propertyType?: string
}

interface ComparisonContextType {
  comparisonList: ComparisonProperty[]
  addToComparison: (property: ComparisonProperty) => void
  removeFromComparison: (propertyId: string | number) => void
  clearComparison: () => void
  isInComparison: (propertyId: string | number) => boolean
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined)

export function ComparisonProvider({ children }: { children: ReactNode }) {
  const [comparisonList, setComparisonList] = useState<ComparisonProperty[]>([])

  // Load comparison list from localStorage on initial render
  useEffect(() => {
    const savedComparison = localStorage.getItem("propertyComparison")
    if (savedComparison) {
      try {
        setComparisonList(JSON.parse(savedComparison))
      } catch (error) {
        console.error("Failed to parse saved comparison:", error)
        localStorage.removeItem("propertyComparison")
      }
    }
  }, [])

  // Save comparison list to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("propertyComparison", JSON.stringify(comparisonList))
  }, [comparisonList])

  const addToComparison = (property: ComparisonProperty) => {
    if (comparisonList.length >= 4) {
      toast({
        title: "Comparison limit reached",
        description: "You can compare up to 4 properties at once. Please remove a property before adding another.",
        variant: "destructive",
      })
      return
    }

    if (isInComparison(property.id)) {
      toast({
        title: "Already in comparison",
        description: "This property is already in your comparison list.",
      })
      return
    }

    setComparisonList((prev) => [...prev, property])
    toast({
      title: "Added to comparison",
      description: `"${property.title}" has been added to your comparison list.`,
    })
  }

  const removeFromComparison = (propertyId: string | number) => {
    setComparisonList((prev) => prev.filter((p) => p.id !== propertyId))
    toast({
      title: "Removed from comparison",
      description: "Property has been removed from your comparison list.",
    })
  }

  const clearComparison = () => {
    setComparisonList([])
    toast({
      title: "Comparison cleared",
      description: "All properties have been removed from your comparison list.",
    })
  }

  const isInComparison = (propertyId: string | number) => {
    return comparisonList.some((p) => p.id === propertyId)
  }

  return (
    <ComparisonContext.Provider
      value={{
        comparisonList,
        addToComparison,
        removeFromComparison,
        clearComparison,
        isInComparison,
      }}
    >
      {children}
    </ComparisonContext.Provider>
  )
}

export function useComparison() {
  const context = useContext(ComparisonContext)
  if (context === undefined) {
    throw new Error("useComparison must be used within a ComparisonProvider")
  }
  return context
}
