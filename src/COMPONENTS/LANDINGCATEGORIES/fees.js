import React, { Component } from 'react';
import 'antd/dist/antd.css';
import styled from 'styled-components';
import { connect } from "react-redux"
import { Table } from 'react-bootstrap';
import Navigation from 'COMPONENTS/NAVIGATIONS/navigation';
import CommonFooter from "COMPONENTS/LANDING/FOOTERS/footer_home";
import { Container } from 'STYLED-COMPONENTS/HOMEPAGE/style';
import { globalVariables } from 'Globals';
import {
    Contact_wrap, Grey_wrap, Career_wrap
} from 'STYLED-COMPONENTS/LANDING_CATEGORIES/contactStyle';

let { API_URL } = globalVariables;

export const ContainerContact = styled(Container)`
    background-color:${props => props.theme.mode == "dark" ? "#041422" : "white"};
    border-radius:5px;
    padding-right:120px;
    padding-left:120px;
    padding-bottom:70px;
    @media(max-width:992px)
    {
        padding-right:30px;
        padding-left:30px;
    }
    @media(max-width:480px)
    {
        padding-right:10px;
        padding-left:10px;
    }
`
const FeeDiv = styled.div`
    margin-top:50px;
`
const ParagraphDiv = styled.div`
`
const SubHead = styled.p`
    font-weight: bold;
    font-size: 19.975px;
    font-family: "Open Sans";
    text-align: center;
    color: ${props => props.theme.mode == "dark" ? "white" : "black"};
`
const FeesTable = styled(Table)`
    width: 40% !important;
    margin-left: auto;
    margin-right: auto;
    border:1px solid black;
    >thead
    {
        background-color:${props => props.theme.mode == "dark" ? "#041422" : "#87addc"};
        color:${props => props.theme.mode == "dark" ? "white" : "black"} ;
        border:1px solid black;
    }
    >thead>tr>th
    {
        border:1px solid black;
        font-family: "Open Sans";
    }
    >thead>tr>th
    {
        vertical-align: middle;
        text-align: center;
        height: 80px;
        border:1px solid black;
        border-top:1px solid black !important;
    }
    >tbody
    {
        color:${props => props.theme.mode == "dark" ? "white" : "black"} ;
        border:1px solid black;
    }
    >tbody>tr>td{
        text-align:center;
        border: 1px solid black;
        border-top: 1px solid black;
        font-family: "Open Sans";
    }
    @media(max-width:992px)
    {
        width:100% !important;
    }
   
`
const HeadSub = styled.div`
    color: ${props => props.theme.mode == "dark" ? "white" : "black"};
    font-weight: bold;
`
const DescP = styled.p`
    color: black;
    font-family: "Open Sans";
    color: ${props => props.theme.mode == "dark" ? "white" : "black"};
`
const QueP = styled.p`
    font-size:20px;
    color: ${props => props.theme.mode == "dark" ? "white" : "black"};
    font-family: "Open Sans";
`
const Desc = styled.p`
    font-style: italic;
    font-family: "Open Sans";
    margin-left: 42px;
    margin-top:10px;
    text-align: justify;
    color: ${props => props.theme.mode == "dark" ? "white" : "black"};
    @media(max-width:992px)
    {
        margin-left:0px;
    }
`

class Fees extends Component {
    constructor(props) {
        super(props);
        this.state = {
            feesData: []
        };
    }

    componentDidMount = () => {
        this._getAllFees();
    }

    _getAllFees = () => {
        fetch(`${API_URL}/get-all-fee`, {
            method: "get",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: "Bearer " + this.props.isLoggedIn
            }
        })
            .then(response => response.json())
            .then((responseData) => {
                /* console.log(responseData); */
                this.setState({ feesData: responseData.data })
            })
            .catch(error => { /* console.log(error) */ })
    }

    render() {
        return (
            <Contact_wrap>
                <Navigation />
                <Grey_wrap>
                    <ContainerContact>
                        <Career_wrap>
                            <div>
                                <SubHead>
                                    DEPOSIT FEES
                                </SubHead>
                                <DescP><b>Free.</b> FALDAX never charges you for depositing funds into your wallet.</DescP>
                            </div>

                            <FeeDiv>
                                <SubHead>
                                    WITHDRAWAL FEES
                                </SubHead>
                                <DescP>
                                    Withdrawal fees are subject to change at any time, per coin or token, as they are based on blockchain conditions. The current fee will be displayed on-screen prior to withdrawing funds. A Withdrawal is defined as funds being removed from a FALDAX wallet to an external, non FALDAX controlled, destination.
                                </DescP>
                            </FeeDiv>

                            <FeeDiv>
                                <SubHead>
                                    TRADING FEES
                                </SubHead>
                                <FeesTable responsive bordered>
                                    <thead>
                                        <tr>
                                            <th>Maker</th>
                                            <th>Taker</th>
                                            <th>Trade Volume (30-Day Trailing Average)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.feesData.map((fee) => {
                                                return (
                                                    <tr>
                                                        <td>{fee.maker_fee}</td>
                                                        <td>{fee.taker_fee}</td>
                                                        <td>{fee.trade_volume}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </FeesTable>
                            </FeeDiv>

                            <ParagraphDiv>
                                <QueP><b>Can Trading Fees Change?</b></QueP>
                                <DescP>
                                    They can, but we will never change something like that without ample notification and discussion with our customers. Trading Fees are not something that change on a regular basis and only do so after much planning and consideration.
                                </DescP>
                            </ParagraphDiv>

                            <ParagraphDiv>
                                <QueP><b>What are Trading Fees?</b></QueP>
                                <DescP>
                                    FALDAX strives to offer customers incredible value by adding robust features and functionality to everyone that trades here, at no additional cost. The only source of revenue is fees collected per transaction and per withdrawal. Any improvements we make or features we add will be included, forever.
                                    Liquidity and price stability are the life-blood of any exchange, so we have adopted a taker-only fee model to encourage maker orders. To understand the logic behind who is charged the ‘Taker’ fee, you must first understand the differences between Order Types.
                                </DescP>
                            </ParagraphDiv>

                            <ParagraphDiv>
                                <QueP><b>What Order Types are available and what are their differences?</b></QueP>
                                <HeadSub>
                                    Market Order:
                                </HeadSub>
                                <Desc>
                                    <p>A market order, considered the most basic of all order types, is a request to buy or sell an asset at the best available price in the Order Book. It is widely considered the fastest and most reliable way to enter or exit a trade and provides the most likely method of getting in or out of a trade quickly. For many large-cap, liquid assets, for instance, market orders fill nearly instantaneously.</p>
                                    <p>Note that any time a trader seeks to execute a market order, this means the trader is willing to buy at the asking price or sell at the bid price. Thus, the person executing market order is immediately giving up the bid-ask spread.</p>
                                    <p>For this reason, it’s sometimes a good idea to look closely at the bid-ask spread before placing a market order, especially for thinly traded assets. Failing to do so sometimes results in very high costs. This is doubly important for individuals who trade frequently, or anyone utilizing an automated trading system.</p>
                                    <p>For example, say the bid-ask prices for shares of Excellent Industries are $18.50 and $20, respectively, with 100 shares available at the bid. If a trader places a market order to buy 500 shares, the first 100 will execute at $20. The next 400, however, fill at the best asking price for sellers of the next 400 shares. If the stock is very thinly traded, the next 400 shares might be executed at $22 or more. This is precisely why it’s a good idea to use limit orders for these types of assets. <a href="https://www.investopedia.com/terms/m/marketorder.asp" target="_blank" >(Source)</a></p>
                                </Desc>

                                <HeadSub>
                                    Limit Order:
                                </HeadSub>
                                <Desc>
                                    <p>A limit order is an order to buy or sell at a set quantity and a specified limit price or better. Because a limit order is not a market order, it may not execute if the price set by the trader cannot be met during the period in which it is left open. Limit orders also allow a limit to the length of time an order can be outstanding before being canceled.</p>
                                    <p>While the execution of a limit order is not guaranteed, it does ensure that the trader does not miss the opportunity to buy or sell at the target price. Depending on the direction of the position, a limit order is sometimes referred to as a buy limit order or a sell limit order. For example, an order that stipulates the buyer is not willing to pay more than $30 asset is a buy limit order, while a sell limit order may require the share price to be at least $30 to execute.
                                    <a href="https://www.investopedia.com/terms/l/limitorder.asp" target="_blank" > (Source)</a></p>
                                </Desc>

                                <HeadSub>
                                    Stop-Limit Order:
                                </HeadSub>
                                <Desc>
                                    <p>A stop order is an order that becomes executable once a set price has been reached and is then filled at the current market price. A traditional stop order will be filled in its entirety, regardless of any changes in the current market price as the trades are completed.</p>
                                    <p>A limit order is one that is set at a certain price. It is only executable at times the trade can be performed at the limit price or at a price that is considered more favorable than the limit price. If trading activity causes the price to become unfavorable in regards to the limit price, the activity related to the order will be ceased.</p>
                                    <p>By combining the two orders, the <a href="https://www.investopedia.com/terms/i/investor.asp" target="_blank"> trader </a> has much greater precision in executing the trade. A stop order is filled <a href="https://www.investopedia.com/terms/a/atthemarket.asp" target="_blank" >at the market price</a> after the stop price has been hit, regardless if the price changes to an unfavorable position. This can lead to trades being completed at less than desirable prices should the market adjust quickly. By combining it with the features of a limit order, trading is halted once the pricing becomes unfavorable, based on the trader’s limit.</p>
                                    <p>For example, assume that LTC is trading at $40 and a trader wants to buy once it begins to show rapid upward momentum. The trader has put in a stop-limit order to buy with the stop price at $45 and the limit price at $46. If the price of ABC Inc. moves above $45 stop price, the order is activated and turns into a limit order. As long as the order can be filled under $46, which is the limit price, the trade will be filled. If the asset gaps above $46, the order will not be filled.
                                    <a href="https://www.investopedia.com/terms/s/stop-limitorder.asp" target="_blank" > (Source)</a></p>
                                </Desc>
                            </ParagraphDiv>

                            <ParagraphDiv>
                                <QueP><b>What are Makers and Takers?</b></QueP>
                                <DescP>
                                    A common misconception is that sellers are ‘Makers’ and buyers are ‘Takers,’ which can be true but isn’t always the case. The better way to differentiate them is to first associate ‘Maker’ and ‘Taker’ with an order, rather than a trader. Then, think of a ‘Taker’ as an order that triggers immediately rather than staying on the Order Book for some time. From this perspective, you can see that a ‘Taker’ order can be a Buy or a Sell order.
                                </DescP>
                                <HeadSub>
                                    For example:
                                </HeadSub>
                                <Desc>
                                    <p>Trader A creates a Market Buy Order for 1 BTC with XRP. The Order Management System (OMS) will find the least expensive BTC/XRP sell order on the Order Book and purchase it with Trader A’s XRP immediately. If the value of the BTC/XRP sell order is less than 1 BTC, the OMS will exhaust that sell order and find the next sell order by price to continue fulfilling Trader A’s Market Buy Order. This process continues until the entire Market Buy Order is fulfilled.</p>
                                    <p>Result: Trader A is charged the ‘Taker’ fee (in XRP) because his order was executed immediately, and liquidity is removed from the Order Book. Trader B, who created the BTC/XRP sell order, is the Maker in this example because her sell order was sitting on the Order Book to be fulfilled. Trader B’s order type was a Limit or Stop-Limit Order.</p>
                                    <p>Alternatively, if Trader A created a Market Sell Order with the same parameters, the OMS would search for BTC buy orders on the Order Book to fulfill it. Trader A’s Sell Order is the ‘Taker’ in this situation as well.</p>
                                </Desc>
                            </ParagraphDiv>

                        </Career_wrap>
                    </ContainerContact>
                </Grey_wrap>
                <CommonFooter />
            </Contact_wrap >
        );
    }
}

function mapStateToProps(state) {
    return ({
        isLoggedIn: state.simpleReducer.isLoggedIn,
    })
}
export default connect(mapStateToProps)(Fees);
