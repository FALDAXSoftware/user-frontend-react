import React, { Component } from 'react';
import 'antd/dist/antd.css';
import styled from 'styled-components';

import { Scrollbars } from 'react-custom-scrollbars';
// import { Table, columns, } from 'react-bootstrap';

export const History_wrap = styled.div`
`

export const CustomTable = styled.table`
    width:100%;
    table-layout: fixed;
    & td, & th{
        padding:15px;
    }
`
export const TableHeader = styled(CustomTable)`
    background-color:${props => props.theme.mode == "dark" ? "#041422" : "#f5f6fa"};

`
export const TableContent = styled(CustomTable)`
    >tbody
    {
        color:${props => props.theme.mode == "dark" ? "white" : ""} ;
    }
    >tbody>tr:nth-of-type(even)
    {
        background-color:${props => props.theme.mode == "dark" ? "#041422" : "#f5f6fa"};
    }

`
// export const TableBuy = styled(Table)`
//     >thead
//     {
//         background-color:${props => props.theme.mode == "dark" ? "#041422" : "#f5f6fa"};
//         color:#174c7e;
//         border:none;
//     }
//     >thead>tr>th
//     {
//         border:0px;
//     }
//     >tbody
//     {
//         color:${props => props.theme.mode == "dark" ? "white" : ""} ;
//     }
//     >tbody>tr:nth-of-type(even)
//     {
//         background-color:${props => props.theme.mode == "dark" ? "#041422" : "#f5f6fa"};
//     }
// `

class BuyTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }
    componentDidMount() {
        const data = [];
        for (let i = 0; i < 100; i++) {
            data.push({
                my_size: 0.001,
                amount: 0.05,
                bid: 0.02,
                total: 0.02,
            });
        }
        console.log(data);

        this.setState({
            data: data
        });
    }
    render() {
        const columns = [{
            title: 'MY SIZE',
            dataIndex: 'my_size',
        }, {
            title: 'AMOUNT',
            dataIndex: 'amount',
        }, {
            title: 'BID',
            dataIndex: 'bid',
        }, {
            title: 'TOTAL',
            dataIndex: 'total',
        }
        ]
        return (
            <History_wrap>
                <div class="tbl-header">
                    <TableHeader cellpadding="10px" cellspacing="0" border="0">
                        <thead>
                            <tr>
                                <th>MY SIZE</th>
                                <th>AMOUNT</th>
                                <th>BID</th>
                                <th>TOTAL</th>
                            </tr>
                        </thead>
                    </TableHeader>
                </div>
                <div class="tbl-content">
                    <Scrollbars
                        style={{ height: 300 }}>
                        <TableContent cellpadding="10px" cellspacing="0" border="0">
                            <tbody>
                                {this.state.data.map(element => (
                                    <tr>
                                        <td>{element.my_size}</td>
                                        <td>{element.amount}</td>
                                        <td>{element.bid}</td>
                                        <td>{element.total}</td>
                                    </tr>
                                ))

                                }

                            </tbody>
                        </TableContent>
                    </Scrollbars>

                </div>
            </History_wrap>
        )
    }
}

export default BuyTable;
