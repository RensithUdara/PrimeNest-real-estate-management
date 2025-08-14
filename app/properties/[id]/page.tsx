import PropertyDetail from "@/components/property-detail"
import type { Metadata } from "next"

interface PropertyPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: PropertyPageProps): Promise<Metadata> {
  // In a real app, fetch the property data from API
  // For now, we'll use a placeholder title
  return {
    title: `Property Details | PrimeNest Real Estate`,
    description: "View detailed information about this property",
  }
}

export default function PropertyPage({ params }: PropertyPageProps) {
  const { id } = params

  return (
    <main className="min-h-screen flex flex-col">
      <PropertyDetail id={id} />
    </main>
  )
}
