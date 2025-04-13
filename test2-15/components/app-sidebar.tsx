"use client"

import { Sidebar, SidebarContent, SidebarHeader } from "@/components/ui/sidebar"
import { Mountain } from "lucide-react"
import { useClimbs } from "@/lib/climb-context"

export function AppSidebar() {
  const { climbs } = useClimbs()

  const climbSummary = {
    total: climbs.length,
    types: climbs.reduce(
      (acc, climb) => {
        acc[climb.type] = (acc[climb.type] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    ),
  }

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center p-4">
        <Mountain className="mr-2 h-6 w-6" />
        <span className="text-lg font-semibold">Climbing App</span>
      </SidebarHeader>
      <SidebarContent className="p-4">
        <h3 className="text-sm font-semibold mb-2">Climb Summary</h3>
        <p>Total Climbs: {climbSummary.total}</p>
        <h4 className="text-sm font-semibold mt-4 mb-2">Types:</h4>
        <ul className="text-sm">
          {Object.entries(climbSummary.types).map(([type, count]) => (
            <li key={type}>
              {type}: {count}
            </li>
          ))}
        </ul>
      </SidebarContent>
    </Sidebar>
  )
}

