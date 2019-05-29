/* In-built Packages */

import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Input } from 'antd';
import { connect } from "react-redux"
import styled from 'styled-components';
import NumberFormat from 'react-number-format';

/* components  */
import TableofCoinUpper from './tableofcoinupper';
import LoggedNavigation from 'COMPONENTS/NAVIGATIONS/loggednavigation';
import CommonFooter from "COMPONENTS/LANDING/FOOTERS/footer_home";
import { Container } from 'STYLED-COMPONENTS/HOMEPAGE/style';
import { ContactWrap, GreyWrap } from "STYLED-COMPONENTS/LANDING_CATEGORIES/contactStyle"
import { HeaderWrap, SearchCoin, MYWallet, Total, Tot, Money, Currency, CoinTable, SearchCoin2, HeaderWrap2 } from "STYLED-COMPONENTS/LOGGED_STYLE/walletStyle";
/* import { globalVariables } from 'Globals'; */


/* Actions */
import { walletBal, getAllCoins } from 'ACTIONS/LOGGEDCAT/walletActions'
import FaldaxLoader from 'SHARED-COMPONENTS/FaldaxLoader';
/* import TableofCoinLower from './tableofcoinlower'; */


/* let { API_URL } = globalVariables; */
const Search = Input.Search;

const ContainerContact = styled(Container)`
    background-color:${props => props.theme.mode === "dark" ? "#041422" : "white"}; 
    border-radius:5px;
    padding-right:30px;
    padding-left:30px;
    padding-bottom: 30px;
    @media(max-width:1160px)
    {
        padding-right:0px;
    padding-left:0px;
    }
`
const ContainerContact2 = styled(ContainerContact)`
    background-color:${props => props.theme.mode === "dark" ? "#041422" : "white"}; 
    border-radius:5px;
    padding-right:30px;
    padding-left:30px;
    padding-bottom: 30px;
    margin-top:50px;
    @media(max-width:1160px)
    {
        padding-right:0px;
    padding-left:0px;
    }
`
const Inputsearch = styled(Search)`
    width: 100%;
    height: 40px;
    >input
    {
        background-color:${props => props.theme.mode === "dark" ? "#020e18" : ""};
        color:${props => props.theme.mode === "dark" ? "white" : ""}
        caret-color:${props => props.theme.mode === "dark" ? "white" : ""}
    }
    >span>i
    {
        color:${props => props.theme.mode === "dark" ? "white" : ""};
    }
`
const TableWrap = styled.div`  
    margin-left:-30px;
    margin-right:-30px; 
    @media(max-width:1160px)
    {
        margin-right:10px;
        margin-left:10px;
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
            searchedWallet: null,
            currencySeq: ['USD', 'EUR', 'INR']
        };
        this.currChangeWallet = this.currChangeWallet.bind(this);
        this.currChangeList = this.currChangeList.bind(this);
        this.searchChangeCoins = this.searchChangeCoins.bind(this);
        this.searchChangeWallet = this.searchChangeWallet.bind(this);
    }

    /* Life Cycle Methods */
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

    /* 
        Page: /wallet
        This method is called when u want to search from my wallet table.
    */

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

    /* 
        Page: /wallet
        This method is called when u want to search from all coins table.
    */

    searchChangeCoins(e) {

        var search = e.target.value;
        if (search !== "") {
            if (search.trim() !== "") {

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

    /* 
        Page: /wallet
        not in use
    */

    /* totalCurr(total) {
        this.setState({ total: total })
    } */

    /* 
        Page: /wallet
        This method is called to change the data in wallet page .
    */

    currChangeList(currency) {
        this.props.getAllCoins(this.props.isLoggedIn, currency);
        this.props.walletBal(this.props.isLoggedIn, currency);
        var arr = currency.split(",");
        this.setState({ currencySeq: arr })
    }


    currChangeWallet(currency) {
        this.props.walletBal(this.props.isLoggedIn, currency);
        this.props.getAllCoins(this.props.isLoggedIn, currency);
        var arr = currency.split(",");
        this.setState({ currencySeq: arr })
    }
    render() {
        let { profileDetails } = this.props;
        return (
            <ContactWrap>
                <LoggedNavigation />
                <GreyWrap>
                    <ContainerContact>
                        <HeaderWrap>
                            <MYWallet>
                                <span>{profileDetails !== "" ? (profileDetails.first_name + "'s") : ""} WALLET</span>
                            </MYWallet>
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
                                <Money>${this.state.total !== null ? <NumberFormat value={parseFloat(this.state.total).toFixed(4)} displayType={'text'} thousandSeparator={true} /> : ""}</Money>
                                <Currency>USD</Currency>
                            </Total>
                        </HeaderWrap>
                        <CoinTable>
                            <TableWrap>
                                {
                                    this.props.walletDetails !== null ?
                                        this.state.searchedWallet !== null ? <TableofCoinUpper noBalance={false} currencySeq={this.state.currencySeq} currChange={(currency) => this.currChangeWallet(currency)} tableData={this.state.searchedWallet} /> : <TableofCoinUpper noBalance={false} currencySeq={this.state.currencySeq} currChange={(currency) => this.currChangeWallet(currency)} tableData={this.props.walletDetails} /> : ""
                                }
                            </TableWrap>
                        </CoinTable>
                    </ContainerContact>
                    <ContainerContact2>
                        <HeaderWrap2>
                            <MYWallet>
                                <span>COINS</span>
                            </MYWallet>
                            <SearchCoin2>
                                <Inputsearch
                                    placeholder="Search Coin"
                                    onChange={value => this.searchChangeCoins(value)}
                                    style={{}}
                                    className=""
                                />
                            </SearchCoin2>
                        </HeaderWrap2>
                        <CoinTable>
                            <TableWrap>
                                {/* {this.props.allCoins !== null ?
                                    (this.state.searchedCoins.length > 0 ? <ListofCoins currChange={(currency) => this.currChangeList(currency)} tableData={this.state.searchedCoins} /> : (this.props.allCoins.data.length > 0 ? <ListofCoins currChange={(currency) => this.currChangeList(currency)} tableData={this.props.allCoins.data} /> : ""))
                                    : ""} */}
                                {
                                    this.props.nowalletBalance !== null ?
                                        this.state.searchedCoins !== null ? <TableofCoinUpper currencySeq={this.state.currencySeq} noBalance={true} currChange={(currency) => this.currChangeList(currency)} tableData={this.state.searchedCoins} />
                                            : <TableofCoinUpper currencySeq={this.state.currencySeq} noBalance={true} currChange={(currency) => this.currChangeList(currency)} tableData={this.props.nowalletBalance} /> : ""
                                }
                            </TableWrap>
                        </CoinTable>
                    </ContainerContact2>
                </GreyWrap>
                <CommonFooter />
                {(this.props.loader === true) ?
                    <FaldaxLoader />
                    : ""
                }
            </ContactWrap>
        );
    }
}
function mapStateToProps(state) {

    return ({
        walletDetails: state.walletReducer.walletData !== undefined ? state.walletReducer.walletData.balanceData.balanceWallet : null,
        nowalletBalance: state.walletReducer.walletData !== undefined ? state.walletReducer.walletData.balanceData.nonBalanceWallet : null,
        allCoins: state.walletReducer.allCoinsData !== undefined ? state.walletReducer.allCoinsData : null,
        isLoggedIn: state.simpleReducer.isLoggedIn,
        loader: state.simpleReducer.loader ? state.simpleReducer.loader : false,
        profileDetails: state.simpleReducer.profileDetails !== undefined ? state.simpleReducer.profileDetails.data[0] : "",
    })
}
const mapDispatchToProps = dispatch => ({
    walletBal: (isLoggedIn, currency) => dispatch(walletBal(isLoggedIn, currency)),
    getAllCoins: (isLoggedIn, currency) => dispatch(getAllCoins(isLoggedIn, currency)),


})
export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
