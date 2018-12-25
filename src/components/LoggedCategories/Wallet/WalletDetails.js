import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Row, Col, Input,Spin } from 'antd';
import { connect } from "react-redux"
import styled from 'styled-components';

import LoggedNavigation from '../../Navigations/LoggedNavigation';
import CommonFooter from "../../Landing/Footers/Footer_home";
import WalletPopup from './WalletPopup'
import { Container } from '../../../styled-components/homepage/style';
import { DropdownButton, MenuItem, ButtonToolbar } from 'react-bootstrap';
import DetailsTable from './DetailsTable'
import { Spin_Ex } from '../../../styled-components/homepage/style'
import {Contact_wrap, Grey_wrap} from "../../../styled-components/landingCategories/contactStyle"   
import {
    Header_wrap, MY_wallet, WalletCoin, Tot, Money, Currency, CoinTable, Detail_wrap,
    Address, Row_wrap, Left_Bit, CryptImg, CryptAmt, Right_Bit, BTC, BTC_amt, FIAT_amt, AMT,
    SendButton, DepButton, WithButton, Trans_table, TransTitle, Left_head, Right_head, WallTotal
} from "../../../styled-components/loggedStyle/walletStyle";
import { globalVariables } from '../../../Globals';

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

class WalletDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            withdraw: false,
            send:false,
            walletDetails:{},
            total:null,
            loader:false
        };
    }
    componentDidMount()
    {
        this.setState({loader:true});
        console.log(this.props)
        var total = 0;
        if(this.props.walletDetails!==null)
        {
            var tableData=this.props.walletDetails.coins;
            if(tableData!==undefined)
            {
                Object.keys(tableData).map(function(index,key){
                    console.log(tableData[index].USD)
                    if(tableData[index].USD!==undefined)
                    total = total + tableData[index].USD;
                })
                console.log("TOTAL",total)
                this.setState({total});
            }
        }
        if(this.props.location !== undefined)
        {
            if(this.props.location.search.includes('coinID'))
            {
                var coin_name = this.props.location.search.split('=');
                console.log(coin_name);
                fetch(API_URL + "/wallet-details" ,{
                    method:"post",
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization:"Bearer " + this.props.isLoggedIn
                    },
                    body:JSON.stringify({
                        coinReceive:coin_name[1]
                    })
        
                })
                .then(response => response.json())
                .then((responseData) => {
                    this.setState({walletDetails:responseData.walletTransData,loader:false});
                })
                .catch(error => {
                })
            }
        }
    }
    comingCancel = (e) => {
        /* console.log(e); */
        this.setState({
            withdraw: false,
            send:false
        });
    }
    showModal = (e) => {
        console.log(e.target.value,e.target.name)
        if(e.target.name=="SEND")
        this.setState({send:true});
        else
        this.setState({ withdraw: true });
    }
    render() {
        var tempDetails = null;
        if(Object.keys(this.state.walletDetails).length>0)
        {
            tempDetails = this.state.walletDetails;
        }
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
                                            <Money>${this.state.total!==null?this.state.total:""}</Money>
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
                            <Address>Bitcoin Address:<b style={{ color: "black" }}>{}</b></Address>
                            <hr />
                            <Row_wrap>
                                <Row>
                                    <Col xxl={12} xl={12} lg={24} md={24}>
                                        <Left_Bit>
                                            <CryptImg><img src="/images/LoggedCat/Bit_wallet.png" /></CryptImg>
                                            <CryptAmt>
                                                <BTC_amt>0.05218<BTC>{tempDetails!==null?tempDetails[0].coin_code:""}</BTC></BTC_amt>
                                                <FIAT_amt>$874.23<AMT>USD</AMT></FIAT_amt>
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
                                {console.log(this.state.walletDetails)}
                                {
                                    this.state.walletDetails!==null
                                    ?
                                        Object.keys(this.state.walletDetails).length>0
                                        ?
                                        <DetailsTable wallet={this.state.walletDetails}/>
                                        :""
                                    :""
                                }
                            </CoinTable>
                        </Trans_table>
                        {this.state.send==true?
                            <WalletPopup isLoggedIn={this.props.isLoggedIn} title="SEND" comingCancel={(e) => this.comingCancel(e)} visible={this.state.send} />
                            :
                            ""
                        }
                        {this.state.withdraw==true
                            ?
                            <WalletPopup isLoggedIn={this.props.isLoggedIn}  title="RECEIVE" comingCancel={(e) => this.comingCancel(e)} visible={this.state.withdraw} />
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
    console.log(state)
    return ({
        walletDetails:state.walletReducer.walletData!==undefined ? state.walletReducer.walletData : null,
        allCoins:state.walletReducer.allCoinsData!==undefined ? state.walletReducer.allCoinsData : null,
        isLoggedIn: state.simpleReducer.isLoggedIn,
    })
}

export default connect(mapStateToProps)(WalletDetails);