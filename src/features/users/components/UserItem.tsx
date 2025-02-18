import { Link } from "react-router-dom";

import { UserType } from "@/features/users/types";
import Avatar from "@/shared/components/UIElements/Avatar";
import Card from "@/shared/components/UIElements/Card";

const UserItem = ({ id, image, name, placeCount }: UserType) => (
    <li className="m-4 w-[calc(45%-2rem)] min-w-[17.5rem] group">
        <Card className="p-0">
            <Link
                to={`/${id}/places`}
                className="flex items-center w-full h-full no-underline p-4 text-white hover:text-[#292929] bg-[#292929] hover:bg-[#ffd900]"
            >
                <div className="w-16 h-16 mr-4">
                    <Avatar image={image} alt={name} />
                </div>
                <div className="m-0">
                    <h2 className="text-2xl mr-2 font-normal">{name}</h2>
                    <h3 className="mt-[3px]">{placeCount} {placeCount === 1 ? 'Place' : 'Places'}</h3>
                </div>
            </Link>
        </Card>
    </li>
);

export default UserItem;