/* Built-in Packages */
import React from 'react';

/* Components */
import BuyTable from './buytable';
import SellTable from './selltable';

/* STYLED-COMPONENTS */
import {
    LeftDiv, Instru,
    BBCWrap, BBCWrap2
} from "STYLED-COMPONENTS/LOGGED_STYLE/tradeStyle";

export default class BuySell extends React.Component {

    /* 
        Page: /trade --> Buy Book
        It is called for loader of order book.
    */

    loaderfunc(loader) {
        this.props.buySellLoader(loader);
    }

    render() {
        return (
            <LeftDiv>
                <Instru>ORDER BOOK {this.props.crypto}/{this.props.currency}</Instru>
                <BBCWrap>
                    {console.log(this.props.height)}

                    <BuyTable currency={this.props.currency} crypto={this.props.crypto} loaderfunc={(loader) => { this.loaderfunc(loader) }} io={this.props.io} elementHeight={this.props.height} />
                </BBCWrap>

                <BBCWrap2>
                    <SellTable io={this.props.io} crypto={this.props.crypto} currency={this.props.currency} height={this.props.height} />
                </BBCWrap2>
            </LeftDiv>
        );
    }
}


