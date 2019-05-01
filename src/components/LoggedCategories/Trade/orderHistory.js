/* Built-in Packages */
import React from 'react';

/* Components */
import HistoryTable from './HistoryTable';

/*styled-components  */
import {
    Left_div2, Instru,
} from "../../../styled-components/loggedStyle/tradeStyle";

export default class BuySell extends React.Component {
    hisFunc(loader) {
        this.props.hisFunc(loader);
    }
    render() {

        return (
            <Left_div2>
                <Instru>ORDER HISTORY</Instru>
                <HistoryTable hisFunc={(loader) => { this.hisFunc(loader) }} io={this.props.io} height={this.props.height} />
            </Left_div2>
        );
    }
}