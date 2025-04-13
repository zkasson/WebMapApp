'use client'
import React from "react";
import { useState,useEffect } from 'react';
import { ClimbFilter } from "@/lib/types";

interface FilterBarProps {
    globalClimbData: ClimbFilter[];
    setFilteredClimbData: React.Dispatch<React.SetStateAction<ClimbFilter[]> | null>;
  }

const FilterBarComponent = ({globalClimbData,  setFilteredClimbData}:FilterBarProps) => {

    const [typeFilter,setTypeFilter] = useState<string>('');
    const [minGradeFilter, setMinGradeFilter] = useState<number | string>('');
    const [maxgradeFilter, setMaxGradeFilter] = useState<number | string>('');
    const [pitchesFilter, setPitchesFilter] = useState<number | string>('');
    const [ratingFilter, setRatingFilter] = useState<number | string>('');

    

    useEffect(() => {
        const filteredClimbs = globalClimbData.filter((climb) => {
            return typeFilter ? climb.type === typeFilter : true;
        });

        console.log(filteredClimbs)
        if (JSON.stringify(filteredClimbs) !== JSON.stringify(globalClimbData)) {
            setFilteredClimbData(filteredClimbs); 
        }
    }, [typeFilter,]);

    function handleTypeFilterChange(event: React.ChangeEvent<HTMLSelectElement>){
        const type = event.target.value
        setTypeFilter(type)
        console.log(type)
    }

    function handleMinGradeFilterChange(event: React.ChangeEvent<HTMLSelectElement>){
        const minGrade = event.target.value
        setMinGradeFilter(minGrade)
        console.log(minGrade)
    }

    function handleMaxGradeFilterChange(event: React.ChangeEvent<HTMLSelectElement>){
        const maxGrade = event.target.value
        setMaxGradeFilter(maxGrade)
        console.log(maxGrade)
    }

    function handlePitchesFilterChange(event: React.ChangeEvent<HTMLSelectElement>){
        const pitches = event.target.value
        setPitchesFilter(pitches)
        console.log(pitches)
    }

    function handleRatingFilterChange(event: React.ChangeEvent<HTMLSelectElement>){
        const rating = event.target.value
        setRatingFilter(rating)
        console.log(rating)
    }





  return (
    <div className="w-full p-4 mb-4">
      <div className="bg-neutral-800 p-4 rounded-xl shadow-md">
        <div className="grid grid-cols-6 gap-4 items-center">
          
            <div className="text-xl text-white font-semibold text-center">Filter by:</div>

                {/* Dropdown for Type */}
                <div>
                    <label className="text-white font-semibold">Type:</label>
                    <select value={typeFilter} onChange={handleTypeFilterChange} className="p-2 rounded-lg bg-neutral-700 text-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-neutral-100 hover:text-neutral-700 transition duration-400">
                    <option value="" ></option>
                    <option value="Sport">Sport</option>
                    <option value="Trad">Trad</option>
                    </select>
                </div>

                {/* Dropdown for Min Grade */}
                <div className="flex gap-4 items-center col-span-2"> 
                <div>
                <label className="text-white font-semibold">Min Grade: </label>
                <select
                    value={minGradeFilter}
                    onChange={handleMinGradeFilterChange}
                    className="p-2 rounded-lg bg-neutral-700 text-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-neutral-100 hover:text-neutral-700 transition duration-400">
                    <option value=""></option>
                    <option value={5.4}>5.4</option>
                    <option value={5.5}>5.5</option>
                    <option value={5.6}>5.6</option>
                    <option value={5.7}>5.7</option>
                    <option value={5.8}>5.8</option>
                    <option value={5.9}>5.9</option>
                    <option value={6.0}>5.10</option>
                    <option value={6.1}>5.11</option>
                    <option value={6.2}>5.12</option>
                    <option value={6.3}>5.13</option>
                    <option value={6.4}>5.14</option>
                </select>
                </div>
        

                {/* Dropdown for Min Grade */}
                <div>
                <label className="text-white font-semibold">Max Grade: </label>
                <select
                    value={maxgradeFilter}
                    onChange={handleMaxGradeFilterChange}
                    className="p-2 rounded-lg bg-neutral-700 text-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-neutral-100 hover:text-neutral-700 transition duration-400">
                    <option value="" ></option>
                    <option value={5.4}>5.4</option>
                    <option value={5.5}>5.5</option>
                    <option value={5.6}>5.6</option>
                    <option value={5.7}>5.7</option>
                    <option value={5.8}>5.8</option>
                    <option value={5.9}>5.9</option>
                    <option value={6.0}>5.10</option>
                    <option value={6.1}>5.11</option>
                    <option value={6.2}>5.12</option>
                    <option value={6.3}>5.13</option>
                    <option value={6.4}>5.14</option>
                </select>
                </div>
            </div>


          
        
                {/* Dropdown for Pitches */}
                <div>
                    <label className="text-white font-semibold">Pitches:</label>
                    <select value={pitchesFilter} onChange={handlePitchesFilterChange} className="p-2 rounded-lg bg-neutral-700 text-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-neutral-100 hover:text-neutral-700 transition duration-400">
                        <option value="" ></option>
                        <option value={0}>1</option>
                        <option value={1}>1+</option>
                        <option value={2}>2+</option>
                        <option value={3}>3+</option>
                        <option value={4}>4+</option>
                        <option value={5}>5+</option>
                        <option value={6}>6+</option>
                        <option value={7}>7+</option>
                        <option value={8}>8+</option>
                        <option value={9}>9+</option>
                        <option value={10}>10+</option>
                    </select>
                </div>

                {/* Dropdown for Rating */}
                <div>
                    <label className="text-white font-semibold">Rating:</label>
                    <select value={ratingFilter} onChange={handleRatingFilterChange} className="p-2 rounded-lg bg-neutral-700 text-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-neutral-100 hover:text-neutral-700 transition duration-400">
                        <option value="" ></option>
                        <option value={5}>5</option>
                        <option value={4}>4</option>
                        <option value={3}>3</option>
                        <option value={2}>2</option>
                        <option value={1}>1</option>
                    </select>
                </div>
            </div>
        </div>
    </div>
  );
};

export default FilterBarComponent;