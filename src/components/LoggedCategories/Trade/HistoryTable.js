import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {connect} from "react-redux"
import { Row, Col, Tabs, Button,Input,notification,Steps,Menu, Dropdown,Icon } from 'antd';
import styled from 'styled-components';
import {Table} from 'react-bootstrap';


const HTable = styled(Table)`

    >thead
    {
        background-color:${props => props.theme.mode=="dark" ? "#041422" : "#f5f6fa"};
        color:#174c7e;
        border:none;
    }
    >thead>tr>th
    {
        border:0px;
    }
    >tbody
    {
        color:${props => props.theme.mode=="dark" ? "white": ""} ;
    }
    >tbody>tr:nth-of-type(odd)
    {
        background-color:${props => props.theme.mode=="dark"? "#041422" : "#f9f9f9" };
    }
`
const History_wrap = styled.div`
    margin-left:30px;
    margin-right:30px;
    border:1px solid #d8d8d8;
`

class HistoryTable extends React.Component
{
    render()
    {
        return(
            <History_wrap>
                <HTable striped responsive>
                    <thead>
                        <tr>
                        <th>SIDE</th>
                        <th>AMOUNT</th>
                        <th>FILL PRICE</th>
                        <th>TIME</th>
                        <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>0.50021</td>
                            <td>0.50021</td>
                            <td>0.50021</td>
                            <td>0.50021</td>
                            <td>0.50021</td>
                        </tr>
                        <tr>
                            <td>0.50021</td>
                            <td>0.50021</td>
                            <td>0.50021</td>
                            <td>0.50021</td>
                            <td>0.50021</td>
                        </tr>
                        <tr>
                            <td>0.50021</td>
                            <td>0.50021</td>
                            <td>0.50021</td>
                            <td>0.50021</td>
                            <td>0.50021</td>
                        </tr>
                    </tbody>
                </HTable>   
            </History_wrap>
        )
    }
}

export default HistoryTable;