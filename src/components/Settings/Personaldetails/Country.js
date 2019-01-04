import React, { Component } from 'react';
import 'antd/dist/antd.css';
import styled from 'styled-components';
import { Select,Row,Col } from 'antd';
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
`
export default class CountryPick extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countries: [],
            country_selected: "",
            state_selected:'',
            city_selected:'',
            CSS: '',
            theme: '',
            states:[],
            cities:[]
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeState = this.handleChangeState.bind(this);
        this.handleChangeCity = this.handleChangeCity.bind(this);
    }

    handleChange(value,position) {
         console.log(`selected ${value}`);

        this.setState({ country_selected: value });
        var newPosition = Number(position.key)+1;
        var states = CountryData.getStatesOfCountry(newPosition);
        this.setState({states})
        console.log("state",states,newPosition);
        
    }
    handleChangeState(value,position)
    {
        console.log(value,position)
        this.setState({ state_selected: value });
        var newPosition = Number(position.key)+1;
        var cities = CountryData.getCitiesOfState(newPosition,);
        this.setState({cities})
    }
    handleChangeCity(value,position)
    {
        console.log(value,position)
        this.setState({ city_selected: value });
        this.props.onCountryChange(this.state.country_selected,this.state.state_selected,value);
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
            console.log(allCountries)
            this.setState({ countries: allCountries, fetching: false, callOnce: true });
    }

    render() {
        return (
            <Row>
                <Col md={8} xl={8}>
                    <Country>Country*</Country>
                    <SelectS
                        showSearch
                        value={this.state.country_selected !== "" ? this.state.country_selected : (this.props.kyc == "kyc" ? "" : this.props.profileDetails.country)}
                        placeholder="Select a Country"
                        className="Country_Select"
                        dropdownClassName="country_select_drop"
                        optionFilterProp="children"
                        onChange={this.handleChange}
                        onBlur={this.handleBlur}
                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                        {this.state.countries.map((country, index) => <Option key={index} value={country.name}>{country.name}</Option>)}
                    </SelectS>
                </Col>
                <Col md={8} xl={8}>
                        <Country>State*</Country>
                        <SelectS
                                showSearch
                                value={this.state.state_selected !== "" ? this.state.state_selected : (this.props.kyc == "kyc" ? "" : this.props.profileDetails.state)}
                                placeholder="Select a State"
                                className="Country_Select"
                                dropdownClassName="country_select_drop"
                                optionFilterProp="children"
                                onChange={this.handleChangeState}
                                onBlur={this.handleBlur}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                {this.state.states.map((state, index) => <Option key={index} value={state.name}>{state.name}</Option>)}
                        </SelectS>
                </Col>
                <Col md={8} xl={8}>
                        <Country>City*</Country>
                        <SelectS
                                showSearch
                                value={this.state.city_selected !== "" ? this.state.city_selected : (this.props.kyc == "kyc" ? "" : this.props.profileDetails.city_town)}
                                placeholder="Select a Country"
                                className="Country_Select"
                                dropdownClassName="country_select_drop"
                                optionFilterProp="children"
                                onChange={this.handleChangeCity}
                                onBlur={this.handleBlur}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                {this.state.cities!==null?this.state.cities.map((city, index) => <Option key={index} value={city.name}>{city.name}</Option>):''}
                        </SelectS>
                </Col>
            </Row>
        );
    }
}
