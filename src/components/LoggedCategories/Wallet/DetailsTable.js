import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { connect } from "react-redux"
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import moment from 'moment';
import { Table } from 'react-bootstrap';
import { Menu, Dropdown, Icon } from 'antd';


import { Head, Sub_head, DropMenu, Col1, Bit_img, Bit_text, Bit, Bit_price, Price, Icon_wrap } from "../../../styled-components/loggedStyle/walletStyle";

const Table_coin = styled(Table)`
    @media(max-width:1160px)
    {
        min-width:1160px;
    }
`

const menu = (
    <Menu>
        <Menu.Item key="0">INR</Menu.Item>
        <Menu.Item key="1">USD</Menu.Item>
        <Menu.Item key="3">EUR</Menu.Item>
    </Menu>
  );
let total=0;


class DetailsTable extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            walletDetails:{}
        }; 

    }
    componentWillReceiveProps(props,newProps)
    {
        
    }
    componentDidMount()
    { 
        if(Object.keys(this.props.wallet).length>0)
        this.setState({
            walletDetails:this.props.wallet
        });
    }
    totalUSD(total)
    {
        this.props.totalUSD(total)
    }
    render()
    {
        let {tableData} = this.props ;
        var me = this;
        return(
                <Table_coin  condensed>
                    <thead>
                        <Head wallet>
                            <Sub_head>Date</Sub_head>
                            <Sub_head>
                                SEND/RECIEVE
                            </Sub_head>
                            <Sub_head>
                                BITCOIN ADDRESS
                            </Sub_head>
                            <Sub_head>
                                AMOUNT
                            </Sub_head>
                            <Sub_head>USD
                                <Dropdown overlay={menu} trigger={['click']}>
                                    <a className="ant-dropdown-link" style={{ verticalAlign: "middle" }} href="#"><DropMenu type="down" /></a>
                                </Dropdown>
                            </Sub_head>
                        </Head>
                    </thead>
                    <tbody>
                        
                        {this.state.walletDetails!==null?Object.keys(this.state.walletDetails).length>0?Object.keys(this.state.walletDetails).map(function(index,key){
                                var date_month = moment.utc(me.state.walletDetails[index].created_at).local().format("MMM");
                                var date_day = moment.utc(me.state.walletDetails[index].created_at).local().format("DD");
                                var details = me.state.walletDetails;
                                
                                        return (
                                            <Col1 wallet>
                                                <td>    
                                                    <div>{date_month}</div>
                                                    <div>{date_day}</div>
                                                </td>
                                                <td>
                                                    {details[index].transaction_type=="buy"?<span><Icon style={{color:"green",fontSize:"20px"}} type="download"/> RECIEVED</span>:<span><Icon style={{color:"red",fontSize:"20px"}} type="upload" /> SENT</span>}
                                                </td>
                                                <td>
                                                    {details[index].source_address}
                                                </td>
                                                <td>
                                                    {details[index].amount}
                                                </td>
                                                <td>

                                                </td>
                                            </Col1>
                                        );
                                    })
                            
                        :"":""}
                    </tbody>
                </Table_coin>       
        );
    }
}

function mapStateToProps(state) {
    return ({
       
    })
}

export default connect(mapStateToProps)(DetailsTable);