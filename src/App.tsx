import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import Users from './features/users/pages/Users';
import NewPlace from './features/places/pages/NewPlace';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path='/' exact={true}>
                    <Users />
                </Route>
                <Route path='/place/new' exact={true}>
                    <NewPlace />
                </Route>
                <Redirect to='/' />
            </Switch>
        </Router>
    );
}

export default App;
