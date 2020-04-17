/* In-built Packages */
import React from "react";
import "antd/dist/antd.css";
import styled from "styled-components";

/*Import Components*/
import Navigation from "COMPONENTS/NAVIGATIONS/loggednavigation";
import FooterHome from "COMPONENTS/LANDING/FOOTERS/footer_home";
import { TierWrapper, KYCHead } from "./tier_one";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { globalVariables } from "Globals.js";
import SimpleReactValidator from "simple-react-validator";
import {
  TierWrap,
  TierRow,
  TierLabel,
  TierUpload,
  TierDocBox,
  TierDocStatus,
  TierDropWrap,
  TierDropzoneStyle,
  TierButtonRow,
} from "../../../STYLED-COMPONENTS/TIER/tierStyle";
import { SupportText } from "../../LANDINGCATEGORIES/apply_job";
import { Icon } from "antd";
import {
  FileSelectText,
  IconS,
} from "../../../STYLED-COMPONENTS/LANDING_CATEGORIES/contactStyle";
import { APIUtility } from "../../../httpHelper";
import FaldaxLoader from "../../../SHARED-COMPONENTS/FaldaxLoader";

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

class TierFour extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      aml_flag: null,
      aml_questionnaire: [],
      reUpload1: false,
      uploadBtnFlag: false,
      comfort_letter: [],
      comfort_flag: null,
      reUpload2: false,
      board_resolution: [],
      board_flag: null,
      reUpload3: false,
    };
    this.validator = new SimpleReactValidator();
    this.populateData = this.populateData.bind(this);
  }
  // componentWillMount() {
  //   if (this.props.profileDetails) {
  //     if (this.props.profileDetails.account_tier == 3) {
  //       this.props.history.push("/tier4");
  //     } else {
  //       this.props.history.push("/");
  //     }
  //   }
  // }
  componentWillMount() {
    // if (this.props.profileDetails.account_tier !== 3) {
    //   this.props.history.push("/");
    // }
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
      let result = await APIUtility.getTierDetails(this.props.isLoggedIn);
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
    console.log("^^^tierdata", this.state.tierData.length);
    if (this.state.tierData.length > 0) {
      this.setState({
        reUploadFlag: true,
      });
      let tierData = this.state.tierData;
      // tierData.map((tierDoc, index) => {
      //   if (tierDoc) {
      //     if (tierDoc.is_approved === false) {
      //       this.setState({
      //         uploadBtnFlag: true,
      //       });
      //     }
      //     if (tierDoc.request_id) {
      //       this.setState({
      //         requestId: tierDoc.request_id,
      //       });
      //     }
      //     switch (index) {
      //       case 0:
      //         let idcpphoto = tierDoc.is_approved;
      //         let reupload1;
      //         if (tierDoc.is_approved === null) {
      //           reupload1 = false;
      //         } else if (tierDoc.is_approved === true) {
      //           reupload1 = false;
      //         } else {
      //           reupload1 = true;
      //         }
      //         this.setState({
      //           reUpload1: reupload1,
      //           idcpStatus: idcpphoto,
      //         });
      //         return console.log("TierDoc^^", tierDoc.type, index);
      //       case 1:
      //         let assetform = tierDoc.is_approved;
      //         let reupload2;
      //         if (tierDoc.is_approved === null) {
      //           reupload2 = false;
      //         } else if (tierDoc.is_approved === true) {
      //           reupload2 = false;
      //         } else {
      //           reupload2 = true;
      //         }
      //         this.setState({
      //           reUpload2: reupload2,
      //           assetFormStatus: assetform,
      //         });
      //         return console.log("TierDoc^^", tierDoc.type, index);
      //       default:
      //         return console.log("No case");
      //     }
      //   }
      // });
      this.setState({
        reUploadFlag: false,
        reUpload1: true,
        reUpload2: true,
        reUpload3: true,
        uploadBtnFlag: true,
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
  onDrop(type, files) {
    if (type === "aml_questionnaire") {
      let flag = false,
        flagLimit = false;
      if (files.length > 0) {
        flag = true;
        if (files[0].size <= 3000000) {
          flagLimit = true;
        }
      }
      this.setState({
        aml_flag: flag,
        resumeLimit: flagLimit,
        aml_questionnaire: files[0],
      });
    } else if (type === "comfort_letter") {
      let flag = false,
        flagLimit = false;
      if (files.length > 0) {
        flag = true;
        if (files[0].size <= 3000000) {
          flagLimit = true;
        }
      }
      this.setState({
        comfort_flag: flag,
        resumeLimit: flagLimit,
        comfort_letter: files[0],
      });
    } else if (type === "board_resolution") {
      let flag = false,
        flagLimit = false;
      if (files.length > 0) {
        flag = true;
        if (files[0].size <= 3000000) {
          flagLimit = true;
        }
      }
      this.setState({
        board_flag: flag,
        resumeLimit: flagLimit,
        board_resolution: files[0],
      });
    } else {
      // let flag = false,
      //   flagLimit = false;
      // if (files.length > 0) {
      //   flag = true;
      //   if (files[0].size <= 3000000) {
      //     flagLimit = true;
      //   }
      // }
      // this.setState({
      //   cover_flag: flag,
      //   coverLimit: flagLimit,
      //   fields: { ...this.state.fields, cover_letter: files[0] },
      // });
    }
  }
  onCancel() {
    this.setState({ files: [] });
  }
  handleSubmit() {
    if (this.validator.allValid()) {
      // this.setState({
      //   loader: true,
      // });
      // console.log("^ajksdhk", this.state.asset_proof, this.state.idcpPhoto);
      // let values = new FormData();
      // if (this.state.reUploadFlag) {
      //   if (this.state.reUpload1) {
      //     values.append("idcp_flag", true);
      //   }
      //   if (this.state.reUpload2) {
      //     values.append("proof_of_assets_flag", true);
      //   }
      // }
      // values.append("request_id", this.state.requestId);
      // let query = "";
      // for (var pair of values.entries()) {
      //   query = query + pair[0] + "=" + pair[1] + "&";
      // }
      // values.append("files", this.state.idcpPhoto);
      // values.append("files", this.state.asset_proof);
      // fetch(API_URL + `/users/upload-tier3-documents?${query}`, {
      //   method: "post",
      //   headers: {
      //     "Accept-Language": localStorage["i18nextLng"],
      //     Authorization: "Bearer " + this.props.isLoggedIn,
      //   },
      //   body: values,
      // })
      //   .then((response) => response.json())
      //   .then((responseData) => {
      //     if (responseData.status == 200) {
      //       console.log("^^^^response", responseData);
      //       this.setState(
      //         {
      //           loader: false,
      //           idcpPhoto: {},
      //           asset_proof: [],
      //           displayFirst: "",
      //           waitingForApproval: true,
      //         },
      //         () => {
      //           this.openNotificationWithIcon(
      //             "success",
      //             "Success",
      //             responseData.data
      //           );
      //           this.props.history.push("/editProfile");
      //         }
      //       );
      //     }
      //     this.setState({
      //       loader: false,
      //     });
      //   })
      //   .catch((error) => {
      //     this.setState({ loader: false });
      //   });
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }
  handleCancel() {
    this.setState({
      aml_questionnaire: [],
      aml_flag: null,
      comfort_letter: [],
      comfort_flag: null,
      board_resolution: [],
      board_flag: null,
    });
    this.validator.hideMessages();
    this.forceUpdate();
  }
  render() {
    let { aml_flag, comfort_flag, board_flag } = this.state;
    return (
      <div>
        <Navigation />
        <TierWrapper>
          <KYCWrap>
            <KYCHead>Tier 4 Upgrade</KYCHead>
            <TierWrap>
              {/* AML Questionnaire */}
              <TierRow>
                <TierLabel>
                  <label>AML Questionnaire</label>
                  <a href={Proof_of_assets_form} target="_blank" download>
                    Click Here to Download the Form
                  </a>
                </TierLabel>
                <TierUpload>
                  <TierDropWrap
                    className={
                      this.state.aml_questionnaire.name
                        ? "has_file"
                        : !this.state.reUpload1
                        ? "disabled_btn"
                        : ""
                    }
                  >
                    <TierDropzoneStyle
                      accept=".pdf,.doc,.docx"
                      className={
                        this.state.aml_questionnaire.name
                          ? "tier_dropzone has_file"
                          : "tier_dropzone"
                      }
                      multiple={false}
                      onDrop={this.onDrop.bind(this, "aml_questionnaire")}
                      onFileDialogCancel={this.onCancel.bind(this)}
                      disabled={!this.state.reUpload1}
                    >
                      {aml_flag === null && (
                        <div>
                          <IconS type="upload" />
                          <FileSelectText>Upload</FileSelectText>
                        </div>
                      )}
                      {aml_flag === false && (
                        <div>
                          {/* <IconS type="close-square" /> */}
                          <FileSelectText>Wrong File Selected</FileSelectText>
                        </div>
                      )}
                      {aml_flag === true && (
                        <div>
                          {/* <IconS type="check-square" /> */}
                          <FileSelectText>
                            {this.state.aml_questionnaire.name}
                          </FileSelectText>
                        </div>
                      )}
                    </TierDropzoneStyle>
                    {this.state.aml_questionnaire.name && (
                      <Icon
                        className="drop_zone_icon"
                        onClick={() => {
                          this.setState({
                            aml_questionnaire: [],
                            aml_flag: null,
                          });
                        }}
                        type="close"
                      />
                    )}
                  </TierDropWrap>
                  <SupportText className="tier_support_text">
                    Supported format: .doc, .docx, .pdf.
                  </SupportText>
                  {this.state.reUpload1 &&
                    this.validator.message(
                      "aml_questionnaire",
                      aml_flag,
                      "required",
                      "tier-text-danger-validation"
                    )}
                </TierUpload>
                <TierDocBox>
                  {/* <TierDocStatus>
                    <Icon type="warning" />
                    <span>Under Approval</span>
                  </TierDocStatus> */}
                </TierDocBox>
              </TierRow>
              {/* Comfort Letter */}
              <TierRow>
                <TierLabel>
                  <label>Comfort Letter</label>
                  <a href={Proof_of_assets_form} target="_blank" download>
                    Click Here to Download the Form
                  </a>
                </TierLabel>
                <TierUpload>
                  <TierDropWrap
                    className={
                      this.state.comfort_letter.name
                        ? "has_file"
                        : !this.state.reUpload1
                        ? "disabled_btn"
                        : ""
                    }
                  >
                    <TierDropzoneStyle
                      accept=".pdf,.doc,.docx"
                      className={
                        this.state.comfort_letter.name
                          ? "tier_dropzone has_file"
                          : "tier_dropzone"
                      }
                      multiple={false}
                      onDrop={this.onDrop.bind(this, "comfort_letter")}
                      onFileDialogCancel={this.onCancel.bind(this)}
                      disabled={!this.state.reUpload2}
                    >
                      {comfort_flag === null && (
                        <div>
                          <IconS type="upload" />
                          <FileSelectText>Upload</FileSelectText>
                        </div>
                      )}
                      {comfort_flag === false && (
                        <div>
                          {/* <IconS type="close-square" /> */}
                          <FileSelectText>Wrong File Selected</FileSelectText>
                        </div>
                      )}
                      {comfort_flag === true && (
                        <div>
                          {/* <IconS type="check-square" /> */}
                          <FileSelectText>
                            {this.state.comfort_letter.name}
                          </FileSelectText>
                        </div>
                      )}
                    </TierDropzoneStyle>
                    {this.state.comfort_letter.name && (
                      <Icon
                        className="drop_zone_icon"
                        onClick={() => {
                          this.setState({
                            comfort_letter: [],
                            comfort_flag: null,
                          });
                        }}
                        type="close"
                      />
                    )}
                  </TierDropWrap>
                  <SupportText className="tier_support_text">
                    Supported format: .doc, .docx, .pdf.
                  </SupportText>
                  {this.state.reUpload2 &&
                    this.validator.message(
                      "comfort_letter",
                      comfort_flag,
                      "required",
                      "tier-text-danger-validation"
                    )}
                </TierUpload>
                <TierDocBox>
                  {/* <TierDocStatus>
                    <Icon type="warning" />
                    <span>Under Approval</span>
                  </TierDocStatus> */}
                </TierDocBox>
              </TierRow>
              {/* Board Resolution */}
              <TierRow>
                <TierLabel>
                  <label>Board Resolution</label>
                  <a href={Proof_of_assets_form} target="_blank" download>
                    Click Here to Download the Form
                  </a>
                </TierLabel>
                <TierUpload>
                  <TierDropWrap
                    className={
                      this.state.board_resolution.name
                        ? "has_file"
                        : !this.state.reUpload3
                        ? "disabled_btn"
                        : ""
                    }
                  >
                    <TierDropzoneStyle
                      accept=".pdf,.doc,.docx"
                      className={
                        this.state.board_resolution.name
                          ? "tier_dropzone has_file"
                          : "tier_dropzone"
                      }
                      multiple={false}
                      onDrop={this.onDrop.bind(this, "board_resolution")}
                      onFileDialogCancel={this.onCancel.bind(this)}
                      disabled={!this.state.reUpload3}
                    >
                      {board_flag === null && (
                        <div>
                          <IconS type="upload" />
                          <FileSelectText>Upload</FileSelectText>
                        </div>
                      )}
                      {board_flag === false && (
                        <div>
                          <FileSelectText>Wrong File Selected</FileSelectText>
                        </div>
                      )}
                      {board_flag === true && (
                        <div>
                          <FileSelectText>
                            {this.state.board_resolution.name}
                          </FileSelectText>
                        </div>
                      )}
                    </TierDropzoneStyle>
                    {this.state.board_resolution.name && (
                      <Icon
                        className="drop_zone_icon"
                        onClick={() => {
                          this.setState({
                            board_resolution: [],
                            board_flag: null,
                          });
                        }}
                        type="close"
                      />
                    )}
                  </TierDropWrap>
                  <SupportText className="tier_support_text">
                    Supported format: .doc, .docx, .pdf.
                  </SupportText>
                  {this.state.reUpload3 &&
                    this.validator.message(
                      "board_resolution",
                      board_flag,
                      "required",
                      "tier-text-danger-validation"
                    )}
                </TierUpload>
                <TierDocBox>
                  {/* <TierDocStatus>
                    <Icon type="warning" />
                    <span>Under Approval</span>
                  </TierDocStatus> */}
                </TierDocBox>
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
          </KYCWrap>
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
)(withRouter(TierFour));
