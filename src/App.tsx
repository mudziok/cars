import { FC, useState } from 'react';
import { useVehicles, Vehicle } from './hooks/useVehicles';
import { VehicleFilter } from './vehicleMap/vehicleFilter';
import { VehicleMap } from './vehicleMap/vehicleMap';

const App:FC = () => {
    const vehicles = useVehicles();
    const [filtered, setFiltered] = useState<Vehicle[]>([]);

    return (
    <div className='fixed top-0 bottom-0 left-0 right-0 flex flex-col-reverse sm:flex-row'>
        <aside className='w-full h-96 sm:w-96 sm:h-full overflow-y-auto'>
            <VehicleFilter vehicles={vehicles} onChangeFiltered={setFiltered}/>
        </aside>
        <main className='w-full h-full'>
            <VehicleMap vehicles={filtered}/>
        </main>
    </div>
    );
}

export default App;
