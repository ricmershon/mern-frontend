interface UserType {
    id: string,
    name: string,
    image: string,
    places: number
}

export type UsersType = Array<UserType>;