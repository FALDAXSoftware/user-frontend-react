/* In-built Packages */
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { connect } from "react-redux";
import { createForm, formShape } from 'rc-form';
import { Row, Col, Input, Button, notification, Spin } from 'antd';
import styled from 'styled-components';

/* Components */
import Datepicker from "./Datepicker"
import CountryPick from "./Country"
import { Email_req } from "../../Landing/User_forms/Login_Form"
import { globalVariables } from "../../../Globals"
import { profileupdateAction, removepicAction, getProfileDataAction } from "../../../Actions/Settings/settings"
import { faAsterisk } from '@fortawesome/free-solid-svg-icons';

const { TextArea } = Input;
/* Styled-Components */

const Profile_wrap = styled.div`
    width: 71%;
    margin: auto;
`
export const HeaderCol = styled(Col)`
    font-size:20px;
    font-family:"Open Sans";
    font-weight: 600;
    color: #505050;
    margin-top: 20px;
    padding-bottom: 12px;
    margin-left:0px;
    font-family: "Open Sans";
    color: rgb( 80, 80, 80 );
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
    display:none;
`
const Image_up = styled.div`
    margin-top:30px;
`
const Image_upload = styled.label`
    color:#0f477b;
    cursor:pointer;
    font-family:"Open Sans";
    font-weight:600;
`
const Remove = styled.div`
    margin-top:20px;
    color:#0f477b;
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
    color: rgba( 80, 80, 80, 0.502 );
    -moz-transform: matrix( 0.99999985149599,0,0,0.99949238260564,0,0);
    -webkit-transform: matrix( 0.99999985149599,0,0,0.99949238260564,0,0);
    -ms-transform: matrix( 0.99999985149599,0,0,0.99949238260564,0,0);
    margin-bottom:10px;
`
export const First_input = styled(Input)`
    font-family: "Open Sans";
    font-size:16;
    font-weight:600;
    background-color:#f8f8f8;
    width:89%;
    border:1px solid #dadfe3;
    padding:10px;
    height:auto;
    @media(max-width:768px)
    {
        width:100%;
    }
    &:focus, &:hover{
        border-color:#4c84ff;
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
    @media(max-width:768px)
    {
        margin-top:25px;
    }
`
export const Last_input = styled(First_input)`
    background-color:#f8f8f8;
    width:90%;
    border:1px solid #dadfe3;
    @media(max-width:768px)
    {
        width:100%;
    }
   
`
export const Second_Row = styled(Row)`
    text-align:left;
    margin-top:25px;
`
export const Country = styled(First_name)`
   
`
export const Country_input = styled(First_input)`
    @media(max-width:992px)
    {
        width:95%;
    }
    @media(max-width:768px)
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
    text-align:left;
`
export const Street_Address = styled(First_name)`

`
export const Street_input = styled(First_input)`
    background-color:#f8f8f8;
    width:95%;
    border:1px solid #dadfe3;

    @media(max-width:992px)
    {
        width:95%;
    }
    @media(max-width:768px)
    {
        width:100%;
    }
`
export const Fourth_Row = styled(Second_Row)`
    text-align:left;
`
export const City = styled(First_name)`

`
export const Postal = styled(First_name)`
    @media(max-width:768px)
    {
        margin-top:25px;
    }
`
export const Fifth_Row = styled(Row)`
    text-align:left;
    margin-top:50px;
`
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
            profileImg: undefined,
            imageName: null,
            imageType: null,
            imagemsg: null, profileImage: null,
            countrySelected: this.props.profileDetails.country,
            spin_show: false,
            firstIcon: null,
            lastIcon: null,
            countryIcon: null,
            dobIcon: null,
            street1Icon: null,
            street2Icon: null,
            cityIcon: null,
            postalIcon: null
        }
        this.handleProfile = this.handleProfile.bind(this);
    }
    static propTypes = {
        form: formShape,
    };
    submit = () => {
        this.props.form.validateFields((error, value) => {
            let dataDate = "";
            const profileData = new FormData();
            console.log(this.state)
            if (error == null && this.state.firstIcon !== false && this.state.lastIcon !== false && this.state.countryIcon !== false && this.state.dobIcon !== false && this.state.street1Icon !== false && this.state.street2Icon !== false && this.state.cityIcon !== false && this.state.postalIcon !== false) {
                document.querySelectorAll(".first_msg")[0].style.display = "none";
                document.querySelectorAll(".last_msg")[0].style.display = "none";
                document.querySelectorAll(".country_msg")[0].style.display = "none";
                document.querySelectorAll(".dob_msg")[0].style.display = "none";
                document.querySelectorAll(".street1_msg")[0].style.display = "none";
                document.querySelectorAll(".street2_msg")[0].style.display = "none";
                document.querySelectorAll(".city_msg")[0].style.display = "none";
                document.querySelectorAll(".postal_msg")[0].style.display = "none";

                this.setState({ first_msg: null, last_msg: null, country_msg: null, dob_msg: null, street_msg: null, street2_msg: null, city_msg: null, postal_msg: null, spin_show: true });

                let number = value.postal_code;
                let country = this.state.countrySelected;
                if (this.state.Datedata !== undefined && this.state.Datedata !== null) {
                    dataDate = this.state.Datedata.year + "/" + this.state.Datedata.month + "/" + this.state.Datedata.day
                } else {
                    dataDate = this.props.profileDetails.dob
                }
                if (country == undefined && country == null) {
                    country = this.props.country ? this.props.country : ""
                }
                console.log("BEFORE FORM", value, this.state.countrySelected, this.state.profileImage, dataDate, country)
                profileData.append('first_name', value.first_name);
                profileData.append('email', this.props.email);
                profileData.append('last_name', value.last_name);
                profileData.append('country', country);
                profileData.append('street_address', value.street_address)
                profileData.append('street_address_2', value.street_address_2)
                profileData.append('city_town', value.city_town);
                profileData.append('postal_code', number);
                profileData.append('dob', dataDate);
                if (this.state.profileImage !== null && this.state.profileImage !== undefined)
                    profileData.append('profile_pic', this.state.profileImage)
                /* console.log(profileData) */
                this.openNotificationWithIcon('warning');
                this.props.profileupdateAction(this.props.isLoggedIn, profileData);
            }
            else {
                this.openNotificationWithProfile("error", "Error", "Please fill out all required fields")
            }
            if (this.state.firstIcon == null && this.props.profileDetails.first_name == null) {
                this.setState({ firstIcon: false })
                document.querySelectorAll(".first_msg")[0].style.display = "block";
                this.setState({ firstmsg: "First Name field is required" })
            }
            if (this.state.lastIcon == null && this.props.profileDetails.last_name == null) {
                this.setState({ lastIcon: false })
                document.querySelectorAll(".last_msg")[0].style.display = "block";
                this.setState({ firstmsg: "Last Name field is required" })
            }
            if (this.state.countryIcon == null && this.state.countrySelected == null && this.props.profileDetails.country == null) {
                this.setState({ countryIcon: false })
                document.querySelectorAll(".country_msg")[0].style.display = "block";
                this.setState({ countrymsg: "Country field is required" })
            }
            if (this.state.dobIcon == null && this.state.Datedata == undefined && this.props.profileDetails.dob == null) {
                this.setState({ dobIcon: false })
                document.querySelectorAll(".dob_msg")[0].style.display = "block";
                this.setState({ dobmsg: "Date of Birth is required" })
            }
            if (this.state.street1Icon == null && this.props.profileDetails.street_address == null) {
                this.setState({ street1Icon: false })
                document.querySelectorAll(".street1_msg")[0].style.display = "block";
                this.setState({ street1msg: "Street Address is required" })
            }
            if (this.state.street2Icon == null && this.props.profileDetails.street_address_2 == null) {
                this.setState({ street2Icon: false })
                document.querySelectorAll(".street2_msg")[0].style.display = "block";
                this.setState({ street2msg: "Street Address is required" })
            }
            if (this.state.cityIcon == null && this.props.profileDetails.city_town == null) {
                this.setState({ cityIcon: false })
                document.querySelectorAll(".city_msg")[0].style.display = "block";
                this.setState({ citymsg: "City field is required" })
            }
            if (this.state.postalIcon == null && this.props.profileDetails.postal_code == null) {
                this.setState({ postalIcon: false })
                document.querySelectorAll(".postal_msg")[0].style.display = "block";
                this.setState({ postalmsg: "Postal Code is required" })
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
        console.log("value ", value, field)
        this.setState({ Datedata: value })
        this.onChangeField(value, field);
    }
    onCountryChange(value, field) {
        this.setState({ countrySelected: value })
        this.onChangeField(value, field);
    }
    componentWillMount() {
        /* console.log(this.props) */
        this.props.getProfileDataAction(this.props.isLoggedIn)
    }
    componentWillReceiveProps(props, newProps) {
        /* console.log("CWRP MAIN ------->>>>>>",this.state.profileImg==undefined,props.profileDetails.profile_pic) */
        if (props.profileDetails.profile_pic !== null && props.profileDetails.profile_pic !== undefined && props.profileDetails.profile_pic !== "") {
            /* console.log("CWRP",this.state.profileImg,props.profileDetails.profile_pic) */
            if (this.state.profileImg && this.state.profileImg !== "./images/Settings/def_profile.jpg")
                this.setState({ profileImg: this.state.profileImg })
            else
                this.setState({ profileImg: globalVariables.amazon_Bucket + props.profileDetails.profile_pic, removedProfile: false, spin_show: false })
        }
        if (this.state.removedProfile && this.state.profileImg) {
            /* console.log("abababababababb",this.state.removedProfile,this.state.profileImg) */
            this.setState({ profileImg: "./images/Settings/def_profile.jpg", spin_show: false })
        }
    }
    handleProfile(e) {
        try {
            const reader = new FileReader();
            const file = e.target.files[0];
            const fileType = e.target.files[0] && e.target.files[0].type ? e.target.files[0].type.substring(0, e.target.files[0].type.indexOf('/')) : '';
            const fileSize = e.target.files[0] && e.target.files[0].size ? e.target.files[0].size : 0;
            /* console.log("handleProfile") */
            //check file size to max 5mb (5*1024*1024=5242880) and type image
            if (fileType === 'image' && fileSize < 5242880) {
                reader.onload = (upload) => {
                    this.setState({
                        profileImg: upload.target.result,
                        imageName: file.name,
                        imageType: file.type,
                        profileImage: file,
                        imagemsg: ""
                    });
                };
            } else {
                /*  console.log(" elsse handleProfile") */
                this.openNotificationWithProfile("error", "Error", "Please upload only images");
                this.setState({ profileImg: "./images/Settings/def_profile.jpg", imageName: '', imageType: fileType, imagemsg: 'Please select image with less then 5 mb' })
            }

            reader.readAsDataURL(file);
        } catch (error) {
            this.setState({ imagemsg: 'Something went wrong please try again' });
        }
    }
    removePic() {
        const formData = new FormData();
        /* console.log(this.props) */
        this.removeNotification("warning");
        this.setState({ removedProfile: true })
        formData.append('email', this.props.email)
        formData.append('profile_pic', "")
        this.props.removepicAction(this.props.isLoggedIn, formData)
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
        console.log("Hello1")
        value = value.trim();
        if (field == "first_name") {
            console.log("Hello2")
            value = value.trim();
            var re = /^[a-zA-Z0-9]{2,15}$/;
            var bool = re.test(value);
            console.log(value)
            if (value !== "") {
                console.log("Hello3")
                if (bool == true) {
                    console.log("Hello4")
                    var regexnum = /^[0-9]*$/;
                    if (regexnum.test(value)) {
                        console.log("Hello5")
                        this.setState({ firstIcon: false })
                        document.querySelectorAll(".first_msg")[0].style.display = "block";
                        this.setState({ firstmsg: "Only numbers are not allowed" })
                    }
                    else {
                        console.log("Hello6")
                        this.setState({ firstIcon: true })
                        document.querySelectorAll(".first_msg")[0].style.display = "none";
                    }
                }
                else {
                    console.log("Hello7")
                    this.setState({ firstIcon: false })
                    document.querySelectorAll(".first_msg")[0].style.display = "block";
                    this.setState({ firstmsg: "First Name should have min. 2 and max. 15 characters and no special characters are allowed" })
                }
            }
            else {
                console.log("Hello8")
                this.setState({ firstIcon: false })
                document.querySelectorAll(".first_msg")[0].style.display = "block";
                this.setState({ firstmsg: "First Name field is required" })
            }

        }
        else if (field == "last_name") {
            console.log("Hello2")
            var re = /^[a-zA-Z0-9]{2,15}$/;
            var bool = re.test(value);
            if (value !== "") {
                console.log("Hello3")
                if (bool == true) {
                    console.log("Hello4")
                    var regexnum = /^[0-9]*$/;
                    if (regexnum.test(value)) {
                        console.log("Hello5")
                        this.setState({ lastIcon: false })
                        document.querySelectorAll(".last_msg")[0].style.display = "block";
                        this.setState({ lastmsg: "Only numbers are not allowed" })
                    }
                    else {
                        console.log("Hello6")
                        this.setState({ lastIcon: true })
                        document.querySelectorAll(".last_msg")[0].style.display = "none";
                    }
                }
                else {
                    console.log("Hello7")
                    this.setState({ lastIcon: false })
                    document.querySelectorAll(".last_msg")[0].style.display = "block";
                    this.setState({ lastmsg: "Last Name should have min. 2 and max. 15 characters and no special characters are allowed" })
                }
            }
            else {
                console.log("Hello8")
                this.setState({ firstIcon: false })
                document.querySelectorAll(".last_msg")[0].style.display = "block";
                this.setState({ lastmsg: "Last Name field is required" })
            }

        }
        else if (field == "country") {
            if (value !== undefined || value !== null) {
                this.setState({ countryIcon: true })
                document.querySelectorAll(".country_msg")[0].style.display = "none";
            }
            else {
                this.setState({ countryIcon: true })
                document.querySelectorAll(".country_msg")[0].style.display = "block";
                this.setState({ dobmsg: "Country Field is required" })
            }
        }
        else if (field == "dob") {
            if (value["day"] !== undefined && value["month"] !== undefined && value["year"] !== undefined) {
                this.setState({ dobIcon: true })
                document.querySelectorAll(".dob_msg")[0].style.display = "none";
            }
            else {
                this.setState({ dobIcon: false })
                document.querySelectorAll(".dob_msg")[0].style.display = "block";
                this.setState({ dobmsg: "Date of Birth is required" })
            }
        }
        else if (field == "street_address") {
            if (value !== "") {
                if (value.length < 100) {
                    this.setState({ street1Icon: true })
                    document.querySelectorAll(".street1_msg")[0].style.display = "none";
                }
                else {
                    this.setState({ street1Icon: false })
                    document.querySelectorAll(".street1_msg")[0].style.display = "block";
                    this.setState({ street1msg: "Street Address limit is 100 characters" })
                }
            }
            else {
                this.setState({ street1Icon: false })
                document.querySelectorAll(".street1_msg")[0].style.display = "block";
                this.setState({ street1msg: "Street Address is required" })
            }
        }
        else if (field == "street_address_2") {

            if (value !== "") {
                if (value.length < 100) {
                    this.setState({ street2Icon: true })
                    document.querySelectorAll(".street2_msg")[0].style.display = "none";
                }
                else {
                    this.setState({ street2Icon: false })
                    document.querySelectorAll(".street2_msg")[0].style.display = "block";
                    this.setState({ street2msg: "Street Address limit is 100 characters" })
                }
            }
            else {
                this.setState({ street2Icon: false })
                document.querySelectorAll(".street2_msg")[0].style.display = "block";
                this.setState({ street2msg: "Street Address is required" })
            }
        }
        else if (field == "city_town") {
            if (value !== "") {
                if (value.length >= 2 && value.length <= 20) {
                    this.setState({ cityIcon: true })
                    document.querySelectorAll(".city_msg")[0].style.display = "none";
                }
                else {
                    this.setState({ cityIcon: false })
                    document.querySelectorAll(".city_msg")[0].style.display = "block";
                    this.setState({ postalmsg: "City field should be between 2 and 20 characters" })
                }
            }
            else {
                this.setState({ cityIcon: false })
                document.querySelectorAll(".city_msg")[0].style.display = "block";
                this.setState({ citymsg: "City field is required" })
            }
        }
        else if (field == "postal_code") {
            if (value !== "") {
                if (value.length >= 2 && value.length <= 20) {
                    this.setState({ postalIcon: true })
                    document.querySelectorAll(".postal_msg")[0].style.display = "none";
                }
                else {
                    this.setState({ postalIcon: false })
                    document.querySelectorAll(".postal_msg")[0].style.display = "block";
                    this.setState({ postalmsg: "Postal Code should be between 2 and 20 characters" })
                }
            }
            else {
                this.setState({ postalIcon: false })
                document.querySelectorAll(".postal_msg")[0].style.display = "block";
                this.setState({ postalmsg: "Postal Code is required" })
            }
        }
    }
    render() {
        /* console.log(this.props) */
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
                                {/* console.log("Above Image",this.state,this.props) */}
                                <div><ImageDiv src={this.state.profileImg} /></div>
                                <div><Image_input type="file" onChange={this.handleProfile} name="file" id="file" /><Image_up><Image_upload htmlFor="file">Upload New Photo</Image_upload></Image_up></div>
                                <Remove onClick={this.removePic.bind(this)}>Remove</Remove>
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
                                    <Col md={{ span: 24 }} lg={{ span: 12 }} xl={{ span: 12 }} xxl={{ span: 12 }}>
                                        <Country>Country*</Country>
                                        <CountryPick {...this.props} onCountryChange={(value, field) => this.onCountryChange(value, field)} />
                                        <Country_Msg className="country_msg">{this.state.countrymsg}</Country_Msg>
                                    </Col>
                                    <Col md={{ span: 24 }} lg={{ span: 12 }} xl={{ span: 12 }} xxl={{ span: 12 }}>
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
                                    <Street_Address>Street Address Line 2*</Street_Address>
                                    <Street_input placeholder="Street Address" {...getFieldProps('street_address_2', {
                                        onChange(e) { me.onChangeField(e.target.value, "street_address_2") },
                                        initialValue: profileDetails.street_address_2, // have to write original onChange here if you need
                                        rules: [{ type: "string", required: true }],
                                    })} />
                                    <Street_Msg className="street2_msg">{this.state.street2msg}</Street_Msg>
                                </Third_Row>
                                <Fourth_Row>
                                    <Col md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 12 }} xxl={{ span: 12 }}>
                                        <City>City/Town*</City>
                                        <First_input placeholder="City"{...getFieldProps('city_town', {
                                            onChange(e) { me.onChangeField(e.target.value, "city_town") },
                                            initialValue: profileDetails.city_town, // have to write original onChange here if you need
                                            rules: [{ required: true }],
                                        })} />
                                        <City_Msg className="city_msg">{this.state.citymsg}</City_Msg>
                                    </Col>
                                    <Col md={{ span: 12 }} lg={{ span: 12 }} xl={{ span: 12 }} xl={{ span: 12 }}>
                                        <Postal>Postal Code*</Postal>
                                        <Last_input placeholder="Postal Code"{...getFieldProps('postal_code', {
                                            onChange(e) { me.onChangeField(e.target.value, "postal_code") },
                                            initialValue: profileDetails.postal_code,// have to write original onChange here if you need
                                            rules: [{ type: "string", required: true }],
                                        })} />
                                        <Postal_Msg className="postal_msg">{this.state.postalmsg}</Postal_Msg>
                                    </Col>
                                </Fourth_Row>
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
    /*  console.log("personalDetails",state,state.simpleReducer.loader) */
    return {
        ...state,
        email: state.simpleReducer.profileDetails !== undefined ? state.simpleReducer.profileDetails.data[0].email : "",
        profileDetails: state.simpleReducer.profileDetails !== undefined ? state.simpleReducer.profileDetails.data[0] : "",
        loader: state.simpleReducer.loader
    }
}
const mapDispatchToProps = dispatch => ({
    profileupdateAction: (isLoggedIn, form) => dispatch(profileupdateAction(isLoggedIn, form)),
    getProfileDataAction: (isLoggedIn) => dispatch(getProfileDataAction(isLoggedIn)),
    removepicAction: (isLoggedIn, form) => dispatch(removepicAction(isLoggedIn, form)),
})

export default connect(mapStateToProps, mapDispatchToProps)(createForm()(PersonalDetails));
