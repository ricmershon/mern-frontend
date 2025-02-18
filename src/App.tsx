import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import MainNavigation from '@/shared/components/Navigation/MainNavigation';
import Users from '@/features/users/pages/Users';
import NewPlace from '@/features/places/pages/NewPlace';

const App = () => {
    return (
        <Router>
            <MainNavigation />
            <main className='mt-[5rem]'>
                <Switch>
                    <Route path='/' exact={true}>
                        <Users />
                    </Route>
                    <Route path='/places/new' exact={true}>
                        <NewPlace />
                    </Route>
                    <Redirect to='/' />
                </Switch>
            </main>
        </Router>
    );
}

export default App;
