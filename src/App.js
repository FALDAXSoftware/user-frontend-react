/* In-Build components */
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, withRouter } from 'react-router-dom';
import AppRouter from '../src/routes';
import './App.css';
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
/* Components */
import HomePage from './components/Landing/HomePage';
import FaqPage from './components/Landing_categories/FaqPage';
import AboutUs from './components/Landing_categories/About_us';
import Blog from './components/Landing_categories/Blog';
import BlogDetails from './components/Landing_categories/BlogDetails';
import ContactUs from './components/Landing_categories/ContactUs';
import CareerDetails from './components/Landing_categories/Careerdetails'
import Careers from './components/Landing_categories/Careerdetails'
import MediaContact from './components/Landing_categories/MediaContact'
import Addcoin from './components/Landing_categories/Addcoin'
library.add(faStroopwafel);

/* Component defination start here */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.location !== prevProps.location) {

      window.scrollTo(0, 0);
    }
  }
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
   /*  console.log(this.props) */

    const { isLoggedIn } = this.props
    /* console.log(isLoggedIn) */

    const RestrictedRoute = ({
      component: Component,
      isLoggedIn,
      ...rest
    }) => (

        <Route
          {...rest}
          render={props => {

            if (isLoggedIn) {
              if (props.location.pathname == '/') {
                return <Redirect
                  to={{
                    pathname: '/home',
                    state: { from: props.location },
                  }}
                />
              } else {
                return <Component {...props} />
              }
            } else {
              if (props.location.pathname == '/') {
                return <Redirect
                  to={{
                    pathname: '/home',
                    state: { from: props.location },
                  }}
                />
              } else {
                return <Redirect
                  to={{
                    pathname: '/login',
                    state: { from: props.location },
                  }}
                />
              }

            }
          }}
        />
      );

    return (
      <div className="App">

        <Route
          render={({ location }) => (
            <Switch location={location}>
              <Route path='/reset-password' title="Login" component={HomePage} />
              <Route path="/" exact title="Home" component={HomePage} />
              <Route path="/login" exact title="Login" component={HomePage} />
              <Route {...this.props} path="/about-us" exact title="About Us" component={AboutUs} />
              <Route path="/faq" exact title="Faq Page" component={FaqPage} />
              <Route path="/blogs" excact title='Blog' component={Blog} />
              <Route path="/blogDetails" excact title='Blog' component={BlogDetails} />
              <Route path="/contactus" excact title='Contact' component={ContactUs} />
              <Route path="/careerdetails"excact title='Careerdetails' component={CareerDetails}/>
              <Route path="/careers"excact title='Careers' component={Careers}/>
              <Route path="/mediacontact"excact title='MediaContact' component={MediaContact}/>
              <Route path="/addcoin"excact title='AddCoin' component={Addcoin}/>
              <RestrictedRoute
                path="/"
                component={AppRouter}
                isLoggedIn={isLoggedIn} />
            </Switch>
          )} />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return ({
    isLoggedIn: state.simpleReducer.isLoggedIn !== undefined ? true : false
  })
}

export default withRouter(connect(mapStateToProps, null)(App));