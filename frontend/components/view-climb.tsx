import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Climb, ClimbInterface } from "@/types/climb"

// Props interface defines what this component needs
interface ViewClimbProps {
  climb: ClimbInterface // The climb to display
  onBack: () => void // Function to call when back button is clicked
}

// This component displays the details of a single climb
export function ViewClimb({ climb, onBack }: ViewClimbProps) {
  // Create an array of field labels and their corresponding values
  const fields = [
    { label: "Name:", value: climb.name },
    { label: "Type:", value: climb.type },
    { label: "Pitches:", value: climb.pitches },
    { label: "Grade:", value: climb.grade },
    { label: "Rating:", value: climb.rating + " Stars" },
    { label: "Highlight:", value: climb.highlight },
    { label: "Year:", value: climb.year },
    { label: "Notes:", value: climb.notes },
    { label: "Area:", value: climb.area },
    { label: "Crag:", value: climb.crag },
    { label: "Latitude:", value: climb.location.coordinates.lat },
    { label: "Longitude:", value: climb.location.coordinates.long },
  ]

  return (
    <div className="space-y-4">
      {/* Back button */}
      <Button onClick={onBack} className="mb-4 bg-sky-500 hover:bg-sky-400 hover:text-black rounded-lg">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to List
      </Button>

      {/* Display each field */}
      {fields.map(({ label, value }) => (
        <div key={label}>
          <h3 className="font-semibold text-neutral-300">{label}</h3>
          <p className="text-white">{value}</p>
        </div>
      ))}
    </div>
  )
}

