"use client"
import React from 'react'
import { useClimbs } from '../api/climb-context'
import { FaTrash } from 'react-icons/fa'; 
import { Trash2 } from "lucide-react";


interface MapListComponentProps {
  onClimbSelect: (climb: any) => void; // Adjust type based on Climb type
  onAddClimbButton: (state: boolean) => void; // Ensure it's correctly typed
}


function MapListComponent({ onClimbSelect, onAddClimbButton }: MapListComponentProps) {
  const { climbs, deleteClimb} = useClimbs();

  const handleDelete = async (id: string) => {
    if (!id) {
      console.error("Invalid Climb ID");
      return;
    }

    if (window.confirm("Are you sure you want to delete this climb?")) {
      try {
        // The actual API call is handled in the deleteClimb function in climb-context.tsx
        await deleteClimb(id);
      } catch (error) {
        console.error("Failed to delete climb:", error)
        alert("Failed to delete climb. Please try again.")
      }
    }
  }


  return (
    <div className="space-y-4">
      <div className="sticky top-0 bg-neutral-800 py-4 flex justify-center">
        <h2 className="text-4xl font-bold text-white">Climbs</h2>
      </div>
      {/* Creat cards using map func */}
      <div className="flex flex-col gap-4">
        {climbs.map((climb) => (
          // Calls setSelectedClimb(climb) when the card is selected
          <div key={climb._id} onClick={()=> onClimbSelect(climb)} className="border p-4 rounded-lg shadow-md relative"> 
            <button onClick={(() => handleDelete(climb._id))} className="absolute top-2 right-2 bg-gray-600 text-white rounded-full p-2 hover:bg-gray-500 transition">
              <Trash2 className="h-4 w-4" />
            </button>
            <h3 className="text-2xl font-semibold text-white">{climb.name}</h3>
            <p>
                <strong className="text-l text-white">Area: {climb.area}</strong> 
            </p>
            <p>
                <strong className="text-l text-white">Grade: {climb.grade}</strong> 
            </p>
          </div>
        ))}
      </div>
      {/* Button stays at the bottom */}
      <div className="sticky bottom-0 bg-neutral-800 py-4 flex justify-center">
        <button onClick={() => onAddClimbButton(true)} className="text-white bg-blue-500 px-6 py-3 rounded-lg shadow-lg">
          + Add Climb
        </button>
      </div>

    </div>
  )
}

export default MapListComponent