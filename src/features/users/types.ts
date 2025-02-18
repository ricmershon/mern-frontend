export interface UserType {
    id?: string,
    name: string,
    image: string,
    placeCount: number
}

export type UserTypeArray = Array<UserType>;