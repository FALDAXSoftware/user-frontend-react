/* Built-in Packages */
import React, { Component } from "react";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import { Row, Col, Button, notification } from "antd";
import styled from "styled-components";
import { translate } from "react-i18next";
/* Components */
import { kycFormAction, kycformData } from "ACTIONS/SETTINGS/passwordActions";
import {
  _ACTIVEIDENTITY,
  _IDENTITYLOGO,
  _ACTIVELICENSE,
  _ACTIVEPASSPORT,
  _ACTIVESSN,
  _SSN,
  _LICENSELOGO,
  _PASSPORTLOGO
} from "CONSTANTS/images";

const KYCTypeSelectRow = styled.div`
  width:50%;
  margin 55px auto;
`;
const SelectTitle = styled(Col)`
  margin-top: 20px;
  margin-bottom: 30px;
  text-align: center;
  color: ${props => (props.theme.mode === "dark" ? "white" : "")};
`;
const PassportCol = styled(Col)`
  @media (max-width: 575px) {
    margin-top: 30px;
  }
`;
const LicenceCol = styled(Col)`
  @media (max-width: 575px) {
    margin-top: 30px;
  }
`;
const IdentityCol = styled(Col)`
  @media (max-width: 1200px) {
    margin-top: 30px;
  }
`;
const SSNCol = styled(Col)`
  @media (max-width: 1200px) {
    margin-top: 30px;
  }
`;
export const ButtonWrap = styled.div`
  margin-top: 230px;
  text-align: center;
`;
export const SubWrap = styled.div``;
export const BackButton = styled(Button)`
  font-size: 13.217px;
  font-family: "Open Sans";
  height: 50px;
  font-weight: bold;
  text-transform: uppercase;
  line-height: 2.875;
  width: 120px;
  border-radius: 24px;
  color: #2d69eb;
  background-color: rgb(255, 255, 255);
  box-shadow: 0px 3px 10px 0px rgb(164, 164, 164);
  margin-right: 10px;
`;
export const NextButton = styled(Button)`
  margin-left: 10px;
  font-size: 13.217px;
  font-weight: bold;
  text-transform: uppercase;
  font-family: "Open Sans";
  border-radius: 24px;
  background-color: #4c84ff;
  height: 50px;
  width: 120px;
  &.tier_btn {
    margin: 0;
  }
`;

class IDselect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      background: ""
    };
  }

  /* Life-Cycle Methods */
  componentDidMount() {
    if (this.props.theme !== undefined) {
      if (this.props.theme === false)
        this.setState({ background: "background" });
      else this.setState({ background: "background-night" });
    }
  }

  /* 
        Page: /editProfile --> KYC
        It is called when we click next button for next step and according to selection parent function is called with selected number.
    */

  next_step() {
    var kycSteps = {};
    if (document.getElementById("passport").checked) {
      kycSteps["id_type"] = 1;
      kycSteps["steps"] = 2;
      this.props.kycFormAction(this.props.isLoggedIn, kycSteps);
      this.props.next_step(3, "Passport");
    } else if (document.getElementById("license").checked) {
      kycSteps["id_type"] = 2;
      kycSteps["steps"] = 2;
      this.props.kycFormAction(this.props.isLoggedIn, kycSteps);
      this.props.next_step(3, "Driving license");
    } else if (document.getElementById("identity").checked) {
      kycSteps["id_type"] = 3;
      kycSteps["steps"] = 2;
      this.props.kycFormAction(this.props.isLoggedIn, kycSteps);
      this.props.next_step(3, "Identity");
    } else if (
      document.getElementById("ssn") !== null
        ? document.getElementById("ssn").checked
        : false
    ) {
      kycSteps["id_type"] = 4;
      kycSteps["steps"] = 2;
      this.props.kycFormAction(this.props.isLoggedIn, kycSteps);
      this.props.next_step(2, "ssn");
    } else {
      this.openNotificationWithIcon(
        "error",
        "Error",
        "Please select any one option."
      );
    }
  }

  /* 
        Page: /editProfile --> KYC
        It is called when we click back button for back step.
    */

  back_step() {
    this.props.next_step(0);
  }

  /* 
        Page: /editProfile --> KYC
        It is called for custom Notifications.
    */

  openNotificationWithIcon(type, head, desc) {
    notification[type]({
      message: head,
      description: desc
    });
  }

  render() {
    const { t } = this.props;
    return (
      <div>
        <KYCTypeSelectRow>
          {/* {console.log("KYC CHECK", this.props.countryFlag)} */}
          {this.props.countryFlag === true ? (
            <Row>
              <SelectTitle md={{ span: 24 }}>
                {t("select_id_type_text.message")}
              </SelectTitle>
              <PassportCol
                sm={{ span: 12 }}
                md={{ span: 12 }}
                lg={{ span: 12 }}
                xl={{ span: 6 }}
              >
                <label className="kyc-radio-container">
                  <input id="passport" type="radio" name="kyc_type" />
                  <span className={`${this.state.background}`}>
                    <img
                      alt="ID SELECTION"
                      src={_ACTIVEPASSPORT}
                      className="active"
                    />
                    <img
                      alt="ID SELECTION"
                      src={_PASSPORTLOGO}
                      className="normal"
                    />
                    <span className="text">
                      {t("id_type_passport.message")}
                    </span>
                  </span>
                </label>
              </PassportCol>
              <LicenceCol
                sm={{ span: 12 }}
                md={{ span: 12 }}
                lg={{ span: 12 }}
                xl={{ span: 6 }}
              >
                <label className="kyc-radio-container">
                  <input id="license" type="radio" name="kyc_type" />
                  <span className={`${this.state.background} license`}>
                    <img
                      alt="ID SELECTION"
                      src={_ACTIVELICENSE}
                      className="active"
                    />
                    <img
                      alt="ID SELECTION"
                      src={_LICENSELOGO}
                      className="normal"
                    />
                    <span className="text">
                      {t("id_type_driving_licence.message")}
                    </span>
                  </span>
                </label>
              </LicenceCol>
              <IdentityCol
                sm={{ span: 12 }}
                md={{ span: 12 }}
                lg={{ span: 12 }}
                xl={{ span: 6 }}
              >
                <label className="kyc-radio-container">
                  <input id="identity" type="radio" name="kyc_type" />
                  <span className={`${this.state.background} identity`}>
                    <img
                      alt="ID SELECTION"
                      src={_ACTIVEIDENTITY}
                      className="active"
                    />
                    <img
                      alt="ID SELECTION"
                      src={_IDENTITYLOGO}
                      className="normal"
                    />
                    <span className="text">
                      {t("id_type_identity.message")}
                    </span>
                  </span>
                </label>
              </IdentityCol>
              <SSNCol
                sm={{ span: 12 }}
                md={{ span: 12 }}
                lg={{ span: 12 }}
                xl={{ span: 6 }}
              >
                <label className="kyc-radio-container">
                  <input id="ssn" type="radio" name="kyc_type" />
                  <span className={`${this.state.background} ssn`}>
                    <img
                      alt="ID SELECTION"
                      src={_ACTIVESSN}
                      className="active"
                    />
                    <img alt="ID SELECTION" src={_SSN} className="normal" />
                    <span className="text">{t("id_type_ssn.message")}</span>
                  </span>
                </label>
              </SSNCol>
            </Row>
          ) : (
            <Row>
              <SelectTitle md={{ span: 24 }}>
                {t("select_id_type_text.message")}
              </SelectTitle>
              <PassportCol
                sm={{ span: 12 }}
                md={{ span: 12 }}
                lg={{ span: 12 }}
                xl={{ span: 8 }}
              >
                <label className="kyc-radio-container">
                  <input id="passport" type="radio" name="kyc_type" />
                  <span className={`${this.state.background}`}>
                    <img
                      alt="ID SELeCTION"
                      src={_ACTIVEPASSPORT}
                      className="active"
                    />
                    <img
                      alt="ID SELeCTION"
                      src={_PASSPORTLOGO}
                      className="normal"
                    />
                    <span className="text">
                      {t("id_type_passport.message")}
                    </span>
                  </span>
                </label>
              </PassportCol>
              <LicenceCol
                sm={{ span: 12 }}
                md={{ span: 12 }}
                lg={{ span: 12 }}
                xl={{ span: 8 }}
              >
                <label className="kyc-radio-container">
                  <input id="license" type="radio" name="kyc_type" />
                  <span className={`${this.state.background} license`}>
                    <img
                      alt="ID SELeCTION"
                      src={_ACTIVELICENSE}
                      className="active"
                    />
                    <img
                      alt="ID SELeCTION"
                      src={_LICENSELOGO}
                      className="normal"
                    />
                    <span className="text">
                      {t("id_type_driving_licence.message")}
                    </span>
                  </span>
                </label>
              </LicenceCol>
              <IdentityCol
                sm={{ span: 12 }}
                md={{ span: 12 }}
                lg={{ span: 12 }}
                xl={{ span: 8 }}
              >
                <label className="kyc-radio-container">
                  <input id="identity" type="radio" name="kyc_type" />
                  <span className={`${this.state.background} identity`}>
                    <img
                      alt="ID SELeCTION"
                      src={_ACTIVEIDENTITY}
                      className="active"
                    />
                    <img
                      alt="ID SELeCTION"
                      src={_IDENTITYLOGO}
                      className="normal"
                    />
                    <span className="text">
                      {t("id_type_identity.message")}
                    </span>
                  </span>
                </label>
              </IdentityCol>
            </Row>
          )}
        </KYCTypeSelectRow>
        <ButtonWrap>
          <SubWrap>
            <BackButton onClick={this.back_step.bind(this)} type="primary">
              {t("back_text.message")}
            </BackButton>
            <NextButton onClick={this.next_step.bind(this)} type="primary">
              {t("subhead_btn_next.message")}
            </NextButton>
          </SubWrap>
        </ButtonWrap>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state,
    isLoggedIn:
      state.simpleReducer.isLoggedIn !== undefined
        ? state.simpleReducer.isLoggedIn
        : ""
  };
};
const mapDispatchToProps = dispatch => ({
  kycFormAction: (is, data) => dispatch(kycFormAction(is, data)),
  kycformData: data => dispatch(kycformData(data))
});

export default translate("identity_verification")(
  connect(mapStateToProps, mapDispatchToProps)(IDselect)
);
