/* Built-in Packages */
import React, { Component } from "react";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import styled from "styled-components";
import SimpleReactValidator from "simple-react-validator";

/* components */
import { kycFormAction } from "ACTIONS/SETTINGS/passwordActions";

/* STYLED-COMPONENTS */
import { ButtonWrap, SubWrap, BackButton, NextButton } from "./id_select";

const SSNWrap = styled.div`
  width: 42%;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid #e8ebee;
  margin-top: 88px;
  text-align: left;
  @media (max-width: 1024px) {
    width: 70%;
  }
  @media (max-width: 664px) {
    width: 90%;
  }
`;
const SSNsub = styled.div`
  margin-left: 60px;
  margin-top: 45px;
  margin-bottom: 50px;
`;
const SSNLabel = styled.label`
  display: block;
  margin-bottom: 10px;
  color: ${props => (props.theme.mode === "dark" ? "white" : "")};
`;
const SSNInput = styled.input`
  display: block;
  width: 85%;
  height: 45px;
  padding: 5px;
  background-color: #f8f8f8;
  border: none;
  color: ${props => (props.theme.mode === "dark" ? "white" : "")};
  border-style: solid;
  border-width: 1px;
  border-color: rgb(212, 218, 223);
  border-radius: 5px;
  background-color: ${props =>
    props.theme.mode === "dark" ? "#020f18" : "rgb( 248, 248, 248 )"};
`;

class SSN extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value_input: ""
    };
    this.validator = new SimpleReactValidator({
      ssnValid: {
        message: "Enter a valid SSN number.", // give a message that will display when there is an error. :attribute will be replaced by the name you supply in calling it.
        rule: function(val, options) {
          // return true if it is succeeds and false it if fails validation. the _testRegex method is available to give back a true/false for the regex and given value
          // check that it is a valid IP address and is not blacklisted
          var re = /^\d{3}-\d{2}-\d{4}$/;
          var bool = re.test(String(val));
          return bool;
        }
      }
    });
  }

  /* 
        Page: /editProfile --> KYC
        It is called when next button is clicked and proceed to next step. 
    */

  next_step() {
    var kycSSN = {};
    if (this.validator.allValid()) {
      // var profileData = this.state.fields;
      var profileData = this.state.value_input;
      // profileData["steps"] = 1;
      this.props.kycFormAction(this.props.isLoggedIn, profileData);
      if (this.state.value_input !== "") {
        kycSSN["ssn"] = this.state.value_input;
        kycSSN["steps"] = 3;
        this.props.kycFormAction(this.props.isLoggedIn, kycSSN);
        this.props.next_step(5);
      }
    } else {
      this.validator.showMessages();
      // rerender to show messages for the first time
      this.forceUpdate();
    }
  }

  /* 
        Page: /editProfile --> KYC
        It is called when back button is clicked and proceed to back step. 
    */

  back_step() {
    this.props.back_step(1);
  }

  /* 
        Page: /editProfile --> KYC
        It is called when ssn is change in input field. 
    */

  input_change(e) {
    this.setState({ value_input: e.target.value });
  }
  render() {
    return (
      <div>
        <SSNWrap>
          <SSNsub>
            <SSNLabel>Social Security Number</SSNLabel>
            <SSNInput onChange={this.input_change.bind(this)} />
            {this.validator.message(
              "postal_code",
              this.state.value_input,
              "required|ssnValid",
              "text-danger-validation",
              {
                required: "Please enter Social Security Number."
              }
            )}
          </SSNsub>
        </SSNWrap>
        <ButtonWrap>
          <SubWrap>
            <BackButton onClick={this.back_step.bind(this)} type="primary">
              Back
            </BackButton>
            <NextButton onClick={this.next_step.bind(this)} type="primary">
              Next
            </NextButton>
          </SubWrap>
        </ButtonWrap>
      </div>
    );
  }
}

const mapStateToProps = state => {
  /* console.log("personalDetails",state) */
  return {
    ...state,
    isLoggedIn:
      state.simpleReducer.isLoggedIn !== undefined
        ? state.simpleReducer.isLoggedIn
        : ""
  };
};
const mapDispatchToProps = dispatch => ({
  kycFormAction: (is, data) => dispatch(kycFormAction(is, data))
});

export default connect(mapStateToProps, mapDispatchToProps)(SSN);
