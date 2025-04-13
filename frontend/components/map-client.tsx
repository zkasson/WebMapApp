"use client"

import { useEffect, useRef, useState } from "react"
import { loadModules } from "esri-loader"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MapIcon } from "lucide-react"
import type { MapView, GraphicsLayer } from "@arcgis/core"
import { ClimbInterface } from "@/types/climb"


interface MapClientProps {
  onLocationSelectAction: (latitude: number, longitude: number) => void
  isAddingClimb: boolean
  isEditingClimb: boolean
  climbs: ClimbInterface
  selectedLocation: { latitude: number; longitude: number } | null
}

export function MapClient({
  onLocationSelectAction,
  isAddingClimb,isEditingClimb,climbs,selectedLocation,}: MapClientProps) {


  // Refs for map elements
  const mapRef = useRef<HTMLDivElement>(null)
  const viewRef = useRef<MapView | null>(null)
  const graphicsLayerRef = useRef<GraphicsLayer | null>(null)

  // State for basemap selection
  const [currentBasemap, setCurrentBasemap] = useState("dark-gray-vector")

  // Handle map center changes when location is selected
  useEffect(() => {
    if (viewRef.current && selectedLocation) {
      viewRef.current.goTo(
        {
          center: [selectedLocation.longitude, selectedLocation.latitude],
          zoom: 12,
        },
        { duration: 1000 },
      )
    }
  }, [selectedLocation])

  // Change basemap handler
  const changeBasemap = async (basemapId: string) => {
    if (!viewRef.current) return
    try {
      viewRef.current.map.basemap = basemapId
      setCurrentBasemap(basemapId)
    } catch (error) {
      console.error("Error changing basemap:", error)
    }
  }

  // Initialize map
  useEffect(() => {
    let view: MapView
    let graphicsLayer: GraphicsLayer

    const initializeMap = async () => {
      try {
        const [ArcGISMap, MapView, GraphicsLayer, Search] = await loadModules([
          "esri/Map",
          "esri/views/MapView",
          "esri/layers/GraphicsLayer",
          "esri/widgets/Search",
        ])

        const map = new ArcGISMap({
          basemap: "dark-gray-vector",
        })

        graphicsLayer = new GraphicsLayer()
        map.add(graphicsLayer)

        view = new MapView({
          container: mapRef.current!,
          map: map,
          zoom: 2,
          center: [0, 0],
        })

        const searchWidget = new Search({
          view: view,
        })

        view.ui.add(searchWidget, {
          position: "top-right",
          index: 2,
        })

        viewRef.current = view
        graphicsLayerRef.current = graphicsLayer

        addClimbsToMap(climbs)
      } catch (error) {
        console.error("Error initializing map:", error)
      }
    }

    initializeMap()

    return () => {
      if (viewRef.current) {
        viewRef.current.destroy()
      }
    }
  }, [climbs])

  // Update climbs on map when they change
  useEffect(() => {
    if (graphicsLayerRef.current && viewRef.current) {
      addClimbsToMap(climbs)
    }
  }, [climbs])

  // Handle map clicks for adding/editing climbs
  useEffect(() => {
    if (!viewRef.current) return

    let clickHandler: IHandle | null = null

    if (isAddingClimb || isEditingClimb) {
      clickHandler = viewRef.current.on("click", handleMapClick)
    }

    return () => {
      if (clickHandler) {
        clickHandler.remove()
      }
    }
  }, [isAddingClimb, isEditingClimb])

  // Add climbs to the map
  const addClimbsToMap = async (climbsToAdd: ClimbInterface[]) => {
    if (!graphicsLayerRef.current || !viewRef.current) return

    const [Graphic, Point, SimpleMarkerSymbol, PopupTemplate] = await loadModules([
      "esri/Graphic",
      "esri/geometry/Point",
      "esri/symbols/SimpleMarkerSymbol",
      "esri/PopupTemplate",
    ])

    graphicsLayerRef.current.removeAll()

    const graphics = climbsToAdd.filter(climb => climb.location && climb.location.coordinates).map((climb) => {
      console.log("Climbs to add: ", climb.name)
      const point = new Point({
        longitude: Number(climb.location.coordinates.long),
        latitude: Number(climb.location.coordinates.lat),
      })

      const markerSymbol = new SimpleMarkerSymbol({
        color: [0, 255, 0],
        outline: {
          color: [255, 255, 255],
          width: 2,
        },
        size: 12,
      })

      const popupTemplate = new PopupTemplate({
        title: climb.name,
        content: `
          <p><strong>Type:</strong> ${climb.type}</p>
          <p><strong>Grade:</strong> ${climb.grade}</p>
          <p><strong>Area:</strong> ${climb.area}</p>
          <p><strong>Crag:</strong> ${climb.crag}</p>
        `,
      })

      return new Graphic({
        geometry: point,
        symbol: markerSymbol,
        attributes: climb,
        popupTemplate: popupTemplate,
      })
    })

    graphicsLayerRef.current.addMany(graphics)

    if (climbsToAdd.length > 0) {
      try {
        await viewRef.current.goTo(
          graphics.map((g) => g.geometry),
          { padding: 50 },
        )
      } catch (error) {
        if (error.name === "view:goto-interrupted") {
          console.log("Map navigation was interrupted")
        } else {
          console.error("An error occurred during map navigation:", error)
        }
      }
    }
  }

  // Handle map click events
  const handleMapClick = (event) => {
    if (!graphicsLayerRef.current) return

    loadModules(["esri/Graphic", "esri/geometry/Point", "esri/symbols/SimpleMarkerSymbol"]).then(
      ([Graphic, Point, SimpleMarkerSymbol]) => {
        const point = new Point({
          longitude: event.mapPoint.longitude,
          latitude: event.mapPoint.latitude,
        })

        const markerSymbol = new SimpleMarkerSymbol({
          color: [255, 0, 0],
          outline: {
            color: [255, 255, 255],
            width: 2,
          },
        })

        const graphic = new Graphic({
          geometry: point,
          symbol: markerSymbol,
        })

        graphicsLayerRef.current.removeAll()
        graphicsLayerRef.current.add(graphic)

        onLocationSelectAction(event.mapPoint.latitude, event.mapPoint.longitude)
      },
    )
  }

  return (
    <div className="relative h-full w-full">
      <div ref={mapRef} className="h-full w-full" />
      <div className="absolute bottom-4 right-4 z-10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="bg-white hover:bg-gray-100">
              <MapIcon className="h-4 w-4 mr-2" />
              {currentBasemap === "dark-gray-vector" ? "Dark" : "Satellite"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => changeBasemap("dark-gray-vector")}>Dark</DropdownMenuItem>
            <DropdownMenuItem onClick={() => changeBasemap("satellite")}>Satellite</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}


