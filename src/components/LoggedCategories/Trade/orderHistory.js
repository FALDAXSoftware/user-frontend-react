import React from 'react';

import {
    Left_div2, Instru,
} from "../../../styled-components/loggedStyle/tradeStyle";

import HistoryTable from './HistoryTable';
export default class BuySell extends React.Component {
    hisFunc(loader) {
        this.props.hisFunc(loader);
    }
    render() {
        return (
            <Left_div2>
                <Instru>ORDER HISTORY</Instru>
                <HistoryTable hisFunc={(loader) => { this.hisFunc(loader) }} io={this.props.io} />
            </Left_div2>
        );
    }
}