import { createContext, useContext } from "react";

interface AuthContextProps {
    isLoggedIn: boolean;
    userId: string | null;
    login: (userId: string) => void;
    logout: () => void;
}
export const AuthContext = createContext<AuthContextProps>({
    isLoggedIn: false,
    userId: null,
    login: () => {},
    logout: () => {},
});

export const useAuthContext = () => useContext(AuthContext);