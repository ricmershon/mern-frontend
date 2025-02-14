import { UsersType } from "../types";
import UserItem from "./UserItem";

const UsersList = ({ users }: { users: UsersType }) => {
    if (users.length === 0) {
        return (
            <div>
                <h2>No users found.</h2>
            </div>
        )
    }

    return (
        <ul className="list-none p-0 w-[90%] max-w-[50rem] flex justify-center flex-wrap">
            {users.map((user) => (
                <UserItem
                    key={user.id}
                    id={user.id}
                    image={user.image}
                    name={user.name}
                    placeCount={user.placeCount}
                />
            ))}
        </ul>
    );
}

export default UsersList;