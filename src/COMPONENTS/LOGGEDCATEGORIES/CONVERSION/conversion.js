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
      loader: false,
      completeKYC: false,
      countryAccess: false,
      comingSoon: false,
      panicEnabled: false
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
  componentDidMount() {
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
    if (JSON.parse(this.props.profileDetails.is_panic_enabled) === true) {
      // alert("Idf");
      this.setState({ panicEnabled: true });
    } else {
      if (
        this.props.profileDetails.is_allowed === true &&
        this.props.profileDetails.is_kyc_done === 2
      ) {
        // alert("IF");
        console.log("I am here", this.props.location.pathname);
        // this.props.history.push('/trade');
        if (this.props.location.pathname !== "/crypto-conversion")
          this.props.history.push("/crypto-conversion");
      } else {
        if (
          this.props.profileDetails.is_allowed === false &&
          this.props.profileDetails.is_kyc_done !== 2
        ) {
          // alert("ELSE IF");
          this.setState({ completeKYC: true });
        } else {
          // alert("ELSE ELSE");
          this.setState({ countryAccess: true });
        }
      }
    }
  }
  simplexAccess() {
    if (JSON.parse(this.props.profileDetails.is_panic_enabled) === true) {
      // alert("Idf");
      this.setState({ panicEnabled: true });
    } else {
      if (
        this.props.profileDetails.is_allowed === true &&
        this.props.profileDetails.is_kyc_done === 2
      ) {
        // alert("IF");
        console.log("I am here", this.props.location.pathname);
        // this.props.history.push('/trade');
        if (this.props.location.pathname !== "/simplex")
          this.props.history.push("/simplex");
      } else {
        if (
          this.props.profileDetails.is_allowed === false &&
          this.props.profileDetails.is_kyc_done !== 2
        ) {
          // alert("ELSE IF");
          this.setState({ completeKYC: true });
        } else {
          // alert("ELSE ELSE");
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
    //     this.props.profileDetails.is_allowed === true &&
    //     this.props.profileDetails.is_kyc_done === 2
    //   ) {
    //     // alert("IF");
    //     console.log("I am here", this.props.location.pathname);
    //     // this.props.history.push('/trade');
    //     if (this.props.location.pathname !== "/token")
    //       this.props.history.push("/token");
    //   } else {
    //     if (
    //       this.props.profileDetails.is_allowed === false &&
    //       this.props.profileDetails.is_kyc_done !== 2
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
    return (
      <div>
        {/* {this.state.showConversion ? (
          <ConversionDetail {...this.props} />
        ) : ( */}
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
                  <ColBtnConStyle onClick={this.cryptoAccess}>
                    Brokerage
                  </ColBtnConStyle>
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
                  {/* <Link style={{ width: "100%" }} to="/simplex"> */}
                  <ColBtnConStyle onClick={this.simplexAccess}>
                    Simplex
                  </ColBtnConStyle>
                  {/* </Link> */}
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
                  <a
                    className="tokenlink"
                    href={`${globalVariables.WordpressSiteURL}/token-coming-soon`}
                  >
                    <ColBtnConStyle>Token</ColBtnConStyle>
                  </a>
                </ColConStyle>
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
    theme:
      state.themeReducer.theme !== undefined ? state.themeReducer.theme : ""
  };
}

export default connect(mapStateToProps)(withRouter(Conversion));
