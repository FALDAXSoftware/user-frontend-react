/* In-built Packages */
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { connect } from "react-redux"
import { Row, Col, Tabs, Button, Input, notification, Steps, Icon } from 'antd';
import styled from 'styled-components';
import { createForm, formShape } from 'rc-form';


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
    color: rgb( 80, 80, 80 );
    margin-top:20px;
`
const KYC_progress = styled.div`
    width:26%;
    text-align:left;
    margin-top:50px;
    margin-left:auto;
    margin-right:auto;

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
    color: rgb( 80, 80, 80 );
    margin-top:20px;
`
const kyc_check = styled(Icon)`
`


class KYC extends React.Component {
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
            nexts: 0
        }
    }


    next_step(a, type = null) {
        this.setState({ next: a })
        if (type == "Passport" || type == "Driver's license" || type == "Identity") {
            var b = a - 1
            this.setState({ nexts: b, docType: type })
        }
        else if (type == "ssn") {
            /* console.log("ssn_original",type,a) */
            var b = a
            this.setState({ nexts: b })
        }
        else
            this.setState({ nexts: a })

    }
    back_step(a) {
        this.setState({ next: a })
        this.setState({ nexts: a })
    }
    render() {

        return (
            <KYC_wrap>
                {/* console.log(this.state) */}
                {(this.props.is_kyc_done !== true && this.state.next !== 5) ?
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
                    : <Done_wrap><Icon style={{ fontSize: "50px" }} type="check-circle" theme="twoTone" twoToneColor="#52c41a" /> <Kyc_succ><span><b>Thank you.</b> <br />All of your information has been recieved and will be reviewed by our Identity Verification team. You will recieve a notification and an email within 24 hours informing you of our decision. If you don't hear anything after 24 hours, please visit the support page to let us know.</span></Kyc_succ></Done_wrap>}
                {(this.state.next == 0 && this.props.is_kyc_done !== true) ?
                    <KYCForm back_step={(a) => this.back_step(a)} next_step={(a) => this.next_step(a)} /> : ""
                }
                {(this.state.next == 1 && this.props.is_kyc_done !== true) ? <IDselect back_step={(a) => this.back_step(a)} next_step={(a, type) => this.next_step(a, type)} /> : ""}
                {(this.state.next == 2 && this.props.is_kyc_done !== true) ? <SSN back_step={(a) => this.back_step(a)} next_step={(a, type) => this.next_step(a, type)} /> : ""}
                {(this.state.next == 3 && this.props.is_kyc_done !== true) ? <DocUpload docText={this.state.docType} back_step={(a) => this.back_step(a)} next_step={(a) => this.next_step(a)} /> : ""}
            </KYC_wrap>
        );
    }
}

const mapStateToProps = (state) => {
    /* console.log("personalDetails",state) */
    return {
        ...state,
        is_kyc_done: state.simpleReducer.profileDetails !== undefined ? state.simpleReducer.profileDetails.data[0].is_kyc_done : "",
        email: state.simpleReducer.profileDetails !== undefined ? state.simpleReducer.profileDetails.data[0].email : "",
        profileDetails: state.simpleReducer.profileDetails !== undefined ? state.simpleReducer.profileDetails.data[0] : ""
    }
}
const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(createForm()(KYC));
