// src/app/components/ListComponent.tsx

"use client"

import { useClimbs } from '../api/apiDisplayClimbs';  // Import the useClimbs hook

export default function ClimbList() {
  const { climbs } = useClimbs();  // Destructure climbs from the context

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-center">Climbs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {climbs.map((climb) => (
          <div key={climb._id} className="border p-4 rounded-lg shadow-md">
            {/* Card Header */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">{climb.name}</h3>
            </div>

            {/* Card Content */}
            <div>
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
            </div>
          </div>
        ))};
      </div>
    </div>
  );
}
