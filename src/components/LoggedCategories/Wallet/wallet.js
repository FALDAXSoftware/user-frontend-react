import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {connect} from "react-redux"
import { Row, Col, Tabs, Button,Table,Input,notification,Steps,Menu, Dropdown,Icon } from 'antd';
import styled from 'styled-components';

import Tableofcoin from './TableofCoin'
import WalletDetails from './WalletDetails'
import Navigation from '../../Navigations/Navigation';
import CommonFooter from "../../Landing/Footers/Footer_home";
import { Container } from '../../../styled-components/homepage/style';
import {Contact_wrap, Grey_wrap} from "../../../styled-components/landingCategories/contactStyle"
import {Header_wrap,SearchCoin,MY_wallet,Total,Tot,Money,Currency,CoinTable,SearchCoin2} from "../../../styled-components/loggedStyle/walletStyle";

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
class Wallet extends React.Component
{
    searchChange(value)
    {

    }
    submitSearch(e)
    {

    }
    render()
    {
        return(
            <Contact_wrap>
                <Navigation />
                <Grey_wrap>
                    <ContainerContact>
                        <Header_wrap>
                            <MY_wallet>
                                <span>MY WALLET</span>
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
                        </Header_wrap>
                        <CoinTable>
                            <Tableofcoin />
                        </CoinTable>
                    </ContainerContact>
                    <ContainerContact2>
                        <Header_wrap>
                            <MY_wallet>
                                <span>COINS</span>
                            </MY_wallet>
                            <SearchCoin2>
                                <Inputsearch
                                    placeholder="Search Coin"
                                    onChange={value => this.searchChange(value)}
                                    style={{ }}
                                    className=""
                                    onPressEnter={e => this.submitSearch(e)}
                                />
                            </SearchCoin2>
                        </Header_wrap>
                        <CoinTable>
                            <Tableofcoin />
                        </CoinTable>
                    </ContainerContact2>
                    <WalletDetails/>
                </Grey_wrap>
                <CommonFooter />
            </Contact_wrap>
        );
    }
}

export default Wallet ;