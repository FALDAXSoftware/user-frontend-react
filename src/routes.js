import React from 'react';
import NavigationBar from './components/HomePage';
import Navigation from './components/Navigation';
import About from './components/About';
import Referral from './components/Referral'
import EditProfile from './components/EditProfile';
import { Switch, Route } from 'react-router';

const Routes = () => (
    <main>
        <Navigation />
        <Switch>
            <Route exact path='/' component={NavigationBar} />
            <Route exact path='/about' component={About} />
            <Route exact path='/settings' component={EditProfile} />
            <Route exact path='/Referral' component={Referral}/>
        </Switch>
    </main>
)

export default Routes;
