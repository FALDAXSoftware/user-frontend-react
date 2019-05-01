
/* Built-in Packages */
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Input } from 'antd';
import { Table } from 'react-bootstrap';
import styled from 'styled-components';

const Search = Input.Search;
const Headwrap = styled.div`
    margin-left:30px;
    margin-right:30px;
    padding-top:40px;
    display:flex;
`
const RiseText = styled.span`
    font-size: 14px;
    font-family: "Open Sans";
    color: rgb( 127, 127, 127 );
    font-weight: bold;
`
const Tablerise = styled.div`
    margin-left:30px;
    margin-right:30px;
    border:1px solid #ddd;
    margin-top: 40px;

    & table
    {
        margin-bottom:0px;
    }
    & table thead tr th
    {
        border-bottom:0px;
        background-color:${props => props.theme.mode == "dark" ? "#041b2c" : "#f5f6fa"};
        color:${props => props.theme.mode == "dark" ? "#174c7e" : ""};
    }
    & table tbody tr td
    {
        border-top:0px;
        color:${props => props.theme.mode == "dark" ? "white" : ""};
    }
    & table tbody tr:nth-of-type(odd)
    {
        background-color:${props => props.theme.mode == "dark" ? "#041422" : "white"};
    }
    & table tbody tr:nth-of-type(even)
    {
        background-color:${props => props.theme.mode == "dark" ? "#041b2c" : "#f5f6fa"};
    }
`
const InputSearch = styled(Search)`
    margin-left:auto;
    >input
    {
        background-color:${props => props.theme.mode == "dark" ? "#041b2c" : ""};
    }
    & .anticon 
    {
        color:${props => props.theme.mode == "dark" ? "white" : ""};
    }
`

export default class RiseTable extends Component {
    render() {
        return (
            <div>
                <Headwrap>
                    <RiseText>Rising/Falling</RiseText>
                    <InputSearch
                        placeholder="input search text"
                        onSearch={value => console.log(value)}
                        style={{ width: 200 }}
                    />
                </Headwrap>
                <Tablerise >
                    <Table striped responsive>
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
                    </Table>
                </Tablerise>
            </div>
        );
    }
}
