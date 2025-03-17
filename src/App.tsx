import { useEffect, useCallback, useState } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import { LoginDuration } from '@/types';

import { AuthContext } from '@/shared/context/auth-context';
import { ApiContext } from '@/shared/context/apis-context';

import MainNavigation from '@/shared/components/Navigation/MainNavigation';
import Users from '@/features/users/pages/Users';
import NewPlace from '@/features/places/pages/NewPlace';
import UserPlaces from '@/features/places/pages/UserPlaces';
import UpdatePlace from '@/features/places/pages/UpdatePlace';
import Login from '@/features/users/pages/Login';

let logoutTimer: string | number | NodeJS.Timeout | undefined;
 
const App = () => {
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

    let routes;
    
    if (token) {
        routes = (
            <Switch>
                <Route path='/' exact={true}>
                <Users />
                    </Route>
                <Route path='/:userId/places' exact={true}>
                    <UserPlaces />
                </Route>
                <Route path='/places/new' exact={true}>
                    <NewPlace />
                </Route>
                <Route path='/places/:placeId'>
                    <UpdatePlace />
                </Route>
                <Redirect to='/' />
            </Switch>
        )
    } else {
        routes = (
            <Switch>
                <Route path='/' exact={true}>
                <Users />
                    </Route>
                <Route path='/:userId/places' exact={true}>
                    <UserPlaces />
                </Route>
                <Route path='/login'>
                    <Login />
                </Route>
                <Redirect to='/login' />
            </Switch>
        )
    }

    return (
        <ApiContext.Provider value={{
            baseApiUrl: import.meta.env.VITE_API_URL_BASE!,
            usersApiUrl: import.meta.env.VITE_API_URL_USERS!,
            placesApiUrl: import.meta.env.VITE_API_URL_PLACES!
        }}>
            <AuthContext.Provider
                value={{
                    isLoggedIn: !!token,
                    token: token,
                    login: login,
                    logout: logout,
                    userId: userId
                }}
            >
                <Router>
                    <MainNavigation />
                    <main className='mt-[5rem]'>
                        {routes}
                    </main>
                </Router>
            </AuthContext.Provider>
        </ApiContext.Provider>            
    );
}

export default App;
