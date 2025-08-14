"use client"

import React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { 
  MapPin, 
  BedDouble, 
  Bath, 
  Move, 
  Heart, 
  Share2, 
  Eye,
  CheckCircle,
  Star
} from "lucide-react"
import Image from "next/image"

interface Property {
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
}

interface PropertyCardProps {
  property: Property
  onView?: (property: Property) => void
  onEdit?: (property: Property) => void
  onDelete?: (property: Property) => void
  onToggleCompare?: (property: Property) => void
  isInComparison?: boolean
  className?: string
}

export default function PropertyCard({
  property,
  onView,
  onEdit,
  onDelete,
  onToggleCompare,
  isInComparison = false,
  className
}: PropertyCardProps) {
  const [isFavorited, setIsFavorited] = React.useState(false)
  const [imageLoaded, setImageLoaded] = React.useState(false)

  const formatPrice = (price: number) => {
    if (price >= 100000000) {
      return `Rs. ${(price / 100000000).toFixed(1)}Cr`
    } else if (price >= 1000000) {
      return `Rs. ${(price / 1000000).toFixed(1)}M`
    } else if (price >= 100000) {
      return `Rs. ${(price / 100000).toFixed(1)}L`
    } else {
      return `Rs. ${price.toLocaleString()}`
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'for sale':
        return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-300 dark:border-green-800'
      case 'sold':
        return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-300 dark:border-red-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-300 dark:border-yellow-800'
      case 'for rent':
        return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-800'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-800'
    }
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className={cn("group", className)}
    >
      <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-background to-muted/30">
        {/* Image Section */}
        <div className="relative h-48 bg-muted overflow-hidden">
          <Image
            src={property.image || "/placeholder.svg"}
            alt={property.title}
            fill
            className={cn(
              "object-cover transition-all duration-500 group-hover:scale-110",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Status Badge */}
          <Badge className={cn("absolute top-3 left-3 font-medium", getStatusColor(property.status))}>
            {property.status}
          </Badge>

          {/* Action Buttons */}
          <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              size="icon"
              variant="secondary"
              className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
              onClick={() => setIsFavorited(!isFavorited)}
            >
              <Heart className={cn("h-4 w-4", isFavorited ? "fill-red-500 text-red-500" : "text-muted-foreground")} />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
            >
              <Share2 className="h-4 w-4 text-muted-foreground" />
            </Button>
          </div>

          {/* Compare Checkbox */}
          {onToggleCompare && (
            <div className="absolute bottom-3 left-3">
              <Button
                size="sm"
                variant={isInComparison ? "default" : "secondary"}
                className={cn(
                  "rounded-full text-xs font-medium transition-all duration-200",
                  isInComparison 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-background/80 backdrop-blur-sm hover:bg-background"
                )}
                onClick={() => onToggleCompare(property)}
              >
                {isInComparison ? (
                  <>
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Added
                  </>
                ) : (
                  "Compare"
                )}
              </Button>
            </div>
          )}

          {/* Price Tag */}
          <div className="absolute bottom-3 right-3 bg-background/95 backdrop-blur-sm rounded-lg px-3 py-1.5 border">
            <div className="text-lg font-bold text-primary">{formatPrice(property.price)}</div>
          </div>
        </div>

        <CardContent className="p-4">
          {/* Title and Location */}
          <div className="space-y-2">
            <h3 className="font-semibold text-lg text-foreground leading-tight line-clamp-2 group-hover:text-primary transition-colors">
              {property.title}
            </h3>
            <div className="flex items-center text-muted-foreground text-sm">
              <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
              <span className="line-clamp-1">{property.location}</span>
            </div>
          </div>

          {/* Property Details */}
          <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <BedDouble className="h-4 w-4 mr-1" />
                <span>{property.bedrooms}</span>
              </div>
              <div className="flex items-center">
                <Bath className="h-4 w-4 mr-1" />
                <span>{property.bathrooms}</span>
              </div>
              <div className="flex items-center">
                <Move className="h-4 w-4 mr-1" />
                <span>{property.size.toLocaleString()} sqft</span>
              </div>
            </div>
            <div className="flex items-center text-yellow-500">
              <Star className="h-4 w-4 fill-current mr-1" />
              <span className="text-sm font-medium">4.8</span>
            </div>
          </div>

          {/* Description */}
          {property.description && (
            <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
              {property.description}
            </p>
          )}
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <div className="flex space-x-2 w-full">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1 hover:bg-primary/5 hover:border-primary/40 transition-all duration-200"
              onClick={() => onView?.(property)}
            >
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </Button>
            {onEdit && (
              <Button 
                variant="default" 
                size="sm" 
                className="flex-1"
                onClick={() => onEdit(property)}
              >
                Edit
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
