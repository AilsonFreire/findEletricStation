import { Position } from "@utils/types/postion";
import { PermissionsAndroid, Platform } from "react-native";
import Geolocation, { GeoError } from "react-native-geolocation-service";

type Options = {
    enableHighAccuracy: boolean,
    timeout: number,
    maximumAge: number
};

type Error = {
    code: number
};

/**
 *  - Function that checks the permissions from user to get his device location
 * @returns - true or false if permissions has granted
 */
const requestLocationPermission = async (): Promise<boolean> => {

    if (Platform.OS === "android") {
        if (Platform.Version < 23) return true;

        const hasPermission = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );

        if (hasPermission) return true;

        const status = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );

        if (status === PermissionsAndroid.RESULTS.GRANTED) return true;

        if (status === PermissionsAndroid.RESULTS.DENIED) {
            return false;
        } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
            return false;
        }

        return false;

    }

    return false;
    // ios only
    // else {
    //     return Permissions.check("location", "whenInUse").then(async (response: string) => {
    //         if (response === "undetermined") {
    //             return Permissions.request("location", "whenInUse").then((res: string) => {
    //                 if (res === "authorized") {
    //                     return true;
    //                 } else {
    //                     return false;
    //                 }
    //             });
    //         } else if (response === "authorized") {
    //             return true;
    //         } else if (response === "denied" || "restricted") {
    //             return false;
    //         }
    //     });
    // }
};

/**
 * - Funcition that checks if user has granted the permissions to get location and returns the current position
 * @returns - strig with error message or the object with user's location
 */
export const getUserLocation = async () => {
    const hasLocationPermission = await requestLocationPermission();

    if (!hasLocationPermission) return "Error: Você precisa habilitar a localização do aplicativo.";

    const options: Options = { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 };

    const getPosition = (param: Options): Promise<Position> => {
        return new Promise<Position>((res, rej) => Geolocation.getCurrentPosition(res, rej, param));
    };

    return getPosition(options).then((position: Position) => position)
        .catch((error: GeoError) => {
            if (error.code === 4) return "Error: Você precisa atulizar sua versão do Google play service.";
            else return "Error: Não possível acessar sua localização";
        });
};