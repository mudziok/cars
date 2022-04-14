import { LatLngBounds } from 'leaflet';
import { FC, useEffect, useState, } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet'
import { clusterVehicles, Vehicle } from '../hooks/useVehicles';
import { ClusterMarker } from '../vehicleMarker/clusterMarker';
import { MapDragListener } from './mapDragListener';
import { MapZoomListener } from './mapZoomListener';
import { VehicleMarker } from '../vehicleMarker/vehicleMarker';

interface VehicleMapProps {
  vehicles: Vehicle[]
}

export const VehicleMap:FC<VehicleMapProps> = ({vehicles}) => {
  const [bounds, setBounds] = useState<LatLngBounds | undefined>();
  const [zoom, setZoom] = useState<number>(13);

  const [clusteredVehicles, setClusteredVehicles] = useState<Vehicle[][]>([[]]);

  useEffect(() => {
    const isAtMaxZoomLevel = zoom === 18;
    
    if (bounds) {
      const newClusteredVehicles = clusterVehicles(vehicles, bounds, isAtMaxZoomLevel);
      setClusteredVehicles(newClusteredVehicles);
    }
  }, [vehicles, bounds, zoom]);

  const markers = clusteredVehicles.map(cluster => {
    switch (cluster.length) {
      case 0:
        return null;
      case 1:
        const vehicle = cluster[0];
        return <VehicleMarker key={vehicle.id} vehicle={vehicle} />
      default:
        return <ClusterMarker key={cluster[0].id} vehicles={cluster} />
    };
  });

  return (
    <div className='w-full h-full'>
      <MapContainer center={[52.229810, 21.011702]} zoom={zoom} whenCreated={map => setBounds(map.getBounds())}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers}
        <MapDragListener onDrag={setBounds}/>
        <MapZoomListener onZoom={setZoom}/>
      </MapContainer>
    </div>
  );
}