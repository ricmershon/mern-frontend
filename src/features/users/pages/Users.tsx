import { UserTypeArray } from "@/features/users/types";
import UsersList from "@/features/users/components/UsersList";

const USERS: UserTypeArray = [
    {
        id: 'u1',
        name: 'Ric Mershon',
        imageUrl: 'https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        placeCount: 3
    }
];

const Users = () => {

    return (
        <UsersList users={USERS}/>
    );
}

export default Users;