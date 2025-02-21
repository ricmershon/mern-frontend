 
import { CSSProperties, FormEventHandler, PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import { ModalProps } from "./Modal";

interface ModalOverlayProps extends ModalProps {
    className?: string;
    style?: CSSProperties;
    headerClass?: string;
    onSubmit?: FormEventHandler;
}

const ModalOverlay = ({
    className,
    style,
    headerClass,
    header, 
    onSubmit, 
    contentClass, 
    footerClass, 
    footer, 
    children
}: PropsWithChildren<ModalOverlayProps>) => {
    const content = (
        <div
            className={`z-[100] fixed top-[22vh] left-[10%] w-4/5 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.26)] rounded-lg md:left[calc(50%-20rem)] md:w-[40rem] ${className}`}
            style={style}
        >
            <header className={`w-full py-4 px-2 bg-[#2a006e] text-white ${headerClass}`}>
                <h2 className="m-2">{header}</h2>
            </header>
            <form onSubmit={onSubmit ? onSubmit : event => event.preventDefault()}>
                <div className={`py-4 px-2 ${contentClass}`}>
                    {children}
                </div>
                <footer className={`py-4 px-2 ${footerClass}`}>
                    {footer}
                </footer>
            </form>
        </div>
    )
    return createPortal(content, document.getElementById('modal-content')!)
}

export default ModalOverlay;