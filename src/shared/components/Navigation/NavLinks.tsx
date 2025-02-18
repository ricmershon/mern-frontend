import { NavLink } from 'react-router-dom';

import './NavLinks.css';

const NavLinks = (props) => {
    return (
        <ul className="list-none m-0 p-0 w-full h-full flex flex-col justify-center items-center md:flex-row">
            <li>
                <NavLink to="/" exact>ALL USERS</NavLink>
            </li>
            <li>
                <NavLink to="/u1/places">MY PLACES</NavLink>
            </li>
            <li>
                <NavLink to="/places/new">ADD PLACE</NavLink>
            </li>
            <li>
                <NavLink to="/auth">AUTHENTICATE</NavLink>
            </li>
        </ul>
    )
};

export default NavLinks;