import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {connect} from "react-redux"
import styled from 'styled-components';
import { Table } from 'react-bootstrap';
import { Menu, Dropdown, Icon } from 'antd';

import {Head,Sub_head,DropMenu,Col1,Bit_img,Bit_text,Bit,Bit_price,Price,Icon_wrap} from "../../../styled-components/loggedStyle/walletStyle";

const Table_coin = styled(Table) `
    
`
const Table_wrap = styled.div `  
    margin-left:-30px;
    margin-right:-30px; 
  
`
const menu = (
    <Menu>
      <Menu.Item key="0">INR</Menu.Item>
      <Menu.Item key="1">USD</Menu.Item>
      <Menu.Item key="3">EUR</Menu.Item>
    </Menu>
  );
export default class TableofCoin extends React.Component
{
    render()
    {
        return(
            <Table_wrap>
                <Table_coin  condensed hover>
                    <thead>
                        <Head>
                            <Sub_head>Coins</Sub_head>
                            <Sub_head>USD
                                <Dropdown overlay={menu} trigger={['click']}>
                                    <a className="ant-dropdown-link" style={{verticalAlign:"middle"}}href="#"><DropMenu type="down" /></a>
                                </Dropdown>
                            </Sub_head>
                            <Sub_head>EUR
                                <Dropdown overlay={menu} trigger={['click']}>
                                    <a className="ant-dropdown-link" style={{verticalAlign:"middle"}}href="#"><DropMenu type="down" /></a>
                                </Dropdown>
                            </Sub_head>
                            <Sub_head>INR
                                <Dropdown overlay={menu} trigger={['click']}>
                                    <a className="ant-dropdown-link" style={{verticalAlign:"middle"}}href="#"><DropMenu type="down" /></a>
                                </Dropdown>
                            </Sub_head>
                            <Sub_head></Sub_head>
                        </Head>
                    </thead>
                    <tbody>
                        <Col1>
                            <td>
                                <Bit_img src="./images/LoggedCat/Bit_img.png"/>
                                <Bit_text><Bit>BITCOIN</Bit><Bit_price>0.5433 BTC</Bit_price></Bit_text>
                            </td>
                            <td><Price>$3605.99</Price></td>
                            <td> <Price>{"\u20AC"}3103.84 </Price></td>
                            <td> <Price>&#8377; 251950.52 </Price></td>
                            <td>
                                <Icon_wrap>
                                    <Icon type="right" />                                
                                </Icon_wrap>
                            </td>
                        </Col1>
                        <Col1>
                            <td>
                                <Bit_img src="./images/LoggedCat/Bit_img.png"/>
                                <Bit_text><Bit>BITCOIN</Bit><Bit_price>0.5433 BTC</Bit_price></Bit_text>
                            </td>
                            <td><Price>$3605.99</Price></td>
                            <td> <Price>{"\u20AC"}3103.84 </Price></td>
                            <td> <Price>&#8377; 251950.52 </Price></td>
                            <td>
                                <Icon_wrap>
                                    <Icon type="right" />                                
                                </Icon_wrap>
                            </td>
                        </Col1>
                        <Col1>
                            <td>
                                <Bit_img src="./images/LoggedCat/Bit_img.png"/>
                                <Bit_text><Bit>BITCOIN</Bit><Bit_price>0.5433 BTC</Bit_price></Bit_text>
                            </td>
                            <td><Price>$3605.99</Price></td>
                            <td> <Price>{"\u20AC"}3103.84 </Price></td>
                            <td> <Price>&#8377; 251950.52 </Price></td>
                            <td>
                                <Icon_wrap>
                                    <Icon type="right" />                                
                                </Icon_wrap>
                            </td>
                        </Col1>
                    </tbody>
                </Table_coin>
            </Table_wrap>
        );
    }
}