import { FormEvent } from "react";
import { useParams } from "react-router-dom";

import { RouterParams } from "@/types";
import { PlaceType } from "../types";
import { FormState } from "@/shared/types";
import useForm from "@/shared/hooks/UseForm";
import { ValidatorRequire, ValidatorMinLength } from "@/shared/utils/validators";
import Input, { InputChangeHandler } from "@/shared/components/FormElements/Input";
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

    const [formState, handleInputChange] = useForm({
        title: { value: selectedPlace!.title, isValid: true },
        description: { value: selectedPlace!.description, isValid: true }
    }, true);

    console.log('^^^ FORM STATE ^^^', formState)
    
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("^^^ STATE ^^^\n", formState);
    }

    return (
        <form
            action=""
            className="place-form"
            onSubmit={handleSubmit}
        >
            <Input
                id="title"
                inputType="input"
                type="text"
                label="Title"
                validators={[ValidatorRequire()]}
                onChange={handleInputChange as InputChangeHandler}
                errorText="Please enter a valid title."
                initialValue={(formState as FormState).inputs.title.value}
                initialValid={(formState as FormState).inputs.title.isValid}
            >
            </Input>
            <Input
                id="description"
                inputType="textarea"
                type="text"
                label="Description"
                validators={[ValidatorMinLength(5)]}
                onChange={handleInputChange as InputChangeHandler}
                errorText="Please enter a valid description with at least 5 characters."
                initialValue={(formState as FormState).inputs.description.value}
                initialValid={(formState as FormState).inputs.description.isValid}
            >
            </Input>
            <Button type="submit" disabled={!(formState as FormState).isValid}>UPDATE PLACE</Button>

        </form>
    )
    return <h1>Hello update place</h1>
}

export default UpdatePlace;