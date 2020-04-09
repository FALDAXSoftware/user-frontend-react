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
import { Icon, notification, Row, Col } from "antd";
import {
  DropzoneStyle,
  IconS,
  FileSelectText,
} from "../../../STYLED-COMPONENTS/LANDING_CATEGORIES/contactStyle";
import { SupportText } from "../../LANDINGCATEGORIES/apply_job";
import { APIUtility } from "../../../httpHelper";
import FaldaxLoader from "../../../SHARED-COMPONENTS/FaldaxLoader";
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
    };
    this.handleProfile = this.handleProfile.bind(this);
    this.populateData = this.populateData.bind(this);
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
  }
  componentWillMount() {
    if (this.props.profileDetails.account_tier !== 2) {
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
    // console.log("this.props.location^^^^^", this.props.location);
    var getID = this.props.location.pathname.split("/tier");
    this.setState(
      {
        tierID: getID[1],
      },
      () => {
        this.populateData();
      }
    );
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
    let { tierData, tierID } = this.state;
    let currentTierData = tierData[parseInt(tierID) - 1];
    let under_approval = currentTierData.under_approval;
    let declined = currentTierData.is_declined;
    console.log("^^declined", declined);
    if (currentTierData.is_verified) {
      this.setState({
        verified: true,
      });
    } else {
      this.setState({
        verified: false,
      });
    }
    if (under_approval && under_approval.length == 2 && declined.length == 0) {
      this.setState({
        waitingForApproval: true,
      });
    } else {
      this.setState({
        waitingForApproval: false,
      });
    }
    if (declined && declined.length > 0) {
      declined.map((item, key) => {
        console.log("^^hsdf", item);
        switch (item) {
          case "1":
            return this.setState({ reUpload1: true });
          case "2":
            return this.setState({ reUpload2: true });
          default:
            return this.setState({
              reUpload1: true,
              reUpload2: true,
            });
        }
      });
    } else {
      this.setState({ reUpload1: true, reUpload2: true });
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
                      "Error",
                      "File needs to be greater than 450*600 in dimension"
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
                "Error",
                "Please select an image with a file size less than 4 mb"
              );
              document.getElementById("idcp-photo").value = "";
              // document.getElementById("residence-proof").value = "";
            }
          } else {
            _self.openNotificationWithIcon(
              "error",
              "Error",
              "File format is not supported. Please upload an image using a supported format."
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
      console.log("^ajksdhk", this.state.asset_proof, this.state.idcpPhoto);
      let values = new FormData();
      if (this.state.reUpload1) {
        values.append("idcp_flag", true);
      }
      if (this.state.reUpload2) {
        values.append("proof_of_assets_flag", true);
      }
      values.append("files", this.state.idcpPhoto);
      values.append("files", this.state.asset_proof);
      fetch(API_URL + `/users/upload-tier3-documents`, {
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
            this.openNotificationWithIcon(
              "success",
              "Success",
              responseData.data
            );
            this.setState({
              idcpPhoto: {},
              asset_proof: [],
              displayFirst: "",
              waitingForApproval: true,
            });
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
      this.setState(
        {
          cover_flag: flag,
          resumeLimit: flagLimit,
          asset_proof: files[0],
          // fields: { ...this.state.fields, asset_proof: files[0] },
        },
        () => {
          // console.log("^^^^files", this.state.asset_proof.name, files[0]);
        }
      );
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
  render() {
    let { cover_flag, verified } = this.state;
    return (
      <div>
        <Navigation />
        <TierWrapper>
          <KYCWrap>
            <KYCHead>Tier 3 Upgrade</KYCHead>
            {verified ? (
              <TierWrap
                style={{
                  textAlign: "center",
                  margin: "50px auto",
                  fontSize: "18px",
                }}
              >
                <p>Your account is verified to tier 3.</p>
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
                    <Row
                      style={{
                        margin: "50px auto 30px",
                      }}
                      gutter={16}
                    >
                      <Col span={6}>
                        <div
                          style={{
                            margin: "0 0 30px 0",
                          }}
                        >
                          <label>IDCP Photo</label>
                          <br />
                          <Fileselect1 className="file-select-col">
                            {/* {console.log(this.state)} */}
                            <RemoveIcon1
                              onClick={() => {
                                this.removeFile("idcp-photo");
                              }}
                              style={{ display: `${this.state.displayFirst}` }}
                              type={"close"}
                              theme="outlined"
                            />
                            <ButtonUp
                              style={{
                                backgroundImage: `url('${this.state.profileImg}')`,
                              }}
                              className="file-select-btn"
                              onClick={() => {
                                this.handleFileSelectClick("idcp-photo");
                              }}
                            >
                              <Plus className="plus">
                                <Icon
                                  type={this.state.icon1}
                                  theme="outlined"
                                />
                              </Plus>
                              <Plustext className="text">Upload</Plustext>
                            </ButtonUp>
                            <Fileinput
                              onChange={this.handleProfile}
                              type="file"
                              name="idcp-photo"
                              id="idcp-photo"
                              disabled={!this.state.reUpload1}
                            />
                            {this.state.reUpload1 &&
                              this.validator.message(
                                "idcp-photo",
                                this.state.profileImg,
                                "required",
                                "tier-text-danger-validation",
                                {
                                  required: "This field is required.",
                                }
                              )}
                          </Fileselect1>
                        </div>
                      </Col>
                      <Col span={18}>
                        <div>
                          <p>Proof of Assets Form</p>
                          <a
                            href="https://s3.us-east-2.amazonaws.com/production-static-asset/assets/pdf/FALDAX+Terms+of+Service.pdf"
                            target="_blank"
                            download
                          >
                            Click here to open Proof of Assets Form
                          </a>
                          <br />
                          <DropzoneStyle
                            accept=".pdf,.doc,.docx"
                            className="Dropzone_apply"
                            onDrop={this.onDrop.bind(this, "asset_proof")}
                            onFileDialogCancel={this.onCancel.bind(this)}
                            disabled={!this.state.reUpload2}
                          >
                            {cover_flag === null && (
                              <div>
                                <IconS type="download" />
                                <FileSelectText>Choose file</FileSelectText>
                              </div>
                            )}
                            {cover_flag === false && (
                              <div>
                                <IconS type="close-square" />
                                <FileSelectText>
                                  Wrong File Selected
                                </FileSelectText>
                              </div>
                            )}
                            {cover_flag === true && (
                              <div>
                                <IconS type="check-square" />
                                <FileSelectText>
                                  {this.state.asset_proof.name}
                                </FileSelectText>
                              </div>
                            )}
                          </DropzoneStyle>
                          <SupportText>
                            Supported format: .doc, .docx, .pdf.
                          </SupportText>
                          {this.state.reUpload2 &&
                            this.validator.message(
                              "asset_proof",
                              cover_flag,
                              "required",
                              "tier-text-danger-validation"
                            )}
                        </div>
                      </Col>
                    </Row>
                    <Row gutter={16}>
                      <Col
                        style={{
                          padding: "0 18px",
                        }}
                      >
                        <input
                          type="button"
                          onClick={this.handleSubmit.bind(this)}
                          value="Submit"
                        />
                      </Col>
                    </Row>
                  </TierWrap>
                )}
              </div>
            )}
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
)(withRouter(TierThree));
