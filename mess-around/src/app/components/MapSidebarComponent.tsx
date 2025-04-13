"use client";
import React, { useState } from "react";
import MapListComponent from '../components/MapListComponent';
import MapFormComponent from '../components/MapFormComponent';
import MapViewClimbComponent from './MapViewClimbComponent';
import { ClimbProvider } from '../api/climb-context';
import { TrendingUp } from "lucide-react";

function MapSidebarComponent() {
  const [selectedClimb, setSelectedClimb] = useState(null); //Manage state of the selected climb at parent level to share across the components.
  const [addingClimb, setAddingClimb] = useState(false); //Manage form visibility to share across the components.

  return (
    <ClimbProvider>
      <div className="w-80 h-full bg-neutral-800 p-4 rounded-xl shadow-md flex flex-col">
      {selectedClimb ? (
        <MapViewClimbComponent 
          climb={selectedClimb} 
          onBack={() => setSelectedClimb(null)} // Reset state to go back
        />
      ) : addingClimb ? ( 
          <MapFormComponent onBack={() => setAddingClimb(false)} /> // Show form
      ) : (
        <MapListComponent 
        onAddClimbButton={setAddingClimb} 
        onClimbSelect={setSelectedClimb} /> // Pass setSelectedClimb as onClimbSelect
      )}
      </div>
    </ClimbProvider>
  )
}

export default MapSidebarComponent