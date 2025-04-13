"use client";

import { useEffect, useRef, useState } from "react";
import { loadModules } from "esri-loader";
import "@/app/arcgis.css";




const MapComponent: React.FC = () => {
  const [basemapSelection,setBasemapSelection] = useState("topo-vector")

  const handleBasemapChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBasemapSelection(event.target.value)
    console.log({basemapSelection})
  }

  

  


  const mapRef = useRef<HTMLDivElement>(null); // Initialize the Ref
  useEffect(() => {
    let view: __esri.MapView; // Need to load in the ArcGIS modules b4 assigning map attributes


    const initializeMap = async () => {
      let climbs = []
      try{
        const response = await fetch("http://localhost:5000/climbs")
        climbs = await response.json()
      }catch (error){
        console.error("Failed to fetch climbs:", error);
      }


      const climbPointsObject = climbs.map((climb) => {
        const climbPoint = {
          longitude: parseFloat(climb.location.coordinates.long),
          latitude: parseFloat(climb.location.coordinates.lat),
        }; 
        const symbolStyle = {
          type: "simple-marker",
          color:
            climb.type === "Trad"
              ? [34, 197, 94] // Green for Trad
              : climb.type === "Sport"
              ? [239, 68, 68] // Red for Sport
              : [59, 130, 246], // Blue for Boulder
          outline: {
            color: [255, 255, 255],
            width: 2,
          },
        };
        const popupTemplate = {
          title: climb.name,
          content: `
            <b>Grade:</b> ${climb.grade}<br/>
            <b>Area:</b> ${climb.area}<br/>
            <b>Type:</b> ${climb.type}<br/>
            <b>Year:</b> ${climb.year}<br/>
            <b>Highlight:</b> ${climb.highlight}<br/>
            <b>Notes:</b> ${climb.notes}
          `,
        };
    
        const climbsObject = {
          geometry: climbPoint,
          symbol: symbolStyle,
          popupTemplate: popupTemplate,
        }
        return climbsObject
      });

      console.log(climbPointsObject)


      const [ArcGISMap, MapView,Graphic,GraphicsLayer] = await loadModules(["esri/Map", "esri/views/MapView","esri/Graphic","esri/layers/GraphicsLayer",]); //load in the ArcGIS modules

      const map = new ArcGISMap({
        basemap: basemapSelection,
      });
      
      view = new MapView({    //create new map to assign map attributes
        container: mapRef.current!,
        map: map,
        zoom: 4,
        center: [15, 65],
      });

      const graphicsLayer = new GraphicsLayer();
      map.add(graphicsLayer); // attach layer to the map

      const climbGraphics = climbPointsObject.map((point) => {
        return new Graphic({
          geometry: {
            type: "point",
            longitude: point.geometry.longitude,
            latitude: point.geometry.latitude,
          },
          symbol: point.symbol,
          popupTemplate: point.popupTemplate,
        });
      });

      // Add theclimbGraphics to the view's GraphicsLayer
      graphicsLayer.addMany(climbGraphics);

      graphicsLayer.when(function(){
        view.extent = graphicsLayer.fullExtent;
      });
      
    };

    initializeMap();

    return () => view && view.destroy();  //Prevents memory leak
  }, [basemapSelection]);

  return (
    <div
      className="relative w-full h-screen" 
      style={{ // Prevent scrolling in both directions
        overflow: "hidden",}}> 
      
      {/* Map container */}
      <div ref={mapRef} className="w-full h-full rounded-xl shadow-lg" />

      {/* Button for changing basemap in the bottom-right corner */}
      <select name="basemapSelection" value={basemapSelection} onChange={handleBasemapChange} className="absolute bottom-20 right-6 bg-blue-500 text-white p-2 shadow-lg" style={{borderRadius: "8px"}} required>
        <option value="topo-vector">Topo</option>
        <option value="streets-navigation-vector">Navigation</option>
        <option value="osm">OSM</option>
        <option value="dark-gray-vector">Dark Gray</option>
      </select>
    </div>
  );
};

export default MapComponent;
