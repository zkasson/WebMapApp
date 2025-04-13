'use client'
import React, {useState} from "react";
import { ClimbFilter } from "@/lib/types";
import CardsComponent from "./cardsComponent";
import { climbs } from "./testData";
import ChartComponent from "./chartComponent";
import FilterBarComponent from "./filterBarComponent";
import HeaderComponent from "../components/HeaderComponent";




function AnalyticsPage() {
  const unfilteredClimbs = climbs

  
  const [globalClimbData, setGlobalClimbData] = useState<ClimbFilter[]>(climbs);
  const [filteredClimbData, setFilteredClimbData] = useState<ClimbFilter[] | null>(null);






  return (
    <div className="bg-neutral-400 rounded-xl">
        <HeaderComponent/>
        <div className="flex flex-col md:flex-row gap-4 p-4">
        
        <CardsComponent climbs={globalClimbData}  />

            <div className="flex flex-col w-full md:w-2/3">
                
                <FilterBarComponent globalClimbData={globalClimbData}  setFilteredClimbData={setFilteredClimbData}/>

                
                <ChartComponent />
            </div>
        </div>
    </div>
  )
}

export default AnalyticsPage