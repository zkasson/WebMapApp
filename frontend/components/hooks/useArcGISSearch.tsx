import { useEffect, useRef } from "react"
import { loadModules } from "esri-loader"
import type { Location } from "@/types/climb"

export function useArcGISSearch(onSearchAction: (location: Location) => void) {
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
                });

                searchWidget.on("select-result", (event: any) => {
                    const { result } = event
                    if (result && result.feature) {
                        const { geometry } = result.feature
                        setClimbData((prevData) => ({
                        ...prevData,
                        latitude: geometry.latitude.toString(),
                        longitude: geometry.longitude.toString(),
                        }))
                        onSearchAction({ latitude: geometry.latitude, longitude: geometry.longitude })
                    }
                });
            }catch (error) {
                console.error("Error initializing search widget:", error)
            };

        }

        initializeSearch()


        return () => {
            if (searchWidget) {
              searchWidget.destroy()
            }
          }
    }, [onSearchAction]);
      
    return searchInputRef
};
