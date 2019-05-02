/* In-built Packages */
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { connect } from "react-redux";
import SimpleReactValidator from 'simple-react-validator';
import { Row, Col, Input, Button, notification, Spin, Select, Radio } from 'antd';
import styled from 'styled-components';
import moment from 'moment';

/* Components */
import Datepicker from "./Datepicker"
import CountryPick from "./Country"
import { Email_req } from "COMPONENTS/LANDING/USERFORMS/Login_Form"
import { globalVariables } from "Globals"
import { profileupdateAction, removepicAction, getProfileDataAction, clearEditData } from "ACTIONS/SETTINGS/settingActions"
import { _DEFAULTPROFILE } from "CONSTANTS/images";
import FaldaxLoader from 'SHARED-COMPONENTS/FaldaxLoader';

const RadioGroup = Radio.Group;
/* Styled-Components */
const Profile_wrap = styled.div`
    width: 71%;
    margin: auto;
`
export const HeaderCol = styled(Col)`
    font-size:20px;
    font-family:"Open Sans";
    font-weight: 600;
    color: ${props => props.theme.mode == "dark" ? "white" : "#505050"};
    margin-top: 20px;
    padding-bottom: 12px;
    margin-left:0px;
    font-family: "Open Sans";
`
const Main_row = styled(Row)`
    margin-top:40px;
    margin-bottom:300px;
`
const Left_Col = styled(Col)`
`
const ImageDiv = styled.img`
    height: 160px;
    width: 160px;
`
const Image_input = styled(Input)`
    display:none !important;
`
const Image_up = styled.div`
    margin-top:30px;
`
const Image_upload = styled.label`
    color:${props => props.theme.mode == "dark" ? "#828a91" : "#0f477b"};
    cursor:pointer;
    font-family:"Open Sans";
    font-weight:600;
`
const Remove = styled.div`
    margin-top:20px;
    color:${props => props.theme.mode == "dark" ? "#828a91" : "#0f477b"};
    cursor:pointer;
    font-family:"Open Sans";
    font-weight:600;
`
export const Right_Col = styled(Col)`
    @media(max-width:992px)
    {
        margin-top: 60px;
    }
`
export const First_Row = styled(Row)`
    text-align:left;
`
export const First_name = styled.div`
    font-size: 14.007px;
    font-family: "Open Sans";
    color: ${props => props.theme.mode == "dark" ? "rgba( 152, 171, 215, 0.502 )" : "rgba( 80, 80, 80, 0.502 )"};
    -moz-transform: matrix( 0.99999985149599,0,0,0.99949238260564,0,0);
    -webkit-transform: matrix( 0.99999985149599,0,0,0.99949238260564,0,0);
    -ms-transform: matrix( 0.99999985149599,0,0,0.99949238260564,0,0);
    margin-bottom:10px;
`
export const First_input = styled(Input)`
    font-family: "Open Sans";
    font-size:16;
    font-weight:600;
    background-color:${props => props.theme.mode == "dark" ? "#020f18" : "#f8f8f8"};
    color:${props => props.theme.mode == "dark" ? "white" : ""};
    width:89%;
    border:1px solid #dadfe3;
    padding:10px;
    height:auto;
    @media(max-width:767px)
    {
        width:100%;
    }
    &:focus, &:hover{
        border-color:rgb(0, 170, 250);
        outline:0;
        box-shadow:none;
    }
`
export const First_Msg = styled(Email_req)`
    display:block;
`
export const Last_Msg = styled(First_Msg)``
export const Country_Msg = styled(First_Msg)``
export const Dob_Msg = styled(First_Msg)``
export const Street_Msg = styled(First_Msg)``
export const City_Msg = styled(First_Msg)``
export const Postal_Msg = styled(First_Msg)``
export const Last_name = styled(First_name)`
    @media(max-width:767px)
    {
        margin-top:25px;
    }
`
export const Last_input = styled(First_input)`
    width:90%;
    border:1px solid #dadfe3;
    @media(max-width:767px)
    {
        width:100%;
    }
`
export const Postal_input = styled(Last_input)`
    width:95%;
    @media(max-width:767px)
    {
        width:100%;
    }
`
export const Second_Row = styled(Row)`
    text-align:left;
    margin-top:25px;
    @media(max-width:767px)
    {
        margin-top:0px;
    }
`
export const Country = styled(First_name)`
`
export const Country_input = styled(First_input)`
    @media(max-width:992px)
    {
        width:95%;
    }
    @media(max-width:767px)
    {
        width:100%;
    }
`
export const Date_birth = styled(First_name)`
    @media(max-width:992px)
    {
        margin-top:25px;
    }
`
export const Third_Row = styled(Second_Row)`
    margin-top:25px;
    text-align:left;
`
export const Street_Address = styled(First_name)`
`
export const Street_input = styled(First_input)`
    width:95%;
    border:1px solid #dadfe3;

    @media(max-width:992px)
    {
        width:95%;
    }
    @media(max-width:767px)
    {
        width:100%;
    }
`
export const Fourth_Row = styled(Second_Row)`
    text-align:left;
    margin-top:25px;
`
export const City = styled(First_name)`
`
export const Postal = styled(First_name)`
    @media(max-width:767px)
    {
        margin-top:25px;
    }
`
export const Fifth_Row = styled(Row)`
    text-align:left;
    margin-top:50px;
`
export const Sixth_Row = styled(Row)`
text-align:left;
margin-top:25px;
& .ant-radio-wrapper
{
    color:${props => props.theme.mode == "dark" ? "white" : ""};
}
`
export const FIAT = styled(First_name)`

`
export const FIAT_Msg = styled(Postal_Msg)``
export const Save = styled(Button)`
font-size: 13.217px;
font-family: "Open Sans";
color: rgb( 255, 255, 255 );
font-weight: bold;
text-transform: uppercase;
text-align: center;
-moz-transform: matrix( 1.2195120140195,0,0,1.20991183157525,0,0);
-webkit-transform: matrix( 1.2195120140195,0,0,1.20991183157525,0,0);
-ms-transform: matrix( 1.2195120140195,0,0,1.20991183157525,0,0);  
border-radius: 24px;
background-color: rgb( 76, 132, 255 );
box-shadow: 0px 4px 10px 0px rgba(76, 132, 255, 0.33);
margin-left: 10px;
width: 15%;
height:40px;
@media(max-width:600px)
{
    width:100px;   
}

`
export const Spin_Ex = styled.div`
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
`
const Street_2_Col = styled(Col)`
    margin-top:15px; 
`
const Asterisk = styled.span`
    color:red;
`

class PersonalDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {
                first_name: null,
                last_name: null,
                dob: null,
                country: null,
                country_id: null,
                street_address: null,
                street_address_2: null,
                city_town: null,
                state: null,
                state_id: null,
                postal_code: null,
                fiat: null,
                date_format: null,
            }
        }
        this.onChangeField = this.onChangeField.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.validator = new SimpleReactValidator();
        this.handleProfile = this.handleProfile.bind(this);
    }
    componentDidMount() {
        /* console.log(this.props) */
        this.props.getProfileDataAction(this.props.isLoggedIn)
    }
    componentWillReceiveProps(props, newProps) {
        if (props.profileDetails.profile_pic !== null && props.profileDetails.profile_pic !== undefined && props.profileDetails.profile_pic !== "") {
            if (this.state.profileImg !== undefined && this.state.profileImg !== null && this.state.profileImg !== "") {
                this.setState({ profileImg: this.state.profileImg })
                /*  this.setState({ profileImg: globalVariables._AMAZONBUCKET + props.profileDetails.profile_pic }) */
            } else {
                this.setState({ profileImg: globalVariables._AMAZONBUCKET + props.profileDetails.profile_pic })
            }
        }
        if (props.profileDetails !== "" && props.profileDetails !== undefined) {
            let fields = {};
            fields = this.state.fields;
            fields.first_name = props.profileDetails.first_name;
            fields.last_name = props.profileDetails.last_name;
            fields.dob = props.profileDetails.dob;
            fields.country = props.profileDetails.country;
            fields.country_id = props.profileDetails.country_id;
            fields.street_address = props.profileDetails.street_address;
            fields.street_address_2 = props.profileDetails.street_address_2;
            fields.city_town = props.profileDetails.city_town;
            fields.state = props.profileDetails.state;
            fields.state_id = props.profileDetails.state_id;
            fields.postal_code = props.profileDetails.postal_code;
            fields.fiat = props.profileDetails.fiat;
            fields.date_format = props.profileDetails.date_format;

        }
        if (props.apiStatus == 200 && props.apiMessage == "User details updated successfully") {
            this.openNotificationWithProfile("success", "Success", "Profile updated successfully");
            this.props.clearEditData();
        }
    }
    onChangeFormat = (e) => {
        let fields = this.state.fields;
        fields['date_format'] = e.target.value;
        this.setState({ fields })
    }
    onChangeFiat = (e) => {
        let fields = this.state.fields;
        fields['fiat'] = e.target.value;
        this.setState({ fields })
    }
    onDateChange(value, field) {
        var tempDate = value.day + "/" + value.month + "/" + value.year;

        var date = moment.utc(tempDate).local().format("DD-MM-YYYY");
        let fields = this.state.fields;
        fields['dob'] = date;
        this.setState({ fields });
    }
    onCountryChange(country, state, city, stateID, countryID) {
        /* this.setState({ countrySelected: country, stateSelected: state, citySelected: city, stateID: stateID, countryID: countryID })
        var loc = {
            country: country,
            state: state,
            city: city
        }
        console.log(city)
        this.setState({ country, state, city_town: city }) */
        let fields = {};
        fields = this.state.fields;
        fields.state_id = stateID;
        fields.country_id = countryID;
        fields.country = country;
        fields.state = state;
        fields.city_town = city;
        this.setState({ fields })
    }
    handleProfile(e) {
        try {
            const reader = new FileReader();
            const file = e.target.files[0];
            const fileType = e.target.files[0] && e.target.files[0].type ? e.target.files[0].type.substring(0, e.target.files[0].type.indexOf('/')) : '';
            const fileSize = e.target.files[0] && e.target.files[0].size ? e.target.files[0].size : 0;
            //check file size to max 5mb (5*1024*1024=5242880) and type image
            if (fileType === 'image' && fileSize < 5242880) {
                reader.onload = (upload) => {
                    this.setState({
                        profileImg: upload.target.result,
                        imageName: file.name,
                        imageType: file.type,
                        profileImage: file,
                        imagemsg: "", remove_pic: false
                    });
                };
            } else {
                if (file !== undefined)
                    this.openNotificationWithProfile("error", "Error", "Please upload only images");
            }

            reader.readAsDataURL(file);
        } catch (error) {
            this.setState({ imagemsg: 'Something went wrong please try again' });
        }
    }
    removePic() {
        /* this.removeNotification("warning"); */
        document.getElementById("file").value = "";
        if (this.state.profileImg !== _DEFAULTPROFILE) {
            this.setState({ remove_pic: true, profileImg: _DEFAULTPROFILE, profileImage: undefined })
        }
        /* 
        this.props.removepicAction(this.props.isLoggedIn, formData) */
    }
    openNotificationWithIcon = (type) => {
        notification[type]({
            message: 'Updating Profile',
            description: 'Please wait...',
            duration: 3,
        });
    };
    openNotificationWithProfile = (type, head, desc) => {
        notification[type]({
            message: head,
            description: desc,
            duration: 3,
        });
    };
    removeNotification = (type) => {
        notification[type]({
            message: 'Removing profile picture',
            description: 'Please wait...',
            duration: 3,
        });
    }
    onChangeField(e) {
        let fields = this.state.fields;
        var name = e.target.name;
        var value = e.target.value;
        if (value.trim !== "") {
            fields[name] = value;
        }
        else {
            fields[name] = "";
        }
        this.setState({ fields });
    }
    submitForm() {
        if (this.validator.allValid()) {
            let { fields } = this.state;
            const profileData = new FormData();
            this.setState({ profileImg: undefined, profileImage: undefined, remove_pic: false })
            if (this.state.profileImage !== null && this.state.profileImage !== undefined && !this.state.profileImg.includes("def_profile.jpg")) {
                profileData.append('profile_pic', this.state.profileImage)
            }

            profileData.append('first_name', fields.first_name);
            profileData.append('country', fields.country);
            profileData.append('country_id', fields.country_id);
            profileData.append('state', fields.state);
            profileData.append('state_id', fields.state_id);
            profileData.append('last_name', fields.last_name);
            profileData.append('city_town', fields.city_town);
            profileData.append('street_address', fields.street_address)
            profileData.append('street_address_2', fields.street_address_2);
            profileData.append('postal_code', fields.postal_code);
            profileData.append('fiat', fields.fiat)
            profileData.append('date_format', fields.date_format)
            this.props.profileupdateAction(this.props.isLoggedIn, profileData);
        } else {
            this.validator.showMessages();
            // rerender to show messages for the first time
            this.forceUpdate();
        }
    }
    render() {
        let firstname = `${this.props.profileDetails.first_name}`
        const { profileDetails } = this.props;
        const { fields } = this.state;
        var me = this;

        return (
            <Profile_wrap>
                <Row>
                    <Col span={6} />
                    <HeaderCol span={12}>
                        <span>Personal Details</span>
                    </HeaderCol>
                </Row>
                <Main_row>
                    <Col>
                        <Row>
                            <Left_Col md={{ span: 24 }} lg={{ span: 6 }} xl={{ span: 6 }} xxl={{ span: 6 }}>
                                <div><ImageDiv src={this.state.profileImg} /></div>
                                <div><Image_input type="file" onChange={this.handleProfile} name="file" id="file" /><Image_up><Image_upload htmlFor="file">Upload New Photo</Image_upload></Image_up></div>

                                {(this.state.remove_pic !== true && ((this.props.profileDetails.profile_pic) ? (!this.props.profileDetails.profile_pic.includes("def_profile.jpg") ||
                                    ((this.state.profileImg !== undefined) ? !this.state.profileImg.includes("def_profile.jpg") : true)) ? <Remove onClick={this.removePic.bind(this)}>Remove</Remove> : "" : ""))}
                            </Left_Col>
                            <Right_Col md={{ span: 24 }} lg={{ span: 15, offset: 3 }} xl={{ span: 15, offset: 3 }} xxl={{ span: 15, offset: 3 }}>
                                <First_Row>
                                    <Col md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 12 }} xxl={{ span: 12 }}>
                                        <First_name>First Name*</First_name>
                                        <First_input value={fields.first_name !== null ? fields.first_name : profileDetails.first_name} name="first_name" onChange={this.onChangeField} placeholder="First Name" />
                                        {this.validator.message('first_name', fields.first_name !== null ? fields.first_name : profileDetails.first_name, 'required|alpha_num|min:2|max:60', 'text-danger-validation')}
                                    </Col>
                                    <Col md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 12 }} xxl={{ span: 12 }}>
                                        <Last_name>Last Name*</Last_name>
                                        <Last_input value={fields.last_name !== null ? fields.last_name : profileDetails.last_name} name="last_name" onChange={this.onChangeField} placeholder="Last Name" />
                                        {this.validator.message('last_name', fields.last_name !== null ? fields.last_name : profileDetails.last_name, 'required|alpha_num|min:2|max:60', 'text-danger-validation')}
                                    </Col>
                                </First_Row>
                                <Second_Row>
                                    <Col md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }} xxl={{ span: 24 }}>
                                        <Date_birth>Date of Birth*</Date_birth>
                                        <Datepicker {...this.props} onDateChange={(value, field) => this.onDateChange(value, field)} />
                                        {this.validator.message('dob', fields.dob !== null ? fields.dob : profileDetails.dob, 'required', 'text-danger-validation')}
                                    </Col>
                                </Second_Row>
                                <Third_Row>
                                    <Col md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }} xxl={{ span: 24 }}>
                                        <Street_Address>Street Address Line 1*</Street_Address>
                                        <Street_input value={fields.street_address !== null ? fields.street_address : profileDetails.street_address} name="street_address" onChange={this.onChangeField} placeholder="Street Address" />
                                        {this.validator.message('street_address', fields.street_address !== null ? fields.street_address : profileDetails.street_address, 'required', 'text-danger-validation')}
                                    </Col>
                                </Third_Row>
                                <Third_Row>
                                    <Street_Address>Street Address Line 2</Street_Address>
                                    <Street_input value={fields.street_address_2 !== null ? fields.street_address_2 : profileDetails.street_address_2} name="street_address_2" onChange={this.onChangeField} placeholder="Street Address" autosize={{ minRows: 3, maxRows: 6 }} />
                                </Third_Row>
                                <Fourth_Row>
                                    <Col md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }} xxl={{ span: 24 }}>
                                        <CountryPick {...this.props} onCountryChange={(country, state, city, stateID, countryID) => this.onCountryChange(country, state, city, stateID, countryID)} />
                                        <span>{this.validator.message('country', fields.country !== null ? fields.country : profileDetails.country, 'required', 'text-danger-validation')}
                                            {this.validator.message('state', fields.state !== null ? fields.state : profileDetails.state, 'required', 'text-danger-validation')}
                                            {this.validator.message('city', fields.city_town !== null ? fields.city_town : profileDetails.city_town, 'required', 'text-danger-validation')}</span>
                                    </Col>
                                </Fourth_Row>
                                <Fourth_Row>
                                    <Col md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }} >
                                        <Postal>Postal Code*</Postal>
                                        <Postal_input value={fields.postal_code !== null ? fields.postal_code : profileDetails.postal_code} name="postal_code" onChange={this.onChangeField} placeholder="Postal Code" />
                                        {this.validator.message('postal_code', fields.postal_code !== null ? fields.postal_code : profileDetails.postal_code, 'required', 'text-danger-validation')}
                                    </Col>
                                </Fourth_Row>
                                <Sixth_Row>
                                    <Col md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }} xxl={{ span: 24 }}>
                                        <FIAT>Default Currency*</FIAT>
                                        <RadioGroup onChange={this.onChangeFiat} value={fields.fiat !== null ? fields.fiat : profileDetails.fiat}>
                                            <Radio value={"USD"}>USD</Radio>
                                            <Radio value={"INR"}>INR</Radio>
                                            <Radio value={"EUR"}>EUR</Radio>
                                        </RadioGroup>
                                        {this.validator.message('fiat', fields.fiat !== null ? fields.fiat : profileDetails.fiat, 'required', 'text-danger-validation')}
                                    </Col>
                                </Sixth_Row>
                                <Sixth_Row>
                                    <Col md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }} xxl={{ span: 24 }}>
                                        <FIAT>Default Date Format*</FIAT>
                                        <RadioGroup onChange={this.onChangeFormat} value={fields.date_format !== null ? fields.date_format : profileDetails.date_format}>
                                            <Radio value={"MM/DD/YYYY"}>MM/DD/YYYY</Radio>
                                            <Radio value={"DD/MM/YYYY"}>DD/MM/YYYY</Radio>
                                            <Radio value={"MMM DD,YYYY"}>MMM DD,YYYY</Radio>
                                        </RadioGroup>
                                        {this.validator.message('fiat', fields.date_format !== null ? fields.date_format : profileDetails.date_format, 'required', 'text-danger-validation')}
                                    </Col>
                                </Sixth_Row>
                                <Fifth_Row>
                                    <Col md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }} xxl={{ span: 24 }}>
                                        <Save type="primary" onClick={this.submitForm}>Save</Save>
                                    </Col>
                                </Fifth_Row>
                            </Right_Col>
                            {(this.props.loader == true) ?
                                <FaldaxLoader />
                                : ""
                            }
                        </Row>
                    </Col>
                </Main_row>
            </Profile_wrap>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        ...state,
        email: state.simpleReducer.profileDetails !== undefined ? state.simpleReducer.profileDetails.data[0].email : "",
        profileDetails: state.simpleReducer.profileDetails !== undefined ? state.simpleReducer.profileDetails.data[0] : "",
        loader: state.simpleReducer.loader,
        apiStatus: state.simpleReducer.update !== undefined ? state.simpleReducer.update.status : "",
        apiMessage: state.simpleReducer.update !== undefined ? state.simpleReducer.update.message : ""
    }
}
const mapDispatchToProps = dispatch => ({
    profileupdateAction: (isLoggedIn, form) => dispatch(profileupdateAction(isLoggedIn, form)),
    getProfileDataAction: (isLoggedIn) => dispatch(getProfileDataAction(isLoggedIn)),
    removepicAction: (isLoggedIn, form) => dispatch(removepicAction(isLoggedIn, form)),
    clearEditData: () => dispatch(clearEditData())
})

export default connect(mapStateToProps, mapDispatchToProps)(PersonalDetails);
