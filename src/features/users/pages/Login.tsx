import { useState, FormEvent } from "react";

import { ValidatorMinLength, ValidatorEmail, ValidatorRequire } from "@/shared/utils/validators";
import { useLoginContext } from "@/shared/context/login-context";
import useForm from "@/shared/hooks/use-form";
import Card from "@/shared/components/UIElements/Card";
import Input from "@/shared/components/FormElements/Input";
import Button from "@/shared/components/FormElements/Button";
import ErrorModal from "@/shared/components/UIElements/Modal/ErrorModal";
import LoadingSpinner from "@/shared/components/UIElements/LoadingSpinner";

const Login = () => {
    const loginContext = useLoginContext();

    const [isLoginMode, setIsLoginMode] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<null | string | object > (null);

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

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (isLoginMode) {
            try {
                setIsLoading(true);
                const response = await fetch('http://localhost:5001/api/users/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value
                    })
                });
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message)
                }
                setIsLoading(false);
                loginContext.login();
            } catch (error) {
                setIsLoading(false);
                setError(error.message || 'Something went wrong with signup.');
            }
        } else {
            try {
                setIsLoading(true);
                const response = await fetch('http://localhost:5001/api/users/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: formState.inputs.name.value,
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value,
                        imageUrl: 'someurl'
                    })
                });
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message)
                }
                setIsLoading(false);
                loginContext.login();
            } catch (error) {
                setIsLoading(false);
                setError(error.message || 'Something went wrong with signup.');
            }
        }
    };

    return (
        <>
            {error && <ErrorModal error={error} onClear={() => setError(null)} />}
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
        </>
    );
}

export default Login;