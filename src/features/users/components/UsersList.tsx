import { UsersType } from "../types";
import UserItem from "./UserItem";

interface UsersListProps {
    users: UsersType
}

const UsersList = ({ users }: UsersListProps) => {
    if (users.length === 0) {
        return (
            <div className="text-center flex justify-center items-center">
                <h2>Now users found.</h2>
            </div>
        )
    }

    return (
        <ul>
            {users.map((user) => (
                <UserItem
                    key={user.id}
                    id={user.id}
                    image={user.image}
                    name={user.name}
                    placeCount={user.places}
                />
            ))}
        </ul>
    );
}

export default UsersList;