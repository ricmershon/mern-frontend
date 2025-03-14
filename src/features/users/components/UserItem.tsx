import { Link } from "react-router-dom";

import { UserType } from "@/types";
import Avatar from "@/shared/components/UIElements/Avatar";
import Card from "@/shared/components/UIElements/Card";

interface UserItemProps extends UserType {
    placeCount: number;
}

const UserItem = ({ id, imageUrl, name, placeCount }: UserItemProps) => (
    <li className="m-4 w-[calc(45%-2rem)] min-w-[17.5rem] group">
        <Card className="p-0">
            <Link
                to={`/${id}/places`}
                className="flex items-center w-full h-full no-underline p-4 text-white hover:text-[#292929] bg-[#292929] hover:bg-[#ffd900]"
            >
                <div className="w-16 h-16 mr-4">
                    <Avatar imageUrl={imageUrl} alt={name} />
                </div>
                <div className="m-0">
                    <h2 className="mr-2">{name}</h2>
                    <h3 className="mt-[3px]">{placeCount} {placeCount === 1 ? 'Place' : 'Places'}</h3>
                </div>
            </Link>
        </Card>
    </li>
);

export default UserItem;