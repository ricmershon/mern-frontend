import { useCallback, useState } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import MainNavigation from '@/shared/components/Navigation/MainNavigation';
import Users from '@/features/users/pages/Users';
import NewPlace from '@/features/places/pages/NewPlace';
import UserPlaces from '@/features/places/pages/UserPlaces';
import UpdatePlace from '@/features/places/pages/UpdatePlace';
import Login from '@/features/users/pages/Login';
import { AuthContext } from '@/shared/context/auth-context';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);

    const login = useCallback((userId: string) => {
        setIsLoggedIn(true);
        setUserId(userId);
    }, []);

    const logout = useCallback(() => {
        setIsLoggedIn(false);
        setUserId(null);
    }, []);

    let routes;

    if (isLoggedIn) {
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
        <AuthContext.Provider
            value={{
                isLoggedIn: isLoggedIn,
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
    );
}

export default App;
