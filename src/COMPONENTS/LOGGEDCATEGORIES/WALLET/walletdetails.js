/* Built-in Packages */
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Row, Col, /* Input, */ Select, notification } from 'antd';
import { connect } from "react-redux";
import styled from 'styled-components';
import NumberFormat from 'react-number-format';
/* import { DropdownButton, ButtonToolbar } from 'react-bootstrap'; */

/* Styled-Components */
import { Container } from 'STYLED-COMPONENTS/HOMEPAGE/style';
import { ContactWrap, GreyWrap } from "STYLED-COMPONENTS/LANDING_CATEGORIES/contactStyle";
import {
    HeaderWrap, MYWallet, WalletCoin, CoinTable, DetailWrap,
    Address, RowWrap, LeftBit, CryptImg, CryptAmt, RightBit, BTC, BTCAmt, DepButton, WithButton, TransTable, TransTitle, LeftHead
} from "STYLED-COMPONENTS/LOGGED_STYLE/walletStyle";

/* Components */
import LoggedNavigation from 'COMPONENTS/NAVIGATIONS/loggednavigation';
import CommonFooter from "COMPONENTS/LANDING/FOOTERS/footer_home";
import WalletPopup from './walletpopup';
import DetailsTable from './detailstable';
import { globalVariables } from 'Globals';
import FaldaxLoader from 'SHARED-COMPONENTS/FaldaxLoader';

let { API_URL, _AMAZONBUCKET } = globalVariables;
const Option = Select.Option;

const ContainerContact = styled(Container)`
    background-color:${props => props.theme.mode === "dark" ? "#041422" : "white"}; 
    border-radius:5px;
    padding-right:30px;
    padding-left:30px;
    padding-bottom: 30px;
`
const ContainerContact2 = styled(ContainerContact)`
    background-color:${props => props.theme.mode === "dark" ? "#041422" : "white"}; 
    border-radius:5px;
    padding-right:30px;
    padding-left:30px;
    padding-bottom: 30px;
`
const CoinImage = styled.img`
    width: 60px;
    height: 60px;
    @media(max-width:475px)
    {
        width:30px;
        height:30px;
    }
`

class WalletDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            withdraw: false,
            send: false,
            walletDetails: [],
            total: null,
            loader: false,
            coin_code: "",
            walletUserData: [],
            defaultCoin: '',
            balanceFlag: false,
            coinFee: []
        };
        this.changeCoins = this.changeCoins.bind(this);
    }

    /* Life Cycle Methods */
    componentDidMount() {
        var self = this;
        var total = 0;
        if (this.props.walletDetails !== null) {
            var tableData = this.props.walletDetails.coins;
            if (tableData !== undefined) {
                Object.keys(tableData).map(function (index, key) {
                    if (tableData[index].USD !== undefined)
                        total = total + parseFloat(tableData[index].USD) * (tableData[index].balance);
                    return 0;
                })
                this.setState({ total });
            }
        }
        if (this.props.location !== undefined) {
            if (this.props.location.search.includes('coinID1')) {
                this.setState({ balanceFlag: true })
            }
            else {
                this.setState({ balanceFlag: false })
            }
        }
        if (this.props.location !== undefined) {
            if (this.props.location.search.includes('coinID')) {
                var coin_name = this.props.location.search.split('=');
                this.setState({ loader: true });
                fetch(API_URL + "/wallet-details", {
                    method: "post",
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: "Bearer " + this.props.isLoggedIn
                    },
                    body: JSON.stringify({
                        coinReceive: coin_name[1]
                    })
                }).then(response => response.json())
                    .then((responseData) => {
                        let transDetails = null;
                        let walletUserDetails = null;
                        console.log(responseData)
                        if (responseData.walletTransData) {
                            if (Object.keys(responseData.walletTransData).length > 0) {
                                transDetails = responseData.walletTransData;
                            }
                        }

                        if (responseData.walletUserData) {
                            if (Object.keys(responseData.walletUserData).length > 0) {
                                walletUserDetails = responseData.walletUserData;
                            }
                        }
                        self.setState({
                            walletUserData: walletUserDetails,
                            defaultCoin: walletUserDetails[0].coin,
                            walletDetails: transDetails,
                            loader: false, coin_code: coin_name[1],
                            coinFee: responseData.coinFee
                        }, () => {
                        });
                    })
                    .catch(error => {
                        console.log(error);
                        this.openNotificationWithIcon('error', 'Error', "Something went wrong!");
                        this.setState({ loader: false });
                    })
            }
        }
    }

    /* 
        Page: /wallet
        This method is called for custom notifications .
    */

    openNotificationWithIcon(type, head, desc) {
        notification[type]({
            message: head,
            description: desc,
            duration: 5
        });
    };

    /* 
        Page: /wallet
        This method is called when we close the modal.
    */

    comingCancel = (e) => {
        /* console.log(e); */
        this.setState({
            withdraw: false,
            send: false
        });
    }

    /* 
        Page: /wallet
        This method is called when we open the modal.
    */

    showModal = (e) => {
        if (e.target.name === "SEND")
            this.setState({ send: true });
        else
            this.setState({ withdraw: true });
    }

    /* 
        Page: /wallet
        This method is called when we choose other coins for details page.
    */

    changeCoins(value) {
        this.setState({ defaultCoin: value }, () => {
            this.props.history.push(`/walletDetails?coinID${this.state.balanceFlag ? 1 : 0}=${value}`)
        })
    }
    render() {
        /* var self = this; */
        const { walletUserData, defaultCoin/*,  walletDetails */ } = this.state;

        return (
            <ContactWrap>
                <LoggedNavigation />
                <GreyWrap>
                    <ContainerContact2>
                        <HeaderWrap>
                            <Row style={{ width: "100%" }}>
                                <Col xxl={12} xl={12} lg={12} sm={24}>
                                    <LeftHead>
                                        <MYWallet>
                                            <span>{this.state.walletUserData.length > 0 ? this.state.walletUserData[0].coin_name : "COIN"}</span>
                                        </MYWallet>
                                        {this.state.balanceFlag === false ?
                                            <WalletCoin>
                                                {this.props.walletDetails !== null && this.props.walletDetails !== undefined ?
                                                    <Select onChange={this.changeCoins} value={defaultCoin} style={{ width: "100%" }}>
                                                        {this.props.walletDetails.map(function (temp) {
                                                            return (
                                                                <Option value={temp.coin}>{temp.coin}</Option>
                                                            );
                                                        })}
                                                    </Select> : ""
                                                }
                                            </WalletCoin> : ""}
                                        {this.state.balanceFlag === true ?
                                            <WalletCoin>
                                                {this.props.nowalletBalance !== null && this.props.nowalletBalance !== undefined ?
                                                    <Select onChange={this.changeCoins} value={defaultCoin} style={{ width: "100%" }}>
                                                        {this.props.nowalletBalance.map(function (temp) {
                                                            return (
                                                                <Option value={temp.coin}>{temp.coin}</Option>
                                                            );
                                                        })}
                                                    </Select> : ""
                                                }
                                            </WalletCoin> : ""}
                                    </LeftHead>
                                </Col>
                                {/* <Col xxl={12} xl={12} lg={12} sm={24}>
                                    <Right_head>
                                        <WallTotal>
                                            {/* <Tot>Total:</Tot>
                                            <Money>${this.state.total !== null ? this.state.total : ""}</Money>
                                            <Currency>USD</Currency> 
                                        </WallTotal>
                                        
                                            <Select defaultValue="USD" style={{ width: 200, marginLeft: "auto" }}>
                                                <Option value="USD">USD</Option>
                                                <Option value="EUR">EUR</Option>
                                                <Option value="INR">INR</Option>
                                            </Select> 
                                       
                                    </Right_head>
                                </Col> */}
                            </Row>
                        </HeaderWrap>
                        <DetailWrap>
                            <Address>{this.state.walletUserData.length > 0 ? this.state.walletUserData[0].coin_name.toUpperCase() : "COIN"} Address : <b style={{ color: "black" }}>{walletUserData.length > 0 ? walletUserData[0].receive_address : ""}</b></Address>
                            <hr />
                            <RowWrap>
                                <Row>
                                    <Col xxl={12} xl={12} lg={24} md={24}>
                                        <LeftBit>
                                            <CryptImg><CoinImage src={((walletUserData.length > 0 && walletUserData[0].coin_icon !== null && walletUserData[0].coin_icon !== undefined) ? _AMAZONBUCKET + walletUserData[0].coin_icon : _AMAZONBUCKET + "coin/defualt_coin.png")} /></CryptImg>
                                            <CryptAmt>
                                                <BTCAmt>
                                                    {walletUserData.length > 0 ? <NumberFormat value={walletUserData[0].balance.toFixed(4)} displayType={'text'} thousandSeparator={true} /> : ''}
                                                    <BTC>{walletUserData.length > 0 ? walletUserData[0].coin_code : ""}</BTC></BTCAmt>
                                                {/* <FIAT_amt>$874.23<AMT>USD</AMT></FIAT_amt> */}
                                            </CryptAmt>
                                        </LeftBit>
                                    </Col>
                                    <Col xxl={12} xl={12} lg={24} md={24}>
                                        <RightBit>
                                            <DepButton name="SEND" onClick={this.showModal}>SEND</DepButton>
                                            <WithButton name="RECEIVE" onClick={this.showModal}>RECEIVE</WithButton>
                                        </RightBit>
                                    </Col>
                                </Row>
                            </RowWrap>
                        </DetailWrap>
                        <TransTable>
                            <TransTitle>Transaction History</TransTitle>
                            <CoinTable>
                                <DetailsTable wallet={this.state.walletDetails} />
                            </CoinTable>
                        </TransTable>
                        {this.state.withdraw === true ?

                            <WalletPopup coinFee={this.state.coinFee} coin_code={this.state.coin_code} isLoggedIn={this.props.isLoggedIn} title="RECEIVE" comingCancel={(e) => this.comingCancel(e)} visible={this.state.withdraw} />
                            :
                            ""
                        }
                        {this.state.send === true
                            ?
                            <WalletPopup coinFee={this.state.coinFee} coin_code={this.state.coin_code} isLoggedIn={this.props.isLoggedIn} title="SEND" comingCancel={(e) => this.comingCancel(e)} visible={this.state.send} />
                            :
                            ""
                        }
                    </ContainerContact2>
                </GreyWrap>
                <CommonFooter />
                {(this.props.loader || this.state.loader) ? <FaldaxLoader /> : ""}
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
        loader: state.simpleReducer.loader ? state.simpleReducer.loader : false
    })
}

export default connect(mapStateToProps)(WalletDetails);