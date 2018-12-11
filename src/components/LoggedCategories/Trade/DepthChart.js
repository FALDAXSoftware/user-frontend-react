import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {connect} from "react-redux"
import { Row, Col, Tabs, Button,Table,Input,notification,Steps,Menu, Dropdown,Icon } from 'antd';
import styled from 'styled-components';

import {Instru2,WrapDepth} from '../../../styled-components/loggedStyle/tradeStyle';

class DepthChart extends React.Component
{
    render()
    {
        return(
            <WrapDepth>
                <Instru2>Market Depth BBC/BTC</Instru2>
            </WrapDepth>
        )
    }
}

export default DepthChart;