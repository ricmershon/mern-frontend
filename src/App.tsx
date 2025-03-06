import { useCallback, useState } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import { LoginContext } from '@/shared/context/login-context';
import MainNavigation from '@/shared/components/Navigation/MainNavigation';
import Users from '@/features/users/pages/Users';
import NewPlace from '@/features/places/pages/NewPlace';
import UserPlaces from '@/features/places/pages/UserPlaces';
import UpdatePlace from '@/features/places/pages/UpdatePlace';
import Login from '@/features/users/pages/Login';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = useCallback(() => {
        setIsLoggedIn(true);
    }, []);

    const logout = useCallback(() => {
        setIsLoggedIn(false);
    }, []);

    const unprotectedRoutes = (
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
    );

    const protectedRoutes = (
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
    );

    return (
        <LoginContext.Provider
            value={{
                isLoggedIn: isLoggedIn,
                login: login,
                logout: logout
            }}
        >
            <Router>
                <MainNavigation />
                <main className='mt-[5rem]'>
                    {isLoggedIn ? protectedRoutes : unprotectedRoutes}
                </main>
            </Router>
        </LoginContext.Provider>
    );
}

export default App;