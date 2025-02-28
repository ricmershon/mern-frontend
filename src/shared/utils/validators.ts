export type InputValidators = Array<{
    type: string;
    value?: number | string;
}>;

const VALIDATOR_TYPE_REQUIRE = 'REQUIRE';
const VALIDATOR_TYPE_MINLENGTH = 'MINLENGTH';
const VALIDATOR_TYPE_MAXLENGTH = 'MAXLENGTH';
const VALIDATOR_TYPE_MIN = 'MIN';
const VALIDATOR_TYPE_MAX = 'MAX';
const VALIDATOR_TYPE_EMAIL = 'EMAIL';
const VALIDATOR_TYPE_FILE = 'FILE';

export const ValidatorRequire = () => ({ type: VALIDATOR_TYPE_REQUIRE });
export const ValidatorFile = () => ({ type: VALIDATOR_TYPE_FILE });
export const ValidatorMinLength = (value: number) => ({
    type: VALIDATOR_TYPE_MINLENGTH,
    value: value
});
export const ValidatorMaxLength = (value: number) => ({
    type: VALIDATOR_TYPE_MAXLENGTH,
    value: value
});
export const ValidatorMin = (value: string) => ({ type: VALIDATOR_TYPE_MIN, value: value });
export const ValidatorMax = (value: string) => ({ type: VALIDATOR_TYPE_MAX, value: value });
export const ValidatorEmail = () => ({ type: VALIDATOR_TYPE_EMAIL });

export const Validate = (value: string | number, validators: InputValidators) => {
    let isValid = true;
    for (const validator of validators) {
        if (typeof value === 'string') {
            if (typeof validator.value === 'number') {
                switch (validator.type) {
                    case VALIDATOR_TYPE_MINLENGTH:
                        isValid = isValid && value.trim().length >= validator.value;
                        return;
                    case VALIDATOR_TYPE_MAXLENGTH:
                        isValid = isValid && value.trim().length <= validator.value;
                        return;
                    case VALIDATOR_TYPE_MIN:
                        isValid = isValid && +value >= validator.value;
                        return;
                    case VALIDATOR_TYPE_MAX:
                        isValid = isValid && +value <= validator.value;
                }
            } else {
                if (validator.type === VALIDATOR_TYPE_REQUIRE) {
                    isValid = isValid && value.trim().length > 0;
                }
                if (validator.type === VALIDATOR_TYPE_EMAIL) {
                    isValid = isValid && /^\S+@\S+\.\S+$/.test(value);
                }
            }
        }
    }
    return isValid;
};