import api from "../baseURL";

/**
 * - function that communicate with the API to get the list of stations
 * @returns - the list of stations
 */
export const getStations = async () => {
    try {
        return await api.get("/stations").then(response => response);
    } catch (error) {
        return error;
    }
};

/**
 * - function that get details of an especific station by id
 * @param id - id of the station
 * @returns - the details of the station
 */
export const getStationById = async (id: string) => {
    try {
        return await api.get(`/stations/${id}`).then(response => response);
    } catch (error) {
        return error;
    }
};