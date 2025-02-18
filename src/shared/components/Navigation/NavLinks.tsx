import { NavLink } from "react-router-dom";

import './NavLinks.css';

const NavLinks = (props) => {
    return (
        <ul className="nav-links">
            <li className="md:space-x-4 space-x-1">
                <NavLink
                    to="/"
                    exact={true}
                >
                    ALL USERS
                </NavLink>
                <NavLink
                    to="/u1/places"
                >
                    MY PLACES
                </NavLink>
                <NavLink
                    to="/places/new"
                >
                    ADD PLACE
                </NavLink>
                <NavLink
                    to="/auth"
                >
                    AUTHENTICATE
                </NavLink>
            </li>
        </ul>
    )
};

export default NavLinks;