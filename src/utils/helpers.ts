import { Region } from "./types/region";
import { Station } from "./types/station";

export const mapObjectToArray = <T>(param: T): T[] => Object.keys(param).map(key => param[key]);

const calculateckDistance = (originLat: number, targetLat: number, radTheta: number): number => (
    Math.sin(originLat) * Math.sin(targetLat) + Math.cos(originLat) * Math.cos(targetLat) * Math.cos(radTheta)
);

const coordinateToRad = (coordinate: number): number => ((Math.PI * coordinate) / 180);

export const filterStationsNearbyByDistance = (region: Region, stations: Station[], distance: number): Station[] => stations.filter((station: Station) => {
    const originLat = coordinateToRad(region.latitude);
    const originLong = coordinateToRad(region.longitude);
    const targetLat = coordinateToRad(station.geo.lat);
    const targetLong = coordinateToRad(station.geo.long);
    const theta = region.longitude - station.geo.long;
    const radTheta = coordinateToRad(theta);
    const distanceOriginTarget = calculateckDistance(originLat, targetLat, radTheta);

    console.log(distanceOriginTarget)
});

export const markerColor = (status: string, canControl: boolean): string => {
    if (status === "AVAILABLE") return "green";
    else if (status !== "AVAILABLE" && canControl) return "red";

    return "red";
};