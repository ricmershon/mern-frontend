import Input from "@/shared/components/FormElements/Input";
import { ValidatorRequire } from "@/shared/utils/validators";

const NewPlace = () => {
    return (
        <form
            action=""
            className="list-none my-0 mx-auto p-4 w-[90%] max-w-[40rem] shadow-[0_2px_8px_rgba(0,0,0,0.26)] rounded-md bg-white"
        >
            <Input
                inputType="input"
                type="text"
                label="Title"
                validators={[ValidatorRequire()]}
                // onChange={}
                errorText="Please enter a valid title."
            />
        </form>
    )
}

export default NewPlace;