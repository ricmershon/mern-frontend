import { useParams } from "react-router-dom";

import { RouterParams } from "@/types";
import { PlaceType } from "../types";
import { ValidatorRequire, ValidatorMinLength } from "@/shared/utils/validators";
import Input from "@/shared/components/FormElements/Input";
import Button from "@/shared/components/FormElements/Button";

const PLACES: Array<PlaceType> = [
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


const UpdatePlace = (props) => {
    const params: RouterParams = useParams();
    const { placeId } = params;

    const selectedPlace = PLACES.find((place) => place.id === placeId);

    if (!selectedPlace) {
        return <div className="center-content"><h2>Place Not Found</h2></div>
    }

    return (
        <form
            action=""
            className="place-form"
        >
            <Input
                id="title"
                inputType="input"
                type="text"
                label="Title"
                validators={[ValidatorRequire()]}
                onChange={() => console.log('NOTHING')}
                errorText="Please enter a valid title."
                inputValue={selectedPlace.title}
                valid={true}
            >
            </Input>
            <Input
                id="description"
                inputType="textarea"
                type="text"
                label="Description"
                validators={[ValidatorMinLength(5)]}
                onChange={() => console.log('NOTHING')}
                errorText="Please enter a valid description with at least 5 characters."
                inputValue={selectedPlace.description}
                valid={true}
            >
            </Input>
            <Button type="submit" disabled={true}>UPDATE PLACE</Button>

        </form>
    )
    return <h1>Hello update place</h1>
}

export default UpdatePlace;