import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Row, Col, Input, Spin, Select } from 'antd';
import { connect } from "react-redux"
import styled from 'styled-components';

import LoggedNavigation from '../../Navigations/LoggedNavigation';
import CommonFooter from "../../Landing/Footers/Footer_home";
import WalletPopup from './WalletPopup'
import { Container } from '../../../styled-components/homepage/style';
import { DropdownButton, MenuItem, ButtonToolbar } from 'react-bootstrap';
import DetailsTable from './DetailsTable'
import { Spin_Ex } from '../../../styled-components/homepage/style'
import { Contact_wrap, Grey_wrap } from "../../../styled-components/landingCategories/contactStyle"
import {
    Header_wrap, MY_wallet, WalletCoin, Tot, Money, Currency, CoinTable, Detail_wrap,
    Address, Row_wrap, Left_Bit, CryptImg, CryptAmt, Right_Bit, BTC, BTC_amt, FIAT_amt, AMT,
    SendButton, DepButton, WithButton, Trans_table, TransTitle, Left_head, Right_head, WallTotal
} from "../../../styled-components/loggedStyle/walletStyle";
import { globalVariables } from '../../../Globals';

let { API_URL, amazon_Bucket } = globalVariables;
const Option = Select.Option;

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
`
const Inputsearch = styled(Search)`
    width: 100%;
    height: 40px;
`
const DropdownButtonS = styled(DropdownButton)`
    background-color: ${props => props.theme.mode == "dark" ? "#01090f" : "#f5f6fa"};
    color:${props => props.theme.mode == "dark" ? "white" : "black"};
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
    background-color: ${props => props.theme.mode == "dark" ? "#01090f" : ""};
    color:${props => props.theme.mode == "dark" ? "white" : ""};
    width:100%;
    text-align:left;
    >.caret
    {
        float:right;
        margin-top: 8px;
    }
`
const CoinImage = styled.img`
    width: 60px;
    height: 60px;
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
            defaultCoin: ''
        };
        this.changeCoins = this.changeCoins.bind(this);
    }
    componentDidMount() {
        var self = this;
        this.setState({ loader: true });
        var total = 0;
        if (this.props.walletDetails !== null) {
            var tableData = this.props.walletDetails.coins;
            if (tableData !== undefined) {
                Object.keys(tableData).map(function (index, key) {
                    if (tableData[index].USD !== undefined)
                        total = total + tableData[index].USD;
                })
                this.setState({ total });
            }
        }
        if (this.props.location !== undefined) {
            if (this.props.location.search.includes('coinID')) {
                var coin_name = this.props.location.search.split('=');
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
                })
                    .then(response => response.json())
                    .then((responseData) => {
                        let transDetails = null;
                        let walletUserDetails = null;

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

                        }, () => {
                            console.log("state update");

                        });
                    })
                    .catch(error => {
                        console.log(error);

                        this.setState({ loader: false });
                    })
            }
        }
    }
    comingCancel = (e) => {
        /* console.log(e); */
        this.setState({
            withdraw: false,
            send: false
        });
    }
    showModal = (e) => {
        if (e.target.name == "SEND")
            this.setState({ send: true });
        else
            this.setState({ withdraw: true });
    }
    changeCoins(value) {
        this.setState({ defaultCoin: value }, () => {
            this.props.history.push(`/walletDetails?coinID=${value}`)
        })
    }
    render() {
        const { walletUserData, defaultCoin, walletDetails } = this.state;

        return (
            <Contact_wrap>
                <LoggedNavigation />
                <Grey_wrap>
                    <ContainerContact2>
                        <Header_wrap>
                            <Row style={{ width: "100%" }}>
                                <Col xxl={12} xl={12} lg={12} sm={24}>
                                    <Left_head>
                                        <MY_wallet>
                                            {console.log(this.state)}
                                            <span>{this.state.walletUserData.length > 0 ? this.state.walletUserData[0].coin_name : "COIN"}</span>
                                        </MY_wallet>
                                        <WalletCoin>
                                            {this.props.walletDetails !== null ?
                                                <Select onChange={this.changeCoins} value={defaultCoin} style={{ width: "100%" }}>
                                                    {this.props.walletDetails.coins.map(function (temp) {
                                                        return (
                                                            <Option value={temp.coin}>{temp.coin}</Option>
                                                        );
                                                    })}
                                                </Select> : ""
                                            }
                                        </WalletCoin>
                                    </Left_head>
                                </Col>
                                <Col xxl={12} xl={12} lg={12} sm={24}>
                                    <Right_head>
                                        <WallTotal>
                                            {/* <Tot>Total:</Tot>
                                            <Money>${this.state.total !== null ? this.state.total : ""}</Money>
                                            <Currency>USD</Currency> */}
                                        </WallTotal>
                                        {/* <Select defaultValue="USD" style={{ width: 200, marginLeft: "auto" }}>
                                            <Option value="USD">USD</Option>
                                            <Option value="EUR">EUR</Option>
                                            <Option value="INR">INR</Option>
                                        </Select> */}
                                    </Right_head>
                                </Col>
                            </Row>
                        </Header_wrap>
                        <Detail_wrap>
                            <Address>{this.state.walletUserData.length > 0 ? this.state.walletUserData[0].coin_name.toUpperCase() : "COIN"} Address : <b style={{ color: "black" }}>{walletUserData.length > 0 ? walletUserData[0].receive_address : ""}</b></Address>
                            <hr />
                            <Row_wrap>
                                <Row>
                                    <Col xxl={12} xl={12} lg={24} md={24}>
                                        {console.log(walletUserData, "DEJSDJBSD")}
                                        <Left_Bit>
                                            <CryptImg><CoinImage src={((walletUserData.length > 0 && walletUserData[0].coin_icon !== null && walletUserData[0].coin_icon !== undefined) ? amazon_Bucket + walletUserData[0].coin_icon : amazon_Bucket + "coin/defualt_coin.png")} /></CryptImg>
                                            <CryptAmt>
                                                <BTC_amt>
                                                    {walletUserData.length > 0 ? walletUserData[0].balance.toFixed(4) : ''}
                                                    <BTC>{walletUserData.length > 0 ? walletUserData[0].coin_code : ""}</BTC></BTC_amt>
                                                {/* <FIAT_amt>$874.23<AMT>USD</AMT></FIAT_amt> */}
                                            </CryptAmt>
                                        </Left_Bit>
                                    </Col>
                                    <Col xxl={12} xl={12} lg={24} md={24}>
                                        <Right_Bit>
                                            <DepButton name="SEND" onClick={this.showModal}>SEND</DepButton>
                                            <WithButton name="RECIEVE" onClick={this.showModal}>RECIEVE</WithButton>
                                        </Right_Bit>
                                    </Col>
                                </Row>
                            </Row_wrap>
                        </Detail_wrap>
                        <Trans_table>
                            <TransTitle>Transaction History</TransTitle>
                            <CoinTable>
                                {
                                    this.state.walletDetails !== null
                                        ?
                                        Object.keys(this.state.walletDetails).length > 0
                                            ?
                                            <DetailsTable wallet={this.state.walletDetails} />
                                            : ""
                                        : ""
                                }
                            </CoinTable>
                        </Trans_table>
                        {this.state.withdraw == true ?
                            <WalletPopup coin_code={this.state.coin_code} isLoggedIn={this.props.isLoggedIn} title="RECEIVE" comingCancel={(e) => this.comingCancel(e)} visible={this.state.withdraw} />
                            :
                            ""
                        }
                        {this.state.send == true
                            ?
                            <WalletPopup coin_code={this.state.coin_code} isLoggedIn={this.props.isLoggedIn} title="SEND" comingCancel={(e) => this.comingCancel(e)} visible={this.state.send} />
                            :
                            ""
                        }
                    </ContainerContact2>
                </Grey_wrap>
                <CommonFooter />
                {(this.state.loader) ? <Spin_Ex className="Ex_spin">
                    <Spin size="large" />
                </Spin_Ex> : ""}
            </Contact_wrap>
        );
    }
}

function mapStateToProps(state) {
    return ({
        walletDetails: state.walletReducer.walletData !== undefined ? state.walletReducer.walletData : null,
        allCoins: state.walletReducer.allCoinsData !== undefined ? state.walletReducer.allCoinsData : null,
        isLoggedIn: state.simpleReducer.isLoggedIn,
    })
}

export default connect(mapStateToProps)(WalletDetails);