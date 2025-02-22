import { UserType } from "@/features/users/types";
import UserItem from "@/features/users/components/UserItem";
import Card from "@/shared/components/UIElements/Card";

const UsersList = ({ users }: { users: Array<UserType> }) => (
    <>
        {users.length === 0 ? (
            <div className="center-content">
                <Card>
                    <h2>No users found.</h2>
                </Card>
            </div>
        ) : (
            <ul className="list-none mx-auto my-0 p-0 w-[90%] max-w-[50rem] flex justify-center flex-wrap">
                {users.map((user) => (
                    <UserItem
                        key={user.id}
                        id={user.id}
                        imageUrl={user.imageUrl}
                        name={user.name}
                        placeCount={user.placeCount}
                    />
                ))}
            </ul>
        )}
    </>
)

export default UsersList;