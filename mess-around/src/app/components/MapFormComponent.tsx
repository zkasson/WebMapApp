import React from 'react'
import { useState } from 'react';
import { ClimbFormData, Location } from '@/lib/types';
import { useClimbs } from '../api/climb-context'


interface MapFormComponentProps {
  onBack: () => void; // Function type with no parameters
}

interface ClimbSubmissionData extends Omit<ClimbFormData, "latitude" | "longitude"> {
  location: Location; 
}

function MapFormComponent({onBack}:MapFormComponentProps) {
  const { addClimb,fetchClimbs } = useClimbs() //Bring in addClimb function

  const [formData, setFormData] = useState<ClimbFormData>({
    name: "",
    area: "",
    type: "",
    pitches: "",
    grade: "",
    rating: "",
    year: new Date().getFullYear(),
    notes: "",
    highlight: "",
    crag: "",
    location:{
      type: "Point",
      coordinates: {
        lat:"",
        long:"",
      }, 
    }
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ //prevData accesses current state
      ...prevData,
      [name]: ["pitches", "rating", "year"].includes(name)
        ? value === "" ? null : Number(value) // Send null if empty
        : value,
    }));
  };

  const handleLatChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ //prevData accesses current state
      ...prevData,
      location: {
        type: prevData.location.type,
        coordinates: {
          lat: value,
          long: prevData.location.coordinates.long
        },
      }
    }));
    console.log(formData)
  };

  const handleLongChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ //prevData accesses current state
      ...prevData,
      location: {
        type: prevData.location.type,
        coordinates: {
          lat: prevData.location.coordinates.lat,
          long: value,
        },
      }
    }));
    console.log(formData)
  };

    
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    try {
      await addClimb(formData);
      await fetchClimbs(); // refresh climb list when submitting
      onBack(); // go back to climb list view
    } catch (err) {
      console.error(err);
    }
  };
  
  return (
    <div className="p-6 bg-neutral-800 rounded-lg shadow-md text-white">
      <button
      className="text-white bg-blue-500 px-4 py-2 rounded-lg"
      onClick={onBack} // Calls onBack() when clicked
    >
      Back
    </button>
      <h2 className="text-3xl font-bold mb-4">Add New Climb</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <input type = 'text' name='name' placeholder='Climb Name' value={formData.name} onChange={handleChange} className="w-full p-2 rounded bg-neutral-700 border border-gray-600" required/>

        <input type = 'text' name='area' placeholder='Area' value={formData.area} onChange={handleChange} className="w-full p-2 rounded bg-neutral-700 border border-gray-600" required/>

        <select name="type" value={formData.type} onChange={handleChange} className="w-full p-2 rounded bg-neutral-700 border border-gray-600 text-white" required>
          <option value="" disabled>Select Climb Type</option>
          <option value="Boulder">Boulder</option>
          <option value="Sport">Sport</option>
          <option value="Trad">Trad</option>
        </select>
        
        <input type = 'number' name='pitches' placeholder='Pitches' value={formData.pitches} onChange={handleChange} className="w-full p-2 rounded bg-neutral-700 border border-gray-600" required/>

        <select name="grade" value={formData.grade} onChange={handleChange} className="w-full p-2 rounded bg-neutral-700 border border-gray-600 text-white" required>
          <option value="" disabled>Select Grade</option>
          <option value="5.7">5.7</option>
          <option value="5.8">5.8</option>
          <option value="5.9">5.9</option>
          <option value="5.10a">5.10a</option>
          <option value="5.10b">5.10b</option>
          <option value="5.10c">5.10c</option>
          <option value="5.10d">5.10d</option>
          <option value="5.11a">5.11a</option>
          <option value="5.11b">5.11b</option>
          <option value="5.11c">5.11c</option>
          <option value="5.11d">5.11d</option>
          <option value="5.12a">5.12a</option>
          <option value="5.12b">5.12b</option>
          <option value="5.12c">5.12c</option>
          <option value="5.12d">5.12d</option>
          <option value="5.13a">5.13a</option>
          <option value="5.13b">5.13b</option>
          <option value="5.13c">5.13c</option>
          <option value="5.13d">5.13d</option>
          <option value="5.14a">5.14a</option>
          <option value="5.14b">5.14b</option>
          <option value="5.14c">5.14c</option>
          <option value="5.14d">5.14d</option>
          <option value="5.15a">5.15a</option>
          <option value="5.15b">5.15b</option>
          <option value="5.15c">5.15c</option>
          <option value="5.15d">5.15d</option>
        </select>

        <select name="rating" value={formData.rating} onChange={handleChange} className="w-full p-2 rounded bg-neutral-700 border border-gray-600 text-white" required>
          <option value="" disabled>Select Rating</option>
          <option value="0.5">0.5 Stars</option>
          <option value="1">1 Star</option>
          <option value="1.5">1.5 Star</option>
          <option value="2">2 Stars</option>
          <option value="2.5">2.5 Stars</option>
          <option value="3">3 Stars</option>
          <option value="3.5">3.5 Stars</option>
          <option value="4">4 Stars</option>
          <option value="4.5">4.5 Stars</option>
          <option value="5">5 Stars</option>
        </select>

        <input type="number" name="year" placeholder="Year" value={formData.year} onChange={handleChange} className="w-full p-2 rounded bg-neutral-700 border border-gray-600 inline-block" required/>

        <select name="highlight" value={formData.highlight} onChange={handleChange} className="w-full p-2 rounded bg-neutral-700 border border-gray-600 text-white" required>
          <option value="" disabled>Select highlight</option>
          <option value="Views">Views</option>
          <option value="Movement">Movement</option>
          <option value="Rock Quality">Rock Quality</option>
          <option value="Weather">Weather</option>
          <option value="Surrounding Nature">Surrounding Nature</option>
        </select>

        <input type="text" name="notes" placeholder="Notes" value={formData.notes} onChange={handleChange} className="w-full p-2 rounded bg-neutral-700 border border-gray-600 inline-block" required/>

        <input type="text" name="crag" placeholder="Crag" value={formData.crag} onChange={handleChange} className="w-full p-2 rounded bg-neutral-700 border border-gray-600 inline-block" required/>

        <input type="number" name="latitude" placeholder="Latitude" value={formData.location.coordinates.lat} onChange={handleLatChange} className="w-full p-2 rounded bg-neutral-700 border border-gray-600 inline-block" required/>

        <input type="number" name="longitude" placeholder="Longitude" value={formData.location.coordinates.long} onChange={handleLongChange} className="w-full p-2 rounded bg-neutral-700 border border-gray-600 inline-block" required/>

        {/* Button stays at the bottom */}
      <div className="sticky bottom-0 bg-neutral-800 py-4 flex justify-center">
      <button type="submit" className="text-white bg-blue-500 px-6 py-3 rounded-lg shadow-lg">
        Submit
      </button>
      </div>
      </form>
    </div>
  )
}

export default MapFormComponent