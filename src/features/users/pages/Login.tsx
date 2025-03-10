import { useState, FormEvent } from "react";

import { ValidatorMinLength, ValidatorMaxLength, ValidatorEmail, ValidatorRequire } from "@/shared/utils/validators";
import { useAuthContext } from "@/shared/context/auth-context";
import useForm from "@/shared/hooks/use-form";
import useFetch from "@/shared/hooks/use-fetch";
import Card from "@/shared/components/UIElements/Card";
import Input from "@/shared/components/FormElements/Input";
import Button from "@/shared/components/FormElements/Button";
import ErrorModal from "@/shared/components/UIElements/Modal/ErrorModal";
import LoadingSpinner from "@/shared/components/UIElements/LoadingSpinner";

const Login = () => {
    const authContext = useAuthContext();
    const [isLoginMode, setIsLoginMode] = useState(true);

    const [isLoading, error, sendRequest, clearError] = useFetch();
    const [formState, handleInputChange, setFormData] = useForm({
        email: { value: '', isValid: false },
        password: { value: '', isValid: false }
    }, false);


    const handleModeSwitch = () => {
        if (!isLoginMode) {
            if ('name' in formState) {
                delete formState['name']
            };
            setFormData(
                { ...formState.inputs },
                formState.inputs.email.isValid && formState.inputs.password.isValid
            );
        } else {
            setFormData(
                {
                    ...formState.inputs,
                    name: { value: '', isValid: false }
                },
                false
            );
        }
        setIsLoginMode((prevState) => !prevState)
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (isLoginMode) {
            try {
                const data = await sendRequest(
                    'http://localhost:5001/api/users/login',
                    'POST',
                    JSON.stringify({
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value
                    }),
                    { 'Content-Type': 'application/json' }
                );
                authContext.login(data.user!.id!);
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                const data = await sendRequest(
                    'http://localhost:5001/api/users/signup',
                    'POST',
                    JSON.stringify({
                        name: formState.inputs.name.value,
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value,
                        imageUrl: 'someurl'
                    }),
                    { 'Content-Type': 'application/json' }
                );
                authContext.login(data.user!.id!);
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <>
            <ErrorModal error={error} onClear={clearError} />
            <Card className="w-9/10 max-w-[25rem] my-28 py-8 px-6 mx-auto text-center bg-white">
                {isLoading && <LoadingSpinner asOverlay={true} />}
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
                        validators={[ValidatorMinLength(6), ValidatorMaxLength(16)]}
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
        </>
    );
}

export default Login;