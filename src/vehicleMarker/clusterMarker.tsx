import { FC } from "react";
import { Marker, Popup } from "react-leaflet";
import { Vehicle } from "../hooks/useVehicles";

interface ClusterMarkerProps {
    vehicles: Vehicle[]
}

export const ClusterMarker:FC<ClusterMarkerProps> = ({vehicles}) => {
    const averageLatitude = vehicles.reduce((acc, cur) => acc + cur.location.latitude, 0) / vehicles.length;
    const averageLongitude = vehicles.reduce((acc, cur) => acc + cur.location.longitude, 0) / vehicles.length;

    return (
        <Marker 
            position={[averageLatitude, averageLongitude]}
            >
            <Popup>
                {vehicles.length} markers are here!
            </Popup>
        </Marker>
    )
}