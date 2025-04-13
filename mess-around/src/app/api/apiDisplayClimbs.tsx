'use client'
import { createContext, useState, useContext, useEffect } from "react"
import type { Climb, ClimbFormData } from "@/lib/types";

interface ClimbContextType {
    climbs: Climb[]
    fetchClimbs: () => Promise<void>
  }

const DisplayClimbContext = createContext<ClimbContextType | undefined>(undefined);

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
    }, []) // dependency array to fix the warning

    return (
      <DisplayClimbContext.Provider value={{ climbs, fetchClimbs }}>
        {children}
      </DisplayClimbContext.Provider>
    );
}

export function useClimbs() {
  const context = useContext(DisplayClimbContext);
  if (!context) {
    throw new Error("useClimbs must be used within a ClimbProvider");
  }
  return context;
}