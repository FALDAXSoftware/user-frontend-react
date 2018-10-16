import styled from 'styled-components';
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Row, Col, Button, Layout, Menu, Breadcrumb, Card, Cardimport, Modal } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon } from '@fortawesome/free-solid-svg-icons';

/* Styled-Components */

export const Day_night_mode = styled.div`
    display:inline;
    font-size: 13px;
    padding-right: 10px;
    cursor:pointer;
`
export const Exchange = styled.div`
    display:inline;
    font-size: 13px;
    font-family: "Open sans";
    color: rgb( 40, 37, 40 );
    font-weight: bold;
    text-transform: uppercase;
    padding-right: 22px;
    cursor:pointer;
    @media(max-width:1540px)
    {
        margin-right:8px;
        padding-right:8px;
    }
    @media(max-width:670px)
    {
        display:none;
    }
`
const Login_text = styled.span`
    border-left: 1px solid #f0f0f0;
    font-size: 13px;
    font-family: "Open sans";
    color: rgb( 0,0,0 );
    font-weight: bold;
    margin-right: 15px;
    padding-left: 30px;
    cursor: pointer;
    @media(max-width:480px)
    {
        display:none;
    }
    @media(max-width:1540px)
    {
        margin-right:10px;
        padding-left: 18px;
    }
`
const Temp_button = styled(Button)`
    background-color:#0f477b;
    border-radius: 20px;
    margin-right:30px;

    @media(max-width:480px)
    {
        display:none;
    }
    @media(max-width:1440px)
    {
        margin-right: 10px;
    }
`
const Open = styled.span`
    display:none;
    @media(max-width:1320px)
    {
        display:inline-block;
        margin-right:15px;
    }
`
export default class Beforelog extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            comingSoon:false,
        }
    }
    dispModal(pressed)
    {
        this.props.dispModal(pressed)
    }
    openNav()
    {
        this.props.openNav()
    }
    showComing = () => {
        console.log(" onClick={this.showComming}")
        this.setState({
          comingSoon: true,
        });
      }
    
      handleComing = (e) => {
        console.log(e);
        this.setState({
            comingSoon: false,
        });
      }
    
      comingCancel = (e) => {
        console.log(e);
        this.setState({
            comingSoon: false,
        });
      }
    render()
    {
        return(
                    <div>
                        
                        <Day_night_mode>
                            <span> <FontAwesomeIcon icon={faMoon} color='black' style={{transform: 'rotate(315deg)'}} /> </span>
                        </Day_night_mode>
                        <Exchange>
                            <span  onClick={this.showComing}> CAREERS </span>
                        </Exchange>
                      {/*   <Exchange onClick={this.showComing}>
                            <span  onClick={this.showComing}> LANGUAGE </span>
                        </Exchange> */}
                        <Login_text onClick={()=>this.dispModal("login")}>LOGIN</Login_text>
                        <Temp_button onClick={()=>this.dispModal("signup")} type="primary" size="large">Sign up</Temp_button>
                        <Open style={{ fontSize:"30px", cursor:"pointer", lineHeight: '76px', verticalAlign: 'middle' }} onClick={() => this.openNav()}>&#9776;</Open> 
                        <div>
                            <Modal
                            visible={this.state.comingSoon}
                            onOk={this.handleComing}
                            className="Coming_soon"
                            onCancel={this.comingCancel}
                            footer={null}
                            >
                            <div style={{textAlign:"center",color: "white"}}><h1 style={{textAlign:"center",color: "white"}}>Coming Soon</h1></div>
                            </Modal>
                        </div>
                    </div>
        );
    }
}