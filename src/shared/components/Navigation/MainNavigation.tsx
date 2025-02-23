import { useState } from "react";
import { Link } from "react-router-dom";

import "./MainNavigation.css";
import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import Backdrop from "@/shared/components/UIElements/Backdrop";

const MainNavigation = () => {
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);

    return (
        <>
            {drawerIsOpen && <Backdrop onClick={() => setDrawerIsOpen(false)}/>}
            {drawerIsOpen && (
                <SideDrawer>
                    <nav className="h-full">
                        <NavLinks />
                    </nav>
                </SideDrawer>
            )}
            <MainHeader>
                <>
                    <button
                        className="flex flex-col justify-around w-[3rem] h-[3rem] bg-transparent border-[none] mr-8 cursor-pointer md:hidden"
                        onClick={() => setDrawerIsOpen(true)}
                    >
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
                </>
            </MainHeader>
        </>
    );
};

export default MainNavigation;