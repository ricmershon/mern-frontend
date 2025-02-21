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
export const ValidatorMinLength = (val) => ({
    type: VALIDATOR_TYPE_MINLENGTH,
    val: val
});
export const ValidatorMaxLength = (val) => ({
    type: VALIDATOR_TYPE_MAXLENGTH,
    val: val
});
export const ValidatorMin = (val) => ({ type: VALIDATOR_TYPE_MIN, val: val });
export const ValidatorMax = (val) => ({ type: VALIDATOR_TYPE_MAX, val: val });
export const ValidatorEmail = () => ({ type: VALIDATOR_TYPE_EMAIL });

export const Validate = (value, validators: InputValidators) => {
    let isValid = true;
    for (const validator of validators) {
        if (validator.type === VALIDATOR_TYPE_REQUIRE) {
            isValid = isValid && value.trim().length > 0;
        }
        if (validator.type === VALIDATOR_TYPE_MINLENGTH) {
            isValid = isValid && value.trim().length >= validator.val;
        }
        if (validator.type === VALIDATOR_TYPE_MAXLENGTH) {
            isValid = isValid && value.trim().length <= validator.val;
        }
        if (validator.type === VALIDATOR_TYPE_MIN) {
            isValid = isValid && +value >= validator.val;
        }
        if (validator.type === VALIDATOR_TYPE_MAX) {
            isValid = isValid && +value <= validator.val;
        }
        if (validator.type === VALIDATOR_TYPE_EMAIL) {
            isValid = isValid && /^\S+@\S+\.\S+$/.test(value);
        }
    }
    return isValid;
};