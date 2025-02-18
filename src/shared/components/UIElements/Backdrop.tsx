import { MouseEventHandler } from "react";
import { createPortal } from "react-dom";

interface BackdropProps {
    onClick: MouseEventHandler
}

const Backdrop = ({ onClick }: BackdropProps) => (
    createPortal(
        <div
            className="fixed top-0 left-0 w-full h-screen bg-[rgba(0,0,0,0.75)] z-10"
            onClick={onClick}
        />,
        document.getElementById('backdrop-content')!
    )
)

export default Backdrop;