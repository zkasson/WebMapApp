import React from 'react'
import { ClimbFilter } from "@/lib/types";

interface CardsProps {
    climbs: ClimbFilter[];
  }

function CardsComponent({climbs} : CardsProps) {






    return (
        <div className="w-full md:w-1/3 p-4 bg-neutral-800 rounded-xl text-white text-center h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-600 scrollbar-track-neutral-800 scrollbar-thumb-rounded hover:scrollbar-thumb-neutral-500">
            <h2 className="text-4xl font-bold p-4">Climbs</h2>
            <div className="space-y-4">
                {/* Example of two columns of cards */}
                <div className="grid grid-cols-2 gap-4">
                    {climbs.map((climb)=> (
                        <div key={climb.name} className='border p-4 rounded-lg shadow-md'>
                            <div>
                                <h3 className="text-xl font-semibold">{climb.name}</h3>
                            </div>
                            <div>
                                <p>
                                    <strong>Type:</strong> {climb.type}
                                </p>
                                <p>
                                    <strong>Grade:</strong> {climb.grade}
                                </p>
                                <p>
                                    <strong>Pitches:</strong> {climb.pitches}
                                </p>
                                <p>
                                    <strong>Height:</strong> {climb.height}
                                </p>
                                <p>
                                    <strong>Rating:</strong> {climb.rating}
                                </p>
                            </div>
                        </div>

                    ))};
                </div>
            </div>
        </div>
      );
}

export default CardsComponent;