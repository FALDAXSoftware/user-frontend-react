/* In-built Packages */
import React, { Component } from "react";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import { createForm, formShape } from "rc-form";
import { Row, Col, Input, Button, notification, Radio, Checkbox } from "antd";
import styled from "styled-components";
import moment from "moment";
import AgreeTerms from "../../../SHARED-COMPONENTS/AgreeTerms";

/* Components */
import Datepicker from "./datepicker";
import CountryPick from "./country";
import { EmailReq } from "COMPONENTS/LANDING/USERFORMS/login_form";
import { globalVariables } from "Globals.js";
import {
  profileupdateAction,
  removepicAction,
  getProfileDataAction,
  clearEditData,
  profileError
} from "ACTIONS/SETTINGS/settingActions";
import { LogoutUser } from "ACTIONS/authActions";
import { _DEFAULTPROFILE } from "CONSTANTS/images";
import FaldaxLoader from "SHARED-COMPONENTS/FaldaxLoader";
import { Link } from "react-router-dom";

/* const Option = Select.Option; */
const RadioGroup = Radio.Group;
/* Styled-Components */
const Profilewrap = styled.div`
  width: 71%;
  margin: auto;
`;
export const HeaderCol = styled(Col)`
  font-size: 20px;
  font-family: "Open Sans";
  font-weight: 600;
  color: ${props => (props.theme.mode === "dark" ? "white" : "#505050")};
  margin-top: 20px;
  padding-bottom: 12px;
  margin-left: 0px;
  font-family: "Open Sans";
`;
const Mainrow = styled(Row)`
  margin-top: 40px;
  margin-bottom: 40px;
`;
const LeftCol = styled(Col)``;
const ImageDiv = styled.img`
  height: 160px;
  width: 160px;
`;
const Imageinput = styled(Input)`
  display: none !important;
`;
const Imageup = styled.div`
  margin-top: 30px;
`;
const Imageupload = styled.label`
  color: ${props => (props.theme.mode === "dark" ? "#828a91" : "#0f477b")};
  cursor: pointer;
  font-family: "Open Sans";
  font-weight: 600;
`;
const Remove = styled.div`
  margin-top: 20px;
  color: ${props => (props.theme.mode === "dark" ? "#828a91" : "#0f477b")};
  cursor: pointer;
  font-family: "Open Sans";
  font-weight: 600;
`;
export const RightCol = styled(Col)`
  @media (max-width: 992px) {
    margin-top: 60px;
  }
`;
export const FirstRow = styled(Row)`
  text-align: left;
  > .ant-col {
    > .text-danger-validation {
      width: 89%;
    }
  }
`;
export const Firstname = styled.div`
  font-size: 14.007px;
  font-family: "Open Sans";
  color: ${props =>
    props.theme.mode === "dark"
      ? "rgba( 152, 171, 215, 0.502 )"
      : "rgba( 80, 80, 80, 0.502 )"};
  -moz-transform: matrix(0.99999985149599, 0, 0, 0.99949238260564, 0, 0);
  -webkit-transform: matrix(0.99999985149599, 0, 0, 0.99949238260564, 0, 0);
  -ms-transform: matrix(0.99999985149599, 0, 0, 0.99949238260564, 0, 0);
  margin-bottom: 10px;
`;
export const Firstinput = styled(Input)`
  font-family: "Open Sans";
  font-size: 16;
  font-weight: 600;
  background-color: ${props =>
    props.theme.mode === "dark" ? "#020f18" : "#f8f8f8"};
  color: ${props => (props.theme.mode === "dark" ? "white" : "")};
  width: 89%;
  border: 1px solid #dadfe3;
  padding: 10px;
  height: auto;
  @media (max-width: 767px) {
    width: 100%;
  }
  &:focus,
  &:hover {
    border-color: rgb(0, 170, 250);
    outline: 0;
    box-shadow: none;
  }
`;
export const FirstMsg = styled(EmailReq)`
  display: block;
`;
export const LastMsg = styled(FirstMsg)``;
export const CountryMsg = styled(FirstMsg)``;
export const DobMsg = styled(FirstMsg)``;
export const StreetMsg = styled(FirstMsg)``;
export const CityMsg = styled(FirstMsg)``;
export const PostalMsg = styled(FirstMsg)``;
export const Lastname = styled(Firstname)`
  @media (max-width: 767px) {
    margin-top: 25px;
  }
`;
export const Lastinput = styled(Firstinput)`
  width: 90%;
  border: 1px solid #dadfe3;
  @media (max-width: 767px) {
    width: 100%;
  }
`;
export const Postalinput = styled(Lastinput)`
  width: 95%;
  @media (max-width: 767px) {
    width: 100%;
  }
`;
export const SecondRow = styled(Row)`
  text-align: left;
  margin-top: 25px;
  @media (max-width: 767px) {
    margin-top: 0px;
  }
`;
export const Country = styled(Firstname)``;
export const Countryinput = styled(Firstinput)`
  @media (max-width: 992px) {
    width: 95%;
  }
  @media (max-width: 767px) {
    width: 100%;
  }
`;
export const Datebirth = styled(Firstname)`
  @media (max-width: 992px) {
    margin-top: 25px;
  }
`;
export const ThirdRow = styled(SecondRow)`
  margin-top: 25px;
  text-align: left;
`;
export const StreetAddress = styled(Firstname)``;
export const Streetinput = styled(Firstinput)`
  width: 95%;
  border: 1px solid #dadfe3;

  @media (max-width: 992px) {
    width: 95%;
  }
  @media (max-width: 767px) {
    width: 100%;
  }
`;
export const FourthRow = styled(SecondRow)`
  text-align: left;
  margin-top: 25px;
`;
export const City = styled(Firstname)``;
export const Postal = styled(Firstname)`
  @media (max-width: 767px) {
    margin-top: 25px;
  }
`;
export const FifthRow = styled(Row)`
  text-align: left;
  margin-top: 50px;
  > .ant-col {
    .edit_profile_actions {
      > button {
        margin: 0 15px;
      }
    }
  }
`;
export const SixthRow = styled(Row)`
  text-align: left;
  margin-top: 25px;
  & .ant-radio-wrapper {
    color: ${props => (props.theme.mode === "dark" ? "white" : "")};
  }
  &.terms_conditions_dark {
    > .ant-col {
      > span {
        color: #fff;
      }
    }
  }
`;
export const FIAT = styled(Firstname)``;
export const FIATMsg = styled(PostalMsg)``;
export const Save = styled(Button)`
  font-size: 13.217px;
  font-family: "Open Sans";
  color: rgb(255, 255, 255);
  font-weight: bold;
  text-transform: uppercase;
  text-align: center;
  -moz-transform: matrix(1.2195120140195, 0, 0, 1.20991183157525, 0, 0);
  -webkit-transform: matrix(1.2195120140195, 0, 0, 1.20991183157525, 0, 0);
  -ms-transform: matrix(1.2195120140195, 0, 0, 1.20991183157525, 0, 0);
  border-radius: 24px;
  background-color: rgb(76, 132, 255);
  box-shadow: 0px 4px 10px 0px rgba(76, 132, 255, 0.33);
  margin-left: 10px;
  width: 15%;
  height: 40px;
  @media (max-width: 600px) {
    width: 100px;
  }
`;
export const SpinEx = styled.div`
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
`;
/* const Street2Col = styled(Col)`
    margin-top:15px; 
`
const Asterisk = styled.span`
    color:red;
` */
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
      agree_check_msg: null,
      profileImg: undefined,
      imageName: null,
      imageType: null,
      imagemsg: null,
      profileImage: null,
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
      date_format: "",
      showFileInput: true,
      agreeCheck: false,
      agreeTermsShow: false,
      editMode: false,
      isFirstLogin: ""
    };
    this.handleProfile = this.handleProfile.bind(this);
  }
  static propTypes = {
    form: formShape
  };

  /* Life-Cycle Methods */

  componentDidMount() {
    this.props.getProfileDataAction(this.props.isLoggedIn);
  }

  componentWillReceiveProps(props) {
    // console.log(props);
    if (
      props.profileDetails.profile_pic !== null &&
      props.profileDetails.profile_pic !== undefined &&
      props.profileDetails.profile_pic !== ""
    ) {
      if (
        this.state.profileImg !== undefined &&
        this.state.profileImg !== null &&
        this.state.profileImg !== ""
      ) {
        this.setState({ profileImg: this.state.profileImg });
        /*  this.setState({ profileImg: globalVariables._AMAZONBUCKET + props.profileDetails.profile_pic }) */
      } else {
        this.setState({
          profileImg:
            globalVariables._AMAZONBUCKET + props.profileDetails.profile_pic
        });
      }
    }
    if (props.apiStatus === 200) {
      this.openNotificationWithProfile("success", "Success", props.apiMessage);
      this.props.clearEditData();
    }
    if (props.profileError !== undefined) {
      // console.log("Called Twice", props.profileError);
      this.openNotificationWithProfile(
        "error",
        "Error",
        props.profileError.err
      );
      this.props.profileErr();
      let form = {
        user_id: this.props.profileDetails.id,
        jwt_token: this.props.isLoggedIn
      };
      this.props.LogoutUser(this.props.isLoggedIn, form);
    }
  }

  /* 
        Page: /editProfile --> Personal Details
        It is called when we change date format in Personal Details form.
    */

  onChangeFormat = e => {
    this.setState({
      date_format: e.target.value
    });
    this.onChangeField(e.target.value, "date_format");
  };

  /* 
        Page: /editProfile --> Personal Details
        It is called when we change currency/FIAT in Personal Details form.
    */

  onChangeFiat = e => {
    this.setState({
      fiat: e.target.value
    });
    this.onChangeField(e.target.value, "fiat");
  };

  onCheckboxChange = e => {
    // console.log(`checked = ${e.target.checked}`);
    this.setState(
      {
        agreeCheck: e.target.checked
      },
      () => {
        if (this.state.agreeCheck !== true) {
          // this.setState({ dateFIcon: false });
          document.querySelectorAll(".agree_check_msg")[0].style.display =
            "block";
          this.setState({
            agree_check_msg:
              "Please agree to all the Policies before proceeding further."
          });
        } else {
          document.querySelectorAll(".agree_check_msg")[0].style.display =
            "none";
          this.setState({
            agree_check_msg: null
          });
        }
      }
    );
  };

  /* 
        Page: /editProfile --> Personal Details
        It is passed as props(callback function) to Datepicker component.
    */

  onDateChange(value, field) {
    var tempDate = value.day + "/" + value.month + "/" + value.year;

    var date = moment
      .utc(tempDate)
      .local()
      .format("DD-MM-YYYY");
    this.setState({ Datedata: date });
    // console.log("onDateChange", value, field);
    this.onChangeField(value, field);
  }

  /* 
        Page: /editProfile --> Personal Details
        It is passed as props(callback function) to Country component.
    */

  onCountryChange(country, state, city) {
    this.setState({
      countrySelected: country,
      stateSelected: state,
      citySelected: city
    });
    var loc = {
      country: country,
      state: state,
      city: city
    };
    this.onChangeField(loc, "country");
  }

  /* 
            Page: /editProfile --> Personal Details
            It is called when a file is selected on profile pic in personal details form.
    */
  comingCancel = e => {
    this.setState({
      agreeTermsShow: false
    });
  };
  handleProfile(e) {
    try {
      const reader = new FileReader();
      const file = e.target.files[0];
      const fileType =
        e.target.files[0] && e.target.files[0].type
          ? e.target.files[0].type.substring(
              0,
              e.target.files[0].type.indexOf("/")
            )
          : "";
      const fileSize =
        e.target.files[0] && e.target.files[0].size
          ? e.target.files[0].size
          : 0;
      //check file size to max 5mb (5*1024*1024=5242880) and type image
      if (fileType === "image") {
        if (fileSize <= 5242880) {
          reader.onload = upload => {
            this.setState({
              profileImg: upload.target.result,
              imageName: file.name,
              imageType: file.type,
              profileImage: file,
              imagemsg: "",
              remove_pic: false
            });
          };
        } else {
          this.openNotificationWithProfile(
            "error",
            "Error",
            "File size must not be more than 5 MB"
          );
          // this.setState({
          //   showFileInput: false
          // });
          this.removePic();
        }
      } else {
        if (file !== undefined)
          this.openNotificationWithProfile(
            "error",
            "Error",
            "Please upload only images"
          );
      }

      reader.readAsDataURL(file);
    } catch (error) {
      this.setState({ imagemsg: "Something went wrong please try again" });
    }
  }

  /* 
        Page: /editProfile --> Personal Details
        It is called when we click remove pic below profile pic.
    */

  removePic() {
    /* this.removeNotification("warning"); */
    /* document.getElementById("file").value = ""; */
    if (this.state.profileImg !== _DEFAULTPROFILE) {
      this.setState(
        {
          remove_pic: true,
          profileImg: _DEFAULTPROFILE,
          profileImage: undefined,
          showFileInput: false
        },
        () => {
          this.setState({
            showFileInput: true
          });
        }
      );
    }
    /* 
        this.props.removepicAction(this.props.isLoggedIn, formData) */
  }

  /* 
        Page: /editProfile --> Personal Details
        It is for custom notifications.
    */

  openNotificationWithIcon = type => {
    notification[type]({
      message: "Updating Profile",
      description: "Please wait...",
      duration: 3
    });
  };

  /* 
        Page: /editProfile --> Personal Details
        It is for notifications with profile icon.
    */

  openNotificationWithProfile = (type, head, desc) => {
    notification[type]({
      message: head,
      description: desc,
      duration: 3
    });
  };

  /* 
        Page: /editProfile --> Personal Details
        It is for notifications for removing profile picture.
    */

  removeNotification = type => {
    notification[type]({
      message: "Removing profile picture",
      description: "Please wait...",
      duration: 3
    });
  };

  /* 
            Page: /editProfile --> Personal Details
            It is called when we change input fields in form.
    */

  onChangeField(value, field) {
    if (field !== "dob" && field !== "country" && field !== "postal_code")
      value = value.trim();
    if (field === "first_name") {
      value = value.trim();
      var re = /^[a-zA-Z0-9]{2,15}$/;
      var bool = re.test(value);
      if (value !== "") {
        if (bool === true) {
          var regexnum = /^[0-9]*$/;
          if (regexnum.test(value)) {
            this.setState({ firstIcon: false });
            document.querySelectorAll(".first_msg")[0].style.display = "block";
            this.setState({ firstmsg: "Only numbers are not allowed" });
          } else {
            this.setState({ firstIcon: true });
            document.querySelectorAll(".first_msg")[0].style.display = "none";
          }
        } else {
          this.setState({ firstIcon: false });
          document.querySelectorAll(".first_msg")[0].style.display = "block";
          this.setState({
            firstmsg:
              "First Name should have min. 2 and max. 15 characters and no special characters are allowed"
          });
        }
      } else {
        this.setState({ firstIcon: false });
        document.querySelectorAll(".first_msg")[0].style.display = "block";
        this.setState({ firstmsg: "First Name field is required" });
      }
    } else if (field === "last_name") {
      var re = /^[a-zA-Z0-9]{2,15}$/;
      var bool = re.test(value);
      if (value !== "") {
        if (bool === true) {
          var regexnum = /^[0-9]*$/;
          if (regexnum.test(value)) {
            this.setState({ lastIcon: false });
            document.querySelectorAll(".last_msg")[0].style.display = "block";
            this.setState({ lastmsg: "Only numbers are not allowed" });
          } else {
            this.setState({ lastIcon: true });
            document.querySelectorAll(".last_msg")[0].style.display = "none";
          }
        } else {
          this.setState({ lastIcon: false });
          document.querySelectorAll(".last_msg")[0].style.display = "block";
          this.setState({
            lastmsg:
              "Last Name should have min. 2 and max. 15 characters and no special characters are allowed"
          });
        }
      } else {
        this.setState({ lastIcon: false });
        document.querySelectorAll(".last_msg")[0].style.display = "block";
        this.setState({ lastmsg: "Last Name field is required" });
      }
    } else if (field === "country") {
      if (value.country && value.state && value.city) {
        this.setState({ countryIcon: true });
        document.querySelectorAll(".country_msg")[0].style.display = "none";
      } else {
        let country = false,
          state = false,
          city = false;
        this.setState({ countryIcon: false });
        document.querySelectorAll(".country_msg")[0].style.display = "block";
        if (
          value.country === undefined ||
          value.country === null ||
          value.country === ""
        )
          country = true;
        if (
          value.state === undefined ||
          value.state === null ||
          value.state === ""
        )
          state = true;
        if (
          value.city === undefined ||
          value.city === null ||
          value.city === ""
        )
          city = true;
        let countrymsg;
        if (country === true && state === false && city === false) {
          countrymsg = "Country Field is required.";
        } else if (country === true && state === true && city === false) {
          countrymsg = "Country and State Field are required.";
        } else if (country === true && state === true && city === true) {
          countrymsg = "Country , State and City Field are required.";
        } else if (country === false && state === true && city === false) {
          countrymsg = "State Field is required.";
        } else if (country === false && state === true && city === true) {
          countrymsg = "State and City Field are required.";
        } else if (country === false && state === false && city === true) {
          countrymsg = "City Field is required.";
        } else if (country === true && state === false && city === true) {
          countrymsg = "Country and City Field are required.";
        }
        this.setState({ countrymsg });
      }
    } else if (field === "dob") {
      // console.log("Step 4 ------>", value);
      if (value["day"] && value["month"] && value["year"]) {
        this.setState({ dobIcon: true });
        document.querySelectorAll(".dob_msg")[0].style.display = "none";
      } else if (value["day"] === "" || value["day"] === "") {
        this.setState({ dobIcon: false });
        document.querySelectorAll(".dob_msg")[0].style.display = "block";
        this.setState({ dobmsg: "Day field is required" });
      } else if (value["month"] === "" || value["month"] === "") {
        this.setState({ dobIcon: false });
        document.querySelectorAll(".dob_msg")[0].style.display = "block";
        this.setState({ dobmsg: "Month field is required" });
      } else if (value["year"] === "" || value["year"] === "") {
        this.setState({ dobIcon: false });
        document.querySelectorAll(".dob_msg")[0].style.display = "block";
        this.setState({ dobmsg: "Year field is required" });
      }
      // else {
      //   this.setState({ dobIcon: false });
      //   document.querySelectorAll(".dob_msg")[0].style.display = "block";
      //   this.setState({ dobmsg: "Date of Birth field is required" });
      // }
    } else if (field === "street_address") {
      if (value !== "") {
        if (value.length < 100) {
          this.setState({ street1Icon: true });
          document.querySelectorAll(".street1_msg")[0].style.display = "none";
        } else {
          this.setState({ street1Icon: false });
          document.querySelectorAll(".street1_msg")[0].style.display = "block";
          this.setState({
            street1msg: "Street Address limit is 100 characters"
          });
        }
      } else {
        this.setState({ street1Icon: false });
        document.querySelectorAll(".street1_msg")[0].style.display = "block";
        this.setState({ street1msg: "Street Address field is required" });
      }
    } else if (field === "street_address_2") {
      if (value.trim !== "") {
        if (value.length <= 100) {
          this.setState({ street2Icon: true });
          document.querySelectorAll(".street2_msg")[0].style.display = "none";
        } else {
          this.setState({ street2Icon: false });
          document.querySelectorAll(".street2_msg")[0].style.display = "block";
          this.setState({
            street2msg: "Street Address limit is 100 characters"
          });
        }
      }
    } else if (field === "postal_code") {
      if (value !== "") {
        // var reg = /^(?=.*[0-9A-Za-z])[-()0-9A-Za-z]{3,25}$/;
        var reg = /^[a-zA-Z0-9-_]*$/;
        var bool = reg.test(value);
        // console.log("------------------->", bool, value);
        if (bool === true) {
          this.setState({ postalIcon: true });
          document.querySelectorAll(".postal_msg")[0].style.display = "none";
        } else {
          this.setState({ postalIcon: false });
          document.querySelectorAll(".postal_msg")[0].style.display = "block";
          if (value.length < 3 || value.length > 25)
            this.setState({
              postalmsg:
                "Postal code should have min. 3 and max. 25 characters."
            });
          else
            this.setState({
              postalmsg:
                "Postal code may only contain letters, numbers, and dashes."
            });
        }
      } else {
        this.setState({ postalIcon: false });
        document.querySelectorAll(".postal_msg")[0].style.display = "block";
        this.setState({ postalmsg: "Postal Code field is required" });
      }
    } else if (field === "date_format") {
      /* else if (field==="fiat") {
            if (value !== "") {
                this.setState({ fiatIcon: true })
                document.querySelectorAll(".fiat_msg")[0].style.display = "none";
            }
            else {
                this.setState({ fiatIcon: false })
                document.querySelectorAll(".fiat_msg")[0].style.display = "block";
                this.setState({ fiatmsg: "currency is required" })
            }
        } */
      if (value !== "") {
        this.setState({ dateFIcon: true });
        document.querySelectorAll(".df_msg")[0].style.display = "none";
      } else {
        this.setState({ dateFIcon: false });
        document.querySelectorAll(".df_msg")[0].style.display = "block";
        this.setState({ dfmsg: "currency is required" });
      }
    }
  }

  /* 
            Page: /editProfile --> Personal Details
            It is called when we submit Personal Details form.
    */
  dontAgreeTerms() {
    this.setState(
      {
        agreeTermsShow: false
      },
      () => {
        this.openNotificationWithProfile(
          "error",
          "Error",
          "Please agree to all the Policies before proceeding further."
        );
      }
    );
  }
  agreeTerms() {
    this.setState(
      {
        agreeTermsShow: false,
        editMode: false
      },
      () => {
        this.submit();
      }
    );
  }
  openAgreePopup = () => {
    this.props.form.validateFields((error, value) => {
      let dataDate = "";
      const profileData = new FormData();
      if (
        error === null &&
        this.state.fiatIcon !== false &&
        this.state.dateFIcon !== false &&
        this.state.firstIcon !== false &&
        this.state.lastIcon !== false &&
        this.state.countryIcon !== false &&
        this.state.dobIcon !== false &&
        this.state.street1Icon !== false &&
        this.state.street2Icon !== false &&
        this.state.postalIcon !== false &&
        ((this.props.profileDetails.country !== undefined &&
          this.props.profileDetails.country !== "" &&
          this.props.profileDetails.country !== null) ||
          (this.state.countrySelected !== null &&
            this.state.countrySelected !== undefined &&
            this.state.countrySelected !== ""))
      ) {
        this.setState({
          agreeTermsShow: true
        });
      } else {
        this.openNotificationWithProfile(
          "error",
          "Error",
          "Please complete all required details to continue"
        );
        console.log(
          "sjdh",
          this.state.street1Icon,
          this.props.profileDetails.street_address
        );
      }
      if (
        this.state.firstIcon === null &&
        this.props.profileDetails.first_name === null
      ) {
        this.setState({ firstIcon: false });
        document.querySelectorAll(".first_msg")[0].style.display = "block";
        this.setState({ firstmsg: "First Name field is required." });
      }
      if (
        this.state.lastIcon === null &&
        this.props.profileDetails.last_name === null
      ) {
        this.setState({ lastIcon: false });
        document.querySelectorAll(".last_msg")[0].style.display = "block";
        this.setState({ lastmsg: "Last Name field is required." });
      }
      if (
        (this.state.countryIcon === null || this.state.countryIcon === false) &&
        (this.props.profileDetails.country === "" ||
          this.props.profileDetails.country === null)
      ) {
        this.setState({ countryIcon: false });
        document.querySelectorAll(".country_msg")[0].style.display = "block";
        let countrymsg;
        if (
          this.state.countrySelected &&
          (this.state.stateSelected == "" ||
            this.state.stateSelected == null) &&
          (this.state.citySelected == "" || this.state.citySelected == null)
        ) {
          countrymsg = "State and City Field are required.";
        } else if (
          this.state.countrySelected &&
          this.state.stateSelected &&
          (this.state.citySelected == "" || this.state.citySelected == null)
        ) {
          countrymsg = "City Field is required.";
        } else {
          countrymsg = "Country Field is required.";
        }
        this.setState({ countrymsg });
      }
      if (
        (this.state.dobIcon === null || this.state.dobIcon === false) &&
        this.state.Datedata === undefined &&
        this.props.profileDetails.dob === null
      ) {
        this.setState({ dobIcon: false });
        document.querySelectorAll(".dob_msg")[0].style.display = "block";
        this.setState({ dobmsg: "Date of Birth is required." });
      }
      if (
        (this.state.street1Icon === null || this.state.street1Icon === false) &&
        this.props.profileDetails.street_address === null
      ) {
        this.setState({ street1Icon: false });
        document.querySelectorAll(".street1_msg")[0].style.display = "block";
        this.setState({ street1msg: "Street Address is required." });
      }
      /* if (this.state.street2Icon===null && this.props.profileDetails.street_address_2===null) {
                this.setState({ street2Icon: false })
                document.querySelectorAll(".street2_msg")[0].style.display = "block";
                this.setState({ street2msg: "Street Address is required" })
            } */
      if (
        (this.state.postalIcon === null || this.state.postalIcon === false) &&
        this.props.profileDetails.postal_code === null
      ) {
        this.setState({ postalIcon: false });
        document.querySelectorAll(".postal_msg")[0].style.display = "block";
        this.setState({ postalmsg: "Postal Code is required." });
      }
      if (
        this.state.fiatIcon === false &&
        this.props.profileDetails.fiat === ""
      ) {
        this.setState({ fiatIcon: false });
        document.querySelectorAll(".fiat_msg")[0].style.display = "block";
        this.setState({ fiatmsg: "currency is required." });
      }
      if (
        this.state.dateFIcon !== true &&
        this.props.profileDetails.date_format === ""
      ) {
        this.setState({ dateFIcon: false });
        document.querySelectorAll(".df_msg")[0].style.display = "block";
        this.setState({ dfmsg: "Date Format is required." });
      }
    });
  };
  submit = () => {
    // e.preventDefault();

    this.props.form.validateFields((error, value) => {
      let dataDate = "";
      const profileData = new FormData();
      // console.log("---------->", this.state.dfmsg);
      if (
        error === null &&
        this.state.fiatIcon !== false &&
        this.state.dateFIcon !== false &&
        this.state.firstIcon !== false &&
        this.state.lastIcon !== false &&
        this.state.countryIcon !== false &&
        this.state.dobIcon !== false &&
        this.state.street1Icon !== false &&
        this.state.street2Icon !== false &&
        this.state.postalIcon !== false &&
        // this.state.date_format !== "" &&
        // this.state.agreeCheck !== false &&
        ((this.props.profileDetails.country !== undefined &&
          this.props.profileDetails.country !== "" &&
          this.props.profileDetails.country !== null) ||
          (this.state.countrySelected !== null &&
            this.state.countrySelected !== undefined &&
            this.state.countrySelected !== ""))
      ) {
        document.querySelectorAll(".first_msg")[0].style.display = "none";
        document.querySelectorAll(".last_msg")[0].style.display = "none";
        document.querySelectorAll(".country_msg")[0].style.display = "none";
        document.querySelectorAll(".dob_msg")[0].style.display = "none";
        document.querySelectorAll(".street1_msg")[0].style.display = "none";
        document.querySelectorAll(".street2_msg")[0].style.display = "none";
        /* document.querySelectorAll(".city_msg")[0].style.display = "none"; */
        document.querySelectorAll(".postal_msg")[0].style.display = "none";
        this.setState({
          first_msg: null,
          last_msg: null,
          country_msg: null,
          dob_msg: null,
          street_msg: null,
          street2_msg: null,
          city_msg: null,
          postal_msg: null,
          spin_show: true
        });
        let number = value.postal_code;
        let country = this.state.countrySelected;
        if (this.state.Datedata !== undefined && this.state.Datedata !== null) {
          dataDate = this.state.Datedata;
        } else {
          dataDate = this.props.profileDetails.dob;
        }
        if (country === undefined && country === null) {
          country = this.props.profileDetails.country
            ? this.props.profileDetails.country
            : "";
        }
        profileData.append("first_name", value.first_name);
        profileData.append("email", this.props.email);
        profileData.append("last_name", value.last_name);
        if (this.state.citySelected !== null)
          profileData.append("city_town", this.state.citySelected);
        if (this.state.stateSelected !== null) {
          profileData.append("state", this.state.stateSelected);
        }
        if (this.state.countrySelected !== null) {
          profileData.append("country", this.state.countrySelected);
        }
        profileData.append("street_address", value.street_address);
        if (
          value.street_address_2 !== null &&
          value.street_address_2 !== "" &&
          value.street_address_2 !== undefined
        )
          profileData.append("street_address_2", value.street_address_2);
        profileData.append("postal_code", number);
        var fiat =
          this.state.fiat !== ""
            ? this.state.fiat
            : this.props.profileDetails.fiat;
        var date_format =
          this.state.date_format !== ""
            ? this.state.date_format
            : this.props.profileDetails.date_format;
        profileData.append("fiat", fiat);
        profileData.append("date_format", date_format);
        if (this.state.Datedata !== undefined)
          profileData.append("dob", this.state.Datedata);
        profileData.append("remove_pic", this.state.remove_pic);
        this.setState({
          profileImg: undefined,
          profileImage: undefined,
          remove_pic: false
        });
        if (
          this.state.profileImage !== null &&
          this.state.profileImage !== undefined &&
          !this.state.profileImg.includes("def_profile.jpg")
        ) {
          profileData.append("profile_pic", this.state.profileImage);
        }
        // console.log("---------------->> USER API CALLED");
        this.props.profileupdateAction(this.props.isLoggedIn, profileData);
        this.setState({
          editMode: false
        });
      } else {
        this.openNotificationWithProfile(
          "error",
          "Error",
          "Please complete all required details to continue"
        );
      }
      if (
        this.state.firstIcon === null &&
        this.props.profileDetails.first_name === null
      ) {
        this.setState({ firstIcon: false });
        document.querySelectorAll(".first_msg")[0].style.display = "block";
        this.setState({ firstmsg: "First Name field is required." });
      }
      if (
        this.state.lastIcon === null &&
        this.props.profileDetails.last_name === null
      ) {
        this.setState({ lastIcon: false });
        document.querySelectorAll(".last_msg")[0].style.display = "block";
        this.setState({ lastmsg: "Last Name field is required." });
      }
      if (
        (this.state.countryIcon === null || this.state.countryIcon === false) &&
        (this.props.profileDetails.country === "" ||
          this.props.profileDetails.country === null)
      ) {
        let countrymsg;
        if (
          this.state.countrySelected &&
          (this.state.stateSelected == "" ||
            this.state.stateSelected == null) &&
          (this.state.citySelected == "" || this.state.citySelected == null)
        ) {
          countrymsg = "State and City Field are required.";
        } else if (
          this.state.countrySelected &&
          this.state.stateSelected &&
          (this.state.citySelected == "" || this.state.citySelected == null)
        ) {
          countrymsg = "City Field is required.";
        } else {
          countrymsg = "Country Field is required.";
        }
        this.setState({ countrymsg });
      }
      if (
        this.state.dobIcon === null &&
        this.state.Datedata === undefined &&
        this.props.profileDetails.dob === null
      ) {
        this.setState({ dobIcon: false });
        document.querySelectorAll(".dob_msg")[0].style.display = "block";
        this.setState({ dobmsg: "Date of Birth is required." });
      }
      if (
        this.state.street1Icon === null &&
        this.props.profileDetails.street_address === null
      ) {
        this.setState({ street1Icon: false });
        document.querySelectorAll(".street1_msg")[0].style.display = "block";
        this.setState({ street1msg: "Street Address is required." });
      }
      if (
        this.state.postalIcon === null &&
        this.props.profileDetails.postal_code === null
      ) {
        this.setState({ postalIcon: false });
        document.querySelectorAll(".postal_msg")[0].style.display = "block";
        this.setState({ postalmsg: "Postal Code is required." });
      }
      if (
        this.state.fiatIcon === false &&
        this.props.profileDetails.fiat === ""
      ) {
        this.setState({ fiatIcon: false });
        document.querySelectorAll(".fiat_msg")[0].style.display = "block";
        this.setState({ fiatmsg: "currency is required." });
      }
      if (
        this.state.dateFIcon !== true &&
        this.props.profileDetails.date_format === ""
      ) {
        this.setState({ dateFIcon: false });
        document.querySelectorAll(".df_msg")[0].style.display = "block";
        this.setState({ dfmsg: "Date Format is required." });
      }
    });
  };

  render() {
    let errors;
    const { getFieldProps, getFieldError } = this.props.form;
    const { profileDetails } = this.props;
    var me = this;

    return (
      <Profilewrap
        className={
          this.props.theme == true ? "profile_details_dark" : "profile_details"
        }
      >
        <Row>
          <Col span={6} />
          <HeaderCol span={12}>
            <span>Personal Details</span>
          </HeaderCol>
        </Row>
        <Mainrow>
          <Col>
            <Row>
              <LeftCol
                md={{ span: 24 }}
                lg={{ span: 6 }}
                xl={{ span: 6 }}
                xxl={{ span: 6 }}
              >
                <div>
                  <ImageDiv src={this.state.profileImg} />
                </div>
                <div>
                  {this.state.showFileInput && (
                    <Imageinput
                      type="file"
                      onChange={this.handleProfile}
                      name="file"
                      id="file"
                      disabled={!this.state.editMode}
                    />
                  )}
                  <Imageup>
                    <Imageupload htmlFor="file">Upload New Photo</Imageupload>
                  </Imageup>
                </div>

                {this.state.remove_pic !== true &&
                  (this.props.profileDetails.profile_pic ? (
                    !this.props.profileDetails.profile_pic.includes(
                      "def_profile.jpg"
                    ) ||
                    (this.state.profileImg !== undefined
                      ? !this.state.profileImg.includes("def_profile.jpg")
                      : true) ? (
                      <Remove
                        disabled={!this.state.editMode}
                        onClick={
                          !this.state.editMode ? "" : this.removePic.bind(this)
                        }
                      >
                        Remove
                      </Remove>
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  ))}
              </LeftCol>
              <RightCol
                md={{ span: 24 }}
                lg={{ span: 15, offset: 3 }}
                xl={{ span: 15, offset: 3 }}
                xxl={{ span: 15, offset: 3 }}
              >
                <FirstRow>
                  <Col
                    md={{ span: 12 }}
                    lg={{ span: 12 }}
                    xl={{ span: 12 }}
                    xxl={{ span: 12 }}
                  >
                    <Firstname>First Name*</Firstname>
                    <Firstinput
                      disabled={!this.state.editMode}
                      placeholder="First Name"
                      {...getFieldProps("first_name", {
                        onChange(e) {
                          me.onChangeField(e.target.value, "first_name");
                        },
                        initialValue: profileDetails.first_name, // have to write original onChange here if you need
                        rules: [{ required: true }]
                      })}
                    />
                    <FirstMsg className="first_msg">
                      {this.state.firstmsg}
                    </FirstMsg>
                  </Col>
                  <Col
                    md={{ span: 12 }}
                    lg={{ span: 12 }}
                    xl={{ span: 12 }}
                    xxl={{ span: 12 }}
                  >
                    <Lastname>Last Name*</Lastname>
                    <Lastinput
                      disabled={!this.state.editMode}
                      placeholder="Last Name"
                      {...getFieldProps("last_name", {
                        onChange(e) {
                          me.onChangeField(e.target.value, "last_name");
                        },
                        initialValue: profileDetails.last_name, // have to write original onChange here if you need
                        rules: [{ required: true }]
                      })}
                    />
                    <LastMsg className="last_msg">{this.state.lastmsg}</LastMsg>
                  </Col>
                </FirstRow>
                <SecondRow>
                  <Col
                    md={{ span: 24 }}
                    lg={{ span: 24 }}
                    xl={{ span: 24 }}
                    xxl={{ span: 24 }}
                  >
                    <Datebirth>Date of Birth*</Datebirth>
                    <Datepicker
                      {...this.props}
                      onDateChange={(value, field) =>
                        this.onDateChange(value, field)
                      }
                      disabled={!this.state.editMode}
                    />
                    <DobMsg className="dob_msg">{this.state.dobmsg}</DobMsg>
                  </Col>
                </SecondRow>
                <ThirdRow>
                  <Col
                    md={{ span: 24 }}
                    lg={{ span: 24 }}
                    xl={{ span: 24 }}
                    xxl={{ span: 24 }}
                  >
                    <StreetAddress>Street Address Line 1*</StreetAddress>
                    <Streetinput
                      placeholder="Street Address"
                      {...getFieldProps("street_address", {
                        onChange(e) {
                          me.onChangeField(e.target.value, "street_address");
                        },
                        initialValue: profileDetails.street_address, // have to write original onChange here if you need
                        rules: [{ type: "string", required: true }]
                      })}
                      disabled={!this.state.editMode}
                    />
                    <StreetMsg className="street1_msg">
                      {this.state.street1msg}
                    </StreetMsg>
                  </Col>
                </ThirdRow>
                <ThirdRow>
                  <StreetAddress>Street Address Line 2</StreetAddress>
                  <Streetinput
                    disabled={!this.state.editMode}
                    placeholder="Street Address"
                    {...getFieldProps("street_address_2", {
                      onChange(e) {
                        me.onChangeField(e.target.value, "street_address_2");
                      },
                      initialValue:
                        profileDetails.street_address_2 !== null
                          ? profileDetails.street_address_2
                          : "", // have to write original onChange here if you need
                      rules: [{ type: "string" }]
                    })}
                  />
                  <StreetMsg className="street2_msg">
                    {this.state.street2msg}
                  </StreetMsg>
                </ThirdRow>
                <FourthRow>
                  <Col
                    md={{ span: 24 }}
                    lg={{ span: 24 }}
                    xl={{ span: 24 }}
                    xxl={{ span: 24 }}
                  >
                    <CountryPick
                      // {...this.props}
                      disabled={!this.state.editMode}
                      theme={this.props.theme}
                      country={
                        this.state.countrySelected !== null
                          ? this.state.countrySelected
                          : this.props.profileDetails.country
                      }
                      state={
                        this.state.stateSelected !== null
                          ? this.state.stateSelected
                          : this.props.profileDetails.state
                      }
                      city={
                        this.state.citySelected !== null
                          ? this.state.citySelected
                          : this.props.profileDetails.city_town
                      }
                      onCountryChange={(country, state, city) =>
                        this.onCountryChange(country, state, city)
                      }
                    />
                    <CountryMsg className="country_msg">
                      {this.state.countrymsg}
                    </CountryMsg>
                  </Col>
                </FourthRow>
                <FourthRow>
                  <Col md={{ span: 24 }} lg={{ span: 24 }} xl={{ span: 24 }}>
                    <Postal>Postal Code*</Postal>
                    <Postalinput
                      disabled={!this.state.editMode}
                      placeholder="Postal Code"
                      {...getFieldProps("postal_code", {
                        onChange(e) {
                          me.onChangeField(e.target.value, "postal_code");
                        },
                        initialValue: profileDetails.postal_code, // have to write original onChange here if you need
                        rules: [{ type: "string", required: true }]
                      })}
                    />
                    <PostalMsg className="postal_msg">
                      {this.state.postalmsg}
                    </PostalMsg>
                  </Col>
                </FourthRow>
                <SixthRow>
                  <Col
                    md={{ span: 24 }}
                    lg={{ span: 24 }}
                    xl={{ span: 24 }}
                    xxl={{ span: 24 }}
                  >
                    <FIAT>Default Currency*</FIAT>
                    <RadioGroup
                      disabled={!this.state.editMode}
                      onChange={this.onChangeFiat}
                      value={
                        this.state.fiat !== ""
                          ? this.state.fiat
                          : profileDetails.fiat
                      }
                    >
                      <Radio value={"USD"}>USD</Radio>
                      <Radio value={"INR"}>INR</Radio>
                      <Radio value={"EUR"}>EUR</Radio>
                    </RadioGroup>
                    <FIATMsg className="fiat_msg">{this.state.fiatmsg}</FIATMsg>
                  </Col>
                </SixthRow>
                <SixthRow>
                  <Col
                    md={{ span: 24 }}
                    lg={{ span: 24 }}
                    xl={{ span: 24 }}
                    xxl={{ span: 24 }}
                  >
                    <FIAT>Default Date Format*</FIAT>
                    <RadioGroup
                      disabled={!this.state.editMode}
                      onChange={this.onChangeFormat}
                      value={
                        this.state.date_format !== ""
                          ? this.state.date_format
                          : profileDetails.date_format
                      }
                    >
                      <Radio value={"MM/DD/YYYY"}>MM/DD/YYYY</Radio>
                      <Radio value={"DD/MM/YYYY"}>DD/MM/YYYY</Radio>
                      <Radio value={"MMM DD,YYYY"}>MMM DD,YYYY</Radio>
                    </RadioGroup>
                    <FIATMsg className="df_msg">{this.state.dfmsg}</FIATMsg>
                  </Col>
                </SixthRow>
                {this.state.editMode && (
                  <SixthRow
                    className={this.props.theme ? "terms_conditions_dark" : ""}
                  >
                    <Col>
                      <span>
                        {" "}
                        By clicking on SAVE you agree to FALDAX{" "}
                        <a
                          target="_blank"
                          href={`${globalVariables.Terms_and_services}`}
                        >
                          Terms of Services
                        </a>
                        ,{" "}
                        <a
                          target="_blank"
                          href={`${globalVariables.Privacy_policy}`}
                        >
                          Privacy Policy
                        </a>
                        ,{" "}
                        <a
                          target="_blank"
                          href={`${globalVariables.Anti_money_laundering_policy}`}
                        >
                          Anti-Money Laundering Policy
                        </a>{" "}
                        and{" "}
                        <a
                          target="_blank"
                          href={`${globalVariables.Cookie_policy}`}
                        >
                          Cookies Policy
                        </a>
                        .
                      </span>
                    </Col>
                    <FIATMsg className="agree_check_msg">
                      {this.state.agree_check_msg}
                    </FIATMsg>
                  </SixthRow>
                )}

                <FifthRow>
                  <Col
                    md={{ span: 24 }}
                    lg={{ span: 24 }}
                    xl={{ span: 24 }}
                    xxl={{ span: 24 }}
                  >
                    {/* <Save type="primary" onClick={this.openAgreePopup}>
                      Save
                    </Save> */}
                    {this.state.editMode ? (
                      <div className="edit_profile_actions">
                        {this.state.isFirstLogin ? (
                          <Save type="primary" onClick={this.submit}>
                            Save
                          </Save>
                        ) : (
                          <Save type="primary" onClick={this.openAgreePopup}>
                            Save
                          </Save>
                        )}
                        <Save
                          type="primary"
                          onClick={() => {
                            this.setState(
                              {
                                editMode: false
                              },
                              () => {
                                this.props.getProfileDataAction(
                                  this.props.isLoggedIn
                                );
                                document.querySelectorAll(
                                  ".first_msg"
                                )[0].style.display = "none";
                                document.querySelectorAll(
                                  ".last_msg"
                                )[0].style.display = "none";
                                document.querySelectorAll(
                                  ".country_msg"
                                )[0].style.display = "none";
                                document.querySelectorAll(
                                  ".dob_msg"
                                )[0].style.display = "none";
                                document.querySelectorAll(
                                  ".street1_msg"
                                )[0].style.display = "none";
                                document.querySelectorAll(
                                  ".street2_msg"
                                )[0].style.display = "none";
                                /* document.querySelectorAll(".city_msg")[0].style.display = "none"; */
                                document.querySelectorAll(
                                  ".postal_msg"
                                )[0].style.display = "none";
                              }
                            );
                          }}
                        >
                          Cancel
                        </Save>
                      </div>
                    ) : (
                      <Save
                        onClick={() => {
                          this.setState({
                            editMode: true
                          });
                        }}
                      >
                        Edit
                      </Save>
                    )}
                  </Col>
                </FifthRow>
              </RightCol>
              <AgreeTerms
                agreeTerms={(e, isUpdate) => {
                  if (isUpdate) {
                    this.agreeTerms(e);
                  } else {
                    this.props.getProfileDataAction(this.props.isLoggedIn);
                    this.setState({
                      editMode: true,
                      isFirstLogin: !isUpdate
                    });
                  }
                }}
                dontAgreeTerms={e => this.dontAgreeTerms(e)}
                comingCancel={e => this.comingCancel(e)}
                visible={
                  this.state.agreeTermsShow ||
                  profileDetails.is_terms_agreed == false
                }
                showCancelBtn={profileDetails.is_terms_agreed}
                isLoggedIn={this.props.isLoggedIn}
              />
              {this.props.loader === true ? <FaldaxLoader /> : ""}
            </Row>
          </Col>

          {(errors = getFieldError("required")) ? errors.join(",") : null}
        </Mainrow>
      </Profilewrap>
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
    loader: state.simpleReducer.loader,
    apiStatus:
      state.simpleReducer.update !== undefined
        ? state.simpleReducer.update.status
        : "",
    apiMessage:
      state.simpleReducer.update !== undefined
        ? state.simpleReducer.update.message
        : "",
    profileError:
      state.simpleReducer.profileError !== undefined
        ? state.simpleReducer.profileError
        : undefined
  };
};
const mapDispatchToProps = dispatch => ({
  profileupdateAction: (isLoggedIn, form) =>
    dispatch(profileupdateAction(isLoggedIn, form)),
  getProfileDataAction: isLoggedIn =>
    dispatch(getProfileDataAction(isLoggedIn)),
  removepicAction: (isLoggedIn, form) =>
    dispatch(removepicAction(isLoggedIn, form)),
  clearEditData: () => dispatch(clearEditData()),
  profileErr: () => dispatch(profileError()),
  LogoutUser: () => dispatch(LogoutUser())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(createForm()(PersonalDetails));
