/* In-built Packages*/
import React, { Component } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Col, Row, notification, Icon } from "antd";
import { translate } from "react-i18next";
import SimpleReactValidator from "simple-react-validator";

import { globalVariables } from "Globals.js";
import FaldaxLoader from "SHARED-COMPONENTS/FaldaxLoader";
import { Email, ButtonLogin, Sign, Signa } from "./signup_form";
import {
  RemoveIcon1,
  Filewrap,
  Fileselect1,
  ButtonUp,
  Plus,
  Plustext,
  Fileinput
} from "COMPONENTS/SETTINGS/KYC/doc_upload";

let { API_URL } = globalVariables;
/* Components */

/* Global CONSTANTS */

/* Styled-Components */
const ButtonLoginDup = styled(ButtonLogin)`
  background-color: #008cd4;
`;
const PlustextDup = styled(Plustext)`
  color: #008cd4;
`;
const PlusDup = styled(Plus)`
  background-color: #008cd4;
`;
const ButtonUpDup = styled(ButtonUp)`
  border: 1px solid #008cd4;
  background-color: #f0f3f2;
`;
const FileWrapDup = styled(Filewrap)`
  padding-top: 10px;
  text-align: left;
`;
const RowWrap = styled(Row)`
  min-height: 100%;

  @media (max-width: 991px) {
    background-color: #f0f3f2;
    min-height: 100vh;
  }
`;
const ColLeft = styled(Col)`
  min-height: 100vh;
  @media (max-width: 991px) {
    min-height: auto;
    height: auto;
  }
`;
const ColRight = styled(Col)`
  min-height: 100%;
  @media (max-width: 991px) {
    height: auto;
  }
`;
const LeftWrap = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(/images/LoginBanner.png);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  @media (max-width: 991px) {
    height: auto;
  }
`;
const VertImg = styled.img`
  @media (max-width: 991px) {
    display: none;
  }
`;
const HorImg = styled.img`
  display: none;
  @media (max-width: 991px) {
    display: block;
    width: 400px;
    margin-top: 30px;
    margin-bottom: 30px;
  }
  @media (max-width: 575px) {
    width: 250px;
  }
`;
const FormWrap = styled.div`
  padding-left: 100px;

  background-color: #f0f3f2;
  min-height: 100vh;
  display: flex;
  align-items: center;
  @media (max-width: 991px) {
    min-height: auto;
    padding-top: 30px;
  }
  @media (max-width: 767px) {
    padding: 30px;
  }
`;
const RightWrap = styled.div`
  width: 100%;
  @media (max-width: 991px) {
    height: auto;
  }
  @media (max-width: 478px) {
    text-align: center;
  }
`;
const LoginHead = styled.div`
  font-size: 30px;
  font-family: "Open Sans";
  color: rgb(15, 71, 123);
  font-weight: bold;
  text-transform: uppercase;
  text-align: left;
  padding-bottom: 10px;
  border-bottom: 2px solid;
  display: inline-block;
  @media (max-width: 400px) {
    border-bottom: none;
  }
`;
const SubText = styled.span`
  padding-top: 20px;
  font-size: 16px;
  font-family: "Open Sans";
  color: rgb(163, 163, 163);
  display: block;
  @media (max-width: 478px) {
    text-align: left;
  }
`;
const SubSmallText = styled.span`
  padding-top: 5px;
  font-size: 14px;
  font-family: "Open Sans";
  color: rgb(163, 163, 163);
  display: block;
  @media (max-width: 478px) {
    text-align: left;
  }
`;
const VerifyEmail = styled(Email)`
  margin-top: 10px;
  display: block;
`;
const ButtonResend = styled(ButtonLogin)`
  margin-top: 10px;
`;
class ProfileBackup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileImg: "",
      imageName: "",
      imageType: "",
      profileImage: "",
      imagemsg: "",
      icon1: "plus",
      targetName: "",
      fileTarget: null,
      displayFirst: "none",
      click: "",
      displayFirst: "none",
      flagImage: false,
      email: ""
    };
    this.handleProfile = this.handleProfile.bind(this);
    this.submitProfile = this.submitProfile.bind(this);
    this.validator = new SimpleReactValidator();
    this.t = this.props.t;
  }

  openNotificationWithIcon(type, head, desc) {
    notification[type]({
      message: head,
      description: desc,
      duration: 5
    });
  }
  _resendVerification = () => {
    if (this.validator.allValid()) {
      this.setState({ loader: true });
      fetch(API_URL + "/users/resend-email", {
        method: "post",
        body: JSON.stringify(this.state.fields)
      })
        .then(response => response.json())
        .then(responseData => {
          if (responseData.status == 200) {
            this.setState({ loader: false });
            this.props.history.push("/signup-success");
          } else {
            this.setState({ loader: false });
            this.openNotificationWithIcon(
              "warning",
              responseData.err,
              "Please check it by logging in."
            );
          }
        })
        .catch(error => {
          this.setState({ loader: false });
          this.openNotificationWithIcon(
            "error",
            "Error",
            "Something went wrong!"
          );
        });
    } else {
      this.validator.showMessages();
      // rerender to show messages for the first time
      this.forceUpdate();
    }
  };
  _handleChange = e => {
    let fields = {};
    if (e.target.value.trim() !== "") fields["email"] = e.target.value;
    else fields["email"] = "";

    this.setState({
      fields
    });
  };

  handleFileSelectClick(val) {
    document.querySelector("#" + val).click();
    this.setState({ click: val });
  }

  handleProfile(e) {
    var _self = this;
    var e1 = e;
    let name = e1.target.name;
    let target = e1.target;
    // console.log(e1.target);
    _self.setState(
      {
        targetName: name,
        fileTarget: target
      },
      () => {
        var frontWidth, frontHeight;
        try {
          const reader = new FileReader();
          const file = _self.state.fileTarget.files[0];
          const fileType =
            file && file.type
              ? file.type.substring(0, file.type.indexOf("/"))
              : "";
          const fileSize = file && file.size ? file.size : 0;
          // console.log(file);
          if (file !== undefined)
            if (fileType === "image") {
              if (fileType === "image" && fileSize < 5242880) {
                var fr = new FileReader();
                fr.readAsDataURL(file);
                fr.onload = function() {
                  var img = new Image();
                  img.onload = function() {
                    frontWidth = img.width;
                    frontHeight = img.height;

                    if (frontWidth > 450 && frontHeight > 600) {
                      if (_self.state.targetName === "front-doc") {
                        _self.setState({ icon1: "check", displayFirst: "" });
                        reader.onload = upload => {
                          _self.setState({
                            profileImg: upload.target.result,
                            imageName: file.name,
                            imageType: file.type,
                            profileImage: file,
                            imagemsg: "",
                            flagImage: true
                          });
                        };
                      }
                      //check file size to max 5mb (5*1024*1024=5242880) and type image

                      reader.readAsDataURL(file);
                      var DataForm = new FormData();
                      DataForm.append("image", file);
                    } else {
                      _self.setState({ flagImage: false });
                      _self.openNotificationWithIcon(
                        "error",
                        this.t("validations:error_text.message"),
                        this.t("validations:image_upload_error.message")
                      );
                    }
                  };
                  img.src = fr.result;
                };
              } else {
                if (_self.state.targetName === "front-doc") {
                  _self.setState({
                    profileImg: "Default Photo",
                    imageName: "",
                    imageType: fileType,
                    imagemsg: "Please select image with less than 5 mb"
                  });
                }
                _self.setState({ flagImage: false });
                _self.openNotificationWithIcon(
                  "error",
                  this.t("validations:error_text.message"),
                  this.t("max_image_size_5_error.message")
                );
                document.getElementById("front").value = "";
              }
            } else {
              _self.openNotificationWithIcon(
                "error",
                this.t("validations:error_text.message"),
                this.t("general_1:only_images_error.message")
              );
              document.getElementById("front").value = "";
            }
        } catch (error) {
          _self.setState({ imagemsg: "Something went wrong please try again" });
        }
      }
    );
  }

  removeFile(type) {
    var DataForm = new FormData();
    DataForm.append("image", "");

    if (type == "front-doc") {
      this.setState({
        profileImg: "",
        imageName: "",
        imageType: "",
        profileImage: "",
        imagemsg: "",
        icon1: "plus",
        displayFirst: "none",
        flagImage: false
      });
      document.getElementById("front").value = "";
    }
  }

  submitProfile() {
    if (this.state.flagImage) {
      // console.log(this.state, this.state.profileImage, this.state.email);
      let dataForm = new FormData();
      dataForm.append("email", this.state.email);
      dataForm.append("uploaded_file", this.state.profileImage);
      this.setState({ loader: true });
      fetch(API_URL + "/users/forgot-twofactors", {
        method: "post",
        body: dataForm
      })
        .then(response => response.json())
        .then(responseData => {
          if (responseData.status == 200) {
            this.setState({ loader: false });
            this.props.history.push("/login");
            this.openNotificationWithIcon(
              "success",
              this.t("validations:success_text.message"),
              responseData.message
            );
          } else {
            this.setState({ loader: false });
            this.props.history.push("/login");
            this.openNotificationWithIcon(
              "warning",
              this.t("validations:warning_text.message"),
              responseData.err
            );
          }
        })
        .catch(error => {
          this.setState({ loader: false });
          this.openNotificationWithIcon(
            "error",
            "Error",
            "Something went wrong!"
          );
        });
    }
  }
  componentDidMount() {
    if (this.props.match)
      if (this.props.match.params)
        if (this.props.match.params.email)
          this.setState({
            email: decodeURIComponent(this.props.match.params.email)
          });
  }
  render() {
    return (
      <div>
        <RowWrap>
          <ColLeft sm={24} lg={12}>
            <LeftWrap>
              <a href={globalVariables.WordpressSiteURL+(localStorage["i18nextLng"]?'/'+localStorage["i18nextLng"]:"")}>
                <VertImg
                  className="wow fadeInUp"
                  src="/images/LeftSideLogo.png"
                />
                <HorImg className="wow fadeInUp" src="/images/logoWhite.png" />
              </a>
            </LeftWrap>
          </ColLeft>
          <ColRight sm={24} lg={12}>
            <FormWrap>
              <RightWrap className="wow fadeInDown">
                <LoginHead>{this.t("upload_image_text.message")}</LoginHead>
                <SubText>{this.t("image_note_text.message")}</SubText>
                <SubSmallText>
                  {this.t("image_note1_text.message")}
                </SubSmallText>
                <FileWrapDup>
                  <Fileselect1 className="file-select-col">
                    <RemoveIcon1
                      onClick={() => {
                        this.removeFile("front-doc");
                      }}
                      style={{ display: `${this.state.displayFirst}` }}
                      type={"close"}
                      theme="outlined"
                    />

                    {/* {this.state)} */}
                    <ButtonUpDup
                      style={{
                        backgroundImage: `url('${this.state.profileImg}')`
                      }}
                      className="file-select-btn"
                      onClick={() => {
                        this.handleFileSelectClick("front");
                      }}
                    >
                      <PlusDup className="plus">
                        <Icon type={this.state.icon1} theme="outlined" />
                      </PlusDup>
                      <PlustextDup className="text">Upload</PlustextDup>
                    </ButtonUpDup>
                    <Fileinput
                      onChange={this.handleProfile}
                      type="file"
                      name="front-doc"
                      id="front"
                    />
                  </Fileselect1>
                </FileWrapDup>
                <ButtonLogin
                  onClick={this.submitProfile}
                  disabled={!this.state.flagImage}
                >
                  {this.t("settings:submit_btn.message")}
                </ButtonLogin>
              </RightWrap>
            </FormWrap>
          </ColRight>
        </RowWrap>
        {this.state.loader === true ? <FaldaxLoader /> : ""}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    isLoggedIn: state.simpleReducer.isLoggedIn !== undefined ? true : false
  };
}

export default translate([
  "login_page",
  "validations",
  "general_1",
  "settings"
])(withRouter(connect(mapStateToProps, null)(ProfileBackup)));
