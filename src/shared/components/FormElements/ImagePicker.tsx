import { useState, useRef, ChangeEvent, useEffect } from "react";
import Button from "./Button";

interface ImagePickerProps {
    id: string;
    center?: boolean;
    isUserImage: boolean;
    onChange: (id: string, pickedFile: File, fileIsValid: boolean) => void;
    errorText?: string;
}

const ImagePicker = ({ id, center, isUserImage = false, onChange, errorText }: ImagePickerProps) => {
    const filePickerRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File>();
    const [previewUrl, setPreviewUrl] = useState<ArrayBuffer | null | string>(null);
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        if (!file) {
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result);
        }
        fileReader.readAsDataURL(file);
    }, [file]);

    const handlePicked = (event: ChangeEvent<HTMLInputElement>) => {
        let pickedFile: File | null = null;
        let fileIsValid = isValid;
        if (event.target.files && event.target.files.length === 1) {
            pickedFile = event.target.files[0];
            setFile(pickedFile);
            setIsValid(true);
            fileIsValid = true;
        } else {
            setIsValid(false);
            fileIsValid = false;
        }
        if (pickedFile) {
            onChange(id, pickedFile, fileIsValid);
        }
    }

    const handlePickImage = () => {
        if (filePickerRef.current) {
            filePickerRef.current.click();
        }
    }
    
    return (
        <div className={`${isUserImage ? 'my-4 mx-0' : 'my-4'}`} style={{flex: `${!isUserImage && '0'}`}}>
            <input
                id={id}
                type="file"
                accept=".jpg,.png,.jpeg"
                ref={filePickerRef}
                style={{display: "none"}}
                onChange={handlePicked}
            />
            <div className={`flex flex-col justify-center items-center ${center && 'center-content'}`}>
                <div className="flex justify-center items-center text-center mb-4 w-52 h-52 max-w-full max-h-full border border-solid border-[#ccc]">
                    {previewUrl ? (
                        <img src={previewUrl} alt="Preview" />
                    ) : (
                        <p>Please select an image</p>
                    )}
                </div>
                <Button type="button" onClick={handlePickImage}>SELECT A PROFILE IMAGE</Button>
            </div>
            {!isValid && errorText && <p>{errorText}</p>}
        </div>
    );
}

export default ImagePicker;