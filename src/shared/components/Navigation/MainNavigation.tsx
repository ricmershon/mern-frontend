import { Link } from "react-router-dom";

import "./MainNavigation.css";
import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";

const MainNavigation = (props) => {
    return (
        <>
            <SideDrawer>
                <nav className="h-full">
                    <NavLinks />
                </nav>
            </SideDrawer>
            <MainHeader>
                <button className="flex flex-col justify-around w-[3rem] h-[3rem] bg-transparent border-[none] mr-8 cursor-pointer md:hidden">
                    <span />
                    <span />
                    <span />
                </button>
                <h1 className="text-white text-2xl font-bold">
                    <Link
                        to='/'
                        className="text-white no-underline"
                    >
                        Your Places
                    </Link>
                </h1>
                <nav className="hidden md:block">
                    <NavLinks />
                </nav>
            </MainHeader>
        </>
    );
};

export default MainNavigation;