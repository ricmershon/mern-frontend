export interface InputType {
    value: string;
    isValid: boolean
}

export interface FormState {
    inputs: { [key: string]: InputType };
    isValid: boolean;
}