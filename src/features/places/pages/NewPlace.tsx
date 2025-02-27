import { FormEvent } from "react";

import { ValidatorMinLength, ValidatorRequire } from "@/shared/utils/validators";
import useForm from "@/shared/hooks/use-form";
import Input from "@/shared/components/FormElements/Input";
import Button from "@/shared/components/FormElements/Button";

const NewPlace = () => {
    const [formState, handleInputChange] = useForm({
        title: { value: '', isValid: false },
        description: { value: '', isValid: false }
    }, false);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("^^^ NEW PLACE ^^^\n", formState);
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="place-form"
        >
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
    )
}

export default NewPlace;