/* Built-in Packages */
import React, { Component } from "react";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import { notification, Icon } from "antd";
import styled from "styled-components";

/* components */
import { kycDoc, kycFormAction } from "ACTIONS/SETTINGS/passwordActions";
import FaldaxLoader from "SHARED-COMPONENTS/FaldaxLoader";

/* STYLED-COMPONENTS */
import { ButtonWrap, SubWrap, BackButton, NextButton } from "./id_select";

const SSNWrap = styled.div`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  // border:1px solid #e8ebee;
  text-align: left;
  @media (max-width: 1024px) {
    width: 70%;
  }
  @media (max-width: 664px) {
    width: 90%;
  }
`;
const SSNSub = styled.div`
  color: ${props => (props.theme.mode === "dark" ? "white" : "")};
`;
const SSNlabel = styled.label`
  display: block;
  font-size: 18px;
  font-family: open sans;
  text-align: center;
  margin-bottom: 10px;
  font-weight: 500;
`;
export const Filewrap = styled.div`
  text-align: center;
  margin-top: 20px;
`;
export const Fileselect1 = styled.div`
  display: inline-block;
  width: 146px;
  height: 146px;
  text-align: right;
  @media (max-width: 478px) {
    display: block;
    margin-right: auto;
    margin-left: auto;
    margin-top: 20px;
  }
`;
const Fileselect2 = styled(Fileselect1)`
  display: inline-block;
  margin-left: 15px;
  margin-right: 0px;
  @media (max-width: 478px) {
    display: block;
    margin-right: auto;
    margin-left: auto;
  }
`;
export const ButtonUp = styled.button`
  display: block;
  width: 100%;
  /* margin: 0 auto; */
  height: 145px;
  background-color: ${props =>
    props.theme.mode === "dark" ? "#01090f" : "white"};
  color: ${props => (props.theme.mode === "dark" ? "white" : "")};
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
const ButtonUp2 = styled(ButtonUp)``;
const Plus2 = styled(Plus)``;
const Plustext2 = styled(Plustext)``;
export const Fileinput = styled.input`
  visibility: hidden;
  position: absolute;
`;
const Fileinput2 = styled.input`
  visibility: hidden;
  position: absolute;
`;
export const RemoveIcon1 = styled(Icon)`
  color: ${props => (props.theme.mode == "dark" ? "white" : "black")};
`;
const RemoveIcon2 = styled(RemoveIcon1)`
  color: ${props => (props.theme.mode == "dark" ? "white" : "black")};
`;
const TierButtonWrap = styled.div`
  &.button_wrap_tier {
    margin-top: 30px;
    text-align: center;
  }
  > div {
    > button {
      margin: 0;
    }
  }
`;
class TierDocUpload extends Component {
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
      click: "",
      frontWidth: "",
      frontHeight: "",
      targetName: "",
      fileTarget: null,
      displayFirst: "none",
      displaySecond: "none"
    };
    this.handleProfile = this.handleProfile.bind(this);
  }

  /* Life-Cycle Methods */
  componentWillReceiveProps(props, newProps) {
    if (this.state.icon1 === "check" && this.state.click === "front") {
      this.setState({ frontImg: props.image_path });
    } else if (this.state.icon2 === "check" && this.state.click === "back") {
      this.setState({ backImg: props.image_path });
    }
    if (this.props.is_kyc_done === true) {
      this.props.next_step(5);
    }
  }
  handleFileSelectClick(val) {
    document.querySelector("#" + val).click();
    this.setState({ click: val });
  }
  removeFile(type) {
    var DataForm = new FormData();
    DataForm.append("image", "");
    this.props.kycDoc(this.props.isLoggedIn, DataForm, this.state.targetName);
    if (type == "front-doc") {
      this.setState({
        profileImg: "",
        imageName: "",
        imageType: "",
        profileImage: "",
        imagemsg: "",
        icon1: "plus",
        displayFirst: "none"
      });
      document.getElementById("front").value = "";
    } else {
      this.setState({
        profileImg2: "",
        imageName2: "",
        imageType2: "",
        profileImage2: "",
        imagemsg2: "",
        icon2: "plus",
        displaySecond: "none"
      });
      document.getElementById("back").value = "";
    }
  }
  openNotificationWithIcon(type, head, desc) {
    notification[type]({
      message: head,
      description: desc
    });
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
              <RemoveIcon1
                onClick={() => {
                  this.removeFile("front-doc");
                }}
                style={{ display: `${this.state.displayFirst}` }}
                type={"close"}
                theme="outlined"
              />
              <ButtonUp
                style={{ backgroundImage: `url('${this.state.profileImg}')` }}
                className="file-select-btn"
                onClick={() => {
                  this.handleFileSelectClick("front");
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
                name="front-doc"
                id="front"
              />
            </Fileselect1>
          </Filewrap>
        </SSNWrap>
        {this.props.loader === true ? <FaldaxLoader /> : ""}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state,
    image_path:
      state.passwordReducer.image_path !== undefined
        ? state.passwordReducer.image_path
        : "",
    isLoggedIn:
      state.simpleReducer.isLoggedIn !== undefined
        ? state.simpleReducer.isLoggedIn
        : "",
    is_kyc_done:
      state.simpleReducer.profileDetails !== undefined
        ? state.simpleReducer.profileDetails.data[0].is_kyc_done
        : "",
    loader: state.simpleReducer.loader
  };
};
const mapDispatchToProps = dispatch => ({
  kycDoc: (is, Data, type) => dispatch(kycDoc(is, Data, type)),
  kycFormAction: (isLoggedIn, value) =>
    dispatch(kycFormAction(isLoggedIn, value))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TierDocUpload);
