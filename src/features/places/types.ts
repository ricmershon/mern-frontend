export interface Location {
    lat: number;
    lng: number;
}

export interface PlaceType {
    id: string;
    imageUrl: string;
    title: string;
    description: string;
    address: string;
    creator: string;
    location: Location;
}