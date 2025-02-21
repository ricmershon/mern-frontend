import { useParams } from "react-router-dom";

import PlacesList from "@/features/places/components/PlacesList";
import { PlacesRouterParams, PlaceTypeArray } from "@/features/places/types";

const PLACES: PlaceTypeArray = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'One of the most famous sky scrapers in the world!',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
        address: '20 W 34th St, New York, NY 10001',
        location: {
            lat: 40.7484405,
            lng: -73.9878584
        },
        creator: 'u1'
    },
    {
        id: 'p2',
        title: 'Empire State Building',
        description: 'One of the most famous sky scrapers in the world!',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
        address: '20 W 34th St, New York, NY 10001',
        location: {
            lat: 40.7484405,
            lng: -73.9878584
        },
        creator: 'u2'
    }
];

const UserPlaces = () => {
    const params: PlacesRouterParams = useParams();
    const placesToLoad = PLACES.filter((place) => (
        place.creator === params.userId
    ));
    
    return (
        <PlacesList places={placesToLoad} />
    );
}

export default UserPlaces;