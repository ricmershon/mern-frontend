export interface UserType {
    id?: string,
    name: string,
    image: string,
    placeCount: number
}

export type UsersType = Array<UserType>;