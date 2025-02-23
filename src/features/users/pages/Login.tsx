import { useState, FormEvent } from "react";

import { ValidatorMinLength, ValidatorEmail, ValidatorRequire } from "@/shared/utils/validators";
import useForm from "@/shared/hooks/use-form";
import Card from "@/shared/components/UIElements/Card";
import Input from "@/shared/components/FormElements/Input";
import Button from "@/shared/components/FormElements/Button";

const Login = () => {
    const [isLoginMode, setIsLoginMode] = useState(true);

    const [formState, handleInputChange, loadFormData] = useForm({
        email: { value: '', isValid: false },
        password: { value: '', isValid: false }
    }, false);

    const handleModeSwitch = () => {
        if (!isLoginMode) {
            if ('name' in formState) {
                delete formState['name']
            };
            loadFormData(
                { ...formState.inputs },
                formState.inputs.email.isValid && formState.inputs.password.isValid
            );
        } else {
            loadFormData(
                {
                    ...formState.inputs,
                    name: { value: '', isValid: false }
                },
                false
            );
        }
        setIsLoginMode((prevState) => !prevState)
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('^^^ LOGGING IN ^^^\n', formState);
    }

    return (
        <Card className="w-9/10 max-w-[25rem] my-28 py-8 px-6 mx-auto text-center bg-white">
            <h2 className="mb-4">Login Required</h2>
            <hr />
            <form
                onSubmit={handleSubmit}
            >
                {!isLoginMode && (
                    <Input
                        id="name"
                        inputType="input"
                        type="text"
                        label="Name"
                        validators={[ValidatorRequire()]}
                        onChange={handleInputChange}
                        errorText="Please enter a name."
                    />
                )}
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
                    label="Password"
                    validators={[ValidatorMinLength(6)]}
                    onChange={handleInputChange}
                    errorText="Please enter a valid password with at least 6 characters."
                />
                <Button type="submit" disabled={!formState.isValid}>
                    {isLoginMode ? "LOGIN" : "SIGNUP"}
                </Button>
            </form>
            <Button inverse={true} onClick={handleModeSwitch}>
                SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
            </Button>
        </Card>
    );
}

export default Login;