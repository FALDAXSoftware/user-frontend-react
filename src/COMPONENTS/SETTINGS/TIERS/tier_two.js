/* In-built Packages */
import React from "react";
import "antd/dist/antd.css";
import styled from "styled-components";

/*Import Components*/
import Navigation from "COMPONENTS/NAVIGATIONS/loggednavigation";
import FooterHome from "COMPONENTS/LANDING/FOOTERS/footer_home";
import { TierWrapper, KYCHead } from "./tier_one";
import { TierWrap } from "../../../STYLED-COMPONENTS/TIER/tierStyle";
import { Icon, notification } from "antd";
import { globalVariables } from "Globals.js";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import SimpleReactValidator from "simple-react-validator";
import NumberFormat from "react-number-format";
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
      // currentTierData: "",
      // under_approval: [],
      // declined: [],
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
  componentWillMount() {}
  async componentDidMount() {
    try {
      await this.getTierDetails();
    } catch (error) {
      console.log(error);
    } finally {
    }
    var getID = this.props.location.pathname.split("/tier");
    this.setState(
      {
        is_twofactor_enabled: this.props.profileDetails.is_twofactor,
        tierID: getID[1],
      },
      () => {
        this.populateData();
      }
    );
    // this.setState(
    //   {
    //     is_twofactor_enabled: this.props.profileDetails.is_twofactor,
    //     under_approval: this.props.location.state.underApproval,
    //     declined: this.props.location.state.declined,
    //   },
    //   () => {
    //     var declined_data = this.state.declined.split(",");
    //     var under_approval = this.state.under_approval.split(",");
    //     console.log("^^^^", declined_data.length, declined_data);
    //     if (under_approval && under_approval.length == 3) {
    //       this.setState({
    //         waitingForApproval: true,
    //       });
    //     } else {
    //       this.setState({
    //         waitingForApproval: false,
    //       });
    //     }
    //     if (declined_data && declined_data.length > 0) {
    //       declined_data.map((item, key) => {
    //         console.log("^^hsdf", item);
    //         switch (item) {
    //           case "1":
    //             return this.setState({ reUpload1: true });
    //           case "2":
    //             return this.setState({ reUpload2: true });
    //           case "3":
    //             return this.setState({ reUpload3: true });
    //           default:
    //             return this.setState({
    //               reUpload1: true,
    //               reUpload2: true,
    //               reUpload3: true,
    //             });
    //         }
    //       });
    //     } else {
    //       this.setState({ reUpload1: true, reUpload2: true, reUpload3: true });
    //     }
    //   }
    // );
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
    if (under_approval && under_approval.length == 3) {
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
          case "3":
            return this.setState({ reUpload3: true });
          default:
            return this.setState({
              reUpload1: true,
              reUpload2: true,
              reUpload3: true,
            });
        }
      });
    } else {
      this.setState({ reUpload1: true, reUpload2: true, reUpload3: true });
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
                      _self.setState({ validID: file });
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

      values.append("ssn", this.state.id_number);
      values.append("valid_id", this.state.validID);
      values.append("residence_proof", this.state.residenceProof);
      console.log(
        "Submit tier2 data^^^^",
        this.state.validID,
        this.state.residenceProof
      );
      fetch(API_URL + `/users/upload-user-documents`, {
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
              validID: {},
              residenceProof: {},
              id_number: "",
              waitingForApproval: true,
            });
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
  render() {
    // console.log(
    //   "data data data^^",
    //   this.state.reUpload1,
    //   this.state.reUpload2,
    //   this.state.reUpload3
    // );
    let { is_twofactor_enabled } = this.state;
    return (
      <div>
        <Navigation />
        <TierWrapper>
          <KYCWrap>
            <KYCHead>Tier 2 Upgrade</KYCHead>
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
                  <div>Enabled</div>
                ) : (
                  <div>
                    <span>2FA is mandatory to upgarde to tier 2 account.</span>
                    <br />
                    <span>Please click on below link to enable 2FA.</span>
                    <br />
                    <a href="/editProfile">Click here</a>
                  </div>
                )}
                <div
                  style={{
                    margin: "0 0 30px 0",
                  }}
                >
                  <label>Valid ID</label>
                  <br />
                  <Fileselect1 className="file-select-col">
                    {/* {console.log(this.state)} */}
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
                        backgroundImage: `url('${this.state.profileImg}')`,
                      }}
                      className="file-select-btn"
                      onClick={() => {
                        this.handleFileSelectClick("valid-id");
                      }}
                    >
                      <Plus className="plus">
                        <Icon type={this.state.icon1} theme="outlined" />
                      </Plus>
                      <Plustext className="text">Upload</Plustext>
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
                          required: "This field is required.",
                        }
                      )}
                  </Fileselect1>
                </div>
                <div
                  style={{
                    margin: "0 0 30px 0",
                  }}
                >
                  <label>Proof of Residence</label>
                  <br />
                  <Fileselect1 className="file-select-col">
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
                        backgroundImage: `url('${this.state.profileImg2}')`,
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
                          required: "This field is required.",
                        }
                      )}
                  </Fileselect1>
                </div>
                <div
                  style={{
                    margin: "0 0 30px 0",
                  }}
                >
                  <label>Social security Number / Govt. Issued ID Number</label>
                  <br />
                  {/* <Input type="text" value={this.state.id_number} /> */}
                  <SSNInput
                    disabled={!this.state.reUpload3}
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
                </div>
                <input
                  type="button"
                  onClick={this.handleSubmit.bind(this)}
                  value="Submit"
                />
              </TierWrap>
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
)(withRouter(TierTwo));
