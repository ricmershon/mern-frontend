import { UsersType } from "../types";
import UsersList from "../components/UsersList";

const Users = () => {
    const USERS: UsersType = [{
        id: 'u1', name: 'Ric Mershon', url: "dummy", places: 3
    }];

    return (
        <UsersList users={USERS}/>
    );
}

export default Users;