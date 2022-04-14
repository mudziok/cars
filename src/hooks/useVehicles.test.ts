import { clusterVehicles, Vehicle } from "./useVehicles";
import vehicleJSON from "../content/vehicles.json"
import {LatLngBounds } from "leaflet";

describe("clusterVehicles", () => {
    const vehicles = vehicleJSON.objects;

    const boundsSmall: LatLngBounds = new LatLngBounds([52.191722758360974, 20.92764079097529], [52.19486316680872, 20.932200546300606]);
    const boundsLarge: LatLngBounds = new LatLngBounds([52.18715479447361, 20.921337676455686], [52.19971638785918, 20.939576697756955]);
    
    const countNonEmptyClusters = (clusters: Vehicle[][]): number => {
        const nonEmptyClusters = clusters.filter(cluster => cluster.length !== 0);
        return nonEmptyClusters.length;
    }

    it("should not cluster when looking from upclose", () => {
        const clusteredVehicles = clusterVehicles(vehicles, boundsSmall, false);

        expect(countNonEmptyClusters(clusteredVehicles)).toEqual(3);
    });

    it("should not cluster when it's forced not to", () => {
        const clusteredVehicles = clusterVehicles(vehicles, boundsLarge, true).flat();
        expect(clusteredVehicles).toEqual(vehicles);
    });

    it("should cluster into one when looking from a far", () => {
        const clusteredVehicles = clusterVehicles(vehicles, boundsLarge, false);
        
        expect(countNonEmptyClusters(clusteredVehicles)).toEqual(1);
    });
});