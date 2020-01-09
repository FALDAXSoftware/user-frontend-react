/* Built-in Packages */
import React, { Component } from "react";
import "antd/dist/antd.css";
import styled from "styled-components";
import CountryData from "country-state-city";
import { Select, Row, Col } from "antd";
import { connect } from "react-redux";
import { createForm, formShape } from "rc-form";
import { translate } from "react-i18next";
/* components */
import { globalVariables } from "Globals.js";

/* let { API_URL } = globalVariables; */
const Option = Select.Option;
/* var Countries = []; */

const Country = styled.span`
  font-size: 14.007px;
  font-family: "Open Sans";
  color: ${props =>
    props.theme.mode === "dark"
      ? "rgba( 152, 171, 215, 0.502 )"
      : "rgba( 80, 80, 80, 0.502 )"};
  -moz-transform: matrix(0.99999985149599, 0, 0, 0.99949238260564, 0, 0);
  -webkit-transform: matrix(0.99999985149599, 0, 0, 0.99949238260564, 0, 0);
  -ms-transform: matrix(0.99999985149599, 0, 0, 0.99949238260564, 0, 0);
  display: block;
  margin-bottom: 10px;
`;
const SelectS = styled(Select)`
  width: 85%;
  & .Country_Select {
    width: 85%;
    margin: 0;
  }

  & .Country_Select:first-child {
    margin-left: 0px !important;
  }
  & .Country_Select > .ant-select-selection {
    background-color: #f8f8f8;
    width: 100%;
    border: 1px solid #dadfe3;
    padding: 5px;
    height: auto;
    font-family: "Open Sans";
    font-size: 16;
    font-weight: 600;
  }
  & .Country_Select > .ant-select-selection:hover,
  .Country_Select > .ant-select-selection:focus {
    border-color: #4c84ff;
    outline: 0;
    box-shadow: none;
  }
  @media (max-width: 991px) {
    width: 93%;
  }
  @media (max-width: 767px) {
    margin-top: 0px;
    width: 100%;
  }
  & .ant-select-disabled {
    > .ant-select-selection {
      color: rgba(0, 0, 0, 0.4) !important;
    }
  }
`;
const SelectWrap = styled.div`
  @media (max-width: 767px) {
    margin-top: 25px;
  }
`;
const CountryWrap = styled.div`
  @media (max-width: 991px) {
    margin-right: 20px;
  }
  @media (max-width: 767px) {
    margin-right: 0px;
  }
`;
class CountryPick extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      country_selected: null,
      state_selected: null,
      city_selected: null,
      countryID: "",
      stateID: "",
      CSS: "Country_Select",
      theme: "",
      states: [],
      cities: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeState = this.handleChangeState.bind(this);
    this.handleChangeCity = this.handleChangeCity.bind(this);
    this.getCountryId = this.getCountryId.bind(this);
  }

  /* Life-Cycle Methods */
  componentDidMount() {
    this.setState({
      country_selected: this.props.country,
      state_selected: this.props.state,
      city_selected: this.props.city
    });
  }
  componentWillReceiveProps(newprops) {
    if (this.props != newprops) {
      this.setState({
        country_selected: newprops.country,
        state_selected: newprops.state,
        city_selected: newprops.city
      });
    }
  }
  /* 
        Page: /editProfile --> profile/Personal Details
        It is called when country is changed and according to that states are collected and selected country is passed to parent.
    */

  handleChange(value, position) {
    var newPosition = Number(position.key) - 1;
    var countrySelected = CountryData.getCountryById(newPosition);
    // console.log(countrySelected);

    let country_code = "";
    let phoneCode = "";
    if (countrySelected) {
      country_code = countrySelected.sortname;
      phoneCode = countrySelected.phonecode;
    }
    // var states = CountryData.getStatesOfCountry(newPosition + 1);
    this.setState(
      {
        city_selected: "",
        state_selected: "",
        country_selected: value,
        country_code,
        phoneCode
        // stateID: null,
        // countryID: newPosition,
        // states
      },
      () => {
        this.passOnChangeToParent();
      }
    );
    if (this.props.kyc === "kyc") {
      // this.props.onCountryName(countrySelected.sortname);
    }
  }

  /* 
        Page: /editProfile --> profile/Personal Details
        It is called when state is changed and according to that cities are collected and selected country is passed to parent.
    */

  handleChangeState(value, position) {
    this.setState(
      {
        state_selected: value,
        city_selected: ""
        // country_selected: country,
        // stateID: newPosition,
        // cities
      },
      () => {
        this.passOnChangeToParent();
      }
    );

    // this.props.onCountryChange(country, value, null);
  }

  handleChangeCity(value, position) {
    this.setState({ city_selected: value }, () => {
      this.passOnChangeToParent();
    });
    // this.props.onCountryChange(country, state, value);
  }
  getCountryId(countryName) {
    let allCountries = CountryData.getAllCountries();
    for (let index = 0; index < allCountries.length; index++) {
      const element = allCountries[index];
      if (countryName === element.name) {
        return element.id;
      }
    }
    return undefined;
  }

  /* 
        Page: /editProfile --> profile/Personal Details
        It is method to get state ID of selected state.
    */

  getStateId(countryId, stateName) {
    let allStates = CountryData.getStatesOfCountry(countryId);
    for (let index = 0; index < allStates.length; index++) {
      const element = allStates[index];
      if (stateName === element.name) {
        return element.id;
      }
    }
    return undefined;
  }
  passOnChangeToParent = () => {
    // console.log(this.state.phoneCode);

    this.props.onCountryChange(
      this.state.country_selected,
      this.state.state_selected,
      this.state.city_selected,
      this.state.country_code,
      this.state.phoneCode
    );
  };
  render() {
    let country, state, city;
    const { t } = this.props;
    if (this.props.kyc !== undefined)
      if (this.props.kyc === "kyc") {
        if (
          this.props.kycData2 !== "" &&
          this.props.kycData2 !== null &&
          this.props.kycData2 !== undefined
        ) {
          if (this.props.kycData2 !== undefined) {
            country = this.props.kycData2.country;
            state = this.props.kycData2.state;
            city = this.props.kycData2.city_town;
          }
        }
      }

    // ----------
    let allCountries = CountryData.getAllCountries();

    let countryId = this.getCountryId(this.state.country_selected);
    let allStates = [];
    let allCities = [];
    let selectedState,
      selectedCity = null;
    if (countryId) {
      allStates = CountryData.getStatesOfCountry(countryId);

      selectedState = this.getStateId(countryId, this.state.state_selected);
      if (selectedState) {
        allCities = CountryData.getCitiesOfState(selectedState);
        if (allCities.length == 0) {
          allCities = [
            {
              id: selectedState,
              name: this.state.state_selected
            }
          ];
        }
        selectedCity = this.state.city_selected;
      }
    }
    // ----------
    return (
      <CountryWrap>
        <Row>
          <Col sm={24} md={8} xl={8} xxl={8}>
            <Country>{t("subhead_personal_form_country.message")}*</Country>
            <SelectS
              disabled={this.props.disabled}
              showSearch
              value={this.state.country_selected}
              placeholder="Select a Country"
              className={`${
                this.props.theme == true
                  ? "Country_Select_night"
                  : "Country_Select"
              }`}
              dropdownClassName="country_select_drop"
              optionFilterProp="children"
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {allCountries.map((country, index) => (
                <Option key={country.id} value={country.name}>
                  {country.name}
                </Option>
              ))}
            </SelectS>
          </Col>
          <Col sm={24} md={8} xl={8} xxl={8}>
            <SelectWrap>
              <Country>{t("subhead_personal_form_state.message")}*</Country>
              <SelectS
                disabled={this.props.disabled}
                showSearch
                value={this.state.state_selected}
                placeholder="Select a State"
                className={`${
                  this.props.theme == true
                    ? "Country_Select_night"
                    : "Country_Select"
                }`}
                dropdownClassName="country_select_drop"
                optionFilterProp="children"
                onChange={this.handleChangeState}
                onBlur={this.handleBlur}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {allStates.map((state, index) => (
                  <Option key={state.id} value={state.name}>
                    {state.name}
                  </Option>
                ))}
              </SelectS>
            </SelectWrap>
          </Col>
          <Col sm={24} md={8} xl={8} xxl={8}>
            <SelectWrap>
              <Country>{t("subhead_personal_form_city.message")}*</Country>
              <SelectS
                disabled={this.props.disabled}
                showSearch
                value={this.state.city_selected}
                placeholder="Select a City"
                className={`${
                  this.props.theme == true
                    ? "Country_Select_night"
                    : "Country_Select"
                }`}
                dropdownClassName="country_select_drop"
                optionFilterProp="children"
                onChange={this.handleChangeCity}
                onBlur={this.handleBlur}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {allCities.map((city, index) => (
                  <Option key={city.id} value={city.name}>
                    {city.name}
                  </Option>
                ))}
              </SelectS>
            </SelectWrap>
          </Col>
        </Row>
      </CountryWrap>
    );
  }
}

export default translate("edit_profile_titles")(CountryPick);
