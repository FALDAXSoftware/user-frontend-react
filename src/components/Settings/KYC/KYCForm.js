import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { connect } from "react-redux"
import { Col, notification, Spin } from 'antd';
import styled from 'styled-components';
import SimpleReactValidator from 'simple-react-validator';
import moment from 'moment';
import {
    Spin_Ex, Save, Fifth_Row, Postal, City, Fourth_Row, Street_input, Street_Address,
    Third_Row, Date_birth, Country_input, Country, Second_Row, Last_input, Last_name,
    First_Msg, First_input, First_name, First_Row, Right_Col
} from '../Personaldetails/PersonalDetails'
import { IntlTelInputS } from "../../../styled-components/landingCategories/contactStyle"
import Datepicker from "../Personaldetails/Datepicker"
import CountryPick from "../Personaldetails/Country"
import { kycFormAction, kycformData } from "../../../Actions/Settings/passwordChange"
import FaldaxLoader from '../../../shared-components/FaldaxLoader';
import { globalVariables } from "../../../Globals"
import 'react-intl-tel-input/dist/main.css';

let { API_URL } = globalVariables;
const KYC_form = styled.div`
    width:50%;
    margin-left:auto;
    margin-right:auto;
    margin-top:55px;
`
const Save_kyc = styled(Save)`
    margin-left:0px;
    @media(max-width:992px)
    {
        width:70px;
    }
`
const Fifth_Row_kyc = styled(Fifth_Row)`
    text-align:center
`
const Postal_kyc = styled(Postal)`
    @media(max-width:767px)
    {
        margin-top:0px;
    }
`
const City_kyc = styled(City)`
`
const Fourth_Row_kyc = styled(Fourth_Row)`
`
const Street_input_kyc = styled(Street_input)`
`
const Street_Address_kyc = styled(Street_Address)`
`
const Street2_wrap = styled.div`
    margin-top:25px;
`
const Third_Row_kyc = styled(Third_Row)`
`
const Date_birth_kyc = styled(Date_birth)`
        @media(max-width:992px)
        {
            margin-top:0px;
        }
        @media(max-width:767px)
        {
            margin-top:25px;
        }
`
const Country_input_kyc = styled(Country_input)``
const Country_kyc = styled(Country)``
const Second_Row_kyc = styled(Second_Row)``
const Last_input_kyc = styled(Last_input)`
`
const Zip = styled(Last_input)`
    width:95%;
    @media(max-width:991px)
    {
        width:95%;  
    }
    @media(max-width:767px)
    {
        width:100%;  
    }
`
const Last_name_kyc = styled(Last_name)``
const First_Msg_kyc = styled(First_Msg)`
`
const PhoneDiv = styled.div`
>.intl-tel-input 
{
    width:95%;

    @media(max-width:992px)
    {
        width:95%;
    }
    @media(max-width:767px)
    {
        width:100%;
    }
}   
& .form-control     
{
    border:1px solid #e2e6ea;
    background-color:${props => props.theme.mode == "dark" ? "#020e18" : "#f8f8f8"};
    color:${props => props.theme.mode == "dark" ? "white" : ""};
    border-radius:5px;
    min-height:45px;
    width:100%;
    padding-left:5px;
}
& .selected-dial-code
{
    color:${props => props.theme.mode == "dark" ? "white" : ""};
}
`
const Last_Msg_kyc = styled(First_Msg)``
const Country_Msg_kyc = styled(First_Msg)``
const Dob_Msg_kyc = styled(First_Msg)``
const Street_Msg_kyc = styled(First_Msg)``
const City_Msg_kyc = styled(First_Msg)``
const Postal_Msg_kyc = styled(First_Msg)``
const First_input_kyc = styled(First_input)``
const First_name_kyc = styled(First_name)``
const First_Row_kyc = styled(First_Row)``
const Right_Col_kyc = styled(Right_Col)`
`
const Sixth_Row_kyc = styled(Fourth_Row)``
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
            mobile: '',
            displayCountry: false,
            fields: {
                first_name: '',
                last_name: '',
                country: '',
                address: '',
                address_2: '',
                city_town: '',
                zip: '',
                state: '',
                phone_number: '',
            }
        };
        this.validator = new SimpleReactValidator({
            firstname: { // name the rule
                message: 'First Name should have min. 2 and max. 15 characters and no special characters are allowed', // give a message that will display when there is an error. :attribute will be replaced by the name you supply in calling it.
                rule: function (val, options) { // return true if it is succeeds and false it if fails validation. the _testRegex method is available to give back a true/false for the regex and given value
                    // check that it is a valid IP address and is not blacklisted
                    var re = /^[a-zA-Z0-9]{2,15}$/
                    var bool = re.test(String(val).toLowerCase());
                    return bool;
                }
            },
            lastname: { // name the rule
                message: 'Last Name should have min. 2 and max. 15 characters and no special characters are allowed', // give a message that will display when there is an error. :attribute will be replaced by the name you supply in calling it.
                rule: function (val, options) { // return true if it is succeeds and false it if fails validation. the _testRegex method is available to give back a true/false for the regex and given value
                    // check that it is a valid IP address and is not blacklisted
                    var re = /^[a-zA-Z0-9]{2,15}$/
                    var bool = re.test(String(val).toLowerCase());
                    return bool;
                }
            },
            onlyNumber: {// name the rule
                message: 'Only numbers are not allowed.', // give a message that will display when there is an error. :attribute will be replaced by the name you supply in calling it.
                rule: function (val, options) { // return true if it is succeeds and false it if fails validation. the _testRegex method is available to give back a true/false for the regex and given value
                    // check that it is a valid IP address and is not blacklisted
                    var re = /^[0-9]*$/
                    var bool = !re.test(String(val).toLowerCase());
                    return bool;
                },

            },
            mobileVal: {// name the rule
                message: 'Mobile No. should have only numbers.', // give a message that will display when there is an error. :attribute will be replaced by the name you supply in calling it.
                rule: function (val, options) { // return true if it is succeeds and false it if fails validation. the _testRegex method is available to give back a true/false for the regex and given value
                    // check that it is a valid IP address and is not blacklisted
                    var re = /^[0-9]*$/
                    var bool = re.test(String(val).toLowerCase());
                    return bool;
                }
            },
            zipValid: {
                message: 'Postal Code should only contain alphabets , numbers , hyphen and space .', // give a message that will display when there is an error. :attribute will be replaced by the name you supply in calling it.
                rule: function (val, options) { // return true if it is succeeds and false it if fails validation. the _testRegex method is available to give back a true/false for the regex and given value
                    // check that it is a valid IP address and is not blacklisted
                    var re = /^(?=.*[0-9a-zA-Z])[- 0-9a-zA-Z]+$/
                    var bool = re.test(String(val));
                    return bool;
                }
            }
        });
        this._onChangeFields = this._onChangeFields.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCountryName = this.onCountryName.bind(this);
    }
    componentDidMount() {
        var self = this;
        console.log(" Did Props", this.props)
        fetch(API_URL + "/users/get-kyc-detail", {
            method: "get",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: "Bearer " + this.props.isLoggedIn
            }
        })
            .then(response => response.json())
            .then((responseData) => {
                console.log(responseData, "KYC DATA");
                if (responseData.status == 200) {
                    let fields = {};
                    fields['first_name'] = responseData.data.first_name;
                    fields['last_name'] = responseData.data.last_name;
                    fields['address'] = responseData.data.address;
                    fields['address_2'] = responseData.data.address_2;
                    fields['zip'] = responseData.data.zip;
                    fields['city_town'] = responseData.data.city_town;
                    fields['country'] = responseData.data.country;
                    fields['state'] = responseData.data.state;
                    fields['dob'] = responseData.data.dob;
                    fields['country_code'] = responseData.data.country_code;
                    if (responseData.data.phone_number) {
                        fields['phone_number'] = responseData.data.phone_number;
                        let phone = responseData.data.phone_number.split("-")[1];
                        let arr = [];
                        arr.push(responseData.data.country_code)
                        console.log("Mobile", phone)
                        this.setState({
                            displayCountry: true,
                            countrychange: true,
                            mobile: phone,
                            phoneCountry: arr
                        });
                    }
                    console.log(responseData.data)
                    this.setState({
                        fields: fields,
                        kycData: responseData.data
                    });
                }
            })
            .catch(error => { })

    }
    componentWillReceiveProps(props, newProps) {
        console.log("WIll", this.props);
        console.log(props, newProps);
    }
    onDateChange(value) {
        var tempDate = value.day + "/" + value.month + "/" + value.year;
        console.log(value)
        if ((value.day !== "" && value.day !== undefined) && (value.year !== undefined && value.year !== "") && (value.month !== undefined && value.month !== "")) {
            var date = moment.utc(tempDate).local().format("DD-MM-YYYY");
            let fields = this.state.fields;
            fields['dob'] = date;
            this.setState({ fields });
        }
        else {
            let fields = this.state.fields;
            fields['dob'] = "";
            this.setState({ fields });
        }
    }
    onCountryName(name) {
        var name2 = name.toLowerCase();
        var arr = [];
        arr.push(name2);
        let fields = this.state.fields;
        console.log("COuntry >>>>", arr)
        fields['country_code'] = name2;
        if (name2 == 'us' || name2 == 'ca')
            this.setState({ fields, phoneCountry: arr, countrychange: true, showSSN: true });
        else
            this.setState({ fields, phoneCountry: arr, countrychange: true });
    }
    onCountryChange(country, state, city, stateID, countryID) {
        let self = this;
        let fields = this.state.fields;
        fields['country'] = country !== null ? country : "";
        fields['state'] = state !== null ? state : "";
        fields['city_town'] = city !== null ? city : '';
        fields['state_id'] = stateID;
        fields['country_id'] = countryID;
        this.setState({ fields }, () => {
            // To rerender the mobile input field
            self.setState({
                displayCountry: false,
            }, () => {
                self.setState({
                    displayCountry: true,
                });
            });
        });
    }
    openNotificationWithIcon(type, head, desc) {
        notification[type]({
            message: head,
            description: desc,
        });
    };
    componentWillReceiveProps(props, newProps) {
        if (props.kycData !== undefined && props.kycData !== "") {
            if (props.kycData.status == 200) {
                //this.openNotificationWithIcon("success","KYC",props.kycData.message)
                this.props.kycformData();
                this.props.next_step(1, null, this.state.showSSN);
            } else {
                this.openNotificationWithIcon("error", "KYC", props.kycData.err)
                this.props.kycformData();
            }
        }
    }
    _onChangeFields(e) {
        let fields = this.state.fields;
        let field = e.target.name;

        if (e.target.value.trim() == "") {
            fields[field] = "";
        } else {
            fields[field] = e.target.value;
        }
        this.setState({ fields });
    }
    _changeNumber(a, mob, code) {
        if (mob.trim !== "") {
            var temp = `+${code.dialCode}-`;
            var mobile = temp.concat(mob);;
            let fields = this.state.fields;
            fields['phone_number'] = mobile;
            console.log("Mobile", mob)
            this.setState({ fields, mobile: mob });
        }
    }
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
        let countryBool = this.validator.message('country', this.state.fields.country, 'required', 'text-danger-validation') ? true : false,
            stateBool = this.validator.message('state', this.state.fields.state, 'required', 'text-danger-validation') ? true : false,
            cityBool = this.validator.message('city', this.state.fields.city_town, 'required', 'text-danger-validation') ? true : false;
        let countrymsg;
        if (countryBool == true && stateBool == false && cityBool == false) {
            countrymsg = "Country Field is required."
        }
        else if (countryBool == true && stateBool == true && cityBool == false) {
            countrymsg = "Country and State Fields are required."
        }
        else if (countryBool == true && stateBool == true && cityBool == true) {
            countrymsg = "Country , State and City Fields are required."
        }
        else if (countryBool == false && stateBool == true && cityBool == false) {
            countrymsg = "State Field is required."
        }
        else if (countryBool == false && stateBool == true && cityBool == true) {
            countrymsg = "State and City Fields are required."
        }
        else if (countryBool == false && stateBool == false && cityBool == true) {
            countrymsg = "City Field is required."
        }
        else if (countryBool == true && stateBool == false && cityBool == true) {
            countrymsg = "Country and City Fields are required."
        }
        return (
            <KYC_form>
                <Right_Col_kyc>

                    <First_Row_kyc>
                        <Col md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 12 }} xxl={{ span: 12 }}>
                            <First_name_kyc>First Name*</First_name_kyc>
                            {/*      {console.log(this.props.profileDetails.first_name)} */}
                            <First_input_kyc value={this.state.fields.first_name} name="first_name" onChange={this._onChangeFields} placeholder="First Name" />
                            {this.validator.message('first_name', this.state.fields.first_name, 'required|firstname|onlyNumber', 'text-danger-validation', { required: "First Name field is required." })}
                        </Col>
                        <Col md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 12 }} xxl={{ span: 12 }}>
                            <Last_name_kyc>Last Name*</Last_name_kyc>
                            <Last_input_kyc value={this.state.fields.last_name} name="last_name" onChange={this._onChangeFields} placeholder="Last Name" />
                            {this.validator.message('last_name', this.state.fields.last_name, 'required|lastname|onlyNumber', 'text-danger-validation', { required: "Last Name field is required." })}
                        </Col>
                    </First_Row_kyc>

                    <Second_Row_kyc>
                        {console.log(this.state.kycData)}
                        <Col md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }} xxl={{ span: 24 }}>
                            <Date_birth_kyc>Date of Birth*</Date_birth_kyc>
                            <Datepicker kycData2={this.state.kycData} {...this.props} kyc="kyc" onDateChange={(Data) => this.onDateChange(Data)} />
                            {this.validator.message('Date of Birth', this.state.fields.dob, 'required', 'text-danger-validation', { required: "Date of Birth field is required." })}
                        </Col>
                    </Second_Row_kyc>

                    <Third_Row_kyc>
                        <Col md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }} xxl={{ span: 24 }}>
                            <Street_Address_kyc>Street Address Line 1*</Street_Address_kyc>
                            <Street_input_kyc value={this.state.fields.address} name="address" onChange={this._onChangeFields} placeholder="Street Address" />
                            {this.validator.message('street_address', this.state.fields.address, 'required|max:100', 'text-danger-validation', {
                                required: "Street Address Line 1 field is required.",
                                max: "Street Address Line 1 field should have max. 100 characters "
                            })}
                        </Col>
                        <Col md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }} xxl={{ span: 24 }}>
                            <Street2_wrap>
                                <Street_Address_kyc>Street Address Line 2</Street_Address_kyc>
                                <Street_input_kyc value={this.state.fields.address_2} name="address_2" onChange={this._onChangeFields} placeholder="Street Address" autosize={{ minRows: 3, maxRows: 6 }} />
                                {this.validator.message('street_address', this.state.fields.address_2, 'max:100', 'text-danger-validation', { required: "Street Address line 2 field is required.", max: "Street Address Line 2 field should have max. 100 characters " })}
                            </Street2_wrap>
                        </Col>
                    </Third_Row_kyc>

                    <Fourth_Row_kyc>
                        <Col md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }} xxl={{ span: 24 }}>
                            {/* console.log(this.props) */}
                            <CountryPick kycData2={this.state.kycData} {...this.props} onCountryName={(name) => { this.onCountryName(name) }} kyc="kyc" isLoggedIn={this.props.simpleReducer.isLoggedIn} onCountryChange={(country, state, city, stateID, countryID) => this.onCountryChange(country, state, city, stateID, countryID)} />
                            {console.log(countryBool, stateBool, cityBool)}
                            {(countryBool == true || stateBool == true || cityBool == true) ?
                                <span style={{ color: "red" }}>{countrymsg}</span>
                                :
                                <span></span>
                            }
                        </Col>
                    </Fourth_Row_kyc>
                    {console.log("Mobile", this.state.mobile, ">>>>>", this.state.phoneCountry)}
                    {(this.state.countrychange == true) ?
                        <Sixth_Row_kyc>
                            {console.log(this.state.mobile)}
                            <Col md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }} xl={{ span: 24 }}>
                                <Postal_kyc>Mobile No.*</Postal_kyc>

                                {console.log("Mobile", this.state.mobile, ">>>>>", this.state.phoneCountry)}
                                <PhoneDiv>
                                    {
                                        this.state.displayCountry &&
                                        < IntlTelInputS value={this.state.mobile} allowDropdown={false} preferredCountries={[]} onlyCountries={this.state.phoneCountry} defaultCountry={this.state.phoneCountry[0]} separateDialCode={true}
                                            onPhoneNumberChange={(a, b, c) => this._changeNumber(a, b, c)} css={['intl-tel-input', 'form-control']} />
                                    }
                                </PhoneDiv>
                                {this.validator.message('phone_number', this.state.mobile, 'required|min:5|max:15|mobileVal', 'text-danger-validation', {
                                    required: "Mobile No. field is required.",
                                    min: "Mobile No. should have min. 5 characters.",
                                    max: "Mobile No. should have max. 15 characters."
                                })}
                            </Col>
                        </Sixth_Row_kyc>
                        :
                        ""
                    }
                    <Sixth_Row_kyc>
                        <Col md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }} xl={{ span: 24 }}>
                            <Postal_kyc>Postal Code*</Postal_kyc>
                            <Zip value={this.state.fields.zip} name="zip" onChange={this._onChangeFields} placeholder="Postal Code" />
                            {this.validator.message('postal_code', this.state.fields.zip, 'required|min:3|max:25|zipValid', 'text-danger-validation', {
                                required: "Postal code field is required.",
                                min: "Postal code should have min. 3 characters.",
                                max: "Postal code should have max. 25 characters."
                            })}
                        </Col>
                    </Sixth_Row_kyc>
                    <Fifth_Row_kyc>
                        <Col md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }} xxl={{ span: 24 }}>
                            <Save_kyc type="primary" onClick={this.onSubmit}>Next</Save_kyc>
                        </Col>
                    </Fifth_Row_kyc>
                </Right_Col_kyc>
                {(this.props.loader == true) ?
                    <FaldaxLoader />
                    : ""
                }
            </KYC_form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ...state,
        email: state.simpleReducer.profileDetails !== undefined ? state.simpleReducer.profileDetails.data[0].email : "",
        profileDetails: state.simpleReducer.profileDetails !== undefined ? state.simpleReducer.profileDetails.data[0] : "",
        isLoggedIn: state.simpleReducer.isLoggedIn !== undefined ? state.simpleReducer.isLoggedIn : "",
        kycData: state.passwordReducer.kycData !== undefined ? state.passwordReducer.kycData : "",
        loader: state.simpleReducer.loader,
        theme: state.themeReducer.theme !== undefined ? state.themeReducer.theme : ""
    }
}
const mapDispatchToProps = dispatch => ({
    kycFormAction: (is, data) => dispatch(kycFormAction(is, data)),
    kycformData: (data) => dispatch(kycformData(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(KYCForm);