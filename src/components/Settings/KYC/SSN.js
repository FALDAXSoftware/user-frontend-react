import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { connect } from "react-redux"
import styled from 'styled-components';
import { ButtonWrap, SubWrap, BackButton, NextButton } from "./IDselect"
import { kycFormAction } from "../../../Actions/Settings/passwordChange"

const SSNWrap = styled.div`
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
const SSNLabel = styled.label`
    display:block;
    margin-bottom:10px;
    color:${props => props.theme.mode == "dark" ? "white" : ""};
`
const SSNInput = styled.input`
    display:block;
    width:85%;
    margin-bottom:50px;
    height:45px;
    padding:5px;
    background-color:#f8f8f8;
    border:none;
    color:${props => props.theme.mode == "dark" ? "white" : ""};
    border-style: solid;
    border-width: 1px;
    border-color: rgb( 212, 218, 223 );
    border-radius: 5px;
    background-color: ${props => props.theme.mode == "dark" ? "#020f18" : "rgb( 248, 248, 248 )"};      
`

class SSN extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value_input: ""
        }
    }
    next_step() {
        var kycSSN = {};
        if (this.state.value_input !== '') {
            kycSSN["ssn"] = this.state.value_input;
            kycSSN["steps"] = 3;
            this.props.kycFormAction(this.props.isLoggedIn, kycSSN);
            this.props.next_step(5)
        }
    }
    back_step() {
        this.props.back_step(1)
    }
    input_change(e) {
        this.setState({ value_input: e.target.value })
    }
    render() {
        return (
            <div>
                <SSNWrap>
                    <SSN_sub>
                        <SSNLabel>Social Security Number</SSNLabel>
                        <SSNInput onChange={this.input_change.bind(this)} />
                    </SSN_sub>
                </SSNWrap>
                <ButtonWrap>
                    <SubWrap>
                        <BackButton onClick={this.back_step.bind(this)} type="primary">Back</BackButton>
                        <NextButton onClick={this.next_step.bind(this)} type="primary">Next</NextButton>
                    </SubWrap>
                </ButtonWrap>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    /* console.log("personalDetails",state) */
    return {
        ...state,
        isLoggedIn: state.simpleReducer.isLoggedIn !== undefined ? state.simpleReducer.isLoggedIn : ""
    }
}
const mapDispatchToProps = dispatch => ({
    kycFormAction: (is, data) => dispatch(kycFormAction(is, data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SSN);
