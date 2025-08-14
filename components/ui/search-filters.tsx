"use client"

import React from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { 
  Search, 
  Filter, 
  X, 
  MapPin, 
  Home, 
  Building, 
  TreePine,
  Briefcase,
  SlidersHorizontal
} from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface SearchFiltersProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  propertyType: string
  onPropertyTypeChange: (type: string) => void
  priceRange: number[]
  onPriceRangeChange: (range: number[]) => void
  location: string
  onLocationChange: (location: string) => void
  bedrooms: string
  onBedroomsChange: (bedrooms: string) => void
  bathrooms: string
  onBathroomsChange: (bathrooms: string) => void
  status: string
  onStatusChange: (status: string) => void
  onClearFilters: () => void
  activeFiltersCount: number
}

export default function SearchFilters({
  searchQuery,
  onSearchChange,
  propertyType,
  onPropertyTypeChange,
  priceRange,
  onPriceRangeChange,
  location,
  onLocationChange,
  bedrooms,
  onBedroomsChange,
  bathrooms,
  onBathroomsChange,
  status,
  onStatusChange,
  onClearFilters,
  activeFiltersCount
}: SearchFiltersProps) {
  const [isFilterOpen, setIsFilterOpen] = React.useState(false)

  const formatPrice = (value: number) => {
    if (value >= 100000000) {
      return `₹${(value / 100000000).toFixed(1)}Cr`
    } else if (value >= 1000000) {
      return `₹${(value / 1000000).toFixed(1)}M`
    } else if (value >= 100000) {
      return `₹${(value / 100000).toFixed(1)}L`
    } else {
      return `₹${value.toLocaleString()}`
    }
  }

  const propertyTypes = [
    { value: "all", label: "All Types", icon: Home },
    { value: "house", label: "Houses", icon: Home },
    { value: "apartment", label: "Apartments", icon: Building },
    { value: "villa", label: "Villas", icon: TreePine },
    { value: "commercial", label: "Commercial", icon: Briefcase },
  ]

  return (
    <Card className="p-6 bg-gradient-to-r from-background to-muted/20 border-border/50">
      <div className="space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search properties by title, location, or description..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 pr-4 h-12 text-base bg-background/80 backdrop-blur-sm border-border/50 focus:border-primary/50 transition-all duration-200"
          />
        </div>

        {/* Quick Property Type Filters */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-foreground">Property Type</Label>
          <div className="flex flex-wrap gap-2">
            {propertyTypes.map((type) => {
              const Icon = type.icon
              const isActive = propertyType === type.value
              return (
                <motion.div
                  key={type.value}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant={isActive ? "default" : "outline"}
                    size="sm"
                    onClick={() => onPropertyTypeChange(type.value)}
                    className={`
                      transition-all duration-200 rounded-full
                      ${isActive 
                        ? "bg-primary text-primary-foreground shadow-lg" 
                        : "bg-background/80 hover:bg-primary/5 hover:border-primary/30"
                      }
                    `}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {type.label}
                  </Button>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Advanced Filters */}
        <div className="flex flex-wrap gap-3 items-center">
          <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                size="sm"
                className="bg-background/80 hover:bg-primary/5 hover:border-primary/30 transition-all duration-200"
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Advanced Filters
                {activeFiltersCount > 0 && (
                  <Badge variant="secondary" className="ml-2 bg-primary text-primary-foreground">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-6" align="start">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Advanced Filters</h4>
                  {activeFiltersCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={onClearFilters}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Clear All
                    </Button>
                  )}
                </div>

                {/* Price Range */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Price Range</Label>
                  <div className="px-2">
                    <Slider
                      value={priceRange}
                      onValueChange={onPriceRangeChange}
                      max={500000000}
                      min={1000000}
                      step={1000000}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                      <span>{formatPrice(priceRange[0])}</span>
                      <span>{formatPrice(priceRange[1])}</span>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Location</Label>
                  <Select value={location} onValueChange={onLocationChange}>
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      <SelectItem value="colombo">Colombo</SelectItem>
                      <SelectItem value="gampaha">Gampaha</SelectItem>
                      <SelectItem value="kalutara">Kalutara</SelectItem>
                      <SelectItem value="kandy">Kandy</SelectItem>
                      <SelectItem value="galle">Galle</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Bedrooms */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Bedrooms</Label>
                  <Select value={bedrooms} onValueChange={onBedroomsChange}>
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any</SelectItem>
                      <SelectItem value="1">1+</SelectItem>
                      <SelectItem value="2">2+</SelectItem>
                      <SelectItem value="3">3+</SelectItem>
                      <SelectItem value="4">4+</SelectItem>
                      <SelectItem value="5">5+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Bathrooms */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Bathrooms</Label>
                  <Select value={bathrooms} onValueChange={onBathroomsChange}>
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any</SelectItem>
                      <SelectItem value="1">1+</SelectItem>
                      <SelectItem value="2">2+</SelectItem>
                      <SelectItem value="3">3+</SelectItem>
                      <SelectItem value="4">4+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Status */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Status</Label>
                  <Select value={status} onValueChange={onStatusChange}>
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="All Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="for-sale">For Sale</SelectItem>
                      <SelectItem value="for-rent">For Rent</SelectItem>
                      <SelectItem value="sold">Sold</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* Active Filters Display */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap gap-2">
              {propertyType !== "all" && (
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                  {propertyTypes.find(t => t.value === propertyType)?.label}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 ml-1 hover:bg-transparent"
                    onClick={() => onPropertyTypeChange("all")}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              {location !== "all" && (
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                  <MapPin className="h-3 w-3 mr-1" />
                  {location}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 ml-1 hover:bg-transparent"
                    onClick={() => onLocationChange("all")}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
