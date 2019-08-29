/* Built-in packages */
import React from "react";

import FaldaxLoader from "SHARED-COMPONENTS/FaldaxLoader";
import LoggedNavigation from "../../NAVIGATIONS/loggednavigation";
import CommonFooter from "COMPONENTS/LANDING/FOOTERS/footer_home";

// Styled components
import {
  ContactWrap,
  GreyWrap
} from "STYLED-COMPONENTS/LANDING_CATEGORIES/contactStyle";
import {
  HeadStyle,
  ContainerConversion,
  SubHeadStyle,
  RowConStyle,
  ColConStyle,
  ColHeadConStyle,
  ColSubHeadConStyle,
  ColBtnConStyle
} from "../../../STYLED-COMPONENTS/CONVERSION/style";

class Conversion extends React.Component {
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
          <GreyWrap>
            <ContainerConversion>
              <HeadStyle>Lorem ipsum dolor sit amet, consectetur</HeadStyle>
              <SubHeadStyle>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
                ipsum suspendisse ultrices gravida. Risus commodo viverra
                maecenas accumsan lacus vel facilisis.
              </SubHeadStyle>
              <RowConStyle>
                <ColConStyle>
                  <ColHeadConStyle>
                    ConStyleCrypto to Crypto conversion
                  </ColHeadConStyle>
                  <ColSubHeadConStyle>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </ColSubHeadConStyle>
                  <ColBtnConStyle>Brokerage</ColBtnConStyle>
                </ColConStyle>
                <ColConStyle>
                  <ColHeadConStyle>
                    Buy crypto courrency from your bank account
                  </ColHeadConStyle>
                  <ColSubHeadConStyle>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </ColSubHeadConStyle>
                  <ColBtnConStyle>Token</ColBtnConStyle>
                </ColConStyle>
                <ColConStyle>
                  <ColHeadConStyle>
                    Buy crypto courrnce using your credit card
                  </ColHeadConStyle>
                  <ColSubHeadConStyle>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua
                  </ColSubHeadConStyle>
                  <ColBtnConStyle>Simplex</ColBtnConStyle>
                </ColConStyle>
              </RowConStyle>
            </ContainerConversion>
          </GreyWrap>
          <CommonFooter />
          {this.state.loader === true ? <FaldaxLoader /> : ""}
        </ContactWrap>
      </div>
    );
  }
}

export default Conversion;
