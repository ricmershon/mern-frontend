import { useState, useEffect } from "react";

import { UserType, ErrorMessage } from "@/types";
import UsersList from "@/features/users/components/UsersList";
import ErrorModal from "@/shared/components/UIElements/Modal/ErrorModal";
import LoadingSpinner from "@/shared/components/UIElements/LoadingSpinner";

const Users = () => {
    const [users, setUsers] = useState<Array<UserType>>([{}]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<ErrorMessage>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('http://localhost:5001/api/users');
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.message);
                }
                setUsers(data.users);              
            } catch (error) {
                setError(error.message || 'Something went wrong with getting users');
            } finally {
                setIsLoading(false);
            }
        };
        fetchUsers();
    }, [])

    return (
        <>
            {error && <ErrorModal error={error} onClear={() => setError(null)} />}
            {isLoading ? (
                <div className="center-content">
                    <LoadingSpinner asOverlay={true} />
                </div>
            ) : (
                <UsersList users={users}/>
            )}
        </>
    );
}

export default Users;