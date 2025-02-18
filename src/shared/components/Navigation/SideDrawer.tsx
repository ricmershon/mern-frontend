import { ReactNode } from "react";
import { createPortal } from "react-dom";

const SideDrawer = ({ children }: { children: ReactNode }) => (
    createPortal(
        <aside className="fixed left-0 top-0 z-[100] h-screen w-[70%] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.26)]">
            {children}
        </aside>,
        document.getElementById('sidedrawer-content')!
    )
);


export default SideDrawer;