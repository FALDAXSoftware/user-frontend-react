/* Built-in packages */
import React from "react";
import FaldaxLoader from "SHARED-COMPONENTS/FaldaxLoader";
import LoggedNavigation from "../../NAVIGATIONS/loggednavigation";
import CommonFooter from "COMPONENTS/LANDING/FOOTERS/footer_home";
import ConversionDetail from "./conversion_detail";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import CompleteKYC from "../../../SHARED-COMPONENTS/CompleteKYC";
import PanicEnabled from "../../../SHARED-COMPONENTS/PanicEnabled";
import CountryAccess from "../../../SHARED-COMPONENTS/CountryAccess";
import ComingSoon from "../../../COMPONENTS/comingsoon";
import { globalVariables } from "Globals.js";
import { Icon } from "antd";
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
  ColConTokStyle,
  TokComingSoonWrap,
  ColSubRow,
  ConIconWrap,
  ConArrowWrap,
  TokComingSoon
} from "../../../STYLED-COMPONENTS/CONVERSION/style";
import { APIUtility } from "../../../httpHelper";

const API_URL = globalVariables.API_URL;

class Conversion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      completeKYC: false,
      countryAccess: false,
      comingSoon: false,
      panicEnabled: false,
      panic_status: false,
      is_kyc_done: "",
      is_allowed: ""
      // showConversion: false
    };
    this.comingCancel = this.comingCancel.bind(this);
    this.cryptoAccess = this.cryptoAccess.bind(this);
    this.simplexAccess = this.simplexAccess.bind(this);
    this.tokenAccess = this.tokenAccess.bind(this);
  }
  // onBrokerageButtonClick() {
  //   this.setState({
  //     showConversion: true
  //   });
  // }
  async componentDidMount() {
    if (
      this.props.profileDetails &&
      this.props.profileDetails.is_terms_agreed == false
    ) {
      this.props.history.push("/editProfile");
    }
    try {
      this.setState({ loader: true });
      let result = await APIUtility.getPanicStatus(this.props.isLoggedIn);
      if (result.status == 200) {
        this.setState({ panicStatus: JSON.parse(result.data) });
      }
      let result2 = await APIUtility.getUserTradeStatus(this.props.isLoggedIn);
      if (result2.status == 200) {
        this.setState({
          is_allowed: result2.data.is_allowed,
          is_kyc_done: result2.data.is_kyc_done
        });
      }
      if (result2.status == 500) {
        this.setState({
          is_allowed: result2.data.is_allowed,
          is_kyc_done: result2.data.is_kyc_done
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ loader: false });
    }
    if (this.props.conversion) {
      this.cryptoAccess();
    }
    if (this.props.simplex) {
      this.simplexAccess();
    }
    if (this.props.token) {
      this.tokenAccess();
    }
  }
  comingCancel = e => {
    this.setState({
      comingSoon: false,
      countryAccess: false,
      completeKYC: false,
      panicEnabled: false
    });
  };
  cryptoAccess() {
    if (this.state.panic_status === true) {
      this.setState({ panicEnabled: true });
    } else {
      if (this.state.is_allowed === true && this.state.is_kyc_done === 2) {
        if (this.props.location.pathname !== "/crypto-conversion")
          this.props.history.push("/crypto-conversion");
      } else {
        if (this.state.is_allowed === false && this.state.is_kyc_done !== 2) {
          this.setState({ completeKYC: true });
        } else {
          this.setState({ countryAccess: true });
        }
      }
    }
  }
  simplexAccess() {
    if (this.state.panic_status === true) {
      this.setState({ panicEnabled: true });
    } else {
      if (this.state.is_allowed === true && this.state.is_kyc_done === 2) {
        if (this.props.location.pathname !== "/simplex")
          this.props.history.push("/simplex");
      } else {
        if (this.state.is_allowed === false && this.state.is_kyc_done !== 2) {
          this.setState({ completeKYC: true });
        } else {
          this.setState({ countryAccess: true });
        }
      }
    }
  }
  tokenAccess() {
    this.props.history.push("token");
    // if (JSON.parse(this.props.profileDetails.is_panic_enabled) === true) {
    //   alert("Idf");
    //   this.setState({ panicEnabled: true });
    // } else {
    //   if (
    //     this.state.is_allowed === true &&
    //     this.state.is_kyc_done === 2
    //   ) {
    //     // alert("IF");
    //     console.log("I am here", this.props.location.pathname);
    //     // this.props.history.push('/trade');
    //     if (this.props.location.pathname !== "/token")
    //       this.props.history.push("/token");
    //   } else {
    //     if (
    //       this.state.is_allowed === false &&
    //       this.state.is_kyc_done !== 2
    //     ) {
    //       // alert("ELSE IF");
    //       this.setState({ completeKYC: true });
    //     } else {
    //       // alert("ELSE ELSE");
    //       this.setState({ countryAccess: true });
    //     }
    //   }
    // }
  }
  render() {
    // console.log(this.props.theme);
    return (
      <div>
        {/* {this.state.showConversion ? (
          <ConversionDetail {...this.props} />
        ) : ( */}
        <ContactWrap>
          <LoggedNavigation />
          <GreyWrap>
            <ContainerConversion>
              <HeadStyle>Conversion Methods</HeadStyle>
              <RowConStyle>
                <TokComingSoonWrap
                  href={`${globalVariables.WordpressSiteURL}/coming-soon`}
                >
                  <ColConTokStyle
                  // onClick={this.cryptoAccess}
                  >
                    <ColHeadConStyle>Crypto Only</ColHeadConStyle>
                    <ColSubRow>
                      <ConIconWrap>
                        {this.props.theme === true ? (
                          <img src="/images/bitcoin_icon_dark.png" />
                        ) : (
                          <img src="/images/bitcoin_icon.png" />
                        )}
                      </ConIconWrap>
                      <ConArrowWrap>
                        <Icon type="arrow-right" />
                      </ConArrowWrap>
                      <ConIconWrap>
                        {this.props.theme === true ? (
                          <img src="/images/eth_icon_dark.png" />
                        ) : (
                          <img src="/images/eth_icon.png" />
                        )}
                      </ConIconWrap>
                    </ColSubRow>
                  </ColConTokStyle>
                  <TokComingSoon
                    href={`${globalVariables.WordpressSiteURL}/coming-soon`}
                  >
                    Coming Soon
                  </TokComingSoon>
                </TokComingSoonWrap>
                <ColConStyle onClick={this.simplexAccess}>
                  <ColHeadConStyle>Credit Card</ColHeadConStyle>
                  <ColSubRow>
                    <div>
                      <ConIconWrap className="mastercard">
                        {this.props.theme === true ? (
                          <img src="/images/mastercard_dark.png" />
                        ) : (
                          <img src="/images/mastercard.png" />
                        )}
                      </ConIconWrap>
                      <ConIconWrap>
                        {this.props.theme === true ? (
                          <img src="/images/visa_dark.png" />
                        ) : (
                          <img src="/images/visa.png" />
                        )}
                      </ConIconWrap>
                    </div>
                    <ConArrowWrap>
                      <Icon type="arrow-right" />
                    </ConArrowWrap>
                    <ConIconWrap>
                      {this.props.theme === true ? (
                        <img src="/images/bitcoin_icon_dark.png" />
                      ) : (
                        <img src="/images/bitcoin_icon.png" />
                      )}
                    </ConIconWrap>
                  </ColSubRow>
                </ColConStyle>
                <TokComingSoonWrap>
                  <ColConTokStyle
                    href={`${globalVariables.WordpressSiteURL}/token-coming-soon`}
                  >
                    <ColHeadConStyle>Bank Transfer</ColHeadConStyle>
                    <ColSubRow>
                      <ConIconWrap>
                        {this.props.theme === true ? (
                          <img src="/images/bitcoin_icon_dark.png" />
                        ) : (
                          <img src="/images/bitcoin_icon.png" />
                        )}
                      </ConIconWrap>
                      <ConArrowWrap>
                        <Icon type="swap" />
                      </ConArrowWrap>
                      <ConIconWrap>
                        {this.props.theme === true ? (
                          <img src="/images/bank_dark.png" />
                        ) : (
                          <img src="/images/bank.png" />
                        )}
                      </ConIconWrap>
                      <ConArrowWrap>
                        <Icon type="swap" />
                      </ConArrowWrap>
                      <ConIconWrap>
                        {this.props.theme === true ? (
                          <img src="/images/eth_icon_dark.png" />
                        ) : (
                          <img src="/images/eth_icon.png" />
                        )}
                      </ConIconWrap>
                    </ColSubRow>
                    {/* <ColHeadConStyle>Bank Transfer</ColHeadConStyle>
                  <a
                    className="tokenlink"
                    href={`${globalVariables.WordpressSiteURL}/token-coming-soon`}
                  ></a> */}
                  </ColConTokStyle>
                  <TokComingSoon
                    href={`${globalVariables.WordpressSiteURL}/token-coming-soon`}
                  >
                    Coming Soon
                  </TokComingSoon>
                </TokComingSoonWrap>
              </RowConStyle>
            </ContainerConversion>
          </GreyWrap>
          <CommonFooter />
          <ComingSoon
            comingCancel={e => this.comingCancel(e)}
            visible={this.state.comingSoon}
          />
          <CountryAccess
            comingCancel={e => this.comingCancel(e)}
            visible={this.state.countryAccess}
          />
          <CompleteKYC
            comingCancel={e => this.comingCancel(e)}
            visible={this.state.completeKYC}
          />
          <PanicEnabled
            comingCancel={e => this.comingCancel(e)}
            visible={this.state.panicEnabled}
          />
          {this.state.loader === true ? <FaldaxLoader /> : ""}
        </ContactWrap>
        {/* )} */}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    profileDetails:
      state.simpleReducer.profileDetails !== undefined
        ? state.simpleReducer.profileDetails.data !== undefined
          ? state.simpleReducer.profileDetails.data[0]
          : ""
        : "",
    isLoggedIn: state.simpleReducer.isLoggedIn,
    theme:
      state.themeReducer.theme !== undefined ? state.themeReducer.theme : ""
  };
}

export default connect(mapStateToProps)(withRouter(Conversion));
