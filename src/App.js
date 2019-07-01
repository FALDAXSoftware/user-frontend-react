/* In-Build components */
import React, { Component, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, withRouter } from 'react-router-dom';
import AppRouter from 'routes';
import { loadReCaptcha } from 'react-recaptcha-google'
import 'App.css';
import { ThemeProvider } from 'styled-components';
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'
import { library } from '@fortawesome/fontawesome-svg-core';
/* import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; */
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
/* import { Signup } from 'ACTIONS/authActions'; */
import FaldaxLoader from "SHARED-COMPONENTS/FaldaxLoader";
/* Components */
// import HomePage from 'components/LANDING/HomePage';
// import Login from "components/LANDING/USERFORMS/Login_Form"
const SignupForm = lazy(() => import('COMPONENTS/LANDING/USERFORMS/signup_form'))

const ForgotForm = lazy(() => import("COMPONENTS/LANDING/USERFORMS/forgot_form"))
const ResetPassword = lazy(() => import("COMPONENTS/LANDING/USERFORMS/reset_form"))
const FaqPage = lazy(() => import('COMPONENTS/LANDINGCATEGORIES/faq_page'))
const AboutUs = lazy(() => import('COMPONENTS/LANDINGCATEGORIES/about_us'))
const Blog = lazy(() => import('COMPONENTS/LANDINGCATEGORIES/blog'))
const BlogDetails = lazy(() => import('COMPONENTS/LANDINGCATEGORIES/blog_details'))
const ContactUs = lazy(() => import('COMPONENTS/LANDINGCATEGORIES/contact_us'))
const CareerDetails = lazy(() => import('COMPONENTS/LANDINGCATEGORIES/career_details'))
const Careers = lazy(() => import('COMPONENTS/LANDINGCATEGORIES/careers'))
const MediaContact = lazy(() => import('COMPONENTS/LANDINGCATEGORIES/media_contact'))
const Fees = lazy(() => import('COMPONENTS/LANDINGCATEGORIES/fees'))
const Addcoin = lazy(() => import('COMPONENTS/LANDINGCATEGORIES/add_coin'))
const ApplyJob = lazy(() => import('COMPONENTS/LANDINGCATEGORIES/apply_job'))
const Policy = lazy(() => import('COMPONENTS/LANDINGCATEGORIES/policy'))
const News = lazy(() => import('COMPONENTS/LANDINGCATEGORIES/news'))
const ThankYou = lazy(() => import("SHARED-COMPONENTS/thank_you"))
const Chart = lazy(() => import("COMPONENTS/tradingviewchart"))
const SignupSuccess = lazy(() => import('COMPONENTS/LANDING/USERFORMS/signup_success'))
const HomePage = lazy(() => import('COMPONENTS/LANDING/homepage'));
const Login = lazy(() => import('COMPONENTS/LANDING/USERFORMS/login_form'));
const EmailVerification = lazy(() => import('COMPONENTS/LANDING/USERFORMS/emailverification'));
// import dotenv from 'dotenv';

// dotenv.config();
library.add(faStroopwafel);
// require('dotenv').config()

/* Component defination start here */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: this.props.theme === false ? "light" : "dark"
    }
  }
  componentDidUpdate(prevProps, prevState) {
    // console.log(this.props);

    if (this.props.location !== prevProps.location) {
      if (this.props.location !== undefined) {
        if (this.props.location.hash !== "" && this.props.location.hash !== undefined && this.props.location.hash === "#block-world-map") {
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
        if (props.theme === false)
          this.setState({ theme: "light" })
        else
          this.setState({ theme: "dark" })
      }
    }
  }
  componentDidMount() {

    setTimeout(function () {
      loadReCaptcha();
    }, 1000)

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
              if (props.location.pathname === '/') {
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
              if (props.location.pathname === '/') {
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
              <Suspense fallback={<FaldaxLoader></FaldaxLoader>}>
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
                  <Route path="/career-details" exact title='Careerdetails' component={CareerDetails} />
                  <Route path="/mediacontact" exact title='MediaContact' component={MediaContact} />
                  <Route path="/fees" exact title='Fees' component={Fees} />
                  <Route path="/addcoin" exact title='AddCoin' component={Addcoin} />
                  <Route path="/applyjob" exact title='ApplyJob' component={ApplyJob} />
                  <Route path="/policy" exact title='policy' component={Policy} />
                  <Route path="/news" exact title='News' component={News} />
                  <Route path="/thank-you" exact title='Thank You' component={ThankYou} />
                  <Route path="/verify-email" exact title='Email Verification' component={EmailVerification} />
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