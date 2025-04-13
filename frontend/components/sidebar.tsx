"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { ClimbList } from "./climb-list"
import { ClimbForm } from "./climb-form"
import { ViewClimb } from "./view-climb"
import type { Climb, ClimbInterface, LocationInterface, Location } from "@/types/climb"

interface SidebarProps {
  isAddingClimb: boolean
  isEditingClimb: boolean
  onStartAddingClimbAction: () => void
  onAddClimbAction: (climbData: Climb) => void
  onSearchAction: (location: Location) => void
  selectedLocation: Location | null
  climbsPlaceholder: Climb[]
  climbs: ClimbInterface[]
  onClimbSelectAction: (climb: Climb |null) => void 
  onCancelActionAddClimbAction: () => void
  onDeleteClimbAction: (climbId: number) => void
  onEditClimbAction: (climbData: ClimbUpdatedFormData) => void
  onStartEditingClimbAction: (climbData: ClimbUpdatedFormData) => void
  isAuthenticated: boolean
}

export function Sidebar({
  isAddingClimb,
  isEditingClimb,
  onStartAddingClimbAction,
  onAddClimbAction,
  onSearchAction,
  selectedLocation,
  climbsPlaceholder,
  climbs,
  onClimbSelectAction,
  onCancelActionAddClimbAction,
  onDeleteClimbAction,
  onEditClimbAction,
  onStartEditingClimbAction,
  isAuthenticated,
}: SidebarProps) {

  // Track the currently selected climb
  const [selectedClimb, setSelectedClimb] = useState<Climb | null>(null)            // If selectedClimb has data in it,it will show the data for that climb in the sidebar. Either as an edit or view


  // // // Click Handlers // // //

  // Handle climb selection, called when a user selects a climb selectedClimb 
  const handleClimbClick = (climb: Climb) => {
    setSelectedClimb(climb)
    onClimbSelectAction(climb)
    onSearchAction({ latitude: climb.latitude, longitude: climb.longitude }) //Notifies the sidebar component that the lat long from the map have been changed
    console.log(climb)
  }

  // Handle back button click from view climbs. If clicked it returns to climb list
  const handleBackClick = () => {
    setSelectedClimb(null)
    onClimbSelectAction(null)
    onCancelActionAddClimbAction()
  }

  // Handle edit button click, will set the state of selectedClimb to the climb being edited
  const handleEditClick = (climb: Climb) => {
    setSelectedClimb(climb)
    onStartEditingClimbAction(climb)
    setSelectedClimb(climb)
  }

  // Determine the current view's title
  const getTitle = () => {
    if (!isAuthenticated) return "Welcome"
    if (isAddingClimb) return "Add Climb"
    if (isEditingClimb) return "Edit Climb"
    if (selectedClimb) return "Climb Details"
    return "Ticklist"
  }

  // Welcome message component for unauthenticated users
  const WelcomeMessage = () => (
    <div className="p-4 text-center">
      <h2 className="text-2xl font-bold mb-4">Welcome! Please sign in.</h2>
      <p className="text-lg mb-6">Please sign in to explore Zack's climbing ticklist and the function of the mapping application.</p>
      <br></br>
      <div className="bg-neutral-700 p-4 rounded-lg text-left">
        <p className="mb-2">
          <strong>Demo Account:</strong>
        </p>
        <p>Username: User1</p>
        <p>Password: Password</p>
      </div>
      <br></br>
      <br></br>
      <p className="text-lg mb-6">Zack built this web mapping application to show his proficiency in React and familiarity with the ArcGIS Javascript SDK</p>
    </div>
  
  )
  

  return (
    <div className="flex flex-col h-full w-80 bg-neutral-800 text-white rounded-xl">
      {/* Sidebar Header */}
      <div className="border-b border-neutral-700 p-4">
        <h1 className="text-2xl font-bold text-white">{getTitle()}</h1>
        {isAuthenticated && !isAddingClimb && !selectedClimb && !isEditingClimb && (
          <p className="text-sm text-neutral-400">Your climbing ticklist</p>
        )}
      </div>

      {/* Scroll Area Content */}
      <ScrollArea className="flex-1">
        {!isAuthenticated ? (
          <WelcomeMessage />
        ) : (
          <div className="p-4">
            {isAddingClimb || isEditingClimb ? (
              <ClimbForm
                onSubmit={isEditingClimb ? onEditClimbAction : onAddClimbAction}
                onCancelAction={handleBackClick}
                onSearchAction={onSearchAction}
                selectedLocation={selectedLocation}
                initialData={selectedClimb}
                isEditing={isEditingClimb}
              />
            ) : selectedClimb ? (
              <ViewClimb climb={selectedClimb} onBack={handleBackClick} />
            ) : (                                                                         // Default is showing the list of climbs
              <ClimbList
                climbsPlaceholder={climbsPlaceholder}
                climbs={climbs}
                onClimbSelectAction={handleClimbClick}
                onEditClick={handleEditClick}
                onDeleteClick={onDeleteClimbAction}
              />
            )}
          </div>
        )}
      </ScrollArea>

      {/* Footer */}
      {isAuthenticated && !isAddingClimb && !selectedClimb && !isEditingClimb && (
        <div className="p-4 border-t border-neutral-700">
          <Button
            className="w-full py-6 text-lg bg-sky-500 hover:bg-sky-400 text-white hover:text-black rounded-lg"
            onClick={onStartAddingClimbAction}
          >
            <Plus className="mr-2 h-5 w-5" /> Add Climb
          </Button>
        </div>
      )}
    </div>
  )
}

