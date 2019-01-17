import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { connect } from "react-redux";
import { Row, Col, Spin, notification } from 'antd';
import styled from 'styled-components';
import SimpleReactValidator from 'simple-react-validator';
import "react-datepicker/dist/react-datepicker.css";
import Navigation from '../Navigations/Navigation';
import { Spin_Ex } from '../../styled-components/homepage/style'
import CommonFooter from "../Landing/Footers/Footer_home";
import { Container } from '../../styled-components/homepage/style';
import Contact_Map from "./Contact_Map";
import {
    MapIcon, BlueMarker, EmailIcon, CallIcon, CallBlue, BlueEmail, ContactMap
} from "../../Constants/images";
import {
    Headcontact, Head_span, Contact_wrap, Grey_wrap, Row_wrap, Left_col, Sub_head,
    First_div, Second_div, Third_div, Fourth_div, First_label, First_input, Second_label,
    Second_input, Third_label, Third_input, Fourth_label, Fourth_area, Fifth_div,
    Fifth_button, Map_wrap, Subfoot_wrap, Main_wrap1, Main_wrap2, Main_wrap3, Main, Sub_span,
    Sub_p, Img1, Img2, Img3
} from '../../styled-components/landingCategories/contactStyle'
import { globalVariables } from "../../Globals"

let { API_URL } = globalVariables;

export const ContainerContact = styled(Container)`
    background-color:${props => props.theme.mode == "dark" ? "#041422" : "white"}; 
    border-radius:5px;
    padding-right:30px;
    padding-left:30px;
`
export const MapImage = styled.div`
    background-position: center;
    background-size: cover;
    background-image: url(${ContactMap});
    height: 555px;
    width: 100%;
`

class ContactUs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contact: {},
            fields: {
                first_name: '',
                last_name: '',
                message: '',
                email: '',
                loader: false
            },
            startDate: null,
            flag_drop: null,
            email: "",
            marker: '',
            call: ''
        };
        this._onChangeFields = this._onChangeFields.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.validator = new SimpleReactValidator({
            validEmail: { // name the rule
                message: 'Please enter valid email address.', // give a message that will display when there is an error. :attribute will be replaced by the name you supply in calling it.
                rule: function (val, options) { // return true if it is succeeds and false it if fails validation. the _testRegex method is available to give back a true/false for the regex and given value
                    // check that it is a valid IP address and is not blacklisted
                    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    var bool = re.test(String(val).toLowerCase());
                    return bool;
                }
            }
        });
    }
    componentWillReceiveProps(props, newProps) {
        if (props.theme !== undefined) {
            if (props.theme !== this.state.theme) {
                if (props.theme == false)
                    this.setState({ email: MapIcon, marker: EmailIcon, call: CallIcon })
                else
                    this.setState({ email: BlueMarker, marker: BlueEmail, call: CallBlue })
            }
        }
    }
    componentDidMount() {
        if (this.props.theme !== undefined) {
            if (this.props.theme !== this.state.theme) {
                if (this.props.theme == false)
                    this.setState({ email: MapIcon, marker: EmailIcon, call: CallIcon })
                else
                    this.setState({ email: BlueMarker, marker: BlueEmail, call: CallBlue })
            }
        }
        this.setState({ loader: true })
        fetch(API_URL + "/get-contact-details", {
            method: "get",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then((responseData) => {
                this.setState({ contact: responseData.data, loader: false });
            })
            .catch(error => { })
    }
    openNotificationWithIcon(type, head, desc) {
        notification[type]({
            message: head,
            description: desc,
        });
    };
    _onChangeFields(e) {
        let fields = this.state.fields;
        let field = e.target.name;

        if (e.target.value.trim() == "") {
            fields[field] = "";
        } else {
            fields[field] = e.target.value;
        }
        this.setState({ fields });
    }
    onSubmit() {
        if (this.validator.allValid()) {

            fetch(API_URL + "/send-inquiry", {
                method: "post",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.state.fields)
            })
                .then(response => response.json())
                .then((responseData) => {
                    this.openNotificationWithIcon('success', 'Success', responseData.message);
                    let fields = {};
                    fields["last_name"] = '';
                    fields['first_name'] = "";
                    fields['email'] = "";
                    fields['message'] = "";

                    this.setState({ fields: fields }, () => {
                        this.validator.hideMessages();
                        this.forceUpdate();

                    })
                })
                .catch(error => {
                })
        } else {
            this.validator.showMessages();
            // rerender to show messages for the first time
            this.forceUpdate();
        }
    }
    render() {
        const { contact, fields } = this.state;

        return (
            <Contact_wrap>
                <Navigation />
                <Grey_wrap>
                    <ContainerContact>
                        <Headcontact>
                            <Head_span>Contact Us</Head_span>
                            <hr />
                        </Headcontact>
                        <Row_wrap>
                            <Row>
                                <Col sm={24} xl={12}>
                                    <Left_col>
                                        <Sub_head>Reach out to us for any inquiry.</Sub_head>
                                        <First_div>
                                            <First_label>First Name*</First_label>
                                            <First_input name="first_name" onChange={this._onChangeFields} value={fields.first_name} />
                                            {this.validator.message('first_name', fields.first_name, 'required|alpha_num', 'text-danger-validation')}
                                        </First_div>
                                        <Second_div>
                                            <Second_label>Last Name*</Second_label>
                                            <Second_input name="last_name" onChange={this._onChangeFields} value={fields.last_name} />
                                            {this.validator.message('last_name', fields.last_name, 'required|alpha_num', 'text-danger-validation')}
                                        </Second_div>
                                        <Third_div>
                                            <Third_label>Your Email*</Third_label>
                                            <Third_input name="email" onChange={this._onChangeFields} value={fields.email} />
                                            {this.validator.message('email', fields.email, 'required|validEmail', 'text-danger-validation')}
                                        </Third_div>
                                        <Fourth_div>
                                            <Fourth_label>Message*</Fourth_label>
                                            <Fourth_area name="message" onChange={this._onChangeFields} value={fields.message} />
                                            {this.validator.message('message',
                                                fields.message, 'required', 'text-danger-validation')}
                                        </Fourth_div>
                                        <Fifth_div>
                                            <Fifth_button onClick={this.onSubmit}>SUBMIT</Fifth_button>
                                        </Fifth_div>
                                    </Left_col>
                                </Col>
                                <Col sm={24} xl={12}>
                                    <Map_wrap>
                                        <MapImage />
                                        {/* <Contact_Map /> */}
                                    </Map_wrap>
                                </Col>
                            </Row>
                        </Row_wrap>
                        <hr />
                        <Subfoot_wrap>
                            <Row>
                                <Col lg={24} xl={12}>
                                    <Main_wrap1>
                                        <Img1 src={this.state.marker} />
                                        <Main>
                                            <Sub_span>Location:</Sub_span>
                                            <Sub_p>{contact.address}</Sub_p>
                                        </Main>
                                    </Main_wrap1>
                                </Col>
                                <Col lg={24} xl={12}>
                                    <Main_wrap2>
                                        <Img2 src={this.state.email} />
                                        <Main>
                                            <Sub_span>Email:</Sub_span>
                                            <Sub_p><a href={`mailto:${contact.email}`}>{contact.email} </a></Sub_p>
                                        </Main>
                                    </Main_wrap2>
                                </Col>
                                {/* <Col lg={24} xl={8}>
                                    <Main_wrap3>
                                        <Img3 src={this.state.call} />
                                        <Main>
                                            <Sub_span>Phone:</Sub_span>
                                            <Sub_p>{contact.phone}</Sub_p>
                                        </Main>
                                    </Main_wrap3>
                                </Col> */}
                            </Row>
                        </Subfoot_wrap>
                    </ContainerContact>
                </Grey_wrap>
                <CommonFooter />
                {(this.state.loader) ? <Spin_Ex className="Ex_spin">
                    <Spin size="large" />
                </Spin_Ex> : ""}
            </Contact_wrap>
        );
    }
}
function mapStateToProps(state, ownProps) {
    return ({
        theme: state.themeReducer.theme !== undefined ? state.themeReducer.theme : ""
    });
}

export default connect(mapStateToProps)(ContactUs);
