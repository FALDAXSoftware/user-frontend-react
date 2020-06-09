/* In-built Packages */
import React from "react";
import "antd/dist/antd.css";
import styled from "styled-components";

/*Import Components*/
import Navigation from "COMPONENTS/NAVIGATIONS/loggednavigation";
import FooterHome from "COMPONENTS/LANDING/FOOTERS/footer_home";
import { Link } from "react-router-dom";
import { TierWrapper, KYCHead } from "./tier_one";
import { TierWrap } from "../../../STYLED-COMPONENTS/TIER/tierStyle";
import SimpleReactValidator from "simple-react-validator";
import { globalVariables } from "Globals.js";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  Fileselect1,
  RemoveIcon1,
  ButtonUp,
  Plus,
  Plustext,
  Fileinput,
} from "./tier_two";
import {
  TwoFactorDiv,
  TierRow,
  TierDocStatus,
  TierUpload,
  TierInput,
  TierButtonRow,
  TierDocBox,
  TierLabel,
  TierDropzoneStyle,
  TierDropWrap,
  RejectNote,
} from "../../../STYLED-COMPONENTS/TIER/tierStyle";
import { Icon, notification, Row, Col } from "antd";
import {
  DropzoneStyle,
  IconS,
  FileSelectText,
} from "../../../STYLED-COMPONENTS/LANDING_CATEGORIES/contactStyle";
import { SupportText } from "../../LANDINGCATEGORIES/apply_job";
import { APIUtility } from "../../../httpHelper";
import FaldaxLoader from "../../../SHARED-COMPONENTS/FaldaxLoader";
import RejectReason from "../../../SHARED-COMPONENTS/RejectReason";
import { DoneWrap, KycSucc } from "./tier_one";
import { translate } from "react-i18next";
let { API_URL, Proof_of_assets_form } = globalVariables;
/* Styled-Components */

const KYCWrap = styled.div`
  background-color: ${(props) =>
    props.theme.mode === "dark" ? "#041422" : "#ffffff"};
  margin: auto;
  width: 95%;
  border-radius: 7px;
  padding: 50px 0;
`;

class TierThree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idcpPhoto: {},
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
      cover_flag: null,
      files: [],
      asset_proof: [],
      tierData: "",
      tierID: "",
      loader: false,
      waitingForApproval: false,
      reUpload1: false,
      reUpload2: false,
      verified: false,
      reUploadFlag: false,
      idcpStatus: "",
      assetFormStatus: "",
      uploadBtnFlag: false,
      requestId: "",
      assetFormNote: "",
      idcpNote: "",
      reasonPopup: false,
      rejectText: "",
      forceRejectStatus: false,
      forceRejectNote: "",
      forceAcceptedStatus: false,
    };
    this.t = this.props.t;
    this.handleProfile = this.handleProfile.bind(this);
    this.populateData = this.populateData.bind(this);
    this.validator = new SimpleReactValidator({});
  }
  componentWillMount() {
    if (
      this.props.location.state === undefined ||
      this.props.location.state.flag === "" ||
      this.props.location.state.flag === null
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
    this.populateData();
  }
  async getTierDetails() {
    try {
      this.setState({ loader: true });
      let values = {
        tier_step: "3",
      };
      let result = await APIUtility.getTierDetails(
        this.props.isLoggedIn,
        values
      );
      if (result.status == 200) {
        this.setState({
          tierData: result.data,
        });
      } else if (result.status == 202) {
        this.setState({
          forceRejectStatus: true,
          forceRejectNote: result.data.public_note,
        });
      } else if (result.status == 203) {
        this.setState({
          forceAcceptedStatus: true,
        });
      } else {
        this.openNotificationWithIcon(
          "error",
          this.t("validations:error_text.message"),
          result.message
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ loader: false });
    }
  }
  populateData() {
    if (this.state.tierData.length < 2 && this.state.tierData.length > 0) {
      this.setState({
        reUploadFlag: true,
        reUpload1: true,
        reUpload2: true,
        uploadBtnFlag: true,
      });
      let tierData = this.state.tierData;
      tierData.map((tierDoc, index) => {
        if (tierDoc.request_id) {
          this.setState({
            requestId: tierDoc.request_id,
          });
        }
      });
    }
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
          switch (parseInt(tierDoc.type)) {
            case 1:
              let idcpphoto = tierDoc.is_approved;
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
                idcpStatus: idcpphoto,
                idcpNote: tierDoc.public_note,
              });
              return;
            case 2:
              let assetform = tierDoc.is_approved;
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
                assetFormStatus: assetform,
                assetFormNote: tierDoc.public_note,
              });
              return;
            default:
              return;
          }
        }
      });
    } else {
      this.setState({
        reUploadFlag: false,
        reUpload1: true,
        reUpload2: true,
        uploadBtnFlag: true,
      });
    }
  }
  handleProfile(e) {
    var _self = this;
    var e1 = e;
    let name = e1.target.name;
    let target = e1.target;
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
              fr.onload = function () {
                var img = new Image();
                img.onload = function () {
                  frontWidth = img.width;
                  frontHeight = img.height;

                  if (frontWidth > 450 && frontHeight > 600) {
                    if (_self.state.targetName === "idcp-photo") {
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
                    if (_self.state.targetName === "idcp-photo") {
                      _self.setState({ idcpPhoto: file });
                    } else {
                      _self.setState({ residenceProof: file });
                    }
                  } else {
                    if (_self.state.targetName === "idcp-photo") {
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
                      _self.t("validations:error_text.message"),
                      _self.t("validations:image_upload_error.message")
                    );
                    document.getElementById("idcp-photo").value = "";
                    // document.getElementById("residence-proof").value = "";
                  }
                };
                img.src = fr.result;
              };
            } else {
              if (_self.state.targetName === "idcp-photo") {
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
                _self.t("validations:error_text.message"),
                _self.t("general_1:max_image_size_error.message")
              );
              document.getElementById("idcp-photo").value = "";
              // document.getElementById("residence-proof").value = "";
            }
          } else {
            _self.openNotificationWithIcon(
              "error",
              _self.t("validations:error_text.message"),
              _self.t("general_1:only_images_error.message")
            );
            document.getElementById("idcp-photo").value = "";
            // document.getElementById("residence-proof").value = "";
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
    if (type == "idcp-photo") {
      this.setState({
        profileImg: "",
        imageName: "",
        imageType: "",
        profileImage: "",
        imagemsg: "",
        icon1: "plus",
        displayFirst: "none",
        idcpPhoto: "",
      });
      document.getElementById("idcp-photo").value = "";
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
      // document.getElementById("residence-proof").value = "";
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
  handleSubmit() {
    if (this.validator.allValid()) {
      this.setState({
        loader: true,
      });
      let values = new FormData();
      if (this.state.reUploadFlag) {
        if (this.state.reUpload1) {
          values.append("idcp_flag", true);
        }
        if (this.state.reUpload2) {
          values.append("proof_of_assets_flag", true);
        }
      }
      values.append("request_id", this.state.requestId);
      let query = "";
      for (var pair of values.entries()) {
        query = query + pair[0] + "=" + pair[1] + "&";
      }
      values.append("files", this.state.idcpPhoto);
      values.append("files", this.state.asset_proof);
      fetch(API_URL + `/users/upload-tier3-documents?${query}`, {
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
            this.setState(
              {
                loader: false,
                idcpPhoto: {},
                asset_proof: [],
                displayFirst: "",
                waitingForApproval: true,
              },
              () => {
                this.openNotificationWithIcon(
                  "success",
                  this.t("validations:success_text.message"),
                  responseData.data
                );
                this.props.history.push("/editProfile");
              }
            );
          } else if (responseData.status == 500) {
            this.openNotificationWithIcon(
              "error",
              this.t("validations:error_text.message"),
              responseData.error
            );
          }
          this.setState({
            loader: false,
          });
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
    var DataForm = new FormData();
    DataForm.append("image", "");
    this.setState({
      profileImg: "",
      imageName: "",
      imageType: "",
      profileImage: "",
      imagemsg: "",
      icon1: "plus",
      displayFirst: "none",
      idcpPhoto: "",
      asset_proof: [],
      cover_flag: null,
    });
    document.getElementById("idcp-photo").value = "";
    this.validator.hideMessages();
    this.forceUpdate();
  }
  onDrop(type, files) {
    if (type === "asset_proof") {
      let flag = false,
        flagLimit = false;
      if (files.length > 0) {
        flag = true;
        if (files[0].size <= 3000000) {
          flagLimit = true;
        }
      }
      this.setState({
        cover_flag: flag,
        resumeLimit: flagLimit,
        asset_proof: files[0],
      });
    }
  }
  onCancel() {
    this.setState({ files: [] });
  }
  comingCancel = (e) => {
    this.setState({
      reasonPopup: false,
    });
  };
  render() {
    let {
      cover_flag,
      verified,
      forceRejectStatus,
      forceRejectNote,
      forceAcceptedStatus,
    } = this.state;
    return (
      <div>
        <Navigation />
        <TierWrapper>
          <KYCWrap>
            <KYCHead>
              {this.t("tiers:tier_text.message")} 3{" "}
              {this.t("tiers:upgrade_text.message")}
            </KYCHead>
            {forceRejectStatus ? (
              <TierWrap
                style={{
                  textAlign: "center",
                  margin: "50px auto",
                  fontSize: "18px",
                }}
              >
                <p>{this.t("reject_reason_note.message")}</p>
                <p>{forceRejectNote}</p>
                <p>
                  {this.t("feel_free_note.message")}{" "}
                  <Link to="/open-ticket">here</Link>
                </p>
              </TierWrap>
            ) : (
              <div>
                {forceAcceptedStatus ? (
                  <TierWrap
                    style={{
                      textAlign: "center",
                      fontSize: "18px",
                    }}
                  >
                    <DoneWrap>
                      <Icon
                        className="icon-display"
                        type="check-circle"
                        theme="twoTone"
                        twoToneColor="#52c41a"
                      />
                      <KycSucc>
                        <span>
                          <b>
                            {this.t(
                              "identity_verification:kyc_verified_text.message"
                            )}
                          </b>
                          <br />
                          <br />
                          {this.t("verified_tier_note.message")} 3.
                        </span>
                      </KycSucc>
                    </DoneWrap>
                  </TierWrap>
                ) : (
                  <TierWrap>
                    <TierRow>
                      <TierLabel>
                        <label>{this.t("idcp_label_text.message")}</label>
                        <Link to="/tier-idcp-confirmation" target="_blank">
                          {this.t("see_details_text.message")}
                        </Link>
                      </TierLabel>
                      <TierUpload>
                        {this.state.idcpPhoto.name ? (
                          <button className="has_file">
                            <span>{this.state.idcpPhoto.name}</span>
                            <Icon
                              onClick={() => {
                                this.removeFile("idcp-photo");
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
                              this.handleFileSelectClick("idcp-photo");
                            }}
                          >
                            <Icon type="upload" />
                            <span>
                              {this.t("general_4:upload_text.message")}
                            </span>
                          </button>
                        )}
                        <TierInput
                          accept=".jpg,.png,.jpeg"
                          onChange={this.handleProfile}
                          type="file"
                          name="idcp-photo"
                          id="idcp-photo"
                          disabled={!this.state.reUpload1}
                        />
                        {this.state.reUpload1
                          ? this.validator.message(
                              "idcp-photo",
                              this.state.profileImg,
                              "required",
                              "tier-text-danger-validation",
                              {
                                required: this.t(
                                  "general_1:this_field_required_error.message"
                                ),
                              }
                            )
                          : delete this.validator.fields["idcp-photo"]}
                      </TierUpload>
                      {this.state.tierData.length > 0 ? (
                        <TierDocBox>
                          {this.state.idcpStatus === null && (
                            <TierDocStatus>
                              <Icon type="warning" />
                              <span>
                                {this.t(
                                  "tier_changes:under_review_text.message"
                                )}
                              </span>
                            </TierDocStatus>
                          )}
                          {this.state.idcpStatus === true && (
                            <TierDocStatus>
                              <Icon type="check" />
                              <span>
                                {this.t("login_page:verified_text.message")}
                              </span>
                            </TierDocStatus>
                          )}
                          {this.state.idcpStatus === false && (
                            <TierDocStatus>
                              <Icon type="close" />
                              <span>{this.t("reupload_it_text.message")}</span>
                            </TierDocStatus>
                          )}
                          {this.state.idcpNote && (
                            <Icon
                              type="message"
                              onClick={() => {
                                this.setState({
                                  reasonPopup: true,
                                  rejectText: this.state.idcpNote,
                                });
                              }}
                            />
                          )}
                        </TierDocBox>
                      ) : (
                        <TierDocBox></TierDocBox>
                      )}
                    </TierRow>
                    <TierRow className="no_border">
                      <TierLabel>
                        <label>
                          {this.t("proof_of_assets_form_text.message")}
                        </label>
                        <a href={Proof_of_assets_form} target="_blank" download>
                          {this.t("click_to_download_text.message")}
                        </a>
                      </TierLabel>
                      <TierUpload>
                        <TierDropWrap
                          className={
                            this.state.asset_proof
                              ? this.state.asset_proof.name
                                ? "has_file"
                                : !this.state.reUpload2
                                ? "disabled_btn"
                                : ""
                              : ""
                          }
                        >
                          <TierDropzoneStyle
                            accept=".pdf,.doc,.docx"
                            className={
                              this.state.asset_proof
                                ? this.state.asset_proof.name
                                  ? "tier_dropzone has_file"
                                  : "tier_dropzone"
                                : "tier_dropzone"
                            }
                            multiple={false}
                            onDrop={this.onDrop.bind(this, "asset_proof")}
                            onFileDialogCancel={this.onCancel.bind(this)}
                            disabled={!this.state.reUpload2}
                          >
                            {(cover_flag === null || cover_flag === false) && (
                              <div>
                                <IconS type="upload" />
                                <FileSelectText>
                                  {this.t("general_4:upload_text.message")}
                                </FileSelectText>
                              </div>
                            )}
                            {cover_flag === true && (
                              <div>
                                <FileSelectText>
                                  {this.state.asset_proof
                                    ? this.state.asset_proof.name
                                    : ""}
                                </FileSelectText>
                              </div>
                            )}
                          </TierDropzoneStyle>
                          {this.state.asset_proof
                            ? this.state.asset_proof.name && (
                                <Icon
                                  className="drop_zone_icon"
                                  onClick={() => {
                                    this.setState({
                                      asset_proof: [],
                                      cover_flag: null,
                                    });
                                  }}
                                  type="close"
                                />
                              )
                            : ""}
                        </TierDropWrap>
                        <SupportText className="tier_support_text">
                          {this.t("apply_job:supported_formats_text.message")}
                        </SupportText>
                        {this.state.reUpload2
                          ? this.validator.message(
                              "asset_proof",
                              cover_flag,
                              "required",
                              "tier-text-danger-validation",
                              {
                                required: this.t(
                                  "general_1:this_field_required_error.message"
                                ),
                              }
                            )
                          : delete this.validator.fields["asset_proof"]}
                        {cover_flag === false && (
                          <div class="tier-text-danger-validation">
                            {this.t(
                              "tier_changes:unsupported_file_format_text.message"
                            )}
                          </div>
                        )}
                      </TierUpload>
                      {this.state.tierData.length > 0 ? (
                        <TierDocBox>
                          {this.state.assetFormStatus === null && (
                            <TierDocStatus>
                              <Icon type="warning" />
                              <span>
                                {this.t(
                                  "tier_changes:under_review_text.message"
                                )}
                              </span>
                            </TierDocStatus>
                          )}
                          {this.state.assetFormStatus === true && (
                            <TierDocStatus>
                              <Icon type="check" />
                              <span>
                                {this.t("login_page:verified_text.message")}
                              </span>
                            </TierDocStatus>
                          )}
                          {this.state.assetFormStatus === false && (
                            <TierDocStatus>
                              <Icon type="close" />
                              <span>{this.t("reupload_it_text.message")}</span>
                            </TierDocStatus>
                          )}
                          {this.state.assetFormNote && (
                            <Icon
                              type="message"
                              onClick={() => {
                                this.setState({
                                  reasonPopup: true,
                                  rejectText: this.state.assetFormNote,
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
                        value={this.t(
                          "edit_profile_titles:subhead_personal_form_cancel_btn.message"
                        )}
                      />
                      <input
                        type="button"
                        className={
                          this.state.uploadBtnFlag
                            ? "upload_btn"
                            : "upload_btn disabled"
                        }
                        onClick={this.handleSubmit.bind(this)}
                        value={this.t("general_4:upload_text.message")}
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
export default translate([
  "tiers",
  "general_4",
  "general_1",
  "validations",
  "security_tab",
  "settings",
  "login_page",
  "edit_profile_titles",
  "general_3",
  "apply_job",
  "tier_changes",
])(connect(mapStateToProps, mapDispatchToProps)(withRouter(TierThree)));
