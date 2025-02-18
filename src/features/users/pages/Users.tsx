import { UserTypeArray } from "@/features/users/types";
import UsersList from "@/features/users/components/UsersList";

const Users = () => {
    const USERS: UserTypeArray = [{
        id: 'u1', name: 'Ric Mershon', image: "https://fastly.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI", placeCount: 3
    }];

    return (
        <UsersList users={USERS}/>
    );
}

export default Users;