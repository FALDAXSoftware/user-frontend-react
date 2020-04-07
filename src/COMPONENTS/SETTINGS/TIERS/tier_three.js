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
import {
  Fileselect1,
  RemoveIcon1,
  ButtonUp,
  Plus,
  Plustext,
  Fileinput,
} from "./tier_two";
import { Icon, notification } from "antd";
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
    };
    this.handleProfile = this.handleProfile.bind(this);
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

  componentDidMount() {}
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
                    document.getElementById("residence-proof").value = "";
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
              document.getElementById("residence-proof").value = "";
            }
          } else {
            _self.openNotificationWithIcon(
              "error",
              "Error",
              "File format is not supported. Please upload an image using a supported format."
            );
            document.getElementById("idcp-photo").value = "";
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
  handleSubmit() {
    if (this.validator.allValid() && this.state.is_twofactor_enabled) {
      let values = new FormData();
      // let files = {};
      // files["valid-id"] = this.state.idcpPhoto;
      // files["residence-proof"] = this.state.residenceProof;
      // values["data"] = this.state.id_number;
      // values["files"] = files;
      values.append("ssn", this.state.id_number);
      values.append("valid_id", this.state.idcpPhoto);
      values.append("residence_proof", this.state.residenceProof);
      console.log(
        "Submit tier2 data^^^^",
        this.state.idcpPhoto,
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
              idcpPhoto: {},
              residenceProof: {},
              id_number: "",
            });
          }
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
    return (
      <div>
        <Navigation />
        <TierWrapper>
          <KYCWrap>
            <KYCHead>Tier 3 Upgrade</KYCHead>
            <TierWrap>
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
                      <Icon type={this.state.icon1} theme="outlined" />
                    </Plus>
                    <Plustext className="text">Upload</Plustext>
                  </ButtonUp>
                  <Fileinput
                    onChange={this.handleProfile}
                    type="file"
                    name="idcp-photo"
                    id="idcp-photo"
                  />
                  {this.validator.message(
                    "idcp-photo",
                    this.state.profileImg,
                    "required",
                    "text-danger-validation",
                    {
                      required: "This field is required.",
                    }
                  )}
                </Fileselect1>
              </div>
              <p>Proof of Assets Form</p>
              <a
                href="https://s3.us-east-2.amazonaws.com/production-static-asset/assets/pdf/FALDAX+Terms+of+Service.pdf"
                target="_blank"
                download
              >
                Click here to open Proof of Assets Form
              </a>
              <br />
              <input
                type="button"
                onClick={this.handleSubmit.bind(this)}
                value="Submit"
              />
            </TierWrap>
          </KYCWrap>
        </TierWrapper>
        <FooterHome />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    profileDetails:
      state.simpleReducer.profileDetails !== undefined
        ? state.simpleReducer.profileDetails.data[0]
        : "",
    theme:
      state.themeReducer.theme !== undefined ? state.themeReducer.theme : "",
    isLoggedIn:
      state.simpleReducer.isLoggedIn !== undefined
        ? state.simpleReducer.isLoggedIn
        : "",
  };
};

export default TierThree;
