import { Pencil, Trash2 } from "lucide-react"
import type { Climb, ClimbInterface } from "@/types/climb"

// Props interface defines what data and functions this component needs
interface ClimbListProps {
  climbsPlaceholder: Climb[] 
  climbs: ClimbInterface[] // Array of climbs to display
  onClimbSelectAction: (climb: Climb) => void // Function to call when a climb is clicked
  onEditClick: (climb: Climb) => void // Function to call when edit button is clicked
  onDeleteClick: (climbId: string) => void // Function to call when delete button is clicked
}

// This component displays a list of all climbs
export function ClimbList({ climbsPlaceholder, climbs, onClimbSelectAction, onEditClick, onDeleteClick }: ClimbListProps) {
  return (
    <div className="space-y-4">
      {/* Map through each climb and create a card for it */}
      {climbs.map((climb) => (
        <div
          key={climb._id}
          className="group relative rounded-xl border border-neutral-700 bg-neutral-700 p-4 cursor-pointer hover:bg-neutral-600 transition-colors"
          onClick={() => onClimbSelectAction(climb)}
        >
          <h3 className="font-semibold text-white">{climb.name} ({climb.type})</h3>
          <p className="text-sm text-neutral-300">{climb.area}</p>
          <p className="text-sm text-neutral-300">Grade: {climb.grade}</p>
          <p className="text-sm text-neutral-300">Rating: {climb.rating} Stars</p>



          {/* Edit and Delete buttons - only show on hover */}
          <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              className="p-1 rounded-full bg-sky-500 hover:bg-sky-400 transition-colors hover:text-black"
              onClick={(e) => {
                e.stopPropagation() // Prevents triggering the parent div's onClick
                onEditClick(climb)
              }}
              title="Edit Climb"
            >
              <Pencil className="h-4 w-4" />
            </button>
            <button
              className="p-1 rounded-full bg-sky-500 hover:bg-sky-400 transition-colors hover:text-black"
              onClick={(e) => {
                e.stopPropagation() // Prevents triggering the parent div's onClick
                onDeleteClick(climb._id)
              }}
              title="Delete Climb"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

