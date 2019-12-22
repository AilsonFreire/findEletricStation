import { Region } from "./types/region";
import { Station } from "./types/station";

export const mapObjectToArray = <T>(param: T): T[] => Object.keys(param).map(key => param[key]);

const calculateSinCos = (originLat: number, targetLat: number, radTheta: number): number => (
    Math.sin(originLat) * Math.sin(targetLat) + Math.cos(originLat) * Math.cos(targetLat) * Math.cos(radTheta)
);

const coordinateToRad = (coordinate: number): number => ((Math.PI * coordinate) / 180);

const calculateDistance = (originLat: number, originLong: number, targetLat: number, targetLong: number): number => {
    const originLatRad = coordinateToRad(originLat);
    const targetLatRad = coordinateToRad(targetLat);
    const theta = originLong - targetLong;
    const radTheta = coordinateToRad(theta);
    let distanceOriginTarget = calculateSinCos(originLatRad, targetLatRad, radTheta);
    distanceOriginTarget = Math.acos(distanceOriginTarget);
    distanceOriginTarget = distanceOriginTarget * 180 / Math.PI;
    distanceOriginTarget = distanceOriginTarget * 60 * 1.1515;
    distanceOriginTarget = distanceOriginTarget * 1.609344;
    return Number(distanceOriginTarget.toFixed(2));
};


export const filterStationsNearbyByDistance = (region: Region, stations: Station[], distance: number): Station[] => stations.filter((station: Station) => calculateDistance(region.latitude, region.longitude, station.geo.lat, station.geo.long) <= distance);

export const markerColor = (status: string, canControl: boolean): string => {
    if (status === "AVAILABLE") return "green";
    else if (status !== "AVAILABLE" && canControl) return "red";

    return "red";
};