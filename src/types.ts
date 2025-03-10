export interface RouterParams {
    userId: string;
    placeId: string
}

export type ErrorMessage = {message: string} | null;

export interface RequestBody {
    name: string;
    email: string;
    password: string;
    imageUrl: string;
    places: Array<PlaceType>;
}

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

export interface UserType {
    id?: string;
    name?: string;
    imageUrl?: string;
    places?: Array<PlaceType>;
}

export interface FieldInput {
    value: string;
    isValid: boolean
}

export type FormInputs = { [key: string]: FieldInput }

export interface FormState {
    inputs: FormInputs;
    isValid: boolean;
}