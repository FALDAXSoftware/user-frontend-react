/* Built-in Packages */
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Button, Modal, Input, notification } from 'antd';
import { DropdownButton, ButtonToolbar } from 'react-bootstrap';
import styled from 'styled-components'
import SimpleReactValidator from "simple-react-validator";
import { CopyToClipboard } from 'react-copy-to-clipboard';

/* Styled-Components */


/* Components */
import { Ref_input } from 'components/Settings/Referral'
import { globalVariables } from 'Globals';
import FaldaxLoader from 'shared-components/FaldaxLoader';

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
        background-color:${props => props.theme.mode == "dark" ? "#061a2b" : ""};
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
    color: ${props => props.theme.mode == "dark" ? "rgb( 255, 255, 255 )" : "black"};
`
const Modal_wrap = styled.div`
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    padding-bottom:60px;

`
const Title_div = styled.div`
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
    background-color:${props => props.theme.mode == "dark" ? "#061a2b" : "#f8f8f8"};
    display:block;
    color:${props => props.theme.mode == "dark" ? "white" : ""};
    caret-color:${props => props.theme.mode == "dark" ? "white" : ""};
`
const Scan = styled.p`
    display:inline-block;
    margin-left:30px;
    margin-bottom:0px;
    font-size: 13px;
    font-family: "Open Sans";
    color:${props => props.theme.mode == "dark" ? "rgb( 76, 132, 255 )" : ""};
    @media(max-width:467px)
    {
        margin-left:0px;
        margin-top:10px;
        display:block;
    }
`
const Sec_wrap = styled.div`
    display:flex;
    align-items:center;
    @media(max-width:767px)
    {
        display:block;
    }
`
const DropdownButtonS = styled(DropdownButton)`
    background-color: ${props => props.theme.mode == "dark" ? "#01090f" : "#f5f6fa"};
    color:${props => props.theme.mode == "dark" ? "white" : "black"};
    border: none;
    border:1px solid #ccc;
    
`
const ButtonToolbarS = styled(ButtonToolbar)`     
    display: inline-block;
    margin-left: 15px;
    font-family: "Open Sans";
    color: rgb( 33, 33, 33 );
    @media(max-width:767px)
    {
        display:block;
        margin-left:0px;
        margin-top:10px;
        >.btn-group
        {
            margin-left:0px;
        }
    }
`
const LeftInput = styled(Input)`
    height:48px;
    width:220px;
    background-color:${props => props.theme.mode == "dark" ? "#061a2b" : "#f8f8f8"};
    color:${props => props.theme.mode == "dark" ? "white" : ""};
    caret-color:${props => props.theme.mode == "dark" ? "white" : ""};
    @media(max-width:767px)
    {
        display:block;
    }
`
const RightInput = styled(Input)`
    height:48px;
    background-color:${props => props.theme.mode == "dark" ? "#061a2b" : "#f8f8f8"};
    color:${props => props.theme.mode == "dark" ? "white" : ""};
    caret-color:${props => props.theme.mode == "dark" ? "white" : ""};
    width:220px;
    display:inline-block;
    margin-left:20px;
    @media(max-width:767px)
    {
        display:block;
        margin-left:0px;
        margin-top:10px;
    }
`
const Fee = styled.span`
    float:left;
    font-size: 16px;
    font-family: "Open Sans";
    color: ${props => props.theme.mode == "dark" ? "white" : "black"}; 
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
    color: ${props => props.theme.mode == "dark" ? "white" : "black"}; 
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
const Send_wrap = styled.div`
    text-align: center; 
    margin-top: 60px;
    display: block;
    @media(max-width:767px)
    {
        padding-top:20px;
    }
`
const Tot_div = styled.div`
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

    componentDidMount() {
        if (this.props.title == "RECEIVE") {
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
    openNotificationWithIcon(type, head, desc) {
        notification[type]({
            message: head,
            description: desc,
        });
    };
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
                    if (responseData.status == 200) {
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
                {(this.props.title == "RECEIVE" && this.props.visible && this.state.show == true) || (this.props.title == "SEND")
                    ?
                    <WalletModal
                        title={<Title_div><Title>{this.props.title}</Title></Title_div>}
                        visible={this.props.visible}
                        onOk={(e) => this.handleComing()}
                        onCancel={(e) => this.comingCancel(e)}
                        footer={null}
                        className="wallet-popup"
                    >
                        {this.props.title == "RECEIVE" ?
                            <Modal_wrap>
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
                                                    <Ref_input
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
                            </Modal_wrap>
                            :
                            <Modal_wrap>
                                <Rediv>
                                    <Label style={{ display: "block" }}>Destination Address</Label>
                                    <WallInput value={this.state.sendFields.destination_address} name="destination_address" onChange={this.sendChange} />
                                    {/* <Scan>Scan QR</Scan> */}
                                    {this.validator.message('destination_address', this.state.sendFields.destination_address, 'required|alpha_num|min:15|max:120', 'text-danger-validation')}
                                </Rediv>
                                <Rediv>
                                    <Label style={{ display: "block" }}>Amount</Label>
                                    {/* <Sec_wrap> */}
                                    <WallInput type="number" value={this.state.sendFields.amount} name="amount" onChange={this.sendChange} />
                                    {this.validator.message('amount', this.state.sendFields.amount, 'required|numeric|gtzero', 'text-danger-validation')}
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
                                    <Tot_div>
                                        <Fee><b>Fee:</b> {this.props.coinFee ? this.props.coinFee[0].value : 0}</Fee>
                                        <TotPay><b>Total Payout:</b> {subtotal} {this.props.coin_code}</TotPay>
                                    </Tot_div>
                                </Rediv>
                                <Send_wrap>
                                    <SendButton onClick={this.sendSubmit}>SEND {this.props.coin_code}</SendButton>
                                </Send_wrap>
                            </Modal_wrap>}
                    </WalletModal>
                    : ""}
                {(this.state.loader == true) ? <FaldaxLoader /> : ""}
            </div>
        );
    }
}

export default WalletPopup;
