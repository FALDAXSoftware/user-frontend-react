import React, { Component } from 'react';
import 'antd/dist/antd.css';
import styled from 'styled-components';
import { Select, Row, Col } from 'antd';
import { globalVariables } from '../../../Globals';
import CountryData from 'country-state-city';

let { API_URL } = globalVariables;
const Option = Select.Option;
var Countries = [];

const Country = styled.span`
    font-size: 14.007px;
    font-family: "Open Sans";
    color: ${props => props.theme.mode == "dark" ? "rgba( 152, 171, 215, 0.502 )" : "rgba( 80, 80, 80, 0.502 )"};
    -moz-transform: matrix( 0.99999985149599,0,0,0.99949238260564,0,0);
    -webkit-transform: matrix( 0.99999985149599,0,0,0.99949238260564,0,0);
    -ms-transform: matrix( 0.99999985149599,0,0,0.99949238260564,0,0);
    margin-bottom:10px;
    display:block;
    @media (max-width: 768px){
        margin-top: 25px;
    }
`
const SelectS = styled(Select)`
    margin-top:10px;
    & .Country_Select
    {
        width:85%;
    }
    & .Country_Select:first-child
    {
        margin-left:0px !important;
    }
    & .Country_Select > .ant-select-selection
    {
        background-color: #f8f8f8;
        width: 100%;
        border: 1px solid #dadfe3;
        padding: 5px;
        height: auto;
        font-family: "Open Sans";
        font-size:16;
        font-weight:600;
    }
    & .Country_Select > .ant-select-selection:hover,.Country_Select > .ant-select-selection:focus{
        border-color:#4c84ff;
        outline:0;
        box-shadow:none;
    }
    @media(max-width:767px)
    {
        margin-top:0px;
    }
`
const Select_wrap = styled.div`
    @media(max-width:767px)
    {
        margin-top:25px;
    }
`
const Country_wrap = styled.div`
    @media(max-width:991px)
    {
        margin-right:20px;
    }
    @media(max-width:767px)
    {
        margin-right:0px;
    }
`
export default class CountryPick extends Component {
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
            theme: '',
            states: [],
            cities: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeState = this.handleChangeState.bind(this);
        this.handleChangeCity = this.handleChangeCity.bind(this);
    }

    handleChange(value, position) {
        var newPosition = Number(position.key);
        var states = CountryData.getStatesOfCountry(newPosition);

        this.setState({ city_selected: null, state_selected: null, country_selected: value, stateID: null, countryID: newPosition, states });

        this.props.onCountryChange(value, null, null, null, null);

    }
    handleChangeState(value, position) {
        var newPosition = Number(position.key);

        var country = this.props.profileDetails.country !== undefined && this.state.country_selected == null ? this.props.profileDetails.country : this.state.country_selected;

        var stateID = this.props.profileDetails.state_id !== undefined && this.state.stateID == null ? this.props.profileDetails.state_id : newPosition;

        var countryID = this.props.profileDetails.country_id !== undefined && this.state.countryID == null ? this.props.profileDetails.country_id : this.state.countryID;

        var cities = CountryData.getCitiesOfState(newPosition);

        this.setState({ state_selected: value, city_selected: null, country_selected: country, stateID:newPosition, cities });

        this.props.onCountryChange(country, value, null, stateID, countryID);
    }
    handleChangeCity(value, position) {
        var state = this.props.profileDetails.state !== undefined && this.state.state_selected == null ? this.props.profileDetails.state : this.state.state_selected;

        var country = this.props.profileDetails.country !== undefined && this.state.country_selected == null ? this.props.profileDetails.country : this.state.country_selected;

        var stateID = this.props.profileDetails.state_id !== undefined && this.state.stateID == null ? this.props.profileDetails.state_id : this.state.stateID;

        var countryID = this.props.profileDetails.country_id !== undefined && this.state.countryID == null ?
            this.props.profileDetails.country_id : this.state.countryID;

        this.setState({ city_selected: value, stateID, countryID });
        this.props.onCountryChange(country, state, value, stateID, countryID);

    }
    handleBlur() {
        /* console.log('blur'); */
    }
    componentDidMount() {
        /*        fetch(API_URL + '/users/countries', {
                   method: "get",
                   headers: {
                       Accept: 'application/json',
                       'Content-Type': 'application/json',
                       Authorization: "Bearer " + this.props.isLoggedIn
                   }
               })
                   .then(response => response.json())
                   .then((responseData) => {
                       this.setState({ countries: responseData.data, fetching: false, callOnce: true });
                        console.log(responseData) 
                       Countries = responseData.data;
                   }); */
        let allCountries = CountryData.getAllCountries();
        this.setState({ countries: allCountries, fetching: false, callOnce: true });
        if (this.props.profileDetails.country_id !== undefined) {
            var states = CountryData.getStatesOfCountry(this.props.profileDetails.country_id);
            this.setState({ states })
            if (this.props.profileDetails.state_id !== undefined) {
                var cities = CountryData.getCitiesOfState(this.props.profileDetails.state_id);
                this.setState({ cities })
            }
        }
        if(this.props.theme!==undefined && this.props.theme!=="")
        {
            if(this.props.theme==true)
            {
                this.setState({CSS:"Country_Select_night"});
            }
            if(this.props.theme==false)
            {
                this.setState({CSS:"Country_Select"});
            }
        }
    }

    render() {
        return (
            <Country_wrap>
                <Row>
                    <Col sm={24} md={8} xl={8} xxl={8}>
                        <Country>Country*</Country>
                        <SelectS
                            showSearch
                            value={this.state.country_selected !== null ? this.state.country_selected : (this.props.kyc == "kyc" ? "" : this.props.profileDetails.country)}
                            placeholder="Select a Country"
                            className={this.state.CSS}
                            dropdownClassName="country_select_drop"
                            optionFilterProp="children"
                            onChange={this.handleChange}
                            onBlur={this.handleBlur}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            {this.state.countries.map((country, index) => <Option key={country.id} value={country.name}>{country.name}</Option>)}
                        </SelectS>
                    </Col>
                    <Col sm={24} md={8} xl={8} xxl={8}>
                        <Select_wrap>
                            <Country>State*</Country>
                            <SelectS
                                showSearch
                                value={this.state.state_selected !== null ? this.state.state_selected : (this.props.kyc == "kyc" ? "" : this.props.profileDetails.state)}
                                placeholder="Select a State"
                                className={this.state.CSS}
                                dropdownClassName="country_select_drop"
                                optionFilterProp="children"
                                onChange={this.handleChangeState}
                                onBlur={this.handleBlur}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                {this.state.states.map((state, index) => <Option key={state.id} value={state.name}>{state.name}</Option>)}
                            </SelectS>
                        </Select_wrap>
                    </Col>
                    <Col sm={24} md={8} xl={8} xxl={8}>
                        <Select_wrap>
                            <Country>City*</Country>
                            <SelectS
                                showSearch
                                value={this.state.city_selected !== null ? this.state.city_selected : (this.props.kyc == "kyc" ? "" : this.props.profileDetails.city_town)}
                                placeholder="Select a City"
                                className={this.state.CSS}
                                dropdownClassName="country_select_drop"
                                optionFilterProp="children"
                                onChange={this.handleChangeCity}
                                onBlur={this.handleBlur}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                {this.state.cities !== null ? this.state.cities.map((city, index) => <Option key={city.id} value={city.name}>{city.name}</Option>) : ''}
                            </SelectS>
                        </Select_wrap>
                    </Col>
                </Row>
            </Country_wrap>
        );
    }
}
