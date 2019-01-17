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
import Datepicker from "../Personaldetails/Datepicker"
import CountryPick from "../Personaldetails/Country"
import { kycFormAction, kycformData } from "../../../Actions/Settings/passwordChange"

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
            fields: {
                first_name: '',
                last_name: '',
                country: '',
                address: '',
                address_2: '',
                city_town: '',
                zip: '',
                state: ''
            }
        };
        this.validator = new SimpleReactValidator();
        this._onChangeFields = this._onChangeFields.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onDateChange(value) {
        var tempDate = value.day + "/" + value.month + "/" + value.year;
        if ((value.day !== "" && value.day !== undefined) && (value.year !== undefined && value.year !== "") && (value.month !== undefined && value.month !== "")) {
            var date = moment.utc(tempDate).local().format("DD-MM-YYYY");
            let fields = this.state.fields;
            fields['dob'] = date;
            this.setState({ fields });
        }
    }
    onCountryChange(country, state, city, stateID, countryID) {
        let fields = this.state.fields;
        fields['country'] = country !== null ? country : "";
        fields['state'] = state !== null ? state : "";
        fields['city_town'] = city !== null ? city : '';
        fields['state_id'] = stateID;
        fields['country_id'] = countryID;
        this.setState({ fields });
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
                this.props.next_step(1);
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
        return (
            <KYC_form>
                <Right_Col_kyc>

                    <First_Row_kyc>
                        <Col md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 12 }} xxl={{ span: 12 }}>
                            <First_name_kyc>First Name*</First_name_kyc>
                            {/*      {console.log(this.props.profileDetails.first_name)} */}
                            <First_input_kyc name="first_name" onChange={this._onChangeFields} placeholder="First Name" />
                            {this.validator.message('first_name', this.state.fields.first_name, 'required|alpha_num', 'text-danger-validation')}
                        </Col>
                        <Col md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 12 }} xxl={{ span: 12 }}>
                            <Last_name_kyc>Last Name*</Last_name_kyc>
                            <Last_input_kyc name="last_name" onChange={this._onChangeFields} placeholder="Last Name" />
                            {this.validator.message('last_name', this.state.fields.last_name, 'required|alpha_num', 'text-danger-validation')}
                        </Col>
                    </First_Row_kyc>

                    <Second_Row_kyc>

                        <Col md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }} xxl={{ span: 24 }}>
                            <Date_birth_kyc>Date of Birth*</Date_birth_kyc>
                            <Datepicker {...this.props} kyc="kyc" onDateChange={(Data) => this.onDateChange(Data)} />
                            {this.validator.message('dob', this.state.fields.dob, 'required', 'text-danger-validation')}
                        </Col>
                    </Second_Row_kyc>

                    <Third_Row_kyc>
                        <Col md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }} xxl={{ span: 24 }}>
                            <Street_Address_kyc>Street Address Line 1*</Street_Address_kyc>
                            <Street_input_kyc name="address" onChange={this._onChangeFields} placeholder="Street Address" />
                            {this.validator.message('street_address', this.state.fields.address, 'required', 'text-danger-validation')}
                        </Col>
                        <Col md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }} xxl={{ span: 24 }}>
                            <Street2_wrap>
                                <Street_Address_kyc>Street Address Line 2</Street_Address_kyc>
                                <Street_input_kyc name="address_2" onChange={this._onChangeFields} placeholder="Street Address" autosize={{ minRows: 3, maxRows: 6 }} />
                            </Street2_wrap>
                        </Col>
                    </Third_Row_kyc>

                    <Fourth_Row_kyc>
                        <Col md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }} xxl={{ span: 24 }}>
                            {/* console.log(this.props) */}
                            <CountryPick {...this.props} kyc="kyc" isLoggedIn={this.props.simpleReducer.isLoggedIn} onCountryChange={(country, state, city, stateID, countryID) => this.onCountryChange(country, state, city, stateID, countryID)} />
                            <span>{this.validator.message('country', this.state.fields.country, 'required', 'text-danger-validation')}
                                {this.validator.message('state', this.state.fields.state, 'required', 'text-danger-validation')}
                                {this.validator.message('city', this.state.fields.city_town, 'required', 'text-danger-validation')}</span>
                        </Col>
                    </Fourth_Row_kyc>
                    <Sixth_Row_kyc>
                        <Col md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }} xl={{ span: 24 }}>
                            <Postal_kyc>Postal Code*</Postal_kyc>
                            <Zip name="zip" onChange={this._onChangeFields} placeholder="Postal Code" />
                            {this.validator.message('postal_code', this.state.fields.zip, 'required', 'text-danger-validation')}
                        </Col>
                    </Sixth_Row_kyc>
                    <Fifth_Row_kyc>
                        <Col md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }} xxl={{ span: 24 }}>
                            <Save_kyc type="primary" onClick={this.onSubmit}>Next</Save_kyc>
                        </Col>
                    </Fifth_Row_kyc>
                </Right_Col_kyc>
                {(this.props.loader == true) ?
                    <Spin_Ex className="Ex_spin">
                        <Spin size="large" />
                    </Spin_Ex>
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