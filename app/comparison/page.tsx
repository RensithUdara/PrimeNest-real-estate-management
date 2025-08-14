import PropertyComparison from "@/components/property-comparison"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Compare Properties | PrimeNest Real Estate",
  description: "Compare multiple properties side by side to find your perfect match",
}

export default function ComparisonPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <PropertyComparison />
    </main>
  )
}
