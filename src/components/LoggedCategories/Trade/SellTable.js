import React, { Component } from 'react';
import 'antd/dist/antd.css';
import styled from 'styled-components';
import { Table } from 'react-bootstrap';

export const History_wrap = styled.div`
`
export const TableBuy = styled(Table)`
    >thead
    {
        background-color:${props => props.theme.mode == "dark" ? "#041422" : "#f5f6fa"};
        color:#174c7e;
        border:none;
    }
    >thead>tr>th
    {
        border:0px;
    }
    >tbody
    {
        color:${props => props.theme.mode == "dark" ? "white" : ""} ;
    }
    >tbody>tr:nth-of-type(odd)
    {
        background-color:${props => props.theme.mode == "dark" ? "#041422" : "#f9f9f9"};
    }
`

class SellTable extends Component {
    render() {
        return (
            <History_wrap>
                <TableBuy striped responsive>
                    <thead>
                        <tr>
                            <th>MY SIZE</th>
                            <th>AMOUNT</th>
                            <th>BID</th>
                            <th>TOTAL</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
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
                        </tr>
                        <tr>
                            <td>0.50021</td>
                            <td>0.50021</td>
                            <td>0.50021</td>
                            <td>0.50021</td>
                        </tr>
                    </tbody>
                </TableBuy>
            </History_wrap>
        )
    }
}

export default SellTable;
