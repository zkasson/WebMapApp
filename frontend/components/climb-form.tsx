"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { ArrowLeft } from "lucide-react"
import { loadModules } from "esri-loader"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Climb, Location, ClimbInterface, LocationInterface } from "@/types/climb"
import { useArcGISSearch } from "./hooks/useArcGISSearch"

interface ClimbFormProps {
  onSubmit: () => void
  onCancelAction: () => void
  onSearchAction: (location: Location) => void
  selectedLocation: Location | null
  initialData?: ClimbInterface | null
  isEditing?: boolean
}

export function ClimbForm({
  onSubmit,
  onCancelAction,
  onSearchAction,
  selectedLocation,
  initialData,
  isEditing = false,}: ClimbFormProps) {

  const [climbFormData, setClimbFormData] = useState<ClimbUpdatedFormData>({
    _id: initialData?._id ?? "",
    name: initialData?.name ?? "",
    type: initialData?.type ?? "",
    pitches: initialData?.pitches ?? "",
    grade: initialData?.grade ?? "",
    rating: initialData?.rating ?? "",
    highlight: initialData?.highlight ?? "",
    year: initialData?.year ?? "",
    notes: initialData?.notes ?? "",
    area: initialData?.area ?? "",
    crag: initialData?.crag ?? "",
    location:{
      type: "Point",
      coordinates: {
        lat:initialData?.location.coordinates.lat ?? "",
        long:initialData?.location.coordinates.long ?? "",
      }, 
    }
  })

  const [validationErrors, setValidationErrors] = useState({        //Creates an object with validation errors for the pitch and year field. 
    pitches: false,
    year: false,});
  
  
  const searchInputRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let searchWidget: any

    const initializeSearch = async () => {
      try {

        const [Search] = await loadModules(["esri/widgets/Search"])

        searchWidget = new Search({
          container: searchInputRef.current,
          suggestionsEnabled: true,
          popupEnabled: false,
          resultGraphicEnabled: false,
        })

        searchWidget.on("select-result", (event: any) => {
          const { result } = event
          if (result && result.feature) {
            const { geometry } = result.feature
            setClimbFormData((prevData) => ({
              ...prevData,
              latitude: geometry.latitude.toString(),
              longitude: geometry.longitude.toString(),
            }))
            onSearchAction({ latitude: geometry.latitude, longitude: geometry.longitude })
          }
        })
      } catch (error) {
        console.error("Error initializing search widget:", error)
      }
    }
    
    
    
    initializeSearch()

    return () => {
      if (searchWidget) {
        // console.log("🧹 Cleaning up search widget");
        searchWidget.destroy()
        // console.log(searchWidget);
      }
    }
  }, [onSearchAction])

  useEffect(() => {
    if (selectedLocation) {
      setClimbFormData((prevData) => ({
        ...prevData,
        location: {
          type: prevData.location.type,
          coordinates: {
            lat: Number(selectedLocation.latitude),
            long: Number(selectedLocation.longitude),
          },
        }
      }))
    }
  }, [selectedLocation])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setClimbFormData((prevData) => ({ //prevData accesses current state
      ...prevData,
      [name]: ["pitches", "rating", "year"].includes(name)
        ? Number(value) //Convert "pitches", "rating", "year" to number
        : value,
    }));

    if (name === "pitches" || name === "year") {
      const isValid = /^\d+$/.test(value)
      setValidationErrors((prev) => ({ ...prev, [name]: !isValid }))
    }
  }


  const handleLatChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setClimbFormData((prevData) => ({ //prevData accesses current state
      ...prevData,
      location: {
        type: prevData.location.type,
        coordinates: {
          lat: value,
          long: prevData.location.coordinates.long
        },
      }
    }));
    console.log("Latitude changed: ", climbFormData)
    console.log(climbFormData._id)
  };

  const handleLongChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setClimbFormData((prevData) => ({ //prevData accesses current state
      ...prevData,
      location: {
        type: prevData.location.type,
        coordinates: {
          lat: prevData.location.coordinates.lat,
          long: value,
        },
      }
    }));
    console.log("Longitude changed: ", climbFormData)
  };
  
  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("Form submitted:", climbFormData);
    if (validationErrors.pitches || validationErrors.year) return
    isEditing ? onSubmit(climbFormData, climbFormData._id) : onSubmit(climbFormData);
  }

  return (
    <div className="space-y-4">
      <Button onClick={onCancelAction} className="mb-4 bg-sky-500 hover:bg-sky-400 hover:text-black rounded-lg">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to List
      </Button>

      <div className="relative">
        <div ref={searchInputRef} className="w-full" />
      </div>

      <Input
        placeholder="Area"
        name="area"
        value={climbFormData.area}
        onChange={handleInputChange}
        className="bg-neutral-700 text-white placeholder-neutral-400 border-none rounded-lg"
      />

      <Input
        placeholder="Crag"
        name="crag"
        value={climbFormData.crag}
        onChange={handleInputChange}
        className="bg-neutral-700 text-white placeholder-neutral-400 border-none rounded-lg"
      />

      <Input
        placeholder="Climb Name"
        name="name"
        value={climbFormData.name}
        onChange={handleInputChange}
        className="bg-neutral-700 text-white placeholder-neutral-400 border-none rounded-lg"
      />

      <Select onValueChange={(value) => setClimbFormData({ ...climbFormData, type: value })} value={climbFormData.type}>
        <SelectTrigger className="bg-neutral-700 text-white border-none rounded-lg">
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Trad">Trad</SelectItem>
          <SelectItem value="Sport">Sport</SelectItem>
          <SelectItem value="Boulder">Boulder</SelectItem>
        </SelectContent>
      </Select>

      <Input
        placeholder="Pitches"
        name="pitches"
        value={climbFormData.pitches}
        onChange={handleInputChange}
        className={`bg-neutral-700 text-white placeholder-neutral-400 ${
          validationErrors.pitches ? "border-red-500" : "border-none"
        } rounded-lg`}
      />
      {validationErrors.pitches && <p className="text-red-500 text-sm">Please enter a whole number</p>}

  

      <Select onValueChange={(value) => setClimbFormData({ ...climbFormData, grade: value })} value={climbFormData.grade}>
        <SelectTrigger className="bg-neutral-700 text-white border-none rounded-lg">
          <SelectValue placeholder="Grade" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="5.7">5.7</SelectItem>
          <SelectItem value="5.8">5.8</SelectItem>
          <SelectItem value="5.9">5.9</SelectItem>
          <SelectItem value="5.10a">5.10a</SelectItem>
          <SelectItem value="5.10b">5.10b</SelectItem>
          <SelectItem value="5.10c">5.10c</SelectItem>
          <SelectItem value="5.10d">5.10d</SelectItem>
          <SelectItem value="5.11a">5.11a</SelectItem>
          <SelectItem value="5.11b">5.11b</SelectItem>
          <SelectItem value="5.11c">5.11c</SelectItem>
          <SelectItem value="5.11d">5.11d</SelectItem>
          <SelectItem value="5.12a">5.12a</SelectItem>
          <SelectItem value="5.12b">5.12b</SelectItem>
          <SelectItem value="5.12c">5.12c</SelectItem>
          <SelectItem value="5.12d">5.12d</SelectItem>
          <SelectItem value="5.13a">5.13a</SelectItem>
          <SelectItem value="5.13b">5.13b</SelectItem>
          <SelectItem value="5.13c">5.13c</SelectItem>
          <SelectItem value="5.13d">5.13d</SelectItem>
          <SelectItem value="5.14a">5.14a</SelectItem>
          <SelectItem value="5.14b">5.14b</SelectItem>
          <SelectItem value="5.14c">5.14c</SelectItem>
          <SelectItem value="5.14d">5.14d</SelectItem>
          <SelectItem value="5.15a">5.15a</SelectItem>
          <SelectItem value="5.15b">5.15b</SelectItem>
          <SelectItem value="5.15c">5.15c</SelectItem>
          <SelectItem value="5.15d">5.15d</SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={(value) => setClimbFormData({ ...climbFormData, rating: Number(value) })} value={climbFormData.rating?.toString()}>
        <SelectTrigger className="bg-neutral-700 text-white border-none rounded-lg">
          <SelectValue placeholder="Rating" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="0.5"> 0.5 Stars</SelectItem>
          <SelectItem value="1">1 Star</SelectItem>
          <SelectItem value="1.5"> 1.5 Stars</SelectItem>
          <SelectItem value="2">2 Stars</SelectItem>
          <SelectItem value="2.5"> 2.5 Stars</SelectItem>
          <SelectItem value="3">3 Stars</SelectItem>
          <SelectItem value="3.5"> 3.5 Stars</SelectItem>
          <SelectItem value="4">4 Stars</SelectItem>
          <SelectItem value="4.5"> 4.5 Stars</SelectItem>
          <SelectItem value="5">5 Stars</SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={(value) => setClimbFormData({ ...climbFormData, highlight: value })} value={climbFormData.highlight}>
        <SelectTrigger className="bg-neutral-700 text-white border-none rounded-lg">
          <SelectValue placeholder="Highlight" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Views">Views</SelectItem>
          <SelectItem value="Movement">Movement</SelectItem>
          <SelectItem value="Rock Quality">Rock Quality</SelectItem>
          <SelectItem value="Weather">Weather</SelectItem>
          <SelectItem value="Surrounding Nature">Surrounding Nature</SelectItem>
          <SelectItem value="People">People</SelectItem>
        </SelectContent>
      </Select>


      <Input
        placeholder="Year"
        name="year"
        value={climbFormData.year}
        onChange={handleInputChange}
        className={`bg-neutral-700 text-white placeholder-neutral-400 ${
          validationErrors.year ? "border-red-500" : "border-none"
        } rounded-lg`}
      />
      {validationErrors.year && <p className="text-red-500 text-sm">Please enter a year</p>}

      <Textarea
        placeholder="Notes"
        name="notes"
        value={climbFormData.notes}
        onChange={handleInputChange}
        className="bg-neutral-700 text-white placeholder-neutral-400 border-none rounded-lg"
      />

      <Input
        placeholder="Latitude"
        name="latitude"
        value={climbFormData.location.coordinates.lat || ""}
        onChange={handleLatChange}
        className="bg-neutral-700 text-white placeholder-neutral-400 border-none rounded-lg"
      />

      <Input
        placeholder="Longitude"
        name="longitude"
        value={climbFormData.location.coordinates.long|| ""}
        onChange={handleLongChange}
        className="bg-neutral-700 text-white placeholder-neutral-400 border-none rounded-lg"
      />

      <Button
        className="w-full bg-sky-500 hover:bg-sky-400 text-white hover:text-black rounded-lg"
        onClick={handleSubmit}
      >
        {isEditing ? "Save Changes" : "Add Climb"}
      </Button>
    </div>
  )
}

