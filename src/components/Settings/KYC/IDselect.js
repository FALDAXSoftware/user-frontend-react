import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { connect } from "react-redux"
import { Row, Col, Button, notification } from 'antd';
import styled from 'styled-components';
import { kycFormAction, kycformData } from "../../../Actions/Settings/passwordChange";
import {
    ActiveIdentity, IdentityLogo, ActiveLicence, ActivePassport, ActiveSSN, SSN, LicenceLogo, PassportLogo
} from "../../../Constants/images";

const KYC_type_select_row = styled.div`
  width:50%;
  margin 55px auto;
`
const Select_text = styled(Col)`
    margin-top:20px;
    margin-bottom:30px;
    color:${props => props.theme.mode == "dark" ? "white" : ""};
`
const Select_Col1 = styled(Col)`
    @media(max-width:575px)
    {
        margin-top:30px;
    }
`
const Select_Col2 = styled(Col)`
    @media(max-width:575px)
    {
        margin-top:30px;
    }
`
const Select_Col3 = styled(Col)`
    @media(max-width:1200px)
    {
        margin-top:30px;
    }
`
const Select_Col4 = styled(Col)`
    @media(max-width:1200px)
    {
        margin-top:30px;
    }
`
export const Button_wrap = styled.div`
    margin-top:230px;
`
export const Sub_wrap = styled.div`
`
export const Back_Button = styled(Button)`
    font-size: 13.217px;
    font-family: "Open Sans";
    height:50px;
    font-weight: bold;
    text-transform: uppercase;
    line-height: 2.875;
    width:120px;
    border-radius: 24px;
    color:black;
    background-color:white;
    border:1px solid black;
    
    margin-right:10px;
`
export const Next_Button = styled(Button)`
    margin-left:10px;
    font-size: 13.217px;
    font-weight: bold;
    text-transform: uppercase;
    font-family: "Open Sans";
    border-radius: 24px;
    background-color:#00bdd2;
    color:black;
    border:1px solid black;
    height:50px;
    width:120px;
`

class IDselect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            background: ''
        };
    }
    componentDidMount() {
        if (this.props.theme !== undefined) {
            if (this.props.theme == false)
                this.setState({ background: "background" })
            else
                this.setState({ background: "background-night" })
        }
    }
    next_step() {
        var abcd = {};
        if (document.getElementById('passport').checked) {
            abcd["id_type"] = 1;
            abcd["steps"] = 2;
            this.props.kycFormAction(this.props.isLoggedIn, abcd);
            this.props.next_step(3, "Passport")
        } else if (document.getElementById('license').checked) {
            abcd["id_type"] = 2;
            abcd["steps"] = 2;
            this.props.kycFormAction(this.props.isLoggedIn, abcd);
            this.props.next_step(3, "Driver's license")
        } else if (document.getElementById('identity').checked) {
            abcd["id_type"] = 3;
            abcd["steps"] = 2;
            this.props.kycFormAction(this.props.isLoggedIn, abcd);
            this.props.next_step(3, "Identity")
        } else if (document.getElementById('ssn').checked) {
            abcd["id_type"] = 4;
            abcd["steps"] = 2;
            this.props.kycFormAction(this.props.isLoggedIn, abcd);
            this.props.next_step(2, "ssn")
        } else {
            this.openNotificationWithIcon("error", "KYC", "Please select any one option.")
        }
    }

    back_step() {
        this.props.next_step(0)
    }

    openNotificationWithIcon(type, head, desc) {
        notification[type]({
            message: head,
            description: desc,
        });
    };
    render() {
        return (
            <div>
                <KYC_type_select_row>
                    {console.log("SSN", this.props.countryFlag)}
                    {this.props.countryFlag == true ?
                        <Row>
                            <Select_text md={{ span: 24 }}>
                                Select ID type
                        </Select_text>

                            <Select_Col1 sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 6 }}>
                                <label className="kyc-radio-container">
                                    <input id="passport" type="radio" name="kyc_type" />
                                    <span className={`${this.state.background}`}>
                                        <img src={ActivePassport} className="active" />
                                        <img src={PassportLogo} className="normal" />
                                        <span className="text">Passport</span>
                                    </span>
                                </label>
                            </Select_Col1>
                            <Select_Col2 sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 6 }}>
                                <label className="kyc-radio-container">
                                    <input id="license" type="radio" name="kyc_type" />
                                    <span className={`${this.state.background} license`}>
                                        <img src={ActiveLicence} className="active" />
                                        <img src={LicenceLogo} className="normal" />
                                        <span className="text">Driver's license</span>
                                    </span>
                                </label>
                            </Select_Col2>
                            <Select_Col3 sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 6 }}>
                                <label className="kyc-radio-container">
                                    <input id="identity" type="radio" name="kyc_type" />
                                    <span className={`${this.state.background} identity`}>
                                        <img src={ActiveIdentity} className="active" />
                                        <img src={IdentityLogo} className="normal" />
                                        <span className="text">Identity</span>
                                    </span>
                                </label>
                            </Select_Col3>

                            <Select_Col4 sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 6 }}>
                                <label className="kyc-radio-container">
                                    <input id="ssn" type="radio" name="kyc_type" />
                                    <span className={`${this.state.background} ssn`}>
                                        <img src={ActiveSSN} className="active" />
                                        <img src={SSN} className="normal" />
                                        <span className="text">Social Security Number</span>
                                    </span>
                                </label>
                            </Select_Col4>

                        </Row>
                        : <Row>
                            <Select_text md={{ span: 24 }}>
                                Select ID type
                    </Select_text>

                            <Select_Col1 sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 8 }}>
                                <label className="kyc-radio-container">
                                    <input id="passport" type="radio" name="kyc_type" />
                                    <span className={`${this.state.background}`}>
                                        <img src={ActivePassport} className="active" />
                                        <img src={PassportLogo} className="normal" />
                                        <span className="text">Passport</span>
                                    </span>
                                </label>
                            </Select_Col1>
                            <Select_Col2 sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 8 }}>
                                <label className="kyc-radio-container">
                                    <input id="license" type="radio" name="kyc_type" />
                                    <span className={`${this.state.background} license`}>
                                        <img src={ActiveLicence} className="active" />
                                        <img src={LicenceLogo} className="normal" />
                                        <span className="text">Driver's license</span>
                                    </span>
                                </label>
                            </Select_Col2>
                            <Select_Col3 sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 8 }}>
                                <label className="kyc-radio-container">
                                    <input id="identity" type="radio" name="kyc_type" />
                                    <span className={`${this.state.background} identity`}>
                                        <img src={ActiveIdentity} className="active" />
                                        <img src={IdentityLogo} className="normal" />
                                        <span className="text">Identity</span>
                                    </span>
                                </label>
                            </Select_Col3>
                        </Row>}
                </KYC_type_select_row>
                <Button_wrap>
                    <Sub_wrap>
                        <Back_Button onClick={this.back_step.bind(this)} type="primary">Back</Back_Button>
                        <Next_Button onClick={this.next_step.bind(this)} type="primary">Next</Next_Button>
                    </Sub_wrap>
                </Button_wrap>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ...state,
        isLoggedIn: state.simpleReducer.isLoggedIn !== undefined ? state.simpleReducer.isLoggedIn : "",
    }
}
const mapDispatchToProps = dispatch => ({
    kycFormAction: (is, data) => dispatch(kycFormAction(is, data)),
    kycformData: (data) => dispatch(kycformData(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(IDselect);