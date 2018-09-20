/* IN-built */
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import Navigation from './Navigation'
import { Input,Row, Col, Button, Layout, Menu, Breadcrumb, Card, Cardimport, Modal , Table } from 'antd';
import MenuItem from 'antd/lib/menu/MenuItem';
import styled from 'styled-components';


const { Header, Content, Footer } = Layout;
const Search = Input.Search;

const columns = [{
    title: 'Accounts Referred',
    dataIndex: 'referral',
  }];
  const data = [{
      key:"1",
    referral:"test1@tesst.com"
  },{
    key:"2",
    referral:"test2@tesst.com"
  },{
    key:"3",
    referral:"test3@test.com"
  }];
  

/* Styled Components */

const Parent_wrap= styled.div`
    
`
const Header_text = styled.div`
    font-size: 20px;
    font-family: "Open sans";
    color: rgb( 80, 80, 80 );
    line-height: 2.4;
    margin-top:10px;
    text-align:center;
`
const Header_p = styled.div`
    font-size: 16.008px;
    font-family: "Open sans";
    color: rgb( 80, 80, 80 );
    -moz-transform: matrix( 0.99999985149599,0,0,0.99949238260564,0,0);
    -webkit-transform: matrix( 0.99999985149599,0,0,0.99949238260564,0,0);
    -ms-transform: matrix( 0.99999985149599,0,0,0.99949238260564,0,0);
    text-align:center;
`
const Ref_div = styled.div`
    margin:auto;
    width:80%;
    height:140px;
    background-color:#fcfcfc;
    border:1px solid #d6d6d6;
    margin-top:40px;
    border-radius: 10px;
    height:auto;
`
const Ref_leftcol = styled(Col)`
    text-align:left;
    &:after 
    {
        content: '';
        top: 8%;
        position: absolute;
        height: 84%;
        right: 0px;
        border-right: 1px solid #d6d6d6;
    }
    @media(max-width:600px)
    {
        text-align:center;
    }
`
const Ref_input = styled(Search)`
    width:86%;
    margin-left:35px;
    text-align:left;
    margin-top:5px;
    margin-bottom: 32px;
    @media(max-width:768px)
    {
        margin-left:auto;
        margin-right:auto;
        text-align:center;
    }
`
const Ref_text = styled.div`
    text-align:left;
    font-size: 14.007px;
    font-family: "Open sans";
    color: rgba( 119, 119, 119, 0.702 );
    text-transform: uppercase;
    margin-left:36px;
    margin-top:25px;
    line-height: 2.571;
    -moz-transform: matrix( 0.99999985149599,0,0,0.99949238260564,0,0);
    -webkit-transform: matrix( 0.99999985149599,0,0,0.99949238260564,0,0);
    -ms-transform: matrix( 0.99999985149599,0,0,0.99949238260564,0,0);  
    @media(max-width:768px)
    {
    }
`
const Ref_rightcol = styled(Col)`
    
`
const Right_value = styled.div`
    text-align:center;
    font-size: 20.01px;
    font-family: "Open sans";
    color: rgb( 0, 0, 0 );
    font-weight:bold;
    -moz-transform: matrix( 0.99999985149599,0,0,0.99949238260564,0,0);
    -webkit-transform: matrix( 0.99999985149599,0,0,0.99949238260564,0,0);
    -ms-transform: matrix( 0.99999985149599,0,0,0.99949238260564,0,0);
    margin-top:7px;

    @media(max-width:768px)
    {
        margin-bottom:20px;
    }
`
const Right_text = styled.div`
    text-align:center;
    font-size: 14.007px;
    font-family: "Open sans";
    color: rgba( 119, 119, 119, 0.702 );
    text-transform: uppercase;
    line-height: 2.571;
    -moz-transform: matrix( 0.99999985149599,0,0,0.99949238260564,0,0);
    -webkit-transform: matrix( 0.99999985149599,0,0,0.99949238260564,0,0);
    -ms-transform: matrix( 0.99999985149599,0,0,0.99949238260564,0,0);
    margin-top:30px;

    @media(max-width:768px)
    {
        margin-top:15px;
    }
`
const Ref_acc = styled.div`
    margin:auto;
    width:80%;
    height:140px;
    background-color:#ffffff;
    border:1px solid #d6d6d6;
    margin-top:40px;
    border-radius: 10px;
    height:auto;
    margin-bottom:65px;
`
export default class Referral extends React.Component
{
    render()
    {
        return(
            <Parent_wrap>
                <Header_text>Referral Program</Header_text>
                <Header_p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Header_p>
                <Ref_div>
                    <Row>
                        <Ref_leftcol sm={24} md={18}>
                            <Ref_text>YOUR REFERRAL LINK</Ref_text>
                            <Ref_input
                                placeholder="Referral"
                                enterButton="Copy"
                                size="large"
                                onSearch={value => console.log(value)}
                            />
                        </Ref_leftcol>
                        <Ref_rightcol sm={24} md={6}>
                            <Right_text>Total Earned</Right_text>
                            <Right_value>3.0850 BTC</Right_value>
                        </Ref_rightcol>
                    </Row>
                </Ref_div>
                <Ref_acc>
                    <div>
                        <Table columns={columns} dataSource={data} 
                        size="middle"
                        className="referral-table"
                        pagination={false}
                        />
                    </div>
                </Ref_acc>
            </Parent_wrap>
        );
    }
}