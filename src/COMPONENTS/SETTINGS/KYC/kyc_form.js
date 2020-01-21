/* Built-in packages */
import React, { Component } from "react";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import { Col, notification } from "antd";
import styled from "styled-components";
import SimpleReactValidator from "simple-react-validator";
import moment from "moment";
import "react-intl-tel-input/dist/main.css";

/* Components */
import Datepicker from "../Personaldetails/datepicker";
import CountryPick from "../Personaldetails/country";
import { kycFormAction, kycformData } from "ACTIONS/SETTINGS/passwordActions";
import FaldaxLoader from "SHARED-COMPONENTS/FaldaxLoader";
import { globalVariables } from "Globals.js";
import { translate } from "react-i18next";

/* STYLED-COMPONENTS */
import { IntlTelInputS } from "STYLED-COMPONENTS/LANDING_CATEGORIES/contactStyle";
import {
  Save,
  FifthRow,
  Postal,
  FourthRow,
  Streetinput,
  StreetAddress,
  ThirdRow,
  Datebirth,
  SecondRow,
  Lastinput,
  Lastname,
  Firstinput,
  Firstname,
  FirstRow,
  RightCol
} from "../Personaldetails/personal_details";
let { API_URL } = globalVariables;

const KYCform = styled.div`
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 55px;
`;
const Savekyc = styled(Save)`
  margin-left: 0px;
  @media (max-width: 992px) {
    width: 70px;
  }
`;
const FifthRowkyc = styled(FifthRow)`
  text-align: center;
`;
const Postalkyc = styled(Postal)`
  @media (max-width: 767px) {
    margin-top: 0px;
  }
`;
const FourthRowkyc = styled(FourthRow)``;
const Streetinputkyc = styled(Streetinput)``;
const StreetAddresskyc = styled(StreetAddress)``;
const Street2wrap = styled.div`
  margin-top: 25px;
`;
const ThirdRowkyc = styled(ThirdRow)``;
const Datebirthkyc = styled(Datebirth)`
  @media (max-width: 992px) {
    margin-top: 0px;
  }
  @media (max-width: 767px) {
    margin-top: 25px;
  }
`;
const SecondRowkyc = styled(SecondRow)``;
const Lastinputkyc = styled(Lastinput)``;
const Zip = styled(Lastinput)`
  width: 95%;
  @media (max-width: 991px) {
    width: 95%;
  }
  @media (max-width: 767px) {
    width: 100%;
  }
`;
const Lastnamekyc = styled(Lastname)``;
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
    background-color: ${props =>
      props.theme.mode === "dark" ? "#020e18" : "#f8f8f8"};
    color: ${props => (props.theme.mode === "dark" ? "white" : "")};
    border-radius: 5px;
    min-height: 45px;
    width: 100%;
    padding-left: 5px;
  }
  & .selected-dial-code {
    color: ${props => (props.theme.mode === "dark" ? "white" : "")};
  }
`;
const Firstinputkyc = styled(Firstinput)``;
const Firstnamekyc = styled(Firstname)``;
const FirstRowkyc = styled(FirstRow)``;
const RightColkyc = styled(RightCol)``;
const SixthRowkyc = styled(FourthRow)``;

const CountryError = styled.span`
  color: red;
`;

class KYCForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countrymsg: null,
      dobmsg: null,
      phoneCountry: [],
      countrychange: false,
      showSSN: false,
      kycData: null,
      mobile: "",
      displayCountry: false,
      loader: false,
      fields: {
        first_name: "",
        last_name: "",
        country: "",
        address: "",
        address_2: "",
        city_town: "",
        zip: "",
        state: "",
        phone_number: ""
      }
    };

    /* Simple React Validator Custom Messages */
    this.t = this.props.t;
    this.validator = new SimpleReactValidator({
      firstname: {
        // name the rule
        message:
          this.t("subhead_personal_form_first_name.message") +
          " " +
          this.t("validations:min_max_first_name.message"), // give a message that will display when there is an error. :attribute will be replaced by the name you supply in calling it.
        rule: function(val, options) {
          // return true if it is succeeds and false it if fails validation. the _testRegex method is available to give back a true/false for the regex and given value
          // check that it is a valid IP address and is not blacklisted
          var re = /^[a-zA-Z0-9]{2,15}$/;
          var bool = re.test(String(val).toLowerCase());
          return bool;
        }
      },
      lastname: {
        // name the rule
        message:
          this.t("subhead_personal_form_last_name.message") +
          " " +
          this.t("validations:min_max_first_name.message"), // give a message that will display when there is an error. :attribute will be replaced by the name you supply in calling it.
        rule: function(val, options) {
          // return true if it is succeeds and false it if fails validation. the _testRegex method is available to give back a true/false for the regex and given value
          // check that it is a valid IP address and is not blacklisted
          var re = /^[a-zA-Z0-9]{2,15}$/;
          var bool = re.test(String(val).toLowerCase());
          return bool;
        }
      },
      onlyNumber: {
        // name the rule
        message: this.t("only_number_not_allowed.message"), // give a message that will display when there is an error. :attribute will be replaced by the name you supply in calling it.
        rule: function(val, options) {
          // return true if it is succeeds and false it if fails validation. the _testRegex method is available to give back a true/false for the regex and given value
          // check that it is a valid IP address and is not blacklisted
          var re = /^[0-9]*$/;
          var bool = !re.test(String(val).toLowerCase());
          return bool;
        }
      },
      mobileVal: {
        // name the rule
        message: this.t("validations:mobile_no_error.message"), // give a message that will display when there is an error. :attribute will be replaced by the name you supply in calling it.
        rule: function(val, options) {
          // return true if it is succeeds and false it if fails validation. the _testRegex method is available to give back a true/false for the regex and given value
          // check that it is a valid IP address and is not blacklisted
          var re = /^(\(?\+?[0-9]*\)?)?[0-9_\- \(\)]*$/;
          var bool = re.test(String(val).toLowerCase());
          return bool;
        }
      },
      zipValid: {
        message:
          "Postal Code should only contain alphabets , numbers , hyphen and space .", // give a message that will display when there is an error. :attribute will be replaced by the name you supply in calling it.
        rule: function(val, options) {
          // return true if it is succeeds and false it if fails validation. the _testRegex method is available to give back a true/false for the regex and given value
          // check that it is a valid IP address and is not blacklisted
          var re = /^(?=.*[0-9a-zA-Z])[- 0-9a-zA-Z]+$/;
          var bool = re.test(String(val));
          return bool;
        }
      }
    });
    this.onChangeFields = this.onChangeFields.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCountryName = this.onCountryName.bind(this);
  }

  /* Life-Cycle Methods */

  componentWillReceiveProps(props, newProps) {
    if (props.kycData !== undefined && props.kycData !== "") {
      if (props.kycData.status === 200) {
        //this.openNotificationWithIcon("success","KYC",props.kycData.message)
        this.props.kycformData();
        // console.log("KYC CHECK", this.state.showSSN);
        this.props.next_step(1, null, this.state.showSSN);
      } else {
        this.openNotificationWithIcon("error", "KYC", props.kycData.err);
        this.props.kycformData();
      }
    }
  }
  componentDidMount() {
    var self = this;
    this.setState({ loader: true });
    fetch(API_URL + "/users/get-kyc-detail", {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.isLoggedIn
      }
    })
      .then(response => response.json())
      .then(responseData => {
        if (responseData.status === 200) {
          let fields = {};
          fields["first_name"] =
            responseData.data.first_name !== null
              ? responseData.data.first_name
              : "";
          fields["last_name"] =
            responseData.data.last_name !== null
              ? responseData.data.last_name
              : "";
          fields["address"] =
            responseData.data.address !== null ? responseData.data.address : "";
          fields["address_2"] =
            responseData.data.address_2 !== null
              ? responseData.data.address_2
              : "";
          fields["zip"] =
            responseData.data.zip !== null ? responseData.data.zip : "";
          fields["city_town"] =
            responseData.data.city_town !== null
              ? responseData.data.city_town
              : "";
          fields["country"] =
            responseData.data.country !== null ? responseData.data.country : "";
          fields["state"] =
            responseData.data.state !== null ? responseData.data.state : "";
          fields["dob"] =
            responseData.data.dob !== null ? responseData.data.dob : "";
          fields["country_code"] =
            responseData.data.country_code !== null
              ? responseData.data.country_code
              : "";
          if (responseData.data.phone_number) {
            fields["phone_number"] = responseData.data.phone_number;
            // console.log("country_code", responseData.data.country_code);
            let phone = responseData.data.phone_number;
            let arr = [];
            arr.push(responseData.data.country_code);
            // console.log("country_code", this.state.phoneCountry);
            // console.log(responseData.data.phone_number);

            this.setState(
              {
                countrychange: true,
                mobile: responseData.data.phone_number,
                phoneCountry: arr,
                displayCountry: true
              },
              () => {
                // console.log("KYC CHECK", responseData.data.country_code)
                if (
                  responseData.data.country_code == "US" ||
                  responseData.data.country_code == "CA"
                )
                  self.setState({
                    showSSN: true
                  });
              }
            );
          }
          this.setState({
            fields: fields,
            kycData: responseData.data,
            loader: false
          });
        } else {
          this.openNotificationWithIcon(
            "error",
            `Error: ${responseData.status}`,
            responseData.err
          );
          this.setState({ loader: false });
        }
      })
      .catch(error => {
        this.setState({ loader: false });
      });
  }

  /* 
        Page: /editProfile --> KYC
        It is called when we date is changed and it is passed as callback to child.
    */

  onDateChange(value) {
    var tempDate = value.day + "/" + value.month + "/" + value.year;
    if (
      value.day !== "" &&
      value.day !== undefined &&
      value.year !== undefined &&
      value.year !== "" &&
      value.month !== undefined &&
      value.month !== ""
    ) {
      var date = moment
        .utc(tempDate)
        .local()
        .format("DD-MM-YYYY");
      let fields = this.state.fields;
      fields["dob"] = date;
      this.setState({ fields });
    } else {
      let fields = this.state.fields;
      fields["dob"] = "";
      this.setState({ fields });
    }
  }

  /* 
        Page: /editProfile --> KYC
        It is called when we country is changed and it is passed as callback to child.
    */

  onCountryName(name) {
    var name2 = name.toLowerCase();
    var arr = [];
    arr.push(name2);
    let fields = this.state.fields;
    fields["country_code"] = name2.toUpperCase();
    // console.log("KYC CHECK", name2)
    if (name2 === "us" || name2 === "ca")
      this.setState({
        fields,
        phoneCountry: arr,
        countrychange: true,
        showSSN: true
      });
    else
      this.setState({
        fields,
        phoneCountry: arr,
        countrychange: true,
        showSSN: false
      });
  }

  /* 
        Page: /editProfile --> KYC
        It is called when we country is changed and it is passed as callback to child.
    */

  onCountryChange(country, state, city, country_code, phoneCode) {
    let self = this;
    let fields = this.state.fields;
    fields["country"] = country;
    fields["state"] = state;
    fields["city_town"] = city;
    fields["country_code"] = country_code;
    let mobile = this.state.mobile;
    if (this.state.phoneCountry && this.state.phoneCountry[0] != country_code) {
      mobile = `+${phoneCode}`;
      // console.log("from pick ", mobile);
    }
    this.setState(
      {
        kycData: { ...this.state.kycData, ...fields },
        fields,
        phoneCountry: [country_code],
        mobile
      },
      () => {
        // To rerender the mobile input field
        self.setState(
          {
            displayCountry: false
          },
          () => {
            self.setState({
              displayCountry: true
            });
          }
        );
      }
    );
  }

  /* 
        Page: /editProfile --> KYC
        It is called for custom notifications.
    */

  openNotificationWithIcon(type, head, desc) {
    notification[type]({
      message: head,
      description: desc
    });
  }

  /* 
        Page: /editProfile --> KYC
        It is called for every field change.
    */

  onChangeFields(e) {
    let fields = this.state.fields;
    let field = e.target.name;

    if (e.target.value.trim() === "") {
      fields[field] = "";
    } else {
      fields[field] = e.target.value;
    }
    this.setState({ fields });
  }

  /* 
        Page: /editProfile --> KYC
        It is called when country is changed in KYC FORM and mobile input is opened after that.
    */

  changeNumber(a, mob, code) {
    // console.log("chnage number", mob, code);

    if (mob.trim !== "") {
      var temp = `+${code.dialCode}`;
      // console.log(temp);

      // console.log("a", a);
      // console.log("mob", mob);
      // console.log("code", code);
      var mobile = mob.includes(`+${code.dialCode}`) ? mob : temp.concat(mob);
      let fields = this.state.fields;
      fields["phone_number"] = mobile;
      // console.log(mobile);

      this.setState({ fields, mobile: mob });
    }
  }

  /* 
        Page: /editProfile --> KYC
        It is called when KYC FORM is submitted and validation is done.
    */

  onSubmit() {
    if (this.validator.allValid()) {
      var profileData = this.state.fields;
      profileData["steps"] = 1;
      this.props.kycFormAction(this.props.isLoggedIn, profileData);
    } else {
      this.validator.showMessages();
      // rerender to show messages for the first time
      this.forceUpdate();
    }
  }

  render() {
    const { t } = this.props;
    let countryBool = this.validator.message(
        "country",
        this.state.fields.country,
        "required",
        "text-danger-validation"
      )
        ? true
        : false,
      stateBool = this.validator.message(
        "state",
        this.state.fields.state,
        "required",
        "text-danger-validation"
      )
        ? true
        : false,
      cityBool = this.validator.message(
        "city",
        this.state.fields.city_town,
        "required",
        "text-danger-validation"
      )
        ? true
        : false;
    let countrymsg;
    if (countryBool === true && stateBool === false && cityBool === false) {
      countrymsg =
        t("subhead_personal_form_country.message") +
        " " +
        t("validations:field_is_required.message");
    } else if (
      countryBool === true &&
      stateBool === true &&
      cityBool === false
    ) {
      countrymsg =
        t("subhead_personal_form_country.message") +
        " " +
        t("and_text.message") +
        " " +
        t("subhead_personal_form_state.message") +
        " " +
        t("validations:field_is_required.message");
    } else if (
      countryBool === true &&
      stateBool === true &&
      cityBool === true
    ) {
      countrymsg =
        t("subhead_personal_form_country.message") +
        " " +
        t("and_text.message") +
        " " +
        t("subhead_personal_form_state.message") +
        " " +
        t("validations:field_is_required.message");
    } else if (
      countryBool === false &&
      stateBool === true &&
      cityBool === false
    ) {
      countrymsg =
        t("subhead_personal_form_state.message") +
        " " +
        t("validations:field_is_required.message");
    } else if (
      countryBool === false &&
      stateBool === true &&
      cityBool === true
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
      countryBool === false &&
      stateBool === false &&
      cityBool === true
    ) {
      countrymsg =
        t("subhead_personal_form_city.message") +
        " " +
        t("validations:field_is_required.message");
    } else if (
      countryBool === true &&
      stateBool === false &&
      cityBool === true
    ) {
      countrymsg =
        t("subhead_personal_form_country.message") +
        " " +
        t("and_text.message") +
        " " +
        t("subhead_personal_form_city.message") +
        " " +
        t("validations:field_is_required.message");
    }
    return (
      <KYCform>
        <RightColkyc>
          <FirstRowkyc>
            <Col
              md={{ span: 12 }}
              lg={{ span: 12 }}
              xl={{ span: 12 }}
              xxl={{ span: 12 }}
            >
              <Firstnamekyc>
                {" "}
                {t("subhead_personal_form_first_name.message")}*
              </Firstnamekyc>
              <Firstinputkyc
                value={this.state.fields.first_name}
                name="first_name"
                onChange={this.onChangeFields}
                placeholder={t("subhead_personal_form_first_name.message")}
              />
              {this.validator.message(
                "first_name",
                this.state.fields.first_name,
                "required|firstname|onlyNumber",
                "text-danger-validation",
                {
                  required:
                    t("subhead_personal_form_first_name.message") +
                    " " +
                    t("validations:field_is_required.message")
                }
              )}
            </Col>
            <Col
              md={{ span: 12 }}
              lg={{ span: 12 }}
              xl={{ span: 12 }}
              xxl={{ span: 12 }}
            >
              <Lastnamekyc>
                {" "}
                {t("subhead_personal_form_last_name.message")}*
              </Lastnamekyc>
              <Lastinputkyc
                value={this.state.fields.last_name}
                name="last_name"
                onChange={this.onChangeFields}
                placeholder={t("subhead_personal_form_last_name.message")}
              />
              {this.validator.message(
                "last_name",
                this.state.fields.last_name,
                "required|lastname|onlyNumber",
                "text-danger-validation",
                {
                  required:
                    t("subhead_personal_form_last_name.message") +
                    " " +
                    t("validations:field_is_required.message")
                }
              )}
            </Col>
          </FirstRowkyc>

          <SecondRowkyc>
            <Col
              md={{ span: 24 }}
              lg={{ span: 24 }}
              xl={{ span: 24 }}
              xxl={{ span: 24 }}
            >
              <Datebirthkyc>
                {t("subhead_personal_form_dob.message")}*
              </Datebirthkyc>
              <Datepicker
                kycData2={this.state.kycData}
                {...this.props}
                kyc="kyc"
                onDateChange={Data => this.onDateChange(Data)}
              />
              {this.validator.message(
                "Date of Birth",
                this.state.fields.dob,
                "required",
                "text-danger-validation",
                {
                  required:
                    t("subhead_personal_form_dob.message") +
                    " " +
                    t("validations:field_is_required.message")
                }
              )}
            </Col>
          </SecondRowkyc>

          <ThirdRowkyc>
            <Col
              md={{ span: 24 }}
              lg={{ span: 24 }}
              xl={{ span: 24 }}
              xxl={{ span: 24 }}
            >
              <StreetAddresskyc>
                {" "}
                {t("subhead_personal_form_street_address_line1.message")}*
              </StreetAddresskyc>
              <Streetinputkyc
                value={this.state.fields.address}
                name="address"
                onChange={this.onChangeFields}
                placeholder={t(
                  "subhead_personal_form_street_address_line1.message"
                )}
              />
              {this.validator.message(
                "street_address",
                this.state.fields.address,
                "required|max:100",
                "text-danger-validation",
                {
                  required:
                    t("subhead_personal_form_street_address_line1.message") +
                    " " +
                    t("validations:field_is_required.message"),
                  max: t("street_address_error.message")
                }
              )}
            </Col>
            <Col
              md={{ span: 24 }}
              lg={{ span: 24 }}
              xl={{ span: 24 }}
              xxl={{ span: 24 }}
            >
              <Street2wrap>
                <StreetAddresskyc>
                  {t("subhead_personal_form_street_address_line2.message")}
                </StreetAddresskyc>
                <Streetinputkyc
                  value={this.state.fields.address_2}
                  name="address_2"
                  onChange={this.onChangeFields}
                  placeholder={t(
                    "subhead_personal_form_street_address_line2.message"
                  )}
                  autosize={{ minRows: 3, maxRows: 6 }}
                />
                {this.validator.message(
                  "street_address_2",
                  this.state.fields.address_2,
                  "max:100",
                  "text-danger-validation",
                  {
                    required:
                      t("subhead_personal_form_street_address_line2.message") +
                      " " +
                      t("validations:field_is_required.message"),
                    max: t("postal_code_letters_numbers.message")
                  }
                )}
              </Street2wrap>
            </Col>
          </ThirdRowkyc>

          <FourthRowkyc>
            <Col
              md={{ span: 24 }}
              lg={{ span: 24 }}
              xl={{ span: 24 }}
              xxl={{ span: 24 }}
            >
              {this.state.kycData && (
                <CountryPick
                  theme={this.props.theme}
                  kycData2={this.state.kycData}
                  country={this.state.kycData.country}
                  state={this.state.kycData.state}
                  city={this.state.kycData.city_town}
                  kyc="kyc"
                  // isLoggedIn={this.props.simpleReducer.isLoggedIn}
                  onCountryChange={(
                    country,
                    state,
                    city,
                    country_code,
                    phoneCode
                  ) =>
                    this.onCountryChange(
                      country,
                      state,
                      city,
                      country_code,
                      phoneCode
                    )
                  }
                />
              )}
              {countryBool === true ||
              stateBool === true ||
              cityBool === true ? (
                <CountryError>{countrymsg}</CountryError>
              ) : (
                <span></span>
              )}
            </Col>
          </FourthRowkyc>
          {/* {console.log(this.state.countrychange, this.state.phoneCountry[0])} */}
          {this.state.displayCountry && this.state.phoneCountry ? (
            <SixthRowkyc>
              <Col
                md={{ span: 24 }}
                lg={{ span: 24 }}
                xl={{ span: 24 }}
                xxl={{ span: 24 }}
              >
                <Postalkyc>
                  {t("identity_verification:subhead_mobile_no.message")}*
                </Postalkyc>
                <PhoneDiv className="jkasdhkasjd">
                  {/* {console.log(
                    "Test",
                    this.state.mobile,
                    this.state.displayCountry,
                    this.state.phoneCountry,
                    this.state.phoneCountry[0]
                  )} */}
                  {this.state.displayCountry && (
                    <IntlTelInputS
                      value={this.state.mobile}
                      allowDropdown={false}
                      autoHideDialCode={true}
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
                      t("identity_verification:subhead_mobile_no.message") +
                      " " +
                      t("validations:field_is_required.message"),
                    min: t("validations:mobile_no_min_error.message"),
                    max: t("validations:mobile_no_max_error.message")
                  }
                )}
              </Col>
            </SixthRowkyc>
          ) : (
            ""
          )}
          <SixthRowkyc>
            <Col
              md={{ span: 24 }}
              lg={{ span: 24 }}
              xl={{ span: 24 }}
              xxl={{ span: 24 }}
            >
              <Postalkyc>
                {" "}
                {t("subhead_personal_form_postal_code.message")}*
              </Postalkyc>
              <Zip
                value={this.state.fields.zip}
                name="zip"
                onChange={this.onChangeFields}
                placeholder={t("subhead_personal_form_postal_code.message")}
              />
              {this.validator.message(
                "postal_code",
                this.state.fields.zip,
                "required|min:3|max:25|zipValid",
                "text-danger-validation",
                {
                  required:
                    t("subhead_personal_form_postal_code.message") +
                    " " +
                    t("validations:field_is_required.message"),
                  min: t("validations.Postal_min_error.message"),
                  max: t("validations.Postal_max_error.message")
                }
              )}
            </Col>
          </SixthRowkyc>
          <FifthRowkyc>
            <Col
              md={{ span: 24 }}
              lg={{ span: 24 }}
              xl={{ span: 24 }}
              xxl={{ span: 24 }}
            >
              <Savekyc type="primary" onClick={this.onSubmit}>
                Next
              </Savekyc>
            </Col>
          </FifthRowkyc>
        </RightColkyc>
        {this.state.loader === true ? <FaldaxLoader /> : ""}
      </KYCform>
    );
  }
}

const mapStateToProps = state => {
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
    isLoggedIn:
      state.simpleReducer.isLoggedIn !== undefined
        ? state.simpleReducer.isLoggedIn
        : "",
    kycData:
      state.passwordReducer.kycData !== undefined
        ? state.passwordReducer.kycData
        : "",
    loader: state.simpleReducer.loader,
    theme:
      state.themeReducer.theme !== undefined ? state.themeReducer.theme : ""
  };
};
const mapDispatchToProps = dispatch => ({
  kycFormAction: (is, data) => dispatch(kycFormAction(is, data)),
  kycformData: data => dispatch(kycformData(data))
});

export default translate([
  "edit_profile_titles",
  "validations",
  "identity_verification"
])(connect(mapStateToProps, mapDispatchToProps)(KYCForm));
