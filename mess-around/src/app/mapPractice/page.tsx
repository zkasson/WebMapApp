import React from 'react'
import HeaderComponent from '../components/HeaderComponent'; 
import MapComponent from '../components/MapComponent';
import MapSidebarComponent from '../components/MapSidebarComponent';
import { ClimbProvider } from '../api/climb-context';

export default function mapPage() {
  return (
    <ClimbProvider>
      <div className="bg-neutral-200 min-h-screen flex flex-col">
        <HeaderComponent />
        <div className="flex h-[calc(100vh-4rem)] mt-4 justify-between px-6">
          <div className="w-96 overflow-y-auto max-h-full">
            <MapSidebarComponent />
          </div>
          <div className="flex-1 max-h-[calc(100vh-4rem)] overflow-hidden relative">
            <MapComponent />
          </div>
        </div>
      </div>
    </ClimbProvider>
  )
}
