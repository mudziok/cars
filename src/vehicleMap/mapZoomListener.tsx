import { FC } from "react"
import { Map } from "leaflet";
import { useMapEvents } from "react-leaflet";

interface MapZoomListenerProps {
    onZoom: (zoom: number) => void
}

export const MapZoomListener:FC<MapZoomListenerProps> = ({onZoom}) => {
    useMapEvents({
        zoomend: (event) => {
            const zoom = (event.target as Map).getZoom();
            onZoom(zoom);
        }
    })
    return null;
}