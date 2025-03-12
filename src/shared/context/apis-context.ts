import { createContext, useContext } from "react";

interface ApiContextProps {
    baseApiUrl: string,
    usersApiUrl: string,
    placesApiUrl: string
}

export const ApiContext = createContext<ApiContextProps>({
    baseApiUrl: '',
    usersApiUrl: '',
    placesApiUrl: ''
});

export const useApiContext = () => useContext(ApiContext);