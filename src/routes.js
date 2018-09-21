import React from 'react';
import NavigationBar from './components/Landing/HomePage';
import Navigation from './components/Landing/Navigation';
import LoggedNavigation from '../src/components/Landing/LoggedNavigation';
import About from './components/About';
import Referral from "../src/components/Settings/Referral"
import EditProfile from './components/Settings/EditProfile';
import Footer from '../src/components/Landing/Footers/Footer';
import { Switch, Route } from 'react-router-dom';

const Routes = () => (
    <main>
        {/* <LoggedNavigation />*/}
        <Switch>
            <Route exact path='/' component={NavigationBar} />
            <Route exact path='/about' component={About} />
            <Route exact path='/settings' component={EditProfile} />
            <Route exact path='/settings/referral' component={Referral}/>
        </Switch>
        {/*<Footer /> */}
    </main>
)

export default Routes;
