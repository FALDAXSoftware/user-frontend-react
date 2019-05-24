/* Built-in Packages */
import React from 'react';

/* Components */
import HistoryTable from './historytable';

/*STYLED-COMPONENTS  */
import {
    LeftDiv2, Instru,
} from "STYLED-COMPONENTS/LOGGED_STYLE/tradeStyle";

export default class BuySell extends React.Component {

    /* Page:
        History table loader 
    */

    hisFunc(loader) {
        this.props.hisFunc(loader);
    }
    render() {

        return (
            <LeftDiv2>
                <Instru>ORDER HISTORY</Instru>
                <HistoryTable hisFunc={(loader) => { this.hisFunc(loader) }} io={this.props.io} height={this.props.height} />
            </LeftDiv2>
        );
    }
}