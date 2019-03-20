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
                <Instru>ORDER BOOK {this.props.currency}/{this.props.crypto}</Instru>
                <BBC_wrap>
                    <BuyTable currency={this.props.currency} crypto={this.props.crypto} loaderfunc={(loader) => { this.loaderfunc(loader) }} io={this.props.io} height={this.props.height} />
                </BBC_wrap>

                <BBC_wrap2>
                    <SellTable io={this.props.io} crypto={this.props.crypto} currency={this.props.currency} height={this.props.height} />
                </BBC_wrap2>
            </Left_div>
        );
    }
}


