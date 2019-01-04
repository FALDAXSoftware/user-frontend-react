import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Button, Modal, Input, notification } from 'antd';
import { DropdownButton, MenuItem, ButtonToolbar } from 'react-bootstrap';
import styled from 'styled-components'

import {Ref_input} from '../../Settings/Referral'
import { globalVariables } from '../../../Globals';
import { CopyToClipboard } from 'react-copy-to-clipboard';

let { API_URL } = globalVariables;
const WalletModal = styled(Modal)`
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
`
const Label = styled.label`
    font-size: 13px;
    font-family: "Open Sans";
    color: ${props => props.theme.mode == "dark" ? "rgb( 255, 255, 255 )" : "black"};
`
const Modal_wrap = styled.div`
    width: 546px;
    margin-left: auto;
    margin-right: auto;
    padding-bottom:60px;
    @media(max-width:576px)
    {
        width:350px;   
    }
    @media(max-width:425px)
    {
        width:256px;
    }
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
    font-size: 19.846px;
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
    width:462px;
    background-color:${props => props.theme.mode == "dark" ? "#061a2b" : "#f8f8f8"};
    
    color:${props => props.theme.mode == "dark" ? "white" : ""};
    caret-color:${props => props.theme.mode == "dark" ? "white" : ""};
    @media(max-width:768px)
    {
        width:220px;
    }
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
    font-size: 12.012px;
    font-family: "Open Sans";
    color: ${props => props.theme.mode == "dark" ? "white" : "rgb( 255, 255, 255 )"}; 
    @media(max-width:767px)
    {
        float:none;
        display:block;   
    }
`
const TotPay = styled.span`
    float:right;
    font-size: 12.012px;
    font-family: "Open Sans";
    color: ${props => props.theme.mode == "dark" ? "white" : "rgb( 255, 255, 255 )"}; 
    @media(max-width:767px)
    {
        float:none;
        display:block;   
    }
`
const SendButton = styled(Button)`
    font-size: 13.217px;
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

class WalletPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
            copied: false,
            comingSoon: this.props.visible ? true : '',
            email_address: "",
            email_msg: "",
            receive:{},
            receiveAdd:"receive_add"
        }
    }
    componentWillReceiveProps(props,newProps)
    {
    }
    componentDidMount()
    {
        if(this.props.title=="RECEIVE")
        fetch(API_URL + "/wallet/get-qr-code/BTC" ,{
            method:"get",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization:"Bearer " + this.props.isLoggedIn
            }

        })
        .then(response => response.json())
        .then((responseData) => {
            this.setState({receive:responseData.receiveCoin})
        })
        .catch(error => {
        })
    }
    openNotificationWithIcon = (type) => {
        notification[type]({
            message: 'Address Copied to Clipboard',
            duration: 2
        });
    };
    SearchText() {
        // Copy to clipboard example
        document.querySelectorAll(".ant-input-search-button")[0].onclick = function () {
            // Select the content
            document.querySelectorAll(".receive_add > input")[0].select();
            // Copy to the clipboard
            document.execCommand('copy');
        };
        this.openNotificationWithIcon('success');
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

    render() {
        return (
            <div>
                <WalletModal
                    title={<Title_div><Title>{this.props.title}</Title></Title_div>}
                    visible={this.props.visible}
                    onOk={(e) => this.handleComing()}
                    onCancel={(e) => this.comingCancel(e)}
                    footer={null}
                    width={656}
                    height={460}
                >
                        {this.props.title=="RECEIVE"?
                        <Modal_wrap>
                            {Object.keys(this.state.receive).length>0
                                ?
                                <div style={{textAlign:"center",marginTop:"40px"}}>
                                    <div>
                                        <img src={this.state.receive.url} alt="no photo"/>
                                    </div>
                                    <div style={{marginTop:"20px"}}>
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
                                :""
                            }
                        </Modal_wrap>
                        :
                        <Modal_wrap>
                            <Rediv>
                                <Label style={{ display: "block" }}>Recieving Address</Label>
                                <WallInput />
                                <Scan>Scan QR</Scan>
                            </Rediv>
                            <Rediv>
                                <Label style={{ display: "block" }}>Amount</Label>
                                <Sec_wrap>
                                    <LeftInput />
                                    <RightInput />
                                    <ButtonToolbarS>
                                        <DropdownButtonS title="USD" id="dropdown-size-medium">
                                            <MenuItem eventKey="1">Action</MenuItem>
                                            <MenuItem eventKey="2">Another action</MenuItem>
                                            <MenuItem eventKey="3">Something else here</MenuItem>
                                            <MenuItem eventKey="4">Separated link</MenuItem>
                                        </DropdownButtonS>
                                    </ButtonToolbarS>
                                </Sec_wrap>
                                <div style={{ height: "25px", marginTop: "45px", width: "462px" }}>
                                    <Fee>Fee:</Fee>
                                    <TotPay>Total Payout:</TotPay>
                                </div>
                            </Rediv>
                            <div style={{ textAlign: "center", marginTop: "60px", display: "block" }}>
                                <SendButton >SEND</SendButton>
                            </div>
                        </Modal_wrap>}
                </WalletModal>
            </div>
        );
    }
}

export default WalletPopup;
