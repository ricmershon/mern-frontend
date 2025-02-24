import { useLoginContext } from '@/shared/context/login-context';
import { NavLink } from 'react-router-dom';

import './NavLinks.css';

const NavLinks = () => {
    const { isLoggedIn, logout } = useLoginContext();

    return (
        <ul className="nav-links">
            <li>
                <NavLink to="/" exact>ALL USERS</NavLink>
            </li>
            {isLoggedIn && (
                <>
                    <li>
                        <NavLink to="/u1/places">MY PLACES</NavLink>
                    </li>
                    <li>
                        <NavLink to="/places/new">ADD PLACE</NavLink>
                    </li>
                </>
            )}
            {!isLoggedIn ? (
                <li>
                    <NavLink to="/login">LOGIN</NavLink>
                </li>
            ) : (
                <li>
                    <button onClick={logout}>LOGOUT</button>
                </li>
            )}
        </ul>
    );
}
export default NavLinks;