import { useState, useEffect } from "react";

import { UserType } from "@/types";
import useFetch from "@/shared/hooks/use-fetch";
import UsersList from "@/features/users/components/UsersList";
import ErrorModal from "@/shared/components/UIElements/Modal/ErrorModal";
import LoadingSpinner from "@/shared/components/UIElements/LoadingSpinner";

const Users = () => {
    const [users, setUsers] = useState<Array<UserType>>([{}]);
    const [isLoading, error, sendRequest, clearError] = useFetch();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await sendRequest('http://localhost:5001/api/users');
                setUsers(data.users);
            } catch (error) {
                console.log(error.message || 'Something went wrong with getting users');
            } 
        };
        fetchUsers();
    }, [sendRequest])

    return (
        <>
            {error && <ErrorModal error={error} onClear={clearError} />}
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