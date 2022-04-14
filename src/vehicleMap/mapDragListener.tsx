import { FC } from "react"
import { LatLngBounds, LeafletEvent } from "leaflet";
import { useMapEvents } from "react-leaflet";

interface MapDragListenerProps {
    onDrag: (bounds: LatLngBounds) => void
}

export const MapDragListener:FC<MapDragListenerProps> = ({onDrag}) => {
    const dragCallback = (event: LeafletEvent) => {
        const bounds = event.target.getBounds();
        onDrag(bounds);
    }

    useMapEvents({
        resize: dragCallback,
        dragend: dragCallback,
        zoomend: dragCallback,
    })
    return null;
}