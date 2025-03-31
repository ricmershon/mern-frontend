import { createContext, useContext } from "react";

interface ApiContextProps {
    assetsApiUrl: string,
    usersApiUrl: string,
    placesApiUrl: string
}

export const ApiContext = createContext<ApiContextProps>({
    assetsApiUrl: '',
    usersApiUrl: '',
    placesApiUrl: ''
});

export const useApiContext = () => useContext(ApiContext);