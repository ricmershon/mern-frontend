import { useState } from "react";

import useFetch from "@/shared/hooks/use-fetch";
import { useAuthContext } from "@/shared/context/auth-context";
import { useApiContext } from "@/shared/context/apis-context";
import { PlaceType } from "@/types";
import Modal from "@/shared/components/UIElements/Modal/Modal";
import Card from "@/shared/components/UIElements/Card";
import Button from "@/shared/components/FormElements/Button";
import Map from "@/shared/components/UIElements/Map";
import ErrorModal from "@/shared/components/UIElements/Modal/ErrorModal";
import LoadingSpinner from "@/shared/components/UIElements/LoadingSpinner";

interface PlaceItemProps {
    place: PlaceType;
    onDeletePlace: (placeId: string) => void;
}
const PlaceItem = ({ place, onDeletePlace }: PlaceItemProps) => {
    const [showMap, setShowMap] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    const [isLoading, error, sendRequest, clearError] = useFetch();

    const { userId } = useAuthContext();
    const { placesApiUrl } = useApiContext();

    const openMapHandler = () => setShowMap(true);
    const closeMapHandler = () => setShowMap(false);

    const openDeleteConfirmationHandler = () => setShowDeleteConfirmation(true);
    const closeDeleteConfirmationHandler = () => setShowDeleteConfirmation(false);

    const confirmDeleteHandler = async () => {
        setShowDeleteConfirmation(false);
        try {
            await sendRequest(
                `${placesApiUrl}/${place.id}`,
                'DELETE'
            );
        } catch (error) {
            console.log(error);
        }
        onDeletePlace(place.id);
    }

    return (
        <>
            <ErrorModal error={error} onClear={clearError} />
            <Modal
                show={showMap}
                onCancel={closeMapHandler}
                header={place.address}
                contentClass="p-0"
                footerClass="text-right"
                footer={
                    <Button onClick={closeMapHandler}>CLOSE</Button>
                }
            >
                <div className="h-60 w-full">
                    <Map center={place.location} zoom={16} />
                </div>
            </Modal>
            <Modal
                show={showDeleteConfirmation}
                onCancel={closeDeleteConfirmationHandler}
                header="Are you sure?"
                footerClass="text-right"
                footer={
                    <>
                        <Button onClick={closeDeleteConfirmationHandler} inverse={true}>CANCEL</Button>
                        <Button onClick={confirmDeleteHandler} danger={true}>DELETE</Button>
                    </>
                }
            >
                <p className="">{`Are you sure you want to delete ${place.title}? This cannot be undone.`}</p>
            </Modal>
            <li className="mx-4 mb-4 my-0">
                <Card className="p-0 bg-white">
                    {isLoading && <LoadingSpinner asOverlay={true} />}
                    <div className="w-full h-[12.5rem] mr-[1.5rem] md:h-80">
                        <img className="w-full h-full object-cover" src={place.image} alt={place.title} />
                    </div>
                    <div className="p-4 text-center">
                        <h2 className="m-0 mb-2">{place.title}</h2>
                        <h3 className="m-0 mb-2">{place.address}</h3>
                        <p className="m-0 mb-2">{place.description}</p>
                    </div>
                    <div className="p-4 text-center border-t border-[#ccc]">
                        <Button inverse onClick={openMapHandler}>VIEW ON MAP</Button>
                        {userId === place.creator && (
                            <>
                                <Button to={`/places/${place.id}`}>EDIT</Button>
                                <Button danger onClick={openDeleteConfirmationHandler}>DELETE</Button>
                            </>
                        )}
                    </div>
                </Card>
            </li>
        </>
    );
}
export default PlaceItem;