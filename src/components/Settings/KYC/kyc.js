/* In-built Packages */
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { connect } from "react-redux"
import { Row, Col, Tabs, Button, Input, notification, Steps } from 'antd';
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
    font-size: 20px;
    font-family: "Open Sans";
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
            next: 0
        }
    }


    next_step(a) {
        this.setState({ next: a })
    }
    back_step(a) {
        this.setState({ next: a })
    }
    render() {

        return (
            <KYC_wrap>
                <KYC_head>
                    Identity Verification
                </KYC_head>
                <KYC_progress>
                    <Steps direction="horizontal" size="small" current={0}>
                        <Step />
                        <Step />
                        <Step />
                    </Steps>
                </KYC_progress>
                {(this.state.next == 0) ?
                    <KYCForm back_step={(a)=>this.back_step(a)} next_step={(a) => this.next_step(a)} /> : ""
                }
                {(this.state.next == 1) ? <IDselect back_step={(a)=>this.back_step(a)} next_step={(a) => this.next_step(a)} /> : ""}
                {(this.state.next == 2) ? <SSN back_step={(a)=>this.back_step(a)} next_step={(a) => this.next_step(a)} /> : ""}
                {(this.state.next == 3) ? <DocUpload back_step={(a)=>this.back_step(a)} next_step={(a) => this.next_step(a)} /> : ""}

            </KYC_wrap>
        );
    }
}

const mapStateToProps = (state) => {
    /* console.log("personalDetails",state) */
    return {
        ...state,
        email: state.simpleReducer.profileDetails !== undefined ? state.simpleReducer.profileDetails.data[0].email : "",
        profileDetails: state.simpleReducer.profileDetails !== undefined ? state.simpleReducer.profileDetails.data[0] : ""
    }
}
const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(createForm()(KYC));
