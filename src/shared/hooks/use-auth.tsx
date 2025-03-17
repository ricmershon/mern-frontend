import { useState, useCallback, useEffect } from "react";

import { LoginDuration } from "@/types";

type UseAuthReturnType = [
    token: string,
    login: (userId: string, token: string, expirationDate?: Date) => void,
    logout: () => void,
    userId: string
]

let logoutTimer: string | number | NodeJS.Timeout | undefined;

const useAuth = (): UseAuthReturnType => {
    const [token, setToken] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [tokenExpirationTime, setTokenExpirationTime] = useState<Date | null>(null);
    
    const login = useCallback((userId: string, token: string, expirationDate?: Date) => {
        setUserId(userId);
        setToken(token);
    
        /**
         * Set token expiration for 1 hour, or use current expiration date if already
         * logged in.
         */
        const tokenExpirationTime =
            expirationDate ||
            new Date(new Date().getTime() + LoginDuration);
    
        setTokenExpirationTime(tokenExpirationTime)
        localStorage.setItem(
            'userData',
            JSON.stringify({
                userId: userId,
                token: token,
                expiration: tokenExpirationTime.toISOString()
            })
        );
    
    }, []);
    
    const logout = useCallback(() => { 
        setToken(null);
        setTokenExpirationTime(null);
        setUserId(null);
        localStorage.removeItem('userData');
    }, []);
    
    /**
     * Check for user data in localStorage, and if there, login using that data.
     */
    useEffect(() => {
        const storedData = localStorage.getItem('userData');
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            if (
                parsedData.token &&
                new Date(parsedData.expiration) > new Date()
            ) {
                login(parsedData.userId, parsedData.token, parsedData.expiration);
            }
        }
    }, [login]);
    
    useEffect(() => {
        if (token && tokenExpirationTime) {
            const remainingTime = tokenExpirationTime.getTime() - new Date().getTime();
            logoutTimer = setTimeout(logout, remainingTime);
        } else {
            clearTimeout(logoutTimer);
        }
        
        return () => clearTimeout(logoutTimer);
    }, [logout, token, tokenExpirationTime]);

    return [token!, login, logout, userId!]
}

export default useAuth;