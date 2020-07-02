/* In-built Packages */
import React, { Component } from "react";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import { createForm, formShape } from "rc-form";
import {
  Row,
  Col,
  Input,
  Button,
  notification,
  Radio,
  Checkbox,
  Select,
} from "antd";
import styled from "styled-components";
import moment from "moment";
import SimpleReactValidator from "simple-react-validator";
import AgreeTerms from "../../../SHARED-COMPONENTS/AgreeTerms";
import { translate } from "react-i18next";
/* Components */
import Datepicker from "./datepicker";
import CountryPick from "./country";
import CountryData from "country-state-city";
import { EmailReq } from "COMPONENTS/LANDING/USERFORMS/login_form";
import { globalVariables } from "Globals.js";
import {
  profileupdateAction,
  removepicAction,
  getProfileDataAction,
  clearEditData,
  profileError,
} from "ACTIONS/SETTINGS/settingActions";
import { LogoutUser } from "ACTIONS/authActions";
import { _DEFAULTPROFILE } from "CONSTANTS/images";
import FaldaxLoader from "SHARED-COMPONENTS/FaldaxLoader";
import { Link } from "react-router-dom";
import { langAction } from "../../../ACTIONS/authActions";
import { IntlTelInputS } from "../../../STYLED-COMPONENTS/LANDING_CATEGORIES/contactStyle";
import { APIUtility } from "../../../httpHelper";

let { API_URL } = globalVariables;
/* const Option = Select.Option; */
const RadioGroup = Radio.Group;
const { Option } = Select;

/* Styled-Components */
const Profilewrap = styled.div`
  width: 71%;
  margin: auto;
`;
export const HeaderCol = styled(Col)`
  font-size: 20px;
  font-family: "Open Sans";
  font-weight: 600;
  color: ${(props) => (props.theme.mode === "dark" ? "white" : "#505050")};
  margin-top: 20px;
  padding-bottom: 12px;
  margin-left: 0px;
  font-family: "Open Sans";
`;
const Mainrow = styled(Row)`
  margin-top: 40px;
  margin-bottom: 40px;
`;
const LeftCol = styled(Col)``;
const ImageDiv = styled.img`
  height: 160px;
  width: 160px;
`;
const Imageinput = styled(Input)`
  display: none !important;
`;
const Imageup = styled.div`
  margin-top: 30px;
`;
const Imageupload = styled.label`
  color: ${(props) => (props.theme.mode === "dark" ? "#828a91" : "#0f477b")};
  cursor: pointer;
  font-family: "Open Sans";
  font-weight: 600;
  &.disabled_mode {
    cursor: not-allowed;
  }
`;
const Remove = styled.div`
  margin-top: 20px;
  color: ${(props) => (props.theme.mode === "dark" ? "#828a91" : "#0f477b")};
  cursor: pointer;
  font-family: "Open Sans";
  font-weight: 600;
  &.disabled_mode {
    cursor: not-allowed;
  }
`;
export const RightCol = styled(Col)`
  @media (max-width: 992px) {
    margin-top: 60px;
  }
`;
export const FirstRow = styled(Row)`
  text-align: left;
  > .ant-col {
    > .text-danger-validation {
      width: 89%;
    }
  }
`;
export const Firstname = styled.div`
  font-size: 14.007px;
  font-family: "Open Sans";
  color: ${(props) =>
    props.theme.mode === "dark"
      ? "rgba( 152, 171, 215, 0.502 )"
      : "rgba( 80, 80, 80, 0.502 )"};
  -moz-transform: matrix(0.99999985149599, 0, 0, 0.99949238260564, 0, 0);
  -webkit-transform: matrix(0.99999985149599, 0, 0, 0.99949238260564, 0, 0);
  -ms-transform: matrix(0.99999985149599, 0, 0, 0.99949238260564, 0, 0);
  margin-bottom: 10px;
`;
export const Firstinput = styled(Input)`
  font-family: "Open Sans";
  font-size: 16;
  font-weight: 600;
  background-color: ${(props) =>
    props.theme.mode === "dark" ? "#020f18" : "#f8f8f8"};
  color: ${(props) => (props.theme.mode === "dark" ? "white" : "")};
  width: 89%;
  border: 1px solid #dadfe3;
  padding: 10px;
  height: auto;
  @media (max-width: 767px) {
    width: 100%;
  }
  &:focus,
  &:hover {
    border-color: rgb(0, 170, 250);
    outline: 0;
    box-shadow: none;
  }
`;
export const FirstMsg = styled(EmailReq)`
  display: block;
`;
export const LastMsg = styled(FirstMsg)``;
export const CountryMsg = styled(FirstMsg)``;
export const DobMsg = styled(FirstMsg)``;
export const StreetMsg = styled(FirstMsg)``;
export const CityMsg = styled(FirstMsg)``;
export const PostalMsg = styled(FirstMsg)``;
export const Lastname = styled(Firstname)`
  @media (max-width: 767px) {
    margin-top: 25px;
  }
`;
export const Lastinput = styled(Firstinput)`
  width: 90%;
  border: 1px solid #dadfe3;
  @media (max-width: 767px) {
    width: 100%;
  }
`;
export const Postalinput = styled(Lastinput)`
  width: 95%;
  @media (max-width: 767px) {
    width: 100%;
  }
`;
export const SecondRow = styled(Row)`
  text-align: left;
  margin-top: 25px;
  @media (max-width: 767px) {
    margin-top: 0px;
  }
`;
export const Country = styled(Firstname)``;
export const Countryinput = styled(Firstinput)`
  @media (max-width: 992px) {
    width: 95%;
  }
  @media (max-width: 767px) {
    width: 100%;
  }
`;
export const Datebirth = styled(Firstname)`
  @media (max-width: 992px) {
    margin-top: 25px;
  }
`;
export const ThirdRow = styled(SecondRow)`
  margin-top: 25px;
  text-align: left;
`;
export const StreetAddress = styled(Firstname)``;
export const Streetinput = styled(Firstinput)`
  width: 95%;
  border: 1px solid #dadfe3;

  @media (max-width: 992px) {
    width: 95%;
  }
  @media (max-width: 767px) {
    width: 100%;
  }
`;
export const FourthRow = styled(SecondRow)`
  text-align: left;
  margin-top: 25px;
  &.language {
    & .ant-select {
      width: 95%;
    }
    & .ant-select-selection {
      background-color: ${(props) =>
        props.theme.mode === "dark" ? "transparent" : "#f8f8f8"};
      color: ${(props) =>
        props.theme.mode === "dark" ? "white" : "rgba(0, 0, 0, 0.65)"};
      width: 100%;
      padding: 5px;
      height: auto;
      font-family: "Open Sans";
      font-weight: 600;
      & .ant-select-arrow-icon {
        color: ${(props) =>
          props.theme.mode === "dark" ? "white" : "rgba(0, 0, 0, 0.25)"};
      }
    }
    & .ant-select-disabled {
      & .ant-select-selection {
        color: ${(props) =>
          props.theme.mode === "dark" ? "#ffffff7a" : "rgba(0, 0, 0, 0.25)"};
        & .ant-select-arrow-icon {
          color: ${(props) =>
            props.theme.mode === "dark" ? "#ffffff7a" : "rgba(0, 0, 0, 0.25)"};
        }
      }
    }
  }
`;
export const City = styled(Firstname)``;
export const Postal = styled(Firstname)`
  @media (max-width: 767px) {
    margin-top: 25px;
  }
`;
const Postalkyc = styled(Postal)`
  @media (max-width: 767px) {
    margin-top: 0px;
  }
`;
const PhoneDiv = styled.div`
  > .intl-tel-input {
    width: 95%;

    @media (max-width: 992px) {
      width: 95%;
    }
    @media (max-width: 767px) {
      width: 100%;
    }
  }
  & .form-control {
    border: 1px solid #e2e6ea;
    background-color: ${(props) =>
      props.theme.mode === "dark" ? "#020e18" : "#f8f8f8"};
    color: ${(props) => (props.theme.mode === "dark" ? "white" : "")};
    border-radius: 5px;
    min-height: 45px;
    width: 100%;
    padding-left: 5px;
  }
  & .selected-dial-code {
    color: ${(props) => (props.theme.mode === "dark" ? "white" : "")};
  }
  &.mobile_field {
    > .intl-tel-input {
      & .selected-flag {
        outline: none;
        font-weight: 600;
        background-color: ${(props) =>
          props.theme.mode === "dark"
            ? "#06223c !important"
            : "#f5f6fa !important"};
      }
      & .intl-tel-input.form-control {
        font-weight: 600;
        box-shadow: none;
      }
      & .intl-tel-input.form-control:focus {
        box-shadow: none;
      }
      & .intl-tel-input.form-control:active,
      .intl-tel-input.form-control:focus,
      .intl-tel-input.form-control:hover {
        border-color: rgb(0, 170, 250);
      }
    }
  }
  &.mobile_field.disabled {
    > .intl-tel-input {
      & .selected-flag {
        cursor: not-allowed;
        background: #bfbfbf24 !important;
        color: ${(props) =>
          props.theme.mode === "dark" ? "#ffffff7a" : "rgba(0, 0, 0, 0.4)"};
      }
      & .selected-dial-code {
        color: ${(props) =>
          props.theme.mode === "dark" ? "#ffffff7a" : "rgba(0, 0, 0, 0.4)"};
      }
      & .intl-tel-input.form-control {
        color: ${(props) =>
          props.theme.mode === "dark" ? "#ffffff7a" : "rgba(0, 0, 0, 0.4)"};
        background-color: ${(props) =>
          props.theme.mode === "dark" ? " #041422" : "#f5f5f5"};
      }
      & .intl-tel-input.form-control:active,
      .intl-tel-input.form-control:focus,
      .intl-tel-input.form-control:hover {
        border: 1px solid #e2e6ea;
      }
    }
  }
`;
export const FifthRow = styled(Row)`
  text-align: left;
  margin-top: 50px;
  > .ant-col {
    .edit_profile_actions {
      > button {
        margin: 0 15px;
      }
    }
  }
`;
export const SixthRow = styled(Row)`
  text-align: left;
  margin-top: 25px;
  & .ant-radio-wrapper {
    color: ${(props) => (props.theme.mode === "dark" ? "white" : "")};
  }
  &.terms_conditions_dark {
    > .ant-col {
      > span {
        color: #fff;
      }
    }
  }
`;
export const FIAT = styled(Firstname)``;
export const FIATMsg = styled(PostalMsg)``;
export const Save = styled(Button)`
  font-size: 13.217px;
  font-family: "Open Sans";
  color: rgb(255, 255, 255);
  font-weight: bold;
  text-transform: uppercase;
  text-align: center;
  -moz-transform: matrix(1.2195120140195, 0, 0, 1.20991183157525, 0, 0);
  -webkit-transform: matrix(1.2195120140195, 0, 0, 1.20991183157525, 0, 0);
  -ms-transform: matrix(1.2195120140195, 0, 0, 1.20991183157525, 0, 0);
  border-radius: 24px;
  background-color: rgb(76, 132, 255);
  box-shadow: 0px 4px 10px 0px rgba(76, 132, 255, 0.33);
  margin-left: 10px;
  width: 15%;
  height: 40px;
  @media (max-width: 1366px) {
    width: calc(25% - 30px);
  }
  @media (max-width: 1200px) {
    width: calc(25% - 30px);
  }
  @media (max-width: 990px) {
    width: calc(20% - 30px);
    font-size: 12.217px;
  }
  @media (max-width: 767px) {
    width: calc(25% - 30px);
    font-size: 12.217px;
  }
  @media (max-width: 599px) {
    width: calc(30% - 30px);
  }
  @media (max-width: 450px) {
    width: calc(50% - 30px);
    font-size: 12.217px;
  }
`;
export const SpinEx = styled.div`
  text-align: center;
  background: white;
  border-radius: 4px;
  margin: auto;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #f5f5f580;
  height: 100%;
  z-index: 9999;
`;
/* const Street2Col = styled(Col)`
    margin-top:15px; 
`
const Asterisk = styled.span`
    color:red;
` */
class PersonalDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Datedata: undefined,
      firstmsg: null,
      lastmsg: null,
      countrymsg: null,
      dobmsg: null,
      street1msg: null,
      street2msg: null,
      citymsg: null,
      postalmsg: null,
      fiatmsg: null,
      dfmsg: null,
      agree_check_msg: null,
      profileImg: undefined,
      imageName: null,
      imageType: null,
      imagemsg: null,
      profileImage: null,
      countrySelected: null,
      stateSelected: null,
      citySelected: null,
      stateID: null,
      countryID: null,
      spin_show: false,
      firstIcon: null,
      lastIcon: null,
      countryIcon: null,
      dobIcon: null,
      street1Icon: null,
      street2Icon: null,
      postalIcon: null,
      fiatIcon: null,
      dateFIcon: null,
      remove_pic: false,
      fiat: "",
      date_format: "MM/DD/YYYY",
      showFileInput: true,
      agreeCheck: false,
      agreeTermsShow: false,
      editMode: false,
      isFirstLogin: "",
      language: "en",
      displayCountry: false,
      phoneCountry: [],
      mobile: "",
      phoneCode: "",
      fields: {
        phone_number: "",
        country_code: "",
      },
      countryJsonId: "",
      profileDetails: [],
      countryList: "",
      stateList: "",
      cityList: "",
    };
    this.datePickerChild = React.createRef();
    this.getallCountriesData = this.getallCountriesData.bind(this);
    this.getStatesOfACountry = this.getStatesOfACountry.bind(this);
    this.getCitiesOfAState = this.getCitiesOfAState.bind(this);
    this.handleProfile = this.handleProfile.bind(this);
    this.handleLangChange = this.handleLangChange.bind(this);
    this.t = this.props.t;
    this.changeNumber = this.changeNumber.bind(this);
    this.clearValidation = this.clearValidation.bind(this);
    this.validator = new SimpleReactValidator({
      mobileVal: {
        // name the rule
        message: this.t("validations:mobile_no_error.message"), // give a message that will display when there is an error. :attribute will be replaced by the name you supply in calling it.
        rule: function (val, options) {
          // return true if it is succeeds and false it if fails validation. the _testRegex method is available to give back a true/false for the regex and given value
          // check that it is a valid IP address and is not blacklisted
          var re = /^(\(?\+?[0-9]*\)?)?[0-9_\-\(\)]*$/;
          var bool = re.test(String(val).toLowerCase());
          return bool;
        },
      },
    });
  }
  static propTypes = {
    form: formShape,
  };

  /* Life-Cycle Methods */

  componentDidMount() {
    this.getallCountriesData();
    this.getStatesOfACountry(this.props.profileDetails.countryJsonId);
    this.getCitiesOfAState(this.props.profileDetails.stateJsonId);
    this.props.getProfileDataAction(this.props.isLoggedIn);
    if (this.props.profileDetails.default_language) {
      this.setState({
        language: this.props.profileDetails.default_language,
      });
    } else {
      this.setState({
        language: "en",
      });
    }
    var countrySelected = CountryData.getCountryById(
      this.props.profileDetails.countryJsonId - 1
    );
    let country_code = "";
    let arr = [];
    let phoneCode = "";
    if (countrySelected) {
      country_code = countrySelected.sortname;
      phoneCode = countrySelected.phonecode;
      arr.push(country_code);
    }
    if (this.props.profileDetails.country) {
      this.setState({
        displayCountry: true,
        phoneCountry: arr,
        phoneCode,
        fields: {
          country_code: country_code,
        },
      });
    } else {
      this.setState({
        displayCountry: false,
      });
    }
    if (
      this.props.profileDetails.phone_number &&
      this.props.profileDetails.country
    ) {
      let phone = this.props.profileDetails.phone_number;
      this.setState({
        displayCountry: true,
        fields: {
          phone_number: phone,
        },
        mobile: phone,
      });
    }
    if (this.props.profileDetails.country) {
      this.setState({
        countrySelected: this.props.profileDetails.country,
      });
    }
    if (this.props.profileDetails.state) {
      this.setState({
        stateSelected: this.props.profileDetails.state,
      });
    }
    if (this.props.profileDetails.city_town) {
      this.setState({
        citySelected: this.props.profileDetails.city_town,
      });
    }
    if (this.props.profileDetails.countryJsonId) {
      this.setState({
        countryJsonId: this.props.profileDetails.countryJsonId,
      });
    }
  }
  getallCountriesData() {
    fetch(API_URL + "/get-countries", {
      method: "get",
      headers: {
        Accept: "application/json",
        "Accept-Language": localStorage["i18nextLng"],
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.isLoggedIn,
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          countryList: responseData.data,
        });
      })
      .catch((error) => {});
  }
  getCitiesOfAState(id) {
    fetch(API_URL + `/get-city?state_id=${id}`, {
      method: "get",
      headers: {
        Accept: "application/json",
        "Accept-Language": localStorage["i18nextLng"],
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.isLoggedIn,
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          cityList: responseData.data,
        });
      })
      .catch((error) => {});
  }
  componentWillReceiveProps(props) {
    if (
      props.profileDetails.countryJsonId &&
      props.profileDetails.countryJsonId !==
        this.props.profileDetails.countryJsonId
    ) {
      var countrySelected = CountryData.getCountryById(
        props.profileDetails.countryJsonId - 1
      );
      let country_code = "";
      let phoneCode = "";
      let arr = [];
      if (countrySelected) {
        country_code = countrySelected.sortname;
        phoneCode = countrySelected.phonecode;
        arr.push(country_code);
      }
      if (props.profileDetails.country) {
        this.setState({
          displayCountry: true,
          phoneCountry: arr,
          phoneCode,
          countryJsonId: props.profileDetails.countryJsonId,
          fields: {
            country_code: country_code,
          },
        });
      }
    }
    if (
      props.profileDetails.phone_number &&
      this.props.profileDetails.phone_number !==
        props.profileDetails.phone_number
    ) {
      // console.log(
      //   "^^^ recieve props phone number",
      //   props.profileDetails.phone_number
      // );
      var countrySelected = CountryData.getCountryById(
        props.profileDetails.countryJsonId - 1
      );
      let phoneCode = "";
      if (countrySelected) {
        phoneCode = countrySelected.phonecode;
      }
      // if (this.state.phoneCode) {
      let temp = props.profileDetails.phone_number;
      var mob = temp.split(`+${phoneCode}`);
      // }
      // let temp = props.profileDetails.phone_number;
      // var mob = temp.split(`${this.state.phoneCode}`);
      // console.log(
      //   "this is phoneCode^^^^",
      //   this.state.phoneCode,
      //   props.profileDetails.phone_number,
      //   phoneCode,
      //   mob
      // );
      let phone = props.profileDetails.phone_number;
      this.setState({
        mobile: mob[1],
        displayCountry: true,
        fields: {
          phone_number: phone,
        },
      });
    }
    if (
      props.profileDetails.country &&
      this.props.profileDetails.country !== props.profileDetails.country
    ) {
      this.setState({
        countrySelected: props.profileDetails.country,
      });
    }
    if (
      props.profileDetails.state &&
      this.props.profileDetails.state !== props.profileDetails.state
    ) {
      this.setState({
        stateSelected: props.profileDetails.state,
      });
    }
    if (
      props.profileDetails.city_town &&
      this.props.profileDetails.city_town !== props.profileDetails.city_town
    ) {
      this.setState({
        citySelected: props.profileDetails.city_town,
      });
    }
    if (
      props.profileDetails.profile_pic !== null &&
      props.profileDetails.profile_pic !== undefined &&
      props.profileDetails.profile_pic !== ""
    ) {
      if (
        this.state.profileImg !== undefined &&
        this.state.profileImg !== null &&
        this.state.profileImg !== ""
      ) {
        this.setState({ profileImg: this.state.profileImg });
        /*  this.setState({ profileImg: globalVariables._AMAZONBUCKET + props.profileDetails.profile_pic }) */
      } else {
        this.setState({
          profileImg:
            globalVariables._AMAZONBUCKET + props.profileDetails.profile_pic,
        });
      }
    }
    if (props.apiStatus === 200) {
      this.openNotificationWithProfile(
        "success",
        this.t("validations:success_text.message"),
        props.apiMessage
      );
      this.props.clearEditData();
    }
    if (props.profileError !== undefined) {
      // console.log("Called Twice", props.profileError);
      this.openNotificationWithProfile(
        "error",
        this.t("validations:error_text.message"),
        props.profileError.err
      );
      this.props.profileErr();
      let form = {
        user_id: this.props.profileDetails.id,
        jwt_token: this.props.isLoggedIn,
      };
      this.props.LogoutUser(this.props.isLoggedIn, form);
    }
    if (this.props.profileDetails != this.state.profileDetails) {
      this.setState({ profileDetails: this.props.profileDetails });
    }
    if (
      props.profileDetails.default_language &&
      this.props.profileDetails.default_language !=
        props.profileDetails.default_language
    ) {
      this.setState({
        language: props.profileDetails.default_language,
      });
    }
  }

  /* 
        Page: /editProfile --> Personal Details
        It is called when we change date format in Personal Details form.
    */

  onChangeFormat = (e) => {
    this.setState({
      date_format: e.target.value,
    });
    this.onChangeField(e.target.value, "date_format");
  };

  /* 
        Page: /editProfile --> Personal Details
        It is called when we change currency/FIAT in Personal Details form.
    */

  onChangeFiat = (e) => {
    this.setState({
      fiat: e.target.value,
    });
    this.onChangeField(e.target.value, "fiat");
  };

  onCheckboxChange = (e) => {
    let { t } = this.props;
    this.setState(
      {
        agreeCheck: e.target.checked,
      },
      () => {
        if (this.state.agreeCheck !== true) {
          document.querySelectorAll(".agree_check_msg")[0].style.display =
            "block";
          this.setState({
            agree_check_msg: t("validations:policies_error.message") + ".",
          });
        } else {
          document.querySelectorAll(".agree_check_msg")[0].style.display =
            "none";
          this.setState({
            agree_check_msg: null,
          });
        }
      }
    );
  };

  /* 
        Page: /editProfile --> Personal Details
        It is passed as props(callback function) to Datepicker component.
    */

  onDateChange(value, field) {
    // console.log("date---", value);

    var tempDate = value.day + "/" + value.month + "/" + value.year;
    if (value.month) {
      if (value.month.length > 2) {
        // console.log("string");
        var date = moment(tempDate, "DD/MMM/YYYY").format("DD-MM-YYYY");
      } else {
        // console.log("numeric");
        var date = moment(tempDate, "DD/MM/YYYY").format("DD-MM-YYYY");
      }
    }

    // var date = moment(tempDate, "DD/MM/YYYY").format("DD-MM-YYYY");
    // console.log("date--- after convert", date);
    this.setState({ Datedata: date });
    // console.log("onDateChange>>>", value, field);
    this.onChangeField(value, field);
  }

  /* 
        Page: /editProfile --> Personal Details
        It is passed as props(callback function) to Country component.
    */

  // onCountryChange(country, state, city) {
  //   this.setState({
  //     countrySelected: country,
  //     stateSelected: state,
  //     citySelected: city
  //   });
  //   var loc = {
  //     country: country,
  //     state: state,
  //     city: city
  //   };
  //   this.onChangeField(loc, "country");
  // }
  onCountryChange(
    country,
    state,
    city,
    country_code,
    phoneCode,
    phone_number,
    countryJson
  ) {
    // console.log("^^^kyc", country, state, city, country_code);
    let fields = this.state.fields;
    if (this.state.countrySelected === country) {
      if (this.state.fields.phone_number === phone_number) {
        fields["phone_number"] = phone_number;
        let mobile = phone_number;
        this.setState({
          phoneCountry: [country_code],
          mobile,
        });
      } else {
        fields["phone_number"] = this.state.fields.phone_number;
        let mobile = this.state.mobile;
        this.setState({
          phoneCountry: [country_code],
          mobile,
        });
      }
    } else {
      let mobile = this.state.mobile;
      if (
        this.state.phoneCountry &&
        this.state.phoneCountry[0] != country_code
      ) {
        mobile = `+${phoneCode}`;
      }
      this.setState({
        phoneCountry: [country_code],
        mobile,
        countryJsonId: countryJson,
      });
    }
    let self = this;
    fields["country_code"] = country_code;
    this.setState(
      {
        countrySelected: country,
        stateSelected: state,
        citySelected: city,
        fields,
      },
      () => {
        // To rerender the mobile input field
        self.setState(
          {
            displayCountry: false,
          },
          () => {
            self.setState({
              displayCountry: true,
            });
          }
        );
      }
    );
    var loc = {
      country: country,
      state: state,
      city: city,
    };
    this.onChangeField(loc, "country");
  }

  /* 
            Page: /editProfile --> Personal Details
            It is called when a file is selected on profile pic in personal details form.
    */
  comingCancel = (e) => {
    this.setState({
      agreeTermsShow: false,
    });
  };
  handleProfile(e) {
    try {
      const reader = new FileReader();
      const file = e.target.files[0];
      const fileType =
        e.target.files[0] && e.target.files[0].type
          ? e.target.files[0].type.substring(
              0,
              e.target.files[0].type.indexOf("/")
            )
          : "";
      const fileSize =
        e.target.files[0] && e.target.files[0].size
          ? e.target.files[0].size
          : 0;
      //check file size to max 5mb (5*1024*1024=5242880) and type image
      if (fileType === "image") {
        if (fileSize <= 5242880) {
          reader.onload = (upload) => {
            this.setState({
              profileImg: upload.target.result,
              imageName: file.name,
              imageType: file.type,
              profileImage: file,
              imagemsg: "",
              remove_pic: false,
            });
          };
        } else {
          this.openNotificationWithProfile(
            "error",
            this.t("validations:error_text.message"),
            this.t("validations:profile_img_error1.message")
          );
          // this.setState({
          //   showFileInput: false
          // });
          this.removePic();
        }
      } else {
        if (file !== undefined)
          this.openNotificationWithProfile(
            "error",
            this.t("validations:error_text.message"),
            this.t("general_1:only_images_error.message")
          );
      }

      reader.readAsDataURL(file);
    } catch (error) {
      this.setState({ imagemsg: "Something went wrong please try again" });
    }
  }

  /* 
        Page: /editProfile --> Personal Details
        It is called when we click remove pic below profile pic.
    */
  removePic() {
    if (this.state.profileImg !== _DEFAULTPROFILE) {
      this.setState(
        {
          remove_pic: true,
          profileImg: _DEFAULTPROFILE,
          profileImage: undefined,
          showFileInput: false,
        },
        () => {
          this.setState({
            showFileInput: true,
          });
        }
      );
    }
  }

  /* 
        Page: /editProfile --> Personal Details
        It is for custom notifications.
    */

  openNotificationWithIcon = (type) => {
    notification[type]({
      message: "Updating Profile",
      description: "Please wait...",
      duration: 3,
    });
  };

  /* 
        Page: /editProfile --> Personal Details
        It is for notifications with profile icon.
    */
  openNotificationWithProfile = (type, head, desc) => {
    notification[type]({
      message: head,
      description: desc,
      duration: 3,
    });
  };

  /* 
        Page: /editProfile --> Personal Details
        It is for notifications for removing profile picture.
    */
  removeNotification = (type) => {
    notification[type]({
      message: "Removing profile picture",
      description: "Please wait...",
      duration: 3,
    });
  };

  /* 
            Page: /editProfile --> Personal Details
            It is called when we change input fields in form.
    */
  onChangeField(value, field) {
    let { t } = this.props;
    if (
      field !== "dob" &&
      field !== "country" &&
      field !== "postal_code" &&
      field !== "first_name" &&
      field !== "last_name" &&
      field !== "street_address" &&
      field !== "street_address_2"
    )
      value = value.trim();
    if (field === "first_name") {
      // value = value.trim();
      var re = /^[a-zA-Z0-9?']{2,5000}$/;
      var bool = re.test(value);
      if (value !== "") {
        if (bool === true) {
          var regexnum = /^[0-9]*$/;
          if (regexnum.test(value)) {
            this.setState({ firstIcon: false });
            document.querySelectorAll(".first_msg")[0].style.display = "block";
            this.setState({
              firstmsg: t("validations:only_number_not_allowed.message"),
            });
          } else {
            this.setState({ firstIcon: true });
            document.querySelectorAll(".first_msg")[0].style.display = "none";
          }
        } else {
          this.setState({ firstIcon: false });
          document.querySelectorAll(".first_msg")[0].style.display = "block";
          this.setState({
            firstmsg: this.t("sign_up:first_name_error.message"),
          });
        }
      } else {
        this.setState({ firstIcon: false });
        document.querySelectorAll(".first_msg")[0].style.display = "block";
        this.setState({
          firstmsg:
            t("subhead_personal_form_first_name.message") +
            " " +
            t("validations:field_is_required.message"),
        });
      }
    } else if (field === "last_name") {
      var re = /^[a-zA-Z0-9?']{2,5000}$/;
      var bool = re.test(value);
      if (value !== "") {
        if (bool === true) {
          var regexnum = /^[0-9]*$/;
          if (regexnum.test(value)) {
            this.setState({ lastIcon: false });
            document.querySelectorAll(".last_msg")[0].style.display = "block";
            this.setState({
              lastmsg: t("validations:only_number_not_allowed.message"),
            });
          } else {
            this.setState({ lastIcon: true });
            document.querySelectorAll(".last_msg")[0].style.display = "none";
          }
        } else {
          this.setState({ lastIcon: false });
          document.querySelectorAll(".last_msg")[0].style.display = "block";
          this.setState({
            lastmsg: this.t("sign_up:last_name_error.message"),
          });
        }
      } else {
        this.setState({ lastIcon: false });
        document.querySelectorAll(".last_msg")[0].style.display = "block";
        this.setState({
          lastmsg:
            t("subhead_personal_form_last_name.message") +
            " " +
            t("validations:field_is_required.message"),
        });
      }
    } else if (field === "country") {
      if (value.country && value.state && value.city) {
        this.setState({ countryIcon: true });
        document.querySelectorAll(".country_msg")[0].style.display = "none";
      } else {
        let country = false,
          state = false,
          city = false;
        this.setState({ countryIcon: false });
        document.querySelectorAll(".country_msg")[0].style.display = "block";
        if (
          value.country === undefined ||
          value.country === null ||
          value.country === ""
        )
          country = true;
        if (
          value.state === undefined ||
          value.state === null ||
          value.state === ""
        )
          state = true;
        if (
          value.city === undefined ||
          value.city === null ||
          value.city === ""
        )
          city = true;
        let countrymsg;
        if (country === true && state === false && city === false) {
          countrymsg =
            t("subhead_personal_form_country.message") +
            " " +
            t("validations:field_is_required.message");
        } else if (country === true && state === true && city === false) {
          countrymsg =
            t("subhead_personal_form_country.message") +
            " " +
            t("and_text.message") +
            " " +
            t("subhead_personal_form_state.message") +
            " " +
            t("validations:field_is_required.message");
        } else if (country === true && state === true && city === true) {
          countrymsg =
            t("subhead_personal_form_country.message") +
            " , " +
            t("subhead_personal_form_state.message") +
            " " +
            t("and_text.message") +
            " " +
            t("subhead_personal_form_city.message") +
            " " +
            t("validations:field_is_required.message");
        } else if (country === false && state === true && city === false) {
          countrymsg =
            t("subhead_personal_form_state.message") +
            " " +
            t("validations:field_is_required.message");
        } else if (country === false && state === true && city === true) {
          countrymsg =
            t("subhead_personal_form_state.message") +
            " " +
            t("and_text.message") +
            " " +
            t("subhead_personal_form_city.message") +
            " " +
            t("validations:field_is_required.message");
        } else if (country === false && state === false && city === true) {
          countrymsg =
            t("subhead_personal_form_city.message") +
            " " +
            t("validations:field_is_required.message");
        } else if (country === true && state === false && city === true) {
          countrymsg =
            t("subhead_personal_form_country.message") +
            " " +
            t("and_text.message") +
            " " +
            t("subhead_personal_form_city.message") +
            " " +
            t("validations:field_is_required.message");
        }
        this.setState({ countrymsg });
      }
    } else if (field === "dob") {
      // console.log("^^^^^^", value);
      if (value["day"] && value["month"] && value["year"]) {
        this.setState({ dobIcon: true });
        document.querySelectorAll(".dob_msg")[0].style.display = "none";
      } else if (
        (value["day"] === "" ||
          value["day"] === undefined ||
          value["day"] === null) &&
        (value["month"] === "" ||
          value["month"] === undefined ||
          value["month"] === null) &&
        (value["year"] === "" ||
          value["year"] === undefined ||
          value["year"] === null)
      ) {
        this.setState({ dobIcon: false });
        document.querySelectorAll(".dob_msg")[0].style.display = "block";
        this.setState({
          dobmsg:
            t("subhead_personal_form_dob.message") +
            " " +
            t("validations:field_is_required.message"),
        });
      } else if (value["day"] === "" || value["day"] === "") {
        this.setState({ dobIcon: false });
        document.querySelectorAll(".dob_msg")[0].style.display = "block";
        this.setState({
          dobmsg:
            t("subhead_personal_form_dob.message") +
            " " +
            t("validations:field_is_required.message"),
        });
      } else if (value["month"] === "" || value["month"] === "") {
        this.setState({ dobIcon: false });
        document.querySelectorAll(".dob_msg")[0].style.display = "block";
        this.setState({
          dobmsg:
            t("general:month_text.message") +
            " " +
            t("validations:field_is_required.message"),
        });
      } else if (value["year"] === "" || value["year"] === "") {
        this.setState({ dobIcon: false });
        document.querySelectorAll(".dob_msg")[0].style.display = "block";
        this.setState({
          dobmsg:
            t("general:year_text.message") +
            " " +
            t("validations:field_is_required.message"),
        });
      }
      // else {
      //   this.setState({ dobIcon: false });
      //   document.querySelectorAll(".dob_msg")[0].style.display = "block";
      //   this.setState({ dobmsg: "Date of Birth field is required" });
      // }
    } else if (field === "street_address") {
      var re = value;
      // var value = value.trim("");
      if (value.trim("") !== "") {
        if (value.length <= 100) {
          this.setState({ street1Icon: true });
          document.querySelectorAll(".street1_msg")[0].style.display = "none";
          if (re === value.trim("")) {
            this.setState({ street1Icon: true });
            document.querySelectorAll(".street1_msg")[0].style.display = "none";
          } else {
            this.setState({ street1Icon: false });
            document.querySelectorAll(".street1_msg")[0].style.display =
              "block";
            this.setState({
              street1msg: t("validations:no_suffix_prefix_error.message"),
            });
          }
        } else {
          this.setState({ street1Icon: false });
          document.querySelectorAll(".street1_msg")[0].style.display = "block";
          this.setState({
            street1msg: t("validations:street_address_error.message"),
          });
        }
      } else {
        this.setState({ street1Icon: false });
        document.querySelectorAll(".street1_msg")[0].style.display = "block";
        this.setState({
          street1msg:
            t("subhead_personal_form_street_address_line1.message") +
            " " +
            t("validations:field_is_required.message"),
        });
      }
    } else if (field === "street_address_2") {
      var ex = value;
      if (value.trim("") !== "") {
        if (value.length <= 100) {
          this.setState({ street2Icon: true });
          document.querySelectorAll(".street2_msg")[0].style.display = "none";
          if (ex === value.trim("")) {
            this.setState({ street1Icon: true });
            document.querySelectorAll(".street2_msg")[0].style.display = "none";
          } else {
            this.setState({ street1Icon: false });
            document.querySelectorAll(".street2_msg")[0].style.display =
              "block";
            this.setState({
              street2msg: t("validations:no_suffix_prefix_error.message"),
            });
          }
        } else {
          this.setState({ street2Icon: false });
          document.querySelectorAll(".street2_msg")[0].style.display = "block";
          this.setState({
            street2msg: t("validations:street_address2_error.message"),
          });
        }
      }
    } else if (field === "postal_code") {
      if (value !== "") {
        var reg = /^[a-zA-Z0-9-_]*$/;
        var bool = reg.test(value);
        if (bool === true) {
          if (value.length < 3 || value.length > 25) {
            this.setState({ postalIcon: false });
            document.querySelectorAll(".postal_msg")[0].style.display = "block";
            this.setState({
              postalmsg: t("validations:min_max_postal_code.message"),
            });
          } else {
            this.setState({ postalIcon: true });
            document.querySelectorAll(".postal_msg")[0].style.display = "none";
          }
        } else {
          this.setState({ postalIcon: false });
          document.querySelectorAll(".postal_msg")[0].style.display = "block";
          if (value.length < 3 || value.length > 25) {
            this.setState({
              postalmsg: t("validations:min_max_postal_code.message"),
            });
          } else {
            this.setState({
              postalmsg: t("validations:postal_code_letters_numbers.message"),
            });
          }
        }
      } else {
        this.setState({ postalIcon: false });
        document.querySelectorAll(".postal_msg")[0].style.display = "block";
        this.setState({
          postalmsg:
            t("subhead_personal_form_postal_code.message") +
            " " +
            t("validations:field_is_required.message"),
        });
      }
    } else if (field === "date_format") {
      if (value !== "") {
        this.setState({ dateFIcon: true });
        document.querySelectorAll(".df_msg")[0].style.display = "none";
      } else {
        this.setState({ dateFIcon: false });
        document.querySelectorAll(".df_msg")[0].style.display = "block";
        this.setState({
          dfmsg:
            t("general_1:currency_text.message") +
            " " +
            t("validations:field_is_required.message"),
        });
      }
    }
  }

  /* 
            Page: /editProfile --> Personal Details
            It is called when we submit Personal Details form.
    */
  dontAgreeTerms() {
    this.setState(
      {
        agreeTermsShow: false,
      },
      () => {
        this.openNotificationWithProfile(
          "error",
          this.t("validations:error_text.message"),
          this.t("validations:policies_error.message")
        );
      }
    );
  }
  agreeTerms() {
    this.setState(
      {
        agreeTermsShow: false,
        editMode: false,
      },
      () => {
        this.submit();
      }
    );
  }
  openAgreePopup = () => {
    let { t } = this.props;
    this.props.form.validateFields((error, value) => {
      let dataDate = "";
      const profileData = new FormData();
      if (
        error === null &&
        this.state.fiatIcon !== false &&
        this.state.dateFIcon !== false &&
        this.state.firstIcon !== false &&
        this.state.lastIcon !== false &&
        this.state.countryIcon !== false &&
        this.state.dobIcon !== false &&
        this.state.street1Icon !== false &&
        this.state.street2Icon !== false &&
        this.state.postalIcon !== false &&
        ((this.props.profileDetails.country !== undefined &&
          this.props.profileDetails.country !== "" &&
          this.props.profileDetails.country !== null) ||
          (this.state.countrySelected !== null &&
            this.state.countrySelected !== undefined &&
            this.state.countrySelected !== "")) &&
        this.validator.allValid()
      ) {
        this.setState({
          agreeTermsShow: true,
        });
      } else {
        this.validator.showMessages();
        // rerender to show messages for the first time
        this.forceUpdate();
        this.openNotificationWithProfile(
          "error",
          t("validations:error_text.message"),
          t("validations:error_on_submit_profile.message")
        );
      }
      if (
        this.state.firstIcon === null &&
        this.props.profileDetails.first_name === null
      ) {
        this.setState({ firstIcon: false });
        document.querySelectorAll(".first_msg")[0].style.display = "block";
        this.setState({
          firstmsg:
            t("subhead_personal_form_first_name.message") +
            " " +
            t("validations:field_is_required.message"),
        });
      }
      if (
        this.state.firstIcon === null &&
        this.props.profileDetails.first_name === null
      ) {
        this.setState({ lastIcon: false });
        document.querySelectorAll(".last_msg")[0].style.display = "block";
        this.setState({
          lastmsg:
            t("subhead_personal_form_last_name.message") +
            " " +
            t("validations:field_is_required.message"),
        });
      }
      if (
        (this.state.countryIcon === null || this.state.countryIcon === false) &&
        (this.props.profileDetails.country === "" ||
          this.props.profileDetails.country === null)
      ) {
        this.setState({ countryIcon: false });
        document.querySelectorAll(".country_msg")[0].style.display = "block";
        let countrymsg;
        if (
          this.state.countrySelected &&
          (this.state.stateSelected == "" ||
            this.state.stateSelected == null) &&
          (this.state.citySelected == "" || this.state.citySelected == null)
        ) {
          countrymsg =
            t("subhead_personal_form_state.message") +
            " " +
            t("and_text.message") +
            " " +
            t("subhead_personal_form_city.message") +
            " " +
            t("validations:field_is_required.message");
        } else if (
          this.state.countrySelected &&
          this.state.stateSelected &&
          (this.state.citySelected == "" || this.state.citySelected == null)
        ) {
          countrymsg =
            t("subhead_personal_form_city.message") +
            " " +
            t("validations:field_is_required.message");
        } else {
          countrymsg =
            t("subhead_personal_form_country.message") +
            " " +
            t("validations:field_is_required.message");
        }
        this.setState({ countrymsg });
      }
      if (
        (this.state.dobIcon === null || this.state.dobIcon === false) &&
        this.state.Datedata === undefined &&
        this.props.profileDetails.dob === null
      ) {
        this.setState({ dobIcon: false });
        document.querySelectorAll(".dob_msg")[0].style.display = "block";
        this.setState({
          dobmsg:
            t("subhead_personal_form_dob.message") +
            " " +
            t("validations:field_is_required.message"),
        });
      }
      if (
        (this.state.street1Icon === null || this.state.street1Icon === false) &&
        this.props.profileDetails.street_address === null
      ) {
        this.setState({ street1Icon: false });
        document.querySelectorAll(".street1_msg")[0].style.display = "block";
        this.setState({
          street1msg:
            t("subhead_personal_form_street_address_line1.message") +
            " " +
            t("validations:field_is_required.message"),
        });
      }
      if (
        (this.state.postalIcon === null || this.state.postalIcon === false) &&
        this.props.profileDetails.postal_code === null
      ) {
        this.setState({ postalIcon: false });
        document.querySelectorAll(".postal_msg")[0].style.display = "block";
        this.setState({
          postalmsg:
            t("subhead_personal_form_postal_code.message") +
            " " +
            t("validations:field_is_required.message"),
        });
      }
      if (
        this.state.fiatIcon === false &&
        this.props.profileDetails.fiat === ""
      ) {
        this.setState({ fiatIcon: false });
        document.querySelectorAll(".fiat_msg")[0].style.display = "block";
        this.setState({
          fiatmsg:
            t("general_1:currency_text.message") +
            " " +
            t("validations:field_is_required.message"),
        });
      }
      if (
        (this.state.dateFIcon !== true || this.state.dateFIcon === null) &&
        this.state.date_format === ""
      ) {
        this.setState({ dateFIcon: false });
        document.querySelectorAll(".df_msg")[0].style.display = "block";
        this.setState({
          dfmsg:
            t("general_1:dateformat_text.message") +
            " " +
            t("validations:field_is_required.message"),
        });
      }
    });
  };
  submit = () => {
    let { t } = this.props;
    this.props.form.validateFields((error, value) => {
      let dataDate = "";
      const profileData = new FormData();
      // console.log("---------->", this.state.dfmsg);
      if (
        error === null &&
        this.state.fiatIcon !== false &&
        this.state.dateFIcon !== false &&
        this.state.firstIcon !== false &&
        this.state.lastIcon !== false &&
        this.state.countryIcon !== false &&
        this.state.dobIcon !== false &&
        this.state.street1Icon !== false &&
        this.state.street2Icon !== false &&
        this.state.postalIcon !== false &&
        this.state.date_format !== "" &&
        // this.state.agreeCheck !== false &&
        ((this.props.profileDetails.country !== undefined &&
          this.props.profileDetails.country !== "" &&
          this.props.profileDetails.country !== null) ||
          (this.state.countrySelected !== null &&
            this.state.countrySelected !== undefined &&
            this.state.countrySelected !== "")) &&
        this.validator.allValid()
      ) {
        document.querySelectorAll(".first_msg")[0].style.display = "none";
        document.querySelectorAll(".last_msg")[0].style.display = "none";
        document.querySelectorAll(".country_msg")[0].style.display = "none";
        document.querySelectorAll(".dob_msg")[0].style.display = "none";
        document.querySelectorAll(".street1_msg")[0].style.display = "none";
        document.querySelectorAll(".street2_msg")[0].style.display = "none";
        /* document.querySelectorAll(".city_msg")[0].style.display = "none"; */
        document.querySelectorAll(".postal_msg")[0].style.display = "none";
        this.setState({
          first_msg: null,
          last_msg: null,
          country_msg: null,
          dob_msg: null,
          street_msg: null,
          street2_msg: null,
          city_msg: null,
          postal_msg: null,
          spin_show: true,
        });
        let number = value.postal_code;
        let country = this.state.countrySelected;
        if (this.state.Datedata !== undefined && this.state.Datedata !== null) {
          dataDate = this.state.Datedata;
        } else {
          dataDate = this.props.profileDetails.dob;
        }
        if (country === undefined && country === null) {
          country = this.props.profileDetails.country
            ? this.props.profileDetails.country
            : "";
        }
        profileData.append("first_name", value.first_name);
        profileData.append("email", this.props.email);
        profileData.append("last_name", value.last_name);
        if (this.state.citySelected !== null)
          profileData.append("city_town", this.state.citySelected);
        if (this.state.stateSelected !== null) {
          profileData.append("state", this.state.stateSelected);
        }
        if (this.state.countrySelected !== null) {
          profileData.append("country", this.state.countrySelected);
        }
        profileData.append("street_address", value.street_address);
        if (
          value.street_address_2 !== null &&
          value.street_address_2 !== "" &&
          value.street_address_2 !== undefined
        )
          profileData.append("street_address_2", value.street_address_2);
        profileData.append("postal_code", number);
        var fiat =
          this.state.fiat !== ""
            ? this.state.fiat
            : this.props.profileDetails.fiat;
        var date_format =
          this.state.date_format !== ""
            ? this.state.date_format
            : this.props.profileDetails.date_format;
        profileData.append("fiat", fiat);
        profileData.append("date_format", date_format);
        if (this.state.Datedata !== undefined)
          profileData.append("dob", this.state.Datedata);
        profileData.append("remove_pic", this.state.remove_pic);
        this.setState({
          profileImg: undefined,
          profileImage: undefined,
          remove_pic: false,
        });
        if (
          this.state.profileImage !== null &&
          this.state.profileImage !== undefined &&
          !this.state.profileImg.includes("def_profile.jpg")
        ) {
          profileData.append("profile_pic", this.state.profileImage);
        }
        profileData.append("default_language", this.state.language);
        profileData.append("phone_number", this.state.fields.phone_number);
        // profileData.append("country_code", this.state.fields.country_code);
        var countrySelected = CountryData.getCountryById(
          this.state.countryJsonId - 1
        );
        let country_code = "";
        if (countrySelected) {
          country_code = countrySelected.sortname;
        }
        profileData.append("country_code", country_code);
        this.props.profileupdateAction(this.props.isLoggedIn, profileData);
        this.props.i18n.changeLanguage(this.state.language);
        this.props.langAction(this.state.language);
        this.setState({
          editMode: false,
          isFirstLogin: false,
        });
      } else {
        this.validator.showMessages();
        // rerender to show messages for the first time
        this.forceUpdate();
        this.openNotificationWithProfile(
          "error",
          t("validations:error_text.message"),
          t("validations:error_on_submit_profile.message")
        );
      }
      if (
        this.state.firstIcon === null &&
        this.props.profileDetails.first_name === null
      ) {
        this.setState({ firstIcon: false });
        document.querySelectorAll(".first_msg")[0].style.display = "block";
        this.setState({
          firstmsg:
            t("subhead_personal_form_first_name.message") +
            " " +
            t("validations:field_is_required.message"),
        });
      }
      if (
        this.state.lastIcon === null &&
        this.props.profileDetails.last_name === null
      ) {
        this.setState({ lastIcon: false });
        document.querySelectorAll(".last_msg")[0].style.display = "block";
        this.setState({
          lastmsg:
            t("subhead_personal_form_last_name.message") +
            " " +
            t("validations:field_is_required.message"),
        });
      }
      if (
        (this.state.countryIcon === null || this.state.countryIcon === false) &&
        (this.props.profileDetails.country === "" ||
          this.props.profileDetails.country === null)
      ) {
        let countrymsg;
        if (
          this.state.countrySelected &&
          (this.state.stateSelected == "" ||
            this.state.stateSelected == null) &&
          (this.state.citySelected == "" || this.state.citySelected == null)
        ) {
          countrymsg = t("validations:required_state_city.message");
        } else if (
          this.state.countrySelected &&
          this.state.stateSelected &&
          (this.state.citySelected == "" || this.state.citySelected == null)
        ) {
          countrymsg = t("validations:required_city.message");
        } else {
          countrymsg = t("validations:required_country.message");
        }
        this.setState({ countrymsg });
      }
      if (
        this.state.dobIcon === null &&
        this.state.Datedata === undefined &&
        this.props.profileDetails.dob === null
      ) {
        this.setState({ dobIcon: false });
        document.querySelectorAll(".dob_msg")[0].style.display = "block";
        this.setState({
          dobmsg:
            t("subhead_personal_form_dob.message") +
            " " +
            t("validations:field_is_required.message"),
        });
      }
      if (
        this.state.street1Icon === null &&
        this.props.profileDetails.street_address === null
      ) {
        this.setState({ street1Icon: false });
        document.querySelectorAll(".street1_msg")[0].style.display = "block";
        this.setState({
          street1msg:
            t("subhead_personal_form_street_address_line1.message") +
            " " +
            t("validations:field_is_required.message"),
        });
      }
      if (
        this.state.postalIcon === null &&
        this.props.profileDetails.postal_code === null
      ) {
        this.setState({ postalIcon: false });
        document.querySelectorAll(".postal_msg")[0].style.display = "block";
        this.setState({
          postalmsg:
            t("subhead_personal_form_postal_code.message") +
            " " +
            t("validations:field_is_required.message"),
        });
      }
      if (
        this.state.fiatIcon === false &&
        this.props.profileDetails.fiat === ""
      ) {
        this.setState({ fiatIcon: false });
        document.querySelectorAll(".fiat_msg")[0].style.display = "block";
        this.setState({
          fiatmsg:
            t("general_1:currency_text.message") +
            " " +
            t("validations:field_is_required.message"),
        });
      }
      if (
        (this.state.dateFIcon !== true || this.state.dateFIcon === null) &&
        this.state.date_format === ""
      ) {
        this.setState({ dateFIcon: false });
        document.querySelectorAll(".df_msg")[0].style.display = "block";
        this.setState({
          dfmsg:
            t("general_1:dateformat_text.message") +
            " " +
            t("validations:field_is_required.message"),
        });
      }
    });
  };
  handleLangChange(value) {
    // console.log(`selected ${value}`);
    this.setState({
      language: value,
    });
  }
  changeNumber(a, mob, code) {
    if (mob.trim !== "") {
      var temp = `+${code.dialCode}`;
      var mobile = mob.includes(`+${code.dialCode}`) ? mob : temp.concat(mob);
      let fields = this.state.fields;
      fields["phone_number"] =
        typeof mobile == "string" ? mobile.replace(/ /g, "") : mobile;
      this.setState(
        {
          fields,
          mobile: typeof mob == "string" ? mob.replace(/ /g, "") : mob,
        },
        () => {
          // console.log(
          //   "phone_number^^^^",
          //   this.state.fields.phone_number,
          //   this.state.mobile
          // );
        }
      );
    } else {
      this.validator.showMessages();
      // rerender to show messages for the first time
      this.forceUpdate();
    }
  }
  clearValidation() {
    this.validator.hideMessages();
    this.forceUpdate();
    // rerender to hide messages for the first time
  }
  onKycCancel = () => {
    let allCountries = this.state.countryList;
    let phonecode, country_code, country_id;
    let arr = [];
    allCountries.map((country, index) => {
      if (country.name == this.props.profileDetails.country) {
        phonecode = country.phonecode;
        country_code = country.sortname;
        country_id = country.id;
      }
    });
    if (
      this.state.profileDetails.phone_number &&
      this.state.profileDetails.country
    ) {
      arr.push(country_code.toLowerCase());
      let temp = this.props.profileDetails.phone_number;
      var mob = temp.split(`+${phonecode}`);
      let phone = this.props.profileDetails.phone_number;
      this.setState({
        mobile: mob[1],
        displayCountry: true,
        fields: {
          phone_number: phone,
        },
        phoneCountry: arr,
        phoneCode: phonecode,
        countryJsonId: country_id,
      });
    } else {
      this.setState({
        displayCountry: false,
      });
    }
    // else {
    //   this.setState({
    //     displayCountry: false,
    //   });
    // }
    this.setState(
      {
        fiatIcon: null,
        dateFIcon: null,
        firstIcon: null,
        lastIcon: null,
        countryIcon: null,
        dobIcon: null,
        street1Icon: null,
        street2Icon: null,
        postalIcon: null,
        dataDate: null,
        date_format: this.state.profileDetails.date_format
          ? this.state.profileDetails.date_format
          : "MM/DD/YYYY",
        fiat: this.state.profileDetails.fiat,
        stateSelected: this.state.profileDetails.state,
        countrySelected: this.state.profileDetails.country,
        citySelected: this.state.profileDetails.city_town,
        profileImg:
          globalVariables._AMAZONBUCKET + this.state.profileDetails.profile_pic,
        remove_pic:
          this.state.profileDetails.profile_pic ==
          "/production-static-asset/assets/Settings/def_profile.jpg"
            ? true
            : false,
        profileImage: undefined,
        editMode: false,
        // displayCountry: false,
      },
      () => {
        this.datePickerChild.current.resetDatePicker();
        this.props.form.resetFields();
        // this.props.getProfileDataAction(this.props.isLoggedIn);
        document.querySelectorAll(".first_msg")[0].style.display = "none";
        document.querySelectorAll(".last_msg")[0].style.display = "none";
        document.querySelectorAll(".country_msg")[0].style.display = "none";
        document.querySelectorAll(".dob_msg")[0].style.display = "none";
        document.querySelectorAll(".street1_msg")[0].style.display = "none";
        document.querySelectorAll(".street2_msg")[0].style.display = "none";
        /* document.querySelectorAll(".city_msg")[0].style.display = "none"; */
        document.querySelectorAll(".postal_msg")[0].style.display = "none";
        document.querySelectorAll(".df_msg")[0].style.display = "none";
        this.clearValidation();
      }
    );
  };
  getStatesOfACountry(id) {
    fetch(API_URL + `/get-states?country_id=${id}`, {
      method: "get",
      headers: {
        Accept: "application/json",
        "Accept-Language": localStorage["i18nextLng"],
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.isLoggedIn,
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          stateList: responseData.data,
        });
      })
      .catch((error) => {});
  }
  render() {
    let errors;
    const { getFieldProps, getFieldError } = this.props.form;
    const { t } = this.props;
    const { profileDetails } = this.state;
    var me = this;
    // console.log(
    //   "phoneCountry countrySelected^^",
    //   this.state.displayCountry,
    //   this.state.phoneCountry,
    //   this.state.mobile,
    //   this.state.fields.phone_number,
    //   this.state.countryJsonId
    // );
    return (
      <Profilewrap
        className={
          this.props.theme == true ? "profile_details_dark" : "profile_details"
        }
      >
        <Row>
          <Col span={6} />
          <HeaderCol span={12}>
            <span>{t("head_personal_details.message")}</span>
          </HeaderCol>
        </Row>
        <Mainrow>
          <Col>
            <Row>
              <LeftCol
                md={{ span: 24 }}
                lg={{ span: 6 }}
                xl={{ span: 6 }}
                xxl={{ span: 6 }}
              >
                <div>
                  <ImageDiv src={this.state.profileImg} />
                </div>
                <div>
                  {this.state.showFileInput && (
                    <Imageinput
                      type="file"
                      onChange={this.handleProfile}
                      name="file"
                      id="file"
                      disabled={!this.state.editMode}
                    />
                  )}
                  <Imageup>
                    <Imageupload
                      className={this.state.editMode ? "" : "disabled_mode"}
                      htmlFor="file"
                    >
                      {t("subhead_personal_form_upload_new_photo.message")}
                    </Imageupload>
                  </Imageup>
                </div>

                {this.state.remove_pic !== true &&
                  (this.props.profileDetails.profile_pic ? (
                    !this.props.profileDetails.profile_pic.includes(
                      "def_profile.jpg"
                    ) ||
                    (this.state.profileImg !== undefined
                      ? !this.state.profileImg.includes("def_profile.jpg")
                      : true) ? (
                      <Remove
                        disabled={!this.state.editMode}
                        className={this.state.editMode ? "" : "disabled_mode"}
                        onClick={
                          !this.state.editMode ? "" : this.removePic.bind(this)
                        }
                      >
                        {t("subhead_personal_form_remove_photo.message")}
                      </Remove>
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  ))}
              </LeftCol>
              <RightCol
                md={{ span: 24 }}
                lg={{ span: 15, offset: 3 }}
                xl={{ span: 15, offset: 3 }}
                xxl={{ span: 15, offset: 3 }}
              >
                <FirstRow>
                  <Col
                    md={{ span: 12 }}
                    lg={{ span: 12 }}
                    xl={{ span: 12 }}
                    xxl={{ span: 12 }}
                  >
                    <Firstname>
                      {t("subhead_personal_form_first_name.message")}*
                    </Firstname>
                    <Firstinput
                      disabled={!this.state.editMode}
                      placeholder={t(
                        "subhead_personal_form_first_name.message"
                      )}
                      {...getFieldProps("first_name", {
                        onChange(e) {
                          me.onChangeField(e.target.value, "first_name");
                        },
                        initialValue: profileDetails.first_name, // have to write original onChange here if you need
                        rules: [{ required: true }],
                      })}
                    />
                    <FirstMsg className="first_msg">
                      {this.state.firstmsg}
                    </FirstMsg>
                  </Col>
                  <Col
                    md={{ span: 12 }}
                    lg={{ span: 12 }}
                    xl={{ span: 12 }}
                    xxl={{ span: 12 }}
                  >
                    <Lastname>
                      {t("subhead_personal_form_last_name.message")}*
                    </Lastname>
                    <Lastinput
                      disabled={!this.state.editMode}
                      placeholder={t("subhead_personal_form_last_name.message")}
                      {...getFieldProps("last_name", {
                        onChange(e) {
                          me.onChangeField(e.target.value, "last_name");
                        },
                        initialValue: profileDetails.last_name, // have to write original onChange here if you need
                        rules: [{ required: true }],
                      })}
                    />
                    <LastMsg className="last_msg">{this.state.lastmsg}</LastMsg>
                  </Col>
                </FirstRow>
                <FourthRow>
                  <Col md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}>
                    <Postal>Email</Postal>
                    <Postalinput
                      disabled
                      value={this.props.profileDetails.email}
                    />
                  </Col>
                </FourthRow>
                <SecondRow>
                  <Col
                    md={{ span: 24 }}
                    lg={{ span: 24 }}
                    xl={{ span: 24 }}
                    xxl={{ span: 24 }}
                  >
                    <Datebirth>
                      {t("subhead_personal_form_dob.message")}*
                    </Datebirth>
                    <Datepicker
                      ref={this.datePickerChild}
                      {...this.props}
                      onDateChange={(value, field) =>
                        this.onDateChange(value, field)
                      }
                      disabled={!this.state.editMode}
                    />
                    <DobMsg className="dob_msg">{this.state.dobmsg}</DobMsg>
                  </Col>
                </SecondRow>
                <ThirdRow>
                  <Col
                    md={{ span: 24 }}
                    lg={{ span: 24 }}
                    xl={{ span: 24 }}
                    xxl={{ span: 24 }}
                  >
                    <StreetAddress>
                      {t("subhead_personal_form_street_address_line1.message")}*
                    </StreetAddress>
                    <Streetinput
                      placeholder={t(
                        "general:street_holder_placeholder.message"
                      )}
                      {...getFieldProps("street_address", {
                        onChange(e) {
                          me.onChangeField(e.target.value, "street_address");
                        },
                        initialValue: profileDetails.street_address, // have to write original onChange here if you need
                        rules: [{ type: "string", required: true }],
                      })}
                      disabled={!this.state.editMode}
                    />
                    <StreetMsg className="street1_msg">
                      {this.state.street1msg}
                    </StreetMsg>
                  </Col>
                </ThirdRow>
                <ThirdRow>
                  <StreetAddress>
                    {t("subhead_personal_form_street_address_line2.message")}
                  </StreetAddress>
                  <Streetinput
                    disabled={!this.state.editMode}
                    placeholder={t("general:street_holder_placeholder.message")}
                    {...getFieldProps("street_address_2", {
                      onChange(e) {
                        me.onChangeField(e.target.value, "street_address_2");
                      },
                      initialValue:
                        profileDetails.street_address_2 !== null
                          ? profileDetails.street_address_2
                          : "", // have to write original onChange here if you need
                      rules: [{ type: "string" }],
                    })}
                  />
                  <StreetMsg className="street2_msg">
                    {this.state.street2msg}
                  </StreetMsg>
                </ThirdRow>
                <FourthRow>
                  <Col
                    md={{ span: 24 }}
                    lg={{ span: 24 }}
                    xl={{ span: 24 }}
                    xxl={{ span: 24 }}
                  >
                    <CountryPick
                      disabled={!this.state.editMode}
                      theme={this.props.theme}
                      country={
                        this.state.countrySelected !== null
                          ? this.state.countrySelected
                          : this.props.profileDetails.country
                      }
                      state={
                        this.state.stateSelected !== null
                          ? this.state.stateSelected
                          : this.props.profileDetails.state
                      }
                      city={
                        this.state.citySelected !== null
                          ? this.state.citySelected
                          : this.props.profileDetails.city_town
                      }
                      stateList={this.state.stateList}
                      cityList={this.state.cityList}
                      country_id={this.state.countryJsonId}
                      phone_number={this.state.fields.phone_number}
                      onCountryChange={(
                        country,
                        state,
                        city,
                        country_code,
                        phoneCode,
                        phone_number,
                        countryJsonId
                      ) =>
                        this.onCountryChange(
                          country,
                          state,
                          city,
                          country_code,
                          phoneCode,
                          phone_number,
                          countryJsonId
                        )
                      }
                    />
                    <CountryMsg className="country_msg">
                      {this.state.countrymsg}
                    </CountryMsg>
                  </Col>
                </FourthRow>
                {this.state.displayCountry && this.state.phoneCountry ? (
                  <FourthRow>
                    <Col
                      md={{ span: 24 }}
                      lg={{ span: 24 }}
                      xl={{ span: 24 }}
                      xxl={{ span: 24 }}
                    >
                      <Postalkyc>
                        {this.t(
                          "identity_verification:subhead_mobile_no.message"
                        )}
                        *
                      </Postalkyc>
                      <PhoneDiv
                        className={
                          this.state.editMode
                            ? "mobile_field"
                            : "mobile_field disabled"
                        }
                      >
                        {this.state.displayCountry && (
                          <IntlTelInputS
                            disabled={!this.state.editMode}
                            value={
                              this.state.mobile
                                ? typeof this.state.mobile == "string"
                                  ? this.state.mobile.replace(/ /g, "")
                                  : this.state.mobile
                                : ""
                            }
                            allowDropdown={false}
                            autoHideDialCode={false}
                            preferredCountries={[]}
                            inputClassName="intl-tel-input form-control"
                            onlyCountries={
                              this.state.phoneCountry[0] !== null
                                ? this.state.phoneCountry
                                : ""
                            }
                            defaultCountry={
                              this.state.phoneCountry[0] !== null
                                ? this.state.phoneCountry[0].toLowerCase()
                                : ""
                            }
                            separateDialCode={true}
                            onPhoneNumberChange={(a, b, c) =>
                              this.changeNumber(a, b, c)
                            }
                          />
                        )}
                      </PhoneDiv>
                      {this.validator.message(
                        "phone_number",
                        this.state.mobile,
                        "required|mobileVal|min:5|max:30",
                        "text-danger-validation",
                        {
                          required:
                            this.t(
                              "identity_verification:subhead_mobile_no.message"
                            ) +
                            " " +
                            t("validations:field_is_required.message"),
                          min: t("validations:mobile_no_min_error.message"),
                          max: t("validations:mobile_no_max_error.message"),
                        }
                      )}
                    </Col>
                  </FourthRow>
                ) : (
                  ""
                )}
                <FourthRow>
                  <Col md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}>
                    <Postal>
                      {t("subhead_personal_form_postal_code.message")}*
                    </Postal>
                    <Postalinput
                      disabled={!this.state.editMode}
                      placeholder={t(
                        "subhead_personal_form_postal_code.message"
                      )}
                      {...getFieldProps("postal_code", {
                        onChange(e) {
                          me.onChangeField(e.target.value, "postal_code");
                        },
                        initialValue: profileDetails.postal_code, // have to write original onChange here if you need
                        rules: [{ type: "string", required: true }],
                      })}
                    />
                    <PostalMsg className="postal_msg">
                      {this.state.postalmsg}
                    </PostalMsg>
                  </Col>
                </FourthRow>
                <FourthRow className="language">
                  <Col md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}>
                    <Postal>
                      {t("general_1:default_language_head.message")}
                    </Postal>
                    <Select
                      disabled={!this.state.editMode}
                      value={this.state.language}
                      onChange={this.handleLangChange}
                    >
                      <Option value="en">English</Option>
                      <Option value="ja">日本語</Option>
                      {/* <Option value="es">Española</Option>
                      <Option value="uk">Українська</Option>
                      <Option value="ru">русский</Option>
                      <Option value="zh">普通话</Option> */}
                    </Select>
                  </Col>
                </FourthRow>
                <SixthRow>
                  <Col
                    md={{ span: 24 }}
                    lg={{ span: 24 }}
                    xl={{ span: 24 }}
                    xxl={{ span: 24 }}
                  >
                    <FIAT>
                      {t("subhead_personal_form_default_currency.message")}*
                    </FIAT>
                    <RadioGroup
                      disabled={!this.state.editMode}
                      onChange={this.onChangeFiat}
                      value={
                        this.state.fiat !== ""
                          ? this.state.fiat
                          : profileDetails.fiat
                      }
                    >
                      <Radio value={"USD"}>
                        {t("settings:currency_usd.message")}
                      </Radio>
                      <Radio value={"INR"}>{t("currency_inr.message")}</Radio>
                      <Radio value={"EUR"}>{t("currency_eur.message")}</Radio>
                    </RadioGroup>
                    <FIATMsg className="fiat_msg">{this.state.fiatmsg}</FIATMsg>
                  </Col>
                </SixthRow>
                <SixthRow>
                  <Col
                    md={{ span: 24 }}
                    lg={{ span: 24 }}
                    xl={{ span: 24 }}
                    xxl={{ span: 24 }}
                  >
                    <FIAT>
                      {t("subhead_personal_form_default_date_format.message")}*
                    </FIAT>
                    <RadioGroup
                      disabled={!this.state.editMode}
                      onChange={this.onChangeFormat}
                      value={
                        this.state.date_format !== ""
                          ? this.state.date_format
                          : profileDetails.date_format
                      }
                    >
                      <Radio value={"MM/DD/YYYY"}>
                        {t("currency_date_format_1.message")}
                      </Radio>
                      <Radio value={"DD/MM/YYYY"}>
                        {t("currency_date_format_2.message")}
                      </Radio>
                      <Radio value={"MMM DD,YYYY"}>
                        {t("currency_date_format_3.message")}
                      </Radio>
                    </RadioGroup>
                    <FIATMsg className="df_msg">{this.state.dfmsg}</FIATMsg>
                  </Col>
                </SixthRow>
                {this.state.editMode && (
                  <SixthRow
                    className={this.props.theme ? "terms_conditions_dark" : ""}
                  >
                    <Col>
                      <span>
                        {" "}
                        {t("agree_terms_text.message")} FALDAX{" "}
                        <a
                          target="_blank"
                          href={`${globalVariables.Terms_and_services}`}
                        >
                          {t("agree_terms_of_services.message")}
                        </a>
                        ,{" "}
                        <a
                          target="_blank"
                          href={`${globalVariables.Privacy_policy}`}
                        >
                          {t("agree_privacy_policy.message")}
                        </a>
                        ,{" "}
                        <a
                          target="_blank"
                          href={`${globalVariables.Anti_money_laundering_policy}`}
                        >
                          {t("agree_anti_money_laundering_policy.message")}
                        </a>{" "}
                        {t("and_text.message")}{" "}
                        <a
                          target="_blank"
                          href={`${globalVariables.Cookie_policy}`}
                        >
                          {t("agree_cookies_policy.message")}
                        </a>
                        .
                      </span>
                    </Col>
                    <FIATMsg className="agree_check_msg">
                      {this.state.agree_check_msg}
                    </FIATMsg>
                  </SixthRow>
                )}
                <FifthRow>
                  <Col
                    md={{ span: 24 }}
                    lg={{ span: 24 }}
                    xl={{ span: 24 }}
                    xxl={{ span: 24 }}
                  >
                    {this.state.editMode ? (
                      <div className="edit_profile_actions">
                        {this.state.isFirstLogin ? (
                          <Save type="primary" onClick={this.submit}>
                            {t("subhead_personal_form_save_btn.message")}
                          </Save>
                        ) : (
                          <Save type="primary" onClick={this.openAgreePopup}>
                            {t("subhead_personal_form_save_btn.message")}
                          </Save>
                        )}
                        <Save type="primary" onClick={this.onKycCancel}>
                          {t("subhead_personal_form_cancel_btn.message")}
                        </Save>
                      </div>
                    ) : (
                      <Save
                        type="primary"
                        onClick={() => {
                          if (this.props.profileDetails.country) {
                            let arr = [];
                            if (this.props.profileDetails.country_code) {
                              arr.push(
                                this.props.profileDetails.country_code.toLowerCase()
                              );
                              this.setState({
                                displayCountry: true,
                                phoneCountry: arr,
                              });
                            }
                            if (this.props.profileDetails.countryJsonId) {
                              var countrySelected = CountryData.getCountryById(
                                this.props.profileDetails.countryJsonId - 1
                              );
                              let country_code = "";
                              let arr = [];
                              if (countrySelected) {
                                country_code = countrySelected.sortname;
                                arr.push(country_code.toLowerCase());
                              }
                              this.setState({
                                displayCountry: true,
                                phoneCountry: arr,
                              });
                            }
                          }
                          this.setState({
                            editMode: true,
                          });
                        }}
                      >
                        {t("subhead_personal_form_edit_btn.message")}
                      </Save>
                    )}
                  </Col>
                </FifthRow>
              </RightCol>
              <AgreeTerms
                agreeTerms={(e, isUpdate) => {
                  if (isUpdate) {
                    this.agreeTerms(e);
                  } else {
                    this.props.getProfileDataAction(this.props.isLoggedIn);

                    this.setState({
                      editMode: true,
                      isFirstLogin: !isUpdate,
                    });
                  }
                }}
                dontAgreeTerms={(e) => this.dontAgreeTerms(e)}
                comingCancel={(e) => this.comingCancel(e)}
                visible={
                  this.state.agreeTermsShow ||
                  profileDetails.is_terms_agreed == false
                }
                showCancelBtn={profileDetails.is_terms_agreed}
                isLoggedIn={this.props.isLoggedIn}
              />
              {this.props.loader === true ? <FaldaxLoader /> : ""}
            </Row>
          </Col>

          {(errors = getFieldError("required")) ? errors.join(",") : null}
        </Mainrow>
      </Profilewrap>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ...state,
    email:
      state.simpleReducer.profileDetails !== undefined
        ? state.simpleReducer.profileDetails.data[0].email
        : "",
    profileDetails:
      state.simpleReducer.profileDetails !== undefined
        ? state.simpleReducer.profileDetails.data[0]
        : "",
    loader: state.simpleReducer.loader,
    apiStatus:
      state.simpleReducer.update !== undefined
        ? state.simpleReducer.update.status
        : "",
    apiMessage:
      state.simpleReducer.update !== undefined
        ? state.simpleReducer.update.message
        : "",
    profileError:
      state.simpleReducer.profileError !== undefined
        ? state.simpleReducer.profileError
        : undefined,
    language: state.themeReducer.lang,
  };
};
const mapDispatchToProps = (dispatch) => ({
  profileupdateAction: (isLoggedIn, form) =>
    dispatch(profileupdateAction(isLoggedIn, form)),
  getProfileDataAction: (isLoggedIn) =>
    dispatch(getProfileDataAction(isLoggedIn)),
  removepicAction: (isLoggedIn, form) =>
    dispatch(removepicAction(isLoggedIn, form)),
  clearEditData: () => dispatch(clearEditData()),
  profileErr: () => dispatch(profileError()),
  LogoutUser: () => dispatch(LogoutUser()),
  langAction: (lang) => dispatch(langAction(lang)),
});

export default translate([
  "edit_profile_titles",
  "validations",
  "general",
  "general_1",
  "settings",
  "sign_up",
  "identity_verification",
])(connect(mapStateToProps, mapDispatchToProps)(createForm()(PersonalDetails)));
