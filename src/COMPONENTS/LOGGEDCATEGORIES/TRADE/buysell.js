/* Built-in Packages */
import React from 'react';

/* Components */
import BuyTable from './buytable';
import SellTable from './selltable';

/* STYLED-COMPONENTS */
import {
    Left_div, Instru,
    BBC_wrap, BBC_wrap2
} from "STYLED-COMPONENTS/LOGGED_STYLE/tradeStyle";

export default class BuySell extends React.Component {
    loaderfunc(loader) {
        this.props.buySellLoader(loader);
    }
    render() {
        return (
            <Left_div>
                <Instru>ORDER BOOK {this.props.crypto}/{this.props.currency}</Instru>
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


