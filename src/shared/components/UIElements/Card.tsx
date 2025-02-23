import { CSSProperties, PropsWithChildren } from "react";

interface CardProps {
    className?: string;
    style?: CSSProperties
}

const Card = ({ className, style, children }: PropsWithChildren<CardProps>) => (
    <div
        className={`m-0 shadow-[0_2px_8px_rgba(0,0,0,0.26)] rounded-md overflow-hidden ${className}`}
        style={style}
    >
        {children}
    </div>
);

export default Card;
