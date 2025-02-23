import { FormEvent } from "react";

import { ValidatorMinLength, ValidatorEmail } from "@/shared/utils/validators";
import useForm from "@/shared/hooks/UseForm";
import Card from "@/shared/components/UIElements/Card";
import Input from "@/shared/components/FormElements/Input";
import Button from "@/shared/components/FormElements/Button";

const Login = () => {
    const [formState, handleInputChange] = useForm({
        email: { value: '', isValid: false },
        password: { value: '', isValid: false }
    }, false);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('^^^ LOGGING IN ^^^\n', formState);
    }

    return (
        <Card className="w-9/10 max-w-[25rem] my-28 mx-auto text-center">
            <h2>Login Required</h2>
            <hr />
            <form
                onSubmit={handleSubmit}
                className="mb-4"
            >
                <Input
                    id="email"
                    inputType="input"
                    type="email"
                    label="Email"
                    validators={[ValidatorEmail()]}
                    onChange={handleInputChange}
                    errorText="Please enter a valid email address."
                />
                <Input
                    id="password"
                    inputType="input"
                    type="password"
                    label="password"
                    validators={[ValidatorMinLength(6)]}
                    onChange={handleInputChange}
                    errorText="Please enter a valid password with at least 6 characters."
                />
                <Button type="submit" disabled={!formState.isValid}>LOGIN</Button>
            </form>
        </Card>
    );
}

export default Login;