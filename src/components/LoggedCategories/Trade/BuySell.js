import React from 'react';
import BuyTable from './BuyTable';
import SellTable from './SellTable';
import {
    Left_div, Instru,
    BBC_wrap, BBC_wrap2
} from "../../../styled-components/loggedStyle/tradeStyle";

export default class BuySell extends React.Component {
    loaderfunc(loader) {
        this.props.buySellLoader(loader);
    }
    render() {
        return (
            <Left_div>
                <Instru>ORDER BOOK BBC/BTC</Instru>
                <BBC_wrap>
                    <BuyTable loaderfunc={(loader) => { this.loaderfunc(loader) }} io={this.props.io} height={this.props.height} />
                </BBC_wrap>

                <BBC_wrap2>
                    <SellTable io={this.props.io} height={this.props.height} />
                </BBC_wrap2>
            </Left_div>
        );
    }
}


