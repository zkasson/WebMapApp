"use client"

import { useClimbs } from "@/lib/climb-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"

export default function ClimbList() {
  const { climbs, deleteClimb } = useClimbs()

  const handleDelete = async (id: string) => {
    if (!id) {
      console.error("Invalid Climb ID");
      return;
    }

    if (window.confirm("Are you sure you want to delete this climb?")) {
      try {
        // TODO: Replace this with a call to your backend API
        // Example:
        // await fetch(`https://your-api-url.com/api/climbs/${id}`, { method: 'DELETE' })

        // The actual API call is handled in the deleteClimb function in climb-context.tsx
        await deleteClimb(id)
      } catch (error) {
        console.error("Failed to delete climb:", error)
        alert("Failed to delete climb. Please try again.")
      }
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Climbs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {climbs.map((climb) => (
          <Card key={climb._id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{climb.name}</CardTitle>
              <Button variant="ghost" size="icon" onClick={() => handleDelete(climb._id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <p>
                <strong>Area:</strong> {climb.area}
              </p>
              <p>
                <strong>Type:</strong> {climb.type}
              </p>
              <p>
                <strong>Grade:</strong> {climb.grade}
              </p>
              <p>
                <strong>Rating:</strong> {climb.rating}
              </p>
              <p>
                <strong>Pitches:</strong> {climb.pitches}
              </p>
              <p>
                <strong>Year:</strong> {climb.year}
              </p>
              <p>
                <strong>Highlight:</strong> {climb.highlight}
              </p>
              <p>
                <strong>Notes:</strong> {climb.notes}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

