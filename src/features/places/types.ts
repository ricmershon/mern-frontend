export interface PlaceType {
    id: string;
    imageUrl: string;
    title: string;
    description: string;
    address: string;
    creator: string;
    location: {
        lat: number;
        lng: number;
    };
}

export type PlaceTypeArray = Array<PlaceType>;

export interface PlacesRouteParams {
    userId: string;
}