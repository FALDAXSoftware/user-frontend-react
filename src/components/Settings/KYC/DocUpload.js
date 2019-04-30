/* Built-in Packages */
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { connect } from "react-redux"
import { notification, Icon } from 'antd';
import styled from 'styled-components';

/* components */
import { kycDoc, kycFormAction } from "Actions/Settings/passwordChange"
import FaldaxLoader from 'shared-components/FaldaxLoader';

/* styled-components */
import { ButtonWrap, SubWrap, BackButton, NextButton } from "./IDselect"

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
    color:${props => props.theme.mode == "dark" ? "white" : ""};
`
const SSN_label = styled.label`
    display:block;
    font-size: 18px;
    font-family: open sans;
    text-align:center;
    margin-bottom:10px;
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
    width: 100%;
    /* margin: 0 auto; */
    height: 145px;
    background-color: ${props => props.theme.mode == "dark" ? "#01090f" : 'white'};
    color: ${props => props.theme.mode == "dark" ? "white" : ""};
    box-shadow: none;
    border: 1px solid rgb(0,170,250);
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
    background-color: rgb(0,170,250);
    text-align: center;
    border-radius: 50%;
    color: white;
    font-size: 21px;
    padding-top: 6px;
`
const Plus_text = styled.span`
margin-top: 18px;
display: block;
font-size: 18px;
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

class DocUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profileImg: "",
            imageName: "",
            imageType: "",
            profileImage: "",
            imagemsg: "",
            icon1: "plus",
            frontImg: "",
            backImg: "",
            icon2: "plus",
            click: '',
            frontWidth: '',
            frontHeight: "",
            targetName: '',
            fileTarget: null,
        }
        this.handleProfile = this.handleProfile.bind(this);
    }
    handleFileSelectClick(val) {
        document.querySelector("#" + val).click();
        this.setState({ click: val })
    }
    handleProfile(e) {
        var _self = this;
        var e1 = e;
        let name = e1.target.name;
        let target = e1.target;
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
                if (fileType == 'image') {
                    if (fileType === 'image' && fileSize < 5242880) {

                        var fr = new FileReader();
                        fr.readAsDataURL(file);
                        fr.onload = function () {
                            var img = new Image;
                            img.onload = function () {

                                frontWidth = img.width;
                                frontHeight = img.height;

                                if (frontWidth > 450 && frontHeight > 600) {

                                    if (_self.state.targetName == "front-doc") {
                                        _self.setState({ icon1: "check" })
                                    } else {
                                        _self.setState({ icon2: "check" })
                                    }
                                    //check file size to max 5mb (5*1024*1024=5242880) and type image
                                    reader.onload = (upload) => {
                                        _self.setState({
                                            profileImg: upload.target.result,
                                            imageName: file.name,
                                            imageType: file.type,
                                            profileImage: file,
                                            imagemsg: ""
                                        });
                                    };

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
                        _self.setState({ profileImg: "Default Photo", imageName: '', imageType: fileType, imagemsg: 'Please select image with less then 5 mb' })
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
    openNotificationWithIcon(type, head, desc) {
        notification[type]({
            message: head,
            description: desc,
        });
    };

    next_step() {
        if (this.state.icon1 == "check" && this.state.icon2 == "check") {
            if (this.state.frontImg !== "" && this.state.backImg !== "") {
                var kycDoc = {};
                kycDoc["front_doc"] = this.state.frontImg;
                kycDoc["back_doc"] = this.state.backImg;
                kycDoc["steps"] = 3;
                this.props.kycFormAction(this.props.isLoggedIn, kycDoc)
            }
        } else {
            this.openNotificationWithIcon("error", "KYC", "Please upload front and back of your document")
        }
    }
    back_step() {
        this.props.back_step(1)
    }
    componentWillReceiveProps(props, newProps) {
        if (this.state.icon1 == "check" && this.state.click == 'front') {
            this.setState({ frontImg: props.image_path })
        } else if (this.state.icon2 == "check" && this.state.click == 'back') {
            this.setState({ backImg: props.image_path })
        }
        if (this.props.is_kyc_done == true) {
            this.props.next_step(5)
        }
    }

    render() {
        return (
            <div>
                <SSNWrap>
                    <SSNSub>
                        <SSN_label>Upload Your {this.props.docText}</SSN_label>
                    </SSNSub>
                    <File_wrap>
                        <File_select1 className="file-select-col">
                            <ButtonUp className="file-select-btn" onClick={() => { this.handleFileSelectClick('front') }}>
                                <Plus className="plus"><Icon type={this.state.icon1} theme="outlined" /></Plus>
                                <Plus_text className="text">Front</Plus_text>
                            </ButtonUp>
                            <File_input onChange={this.handleProfile} type="file" name="front-doc" id="front" />
                        </File_select1>
                        <File_select2 md={{ span: 6 }} className="file-select-col">
                            <ButtonUp2 className="file-select-btn" onClick={() => { this.handleFileSelectClick('back') }}>
                                <Plus2 className="plus"><Icon type={this.state.icon2} theme="outlined" /></Plus2>
                                <Plus_text2 className="text">Back</Plus_text2>
                            </ButtonUp2>
                            <File_input2 onChange={this.handleProfile} type="file" name="back-doc" id="back" />
                        </File_select2>
                    </File_wrap>
                </SSNWrap>
                <ButtonWrap>
                    <SubWrap>
                        <BackButton onClick={this.back_step.bind(this)} type="primary">Back</BackButton>
                        <NextButton onClick={this.next_step.bind(this)} type="primary">Next</NextButton>
                    </SubWrap>
                </ButtonWrap>
                {(this.props.loader == true) ?
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
