import { PlaceType } from "@/types";

import Card from "@/shared/components/UIElements/Card";
import PlaceItem from "./PlaceItem";
import Button from "@/shared/components/FormElements/Button";

interface PlacesListProps {
    places: Array<PlaceType>;
    onDeletePlace: (placeId: string) => void;
}
const PlacesList = ({ places, onDeletePlace }: PlacesListProps) => (
    <>
        {places.length === 0 ? (
            <div className="center-content list-none mx-auto my-auto p-0 w-[90%] max-w-[40rem]">
                <Card className="bg-white p-5">
                    <h2>No places found. Create one?</h2>
                    <Button to="/places/new">Share Place</Button>
                </Card>
            </div>           
        ) : (
            <ul className="list-none my-4 mx-auto p-0 w-[90%] max-w-[40rem]">
                {places.map((place) => (
                    <PlaceItem
                        key={place.id}
                        place={place}
                        onDeletePlace={(placeId: string) => onDeletePlace(placeId)}
                    />
                )
                
            )}
            </ul>
        )}
    </>
);

export default PlacesList;