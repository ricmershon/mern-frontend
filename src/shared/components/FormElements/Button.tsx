import { MouseEventHandler, PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';

import './Buttons.css';

interface ButtonProps {
    href?: string;
    size?: string;
    inverse?: boolean;
    danger?: boolean
    to?: string;
    exact?: boolean;
    type?: "submit" | "reset" | "button" | undefined;
    onClick?: MouseEventHandler;
    disabled?: boolean;
}

const Button = ({
    href,
    size,
    inverse,
    danger,
    to,
    exact,
    type,
    onClick,
    disabled,
    children
}: PropsWithChildren<ButtonProps>) => {
    if (href) {
        return (
            <a
                className={`button button--${size || 'default'} ${inverse &&
                'button--inverse'} ${danger && 'button--danger'}`}
                href={href}
            >
                {children}
            </a>
        );
    }

    if (to) {
        return (
            <Link
                to={to}
                exact={exact}
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
            type={type}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;
