export interface UserType {
    id?: string;
    name: string;
    imageUrl: string;
    placeCount: number;
}

export type UserTypeArray = Array<UserType>;