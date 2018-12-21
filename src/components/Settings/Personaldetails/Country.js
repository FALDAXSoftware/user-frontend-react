import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Select } from 'antd';
import { globalVariables } from '../../../Globals';

let { API_URL } = globalVariables;
const Option = Select.Option;
var Countries = [];

export default class CountryPick extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countries: [],
            country_selected: "",
            CSS: '',
            theme: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(value) {
        /*  console.log(`selected ${value}`); */
        this.setState({ country_selected: value });
        this.props.onCountryChange(value, "country");
    }

    handleBlur() {
        /* console.log('blur'); */
    }
    componentDidMount() {
        fetch(API_URL + '/users/countries', {
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
                /* console.log(responseData) */
                Countries = responseData.data;
            });

        if (this.props.theme !== undefined) {
            if (this.props.theme !== this.state.theme) {
                if (this.props.theme == false) {
                    this.setState({ CSS: "Country_Select" });
                } else {
                    this.setState({ CSS: "Country_Select_night" })
                }
            }
        }
    }

    render() {
        return (
            <Select
                showSearch
                value={this.state.country_selected !== "" ? this.state.country_selected : (this.props.kyc == "kyc" ? "" : this.props.profileDetails.country)}
                placeholder="Select a Country"
                className={this.state.CSS}
                dropdownClassName="country_select_drop"
                optionFilterProp="children"
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
                {this.state.countries.map((country, index) => <Option key={index} value={country.name}>{country.name}</Option>)}
            </Select>
        );
    }
}
