"use client"

import type React from "react"
import { createContext, useState, useContext, useEffect } from "react"
import type { Climb, ClimbFormData } from "@/lib/types";

interface ClimbContextType {
  climbs: Climb[]
  addClimb: (climb: ClimbFormData) => void
}

const ClimbContext = createContext<ClimbContextType | undefined>(undefined)

export function ClimbProvider({ children }: { children: React.ReactNode }) {
  const [climbs, setClimbs] = useState<Climb[]>([])


  const addClimb = async (climb: ClimbFormData) => {
    const formattedClimb = {  
      ...climb,
      location: {
        type: "Point",
        coordinates: [climb.longitude, climb.latitude],
      },
    };

    try {
        const response = await fetch("http://localhost:5000/climbs/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formattedClimb),
        });
  
        if (response.ok) {
          const data = await response.json();
          setClimbs((prevClimbs) => [...prevClimbs, data]); // Handle adding the new climb to state, makes sure latest version of state is used
        } else {
          console.error("Failed to add climb");
        }
      } catch (error) {
        console.error("Failed to add climb:", error);
      }
    };



  return (
    <ClimbContext.Provider value={{ climbs, addClimb }}>{children}</ClimbContext.Provider>
  )
}

export function useClimbs() {
  const context = useContext(ClimbContext)
  if (context === undefined) {
    throw new Error("useClimbs must be used within a ClimbProvider")
  }
  return context
}

