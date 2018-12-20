import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Instru2, WrapDepth } from '../../../styled-components/loggedStyle/tradeStyle';

class DepthChart extends Component {
    render() {
        return (
            <WrapDepth>
                <Instru2>Market Depth BBC/BTC</Instru2>
            </WrapDepth>
        )
    }
}

export default DepthChart;
