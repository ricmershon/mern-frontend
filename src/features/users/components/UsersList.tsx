import { UserTypeArray } from "@/features/users/types";
import UserItem from "@/features/users/components/UserItem";
import Card from "@/shared/components/UIElements/Card";

const UsersList = ({ users }: { users: UserTypeArray }) => {
    if (users.length === 0) {
        return (
            <div>
                <Card>
                    <h2>No users found.</h2>
                </Card>
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