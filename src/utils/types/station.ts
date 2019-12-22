export type Station = {
    id: number,
    status: string,
    geo: {
        lat: number,
        long: number
    },
    energyPrice: number,
    name: string,
    description: string,
    openHours: string,
    address: {
        street: string,
        streetNumber: number,
        city: string,
        state: string,
    },
    canControl: boolean
};