import { PlaceType } from "@/features/places/types";

import Card from "@/shared/components/UIElements/Card";
import PlacesItem from "./PlaceItem";

const PlacesList = ({ places }: { places: Array<PlaceType>}) => (
    <>
        {places.length === 0 ? (
            <div className="center-content list-none mx-4 my-auto p-0 w-[90%] max-w-[40rem]">
                <Card>
                    <h2>No places found. Create one?</h2>
                <button>Share Place</button>
                </Card>
            </div>           
        ) : (
            <ul className="list-none my-4 mx-auto p-0 w-[90%] max-w-[40rem]">
                {places.map((place) => (
                    <PlacesItem key={place.id} place={place} />
                )
                
            )}
            </ul>
        )}
    </>
);

export default PlacesList;