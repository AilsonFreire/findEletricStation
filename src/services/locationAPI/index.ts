import { PermissionsAndroid, Platform } from "react-native";
import Geolocation from "react-native-geolocation-service";

const requestLocationPermission = async () => {

    if (Platform.OS === "android") {
        if (Platform.Version < 23) {
            return true;
        }

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
    //ios only
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

export const getUserLocation = async () => {
    const hasLocationPermission = await requestLocationPermission();

    if (!hasLocationPermission) return "Error: Você precisa habilitar a localização do aplicativo.";

    const options = { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }

    const getPosition = (value: object) => {
        return new Promise((res, rej) => Geolocation.getCurrentPosition(res, rej, value));
    };

    return getPosition(options).then((position => position))
        .catch((error) => {
            if (error.code === 4) return "Error: Você precisa atulizar sua versão do Google play service.";
            else return "Error: Não possível acessar sua localização";
        });
};