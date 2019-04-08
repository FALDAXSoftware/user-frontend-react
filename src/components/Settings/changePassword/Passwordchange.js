/* In-built Packages */
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { connect } from "react-redux"
import { Row, Col, Input, notification, Progress, Spin } from 'antd';
import styled from 'styled-components';
import { createForm, formShape } from 'rc-form';
import { UserIconF, UserIconS, Email_req } from "../../Landing/User_forms/Login_Form"
import { HeaderCol, Save, Spin_Ex } from "../Personaldetails/PersonalDetails"
import {
    passwordChange, passwordChangeData, TF_Enable, QRData, verifyTF, verifyQRData,
    TF_Disable, disableAction
} from "../../../Actions/Settings/passwordChange";
import { Eye, ActiveEye } from "../../../Constants/images";
import FaldaxLoader from '../../../shared-components/FaldaxLoader';

const Wrapper = styled.div`
`
const ChangeRow = styled(Row)`
    &:after 
    {
        content:"";
        left: 8%;
        position: absolute;
        width: 84%;
        bottom: 0px;
        border-bottom: 1px solid #d6d6d6;
    }
`
const Passreq = styled(Email_req)`
    margin-left:0px;
    width:90%;
    @media(max-width:510px)
    {
        width:85%;
    }
`
const ChangeCol = styled.div`
    width:42%;
    height:auto;
    margin-left:auto;
    margin-right:auto;
    padding-bottom:40px;

    @media(max-width:1530px)
    {
        width:46%;
    }
    @media(max-width:1400px)
    {
        width:54%;
    }
    @media(max-width:1190px)
    {
        width:60%;
    }
    @media(max-width:1070px)
    {
        width:65%;
    }
    @media(max-width:990px)
    {
        width:75%;
    }
    @media(max-width:856px)
    {
        width:90%;
    }
`
const Old = styled.div`
    width: 635px; 
    margin:auto;
    text-align:left
    margin-top:35px;
    @media(max-width:720px)
    {
        width:400px;
    }
    @media(max-width:510px)
    {
        width:260px;
    }
`
const NewP = styled(Old)`
    margin-top:30px;
`
const Repeat = styled(Old)`
    margin-top:30px;
`
export const Old_label = styled.label`
    font-size: 14.007px;
    font-family: "Open Sans";
    color: ${props => props.theme.mode == "dark" ? '#617090' : 'rgba( 80, 80, 80, 0.502 )'};
    -moz-transform: matrix( 0.99999985149599,0,0,0.99949238260564,0,0);
    -webkit-transform: matrix( 0.99999985149599,0,0,0.99949238260564,0,0);
    -ms-transform: matrix( 0.99999985149599,0,0,0.99949238260564,0,0);
`
const New_label = styled(Old_label)`
`
const Repeat_label = styled(Old_label)`
`
export const OldInput = styled(Input)`
    margin-top:5px;
    width: 95%;
    background-color:${props => props.theme.mode == "dark" ? '#041422' : '#f8f8f8'};
    color:${props => props.theme.mode == "dark" ? 'white' : ''}
    display:inline-block;
    font-family: "Open Sans";
    font-size:16;
    height:auto;
    font-weight:600;
    padding:10px;
    padding-right:45px;
    &:focus, &:hover{
        border-color: rgb(0, 170, 250);;
        outline:0;
        box-shadow:none;
    }
    @media(max-width:720px)
    {
        width:370px;
    }
    @media(max-width:510px)
    {
        width:220px;
    }
`
const NewInput = styled(OldInput)`
`
const RepeatInput = styled(OldInput)`
`
const Button_div = styled.div`
    margin-top:30px;
    margin-bottom:50px;
`
const NewButton = styled(Save)`
    border: none;
    width:auto;
    &:hover
    {
        color: #fff;
        background-color: #40a9ff;
        border-color: #40a9ff;
    }
`
const TwofactorRow = styled(Row)`
    margin-top:40px;
`
const TFCol = styled(Col)`
`
const Head_TF = styled.p`
    font-size:20px;
    font-family:"Open Sans";
    font-weight: 600;
    color: ${props => props.theme.mode == "dark" ? "#ffffff" : "rgb( 80, 80, 80 )"};
    -moz-transform: matrix( 0.99999985149599,0,0,0.99949238260564,0,0);
    -webkit-transform: matrix( 0.99999985149599,0,0,0.99949238260564,0,0);
    -ms-transform: matrix( 0.99999985149599,0,0,0.99949238260564,0,0);
`
const IsEnabled = styled.p`
    font-size: 15.008px;
    font-family: "Open Sans";
    margin-bottom:0px !important;
    color: ${props => props.theme.mode == "dark" ? "#617090" : "rgb( 80, 80, 80 )"};
    margin-top:20px;
    -moz-transform: matrix( 0.99999985149599,0,0,0.99949238260564,0,0);
    -webkit-transform: matrix( 0.99999985149599,0,0,0.99949238260564,0,0);
    -ms-transform: matrix( 0.99999985149599,0,0,0.99949238260564,0,0);
`
const Head_text = styled.p`
    color:${props => props.theme.mode == "dark" ? "white" : ""};
`
const BarRow = styled(Row)`
    width:81%;
    margin:0 auto;
    height:auto
    background-color:${props => props.theme.mode == "dark" ? "#01090f" : "#f8f8f8"};
    margin-top:45px;
    border:1px solid #d6d6d6;
    border-radius:10px;
    margin-bottom:55px;
`
const Left_Col = styled(Col)`
    &:after 
    {
        content:"";
        top: 8%;
        position: absolute;
        height: 114%;
        right: 0px;
        border-right: 1px solid #d6d6d6;
    }
    @media(min-width:1024px)
    {
        &:after 
        {
            height: 100%;
        }
    }
    @media(max-width:992px)
    { 
        &:after 
        {
            display:none;
        }
    }
`
const Image_Wrap = styled.div`
    margin-top:50px;
`
const Bar_code = styled.img`
    width:190px;
    height:190px;
    border-width:10px solid #ffffff;
`
const Key_wrap = styled.div`
    margin-top:20px;
`
const Key_text = styled.span`
    font-size: 13.007px;
    font-family: "Open Sans";
    color: ${props => props.theme.mode == "dark" ? "white" : "rgb( 80, 80, 80 )"};
    line-height: 1.846;
    text-align: center;
    -moz-transform: matrix( 0.99999985149599,0,0,0.99949238260564,0,0);
    -webkit-transform: matrix( 0.99999985149599,0,0,0.99949238260564,0,0);
    -ms-transform: matrix( 0.99999985149599,0,0,0.99949238260564,0,0);
`
const Key = styled.p`
    font-size: 13.007px;
    font-family: "Open Sans";
    color: ${props => props.theme.mode == "dark" ? "rgb(0,170,250)" : "rgb(0,170,250)"};
    line-height: 1.846;
    text-align: center;
    -moz-transform: matrix( 0.99999985149599,0,0,0.99949238260564,0,0);
    -webkit-transform: matrix( 0.99999985149599,0,0,0.99949238260564,0,0);
    -ms-transform: matrix( 0.99999985149599,0,0,0.99949238260564,0,0);
`
const Right_Col = styled(Col)`
`
const Order_list = styled.ol`
    margin-top:50px;
    text-align:left;
    color:${props => props.theme.mode == "dark" ? "white" : ""};
`
const LI = styled.li`
    margin-top:10px;
`
const TF_code = styled.div`
    text-align:left;
    margin-top:10px;
    margin-left:40px;
`
const TF_label = styled.label`
    color:${props => props.theme.mode == "dark" ? "rgb(0,170,250)" : ""};
`
const TF_input = styled(Input)`
    width:148px;
    margin-top:10px;
    dipslay:inline-block;
`
const Enable = styled.div`
    margin-bottom: 40px;
    text-align: left;
    margin-left: 40px;
    margin-top: 30px;
`
const E_button = styled(Save)`
    border:none;
    width:auto;
    &:hover
    {
        color: #fff;
        background-color: #40a9ff;
        border-color: #40a9ff;
    }
`
const FAI = styled.img`
    cursor:pointer;
    display:inline-block;
    position: absolute; 
    margin-left: -35px;
    margin-top: 18px;
    color:#8a8a8a;
    font-size:18px;
`
const Active_FAI = styled(FAI)`
    margin-top: 13px;
`
const Progress_bar = styled(Progress)`
    margin-top:20px;
    width:100%;
    >div>.ant-progress-text
    {
        color:${props => props.theme.mode == "dark" ? "white" : ""};
    }
`
let password;

class PasswordChange extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isEnabled: "DISABLED",
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
            percent: "",
            stroke: '',
            confPass: ""
        }
    }
    static propTypes = {
        form: formShape,
    };

    handleEye(type) {
        if (type == "old") {
            if (this.state.typeEye == "password") {
                this.setState({ typeEye: "text" })
            } else {
                this.setState({ typeEye: "password" })
            }
        } else if (type == "new") {
            if (this.state.newEye == "password") {
                this.setState({ newEye: "text" })
            } else {
                this.setState({ newEye: "password" })
            }
        } else {
            if (this.state.repeatEye == "password") {
                this.setState({ repeatEye: "text" })
            } else {
                this.setState({ repeatEye: "password" })
            }
        }
    }
    submit = () => {
        this.props.form.validateFields((error, value) => {
            if (error == null && this.state.newpassIcon == true && this.state.confirmIcon == true) {
                document.querySelectorAll(".oldchange_msg")[0].style.display = "none";
                document.querySelectorAll(".newchange_msg")[0].style.display = "none";
                document.querySelectorAll(".confirmchange_msg")[0].style.display = "none";

                this.props.passwordChange(this.props.isLoggedIn, value);
            } else {
                if (value.current_password == '' || value.current_password == null || value.current_password == undefined) {
                    document.querySelectorAll(".oldchange_msg")[0].style.display = "block";
                    this.setState({ current_msg: "Old password is required." })
                }
                if (value.new_password == '' || value.new_password == null || value.new_password == undefined) {
                    document.querySelectorAll(".confirmchange_msg")[0].style.display = "block";
                    this.setState({ confirmPass_msg: "confirm password is required." })
                }
                if (value.confirm_password == '' || value.confirm_password == null || value.confirm_password == undefined) {
                    document.querySelectorAll(".newchange_msg")[0].style.display = "block";
                    this.setState({ new_msg: "New password is required." })
                }
                this.openNotificationWithIcon('error', "Error", "Please complete all required details to continue.")
            }
        });
    }
    onChangeField(value, field) {
        // old password should not have validation except required.

        // if (field == "current_password") {
        //     var re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
        //     var bool = re.test(value);
        //     if (value !== "") {
        //         if (bool == true) {
        //             this.setState({ currentpassIcon: true, password: value })
        //             document.querySelector("#passchange_icon_success").style.display = "inline-block"
        //             document.querySelector("#passchange_icon_fail").style.display = "none"
        //             document.querySelectorAll(".oldchange_msg")[0].style.display = "none";
        //         } else {
        //             this.setState({ currentpassIcon: false })
        //             document.querySelector("#passchange_icon_success").style.display = "none"
        //             document.querySelector("#passchange_icon_fail").style.display = "inline-block"
        //             document.querySelectorAll(".oldchange_msg")[0].style.display = "block";
        //             this.setState({ current_msg: "You" })
        //         }
        //     } else {
        //         this.setState({ currentpassIcon: false })
        //         document.querySelector("#passchange_icon_success").style.display = "none"
        //         document.querySelector("#passchange_icon_fail").style.display = "none"
        //         document.querySelectorAll(".oldchange_msg")[0].style.display = "none";
        //     }
        // }
        if (field == "new_password") {
            password = value;
            if (this.state.confPass !== undefined) {
                if (this.state.confPass === value) {
                    this.setState({ confirmIcon: true })
                    document.querySelector("#confirmchange_icon_success").style.display = "none"
                    document.querySelector("#confirmchange_icon_fail").style.display = "none"
                    document.querySelectorAll(".confirmchange_msg")[0].style.display = "none";
                } else {
                    this.setState({ confirmIcon: false })
                    document.querySelector("#confirmchange_icon_success").style.display = "none"
                    document.querySelector("#confirmchange_icon_fail").style.display = "inline-block"
                    document.querySelectorAll(".confirmchange_msg")[0].style.display = "block";
                    this.setState({ confirmPass_msg: "Password does not match." })
                }
            }
            var re = /^(?=.*[0-9])(?=.*[!@#$%_])[a-zA-Z0-9!@#$%_]{8,60}$/;
            var bool = re.test(value);
            var numb = /^\d+$/, letters = /^[A-Za-z]+$/, alphanum = /^(?=.*[a-zA-Z])(?=.*[0-9])/;
            if (numb.test(value) || letters.test(value)) { this.setState({ stroke: "red", percent: 20 }) }
            if (alphanum.test(value) && value.length < 6) { this.setState({ stroke: "orange", percent: 40 }) }
            if (alphanum.test(value) && value.length == 8) { this.setState({ stroke: "yellow", percent: 60 }) }
            if (re.test(value) && value.length > 8 && value.length < 60) { this.setState({ stroke: "#7CFC00", percent: 80 }) }
            if (re.test(value) && value.length > 10 && value.length < 60) { this.setState({ stroke: "#008000", percent: 100 }) }
            if (value.length > 60) { this.setState({ stroke: "red", percent: 0 }) }
            if (value !== "" && value !== undefined) {
                if (bool == true) {
                    this.setState({ newpassIcon: true, password: value })
                    document.querySelector("#newchange_icon_success").style.display = "inline-block"
                    document.querySelector("#newchange_icon_fail").style.display = "none"
                    document.querySelectorAll(".newchange_msg")[0].style.display = "none";
                } else {
                    this.setState({ newpassIcon: false })
                    document.querySelector("#newchange_icon_success").style.display = "none"
                    document.querySelector("#newchange_icon_fail").style.display = "inline-block"
                    document.querySelectorAll(".newchange_msg")[0].style.display = "block";
                    this.setState({ new_msg: "Your password must contain at least one uppercase letter,one lowercase letter, one special character(!@#$%_), and one number. Minimum 8 characters and maximum 60 characters." })
                }
            } else {
                this.setState({ newpassIcon: false, percent: 0 })
                document.querySelector("#newchange_icon_success").style.display = "none"
                document.querySelector("#newchange_icon_fail").style.display = "none"
                document.querySelectorAll(".newchange_msg")[0].style.display = "none";
            }
        }
        if (field == "confirm_password") {
            var bool = (password === value) ? true : false
            if (value !== "") {
                this.setState({ confPass: value })
                if (bool == true) {
                    this.setState({ confirmIcon: true })
                    document.querySelector("#confirmchange_icon_success").style.display = "inline-block"
                    document.querySelector("#confirmchange_icon_fail").style.display = "none"
                    document.querySelectorAll(".confirmchange_msg")[0].style.display = "none";
                } else {
                    this.setState({ confirmIcon: false })
                    document.querySelector("#confirmchange_icon_success").style.display = "none"
                    document.querySelector("#confirmchange_icon_fail").style.display = "inline-block"
                    document.querySelectorAll(".confirmchange_msg")[0].style.display = "block";
                    this.setState({ confirmPass_msg: "Password does not match." })
                }
            } else {
                this.setState({ confirmIcon: false })
                document.querySelector("#confirmchange_icon_success").style.display = "none"
                document.querySelector("#confirmchange_icon_fail").style.display = "none"
                document.querySelectorAll(".confirmchange_msg")[0].style.display = "none";
            }
        }
    }

    TF_AUTH() {
        if (this.props.profileDetails.is_twofactor == true) {
            this.props.TF_Disable(this.props.isLoggedIn)
        } else
            this.props.TF_Enable(this.props.isLoggedIn);
    }

    changeOTP(value, field) {
        if (field == "otp") {
            var re = /^\b[a-zA-Z0-9]{6}\b|\b[a-zA-Z0-9]{6}\b/;
            var bool = re.test(value);
            if (value !== "") {
                if (bool == true) {
                    this.setState({ otpIcon: true })
                    document.querySelector("#otp_success").style.display = "inline-block"
                    document.querySelector("#otp_fail").style.display = "none"
                    document.querySelectorAll(".MSG_OTP")[0].style.display = "none";
                } else {
                    this.setState({ otpIcon: false })
                    document.querySelector("#otp_success").style.display = "none"
                    document.querySelector("#otp_fail").style.display = "inline-block"
                    document.querySelectorAll(".MSG_OTP")[0].style.display = "block";
                    this.setState({ otp_msg: "Otp should have 6 characters." })
                }
            } else {
                this.setState({ otpIcon: false })
                document.querySelector("#otp_success").style.display = "none"
                document.querySelector("#otp_fail").style.display = "none"
                document.querySelectorAll(".MSG_OTP")[0].style.display = "none";
            }
        }
    }
    OTPfield(e) {
        this.setState({ verify_otp: e.target.value })
    }
    finalEnable() {
        let value = {};
        value["otp"] = this.state.verify_otp;
        this.props.verifyTF(this.props.isLoggedIn, value)
    }

    openNotificationWithIcon(type, head, desc) {
        notification[type]({
            message: head,
            description: desc,
        });
    };
    componentDidMount() {
        if (this.props.profileDetails) {
            if (this.props.profileDetails.is_twofactor == false) {
                this.setState({ is_twofactor: "ENABLE", isEnabled: "DISABLED" })
            } else {
                this.setState({ is_twofactor: "DISABLE", isEnabled: "ENABLED" })
            }
        }
    }
    componentWillReceiveProps(props, newProps) {
        if (props.passChange !== false) {
            if (props.passChange.status == 200) {
                this.props.form.resetFields();
                this.setState({ percent: 0 })
                this.openNotificationWithIcon("success", "Change Password", props.passChange.message)
            } else {
                this.openNotificationWithIcon("error", "Change Password", props.passChange.err)
            }
            this.props.passwordChangeData();
        }
        if (props.verifyOTP) {
            if (props.verifyOTP.status == 200) {
                this.openNotificationWithIcon("success", "Two-Factor Authentication", props.verifyOTP.message)
                this.setState({ is_twofactor: "DISABLE", show_QR: false, isEnabled: "ENABLED" })
            } else {
                this.openNotificationWithIcon("error", "Two-Factor Auth..", props.verifyOTP.err)
            }
            this.props.verifyQRData();
        }
        if (props.DisableTF) {
            if (props.DisableTF.status == 200) {
                this.openNotificationWithIcon("success", "Two-Factor Authentication", props.DisableTF.message)
                this.setState({ is_twofactor: "ENABLE", isEnabled: "DISABLED", show_QR: false })
            } else {
                this.openNotificationWithIcon("error", "Two-Factor Authentication", props.DisableTF.err)
            }
            this.props.disableAction();
        }

        if (props.QR_code) {
            this.setState({ show_QR: true });
            if (props.QR_code.dataURL !== undefined && props.QR_code.tempSecret !== undefined) {
                this.setState({ QR_img: props.QR_code.dataURL, Key: props.QR_code.tempSecret })
            }
            this.props.QRData();
        }
    }
    render() {
        var me = this;
        const { getFieldProps } = this.props.form;
        const { isEnabled, typeEye, newEye, current_msg, percent, repeatEye } = this.state;

        return (
            <Wrapper>
                <Row>
                    <Col span={6} />
                    <HeaderCol span={12}>
                        <span>Change Your Password</span>
                    </HeaderCol>
                </Row>
                <ChangeRow>
                    <ChangeCol>
                        <Old>
                            <Old_label>Old Password*</Old_label>
                            <div>
                                <OldInput type={typeEye}  {...getFieldProps('current_password', {
                                    onChange(e) { me.onChangeField(e.target.value, "current_password") }, // have to write original onChange here if you need
                                    rules: [{ type: "string", required: true, whitespace: true }],
                                })} />
                                {
                                    (typeEye == "password") ? <FAI src={Eye} onClick={this.handleEye.bind(this, "old")} /> : <Active_FAI src={ActiveEye} onClick={this.handleEye.bind(this, "old")} />
                                }
                                <UserIconS id="passchange_icon_success" type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
                                <UserIconF id="passchange_icon_fail" type="close-circle" theme="twoTone" twoToneColor="red" />
                            </div>
                            <Passreq className="oldchange_msg">{current_msg}</Passreq>
                        </Old>
                        <NewP>
                            <New_label>New Password*</New_label>
                            <div>
                                <NewInput type={newEye} {...getFieldProps('new_password', {
                                    onChange(e) { me.onChangeField(e.target.value, "new_password") }, // have to write original onChange here if you need
                                    rules: [{ type: "string", required: true, whitespace: true }],
                                })} />
                                {
                                    (newEye == "password") ? <FAI src={Eye} onClick={this.handleEye.bind(this, "new")} /> : <Active_FAI src={ActiveEye} onClick={this.handleEye.bind(this, "new")} />
                                }
                                <UserIconS id="newchange_icon_success" type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
                                <UserIconF id="newchange_icon_fail" type="close-circle" theme="twoTone" twoToneColor="red" />
                            </div>
                            <Passreq className="newchange_msg">{this.state.new_msg}</Passreq>
                        </NewP>
                        <Repeat>
                            <Repeat_label>Re-Enter New Password*</Repeat_label>
                            <div>
                                <RepeatInput type={repeatEye} {...getFieldProps('confirm_password', {
                                    onChange(e) { me.onChangeField(e.target.value, "confirm_password") }, // have to write original onChange here if you need
                                    rules: [{ type: "string", required: true, whitespace: true }],
                                })} />
                                {
                                    (repeatEye == "password") ? <FAI src={Eye} onClick={this.handleEye.bind(this, "repeat")} /> : <Active_FAI src={ActiveEye} onClick={this.handleEye.bind(this, "repeat")} />
                                }
                                <UserIconS id="confirmchange_icon_success" type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
                                <UserIconF id="confirmchange_icon_fail" type="close-circle" theme="twoTone" twoToneColor="red" />
                            </div>
                            <Passreq className="confirmchange_msg">{this.state.confirmPass_msg}</Passreq>

                            <Progress_bar type="line" size="small" percent={percent} strokeColor={this.state.stroke} />
                        </Repeat>
                        <Button_div>
                            <NewButton onClick={this.submit}>Save New Password</NewButton>
                        </Button_div>
                    </ChangeCol>
                </ChangeRow>
                <TwofactorRow>
                    <TFCol>
                        <Head_TF>Two-Factor Authentication</Head_TF>
                        <IsEnabled> Status:
                            {isEnabled == 'DISABLED' ?
                                <span style={{ color: 'red' }}> {isEnabled}</span>
                                : <span style={{ color: 'green' }}> {isEnabled}</span>
                            }
                        </IsEnabled>
                        <Head_text>
                            {isEnabled == 'DISABLED' ?
                                <span>Two-Factor Authentication significantly increases the security of your account. We highly recommend that you enable it. </span>
                                : <span>Way to go! You care about your security as much as we do. Thanks for enabling Two-Factor Authentication!</span>
                            }
                        </Head_text>
                        <Button_div>
                            <NewButton onClick={this.TF_AUTH.bind(this)}> {this.state.is_twofactor} AUTHENTICATOR</NewButton>
                        </Button_div>
                    </TFCol>
                </TwofactorRow>
                {(this.state.show_QR == true) ?
                    <BarRow >
                        <Left_Col sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 12 }}>
                            <Image_Wrap>
                                <Bar_code src={this.state.QR_img} />
                            </Image_Wrap>
                            <Key_wrap>
                                <Key_text>16 Digit Key</Key_text>
                                <Key>{this.state.Key}</Key>
                            </Key_wrap>
                        </Left_Col>
                        <Right_Col sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 12 }}>
                            <Order_list>
                                <LI>Install an authenticator app on your mobile device. We suggest Google Authenticator or Authy. </LI>
                                <LI>Scan the QR code when prompted by your Authenticator.</LI>
                                <LI>In case your phone gets stolen or erased, you will need this code to link FALDAX with a new app.</LI>
                                <LI>Do not share the code with anyone. FALDAX will never ask you for this code.</LI>
                            </Order_list>
                            <TF_code>
                                <TF_label>Enter your two-factor code here:</TF_label>
                                <div>
                                    <TF_input onChange={this.OTPfield.bind(this)} />
                                    <UserIconS id="otp_success" type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
                                    <UserIconF id="otp_fail" type="close-circle" theme="twoTone" twoToneColor="red" />
                                </div>
                                <Passreq className="MSG_OTP">{this.state.otp_msg}</Passreq>
                            </TF_code>
                            <Enable>
                                <E_button onClick={this.finalEnable.bind(this)}>
                                    ENABLE
                            </E_button>
                            </Enable>
                        </Right_Col>
                    </BarRow>
                    : ''}
                {(this.props.loader == true) ? <FaldaxLoader /> : ""}
            </Wrapper>
        );
    }
}

function mapStateToProps(state) {
    return ({
        passChange: state.simpleReducer.changePass !== undefined ? state.simpleReducer.changePass : false,
        profileDetails: state.simpleReducer.profileDetails !== undefined ? state.simpleReducer.profileDetails.data[0] : "",
        QR_code: state.passwordReducer.QR_code !== undefined ? state.passwordReducer.QR_code : null,
        verifyOTP: state.passwordReducer.verifyOTP !== undefined ? state.passwordReducer.verifyOTP : null,
        DisableTF: state.passwordReducer.DisableTF !== undefined ? state.passwordReducer.DisableTF : null,
        loader: state.simpleReducer.loader
    })
}

const mapDispatchToProps = dispatch => ({
    passwordChange: (isLoggedIn, value) => dispatch(passwordChange(isLoggedIn, value)),
    passwordChangeData: () => dispatch(passwordChangeData()),
    TF_Enable: (isLoggedIn) => dispatch(TF_Enable(isLoggedIn)),
    QRData: () => dispatch(QRData()),
    verifyTF: (isLoggedIn, value) => dispatch(verifyTF(isLoggedIn, value)),
    verifyQRData: () => dispatch(verifyQRData()),
    TF_Disable: (isLoggedIn) => dispatch(TF_Disable(isLoggedIn)),
    disableAction: () => dispatch(disableAction())
})

export default connect(mapStateToProps, mapDispatchToProps)(createForm()(PasswordChange));
