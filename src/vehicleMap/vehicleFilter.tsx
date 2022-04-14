import { FC, useEffect, useState } from "react";
import { CheckboxList } from "../common/checkboxList";
import { Vehicle } from "../hooks/useVehicles";

interface VehicleFilterProps {
    vehicles: Vehicle[],
    onChangeFiltered: (filteredVehicles: Vehicle[]) => void
}

export const VehicleFilter:FC<VehicleFilterProps> = ({vehicles, onChangeFiltered}) => {
    const [minBatteryLevel, setMinBatteryLevel] = useState(80);
    const [requiredType, setRequiredType] = useState<string[]>(["CAR", "TRUCK"]);
    const [avaliability, setAvaliability] = useState<string[]>(["AVAILABLE"]);

    useEffect(() => {
        const filtered = vehicles
            .filter(vehicle => vehicle.batteryLevelPct > minBatteryLevel)
            .filter(vehicle => requiredType.includes(vehicle.type))
            .filter(vehicle => avaliability.includes(vehicle.status));

        onChangeFiltered(filtered);
    }, [vehicles, onChangeFiltered, minBatteryLevel, requiredType, avaliability]);

    return (
        <div className="w-full h-full p-2 flex flex-col gap-4">
            <h3 className="text-2xl font-bold">Search Filters</h3>
            <div>
                <span className="text-lg">Minimum Battery Level</span>
                <span className="flex w-full gap-4">
                    <input className="w-full" type="range" min={0} max={100} value={minBatteryLevel} onChange={e => setMinBatteryLevel(+e.target.value)}/>
                    {minBatteryLevel}%
                </span>
            </div>
            <div className="flex flex-col">
                <span className="text-lg">Type</span>
                <CheckboxList avaliable={["CAR", "TRUCK"]} checked={requiredType} onCheckedChange={setRequiredType}/>
            </div>
            <div className="flex flex-col">
                <span className="text-lg">Avaliability</span>
                <CheckboxList avaliable={["AVAILABLE", "UNAVAILABLE"]} checked={avaliability} onCheckedChange={setAvaliability}/>
            </div>
        </div>
    );
}