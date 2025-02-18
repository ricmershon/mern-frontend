import { Link } from "react-router-dom";

import MainHeader from "./MainHeader";

const MainNavigation = (props) => {
    return (
        <MainHeader>
            <button className="flex flex-col justify-around w-[3rem] h-[3rem] bg-transparent border-[none] mr-8 cursor-pointer md:hidden">
                <span className="block w-[3rem] h-[2.5px] bg-white" />
                <span className="block w-[3rem] h-[2.5px] bg-white" />
                <span className="block w-[3rem] h-[2.5px] bg-white" />
            </button>
            <h1 className="text-white text-2xl font-bold">
                <Link
                    to='/'
                    className="text-white no-underline"
                >
                    Your Places
                </Link>
            </h1>
            <nav>
                ...
            </nav>
        </MainHeader>
    )
};

export default MainNavigation;