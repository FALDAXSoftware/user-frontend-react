import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { connect } from "react-redux";
import { Row, Col, Spin, notification } from 'antd';
import styled from 'styled-components';
import SimpleReactValidator from 'simple-react-validator';
import "react-datepicker/dist/react-datepicker.css";
import Navigation from 'COMPONENTS/NAVIGATIONS/navigation';
import { SpinEx } from 'STYLED-COMPONENTS/HOMEPAGE/style'
import CommonFooter from "COMPONENTS/LANDING/FOOTERS/footer_home";
import { Container } from 'STYLED-COMPONENTS/HOMEPAGE/style';
import Contact_Map from "./contact_map";
import {
    _MAPICON, _BLUEMARKER, _EMAILICON, _CALLICON, _CALLBLUE, _BLUEEMAIL, _CONTACTMAP
} from "CONSTANTS/images";
import {
    HeadContact, HeadSpan, ContactWrap, GreyWrap, RowWrap, LeftCol, SubHead,
    FirstDiv, SecondDiv, ThirdDiv, FourthDiv, FirstLabel, FirstInput, SecondLabel,
    SecondInput, ThirdLabel, ThirdInput, FourthLabel, FourthArea, FifthDiv,
    FifthButton, MapWrap, SubfootWrap, MainWrap1, MainWrap2, Main, SubSpan,
    SubP, Img1, Img2
} from 'STYLED-COMPONENTS/LANDING_CATEGORIES/contactStyle'
import { globalVariables } from "Globals"

let { API_URL } = globalVariables;

export const ContainerContact = styled(Container)`
    background-color:${props => props.theme.mode === "dark" ? "#041422" : "white"}; 
    border-radius:5px;
    padding-right:30px;
    padding-left:30px;
`
export const MapImage = styled.div`
    background-position: center;
    background-size: cover;
    background-image: url(${_CONTACTMAP});
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
    /* Life Cycle Methods */
    componentWillReceiveProps(props, newProps) {
        if (props.theme !== undefined) {
            if (props.theme !== this.state.theme) {
                if (props.theme === false)
                    this.setState({ email: _MAPICON, marker: _EMAILICON, call: _CALLICON })
                else
                    this.setState({ email: _BLUEMARKER, marker: _BLUEEMAIL, call: _CALLBLUE })
            }
        }
    }
    componentDidMount() {
        if (this.props.theme !== undefined) {
            if (this.props.theme !== this.state.theme) {
                if (this.props.theme === false)
                    this.setState({ email: _MAPICON, marker: _EMAILICON, call: _CALLICON })
                else
                    this.setState({ email: _BLUEMARKER, marker: _BLUEEMAIL, call: _CALLBLUE })
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
            .catch(error => {
                // console.log(error)
            })
    }

    /*  
        Page:/contact-us
        This method is called for custom notifications.
    */

    openNotificationWithIcon(type, head, desc) {
        notification[type]({
            message: head,
            description: desc,
        });
    };

    /*  
        Page:/contact-us
        This method is called on change of any fields.
    */

    _onChangeFields(e) {
        let fields = this.state.fields;
        let field = e.target.name;

        if (e.target.value.trim() === "") {
            fields[field] = "";
        } else {
            fields[field] = e.target.value;
        }
        this.setState({ fields });
    }
    /*  
        Page:/contact-us
        This method is called for custom notifications.
    */
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
            <ContactWrap>
                <Navigation />
                <GreyWrap>
                    <ContainerContact>
                        <HeadContact>
                            <HeadSpan>Contact Us</HeadSpan>
                            <hr />
                        </HeadContact>
                        <RowWrap>
                            <Row>
                                <Col sm={24} xl={12}>
                                    <LeftCol>
                                        <SubHead>Reach out to us for any inquiry.</SubHead>
                                        <FirstDiv>
                                            <FirstLabel>First Name*</FirstLabel>
                                            <FirstInput name="first_name" onChange={this._onChangeFields} value={fields.first_name} />
                                            {this.validator.message('first_name', fields.first_name, 'required|alpha_num', 'text-danger-validation')}
                                        </FirstDiv>
                                        <SecondDiv>
                                            <SecondLabel>Last Name*</SecondLabel>
                                            <SecondInput name="last_name" onChange={this._onChangeFields} value={fields.last_name} />
                                            {this.validator.message('last_name', fields.last_name, 'required|alpha_num', 'text-danger-validation')}
                                        </SecondDiv>
                                        <ThirdDiv>
                                            <ThirdLabel>Your Email*</ThirdLabel>
                                            <ThirdInput name="email" onChange={this._onChangeFields} value={fields.email} />
                                            {this.validator.message('email', fields.email, 'required|validEmail', 'text-danger-validation')}
                                        </ThirdDiv>
                                        <FourthDiv>
                                            <FourthLabel>Message*</FourthLabel>
                                            <FourthArea name="message" onChange={this._onChangeFields} value={fields.message} />
                                            {this.validator.message('message',
                                                fields.message, 'required', 'text-danger-validation')}
                                        </FourthDiv>
                                        <FifthDiv>
                                            <FifthButton onClick={this.onSubmit}>SUBMIT</FifthButton>
                                        </FifthDiv>
                                    </LeftCol>
                                </Col>
                                <Col sm={24} xl={12}>
                                    <MapWrap>
                                        <MapImage />
                                        {/* <Contact_Map /> */}
                                    </MapWrap>
                                </Col>
                            </Row>
                        </RowWrap>
                        <hr />
                        <SubfootWrap>
                            <Row>
                                <Col lg={24} xl={12}>
                                    <MainWrap1>
                                        <Img1 src={this.state.marker} />
                                        <Main>
                                            <SubSpan>Location:</SubSpan>
                                            <SubP>{contact.address}</SubP>
                                        </Main>
                                    </MainWrap1>
                                </Col>
                                <Col lg={24} xl={12}>
                                    <MainWrap2>
                                        <Img2 src={this.state.email} />
                                        <Main>
                                            <SubSpan>Email:</SubSpan>
                                            <SubP><a href={`mailto:${contact.email}`}>{contact.email} </a></SubP>
                                        </Main>
                                    </MainWrap2>
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
                        </SubfootWrap>
                    </ContainerContact>
                </GreyWrap>
                <CommonFooter />
                {(this.state.loader) ? <SpinEx className="Ex_spin">
                    <Spin size="large" />
                </SpinEx> : ""}
            </ContactWrap>
        );
    }
}
function mapStateToProps(state, ownProps) {
    return ({
        theme: state.themeReducer.theme !== undefined ? state.themeReducer.theme : ""
    });
}

export default connect(mapStateToProps)(ContactUs);
