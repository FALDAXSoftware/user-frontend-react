import React from "react";
import LoggedNavigation from "../../NAVIGATIONS/loggednavigation";
import CommonFooter from "COMPONENTS/LANDING/FOOTERS/footer_home";
import FaldaxLoader from "SHARED-COMPONENTS/FaldaxLoader";
import { ContactWrap } from "STYLED-COMPONENTS/LANDING_CATEGORIES/contactStyle";
import "antd/dist/antd.css";
import { Icon } from "antd";
import {
  TokenWrap,
  TokenMainRow,
  TokenLeftCol,
  TokenRightCol,
  TokenEllipse,
  TokenLogHead,
  TokenLogSubHead,
  TokenLogForgotBtn,
  TokenLeftHead,
  TokenLeftColWrap,
  TokenForm,
  TokenFormHead,
  TokenFormLabel,
  TokenFormGroup,
  TokenFormInput,
  TokenFormTop,
  TokenFormBottom,
  TokenBlueBtn,
  TokenDivHalf,
  TokenCustomCheckbox,
  TokenDivHalfLeft,
  TokenIconWrap
} from "../../../STYLED-COMPONENTS/TOKEN/tokenStyle";

class LoginToken extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      checked: false
    };
    this.handleCheck = this.handleCheck.bind(this);
  }
  handleCheck(e) {
    this.setState({ checked: !this.state.checked });
  }
  render() {
    return (
      <div>
        <ContactWrap>
          <LoggedNavigation />
          <TokenWrap>
            <TokenMainRow>
              <TokenLeftCol>
                <TokenLeftColWrap>
                  <TokenLeftHead>token</TokenLeftHead>
                  <TokenForm>
                    <TokenFormTop>
                      <TokenFormHead>
                        <TokenIconWrap>
                          <Icon type="arrow-left" />
                        </TokenIconWrap>
                        Sign in
                      </TokenFormHead>
                      <TokenFormGroup>
                        <TokenFormLabel>Username</TokenFormLabel>
                        <TokenFormInput type="text" />
                      </TokenFormGroup>
                      <TokenFormGroup>
                        <TokenFormLabel>Password</TokenFormLabel>
                        <TokenFormInput type="password" />
                      </TokenFormGroup>
                    </TokenFormTop>
                    <TokenFormBottom>
                      <TokenDivHalfLeft>
                        <TokenCustomCheckbox htmlFor="checkbox_id">
                          <input
                            id="checkbox_id"
                            type="checkbox"
                            onChange={this.handleCheck}
                            defaultChecked={this.state.checked}
                          />
                          <span className="checkmark"></span>
                          Stay logged in
                        </TokenCustomCheckbox>
                      </TokenDivHalfLeft>
                      <TokenDivHalf>
                        <TokenBlueBtn>Sign In</TokenBlueBtn>
                      </TokenDivHalf>
                    </TokenFormBottom>
                  </TokenForm>
                </TokenLeftColWrap>
              </TokenLeftCol>
              <TokenRightCol>
                <div>
                  <TokenEllipse />
                  <TokenLogHead>
                    Lorem ipsum dolor sit adipiscing elit!
                  </TokenLogHead>
                  <TokenLogSubHead>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Quis ipsum suspendisse ultrices gravida. Risus
                    commodo viverra maecenas accumsan lacus vel facilisis.
                  </TokenLogSubHead>
                  <TokenLogForgotBtn>I forgot my password</TokenLogForgotBtn>
                </div>
              </TokenRightCol>
            </TokenMainRow>
          </TokenWrap>
          <CommonFooter />
          {this.state.loader === true ? <FaldaxLoader /> : ""}
        </ContactWrap>
      </div>
    );
  }
}

export default LoginToken;
