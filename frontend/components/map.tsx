import dynamic from "next/dynamic"
import "@/app/arcgis.css"

// Dynamically import the MapClient component to prevent SSR issues with ArcGIS
const MapClient = dynamic(() => import("./map-client").then((mod) => mod.MapClient), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <p>Loading map...</p>
    </div>
  ),
})

interface MapProps {
  onLocationSelectAction: (latitude: number, longitude: number) => void
  isAddingClimb: boolean
  isEditingClimb: boolean
  climbsPlaceholder: any[]
  climbs: any[]
  selectedLocation: { latitude: number; longitude: number } | null
}

export function Map({ onLocationSelectAction, isAddingClimb, isEditingClimb, climbsPlaceholder, climbs, selectedLocation }: MapProps) {
  return (
    <MapClient
      onLocationSelectAction={onLocationSelectAction}
      isAddingClimb={isAddingClimb}
      isEditingClimb={isEditingClimb}
      climbs={climbs}
      selectedLocation={selectedLocation}
    />
  )
}

