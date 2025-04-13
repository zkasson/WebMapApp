"use client"

import { useState, useCallback } from "react"
import { Map } from "@/components/map"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import type { Climb, ClimbUpdatedFormData, ClimbInterface } from "@/types/climb"
import { useClimbs } from "@/components/api/climbDatabaseApi"

export default function Home() {
  // Authentication state - Holds the state of the sign in.
  const [isAuthenticated, setIsAuthenticated] = useState(false)       //Tracks whether user is signed in. Used later to conditionally render map or instructions

  // Application state
  const [isAddingClimb, setIsAddingClimb] = useState(false)          //Determines if user is editing a climb. Used later to conditionally render add climb mode 
  const [isEditingClimb, setIsEditingClimb] = useState(false)          //Determines if user is editing a climb
  const [selectedLocation, setSelectedLocation] = useState<{ latitude: number; longitude: number } | null>(null)          //stores last clicked location
  const [selectedClimb, setSelectedClimb] = useState<Climb | null>(null)          //
  const [mapCenter, setMapCenter] = useState<{ latitude: number; longitude: number } | null>(null)          //Determines where map should be centered. used in map to ... 


  //DATA from DB
  const { climbs, addClimb, fetchClimbs,deleteClimb,updateClimb } = useClimbs();
  //Use for filter but leave for now
  // const [globalClimbData, setGlobalClimbData] = useState<ClimbInterface[]>(climbs) 
  // console.log("climbs: " + climbs)


 

  // Sample data - replace with actual database in production
  const [climbsPlaceholder, setClimbs] = useState<Climb[]>([
    {
      id: 1,
      name: "Climb 1",
      area: "Area 1",
      type: "Sport",
      pitches: "2",
      grade: "5.10a",
      rating: "3 stars",
      highlight: "Beautiful views",
      year: "2022",
      notes: "Great for beginners",
      crag: "Crag 1",
      latitude: 37.7749,
      longitude: -122.4194,
    },
    {
      id: 2,
      name: "Climb 2",
      area: "Area 2",
      type: "Trad",
      pitches: "3",
      grade: "5.11b",
      rating: "4 stars",
      highlight: "Challenging crack",
      year: "2021",
      notes: "Bring extra cams",
      crag: "Crag 2",
      latitude: 37.8716,
      longitude: -119.5646,
    },
  ])

  // Authentication handler 

  const handleAuthChange = useCallback((isAuth: boolean) => {          //used in header to set whether user is signed in
    setIsAuthenticated(isAuth)
  }, [])

  // Sidebar Event Handlers
  const handleStartAddingClimb = () => {             //used when"addclimb" button is clicked in sidebar. setIsAddingClimb(true) will conditionally render form
    setIsAddingClimb(true)
    setIsEditingClimb(false)
    setSelectedClimb(null)
    setSelectedLocation(null)
  };

  const handleAddClimb = async (climbData: ClimbFormData) => {            //Adds a climb, updates state, and resets selection when user submits a new climb.
    // setClimbs([...climbsPlaceholder, climbData]) maybe use later but for now need to add to my db
    console.log("Form submitted:", climbData);
    try {
      await addClimb(climbData);
      await fetchClimbs(); // refresh climb list when submitting
    } catch (err) {
      console.error(err);
    };

    setIsAddingClimb(false)
    setSelectedLocation(null)
  };

  const handleClimbSelect = (climb: ClimbInterface | null) => {          //When a climb is selected, updates selectedClimb state & centers the map to that climb
    setSelectedClimb(climb)
    if (climb) {
      setMapCenter({ latitude: climb.location.coordinates.lat, longitude: climb.location.coordinates.long })
    }
  }

  const handleCancelAddClimb = () => {                //Resets everything when canceling in middle of adding climb. Returns to list.
    setIsAddingClimb(false)
    setIsEditingClimb(false)
    setSelectedLocation(null)
    setSelectedClimb(null)
  }

  const handleDeleteClimb = async (climbId: string) => {                 //Delete climb when trash can icon is clicked. Uses ID to delete 
    if (!climbId){
      console.error("Invalid Climb ID")
    }

    if (window.confirm("Are you sure you want to delete this climb?")){
      try{
        await deleteClimb(climbId);
      } catch(error){
        console.error("Failed to delete climb:", error)
        alert("Failed to delete climb. Please try again.")
      }
    }
  }

  const handleEditClimb = async (climbData: ClimbUpdatedFormData, climbId: string) => {                //When editing a climb and user submits. Uses ID to edit that climb. This is the Action of editing climb
    try {
      console.log("Updated climb with ID", climbId, "with:", climbData)
      await updateClimb(climbData,climbId);
      await fetchClimbs(); // refresh climb list when submitting
    } catch (err) {
      console.error(err);
    };

    setIsEditingClimb(false)
    setSelectedLocation(null)
  }

  const handleStartEditingClimb = (climb: ClimbUpdatedFormData) => {                          //Use to conditionally render pre filled form for edited climb. 
    setIsEditingClimb((prev) => !prev)
    setIsAddingClimb(false)
    setSelectedClimb(climb)
    console.log("Starting Edit! Climb ID:",climb._id)
  }

  // Map Event Handlers

  const handleLocationSelect = (latitude: number, longitude: number) => {                      //Use to hold location of map click
    setSelectedLocation({ latitude, longitude })
    setMapCenter({ latitude, longitude })
  }

  const handleSearch = (location: { latitude: number; longitude: number }) => {                //Used to center the map when a search is performed
    setMapCenter(location)
  }

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden bg-stone-950 p-2 space-y-2">
      <Header onAuthChangeAction={handleAuthChange} />
      <div className="flex flex-1 overflow-hidden space-x-2">
        <div className="rounded-xl shadow-sm overflow-hidden bg-neutral-800">
          <Sidebar
            isAddingClimb={isAddingClimb}
            isEditingClimb={isEditingClimb}
            onStartAddingClimbAction={handleStartAddingClimb}
            onAddClimbAction={handleAddClimb}
            onSearchAction={handleSearch}
            selectedLocation={selectedLocation}
            climbsPlaceholder={climbsPlaceholder}
            climbs={climbs}
            onClimbSelectAction={handleClimbSelect}
            onCancelActionAddClimbAction={handleCancelAddClimb}
            onDeleteClimbAction={handleDeleteClimb}
            onEditClimbAction={handleEditClimb}
            onStartEditingClimbAction={handleStartEditingClimb}
            isAuthenticated={isAuthenticated}
          />
        </div>
        <div className="relative flex-1 rounded-xl overflow-hidden shadow-sm">

          <Map
            onLocationSelectAction={handleLocationSelect}
            isAddingClimb={isAddingClimb && isAuthenticated}                 //Ensure authentication to add and edit climbs
            isEditingClimb={isEditingClimb && isAuthenticated}                    
            climbs={isAuthenticated ? climbs:[]}                             //Pass an empty array if the user is not authenticated
            selectedLocation={mapCenter}
          />
          {!isAuthenticated && <div className="absolute inset-0 bg-black bg-opacity-70 pointer-events-none" />}   {/*darken the map if user is not authenticated*/}
        </div>
      </div>
    </div>
  )
}

