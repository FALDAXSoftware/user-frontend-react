import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {connect} from "react-redux"
import { Row, Col, Tabs, Button,Input,notification,Steps } from 'antd';
import styled from 'styled-components';
import {Button_wrap,Sub_wrap,Back_Button,Next_Button} from "./IDselect"

const SSN_wrap = styled.div`
    width:42%;
    margin-left:auto;
    margin-right:auto;
    border:1px solid #e8ebee;
    margin-top:88px;
    text-align:left;
    @media(max-width:1024px)
    {
        width:70%;
    }
    @media(max-width:664px)
    {
        width:90%;
    }
`
const SSN_sub = styled.div`
    margin-left:60px;
    margin-top:45px;
`
const SSN_label = styled.label`
    display:block;
    margin-bottom:10px;
`
const SSN_input = styled.input`
    display:block;
    width:85%;
    margin-bottom:50px;
    height:45px;
    padding:5px;
    background-color:#f8f8f8;
    border:none;
    border-style: solid;
    border-width: 1px;
    border-color: rgb( 212, 218, 223 );
    border-radius: 5px;
    background-color: rgb( 248, 248, 248 );      
`

export default class SSN extends React.Component
{

    render()
    {
        return(
            <div>
                <SSN_wrap>
                    <SSN_sub>
                        <SSN_label>SSN no.</SSN_label>
                        <SSN_input/>
                    </SSN_sub>
                </SSN_wrap>
                <Button_wrap>
                    <Sub_wrap>
                        <Back_Button type="primary">Back</Back_Button>
                        <Next_Button type="primary">Next</Next_Button>
                    </Sub_wrap>
                </Button_wrap>
            </div>
        );
    }
}