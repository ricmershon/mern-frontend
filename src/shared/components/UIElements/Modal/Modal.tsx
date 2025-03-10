import Backdrop from "@/shared/components/UIElements/Backdrop";
import ModalOverlay from "./ModalOverlay";
import { PropsWithChildren } from "react";

export interface ModalProps {
    show: boolean;
    onCancel: () => void;
    header: string;
    contentClass?: string;
    footerClass?: string;
    footer: JSX.Element;
}

const Modal = (props: PropsWithChildren<ModalProps>) => (
    <>
        {props.show && (
            <>
                <Backdrop onClick={props.onCancel} />
                <ModalOverlay {...props} />
            </>
        )}
    </>
)

export default Modal;