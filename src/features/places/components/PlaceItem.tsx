import { PlaceType } from "@/features/places/types";
import Card from "@/shared/components/UIElements/Card";
import Button from "@/shared/components/FormElements/Button";

const PlacesItem = ({ place }: { place: PlaceType }) => (
    <li className="mx-4 my-0">
        <Card className="p-0 mb-4">
            <div className="w-full h-[12.5rem] mr-[1.5rem] md:h-80">
                <img className="w-full h-full object-cover" src={place.imageUrl} alt={place.title} />
            </div>
            <div className="p-4 text-center">
                <h2 className="m-0 mb-2">{place.title}</h2>
                <h3 className="m-0 mb-2">{place.address}</h3>
                <p className="m-0 mb-2">{place.description}</p>
            </div>
            <div className="p-4 text-center border-t border-[#ccc]">
                <Button inverse>VIEW ON MAP</Button>
                <Button to={`/places/${place.id}`}>EDIT</Button>
                <Button danger>DELETE</Button>
            </div>
        </Card>
    </li>
);

export default PlacesItem;