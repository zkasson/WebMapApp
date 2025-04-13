import { setDefaultOptions } from "esri-loader"

export function configureArcGIS() {
  setDefaultOptions({
    url: "https://js.arcgis.com/4.27/",
    css: true,
  })

  // Set the API key
  if (typeof window !== "undefined") {
    ;(window as any).esriConfig = {
      apiKey: process.env.NEXT_PUBLIC_ARCGIS_API_KEY,
    }
  }
}

