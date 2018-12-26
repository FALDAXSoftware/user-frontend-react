/* In-built Packages */

import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Input } from 'antd';
import { connect } from "react-redux"
import styled from 'styled-components';

/* components  */
import Tableofcoin from './TableofCoin'
import ListofCoins from './listofCoins'
import WalletDetails from './WalletDetails'
import LoggedNavigation from '../../Navigations/LoggedNavigation';
import CommonFooter from "../../Landing/Footers/Footer_home";
import { Container } from '../../../styled-components/homepage/style';
import {Contact_wrap, Grey_wrap} from "../../../styled-components/landingCategories/contactStyle"
import {Header_wrap,SearchCoin,MY_wallet,Total,Tot,Money,Currency,CoinTable,SearchCoin2,Header_wrap2} from "../../../styled-components/loggedStyle/walletStyle";
import { globalVariables } from '../../../Globals';


/* Actions */
import {walletBal,getAllCoins}  from '../../../Actions/LoggedCat/walletActions'

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
            mywallet:{},
            myCoins:{},
            total:null
        };
    }
    componentWillReceiveProps(props,newProps)
    {
        console.log("48484",props,newProps)
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
    }
    componentDidMount()
    {
        console.log("DID HELLO")
        this.props.walletBal(this.props.isLoggedIn);
        this.props.getAllCoins(this.props.isLoggedIn)
    }
    searchChange(value)
    {

    }
    submitSearch(e) {

    }
    totalCurr(total)
    {
        console.log(total)
        this.setState({total:total})
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
                                    style={{}}
                                    className=""
                                    onPressEnter={e => this.submitSearch(e)}
                                />
                            </SearchCoin>
                            <Total>
                                <Tot>Total:</Tot>
                                <Money>${this.state.total!==null?this.state.total:""}</Money>
                                <Currency>USD</Currency>
                            </Total>
                        </Header_wrap>
                        <CoinTable>
                            {console.log("data",this.state)}
                            <Table_wrap>
                                {
                                    this.props.walletDetails!==null?
                                        <Tableofcoin tableData={this.props.walletDetails.coins}/>
                                    :""
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
                                    onChange={value => this.searchChange(value)}
                                    style={{}}
                                    className=""
                                    onPressEnter={e => this.submitSearch(e)}
                                />
                            </SearchCoin2>
                        </Header_wrap2>
                        <CoinTable>
                            {console.log(this.state.myCoins)}
                            <Table_wrap>
                               {this.props.allCoins!==null?
                                    <ListofCoins tableData={this.props.allCoins.data.rows}/> 
                                :""}
                            </Table_wrap>
                        </CoinTable>
                    </ContainerContact2>
                </Grey_wrap>
                <CommonFooter />
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
const mapDispatchToProps = dispatch => ({
    walletBal: (isLoggedIn, currency) => dispatch(walletBal(isLoggedIn, currency)),
    getAllCoins: (isLoggedIn) => dispatch(getAllCoins(isLoggedIn))
    
})
export default connect(mapStateToProps,mapDispatchToProps)(Wallet);
