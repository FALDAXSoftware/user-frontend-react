import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { connect } from "react-redux"
import { Row, Col, Tabs, Button, Input, notification, Steps, Icon } from 'antd';
import styled from 'styled-components';
import { Button_wrap, Sub_wrap, Back_Button, Next_Button } from "./IDselect"

const SSN_wrap = styled.div`
    width:50%;
    margin-left:auto;
    margin-right:auto;
    // border:1px solid #e8ebee;
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

export default class DocUpload extends React.Component {
    handleFileSelectClick(val) {
        document.querySelector("#" + val).click();

    }
    render() {
        return (
            <div>
                <SSN_wrap>
                    <SSN_sub>
                        <SSN_label>Upload Document</SSN_label>
                    </SSN_sub>
                    <Row>
                        <Col md={{ span: 6 }} className="file-select-col">
                            <button className="file-select-btn" onClick={() => { this.handleFileSelectClick('front') }}>
                                <span className="plus"><Icon type="plus" theme="outlined" /></span>
                                <span className="text">click here to upload front of document</span>
                            </button>
                            <input type="file" name="front-doc" id="front" />
                        </Col>
                        <Col md={{ span: 6 }} className="file-select-col">
                            <button className="file-select-btn" onClick={() => { this.handleFileSelectClick('back') }}>
                                <span className="plus"><Icon type="plus" theme="outlined" /></span>
                                <span className="text">click here to upload back of document</span>
                            </button>
                            <input type="file" name="back-doc" id="back" />
                        </Col>
                    </Row>
                </SSN_wrap>

            </div>
        );
    }
}