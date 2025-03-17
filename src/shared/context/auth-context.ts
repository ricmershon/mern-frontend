import { createContext, useContext } from "react";

interface AuthContextProps {
    isLoggedIn: boolean;
    userId: string | null;
    token: string | null;
    login: (userId: string, token: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
    isLoggedIn: false,
    userId: null,
    token: null,
    login: () => {},
    logout: () => {},
});

export const useAuthContext = () => useContext(AuthContext);