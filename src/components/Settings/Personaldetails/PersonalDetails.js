/* In-built Packages */
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { connect } from "react-redux";
import { createForm, formShape } from 'rc-form';
import { Row, Col, Input, Button, notification, Spin, Select, Radio } from 'antd';
import styled from 'styled-components';
import moment from 'moment';

/* Components */
import Datepicker from "./Datepicker"
import CountryPick from "./Country"
import { Email_req } from "../../Landing/User_forms/Login_Form"
import { globalVariables } from "../../../Globals"
import { profileupdateAction, removepicAction, getProfileDataAction, clearEditData } from "../../../Actions/Settings/settings"
import { DefaultProfile } from "../../../Constants/images";

const Option = Select.Option;
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
            profileImg: undefined,
            imageName: null,
            imageType: null,
            imagemsg: null, profileImage: null,
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
            date_format: ""
        }
        this.handleProfile = this.handleProfile.bind(this);
    }
    static propTypes = {
        form: formShape,
    };
    onChangeFormat = (e) => {
        this.setState({
            date_format: e.target.value,
        });
        console.log("date_format", e.target.value);
        this.onChangeField(e.target.value, "date_format");
    }
    onChangeFiat = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            fiat: e.target.value,
        });
        this.onChangeField(e.target.value, "fiat");
    }
    submit = () => {
        this.props.form.validateFields((error, value) => {
            let dataDate = "";
            const profileData = new FormData();
            if (error == null && this.state.fiatIcon !== false && this.state.dateFIcon !== false && this.state.firstIcon !== false && this.state.lastIcon !== false && this.state.countryIcon !== false && this.state.dobIcon !== false && this.state.street1Icon !== false && this.state.street2Icon !== false && this.state.postalIcon !== false && ((this.props.profileDetails.country !== undefined && this.props.profileDetails.country !== '' && this.props.profileDetails.country !== null) || ((this.state.countrySelected !== null && this.state.countrySelected !== undefined && this.state.countrySelected !== '')))) {
                document.querySelectorAll(".first_msg")[0].style.display = "none";
                document.querySelectorAll(".last_msg")[0].style.display = "none";
                document.querySelectorAll(".country_msg")[0].style.display = "none";
                document.querySelectorAll(".dob_msg")[0].style.display = "none";
                document.querySelectorAll(".street1_msg")[0].style.display = "none";
                document.querySelectorAll(".street2_msg")[0].style.display = "none";
                /* document.querySelectorAll(".city_msg")[0].style.display = "none"; */
                document.querySelectorAll(".postal_msg")[0].style.display = "none";

                this.setState({ first_msg: null, last_msg: null, country_msg: null, dob_msg: null, street_msg: null, street2_msg: null, city_msg: null, postal_msg: null, spin_show: true });

                let number = value.postal_code;
                let country = this.state.countrySelected;
                if (this.state.Datedata !== undefined && this.state.Datedata !== null) {
                    dataDate = this.state.Datedata
                } else {
                    dataDate = this.props.profileDetails.dob
                }
                if (country == undefined && country == null) {
                    country = this.props.profileDetails.country ? this.props.profileDetails.country : ""
                }
                profileData.append('first_name', value.first_name);
                profileData.append('email', this.props.email);
                profileData.append('last_name', value.last_name);
                if (this.state.citySelected !== null)
                    profileData.append('city_town', this.state.citySelected);
                if (this.state.stateSelected !== null) {
                    profileData.append('state', this.state.stateSelected);
                    profileData.append('state_id', this.state.stateID);
                }
                if (this.state.countrySelected !== null) {
                    profileData.append('country', this.state.countrySelected);
                    profileData.append('country_id', this.state.countryID);
                }
                profileData.append('street_address', value.street_address)

                if (value.street_address_2 !== null && value.street_address_2 !== "" && value.street_address_2 !== undefined)
                    profileData.append('street_address_2', value.street_address_2)
                profileData.append('postal_code', number);

                var fiat = this.state.fiat !== "" ? this.state.fiat : this.props.profileDetails.fiat;
                var date_format = this.state.date_format !== "" ? this.state.date_format : this.props.profileDetails.date_format;

                profileData.append('fiat', fiat)
                profileData.append('date_format', date_format)

                if (this.state.Datedata !== undefined)
                    profileData.append('dob', this.state.Datedata);
                profileData.append('remove_pic', this.state.remove_pic)
                this.setState({ profileImg: undefined, profileImage: undefined, remove_pic: false })
                if (this.state.profileImage !== null && this.state.profileImage !== undefined && !this.state.profileImg.includes("def_profile.jpg")) {
                    profileData.append('profile_pic', this.state.profileImage)
                }
                this.props.profileupdateAction(this.props.isLoggedIn, profileData);
            } else {
                this.openNotificationWithProfile("error", "Error", "Please complete all required details to continue")
            }
            if (this.state.firstIcon == null && this.props.profileDetails.first_name == null) {
                this.setState({ firstIcon: false })
                document.querySelectorAll(".first_msg")[0].style.display = "block";
                this.setState({ firstmsg: "First Name field is required." })
            }
            if (this.state.lastIcon == null && this.props.profileDetails.last_name == null) {
                this.setState({ lastIcon: false })
                document.querySelectorAll(".last_msg")[0].style.display = "block";
                this.setState({ lastmsg: "Last Name field is required." })
            }
            if ((this.state.countryIcon == null || this.state.countryIcon == false) && (this.props.profileDetails.country == '' || this.props.profileDetails.country == null)) {
                this.setState({ countryIcon: false })
                document.querySelectorAll(".country_msg")[0].style.display = "block";
                this.setState({ countrymsg: "Country field is required." })
            }
            if (this.state.dobIcon == null && this.state.Datedata == undefined && this.props.profileDetails.dob == null) {
                this.setState({ dobIcon: false })
                document.querySelectorAll(".dob_msg")[0].style.display = "block";
                this.setState({ dobmsg: "Date of Birth is required." })
            }
            if (this.state.street1Icon == null && this.props.profileDetails.street_address == null) {
                this.setState({ street1Icon: false })
                document.querySelectorAll(".street1_msg")[0].style.display = "block";
                this.setState({ street1msg: "Street Address is required." })
            }
            /* if (this.state.street2Icon == null && this.props.profileDetails.street_address_2 == null) {
                this.setState({ street2Icon: false })
                document.querySelectorAll(".street2_msg")[0].style.display = "block";
                this.setState({ street2msg: "Street Address is required" })
            } */
            if (this.state.postalIcon == null && this.props.profileDetails.postal_code == null) {
                this.setState({ postalIcon: false })
                document.querySelectorAll(".postal_msg")[0].style.display = "block";
                this.setState({ postalmsg: "Postal Code is required." })
            }
            console.log(this.state.fiatIcon, this.props.profileDetails)
            if (this.state.fiatIcon == false && this.props.profileDetails.fiat == "") {

                console.log(this.props.profileDetails)
                this.setState({ fiatIcon: false })
                document.querySelectorAll(".fiat_msg")[0].style.display = "block";
                this.setState({ fiatmsg: "currency is required." })
            }
            console.log(this.state.dateFIcon, this.props.profileDetails.date_format)
            if (this.state.dateFIcon !== true && this.props.profileDetails.date_format == "") {
                console.log(this.props.profileDetails)
                this.setState({ dateFIcon: false })
                document.querySelectorAll(".df_msg")[0].style.display = "block";
                this.setState({ dfmsg: "currency is required." })
            }
        });
    }

    componentDidMount() {
        if (this.props.profileDetails !== undefined) {
            this.setState({

            })
        }
    }
    onDateChange(value, field) {
        var tempDate = value.day + "/" + value.month + "/" + value.year;

        var date = moment.utc(tempDate).local().format("DD-MM-YYYY");
        this.setState({ Datedata: date })
        this.onChangeField(value, field);
    }
    onCountryChange(country, state, city, stateID, countryID) {
        this.setState({ countrySelected: country, stateSelected: state, citySelected: city, stateID: stateID, countryID: countryID })
        var loc = {
            country: country,
            state: state,
            city: city
        }
        this.onChangeField(loc, 'country');
    }
    componentDidMount() {
        /* console.log(this.props) */
        this.props.getProfileDataAction(this.props.isLoggedIn)
    }
    componentWillReceiveProps(props, newProps) {
        if (props.profileDetails.profile_pic !== null && props.profileDetails.profile_pic !== undefined && props.profileDetails.profile_pic !== "") {
            if (this.state.profileImg !== undefined && this.state.profileImg !== null && this.state.profileImg !== "") {
                this.setState({ profileImg: this.state.profileImg })
                /*  this.setState({ profileImg: globalVariables.amazon_Bucket + props.profileDetails.profile_pic }) */
            } else {
                this.setState({ profileImg: globalVariables.amazon_Bucket + props.profileDetails.profile_pic })
            }
        }
        if (props.apiStatus == 200 && props.apiMessage == "User details updated successfully") {
            this.openNotificationWithProfile("success", "Success", "Profile updated successfully");
            this.props.clearEditData();
        }
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
        if (this.state.profileImg !== DefaultProfile) {
            this.setState({ remove_pic: true, profileImg: DefaultProfile, profileImage: undefined })
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
    onChangeField(value, field) {
        if (field !== "dob" && field !== "country")
            value = value.trim();
        if (field == "first_name") {
            value = value.trim();
            var re = /^[a-zA-Z0-9]{2,15}$/;
            var bool = re.test(value);
            if (value !== "") {
                if (bool == true) {
                    var regexnum = /^[0-9]*$/;
                    if (regexnum.test(value)) {
                        this.setState({ firstIcon: false })
                        document.querySelectorAll(".first_msg")[0].style.display = "block";
                        this.setState({ firstmsg: "Only numbers are not allowed" })
                    } else {
                        this.setState({ firstIcon: true })
                        document.querySelectorAll(".first_msg")[0].style.display = "none";
                    }
                } else {
                    this.setState({ firstIcon: false })
                    document.querySelectorAll(".first_msg")[0].style.display = "block";
                    this.setState({ firstmsg: "First Name should have min. 2 and max. 15 characters and no special characters are allowed" })
                }
            } else {
                this.setState({ firstIcon: false })
                document.querySelectorAll(".first_msg")[0].style.display = "block";
                this.setState({ firstmsg: "First Name field is required" })
            }
        } else if (field == "last_name") {
            var re = /^[a-zA-Z0-9]{2,15}$/;
            var bool = re.test(value);
            if (value !== "") {
                if (bool == true) {
                    var regexnum = /^[0-9]*$/;
                    if (regexnum.test(value)) {
                        this.setState({ lastIcon: false })
                        document.querySelectorAll(".last_msg")[0].style.display = "block";
                        this.setState({ lastmsg: "Only numbers are not allowed" })
                    } else {
                        this.setState({ lastIcon: true })
                        document.querySelectorAll(".last_msg")[0].style.display = "none";
                    }
                } else {
                    this.setState({ lastIcon: false })
                    document.querySelectorAll(".last_msg")[0].style.display = "block";
                    this.setState({ lastmsg: "Last Name should have min. 2 and max. 15 characters and no special characters are allowed" })
                }
            } else {
                this.setState({ lastIcon: false })
                document.querySelectorAll(".last_msg")[0].style.display = "block";
                this.setState({ lastmsg: "Last Name field is required" })
            }
        } else if (field == "country") {
            if ((value.country !== undefined && value.country !== null) && (value.state !== null && value.state !== undefined) && (value.city !== null && value.city !== undefined)) {
                this.setState({ countryIcon: true })
                document.querySelectorAll(".country_msg")[0].style.display = "none";
            } else {
                this.setState({ countryIcon: false })
                document.querySelectorAll(".country_msg")[0].style.display = "block";
                this.setState({ countrymsg: "Country Field is required" })
            }
        } else if (field == "dob") {
            if ((value["day"]) && (value["month"]) && (value["year"])) {
                this.setState({ dobIcon: true })
                document.querySelectorAll(".dob_msg")[0].style.display = "none";
            } else {
                this.setState({ dobIcon: false })
                document.querySelectorAll(".dob_msg")[0].style.display = "block";
                this.setState({ dobmsg: "Date of Birth is required" })
            }
        } else if (field == "street_address") {
            if (value !== "") {
                if (value.length < 100) {
                    this.setState({ street1Icon: true })
                    document.querySelectorAll(".street1_msg")[0].style.display = "none";
                } else {
                    this.setState({ street1Icon: false })
                    document.querySelectorAll(".street1_msg")[0].style.display = "block";
                    this.setState({ street1msg: "Street Address limit is 100 characters" })
                }
            } else {
                this.setState({ street1Icon: false })
                document.querySelectorAll(".street1_msg")[0].style.display = "block";
                this.setState({ street1msg: "Street Address is required" })
            }
        } else if (field == "street_address_2") {
            if (value.length < 100) {
                this.setState({ street2Icon: true })
                document.querySelectorAll(".street2_msg")[0].style.display = "none";
            } else {
                this.setState({ street2Icon: false })
                document.querySelectorAll(".street2_msg")[0].style.display = "block";
                this.setState({ street2msg: "Street Address limit is 100 characters" })
            }
        } else if (field == "postal_code") {
            if (value !== "") {
                if (value.length >= 2 && value.length <= 20) {
                    this.setState({ postalIcon: true })
                    document.querySelectorAll(".postal_msg")[0].style.display = "none";
                } else {
                    this.setState({ postalIcon: false })
                    document.querySelectorAll(".postal_msg")[0].style.display = "block";
                    this.setState({ postalmsg: "Postal code should have min. 2 and max. 20 characters" })
                }
            } else {
                this.setState({ postalIcon: false })
                document.querySelectorAll(".postal_msg")[0].style.display = "block";
                this.setState({ postalmsg: "Postal Code is required" })
            }
        }
        else if (field == "fiat") {
            console.log(this.state, field, value)
            if (value !== "") {
                this.setState({ fiatIcon: true })
                document.querySelectorAll(".fiat_msg")[0].style.display = "none";
            }
            else {
                this.setState({ fiatIcon: false })
                document.querySelectorAll(".fiat_msg")[0].style.display = "block";
                this.setState({ fiatmsg: "currency is required" })
            }
        }
        else if (field == "date_format") {
            console.log("date_format", this.state, field, value)
            if (value !== "") {
                this.setState({ dateFIcon: true })
                document.querySelectorAll(".df_msg")[0].style.display = "none";
            }
            else {
                this.setState({ dateFIcon: false })
                document.querySelectorAll(".df_msg")[0].style.display = "block";
                this.setState({ dfmsg: "currency is required" })
            }
        }
    }

    render() {
        let errors;
        let firstname = `${this.props.profileDetails.first_name}`
        const { getFieldProps, getFieldError } = this.props.form;
        const { profileDetails } = this.props;
        const { citymsg, postalmsg } = this.state;
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
                                        <First_input placeholder="First Name" {...getFieldProps('first_name', {
                                            onChange(e) { me.onChangeField(e.target.value, "first_name") },
                                            initialValue: profileDetails.first_name, // have to write original onChange here if you need
                                            rules: [{ required: true }]
                                        })} />
                                        <First_Msg className="first_msg">{this.state.firstmsg}</First_Msg>
                                    </Col>
                                    <Col md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 12 }} xxl={{ span: 12 }}>
                                        <Last_name>Last Name*</Last_name>
                                        <Last_input placeholder="Last Name" {...getFieldProps('last_name', {
                                            onChange(e) { me.onChangeField(e.target.value, "last_name") },
                                            initialValue: profileDetails.last_name,// have to write original onChange here if you need
                                            rules: [{ required: true }],
                                        })} />
                                        <Last_Msg className="last_msg">{this.state.lastmsg}</Last_Msg>
                                    </Col>
                                </First_Row>
                                <Second_Row>
                                    <Col md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }} xxl={{ span: 24 }}>
                                        <Date_birth>Date of Birth*</Date_birth>
                                        <Datepicker {...this.props} onDateChange={(value, field) => this.onDateChange(value, field)} />
                                        <Dob_Msg className="dob_msg">{this.state.dobmsg}</Dob_Msg>
                                    </Col>
                                </Second_Row>
                                <Third_Row>
                                    <Col md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }} xxl={{ span: 24 }}>
                                        <Street_Address>Street Address Line 1*</Street_Address>
                                        <Street_input placeholder="Street Address" {...getFieldProps('street_address', {
                                            onChange(e) { me.onChangeField(e.target.value, "street_address") },
                                            initialValue: profileDetails.street_address, // have to write original onChange here if you need
                                            rules: [{ type: "string", required: true }],
                                        })} />
                                        <Street_Msg className="street1_msg">{this.state.street1msg}</Street_Msg>
                                    </Col>
                                </Third_Row>
                                <Third_Row>
                                    <Street_Address>Street Address Line 2</Street_Address>
                                    <Street_input placeholder="Street Address" {...getFieldProps('street_address_2', {
                                        onChange(e) { me.onChangeField(e.target.value, "street_address_2") },
                                        initialValue: profileDetails.street_address_2 !== null ? profileDetails.street_address_2 : "", // have to write original onChange here if you need
                                        rules: [{ type: "string" }],
                                    })} />
                                    <Street_Msg className="street2_msg">{this.state.street2msg}</Street_Msg>
                                </Third_Row>
                                <Fourth_Row>
                                    <Col md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }} xxl={{ span: 24 }}>
                                        <CountryPick {...this.props} onCountryChange={(country, state, city, stateID, countryID) => this.onCountryChange(country, state, city, stateID, countryID)} />
                                        <Country_Msg className="country_msg">{this.state.countrymsg}</Country_Msg>
                                    </Col>
                                </Fourth_Row>
                                <Fourth_Row>
                                    <Col md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }} >
                                        <Postal>Postal Code*</Postal>
                                        <Postal_input placeholder="Postal Code"{...getFieldProps('postal_code', {
                                            onChange(e) { me.onChangeField(e.target.value, "postal_code") },
                                            initialValue: profileDetails.postal_code,// have to write original onChange here if you need
                                            rules: [{ type: "string", required: true }],
                                        })} />
                                        <Postal_Msg className="postal_msg">{this.state.postalmsg}</Postal_Msg>
                                    </Col>
                                </Fourth_Row>
                                <Sixth_Row>
                                    <Col md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }} xxl={{ span: 24 }}>
                                        <FIAT>Default Currency*</FIAT>
                                        <RadioGroup onChange={this.onChangeFiat} value={this.state.fiat !== "" ? this.state.fiat : profileDetails.fiat}>
                                            <Radio value={"USD"}>USD</Radio>
                                            <Radio value={"INR"}>INR</Radio>
                                            <Radio value={"EUR"}>EUR</Radio>
                                        </RadioGroup>
                                        <FIAT_Msg className="fiat_msg">{this.state.fiatmsg}</FIAT_Msg>
                                    </Col>
                                </Sixth_Row>
                                <Sixth_Row>
                                    {console.log(this.state, this.props)}
                                    <Col md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }} xxl={{ span: 24 }}>
                                        <FIAT>Default Date Format*</FIAT>
                                        <RadioGroup onChange={this.onChangeFormat} value={this.state.date_format !== "" ? this.state.date_format : profileDetails.date_format}>
                                            <Radio value={"MM/DD/YYYY"}>MM/DD/YYYY</Radio>
                                            <Radio value={"DD/MM/YYYY"}>DD/MM/YYYY</Radio>
                                            <Radio value={"MMM DD,YYYY"}>MMM DD,YYYY</Radio>
                                        </RadioGroup>
                                        <FIAT_Msg className="df_msg">{this.state.dfmsg}</FIAT_Msg>
                                    </Col>
                                </Sixth_Row>
                                <Fifth_Row>
                                    <Col md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }} xxl={{ span: 24 }}>
                                        <Save type="primary" onClick={this.submit}>Save</Save>
                                    </Col>
                                </Fifth_Row>

                            </Right_Col>
                            {(this.props.loader == true) ?
                                <Spin_Ex className="Ex_spin">
                                    <Spin size="large" />
                                </Spin_Ex>
                                : ""
                            }
                        </Row>
                    </Col>
                    {(errors = getFieldError('required')) ? errors.join(',') : null}
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

export default connect(mapStateToProps, mapDispatchToProps)(createForm()(PersonalDetails));
