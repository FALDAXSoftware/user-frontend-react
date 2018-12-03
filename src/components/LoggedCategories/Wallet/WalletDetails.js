import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {connect} from "react-redux"
import { Row, Col, Tabs, Button,Table,Input,notification,Steps,Menu, Dropdown,Icon } from 'antd';
import styled from 'styled-components';

import { Container } from '../../../styled-components/homepage/style';
import { DropdownButton,MenuItem,ButtonToolbar } from 'react-bootstrap';
import Tableofcoin from './TableofCoin'
import {Contact_wrap, Grey_wrap} from "../../../styled-components/landingCategories/contactStyle"
import {Header_wrap,SearchCoin,MY_wallet,Total,Tot,Money,Currency,CoinTable,SearchCoin2,Detail_wrap,Address,Row_wrap,Left_Bit,CryptImg,CryptAmt,Right_Bit,BTC,BTC_amt,FIAT_amt,AMT} from "../../../styled-components/loggedStyle/walletStyle";


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
    background-color:#f5f6fa;
    color:black;
    border: none;
`
const ButtonToolbarS = styled(ButtonToolbar)`     
    display: inline-flex;
    align-items: center;
    float: right;
    margin-top: 10px;
    font-size: 14px;
    font-family: "Open Sans";
    color: rgb( 33, 33, 33 );

`

export default class WalletDetails extends React.Component
{     
    render()
    {  
        return(
            <ContainerContact2>
                <Header_wrap>
                    <MY_wallet>
                        <span>BITCOIN</span>
                    </MY_wallet>
                    <SearchCoin>
                        <Inputsearch
                            placeholder="Search Coin"
                            onChange={value => this.searchChange(value)}
                            style={{ }}
                            className=""
                            onPressEnter={e => this.submitSearch(e)}
                        />
                    </SearchCoin>
                    <Total>
                        <Tot>Total:</Tot>
                            <Money>$72,454.27</Money>
                    </Total>
                    <Currency>USD</Currency>
                    <ButtonToolbarS>
                        <DropdownButtonS title="Default button" id="dropdown-size-medium">
                            <MenuItem eventKey="1">Action</MenuItem>
                            <MenuItem eventKey="2">Another action</MenuItem>
                            <MenuItem eventKey="3">Something else here</MenuItem>
                            <MenuItem eventKey="4">Separated link</MenuItem>
                        </DropdownButtonS>
                    </ButtonToolbarS>
                </Header_wrap>
                <Detail_wrap>
                    <Address>Bitcoin Address:<b style={{color:"black"}}>1F1tAaz5x1HUXrCNLbtMDqcw6o5GNn4xqX</b></Address>
                    <Row_wrap>
                        <Row>
                            <Col span={12}>
                                <Left_Bit>
                                    <CryptImg><img src="./images/LoggedCat/Bit_wallet.png"/></CryptImg>
                                    <CryptAmt>
                                        <BTC_amt>0.05218<BTC>BTC</BTC></BTC_amt>
                                        <FIAT_amt>$874.23<AMT>USD</AMT></FIAT_amt>
                                    </CryptAmt>
                                </Left_Bit>
                            </Col>
                            <Col span={12}>
                                <Right_Bit>

                                </Right_Bit>
                            </Col>
                        </Row>
                    </Row_wrap>
                </Detail_wrap>
                <CoinTable>
                    <Tableofcoin />
                </CoinTable>
            </ContainerContact2>
        );
    }

}