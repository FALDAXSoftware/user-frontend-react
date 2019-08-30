import React from "react";
import LoggedNavigation from "../../NAVIGATIONS/loggednavigation";
import CommonFooter from "COMPONENTS/LANDING/FOOTERS/footer_home";
import FaldaxLoader from "SHARED-COMPONENTS/FaldaxLoader";
import { ContactWrap } from "STYLED-COMPONENTS/LANDING_CATEGORIES/contactStyle";
import {
  TokenWrap,
  TokenMainRow,
  TokenLeftCol,
  TokenRightCol,
  TokenEllipse,
  TokenLogHead,
  TokenLogSubHead,
  TokenLogForgotBtn,
  TokenLeftHeadBlue,
  TokenFormSubHead,
  TokenLeftColWrap,
  TokenForm,
  TokenFormHead,
  TokenFormTop,
  TokenFormBottom,
  TokenBlueBtn,
  TokenDivFull
} from "../../../STYLED-COMPONENTS/TOKEN/tokenStyle";

class SecurityCheck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false
    };
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
                  <TokenLeftHeadBlue>token</TokenLeftHeadBlue>
                  <TokenForm>
                    <TokenFormTop>
                      <TokenFormHead>One-time security check</TokenFormHead>
                      <TokenFormSubHead>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                      </TokenFormSubHead>
                    </TokenFormTop>
                    <TokenFormBottom>
                      <TokenDivFull>
                        <TokenBlueBtn>Next</TokenBlueBtn>
                      </TokenDivFull>
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
                  <TokenLogForgotBtn>I'll verify later</TokenLogForgotBtn>
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

export default SecurityCheck;
