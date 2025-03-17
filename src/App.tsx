import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import { AuthContext } from '@/shared/context/auth-context';
import { ApiContext } from '@/shared/context/apis-context';

import useAuth from '@/shared/hooks/use-auth';
import MainNavigation from '@/shared/components/Navigation/MainNavigation';
import Users from '@/features/users/pages/Users';
import NewPlace from '@/features/places/pages/NewPlace';
import UserPlaces from '@/features/places/pages/UserPlaces';
import UpdatePlace from '@/features/places/pages/UpdatePlace';
import Login from '@/features/users/pages/Login';
 
const App = () => {
    const [token, login, logout, userId] = useAuth();

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
