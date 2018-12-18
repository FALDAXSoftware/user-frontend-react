import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {connect} from "react-redux"
import { Row, Col, Tabs, Button,Table,Input,notification,Steps,Menu, Dropdown,Icon } from 'antd';
import styled from 'styled-components';

import WalletPopup from './WalletPopup'
import { Container } from '../../../styled-components/homepage/style';
import { DropdownButton,MenuItem,ButtonToolbar } from 'react-bootstrap';
import Tableofcoin from './TableofCoin'
import {Contact_wrap, Grey_wrap} from "../../../styled-components/landingCategories/contactStyle"
import {Header_wrap,SearchCoin,MY_wallet,WalletCoin,Total,Tot,Money,Currency,CoinTable,SearchCoin2,Detail_wrap,Address,Row_wrap,Left_Bit,CryptImg,CryptAmt,Right_Bit,BTC,BTC_amt,FIAT_amt,AMT,SendButton,DepButton,WithButton,Trans_table,TransTitle,Left_head,Right_head,WallTotal} from "../../../styled-components/loggedStyle/walletStyle";


const Search = Input.Search;

const ContainerContact = styled(Container)`
    background-color:${props => props.theme.mode=="dark" ? "#041422" : "white"}; 
    border-radius:5px;
    padding-right:30px;
    padding-left:30px;
    padding-bottom: 30px;
`
const ContainerContact2 = styled(ContainerContact)`
    background-color:${props => props.theme.mode=="dark" ? "#041422" : "white"}; 
    border-radius:5px;
    padding-right:30px;
    padding-left:30px;
    padding-bottom: 30px;
    margin-top:50px;
`
const Inputsearch = styled(Search)`
    width: 100%;
    height: 40px;
`
const DropdownButtonS = styled(DropdownButton)`
    background-color: ${props=>props.theme.mode=="dark"?"#01090f":"#f5f6fa"};
    color:${props=>props.theme.mode=="dark"?"white":"black"};
    border: none;
    border:1px solid #ccc;
    
`
const ButtonToolbarS = styled(ButtonToolbar)`     
    display: inline-flex;
    margin-left:auto;
    align-items: center;
    float: right;
    font-size: 14px;
    font-family: "Open Sans";
    color: rgb( 33, 33, 33 );
    
    @media(max-width:991px)
    {
        margin-left:30px;
    }
    @media(max-width:427px)
    {
        display:block;
        float:none;
        margin-left:0px;
        margin-top:20px;
    }

`
const ButtonToolbarOne = styled(ButtonToolbar)`
    >.btn-group
    {
        width:100%;
    }

`

const DropdownButtonOne = styled(DropdownButton)`
    background-color: ${props=>props.theme.mode=="dark"?"#01090f":""};
    color:${props=>props.theme.mode=="dark"?"white":""};
    width:100%;
    text-align:left;
    >.caret
    {
        float:right;
        margin-top: 8px;
    }

`

export default class WalletDetails extends React.Component
{     
    constructor(props)
    {
        super(props);
        this.state = {
            withdraw:false
        };
    }
    comingCancel = (e) => {
        /* console.log(e); */
        this.setState({
            withdraw: false,
        });
    }
    showModal = () => {
        this.setState({ withdraw: true });
    }
    render()
    {  
        return(
            <ContainerContact2>
                <Header_wrap>
                    <Row style={{width:"100%"}}>
                        <Col xxl={12} xl={12} lg={12} sm={24}>
                            <Left_head>
                                <MY_wallet>
                                    <span>BITCOIN</span>
                                </MY_wallet>
                                <WalletCoin>
                                    <ButtonToolbarOne>
                                        <DropdownButtonOne title="Bitcoin" id="dropdown-size-medium">
                                            <MenuItem eventKey="1">Action</MenuItem>
                                            <MenuItem eventKey="2">Another action</MenuItem>
                                            <MenuItem eventKey="3">Something else here</MenuItem>
                                            <MenuItem eventKey="4">Separated link</MenuItem>
                                        </DropdownButtonOne>
                                    </ButtonToolbarOne>
                                </WalletCoin>
                            </Left_head>
                        </Col>
                        <Col xxl={12} xl={12} lg={12} sm={24}>
                            <Right_head>
                                <WallTotal>
                                        <Tot>Total:</Tot>
                                        <Money>$72,454.27</Money>
                                        <Currency>USD</Currency>
                                </WallTotal>
                                
                                <ButtonToolbarS>
                                    <DropdownButtonS title="USD" id="dropdown-size-medium">
                                        <MenuItem eventKey="1">Action</MenuItem>
                                        <MenuItem eventKey="2">Another action</MenuItem>
                                        <MenuItem eventKey="3">Something else here</MenuItem>
                                        <MenuItem eventKey="4">Separated link</MenuItem>
                                    </DropdownButtonS>
                                </ButtonToolbarS>
                            </Right_head>
                        </Col>
                    </Row>
                </Header_wrap>
                <Detail_wrap>
                    <Address>Bitcoin Address:<b style={{color:"black"}}>1F1tAaz5x1HUXrCNLbtMDqcw6o5GNn4xqX</b></Address>
                    <hr/>
                    <Row_wrap>
                        <Row>
                            <Col xxl={12} xl={12} lg={24} md={24}>
                                <Left_Bit>
                                    <CryptImg><img src="/images/LoggedCat/Bit_wallet.png"/></CryptImg>
                                    <CryptAmt>
                                        <BTC_amt>0.05218<BTC>BTC</BTC></BTC_amt>
                                        <FIAT_amt>$874.23<AMT>USD</AMT></FIAT_amt>
                                    </CryptAmt>
                                </Left_Bit>
                            </Col>
                            <Col xxl={12} xl={12} lg={24} md={24}>
                                <Right_Bit>
                                    <SendButton>SEND</SendButton>
                                    <DepButton>DEPOSIT</DepButton>
                                    <WithButton onClick={this.showModal}>WITHDRAW</WithButton>
                                </Right_Bit>
                            </Col>
                        </Row>
                    </Row_wrap>
                </Detail_wrap>
                <Trans_table>
                    <TransTitle>Transaction History</TransTitle>
                    <CoinTable>
                        <Tableofcoin />
                    </CoinTable>
                </Trans_table>
                <WalletPopup comingCancel={(e)=>this.comingCancel(e)} visible={this.state.withdraw}/>
            </ContainerContact2>
        );
    }

}