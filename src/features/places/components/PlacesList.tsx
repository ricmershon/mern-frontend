import { PlaceTypeArray } from "@/features/places/types";

import Card from "@/shared/components/UIElements/Card";
import PlacesItem from "./PlaceItem";

const PlacesList = ({ places }: { places: PlaceTypeArray}) => (
    <>
        {places.length === 0 ? (
            <div className="flex justify-center items-center text-center list-none mx-4 my-auto p-0 w-[90%] max-w-[40rem]">
                <Card>
                    <h2>No places found. Create one?</h2>
                    <button>Share Place</button>
                </Card>
            </div>           
        ) : (
            <ul className="list-none mx-4 my-auto p-0 w-[90%] max-w-[40rem]">
                {places.map((place) => (
                    <PlacesItem key={place.id} place={place} />
                )
                
            )}
            </ul>
        )}
    </>
);

export default PlacesList;