import { createContext, useContext } from "react";

export const LoginContext = createContext({
    isLoggedIn: false,
    login: () => {},
    logout: () => {}
});

export const useLoginContext = () => useContext(LoginContext);