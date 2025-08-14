"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import { X, Home, MapPin, BedDouble, Bath, Move, DollarSign, Calendar, Star, TrendingUp, Award, Target } from "lucide-react"
import { useComparison } from "@/context/comparison-context"
import { useRouter } from "next/navigation"
import { Progress } from "@/components/ui/progress"

export default function PropertyComparison() {
  const { comparisonList, removeFromComparison, clearComparison } = useComparison()
  const router = useRouter()

  if (comparisonList.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
            <Home className="h-12 w-12 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold mb-2">No Properties to Compare</h2>
          <p className="text-muted-foreground mb-6">
            Add properties to your comparison list to see them side by side.
          </p>
          <Button onClick={() => router.push("/")} className="bg-primary hover:bg-primary/90">
            Browse Properties
          </Button>
        </div>
      </div>
    )
  }

  // Calculate scores for each property
  const getPropertyScore = (property: any) => {
    let score = 0
    // Price scoring (lower is better for buyers, normalized to 0-100)
    const maxPrice = Math.max(...comparisonList.map(p => p.price))
    const priceScore = ((maxPrice - property.price) / maxPrice) * 25

    // Size scoring (larger is better, normalized to 0-25)
    const maxSize = Math.max(...comparisonList.map(p => p.size))
    const sizeScore = (property.size / maxSize) * 25

    // Bedroom scoring (more is generally better, normalized to 0-25)
    const maxBedrooms = Math.max(...comparisonList.map(p => p.bedrooms))
    const bedroomScore = (property.bedrooms / maxBedrooms) * 25

    // Bathroom scoring (more is better, normalized to 0-25)
    const maxBathrooms = Math.max(...comparisonList.map(p => p.bathrooms))
    const bathroomScore = (property.bathrooms / maxBathrooms) * 25

    score = priceScore + sizeScore + bedroomScore + bathroomScore
    return Math.round(score)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Property Comparison</h1>
            <p className="text-muted-foreground mt-1">
              Compare {comparisonList.length} selected properties side by side
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={clearComparison}
              className="hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20"
            >
              <X className="h-4 w-4 mr-2" />
              Clear All
            </Button>
            <Button onClick={() => router.push("/")} variant="outline">
              Add More Properties
            </Button>
          </div>
        </div>

        {/* Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {comparisonList.map((property, index) => {
              const score = getPropertyScore(property)
              return (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 relative group">
                    {/* Remove Button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 backdrop-blur-sm hover:bg-destructive hover:text-destructive-foreground"
                      onClick={() => removeFromComparison(property.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>

                    {/* Property Image */}
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={property.image || "/placeholder.svg"}
                        alt={property.title}
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge 
                          variant="secondary" 
                          className={`
                            ${property.status === 'For Sale' ? 'bg-green-100 text-green-700 border-green-200' : ''}
                            ${property.status === 'For Rent' ? 'bg-blue-100 text-blue-700 border-blue-200' : ''}
                            ${property.status === 'Sold' ? 'bg-gray-100 text-gray-700 border-gray-200' : ''}
                            font-medium
                          `}
                        >
                          {property.status}
                        </Badge>
                      </div>
                      {/* Property Score Badge */}
                      <div className="absolute top-3 right-12">
                        <Badge className="bg-primary/90 text-primary-foreground font-bold">
                          <Star className="h-3 w-3 mr-1" />
                          {score}
                        </Badge>
                      </div>
                    </div>

                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg leading-tight">{property.title}</CardTitle>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                        <span className="truncate">{property.location}</span>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* Price */}
                      <div className="text-center p-3 bg-primary/5 rounded-lg">
                        <div className="text-2xl font-bold text-primary">
                          Rs. {(property.price / 1000000).toFixed(1)}M
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {property.status === 'For Rent' ? 'per month' : 'total price'}
                        </div>
                      </div>

                      {/* Property Details */}
                      <div className="grid grid-cols-3 gap-3">
                        <div className="text-center p-2 bg-muted/50 rounded-md">
                          <BedDouble className="h-4 w-4 mx-auto mb-1 text-primary" />
                          <div className="text-sm font-medium">{property.bedrooms}</div>
                          <div className="text-xs text-muted-foreground">Beds</div>
                        </div>
                        <div className="text-center p-2 bg-muted/50 rounded-md">
                          <Bath className="h-4 w-4 mx-auto mb-1 text-primary" />
                          <div className="text-sm font-medium">{property.bathrooms}</div>
                          <div className="text-xs text-muted-foreground">Baths</div>
                        </div>
                        <div className="text-center p-2 bg-muted/50 rounded-md">
                          <Move className="h-4 w-4 mx-auto mb-1 text-primary" />
                          <div className="text-sm font-medium">{property.size?.toLocaleString()}</div>
                          <div className="text-xs text-muted-foreground">sq ft</div>
                        </div>
                      </div>

                      {/* Performance Metrics */}
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Overall Score</span>
                            <span className="font-medium">{score}/100</span>
                          </div>
                          <Progress value={score} className="h-2" />
                        </div>
                        
                        <div className="text-xs text-muted-foreground">
                          <div className="flex justify-between">
                            <span>Price/sq ft:</span>
                            <span>Rs. {Math.round(property.price / property.size).toLocaleString()}</span>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 pt-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => router.push(`/properties/${property.id}`)}
                        >
                          View Details
                        </Button>
                        <Button 
                          size="sm" 
                          className="flex-1"
                          onClick={() => {
                            // Handle contact or inquiry action
                            alert(`Interested in ${property.title}`)
                          }}
                        >
                          Contact
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {/* Comparison Summary */}
        {comparisonList.length > 1 && (
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2 text-primary" />
                  Comparison Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground mb-1">Highest Rated</div>
                    <div className="font-semibold text-primary">
                      {comparisonList.reduce((best, current) => 
                        getPropertyScore(current) > getPropertyScore(best) ? current : best
                      ).title}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Score: {Math.max(...comparisonList.map(getPropertyScore))}/100
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground mb-1">Most Affordable</div>
                    <div className="font-semibold text-primary">
                      {comparisonList.reduce((cheapest, current) => 
                        current.price < cheapest.price ? current : cheapest
                      ).title}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Rs. {(Math.min(...comparisonList.map(p => p.price)) / 1000000).toFixed(1)}M
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground mb-1">Largest Space</div>
                    <div className="font-semibold text-primary">
                      {comparisonList.reduce((largest, current) => 
                        current.size > largest.size ? current : largest
                      ).title}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {Math.max(...comparisonList.map(p => p.size)).toLocaleString()} sq ft
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
