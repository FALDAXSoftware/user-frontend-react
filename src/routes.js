import React from 'react';
import NavigationBar from './components/Landing/HomePage';
import Navigation from './components/Landing/Navigation';
import LoggedNavigation from './components/LoggedNavigation';
import About from './components/About';
import EditProfile from './components/Settings/EditProfile';
import Footer from './components/Footer';
import { Switch, Route } from 'react-router-dom';

const Routes = () => (
    <main>
        <LoggedNavigation />
        <Switch>
            <Route exact path='/' component={NavigationBar} />
            <Route exact path='/about' component={About} />
            <Route exact path='/edit-profile' component={EditProfile} />
        </Switch>
        <Footer />
    </main>
)

export default Routes;
