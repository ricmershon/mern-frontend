import { useEffect, FormEvent, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import { RouterParams, PlaceType } from "@/types";
import { ValidatorRequire, ValidatorMinLength } from "@/shared/utils/validators";
import { useAuthContext } from "@/shared/context/auth-context";
import useFetch from "@/shared/hooks/use-fetch";
import useForm from "@/shared/hooks/use-form";
import Input from "@/shared/components/FormElements/Input";
import Button from "@/shared/components/FormElements/Button";
import Card from "@/shared/components/UIElements/Card";
import ErrorModal from "@/shared/components/UIElements/Modal/ErrorModal";
import LoadingSpinner from "@/shared/components/UIElements/LoadingSpinner";

const UpdatePlace = () => {
    const { placeId }: RouterParams = useParams();
    const history = useHistory();

    const authContext = useAuthContext();
    const [place, setPlace] = useState<PlaceType>();
    const [isLoading, error, sendRequest, clearError] = useFetch();
    const [formState, handleInputChange, setFormData] = useForm({
        title: { value: '', isValid: false },
        description: { value: '', isValid: false }
    }, false);

    useEffect(() => {
        const fetchPlace = async () => {
            try {
                const data = await sendRequest(`http://localhost:5001/api/places/${placeId}`);
                setPlace(data.place)
                setFormData({
                    title: { value: data.place!.title, isValid: true },
                    description: { value: data.place!.description, isValid: true }
                }, true);
            } catch (error) {
                console.log(error);
            }
        }
        fetchPlace();
    }, [placeId, sendRequest, setFormData]);
    
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            await sendRequest(
                `http://localhost:5001/api/places/${placeId}`,
                'PATCH',
                JSON.stringify({
                    title: formState.inputs.title.value,
                    description: formState.inputs.description.value
                }),
                { 'Content-Type': 'application/json' }
            );
            history.push(`/${authContext.userId}/places`)
        } catch (error) {
            console.log(error);
        }
    }

    if (isLoading) {
        return <LoadingSpinner asOverlay={true} />;
    }

    if (!place && !error) {
        return (
            <div className='center'>
                <Card>
                    <h2>Could not find place!</h2>
                </Card>
            </div>
        )
    }

    return (
        <>
            <ErrorModal error={error} onClear={clearError} />
            {!isLoading && place && (
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
                        onChange={handleInputChange}
                        errorText="Please enter a valid title."
                        initialValue={place.title}
                        initialValid={true}
                    >
                    </Input>
                    <Input
                        id="description"
                        inputType="textarea"
                        type="text"
                        label="Description"
                        validators={[ValidatorMinLength(5)]}
                        onChange={handleInputChange}
                        errorText="Please enter a valid description with at least 5 characters."
                        initialValue={place.description}
                        initialValid={true}
                    >
                    </Input>
                    <Button type="submit" disabled={!formState.isValid}>UPDATE PLACE</Button>
                </form>
            )}
        </>
    );
}

export default UpdatePlace;