import React from 'react';
import NavigationBar from './components/HomePage';
import Navigation from './components/Navigation';
import About from './components/About';
import EditProfile from './components/EditProfile';
import { Switch, Route } from 'react-router';

const Routes = () => (
    <main>
        <Navigation />
        <Switch>
            <Route exact path='/' component={NavigationBar} />
            <Route exact path='/about' component={About} />
            <Route exact path='/edit-profile' component={EditProfile} />
        </Switch>
    </main>
)

export default Routes;
