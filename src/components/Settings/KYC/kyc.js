/* In-built Packages */
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { connect } from "react-redux"
import { Steps, Icon } from 'antd';
import styled from 'styled-components';
import { createForm } from 'rc-form';
/*Import Components*/
import KYCForm from "./KYCForm"
import IDselect from "./IDselect"
import SSN from "./SSN"
import DocUpload from './DocUpload';

const Step = Steps.Step;

/* Styled-Components */
const KYC_wrap = styled.div`
    margin-bottom: 140px;
`
const KYC_head = styled.div`
    font-size:20px;
    font-family:"Open Sans";
    font-weight: 600;
    color: ${props => props.theme.mode == "dark" ? "white" : "rgb( 80, 80, 80 )"};
    margin-top:20px;
`
const KYC_progress = styled.div`
    width:26%;
    text-align:left;
    margin-top:50px;
    margin-left:auto;
    margin-right:auto;
    & .ant-steps-item-icon
    {
        background-color:rgb(0,170,250);
        border-color:rgb(0,170,250);
    }
    & .ant-steps-finish-icon
    {
        color:white;
    }
    @media(max-width:480px)
    {
        display:none;
    }
`
const Done_wrap = styled.div`
    margin-top:80px;
`
const Kyc_succ = styled.div`
    width:80%;
    margin:auto;
    font-size: 20px;
    font-family: "Open Sans";
    color: ${props => props.theme.mode == "dark" ? "white" : "rgb( 80, 80, 80 )"};
    margin-top:20px;
`

class KYC extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ON_OFF: "OFF",
            Key: null,
            typeEye: "password",
            newEye: "password",
            repeatEye: "password",
            currentpassIcon: false,
            newpassIcon: false,
            confirmIcon: false,
            otpIcon: false,
            is_twofactor: "ENABLE",
            QR_img: null,
            otp_msg: null,
            next: 0,
            nexts: 0,
            is_kyc_done: false,
            countryChange: null,
        }
    }

    next_step(a, type = null, countryChange = null) {
        this.setState({ next: a })
        if (type == "Passport" || type == "Driver's license" || type == "Identity") {
            var b = a - 1
            this.setState({ nexts: b, docType: type })
        } else if (type == "ssn") {
            var b = a
            this.setState({ nexts: b })
        } else
            this.setState({ nexts: a })
        if (countryChange !== null) {
            this.setState({ countryChange })
        }
    }
    back_step(a) {
        this.setState({ next: a })
        this.setState({ nexts: a })
    }

    render() {
        const { next } = this.state;
        const { is_kyc_done } = this.state;
        return (
            <KYC_wrap>
                {(this.props.is_kyc_done !== true && next !== 5) ?
                    <div>
                        <KYC_head>
                            Identity Verification
                        </KYC_head>
                        <KYC_progress>
                            <Steps direction="horizontal" size="small" current={this.state.nexts}>
                                <Step />
                                <Step />
                                <Step />
                            </Steps>
                        </KYC_progress>
                    </div>
                    : <Done_wrap><Icon style={{ fontSize: "50px" }} type="check-circle" theme="twoTone" twoToneColor="#52c41a" /> <Kyc_succ><span><b>Thank you.</b> <br />All of your information has been received and will be reviewed by our Identity Verification team. You will receive a notification and an email within 24 hours informing you of our decision. If you don't hear anything after 24 hours, please visit the support page to let us know.</span></Kyc_succ></Done_wrap>}
                {(this.state.next == 0 && this.props.is_kyc_done !== true) ?
                    <KYCForm back_step={(a) => this.back_step(a)} next_step={(a, type, ssn) => this.next_step(a, type, ssn)} /> : ""
                }
                {(next == 1 && is_kyc_done !== true) ? <IDselect {...this.props} countryFlag={this.state.countryChange} back_step={(a) => this.back_step(a)} next_step={(a, type) => this.next_step(a, type)} /> : ""}
                {(next == 2 && is_kyc_done !== true) ? <SSN back_step={(a) => this.back_step(a)} next_step={(a, type) => this.next_step(a, type)} /> : ""}
                {(next == 3 && is_kyc_done !== true) ? <DocUpload docText={this.state.docType} back_step={(a) => this.back_step(a)} next_step={(a) => this.next_step(a)} /> : ""}
            </KYC_wrap>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ...state,
        is_kyc_done: state.simpleReducer.profileDetails !== undefined ? state.simpleReducer.profileDetails.data[0].is_kyc_done : "",
        email: state.simpleReducer.profileDetails !== undefined ? state.simpleReducer.profileDetails.data[0].email : "",
        profileDetails: state.simpleReducer.profileDetails !== undefined ? state.simpleReducer.profileDetails.data[0] : "",
        theme: state.themeReducer.theme !== undefined ? state.themeReducer.theme : ""

    }
}
const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(createForm()(KYC));
