"use client"

import type React from "react"
import { createContext, useState, useContext, useEffect } from "react"
import type { Climb, ClimbFormData } from "@/lib/types";

interface ClimbContextType {
  climbs: Climb[]
  addClimb: (climb: ClimbFormData) => void
  deleteClimb: (id: string) => Promise<void>
  fetchClimbs: () => Promise<void>
}

const ClimbContext = createContext<ClimbContextType | undefined>(undefined)

export function ClimbProvider({ children }: { children: React.ReactNode }) {
  const [climbs, setClimbs] = useState<Climb[]>([])

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
  }, []) // Added dependency array to fix the warning

  const addClimb = async (climb: ClimbFormData) => {
    try{
      const response = await fetch("http://localhost:5000/climbs/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(climb),
      })
    }catch (error) {
      console.error("Failed to add climb:", error);
    }
  };

  const deleteClimb = async (id: string) => {
    try {
      console.log(id)
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
    <ClimbContext.Provider value={{ climbs, addClimb, deleteClimb, fetchClimbs }}>{children}</ClimbContext.Provider>
  )
}

export function useClimbs() {
  const context = useContext(ClimbContext)
  if (context === undefined) {
    throw new Error("useClimbs must be used within a ClimbProvider")
  }
  return context
}

