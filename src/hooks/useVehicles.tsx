import { LatLngBounds } from "leaflet";
import { useState } from "react";
import vehicleJSON from "../content/vehicles.json"

export interface Vehicle {
    name: string,
    id: string,
    batteryLevelPct: number,
    location: {
        latitude: number,
        longitude: number,
    },
    type: string,
    status: string,
    platesNumber: string,
}

const horizontalSegments = 5;
const verticalSegments = 5;

export const clusterVehicles = (vehicles: Vehicle[], bounds: LatLngBounds, forceUnclustered: boolean) => {
    const visibleVehicles = vehicles.filter(vehicle => {
        const visibleHorizontally = bounds.getWest() < vehicle.location.longitude && vehicle.location.longitude < bounds.getEast();
        const visibleVertically = bounds.getSouth() < vehicle.location.latitude && vehicle.location.latitude < bounds.getNorth();
        
        return visibleHorizontally && visibleVertically;
    });
    
    if (forceUnclustered) return visibleVehicles.map(vehicle => [vehicle]);

    const clusters: Vehicle[][][] = Array(horizontalSegments).fill(null).map(row => Array(verticalSegments).fill(null).map(_ => []));

    const latitudeLength = bounds.getNorth() - bounds.getSouth();
    const longitudeLength = bounds.getEast() - bounds.getWest();

    visibleVehicles.forEach(vehicle => {
      const screenLatitude = (vehicle.location.latitude - bounds.getSouth()) / latitudeLength;
      const screenLongitude = (vehicle.location.longitude - bounds.getWest()) / longitudeLength;
      
      const latitudeIndex = Math.floor(screenLatitude * verticalSegments);
      const longitudeIndex = Math.floor(screenLongitude * horizontalSegments);
      
      clusters[latitudeIndex][longitudeIndex].push(vehicle);
    });

    return clusters.flat();
  };

export const useVehicles = () => {
    const [vehicles] = useState<Vehicle[]>(vehicleJSON.objects);

    return vehicles;
};