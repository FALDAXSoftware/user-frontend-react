/* Built-in Packages */
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Button, Modal, Input, notification } from 'antd';
/* import { DropdownButton, ButtonToolbar } from 'react-bootstrap'; */
import styled from 'styled-components';
import SimpleReactValidator from "simple-react-validator";
import { CopyToClipboard } from 'react-copy-to-clipboard';

/* Styled-Components */


/* Components */
import { RefInput } from 'COMPONENTS/SETTINGS/referral';
import { globalVariables } from 'Globals';
import FaldaxLoader from 'SHARED-COMPONENTS/FaldaxLoader';

let { API_URL } = globalVariables;
const WalletModal = styled(Modal)`
    width:656px !important;
    height:auto;
    margin-left:auto;
    margin-right:auto;
    >.ant-modal-content>.ant-modal-header
    {
        padding:0px;
    }
    >.ant-modal-content>.ant-modal-body
    {
        background-color:${props => props.theme.mode === "dark" ? "#061a2b" : ""};
    }
    >.ant-modal-content>.ant-modal-close>.ant-modal-close-x
    {
        color:white;
    }
    @media(max-width:767px)
    {
        top:24px;
        width:500px !important;
    }
    @media(max-width:575px)
    {
        width:300px !important;
    }
`
const Label = styled.label`
    font-size: 16px;
    font-family: "Open Sans";
    color: ${props => props.theme.mode === "dark" ? "rgb( 255, 255, 255 )" : "black"};
`
const ModalWrap = styled.div`
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    padding-bottom:60px;

`
const TitleDiv = styled.div`
    background-color:#4c84ff;
    color:white;
    height:85px;
    display: flex;
    justify-content: center;
    align-items: center;
`
const Title = styled.span`
    font-size: 20px;
    font-family: "Open Sans";
    color: rgb(255, 255, 255);
    font-weight: bold;
    text-transform: uppercase;
`
const Rediv = styled.div`
    margin-top:35px;
`
const WallInput = styled(Input)`
    height:48px;
    margin-top:10px;
    width:100%;
    background-color:${props => props.theme.mode === "dark" ? "#061a2b" : "#f8f8f8"};
    display:block;
    color:${props => props.theme.mode === "dark" ? "white" : ""};
    caret-color:${props => props.theme.mode === "dark" ? "white" : ""};
`

const Fee = styled.span`
    float:left;
    font-size: 16px;
    font-family: "Open Sans";
    color: ${props => props.theme.mode === "dark" ? "white" : "black"}; 
    @media(max-width:767px)
    {
        float:none;
        display:block;   
    }
`
const TotPay = styled.span`
    float:right;
    font-size: 16px;
    font-family: "Open Sans";
    color: ${props => props.theme.mode === "dark" ? "white" : "black"}; 
    @media(max-width:767px)
    {
        float:none;
        display:block;   
    }
`
const SendButton = styled(Button)`
    font-size: 16px;
    font-family: "Open Sans";
    color: rgb( 255, 255, 255 );
    font-weight: bold;
    text-transform: uppercase;
    height:48px;
    color:white;
    background-color:#4c84ff;
    width:232px;
    @media(max-width:767px)
    {
        width: 125px;
    }
`
const CopyToClipboardCSS = styled(CopyToClipboard)`
    display:inline;
`
const SendWrap = styled.div`
    text-align: center; 
    margin-top: 60px;
    display: block;
    @media(max-width:767px)
    {
        padding-top:20px;
    }
`
const TotDiv = styled.div`
    height:25px;
    margin-top:45px;
    width:100%;
    // width: 462px;
`
class WalletPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
            copied: false,
            comingSoon: this.props.visible ? true : '',
            email_address: "",
            email_msg: "",
            receive: {},
            receiveAdd: "receive_add",
            show: false,
            sendFields: {
                amount: 0,
                destination_address: ""
            },
            loader: false
        }
        this.validator = new SimpleReactValidator({
            gtzero: {  // name the rule
                message: 'value must be greater than zero',
                rule: (val, params, validator) => {
                    if (val > 0) {
                        return true;
                    } else {
                        return false;
                    }
                },
                required: true  // optional
            }
        });
        this.sendChange = this.sendChange.bind(this);
        this.sendSubmit = this.sendSubmit.bind(this);
    }

    /* Life Cycle Methods */

    componentDidMount() {
        if (this.props.title === "RECEIVE") {
            this.setState({ loader: true })
            fetch(`${API_URL}/wallet/get-qr-code/${this.props.coin_code}`, {
                method: "get",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: "Bearer " + this.props.isLoggedIn
                }
            }).then(response => response.json())
                .then((responseData) => {

                    this.setState({ receive: responseData.receiveCoin, loader: false, show: true })

                })
                .catch(error => {
                    console.log(error)
                })
        }
    }

    /* 
        Page: /wallet
        This method is called when we have to copy address to clipboard.
    */

    SearchText() {
        // Copy to clipboard example
        document.querySelectorAll(".ant-input-search-button")[0].onclick = function () {
            // Select the content
            document.querySelectorAll(".receive_add > input")[0].select();
            // Copy to the clipboard
            document.execCommand('copy');
        };
        this.openNotificationWithIcon('success', "Copied", "Address Copied to Clipboard");
    }

    /* 
        Page: /wallet
        This method is called when we have to open the modal.
    */

    handleComing = (e) => {
        this.setState({
            comingSoon: false,
        });
    }

    /* 
        Page: /wallet
        This method is called when we have to close the modal.
    */

    comingCancel = (e) => {
        this.setState({
            comingSoon: false,
        });
        this.props.comingCancel(e);
    }

    /* 
        Page: /wallet
        This method is called for custom notifications.
    */

    openNotificationWithIcon(type, head, desc) {
        notification[type]({
            message: head,
            description: desc,
        });
    };

    /* 
        Page: /wallet
        This method is called when we want to send the entered coin with right validations.
    */

    sendSubmit() {
        if (this.validator.allValid()) {
            var values = this.state.sendFields;
            values["coin_code"] = this.props.coin_code;
            fetch(API_URL + "/wallet/send", {
                method: "post",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: "Bearer " + this.props.isLoggedIn
                },
                body: JSON.stringify(values)
            }).then(response => response.json())
                .then((responseData) => {
                    if (responseData.status === 200) {
                        this.openNotificationWithIcon("success", "Successfully Sent", responseData.message)
                    } else {
                        this.openNotificationWithIcon("warning", "Balance low", responseData.message)
                    }
                }).catch(error => {
                })
        } else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    /* 
        Page: /wallet
        This method is called when fields are change in SEND Form.
    */

    sendChange(e) {
        var fields = this.state.sendFields;
        var name = e.target.name;
        fields[name] = e.target.value;
        this.setState({ sendFields: fields });
    }

    render() {
        let amount = Number(this.state.sendFields.amount);
        let subtotal = amount + amount * ((this.props.coinFee[0].value) / (100));

        return (
            <div>
                {(this.props.title === "RECEIVE" && this.props.visible && this.state.show === true) || (this.props.title === "SEND")
                    ?
                    <WalletModal
                        title={<TitleDiv><Title>{this.props.title}</Title></TitleDiv>}
                        visible={this.props.visible}
                        onOk={(e) => this.handleComing()}
                        onCancel={(e) => this.comingCancel(e)}
                        footer={null}
                        className="wallet-popup"
                    >
                        {this.props.title === "RECEIVE" ?
                            <ModalWrap>
                                {Object.keys(this.state.receive).length > 0
                                    ?
                                    <div style={{ textAlign: "center", marginTop: "40px" }}>
                                        <div>
                                            <img src={this.state.receive.url} alt="no photo" />
                                        </div>
                                        <div style={{ marginTop: "20px" }}>
                                            <CopyToClipboardCSS text={this.state.receive.receive_address}
                                                onCopy={() => this.setState({ copied: true })}>
                                                <div style={{ textAlign: 'left' }}>
                                                    <RefInput
                                                        value={this.state.receive.receive_address}
                                                        className={this.state.receiveAdd}
                                                        placeholder="Referral"
                                                        enterButton="Copy"
                                                        size="large"
                                                        onSearch={value => this.SearchText()}
                                                    />
                                                </div>
                                            </CopyToClipboardCSS>
                                        </div>
                                    </div>
                                    : ""
                                }
                            </ModalWrap>
                            :
                            <ModalWrap>
                                <Rediv>
                                    <Label style={{ display: "block" }}>Destination Address</Label>
                                    <WallInput value={this.state.sendFields.destination_address} name="destination_address" onChange={this.sendChange} />
                                    {/* <Scan>Scan QR</Scan> */}
                                    {this.validator.message('destination_address', this.state.sendFields.destination_address, 'required|alpha_num|min:15|max:120', 'text-danger-validation')}
                                </Rediv>
                                <Rediv>
                                    <Label style={{ display: "block" }}>Amount</Label>
                                    {/* <Sec_wrap> */}
                                    <WallInput type="number" min="0" value={this.state.sendFields.amount} name="amount" onChange={this.sendChange} />
                                    {this.validator.message('amount', this.state.sendFields.amount, 'required|gtzero|numeric', 'text-danger-validation')}
                                    {/*  <RightInput />
                                    <ButtonToolbarS>
                                        <DropdownButtonS title="USD" id="dropdown-size-medium">
                                            <MenuItem eventKey="1">Action</MenuItem>
                                            <MenuItem eventKey="2">Another action</MenuItem>
                                            <MenuItem eventKey="3">Something else here</MenuItem>
                                            <MenuItem eventKey="4">Separated link</MenuItem>
                                        </DropdownButtonS>
                                    </ButtonToolbarS> */}
                                    {/* </Sec_wrap> */}
                                    <TotDiv>
                                        <Fee><b>Fee:</b> {this.props.coinFee ? this.props.coinFee[0].value : 0}</Fee>
                                        <TotPay><b>Total Payout:</b> {subtotal} {this.props.coin_code}</TotPay>
                                    </TotDiv>
                                </Rediv>
                                <SendWrap>
                                    <SendButton onClick={this.sendSubmit}>SEND {this.props.coin_code}</SendButton>
                                </SendWrap>
                            </ModalWrap>}
                    </WalletModal>
                    : ""}
                {(this.state.loader === true) ? <FaldaxLoader /> : ""}
            </div>
        );
    }
}

export default WalletPopup;
