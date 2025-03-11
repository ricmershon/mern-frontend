import { FormEvent } from "react";
import { useHistory } from "react-router-dom";

import { ValidatorMinLength, ValidatorRequire } from "@/shared/utils/validators";
import { useAuthContext } from "@/shared/context/auth-context";
import useForm from "@/shared/hooks/use-form";
import useFetch from "@/shared/hooks/use-fetch";
import Input from "@/shared/components/FormElements/Input";
import Button from "@/shared/components/FormElements/Button";
import ErrorModal from "@/shared/components/UIElements/Modal/ErrorModal";
import LoadingSpinner from "@/shared/components/UIElements/LoadingSpinner";

const NewPlace = () => {
    const history = useHistory();
    const authContext = useAuthContext();
    const [isLoading, error, sendRequest, clearError] = useFetch();
    const [formState, handleInputChange] = useForm({
        title: { value: '', isValid: false },
        description: { value: '', isValid: false }
    }, false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await sendRequest(
                'http://localhost:5001/api/places',
                'POST',
                JSON.stringify({
                    title: formState.inputs.title.value,
                    description: formState.inputs.description.value,
                    address: formState.inputs.address.value,
                    creator: authContext.userId,
                    image: 'someurl'
                }),
                { 'Content-Type': 'application/json' }
            );
            history.push('/')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <ErrorModal error={error} onClear={clearError} />
            <form onSubmit={handleSubmit} className="place-form">
                {isLoading && <LoadingSpinner asOverlay={true} />}
                <Input
                    id="title"
                    inputType="input"
                    type="text"
                    label="Title"
                    validators={[ValidatorRequire()]}
                    onChange={handleInputChange}
                    errorText="Please enter a valid title."
                />
                <Input
                    id="description"
                    inputType="textarea"
                    label="Description"
                    validators={[ValidatorMinLength(5)]}
                    onChange={handleInputChange}
                    errorText="Please enter a valid description with at least 5 characters."
                />
                <Input
                    id="address"
                    inputType="input"
                    label="Address"
                    validators={[ValidatorRequire()]}
                    onChange={handleInputChange}
                    errorText="Please enter a valid address."
                />
                <Button type="submit" disabled={!formState.isValid}>ADD PLACE</Button>
            </form>
        </>
    )
}

export default NewPlace;