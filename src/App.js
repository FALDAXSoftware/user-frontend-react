/* In-Build components */
import React, { Component, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, withRouter } from 'react-router-dom';
import AppRouter from '../src/routes';
import './App.css';
import { ThemeProvider } from 'styled-components';
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { Signup } from './Actions/Auth';
/* Components */
// import HomePage from './components/Landing/HomePage';
// import Login from "./components/Landing/User_forms/Login_Form"
const SignupForm = lazy(() => import('./components/Landing/User_forms/Signup_Form'))

const ForgotForm = lazy(() => import("./components/Landing/User_forms/Forgot_Form"))
const ResetPassword = lazy(() => import("./components/Landing/User_forms/Reset_Form"))
const FaqPage = lazy(() => import('./components/Landing_categories/FaqPage'))
const AboutUs = lazy(() => import('./components/Landing_categories/About_us'))
const Blog = lazy(() => import('./components/Landing_categories/Blog'))
const BlogDetails = lazy(() => import('./components/Landing_categories/BlogDetails'))
const ContactUs = lazy(() => import('./components/Landing_categories/ContactUs'))
const CareerDetails = lazy(() => import('./components/Landing_categories/Careerdetails'))
const Careers = lazy(() => import('./components/Landing_categories/Careers'))
const MediaContact = lazy(() => import('./components/Landing_categories/MediaContact'))
const Fees = lazy(() => import('./components/Landing_categories/Fees'))
const Addcoin = lazy(() => import('./components/Landing_categories/Addcoin'))
const ApplyJob = lazy(() => import('./components/Landing_categories/ApplyJob'))
const Policy = lazy(() => import('./components/Landing_categories/Policy'))
const News = lazy(() => import('./components/Landing_categories/News'))
const ThankYou = lazy(() => import("./shared-components/thank_you"))
const Chart = lazy(() => import("../src/components/TradingViewChart"))
const SignupSuccess = lazy(() => import('./components/Landing/User_forms/Signup_success'))
const HomePage = lazy(() => import('./components/Landing/HomePage'));
const Login = lazy(() => import('./components/Landing/User_forms/Login_Form'));
// import dotenv from 'dotenv';

// dotenv.config();
library.add(faStroopwafel);
// require('dotenv').config()

/* Component defination start here */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: this.props.theme == false ? "light" : "dark"
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.location !== prevProps.location) {
      if (this.props.location !== undefined) {
        if (this.props.location.hash !== "" && this.props.location.hash !== undefined && this.props.location.hash == "#block-world-map") {
          window.scrollTo(0, 1050);
        }
        else
          window.scrollTo(0, 0);
      }
    }
  }
  componentWillReceiveProps(props, newProps) {
    if (props.theme !== undefined) {
      if (props.theme !== this.state.theme) {
        if (props.theme == false)
          this.setState({ theme: "light" })
        else
          this.setState({ theme: "dark" })
      }
    }
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    // if(this.props.theme!==undefined)
    //     {
    //         if(this.props.theme !== this.state.theme)
    //         {
    //             if(this.props.theme==false)
    //             this.setState({theme: "light"})
    //             else
    //             this.setState({theme: "dark"})
    //         }
    //     }
  }
  render() {

    const { isLoggedIn } = this.props

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

    let theme = {
      mode: this.state.theme
    }
    return (
      <div className="App">
        <ThemeProvider theme={theme}>
          <Route
            render={({ location }) => (
              <Suspense fallback={<div>Loading...</div>}>
                <Switch location={location}>
                  <Route path="/" exact title="Home" component={HomePage} />
                  <Route path="/login" exact title="Login" component={Login} />
                  <Route path='/reset-password' title="Reset Password" component={ResetPassword} />
                  <Route path="/signup" exact title="Signup" component={SignupForm} />
                  <Route path="/forgot-password" exact title="Forgot Password" component={ForgotForm} />
                  <Route {...this.props} path="/about-us" exact title="About Us" component={AboutUs} />
                  <Route path="/faq" exact title="Faq Page" component={FaqPage} />
                  <Route path="/blogs" exact title='Blog' component={Blog} />
                  <Route path="/blogDetails" exact title='Blog' component={BlogDetails} />
                  <Route path="/contactus" exact title='Contact' component={ContactUs} />
                  <Route path="/careers" exact title='Careers' component={Careers} />
                  <Route path="/careerdetails" exact title='Careerdetails' component={CareerDetails} />
                  <Route path="/mediacontact" exact title='MediaContact' component={MediaContact} />
                  <Route path="/fees" exact title='Fees' component={Fees} />
                  <Route path="/addcoin" exact title='AddCoin' component={Addcoin} />
                  <Route path="/applyjob" exact title='ApplyJob' component={ApplyJob} />
                  <Route path="/policy" exact title='policy' component={Policy} />
                  <Route path="/news" exact title='News' component={News} />
                  <Route path="/thank-you" exact title='Thank You' component={ThankYou} />
                  <Route path="/signup-success" exact title='Thank You' component={SignupSuccess} />

                  <Route path="/Chart" exact title='Trading View' component={Chart} />
                  <RestrictedRoute
                    path="/"
                    component={AppRouter}
                    isLoggedIn={isLoggedIn} />
                </Switch>
              </Suspense>
            )} />
        </ThemeProvider>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return ({
    isLoggedIn: state.simpleReducer.isLoggedIn !== undefined ? true : false,
    theme: state.themeReducer.theme !== undefined ? state.themeReducer.theme : ""
  })
}

export default withRouter(connect(mapStateToProps, null)(App));