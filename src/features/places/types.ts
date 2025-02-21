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

export type PlaceTypeArray = Array<PlaceType>;

export interface PlacesRouterParams {
    userId: string;
}