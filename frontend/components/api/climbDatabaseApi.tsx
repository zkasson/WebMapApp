"use client"

import type React from "react"
import { createContext, useState, useContext, useEffect } from "react"
import type { ClimbInterface, LocationInterface, ClimbFormData, ClimbUpdatedFormData} from "@/types/climb"

interface ClimbContextType {
  climbs: ClimbInterface[]
  addClimb: (climb: ClimbFormData) => void
  updateClimb: (id: string) => Promise<void>
  deleteClimb: (id: string) => Promise<void>
  fetchClimbs: () => Promise<void>
}

const ClimbContext = createContext<ClimbContextType | undefined>(undefined)

export function ClimbProvider({ children }: { children: React.ReactNode }) {
  const [climbs, setClimbs] = useState<ClimbInterface[]>([])

  const fetchClimbs = async () => {
    try{
      const response = await fetch("http://localhost:5000/climbs")
      const data = await response.json()
      setClimbs(data)
    }catch (error){
      console.error("Failed to fetch climbs:", error);
    }

  }


  useEffect(() => {
    fetchClimbs()
  }, []) // array determines when this useEffect will run, empty array means only when page renders

  const addClimb = async (climb: ClimbFormData) => {
    try {
      const response = await fetch("http://localhost:5000/climbs/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(climb), // No need to reformat here
      });
  
      if (response.ok) {
        const data = await response.json();
        setClimbs((prevClimbs) => [...prevClimbs, data]); 
      } else {
        console.error("Failed to add climb");
      }
    } catch (error) {
      console.error("Failed to add climb:", error);
    }
  };

  const updateClimb = async (updatedClimb: ClimbUpdatedFormData,climbId: string)=> {
    console.log("API Called. Updating Climb with ID:",climbId)
    try{
      const response = await fetch(`http://localhost:5000/climbs/update`,{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedClimb),
      });

      if (response.ok) {
        console.log()
        const data = await response.json();
        setClimbs((prevClimbs) =>
          prevClimbs.map((climb) => (climb._id === climbId ? { ...climb, ...updatedClimb } : climb))
        );
      } else {
        throw new Error("Failed to update climb");
      }
    }catch (error) {
      console.error("Failed to update climb:", error);
    };
  };


  const deleteClimb = async (id: string) => {
    try {
      console.log("Deleted climb with ID: ", id)
      const response = await fetch(`http://localhost:5000/climbs/delete/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setClimbs((prevClimbs) => prevClimbs.filter((climb) => climb._id !== id));
      } else {
        throw new Error("Failed to delete climb");
      }
    } catch (error) {
      console.error("Failed to delete climb:", error);
    }
  }

  return (
    <ClimbContext.Provider value={{ climbs, addClimb, deleteClimb, fetchClimbs,updateClimb }}>{children}</ClimbContext.Provider>
  )
}

export function useClimbs() {
  const context = useContext(ClimbContext)
  if (context === undefined) {
    throw new Error("useClimbs must be used within a ClimbProvider")
  }
  return context
}

