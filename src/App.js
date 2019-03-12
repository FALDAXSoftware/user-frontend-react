/* In-Build components */
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, withRouter } from 'react-router-dom';
import AppRouter from '../src/routes';
import './App.css';
import { ThemeProvider } from 'styled-components';
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
/* Components */
import HomePage from './components/Landing/HomePage';
import Login from "./components/Landing/User_forms/Login_Form"
import SignupForm from './components/Landing/User_forms/Signup_Form'

import ForgotForm from "./components/Landing/User_forms/Forgot_Form";
import ResetPassword from "./components/Landing/User_forms/Reset_Form";
import FaqPage from './components/Landing_categories/FaqPage';
import AboutUs from './components/Landing_categories/About_us';
import Blog from './components/Landing_categories/Blog';
import BlogDetails from './components/Landing_categories/BlogDetails';
import ContactUs from './components/Landing_categories/ContactUs';
import CareerDetails from './components/Landing_categories/Careerdetails'
import Careers from './components/Landing_categories/Careers'
import MediaContact from './components/Landing_categories/MediaContact';
import Fees from './components/Landing_categories/Fees';
import Addcoin from './components/Landing_categories/Addcoin'
import ApplyJob from './components/Landing_categories/ApplyJob'
import Policy from './components/Landing_categories/Policy'
import News from './components/Landing_categories/News';
import ThankYou from "./shared-components/thank_you";
import Chart from "../src/components/TraddingViewChart"
import { Signup } from './Actions/Auth';
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
                            <Switch location={location}>
                                <Route path="/" exact title="Home" component={HomePage} />
                                <Route path='/reset-password' title="Reset Password" component={ResetPassword} />
                                <Route path="/login" exact title="Login" component={Login} />
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

                                <Route path="/Chart" exact title='Trading View' component={Chart} />
                                <RestrictedRoute
                                    path="/"
                                    component={AppRouter}
                                    isLoggedIn={isLoggedIn} />
                            </Switch>
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