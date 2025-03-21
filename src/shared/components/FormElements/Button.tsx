import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';

import './Buttons.css';

interface ButtonProps {
    size?: string;
    inverse?: boolean;
    danger?: boolean
    to?: string;
    type?: "submit" | "reset" | "button" | undefined;
    onClick?: () => void;
    disabled?: boolean;
}

const Button = ({
    size,
    inverse,
    danger,
    to,
    type,
    onClick,
    disabled,
    children
}: PropsWithChildren<ButtonProps>) => {
    if (to) {
        return (
            <Link
                to={to}
                className={`button button--${size || 'default'} ${inverse &&
                'button--inverse'} ${danger && 'button--danger'}`}
            >
                {children}
            </Link>
        );
    }

    return (
        <button
            className={`button button--${size || 'default'} ${inverse &&
                'button--inverse'} ${danger && 'button--danger'}`}
            type={type || "button"}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;
