/* In-built Packages */

import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Input, Spin } from 'antd';
import { connect } from "react-redux"
import styled from 'styled-components';

/* components  */
import Tableofcoin from './TableofCoin'
import ListofCoins from './listofCoins'
import WalletDetails from './WalletDetails'
import LoggedNavigation from '../../Navigations/LoggedNavigation';
import CommonFooter from "../../Landing/Footers/Footer_home";
import { Spin_Ex } from '../../../styled-components/homepage/style'
import { Container } from '../../../styled-components/homepage/style';
import { Contact_wrap, Grey_wrap } from "../../../styled-components/landingCategories/contactStyle"
import { Header_wrap, SearchCoin, MY_wallet, Total, Tot, Money, Currency, CoinTable, SearchCoin2, Header_wrap2 } from "../../../styled-components/loggedStyle/walletStyle";
import { globalVariables } from '../../../Globals';


/* Actions */
import { walletBal, getAllCoins } from '../../../Actions/LoggedCat/walletActions'

let { API_URL } = globalVariables;
const Search = Input.Search;

const ContainerContact = styled(Container)`
    background-color:${props => props.theme.mode == "dark" ? "#041422" : "white"}; 
    border-radius:5px;
    padding-right:30px;
    padding-left:30px;
    padding-bottom: 30px;
`
const ContainerContact2 = styled(ContainerContact)`
    background-color:${props => props.theme.mode == "dark" ? "#041422" : "white"}; 
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
        background-color:${props => props.theme.mode == "dark" ? "#020e18" : ""};
    }
    >span>i
    {
        color:${props => props.theme.mode == "dark" ? "white" : ""};
    }
`
const Table_wrap = styled.div`  
    margin-left:-30px;
    margin-right:-30px; 
    @media(max-width:1160px)
    {
        overflow:scroll
    }
`

class Wallet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mywallet: {},
            myCoins: {},
            total: null,
            searchedCoins: null,
            searchedWallet: null
        };
        this.currChangeWallet = this.currChangeWallet.bind(this);
        this.currChangeList = this.currChangeList.bind(this);
        this.searchChangeCoins = this.searchChangeCoins.bind(this);
        this.searchChangeWallet = this.searchChangeWallet.bind(this);
    }
    componentWillReceiveProps(props, newProps) {
        var total = 0;
        if (this.props.walletDetails !== null) {
            var tableData = this.props.walletDetails;
            if (tableData !== undefined) {
                Object.keys(tableData).map(function (index, key) {
                    if (tableData[index].USD !== undefined)
                        total = total + (tableData[index].USD * tableData[index].balance);
                })
                this.setState({ total });
            }
        }
    }
    componentDidMount() {
        this.props.walletBal(this.props.isLoggedIn, "USD,EUR,INR");
        this.props.getAllCoins(this.props.isLoggedIn, "USD,EUR,INR");
    }

    searchChangeWallet(e) {
        var search = e.target.value;
        if (search !== "") {
            if (search.trim() !== "") {
                var searchedWallet = this.props.walletDetails.filter(function (temp) {
                    if (temp.coin.toLowerCase().includes(search.toLowerCase()) || temp.coin_name.toLowerCase().includes(search.toLowerCase()) || temp.coin_code.toLowerCase().includes(search.toLowerCase())) {
                        return true;
                    }
                    else {
                        return false;
                    }
                })
                this.setState({ searchedWallet });
            }
            else {
                this.setState({ searchedWallet: [] });
            }
        }
        else {
            this.setState({ searchedWallet: null });
        }
    }
    searchChangeCoins(e) {
        console.log("searc h change coin");

        var search = e.target.value;
        console.log("search", search);
        if (search !== "") {
            if (search.trim() !== "") {
                console.log("after trim");

                var searchedCoins = this.props.nowalletBalance.filter(function (temp) {
                    if (temp.coin.toLowerCase().includes(search.toLowerCase()) || temp.coin_name.toLowerCase().includes(search.toLowerCase()) || temp.coin_code.toLowerCase().includes(search.toLowerCase())) {
                        return true;
                    }
                    else {
                        return false;
                    }
                });
                this.setState({ searchedCoins });
            }
            else {
                this.setState({ searchedCoins: [] });
            }
        }
        else {
            this.setState({ searchedCoins: null });
        }

    }
    totalCurr(total) {
        this.setState({ total: total })
    }
    currChangeList(currency) {
        this.props.getAllCoins(this.props.isLoggedIn, currency);
    }
    currChangeWallet(currency) {

        this.props.walletBal(this.props.isLoggedIn, currency);
    }
    render() {
        return (
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
                                    onChange={value => this.searchChangeWallet(value)}
                                    style={{}}
                                    className=""
                                />
                            </SearchCoin>
                            <Total>
                                <Tot>Total:</Tot>
                                <Money>${this.state.total !== null ? parseFloat(this.state.total).toFixed(4) : ""}</Money>
                                <Currency>USD</Currency>
                            </Total>
                        </Header_wrap>
                        <CoinTable>
                            <Table_wrap>
                                {console.log(this.props, this.state)}
                                {
                                    this.props.walletDetails !== null ?
                                        this.state.searchedWallet !== null ? <Tableofcoin currChange={(currency) => this.currChangeWallet(currency)} tableData={this.state.searchedWallet} /> : <Tableofcoin currChange={(currency) => this.currChangeWallet(currency)} tableData={this.props.walletDetails} /> : ""
                                }
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
                                    onChange={value => this.searchChangeCoins(value)}
                                    style={{}}
                                    className=""
                                />
                            </SearchCoin2>
                        </Header_wrap2>
                        <CoinTable>
                            <Table_wrap>
                                {/* {this.props.allCoins !== null ?
                                    (this.state.searchedCoins.length > 0 ? <ListofCoins currChange={(currency) => this.currChangeList(currency)} tableData={this.state.searchedCoins} /> : (this.props.allCoins.data.length > 0 ? <ListofCoins currChange={(currency) => this.currChangeList(currency)} tableData={this.props.allCoins.data} /> : ""))
                                    : ""} */}
                                {console.log(this.props.nowalletBalance)}
                                {
                                    this.props.nowalletBalance !== null ?
                                        this.state.searchedCoins !== null ? <Tableofcoin currChange={(currency) => this.currChangeWallet(currency)} tableData={this.state.searchedCoins} />
                                            : <Tableofcoin currChange={(currency) => this.currChangeWallet(currency)} tableData={this.props.nowalletBalance} /> : ""
                                }
                            </Table_wrap>
                        </CoinTable>
                    </ContainerContact2>
                </Grey_wrap>
                <CommonFooter />
                {(this.props.loader == true) ?
                    <Spin_Ex className="Ex_spin">
                        <Spin size="large" />
                    </Spin_Ex>
                    : ""
                }
            </Contact_wrap>
        );
    }
}
function mapStateToProps(state) {
    console.log(state);

    return ({
        walletDetails: state.walletReducer.walletData.balanceData !== undefined ? state.walletReducer.walletData.balanceData.balanceWallet : null,
        nowalletBalance: state.walletReducer.walletData.balanceData !== undefined ? state.walletReducer.walletData.balanceData.nonBalanceWallet : null,
        allCoins: state.walletReducer.allCoinsData !== undefined ? state.walletReducer.allCoinsData : null,
        isLoggedIn: state.simpleReducer.isLoggedIn,
        loader: state.simpleReducer.loader ? state.simpleReducer.loader : false
    })
}
const mapDispatchToProps = dispatch => ({
    walletBal: (isLoggedIn, currency) => dispatch(walletBal(isLoggedIn, currency)),
    getAllCoins: (isLoggedIn, currency) => dispatch(getAllCoins(isLoggedIn, currency)),


})
export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
