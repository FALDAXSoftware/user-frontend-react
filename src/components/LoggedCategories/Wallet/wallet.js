import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {connect} from "react-redux"
import { Row, Col, Tabs, Button,Table,Input,notification,Steps,Menu, Dropdown,Icon } from 'antd';
import styled from 'styled-components';

import Tableofcoin from './TableofCoin'
import WalletDetails from './WalletDetails'
import LoggedNavigation from '../../Navigations/LoggedNavigation';
import CommonFooter from "../../Landing/Footers/Footer_home";
import { Container } from '../../../styled-components/homepage/style';
import {Contact_wrap, Grey_wrap} from "../../../styled-components/landingCategories/contactStyle"
import {Header_wrap,SearchCoin,MY_wallet,Total,Tot,Money,Currency,CoinTable,SearchCoin2,Header_wrap2} from "../../../styled-components/loggedStyle/walletStyle";

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
    >input
    {
        background-color:${props=>props.theme.mode=="dark"?"#020e18":""};
    }
    >span>i
    {
        color:${props=>props.theme.mode=="dark"?"white":""};
    }
`
const Table_wrap = styled.div `  
    margin-left:-30px;
    margin-right:-30px; 
    @media(max-width:1160px)
    {
        overflow:scroll
    }
`
class Wallet extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {

        };
    }
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
                <LoggedNavigation />
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
                                <Currency>USD</Currency>
                            </Total>
                        </Header_wrap>
                        <CoinTable>
                            <Table_wrap>
                                <Tableofcoin />
                            </Table_wrap>
                        </CoinTable>
                    </ContainerContact>
                    <ContainerContact2>
                        <Header_wrap2>
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
                        </Header_wrap2>
                        <CoinTable>
                            <Table_wrap>
                                <Tableofcoin />
                            </Table_wrap>
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