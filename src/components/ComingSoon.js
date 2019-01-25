import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Button, Modal, Icon, notification } from 'antd';
import styled from 'styled-components'
import { globalVariables } from '../Globals';
import { ComingImg } from "../Constants/images";

export const Modal_wrap = styled.div`
width: 465px;
margin-left: auto;
margin-right: auto;
@media(max-width:576px)
    {
        width:350px;   
    }
    @media(max-width:425px)
    {
        width:256px;
    }
`
export const Sub_wrap = styled.div`
    margin-top:40px;
`
export const Email_input = styled.input`
    border:1px solid #e2e6ea;
    background-color:#f8f8f8;
    border-radius:5px;
    min-height:45px;
    width:100%;
    padding-left:5px;
    margin-top: 5px;
    @media(max-width:576px)
    {

    }
`
class ComingSoon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comingSoon: this.props.visible ? true : '',
            email_address: "",
            email_msg: "",
        }
    }

    handleComing = (e) => {
        this.setState({
            comingSoon: false,
        });
    }

    comingCancel = (e) => {
        this.setState({
            comingSoon: false,
        });
        this.props.comingCancel(e);
    }
    openNotification() {
        notification.open({
            message: 'Thank You',
            description: 'You will receive an email shortly',
            duration: 6,
            icon: <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" />,
        });
    };
    openNotification1() {
        notification.open({
            message: 'Subscribed',
            description: 'You have already Subscribed for FALDAX.',
            duration: 6,
            icon: <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" />,
        });
    };
    openNotificationWithIcon(type, head, desc) {
        notification[type]({
            message: head,
            description: desc,
        });
    };

    send_email() {
        const values = { email: this.state.email_address };
        this.setState({ email_address: '' });
        var re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
        if (re.test(this.state.email_address)) {

            this.setState({ email_msg: "" })
            fetch(globalVariables.API_URL + "/users/email-subscription", {
                method: "post",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values)
            })
                .then(response => response.json())
                .then((responseData) => {
                    if (responseData.status == 500) {
                        this.openNotification1();
                    } else {
                        this.openNotification();
                        this.setState({ visible: false, email_msg: "" })
                    }
                })
                .catch(error => { })
        } else {
            this.setState({ email_msg: "*email address not valid" })
            this.openNotificationWithIcon('error', 'Error', 'Please enter valid email address.');
        }
    }
    render() {
        return (
            <div>
                <Modal
                    title={<img src={ComingImg} />}
                    visible={this.props.visible}
                    onOk={(e) => this.handleComing()}
                    onCancel={(e) => this.comingCancel(e)}
                    footer={null}
                    width={605}
                    height={460}
                    className="simple-maps"
                >
                    <Modal_wrap>
                        <h3 style={{ fontFamily: "Open Sans", fontSize: "40px", textAlign: "center", color: "rgb( 15, 71, 123 )", fontWeight: "600", marginTop: "40px" }}>Coming Soon</h3>

                        <Sub_wrap>
                            <label style={{ color: 'black', fontWeight: "600", marginTop: "20px" }}> Enter your email address to receive updates: </label>
                            <Email_input placeholder="Email Address" value={this.state.email_address} onChange={(e) => { this.setState({ email_address: e.target.value }); }} />
                        </Sub_wrap>
                        <div style={{ marginTop: '20px', minHeight: '20px' }}>
                            <Button style={{ float: 'right', color: 'white', borderColor: '#00a7ff', backgroundColor: "#0f477b", height: "45px" }} onClick={() => this.send_email()}>SUBMIT</Button>
                        </div>
                    </Modal_wrap>
                </Modal>
            </div >
        );
    }
}
export default ComingSoon;