/* In-built Packages */
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { connect } from "react-redux";
import { createForm, formShape } from 'rc-form';
import { Row, Col ,Input,Button,notification,Icon} from 'antd';
import styled from 'styled-components'
import Datepicker from "./Datepicker"
import CountryPick from "./Country"
/* Components */
import {Email_req} from "../../Landing/User_forms/Login_Form"
import {globalVariables} from "../../../Globals"
import {profileupdateAction ,removepicAction, getProfileDataAction} from "../../../Actions/Settings/settings"

const {TextArea} = Input;    
/* Styled-Components */

const Profile_wrap = styled.div`
    width: 71%;
    margin: auto;
`
const HeaderCol = styled(Col)`
  font-size:20px;
  font-weight: bold;
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
`
const Remove = styled.div`
    margin-top:20px;
    color:#0f477b;
    cursor:pointer;
`
const Right_Col = styled(Col)`
    @media(max-width:992px)
    {
        margin-top: 60px;
    }
`
const First_Row = styled(Row)`
    text-align:left;
`
const First_name = styled.div`
    font-size: 14.007px;
    font-family: "Open Sans";
    color: rgba( 80, 80, 80, 0.502 );
    -moz-transform: matrix( 0.99999985149599,0,0,0.99949238260564,0,0);
    -webkit-transform: matrix( 0.99999985149599,0,0,0.99949238260564,0,0);
    -ms-transform: matrix( 0.99999985149599,0,0,0.99949238260564,0,0);
    margin-bottom:10px;
`
const First_input = styled(Input)`
    background-color:#f8f8f8;
    width:89%;
    border:1px solid #dadfe3;
    @media(max-width:768px)
    {
        width:100%;
    }
`
const First_Msg = styled(Email_req)`
    display:block;
`
const Last_Msg =styled(First_Msg)``
const Country_Msg =styled(First_Msg)``
const Dob_Msg =styled(First_Msg)``
const Street_Msg =styled(First_Msg)``
const City_Msg =styled(First_Msg)``
const Postal_Msg =styled(First_Msg)``
const Last_name = styled(First_name)`
    @media(max-width:768px)
    {
        margin-top:25px;
    }
`
const Last_input = styled(Input)`
    background-color:#f8f8f8;
    width:90%;
    border:1px solid #dadfe3;
    @media(max-width:768px)
    {
        width:100%;
    }
   
`
const Second_Row = styled(Row)`
    text-align:left;
    margin-top:25px;
`
const Country = styled(First_name)`
   
`
const Country_input = styled(First_input)`
    @media(max-width:992px)
    {
        width:95%;
    }
    @media(max-width:768px)
    {
        width:100%;
    }
`
const Date_birth = styled(First_name)`
    
    @media(max-width:992px)
    {
        margin-top:25px;
    }

`
const Third_Row = styled(Second_Row)`
    text-align:left;
`
const Street_Address = styled(First_name)`

`
const Street_input = styled(TextArea)`
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
const Fourth_Row = styled(Second_Row)`
    text-align:left;
`
const City = styled(First_name)`

`
const Postal = styled(First_name)`
    @media(max-width:768px)
    {
        margin-top:25px;
    }
`
const Fifth_Row = styled(Row)`
    text-align:left;
    margin-top:50px;
`
const Save = styled(Button)`
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
    box-shadow: 0px 6px 5px 0px rgb( 76, 132, 255 );
    margin-left: 10px;
    width: 15%;
    @media(max-width:600px)
    {
        width:100px;   
    }
`
class PersonalDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Datedata:undefined,
            firstmsg:null,
            lastmsg:null,
            countrymsg:null,
            dobmsg:null,
            streetmsg:null,
            citymsg:null,
            postalmsg:null,
            profileImg:undefined,
            imageName:null,
            imageType:null,
            imagemsg:null,profileImage:null,
            countrySelected:this.props.profileDetails.country
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
         /*  console.log(error, value,"Check Here ====>",this.state,this.props); */
          if(error==null && (this.state.Datedata!==undefined || this.props.profileDetails.dob!==undefined) && (this.state.countrySelected!==undefined || this.props.profileDetails.country!==undefined))
          {
            document.querySelectorAll(".first_msg")[0].style.display = "none";
            document.querySelectorAll(".last_msg")[0].style.display = "none";
            document.querySelectorAll(".country_msg")[0].style.display = "none";
            document.querySelectorAll(".dob_msg")[0].style.display = "none";
            document.querySelectorAll(".street_msg")[0].style.display = "none";
            document.querySelectorAll(".city_msg")[0].style.display = "none";
            document.querySelectorAll(".postal_msg")[0].style.display = "none";
            this.setState({first_msg:null,last_msg:null,country_msg:null,dob_msg:null,street_msg:null,city_msg:null,postal_msg:null});
            
            let number = Number(value.postal_code);
            let country = this.state.countrySelected;
            if(this.state.Datedata!==undefined && this.state.Datedata!==null)
            {  
                dataDate = this.state.Datedata.year + "/" + this.state.Datedata.month + "/" + this.state.Datedata.day
            }
            else
            {    
                dataDate = this.props.profileDetails.dob 
            }
            if(country==undefined && country==null)
            {
                country=this.props.country
            }
            /* console.log("BEFORE FORM",value,this.state.countrySelected,this.state.profileImage,dataDate) */
            profileData.append('first_name', value.first_name);
            profileData.append('email',this.props.email);
            profileData.append('last_name',value.last_name);
            profileData.append('country',country);
            profileData.append('street_address',value.street_address)
            profileData.append('city_town',value.city_town);
            profileData.append('postal_code',number);
            profileData.append('dob',dataDate);
            if(this.state.profileImage!==null && this.state.profileImage!==undefined)
            profileData.append('profile_pic',this.state.profileImage)
            /* console.log(profileData) */
            this.openNotificationWithIcon('warning');
            this.props.profileupdateAction(this.props.isLoggedIn,profileData);
          }
          else
          {
            if(error.first_name!==null && error.first_name!==undefined)
            {
              if(error.first_name.errors[0].message!==undefined && error.first_name.errors[0].message!==null)
              {
                document.querySelectorAll(".first_msg")[0].style.display = "block";
                this.setState({firstmsg:"*First name is incorrect"})
              }
              else
              {
                document.querySelectorAll(".first_msg")[0].style.display = "none";
                this.setState({firstmsg:null})
              }
            }
            if(error.lastname!==null && error.lastname!==undefined)
            {
              if(error.last_name.errors[0].message!==undefined && error.last_name.errors[0].message!==null)
              {
                document.querySelectorAll(".last_msg")[0].style.display = "block";
                this.setState({lastmsg:"*Last name is incorrect"})
              }
              else
              {
                document.querySelectorAll(".last_msg")[0].style.display = "none";
                this.setState({lastmsg:null})
              }
            }
            if(error.country!==null && error.country!==undefined)
            {
              if(error.country.errors[0].message!==undefined && error.country.errors[0].message!==null)
              {
                document.querySelectorAll(".country_msg")[0].style.display = "block";
                this.setState({countrymsg:"*Phone Number is Incorrecct"})
              }
              else
              {
                
                document.querySelectorAll(".country_msg")[0].style.display = "none";
                this.setState({countrymsg:null})
              }
            }
            if(error.street_address!==null && error.street_address!==undefined)
            {
              if(error.street_address.errors[0].message!==undefined && error.street_address.errors[0].message!==null)
              {
                document.querySelectorAll(".street_msg")[0].style.display = "block";
                this.setState({streetmsg:"*Street Address is Incorrecct"})
              }
              else
              {
                document.querySelectorAll(".street_msg")[0].style.display = "none";
                this.setState({streetmsg:null})
              }
            }
            if(error.city_town!==null && error.city_town!==undefined)
            {
              if(error.city_town.errors[0].message!==undefined && error.city_town.errors[0].message!==null)
              {
                document.querySelectorAll(".city_msg")[0].style.display = "block";
                this.setState({citymsg:"*City is Incorrecct"})
              }
              else
              {
                document.querySelectorAll(".city_msg")[0].style.display = "none";
                this.setState({citymsg:null})
              }
            }
            if(error.postal_code!==null && error.postal_code!==undefined)
            {
              if(error.postal_code.errors[0].message!==undefined && error.postal_code.errors[0].message!==null)
              {
                document.querySelectorAll(".postal_msg")[0].style.display = "block";
                this.setState({postalmsg:"*Postal is Incorrecct"})
              }
              else
              {
                document.querySelectorAll(".postal_msg")[0].style.display = "none";
                this.setState({postalmsg:null})
              }
            }
            if(this.state.Datedata==undefined)
            {
                document.querySelectorAll(".dob_msg")[0].style.display = "block";
                this.setState({dobmsg:"*Date of Birth is Incorrecct"})
            }
            else
            {
                document.querySelectorAll(".dob_msg")[0].style.display = "none";
                this.setState({dobmsg:null})
            }
          }
        });
      }
      onDateChange(Datedata)
      { 
        this.setState({Datedata})
      }
      onCountryChange(country)
      {
          this.setState({countrySelected:country})
      }
      componentWillMount()
      {
          /* console.log(this.props) */
            this.props.getProfileDataAction(this.props.isLoggedIn)
      }
      componentWillReceiveProps(props,newProps)
      {
          /* console.log(this.state,this.props,props,newProps) */
            if(props.profileDetails.profile_pic!==null && props.profileDetails.profile_pic!==undefined && props.profileDetails.profile_pic!=="" )
            {
                /* console.log("CWRP",this.state.profileImg,props.profileDetails.profile_pic) */
                this.setState({profileImg:globalVariables.amazon_Bucket + props.profileDetails.profile_pic})
            }
            else
            {
                this.setState({profileImg:"./images/Settings/def_profile.jpg"})
            }
      }
      handleProfile(e) {
        try{
            const reader = new FileReader();
            const file = e.target.files[0];
            const fileType = e.target.files[0] && e.target.files[0].type ? e.target.files[0].type.substring(0, e.target.files[0].type.indexOf('/') ) : '';
            const fileSize = e.target.files[0] && e.target.files[0].size ? e.target.files[0].size : 0;
            /* console.log("handleProfile") */
            //check file size to max 5mb (5*1024*1024=5242880) and type image
            if(fileType==='image' && fileSize<5242880) {
                reader.onload = (upload) => {
                    this.setState({
                        profileImg: upload.target.result,
                        imageName: file.name,
                        imageType: file.type,
                        profileImage : file,
                        imagemsg:""
                    });
                };
            } else {
               /*  console.log(" elsse handleProfile") */
                this.setState({profileImg: "Default Photo", imageName: '', imageType: fileType , imagemsg:'Please select image with less then 5 mb'})
            }
        
            reader.readAsDataURL(file);
        } catch(error) {
            this.setState({ imagemsg: 'Something went wrong please try again' });
        }
      }
      removePic()
      {
            const formData = new FormData();
            /* console.log(this.props) */
            this.removeNotification("warning");
            formData.append('email',this.props.email)
            formData.append('profile_pic',"")
            this.props.removepicAction(this.props.isLoggedIn,formData)
      }
      openNotificationWithIcon = (type) => {
        notification[type]({
          message: 'Updating Profile',
          description: 'Please wait.....',
          duration: 3,
        });
      };
      removeNotification = (type) => {
        notification[type]({
            message: 'Removing profile picture',
            description: 'Please wait.....',
            duration: 3,
          }); 
      }
    render() {
        /* console.log(this.props) */
        let errors;
        let imageSRC
        let firstname = `${this.props.profileDetails.first_name}`
        const { getFieldProps, getFieldError } = this.props.form;
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
                            <Left_Col md={{span:24}} lg={{span:6}} xl={{span:6}} xxl={{span:6}}>
                               {/*  {console.log("Above Image",this.state,this.props)} */}
                                <div><ImageDiv src={this.state.profileImg} /></div>
                                <div><Image_input type="file" onChange={this.handleProfile} name="file" id="file"/><Image_up><Image_upload for="file">Upload New Photo</Image_upload></Image_up></div>
                                <Remove onClick={this.removePic.bind(this)}>Remove</Remove>
                            </Left_Col>
                            <Right_Col md={{span:24}} lg={{span:15,offset:3}} xl={{span:15,offset:3}} xxl={{span:15,offset:3}}>
                                <First_Row>
                                    <Col md={{span:12}} lg={{span:12}} xl={{span:12}} xxl={{span:12}}>
                                        <First_name>First Name</First_name>
                                   {/*      {console.log(this.props.profileDetails.first_name)} */}
                                        <First_input placeholder="First Name" {...getFieldProps('first_name', {
                                            onChange(){/* console.log("Hello How are You") */},
                                            initialValue:this.props.profileDetails.first_name, // have to write original onChange here if you need
                                            rules: [{required: true}],
                                        })}/>
                                        <First_Msg className="first_msg">{this.state.firstmsg}</First_Msg>
                                    </Col>
                                    <Col md={{span:12}} lg={{span:12}} xl={{span:12}} xxl={{span:12}}>
                                        <Last_name>Last Name</Last_name>
                                        <Last_input placeholder="Last Name" {...getFieldProps('last_name', {
                                            onChange(){/* console.log("Hello How are You") */}, 
                                            initialValue:this.props.profileDetails.last_name,// have to write original onChange here if you need
                                            rules: [{required: true}],
                                        })}/>
                                        <Last_Msg className="last_msg">{this.state.lastmsg}</Last_Msg>
                                    </Col>
                                </First_Row>
                                <Second_Row>
                                    <Col md={{span:24}} lg={{span:12}} xl={{span:12}} xxl={{span:12}}>
                                        <Country>Country</Country>
                                        <CountryPick {...this.props} onCountryChange={ (value) => this.onCountryChange(value) }/>
                                        <Country_Msg className="country_msg">{this.state.countrymsg}</Country_Msg>
                                    </Col>
                                    <Col md={{span:24}} lg={{span:12}} xl={{span:12}} xxl={{span:12}}>
                                        <Date_birth>Date of Birth</Date_birth>
                                        <Datepicker {...this.props} onDateChange={(Data) => this.onDateChange(Data)}/>
                                        <Dob_Msg className="dob_msg">{this.state.dobmsg}</Dob_Msg>
                                    </Col>
                                </Second_Row>
                                <Third_Row>
                                    <Col md={{span:24}} lg={{span:24}} xl={{span:24}} xxl={{span:24}}>
                                        <Street_Address>Street Address</Street_Address>
                                        <Street_input placeholder="Street Address" autosize={{ minRows: 3, maxRows: 6 }} {...getFieldProps('street_address', {
                                            onChange(){/* console.log("Hello How are You") */},
                                            initialValue:this.props.profileDetails.street_address, // have to write original onChange here if you need
                                            rules: [{required: true}],
                                        })}/>
                                        <Street_Msg className="street_msg">{this.state.streetmsg}</Street_Msg>
                                    </Col>
                                </Third_Row>
                                <Fourth_Row>
                                    <Col md={{span:12}} lg={{span:12}} xl={{span:12}} xxl={{span:12}}>
                                        <City>City/Town</City>
                                        <First_input placeholder="City"{...getFieldProps('city_town', {
                                            onChange(){/* console.log("Hello How are You") */},
                                            initialValue:this.props.profileDetails.city_town, // have to write original onChange here if you need
                                            rules: [{required: true}],
                                        })}/>
                                        <City_Msg className="city_msg">{this.state.citymsg}</City_Msg>
                                    </Col>
                                    <Col md={{span:12}} lg={{span:12}} xl={{span:12}} xl={{span:12}}>
                                        <Postal>Postal Code</Postal>
                                        <Last_input placeholder="Postal Code"{...getFieldProps('postal_code', {
                                            onChange(){/* console.log("Hello How are You") */},
                                            initialValue:this.props.profileDetails.postal_code,// have to write original onChange here if you need
                                            rules: [{required: true}],
                                        })}/>
                                        <Postal_Msg className="postal_msg">{this.state.postalmsg}</Postal_Msg>
                                    </Col>
                                </Fourth_Row>
                                <Fifth_Row>
                                    <Col md={{span:24}} lg={{span:24}} xl={{span:24}} xxl={{span:24}}>
                                        <Save type="primary"  onClick={this.submit}>Save</Save>
                                    </Col>
                                </Fifth_Row>
                            </Right_Col>
                        </Row>
                    </Col>
                    {(errors = getFieldError('required')) ? errors.join(',') : null}
                </Main_row>
            </Profile_wrap>
        );
    }
}
const mapStateToProps = (state) => {
    /* console.log("personalDetails",state) */
    return {
      ...state,
        email:state.simpleReducer.profileDetails!==undefined?state.simpleReducer.profileDetails.data[0].email:"",
        profileDetails:state.simpleReducer.profileDetails!==undefined?state.simpleReducer.profileDetails.data[0]:""
    }
  }
const mapDispatchToProps = dispatch => ({
    profileupdateAction: (isLoggedIn,form) => dispatch(profileupdateAction(isLoggedIn,form)),
    getProfileDataAction: (isLoggedIn) => dispatch(getProfileDataAction(isLoggedIn)),
    removepicAction : (isLoggedIn,form) => dispatch(removepicAction(isLoggedIn,form))
})

export default connect(mapStateToProps,mapDispatchToProps)(createForm()(PersonalDetails));
