import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { connect } from "react-redux"
import { Row, Col, Tabs, Button, Input, notification, Steps, Icon } from 'antd';
import styled from 'styled-components';
import { Button_wrap, Sub_wrap, Back_Button, Next_Button } from "./IDselect"

import {kycDoc,kycFormAction} from "../../../Actions/Settings/passwordChange"

const SSN_wrap = styled.div`
    width:100%;
    margin-left:auto;
    margin-right:auto;
    // border:1px solid #e8ebee;
    margin-top:88px;
    text-align:left;
    @media(max-width:1024px)
    {
        width:70%;
    }
    @media(max-width:664px)
    {
        width:90%;
    }
`
const SSN_sub = styled.div`
`
const SSN_label = styled.label`
    display:block;
    text-align:center;
    margin-bottom:10px;
`
const SSN_input = styled.input`
    display:block;
    width:85%;
    margin-bottom:50px;
    height:45px;
    padding:5px;
    background-color:#f8f8f8;
    border:none;
    border-style: solid;
    border-width: 1px;
    border-color: rgb( 212, 218, 223 );
    border-radius: 5px;
    background-color: rgb( 248, 248, 248 );      
`
const File_wrap = styled.div`
    text-align:center;
    margin-top:20px;
`
const File_select1 = styled.div`
    display:inline-block;
    width: 146px;
    height: 146px;
    margin-right:15px;
    @media(max-width:478px)
    {
        display:block;
        margin-right:auto;
        margin-left:auto;
        margin-top:20px;
    }

`
const File_select2 = styled(File_select1)`
    display:inline-block;
    margin-left:15px;
    margin-right:0px;
    @media(max-width:478px)
    {
        display:block;
        margin-right:auto;
        margin-left:auto;
    }
`
const ButtonUp = styled.button`
    display: block;
    /* width: 85%; */
    /* margin: 0 auto; */
    height: 145px;
    background-color: white;
    box-shadow: none;
    border: 1px solid #4c84ff;
    border-radius: 20px;
    cursor: pointer;
    &:focus{
        outline: none;
    }
`
const Plus = styled.span`
    width: 40px;
    height: 40px;
    display: block;
    margin: 0 auto;
    background-color: #4c84ff;
    text-align: center;
    border-radius: 50%;
    color: white;
    font-size: 21px;
    padding-top: 6px;
`
const Plus_text = styled.span`
margin-top: 18px;
display: block;
`
const ButtonUp2 = styled(ButtonUp)`

`
const Plus2 = styled(Plus)`

`
const Plus_text2 = styled(Plus_text)`

`
const File_input = styled.input`
visibility: hidden;
position: absolute;`
const File_input2 = styled.input`
visibility: hidden;
position: absolute;
`


class DocUpload extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
            profileImg:"",
            imageName:"",
            imageType:"",
            profileImage:"",
            imagemsg:"",
            icon1:"plus",
            frontImg:"",
            backImg:"",
            icon2:"plus",
            click:''
        }
        this.handleProfile = this.handleProfile.bind(this);
    }
    handleFileSelectClick(val) {
       /*  console.log(val) */
        document.querySelector("#" + val).click();
        this.setState({click:val})
    }
    handleProfile(e) {
        try{
            const reader = new FileReader();
            const file = e.target.files[0];
            const fileType = e.target.files[0] && e.target.files[0].type ? e.target.files[0].type.substring(0, e.target.files[0].type.indexOf('/') ) : '';
            const fileSize = e.target.files[0] && e.target.files[0].size ? e.target.files[0].size : 0;
            if(e.target.name=="front-doc")
            {
                this.setState({icon1:"check"})
            }
            else
            {
                this.setState({icon2:"check"})
            }
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
            var DataForm = new FormData()
            DataForm.append("image",file)
          /*   console.log(e.target.name) */
            this.props.kycDoc(this.props.isLoggedIn,DataForm,e.target.name)
        } catch(error) {
            this.setState({ imagemsg: 'Something went wrong please try again' });
        }
      }
      openNotificationWithIcon(type, head, desc) {
        notification[type]({
          message: head,
          description: desc,
        });
      };
    next_step()
    {
   /*      console.log("next_step") */
        if(this.state.icon1=="check" && this.state.icon2=="check")
        {
           /*  console.log("next_step",this.state) */
            if(this.state.frontImg!=="" && this.state.backImg!=="")
            {
        /*         console.log("next_step") */
                var temp = {};
                temp["front_doc"]=this.state.frontImg;
                temp["back_doc"]=this.state.backImg;
                temp["steps"] = 3 ;
                this.props.kycFormAction(this.props.isLoggedIn,temp)
            }
        }
        else
        {
            this.openNotificationWithIcon("error","KYC","Please upload front and back of your document")
        }
    }
    back_step()
    {
        this.props.back_step(1)
    }
    componentWillReceiveProps(props,newProps)
    {
       /*  console.log(this.props,this.state) */
        if(this.state.icon1=="check" && this.state.click=='front')
        {
            this.setState({frontImg:props.image_path})
        }
        else if(this.state.icon2 == "check" && this.state.click=='back')
        {
            this.setState({backImg:props.image_path})
        }
        if(this.props.is_kyc_done==true)
        {
            this.props.next_step(5)
        }
    }
    render() {

  /*       console.log("Meghal Doc",this.state) */
        return (
            <div>
                {/* console.log("HElloasjfbjabjhadvbfdavjhfvwavefv") */}
                <SSN_wrap>
                    <SSN_sub>
                        <SSN_label>Upload Document</SSN_label>
                    </SSN_sub>
                    <File_wrap>
                            <File_select1 className="file-select-col">
                                <ButtonUp className="file-select-btn" onClick={() => { this.handleFileSelectClick('front') }}>
                                    <Plus className="plus"><Icon type={this.state.icon1} theme="outlined" /></Plus>
                                    <Plus_text className="text">click here to upload front of document</Plus_text>
                                </ButtonUp>
                                <File_input onChange={this.handleProfile} type="file" name="front-doc" id="front" />
                            </File_select1>
                            <File_select2 md={{ span: 6 }} className="file-select-col">
                                <ButtonUp2 className="file-select-btn" onClick={() => { this.handleFileSelectClick('back') }}>
                                    <Plus2 className="plus"><Icon type={this.state.icon2} theme="outlined" /></Plus2>
                                    <Plus_text2 className="text">click here to upload back of document</Plus_text2>
                                </ButtonUp2>
                                <File_input2 onChange={this.handleProfile}  type="file" name="back-doc" id="back" />
                            </File_select2>
                    </File_wrap>
                </SSN_wrap>
                <Button_wrap>
                    <Sub_wrap>
                        <Back_Button onClick={this.back_step.bind(this)} type="primary">Back</Back_Button>
                        <Next_Button onClick = {this.next_step.bind(this)} type="primary">Next</Next_Button>
                    </Sub_wrap>
                </Button_wrap>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    /* console.log("personalDetails",state) */
    return {
      ...state,
        image_path:state.passwordReducer.image_path !== undefined ? state.passwordReducer.image_path:"",
        isLoggedIn : state.simpleReducer.isLoggedIn !==undefined ? state.simpleReducer.isLoggedIn:"",
        is_kyc_done : state.simpleReducer.profileDetails !== undefined ? state.simpleReducer.profileDetails.data[0].is_kyc_done : ""
    }
  }
const mapDispatchToProps = dispatch => ({
    kycDoc:(is,Data,type)=>dispatch(kycDoc(is,Data,type)),
    kycFormAction:(isLoggedIn,value)=>dispatch(kycFormAction(isLoggedIn,value))
})

export default  connect(mapStateToProps,mapDispatchToProps)(DocUpload);