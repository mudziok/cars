import { FC } from "react";
import { Marker, Popup } from "react-leaflet";
import { Vehicle } from "../hooks/useVehicles";
import carImage from "../content/car.jpg";
import { Icon, PointTuple } from "leaflet";

const iconSize = {
    iconSize: [25, 41] as PointTuple,
    iconAnchor: [12, 41] as PointTuple,
    popupAnchor: [1, -34] as PointTuple,
    shadowSize: [41, 41] as PointTuple,
};

const availableIcon = new Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    ...iconSize,
});

const busyIcon = new Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    ...iconSize,
});

interface VehicleMarkerProps {
    vehicle: Vehicle
}

export const VehicleMarker:FC<VehicleMarkerProps> = ({vehicle}) => {
    const {name, location, batteryLevelPct, status, type, platesNumber} = vehicle;

    return (
        <Marker 
            position={[location.latitude, location.longitude]}
            icon={status === 'AVAILABLE' ? availableIcon : busyIcon}
            >
            <Popup>
                <div className="w-60 flex gap-2">
                    <div className="w-1/2 flex flex-col justify-center items-center">
                        <img src={carImage} alt={name}/>
                        <span className="m-2 border-2 border-slate-900 rounded-lg p-1 font-bold text-lg">{platesNumber}</span>
                    </div>
                    <div className="w-1/2">
                        <h5 className="text-xl">{name}</h5>
                        <div>{type} | {status}</div>
                        <div className="mt-2">🔋 Battery {batteryLevelPct}</div>
                    </div>
                </div>
            </Popup>
        </Marker>
    )
}