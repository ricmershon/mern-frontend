import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { RouterParams, PlaceType } from "@/types";
import useFetch from "@/shared/hooks/use-fetch";
import PlacesList from "@/features/places/components/PlacesList";
import ErrorModal from "@/shared/components/UIElements/Modal/ErrorModal";
import LoadingSpinner from "@/shared/components/UIElements/LoadingSpinner";

const UserPlaces = () => {
    const params: RouterParams = useParams();
    const [places, setPlaces] = useState<Array<PlaceType>>([]);
    const [isLoading, error, sendRequest, clearError] = useFetch();

    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const data = await sendRequest(`http://localhost:5001/api/places/user/${params.userId}`)
                setPlaces(data.places);
            } catch (error) {
                console.log(error.message || 'Something went wrong with getting users');
            }
        };
        fetchPlaces()
    }, [params.userId, sendRequest])
    
    return (
        <>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading ? (
                <LoadingSpinner asOverlay={true} />
            ) : (
                <PlacesList places={places} />
            )}
        </>
    );
}

export default UserPlaces;