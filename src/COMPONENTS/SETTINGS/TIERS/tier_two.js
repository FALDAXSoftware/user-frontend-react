/* In-built Packages */
import React from "react";
import "antd/dist/antd.css";
import styled from "styled-components";

/*Import Components*/
import Navigation from "COMPONENTS/NAVIGATIONS/loggednavigation";
import FooterHome from "COMPONENTS/LANDING/FOOTERS/footer_home";
import { TierWrapper, KYCHead } from "./tier_one";
import {
  TierWrap,
  RejectNote,
} from "../../../STYLED-COMPONENTS/TIER/tierStyle";
import { Icon, notification, Tooltip } from "antd";
import { globalVariables } from "Globals.js";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import SimpleReactValidator from "simple-react-validator";
import NumberFormat from "react-number-format";
import { APIUtility } from "../../../httpHelper";
import FaldaxLoader from "../../../SHARED-COMPONENTS/FaldaxLoader";

import {
  TwoFactorDiv,
  TierRow,
  TierDocStatus,
  TierUpload,
  TierInput,
  TierButtonRow,
  TierDocBox,
  TierLabel,
} from "../../../STYLED-COMPONENTS/TIER/tierStyle";
import UploadCounter from "../../../SHARED-COMPONENTS/UploadCounter";
import RejectReason from "../../../SHARED-COMPONENTS/RejectReason";
let { API_URL } = globalVariables;
/* Styled-Components */
const KYCWrap = styled.div`
  background-color: ${(props) =>
    props.theme.mode === "dark" ? "#041422" : "#ffffff"};
  margin: auto;
  width: 95%;
  border-radius: 7px;
  padding: 50px 0;
`;
const SSNInput = styled.input`
  display: block;
  width: 85%;
  height: 45px;
  padding: 5px;
  background-color: #f8f8f8;
  border: none;
  color: ${(props) => (props.theme.mode === "dark" ? "white" : "")};
  border-style: solid;
  border-width: 1px;
  border-color: rgb(212, 218, 223);
  border-radius: 5px;
  background-color: ${(props) =>
    props.theme.mode === "dark" ? "#020f18" : "rgb( 248, 248, 248 )"};
`;
export const Fileselect1 = styled.div`
  display: inline-block;
  width: 146px;
  height: 146px;
  margin-right: 15px;
  text-align: right;

  @media (max-width: 478px) {
    display: block;
    margin-right: auto;
    margin-left: auto;
    margin-top: 20px;
  }
`;
export const RemoveIcon1 = styled(Icon)`
  color: ${(props) => (props.theme.mode == "dark" ? "white" : "black")};
`;
export const ButtonUp = styled.button`
  display: block;
  width: 100%;
  /* margin: 0 auto; */
  height: 145px;
  background-color: ${(props) =>
    props.theme.mode === "dark" ? "#01090f" : "white"};
  color: ${(props) => (props.theme.mode === "dark" ? "white" : "")};
  box-shadow: none;
  border: 1px solid rgb(0, 170, 250);
  border-radius: 20px;
  cursor: pointer;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  &:focus {
    outline: none;
  }
`;
export const Plus = styled.span`
  width: 40px;
  height: 40px;
  display: block;
  margin: 0 auto;
  background-color: rgb(0, 170, 250);
  text-align: center;
  border-radius: 50%;
  color: white;
  font-size: 21px;
  padding-top: 6px;
`;
export const Plustext = styled.span`
  margin-top: 18px;
  display: block;
  font-size: 18px;
`;
export const Fileinput = styled.input`
  visibility: hidden;
  position: absolute;
`;
class TierTwo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id_number: "",
      validID: {},
      residenceProof: {},
      is_twofactor_enabled: false,
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
      click: "",
      frontWidth: "",
      frontHeight: "",
      targetName: "",
      fileTarget: null,
      displayFirst: "none",
      displaySecond: "none",
      reUpload1: false,
      reUpload2: false,
      reUpload3: false,
      waitingForApproval: false,
      loader: false,
      tierID: "",
      tierData: "",
      verified: false,
      reUploadFlag: false,
      ssnStatus: "",
      validStatus: "",
      residenceStatus: "",
      uploadBtnFlag: false,
      requestId: "",
      validNote: "",
      residenceNote: "",
      ssnNote: "",
      reasonPopup: false,
      rejectText: "",
    };
    this.validator = new SimpleReactValidator({
      ssnValid: {
        message: "Enter a valid SSN number.",
        rule: function(val, options) {
          var re = /^\d{3}-\d{2}-\d{4}$/;
          var bool = re.test(String(val));
          return bool;
        },
      },
    });
    this.handleProfile = this.handleProfile.bind(this);
    this.populateData = this.populateData.bind(this);
  }
  componentWillMount() {
    if (
      this.props.profileDetails.account_tier !== 1 &&
      this.props.profileDetails.account_tier == 2
    ) {
      this.props.history.push("/");
    }
  }
  async componentDidMount() {
    try {
      await this.getTierDetails();
    } catch (error) {
      console.log(error);
    } finally {
    }
    this.setState(
      {
        is_twofactor_enabled: this.props.profileDetails.is_twofactor,
      },
      () => {
        this.populateData();
      }
    );
  }
  componentWillReceiveProps(newProps) {
    if (
      newProps.profileDetails.is_twofactor &&
      newProps.profileDetails.is_twofactor !==
        this.props.profileDetails.is_twofactor
    ) {
      this.setState({
        is_twofactor_enabled: newProps.profileDetails.is_twofactor,
      });
    }
  }
  async getTierDetails() {
    try {
      this.setState({ loader: true });
      let values = {
        tier_step: "2",
      };
      let result = await APIUtility.getTierDetails(
        this.props.isLoggedIn,
        values
      );
      if (result.status == 200) {
        console.log("result^^^", result.data);
        this.setState({
          tierData: result.data,
        });
      } else {
        this.openNotificationWithIcon("error", "Error", result.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ loader: false });
    }
  }
  populateData() {
    console.log("^^^tierdata", this.state.tierData);
    if (this.state.tierData.length > 0) {
      this.setState({
        reUploadFlag: true,
      });
      let tierData = this.state.tierData;
      tierData.map((tierDoc, index) => {
        if (tierDoc) {
          if (tierDoc.is_approved === false) {
            this.setState({
              uploadBtnFlag: true,
            });
          }
          if (tierDoc.request_id) {
            this.setState({
              requestId: tierDoc.request_id,
            });
          }
          switch (index) {
            case 0:
              let validid = tierDoc.is_approved;
              let reupload1;
              if (tierDoc.is_approved === null) {
                reupload1 = false;
              } else if (tierDoc.is_approved === true) {
                reupload1 = false;
              } else {
                reupload1 = true;
              }
              this.setState({
                reUpload1: reupload1,
                validStatus: validid,
                validNote: tierDoc.public_note,
              });
              return console.log("TierDoc^^", tierDoc.type, index);
            case 1:
              let residence = tierDoc.is_approved;
              let reupload2;
              if (tierDoc.is_approved === null) {
                reupload2 = false;
              } else if (tierDoc.is_approved === true) {
                reupload2 = false;
              } else {
                reupload2 = true;
              }
              this.setState({
                reUpload2: reupload2,
                residenceStatus: residence,
                residenceNote: tierDoc.public_note,
              });
              return console.log("TierDoc^^", tierDoc.type, index);
            case 2:
              let ssn = tierDoc.is_approved;
              let reupload3;
              if (tierDoc.is_approved === null) {
                reupload3 = false;
              } else if (tierDoc.is_approved === true) {
                reupload3 = false;
              } else {
                reupload3 = true;
              }
              this.setState({
                reUpload3: reupload3,
                ssnStatus: ssn,
                ssnNote: tierDoc.public_note,
              });
              return console.log("TierDoc^^", tierDoc.type, index);
            case 3:
              return console.log("TierDoc^^", tierDoc.type, index);
            default:
              return console.log("No case");
          }
        }
      });
    } else {
      this.setState({
        reUploadFlag: false,
        reUpload1: true,
        reUpload2: true,
        reUpload3: true,
        uploadBtnFlag: true,
      });
    }
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
        fileTarget: target,
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
          if (fileType === "image") {
            if (fileType === "image" && fileSize < 4194304) {
              var fr = new FileReader();
              fr.readAsDataURL(file);
              fr.onload = function() {
                var img = new Image();
                img.onload = function() {
                  frontWidth = img.width;
                  frontHeight = img.height;

                  if (frontWidth > 450 && frontHeight > 600) {
                    if (_self.state.targetName === "valid-id") {
                      _self.setState({ icon1: "check", displayFirst: "" });
                      reader.onload = (upload) => {
                        _self.setState({
                          profileImg: upload.target.result,
                          imageName: file.name,
                          imageType: file.type,
                          profileImage: file,
                          imagemsg: "",
                        });
                      };
                    } else {
                      _self.setState({ icon2: "check", displaySecond: "" });
                      reader.onload = (upload) => {
                        _self.setState({
                          profileImg2: upload.target.result,
                          imageName2: file.name,
                          imageType2: file.type,
                          profileImage2: file,
                          imagemsg2: "",
                        });
                      };
                    }
                    //check file size to max 5mb (5*1024*1024=5242880) and type image
                    reader.readAsDataURL(file);
                    var DataForm = new FormData();
                    DataForm.append("image", file);
                    if (_self.state.targetName === "valid-id") {
                      _self.setState({ validID: file }, () => {
                        console.log(_self.state.validID.name);
                      });
                    } else {
                      _self.setState({ residenceProof: file });
                    }
                  } else {
                    if (_self.state.targetName === "valid-id") {
                      _self.setState({
                        profileImg: "Default Photo",
                        imageName: "",
                        imageType: fileType,
                        profileImage: "",
                        icon1: "plus",
                        displayFirst: "none",
                      });
                    } else {
                      _self.setState({
                        profileImg2: "Default Photo",
                        imageName2: "",
                        imageType2: fileType,
                        profileImage2: "",
                        icon2: "plus",
                        displaySecond: "none",
                      });
                    }
                    _self.openNotificationWithIcon(
                      "error",
                      "Error",
                      "File needs to be greater than 450*600 in dimension"
                    );
                    document.getElementById("valid-id").value = "";
                    document.getElementById("residence-proof").value = "";
                  }
                };
                img.src = fr.result;
              };
            } else {
              if (_self.state.targetName === "valid-id") {
                _self.setState({
                  profileImg: "Default Photo",
                  imageName: "",
                  imageType: fileType,
                  profileImage: "",
                  icon1: "plus",
                  displayFirst: "none",
                  imagemsg: _self.t("general_1:max_image_size_error.message"),
                });
              } else {
                _self.setState({
                  profileImg2: "Default Photo",
                  imageName2: "",
                  imageType2: fileType,
                  imagemsg2: _self.t("general_1:max_image_size_error.message"),
                  profileImage2: "",
                  icon2: "plus",
                  displaySecond: "none",
                });
              }
              _self.openNotificationWithIcon(
                "error",
                "Error",
                "Please select an image with a file size less than 4 mb"
              );
              document.getElementById("valid-id").value = "";
              document.getElementById("residence-proof").value = "";
            }
          } else {
            _self.openNotificationWithIcon(
              "error",
              "Error",
              "File format is not supported. Please upload an image using a supported format."
            );
            document.getElementById("valid-id").value = "";
            document.getElementById("residence-proof").value = "";
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
    // this.props.kycDoc(this.props.isLoggedIn, DataForm, this.state.targetName);
    if (type == "valid-id") {
      this.setState({
        profileImg: "",
        imageName: "",
        imageType: "",
        profileImage: "",
        imagemsg: "",
        icon1: "plus",
        displayFirst: "none",
        validID: "",
      });
      document.getElementById("valid-id").value = "";
    } else {
      this.setState({
        profileImg2: "",
        imageName2: "",
        imageType2: "",
        profileImage2: "",
        imagemsg2: "",
        icon2: "plus",
        displaySecond: "none",
        residenceProof: "",
      });
      document.getElementById("residence-proof").value = "";
    }
  }
  openNotificationWithIcon(type, head, desc) {
    notification[type]({
      message: head,
      description: desc,
    });
  }
  handleFileSelectClick(val) {
    document.querySelector("#" + val).click();
    this.setState({ click: val });
  }
  input_change(e) {
    this.setState({ id_number: e.target.value });
  }
  handleSubmit() {
    if (this.validator.allValid() && this.state.is_twofactor_enabled) {
      this.setState({ loader: true });
      let values = new FormData();
      if (this.state.reUploadFlag) {
        if (this.state.reUpload1 && !this.state.reUpload3) {
          values.append("valid_id_flag", true);
        }
        if (this.state.reUpload2 && !this.state.reUpload3) {
          values.append("proof_residence_flag", true);
        }
        if (this.state.reUpload3) {
          values.append("reupload", true);
          if (this.state.reUpload1) {
            values.append("valid_id_flag", true);
          } else {
            values.append("valid_id_flag", false);
          }
          if (this.state.reUpload2) {
            values.append("proof_residence_flag", true);
          } else {
            values.append("proof_residence_flag", false);
          }
        }
        values.append("twofactor", false);
        values.append("request_id", this.state.requestId);
      } else {
        values.append("twofactor", this.state.is_twofactor_enabled);
      }
      values.append("ssn", this.state.id_number);
      let query = "";
      for (var pair of values.entries()) {
        query = query + pair[0] + "=" + pair[1] + "&";
      }
      values.append("files", this.state.validID);
      values.append("files", this.state.residenceProof);
      // values.append("residence_proof", this.state.residenceProof);
      console.log(
        "Submit tier2 data^^^^",
        this.state.validID,
        this.state.residenceProof
      );
      fetch(API_URL + `/users/upload-user-documents?${query}`, {
        method: "post",
        headers: {
          "Accept-Language": localStorage["i18nextLng"],
          Authorization: "Bearer " + this.props.isLoggedIn,
        },
        body: values,
      })
        .then((response) => response.json())
        .then((responseData) => {
          if (responseData.status == 200) {
            console.log("^^^^response", responseData);
            this.setState(
              {
                loader: false,
                validID: {},
                residenceProof: {},
                id_number: "",
                waitingForApproval: true,
              },
              () => {
                this.openNotificationWithIcon(
                  "success",
                  "Success",
                  responseData.data
                );
                this.props.history.push("/editProfile");
              }
            );
          }
          this.setState({ loader: false });
        })
        .catch((error) => {
          this.setState({ loader: false });
        });
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }
  handleCancel() {
    this.setState({
      profileImg: "",
      imageName: "",
      imageType: "",
      profileImage: "",
      imagemsg: "",
      icon1: "plus",
      displayFirst: "none",
      validID: "",
      profileImg2: "",
      imageName2: "",
      imageType2: "",
      profileImage2: "",
      imagemsg2: "",
      icon2: "plus",
      displaySecond: "none",
      residenceProof: "",
      id_number: "",
    });
    this.validator.hideMessages();
    this.forceUpdate();
  }
  comingCancel = (e) => {
    this.setState({
      reasonPopup: false,
    });
  };
  render() {
    // console.log(
    //   "data data data^^",
    //   this.state.reUpload1,
    //   this.state.reUpload2,
    //   this.state.reUpload3
    // );
    let { is_twofactor_enabled, verified } = this.state;
    return (
      <div>
        <Navigation />
        <TierWrapper>
          <KYCWrap>
            <KYCHead>Tier 2 Upgrade</KYCHead>
            {verified ? (
              <TierWrap
                style={{
                  textAlign: "center",
                  margin: "50px auto",
                  fontSize: "18px",
                }}
              >
                <p>Your account is verified to tier 2.</p>
              </TierWrap>
            ) : (
              <div>
                {this.state.waitingForApproval ? (
                  <TierWrap
                    style={{
                      textAlign: "center",
                      margin: "50px auto",
                      fontSize: "18px",
                    }}
                  >
                    <p>Your submitted documents are under process.</p>
                  </TierWrap>
                ) : (
                  <TierWrap>
                    {is_twofactor_enabled ? (
                      <TwoFactorDiv>
                        <span>
                          Two-factor Authentication(2FA) must be enabled to
                          upgrade your account to tier 2.
                        </span>
                        <a>Enabled</a>
                      </TwoFactorDiv>
                    ) : (
                      <TwoFactorDiv>
                        <span>
                          Two-factor Authentication(2FA) must be enabled to
                          upgrade your account to tier 2. Please click the link
                          below to enable 2FA
                        </span>
                        <a href="/editProfile">Click here</a>
                      </TwoFactorDiv>
                    )}
                    <TierRow>
                      <TierLabel>
                        <label>Second Photo ID</label>
                        <Link to="/tier-image-information" target="_blank">
                          See Details
                        </Link>
                      </TierLabel>
                      <TierUpload>
                        {this.state.validID.name ? (
                          <button className="has_file">
                            <span>{this.state.validID.name}</span>
                            <Icon
                              onClick={() => {
                                this.removeFile("valid-id");
                              }}
                              type="close"
                            />
                          </button>
                        ) : (
                          <button
                            className={
                              !this.state.reUpload1 ? "disabled_btn" : ""
                            }
                            onClick={() => {
                              this.handleFileSelectClick("valid-id");
                            }}
                          >
                            <Icon type="upload" />
                            <span>Upload</span>
                          </button>
                        )}
                        <TierInput
                          accept=".jpg,.png,.jpeg"
                          onChange={this.handleProfile}
                          type="file"
                          name="valid-id"
                          id="valid-id"
                          disabled={!this.state.reUpload1}
                        />
                        {this.state.reUpload1 &&
                          this.validator.message(
                            "valid-id",
                            this.state.profileImg,
                            "required",
                            "tier-text-danger-validation",
                            {
                              required: "This field is required.",
                            }
                          )}
                        {/* <button
                          onClick={() => {
                            this.handleFileSelectClick("valid-id");
                          }}
                        >
                          {this.state.validID.name ? (
                            <div>
                              <span>{this.state.validID.name}</span>
                              <Icon
                                onClick={() => {
                                  this.removeFile("valid-id");
                                }}
                                type="close-circle"
                              />
                            </div>
                          ) : (
                            <div>
                              <Icon type="upload" />
                              <span>Upload</span>
                            </div>
                          )}
                        </button> */}
                      </TierUpload>
                      {/* <Fileselect1 className="file-select-col">
                        <RemoveIcon1
                          onClick={() => {
                            this.removeFile("valid-id");
                          }}
                          style={{ display: `${this.state.displayFirst}` }}
                          type={"close"}
                          theme="outlined"
                        />
                        <ButtonUp
                          style={{
                            backgroundImage: `url('${this.state.profileImg}')`
                          }}
                          className="file-select-btn"
                          onClick={() => {
                            this.handleFileSelectClick("valid-id");
                          }}
                        >
                          {/* <Plus className="plus">
                            <Icon type={this.state.icon1} theme="outlined" />
                          </Plus> */}
                      {/* <Plustext className="text">Upload</Plustext>
                        </ButtonUp>
                        <Fileinput
                          onChange={this.handleProfile}
                          type="file"
                          name="valid-id"
                          id="valid-id"
                          disabled={!this.state.reUpload1}
                        />
                        {this.state.reUpload1 &&
                          this.validator.message(
                            "valid-id",
                            this.state.profileImg,
                            "required",
                            "tier-text-danger-validation",
                            {
                              required: "This field is required."
                            }
                          )}
                      </Fileselect1> */}
                      {this.state.tierData.length > 0 ? (
                        <TierDocBox>
                          {this.state.validStatus === null && (
                            <TierDocStatus>
                              <Icon type="warning" />
                              <span>Under Approval</span>
                            </TierDocStatus>
                          )}
                          {this.state.validStatus === true && (
                            <TierDocStatus>
                              <Icon type="check" />
                              <span>Verified</span>
                            </TierDocStatus>
                          )}
                          {this.state.validStatus === false && (
                            <TierDocStatus>
                              <Icon type="close" />
                              <span>Reupload it</span>
                            </TierDocStatus>
                          )}
                          {this.state.validNote && (
                            <Icon
                              type="message"
                              onClick={() => {
                                this.setState({
                                  reasonPopup: true,
                                  rejectText: this.state.validNote,
                                });
                              }}
                            />
                          )}
                        </TierDocBox>
                      ) : (
                        <TierDocBox></TierDocBox>
                      )}
                    </TierRow>
                    <TierRow>
                      <TierLabel>
                        <label>Proof of Residence</label>
                      </TierLabel>
                      <TierUpload>
                        {this.state.residenceProof.name ? (
                          <button className="has_file">
                            <span>{this.state.residenceProof.name}</span>
                            <Icon
                              onClick={() => {
                                this.removeFile("residence-proof");
                              }}
                              type="close"
                            />
                          </button>
                        ) : (
                          <button
                            className={
                              !this.state.reUpload2 ? "disabled_btn" : ""
                            }
                            onClick={() => {
                              this.handleFileSelectClick("residence-proof");
                            }}
                          >
                            <Icon type="upload" />
                            <span>Upload</span>
                          </button>
                        )}
                        <TierInput
                          accept=".jpg,.png,.jpeg"
                          onChange={this.handleProfile}
                          type="file"
                          name="residence-proof"
                          id="residence-proof"
                          disabled={!this.state.reUpload2}
                        />
                        {this.state.reUpload2 &&
                          this.validator.message(
                            "residence-proof",
                            this.state.profileImg2,
                            "required",
                            "tier-text-danger-validation",
                            {
                              required: "This field is required.",
                            }
                          )}
                      </TierUpload>
                      {this.state.tierData.length > 0 ? (
                        <TierDocBox>
                          {this.state.residenceStatus === null && (
                            <TierDocStatus>
                              <Icon type="warning" />
                              <span>Under Approval</span>
                            </TierDocStatus>
                          )}
                          {this.state.residenceStatus === true && (
                            <TierDocStatus>
                              <Icon type="check" />
                              <span>Verified</span>
                            </TierDocStatus>
                          )}
                          {this.state.residenceStatus === false && (
                            <TierDocStatus>
                              <Icon type="close" />
                              <span>Reupload it</span>
                            </TierDocStatus>
                          )}
                          {this.state.residenceNote && (
                            // <RejectNote>{this.state.residenceNote}</RejectNote>
                            <Icon
                              type="message"
                              onClick={() => {
                                this.setState({
                                  reasonPopup: true,
                                  rejectText: this.state.residenceNote,
                                });
                              }}
                            />
                          )}
                        </TierDocBox>
                      ) : (
                        <TierDocBox></TierDocBox>
                      )}
                    </TierRow>
                    {/* <Fileselect1 className="file-select-col">
                        <RemoveIcon1
                          onClick={() => {
                            this.removeFile("residence-proof");
                          }}
                          style={{ display: `${this.state.displaySecond}` }}
                          type={"close"}
                          theme="outlined"
                        />
                        <ButtonUp
                          style={{
                            backgroundImage: `url('${this.state.profileImg2}')`
                          }}
                          className="file-select-btn"
                          onClick={() => {
                            this.handleFileSelectClick("residence-proof");
                          }}
                        >
                          <Plus className="plus">
                            <Icon type={this.state.icon2} theme="outlined" />
                          </Plus>
                          <Plustext className="text">Upload</Plustext>
                        </ButtonUp>
                        <Fileinput
                          onChange={this.handleProfile}
                          type="file"
                          name="residence-proof"
                          id="residence-proof"
                          disabled={!this.state.reUpload2}
                        />
                        {this.state.reUpload2 &&
                          this.validator.message(
                            "residence-proof",
                            this.state.profileImg2,
                            "required",
                            "tier-text-danger-validation",
                            {
                              required: "This field is required."
                            }
                          )} */}
                    {/* </Fileselect1> */}

                    <TierRow className="no_border">
                      <TierLabel>
                        <label>Govt. Issued ID Number</label>
                      </TierLabel>
                      {/* <Input type="text" value={this.state.id_number} /> */}
                      <TierUpload
                        className={
                          this.state.reUpload3
                            ? "ssn_input"
                            : "ssn_input disabled"
                        }
                      >
                        <SSNInput
                          disabled={!this.state.reUpload3}
                          type="text"
                          value={this.state.id_number}
                          onChange={this.input_change.bind(this)}
                        />
                        {this.state.reUpload3 &&
                          this.validator.message(
                            "id_number",
                            this.state.id_number,
                            "required",
                            "tier-text-danger-validation",
                            {
                              required: "This field is required.",
                            }
                          )}
                      </TierUpload>
                      {this.state.tierData.length > 0 ? (
                        <TierDocBox>
                          {this.state.ssnStatus === null && (
                            <TierDocStatus>
                              <Icon type="warning" />
                              <span>Under Approval</span>
                            </TierDocStatus>
                          )}
                          {this.state.ssnStatus === true && (
                            <TierDocStatus>
                              <Icon type="check" />
                              <span>Verified</span>
                            </TierDocStatus>
                          )}
                          {this.state.ssnStatus === false && (
                            <TierDocStatus>
                              <Icon type="close" />
                              <span>Reupload it</span>
                            </TierDocStatus>
                          )}
                          {this.state.ssnNote && (
                            // <RejectNote>{this.state.ssnNote}</RejectNote>
                            <Icon
                              type="message"
                              onClick={() => {
                                this.setState({
                                  reasonPopup: true,
                                  rejectText: this.state.ssnNote,
                                });
                              }}
                            />
                          )}
                        </TierDocBox>
                      ) : (
                        <TierDocBox></TierDocBox>
                      )}
                    </TierRow>
                    <TierButtonRow>
                      <input
                        type="button"
                        className={
                          this.state.uploadBtnFlag
                            ? "cancel_btn"
                            : "cancel_btn disabled"
                        }
                        disabled={!this.state.uploadBtnFlag}
                        onClick={this.handleCancel.bind(this)}
                        value="Cancel"
                      />
                      <input
                        type="button"
                        className={
                          this.state.uploadBtnFlag
                            ? "upload_btn"
                            : "upload_btn disabled"
                        }
                        onClick={this.handleSubmit.bind(this)}
                        value="Upload"
                        disabled={!this.state.uploadBtnFlag}
                      />
                    </TierButtonRow>
                  </TierWrap>
                )}
              </div>
            )}
          </KYCWrap>
          <RejectReason
            visible={this.state.reasonPopup}
            text={this.state.rejectText}
            comingCancel={(e) => this.comingCancel(e)}
          />
        </TierWrapper>
        {this.state.loader === true ? <FaldaxLoader /> : ""}
        <FooterHome />
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  // LogoutUser: (isLoggedIn, user_id) => dispatch(LogoutUser(isLoggedIn, user_id))
});
// export default Conversion;
function mapStateToProps(state) {
  return {
    isLoggedIn: state.simpleReducer.isLoggedIn,
    profileDetails:
      state.simpleReducer.profileDetails !== undefined
        ? state.simpleReducer.profileDetails.data !== undefined
          ? state.simpleReducer.profileDetails.data[0]
          : ""
        : "",
    theme:
      state.themeReducer.theme !== undefined ? state.themeReducer.theme : "",
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TierTwo));
