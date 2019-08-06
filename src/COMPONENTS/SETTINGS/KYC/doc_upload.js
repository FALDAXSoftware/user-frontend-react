/* Built-in Packages */
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { connect } from "react-redux"
import { notification, Icon } from 'antd';
import styled from 'styled-components';

/* components */
import { kycDoc, kycFormAction } from "ACTIONS/SETTINGS/passwordActions"
import FaldaxLoader from 'SHARED-COMPONENTS/FaldaxLoader';

/* STYLED-COMPONENTS */
import { ButtonWrap, SubWrap, BackButton, NextButton } from "./id_select"

const SSNWrap = styled.div`
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
const SSNSub = styled.div`
    color:${props => props.theme.mode === "dark" ? "white" : ""};
`
const SSNlabel = styled.label`
    display:block;
    font-size: 18px;
    font-family: open sans;
    text-align:center;
    margin-bottom:10px;
`
export const Filewrap = styled.div`
    text-align:center;
    margin-top:20px;
`
export const Fileselect1 = styled.div`
    display:inline-block;
    width: 146px;
    height: 146px;
    margin-right:15px;
    text-align:right;
    
    @media(max-width:478px)
    {
        display:block;
        margin-right:auto;
        margin-left:auto;
        margin-top:20px;
    }
`
const Fileselect2 = styled(Fileselect1)`
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
export const ButtonUp = styled.button`
    display: block;
    width: 100%;
    /* margin: 0 auto; */
    height: 145px;
    background-color: ${props => props.theme.mode === "dark" ? "#01090f" : 'white'};
    color: ${props => props.theme.mode === "dark" ? "white" : ""};
    box-shadow: none;
    border: 1px solid rgb(0,170,250);
    border-radius: 20px;
    cursor: pointer;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    &:focus{
        outline: none;
    }
`
export const Plus = styled.span`
    width: 40px;
    height: 40px;
    display: block;
    margin: 0 auto;
    background-color: rgb(0,170,250);
    text-align: center;
    border-radius: 50%;
    color: white;
    font-size: 21px;
    padding-top: 6px;
`
export const Plustext = styled.span`
margin-top: 18px;
display: block;
font-size: 18px;
`
const ButtonUp2 = styled(ButtonUp)`
`
const Plus2 = styled(Plus)`
`
const Plustext2 = styled(Plustext)`
`
export const Fileinput = styled.input`
    visibility: hidden;
    position: absolute;`
const Fileinput2 = styled.input`
    visibility: hidden;
    position: absolute;
`
export const RemoveIcon1 = styled(Icon)`
    color:${props => props.theme.mode == "dark" ? "white" : "black"};
`
const RemoveIcon2 = styled(RemoveIcon1)`
    color:${props => props.theme.mode == "dark" ? "white" : "black"};
`
class DocUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profileImg: "",
            imageName: "",
            imageType: "",
            profileImage: "",
            imagemsg: "",
            profileImg2: "",
            imageName2: "",
            imageType2: "",
            profileImage2: "",
            imagemsg2: "",
            icon1: "plus",
            frontImg: "",
            backImg: "",
            icon2: "plus",
            click: '',
            frontWidth: '',
            frontHeight: "",
            targetName: '',
            fileTarget: null,
            displayFirst: "none",
            displaySecond: "none"
        }
        this.handleProfile = this.handleProfile.bind(this);
    }

    /* Life-Cycle Methods */
    componentWillReceiveProps(props, newProps) {
        if (this.state.icon1 === "check" && this.state.click === 'front') {
            this.setState({ frontImg: props.image_path })
        } else if (this.state.icon2 === "check" && this.state.click === 'back') {
            this.setState({ backImg: props.image_path })
        }
        if (this.props.is_kyc_done === true) {
            this.props.next_step(5)
        }
    }

    /* 
        Page: /editProfile --> KYC
        It is called when we click on upload button according to front or back.
    */

    handleFileSelectClick(val) {
        document.querySelector("#" + val).click();
        this.setState({ click: val })
    }

    /* 
        Page: /editProfile --> KYC
        It is called once file is selected and file is read and file selected is stored in state.
    */

    handleProfile(e) {
        var _self = this;
        var e1 = e;
        let name = e1.target.name;
        let target = e1.target;
        console.log(e1.target)
        _self.setState({
            targetName: name,
            fileTarget: target
        }, () => {
            var frontWidth, frontHeight;
            try {
                const reader = new FileReader();
                const file = _self.state.fileTarget.files[0];
                const fileType = file && file.type ? file.type.substring(0, file.type.indexOf('/')) : '';
                const fileSize = file && file.size ? file.size : 0;
                console.log(file)
                if (fileType === 'image') {
                    if (fileType === 'image' && fileSize < 5242880) {

                        var fr = new FileReader();
                        fr.readAsDataURL(file);
                        fr.onload = function () {
                            var img = new Image();
                            img.onload = function () {

                                frontWidth = img.width;
                                frontHeight = img.height;

                                if (frontWidth > 450 && frontHeight > 600) {

                                    if (_self.state.targetName === "front-doc") {
                                        _self.setState({ icon1: "check", displayFirst: "" });
                                        reader.onload = (upload) => {
                                            _self.setState({
                                                profileImg: upload.target.result,
                                                imageName: file.name,
                                                imageType: file.type,
                                                profileImage: file,
                                                imagemsg: ""
                                            });
                                        };
                                    } else {
                                        _self.setState({ icon2: "check", displaySecond: "" })
                                        reader.onload = (upload) => {
                                            _self.setState({
                                                profileImg2: upload.target.result,
                                                imageName2: file.name,
                                                imageType2: file.type,
                                                profileImage2: file,
                                                imagemsg2: ""
                                            });
                                        };
                                    }
                                    //check file size to max 5mb (5*1024*1024=5242880) and type image



                                    reader.readAsDataURL(file);
                                    var DataForm = new FormData()
                                    DataForm.append("image", file)
                                    _self.props.kycDoc(_self.props.isLoggedIn, DataForm, _self.state.targetName)
                                } else {
                                    _self.openNotificationWithIcon("error", "File Size", "File should be greater than 450*600 in dimension")
                                }
                            };
                            img.src = fr.result;
                        };
                    } else {
                        if (_self.state.targetName === "front-doc") {
                            _self.setState({ profileImg: "Default Photo", imageName: '', imageType: fileType, imagemsg: 'Please select image with less then 5 mb' })
                        }
                        else {
                            _self.setState({ profileImg2: "Default Photo", imageName2: '', imageType2: fileType, imagemsg2: 'Please select image with less then 5 mb' })
                        }
                        _self.openNotificationWithIcon("error", "File Size", "Please select image with less then 5 mb")
                        document.getElementById("front").value = "";
                        document.getElementById("back").value = "";
                    }
                } else {
                    _self.openNotificationWithIcon("error", "File Format", "File format is not supported. Please upload only images.")
                    document.getElementById("front").value = "";
                    document.getElementById("back").value = "";
                }
            } catch (error) {
                _self.setState({ imagemsg: 'Something went wrong please try again' });
            }
        })
    }
    removeFile(type) {
        var DataForm = new FormData()
        DataForm.append("image", "")
        this.props.kycDoc(this.props.isLoggedIn, DataForm, this.state.targetName)
        if (type == "front-doc") {
            this.setState({
                profileImg: "",
                imageName: "",
                imageType: '',
                profileImage: '',
                imagemsg: "",
                icon1: "plus",
                displayFirst: "none"
            });
            document.getElementById("front").value = "";

        }
        else {
            this.setState({
                profileImg2: "",
                imageName2: "",
                imageType2: '',
                profileImage2: '',
                imagemsg2: "",
                icon2: "plus",
                displaySecond: "none"
            });
            document.getElementById("back").value = "";
        }
    }
    /* 
        Page: /editProfile --> KYC
        It is called for custom Notifications.
    */

    openNotificationWithIcon(type, head, desc) {
        notification[type]({
            message: head,
            description: desc,
        });
    };

    /* 
        Page: /editProfile --> KYC
        It is called when we click next button for next step.
    */

    next_step() {
        console.log(this.state.icon1, this.state.icon2, this.state.frontImg, this.state.backImg)
        if (this.state.icon1 === "check" && this.state.icon2 === "check") {
            if (this.state.frontImg !== "" && this.state.backImg !== "") {
                var kycDoc = {};
                kycDoc["front_doc"] = this.state.frontImg;
                kycDoc["back_doc"] = this.state.backImg;
                kycDoc["steps"] = 3;
                console.log("FINALLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL")
                this.props.kycFormAction(this.props.isLoggedIn, kycDoc)
            }
        } else {
            this.openNotificationWithIcon("error", "KYC", "Please upload front and back of your document")
        }
    }

    /* 
        Page: /editProfile --> KYC
        It is called when we click back button for back step.
    */

    back_step() {
        this.props.back_step(1)
    }


    render() {
        return (
            <div>
                <SSNWrap>
                    <SSNSub>
                        <SSNlabel>Upload Your {this.props.docText}</SSNlabel>
                    </SSNSub>
                    <Filewrap>
                        <Fileselect1 className="file-select-col">
                            {console.log(this.state)}
                            <RemoveIcon1 onClick={() => { this.removeFile('front-doc') }} style={{ display: `${this.state.displayFirst}` }} type={"close"} theme="outlined" />
                            <ButtonUp style={{ backgroundImage: `url('${this.state.profileImg}')` }} className="file-select-btn" onClick={() => { this.handleFileSelectClick('front') }}>

                                <Plus className="plus"><Icon type={this.state.icon1} theme="outlined" /></Plus>
                                <Plustext className="text">Front</Plustext>
                            </ButtonUp>
                            <Fileinput onChange={this.handleProfile} type="file" name="front-doc" id="front" />
                        </Fileselect1>
                        <Fileselect2 md={{ span: 6 }} className="file-select-col">
                            <RemoveIcon2 onClick={() => { this.removeFile('back-doc') }} style={{ display: `${this.state.displaySecond}` }} type={"close"} theme="outlined" />
                            <ButtonUp2 style={{ backgroundImage: `url('${this.state.profileImg2}')` }} className="file-select-btn" onClick={() => { this.handleFileSelectClick('back') }}>
                                <Plus2 className="plus"><Icon type={this.state.icon2} theme="outlined" /></Plus2>
                                <Plustext2 className="text">Back</Plustext2>
                            </ButtonUp2>
                            <Fileinput2 onChange={this.handleProfile} type="file" name="back-doc" id="back" />
                        </Fileselect2>
                    </Filewrap>
                </SSNWrap>
                <ButtonWrap>
                    <SubWrap>
                        <BackButton onClick={this.back_step.bind(this)} type="primary">Back</BackButton>
                        <NextButton onClick={this.next_step.bind(this)} type="primary">Next</NextButton>
                    </SubWrap>
                </ButtonWrap>
                {(this.props.loader === true) ?
                    <FaldaxLoader />
                    : ""
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ...state,
        image_path: state.passwordReducer.image_path !== undefined ? state.passwordReducer.image_path : "",
        isLoggedIn: state.simpleReducer.isLoggedIn !== undefined ? state.simpleReducer.isLoggedIn : "",
        is_kyc_done: state.simpleReducer.profileDetails !== undefined ? state.simpleReducer.profileDetails.data[0].is_kyc_done : "",
        loader: state.simpleReducer.loader
    }
}
const mapDispatchToProps = dispatch => ({
    kycDoc: (is, Data, type) => dispatch(kycDoc(is, Data, type)),
    kycFormAction: (isLoggedIn, value) => dispatch(kycFormAction(isLoggedIn, value))
})

export default connect(mapStateToProps, mapDispatchToProps)(DocUpload);
