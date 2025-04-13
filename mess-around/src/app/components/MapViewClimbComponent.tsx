"use client";
import React from 'react'
import { Climb } from '@/lib/types';


interface MapViewClimbComponentProps {
  climb: Climb;
  onBack: () => void;
}


function MapViewClimbComponent({ climb, onBack }:MapViewClimbComponentProps) {


  return (
    <div className="space-y-4">
    <button
      className="text-white bg-blue-500 px-4 py-2 rounded-lg"
      onClick={onBack} // Calls onBack() when clicked
    >
      Back
    </button>
    <h2 className="text-3xl font-bold text-white">{climb.name}</h2>
      <p className="text-white"><strong>Area:</strong> {climb.area}</p>
      <p className="text-white"><strong>Type:</strong> {climb.type}</p>
      <p className="text-white"><strong>Pitches:</strong> {climb.pitches}</p>
      <p className="text-white"><strong>Grade:</strong> {climb.grade}</p>
      <p className="text-white"><strong>Rating:</strong> {climb.rating}</p>
      <p className="text-white"><strong>Year:</strong> {climb.year}</p>
      <p className="text-white"><strong>Highlight:</strong> {climb.highlight}</p>
      <p className="text-white"><strong>Notes:</strong> {climb.notes}</p>
      <p className="text-white"><strong>Crag:</strong> {climb.crag}</p>
      <p className="text-white"><strong>Latitude:</strong> {climb.latitude}</p>
      <p className="text-white"><strong>Longitude:</strong> {climb.longitude}</p>
  </div>
  )
}

export default MapViewClimbComponent