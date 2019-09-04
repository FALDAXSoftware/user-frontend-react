import React from "react";
import LoggedNavigation from "../../NAVIGATIONS/loggednavigation";
import CommonFooter from "COMPONENTS/LANDING/FOOTERS/footer_home";
import FaldaxLoader from "SHARED-COMPONENTS/FaldaxLoader";
import { ContactWrap } from "STYLED-COMPONENTS/LANDING_CATEGORIES/contactStyle";
import "antd/dist/antd.css";
import { Icon, Col } from "antd";
import { connect } from "react-redux";
import CountryPick from "../../SETTINGS/Personaldetails/country";
import uploadIcon from "../../../../src/images/upload-image-icon.png";
import {
  TokenWrap,
  TokenMainRow,
  TokenLeftCol,
  TokenRightCol,
  TokenEllipse,
  TokenLogHead,
  TokenLogSubHead,
  TokenLogForgotBtn,
  TokenLeftHeadBlue,
  TokenFormSubHead,
  TokenLeftColWrap,
  TokenForm,
  TokenFormHead,
  TokenFormTop,
  TokenFormBottom,
  TokenBlueBtn,
  TokenDivFull,
  TokenIconWrap,
  TokenFormGroup,
  TokenFormLabel,
  FourthRow,
  CountryMsg,
  CustomFileInputWrap
} from "../../../STYLED-COMPONENTS/TOKEN/tokenStyle";

class SecurityCheck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      countrymsg: null,
      pictures: [],
      picture: "",
      size: "",
      file: "",
      imagePreviewUrl: "",
      ErrorMsg: "",
      countrySelected: null,
      stateSelected: null,
      citySelected: null,
      tokenStageSecurityCheck: true,
      tokenStageCountry: false,
      tokenStagePhotoOfId: false
    };
    this.onCountryChange = this.onCountryChange.bind(this);
  }
  onCountryChange(country, state, city) {
    this.setState({
      countrySelected: country,
      stateSelected: state,
      citySelected: city
    });
    var loc = {
      country: country,
      state: state,
      city: city
    };
  }
  handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    };
    var size = file["size"];
    if (size > 2000000) {
      // console.log("Image size must be less than 2 MB!");
      this.setState({
        ErrorMsg: "Image size must be less than 2 MB!"
      });
    } else {
      // console.log("Successful");
      this.setState({
        ErrorMsg: ""
      });
      console.log("handle uploading-", this.state.file);
    }
    reader.readAsDataURL(file);
  }
  render() {
    let {
      imagePreviewUrl,
      tokenStageSecurityCheck,
      tokenStagePhotoOfId,
      tokenStageCountry
    } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (
        <div className="imgPreview">
          <img src={imagePreviewUrl} alt="ImageUpload" />
        </div>
      );
    } else {
      $imagePreview = <div className="previewText"></div>;
    }
    return (
      <div>
        <ContactWrap>
          <LoggedNavigation />
          <TokenWrap>
            <TokenMainRow>
              <TokenLeftCol>
                <TokenLeftColWrap>
                  <TokenLeftHeadBlue>token</TokenLeftHeadBlue>
                  {/* Security check form start */}
                  {tokenStageSecurityCheck && (
                    <TokenForm>
                      <TokenFormTop>
                        <TokenFormHead>One-time security check</TokenFormHead>
                        <TokenFormSubHead>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua.
                        </TokenFormSubHead>
                      </TokenFormTop>
                      <TokenFormBottom>
                        <TokenDivFull>
                          <TokenBlueBtn>Next</TokenBlueBtn>
                        </TokenDivFull>
                      </TokenFormBottom>
                    </TokenForm>
                  )}
                  {/* Security check form end */}
                  {/* Country form start */}
                  {tokenStageCountry && (
                    <TokenForm>
                      <TokenFormTop>
                        <TokenFormHead className="has-title-country">
                          <TokenIconWrap>
                            <Icon type="arrow-left" />
                          </TokenIconWrap>
                          Country
                        </TokenFormHead>
                        <TokenFormSubHead className="has-title-country">
                          As in, the country you currently live in.
                        </TokenFormSubHead>
                        <TokenFormGroup>
                          <FourthRow>
                            <Col
                              md={{ span: 24 }}
                              lg={{ span: 24 }}
                              xl={{ span: 24 }}
                              xxl={{ span: 24 }}
                            >
                              <CountryPick
                                {...this.props}
                                onCountryChange={(country, state, city) =>
                                  this.onCountryChange(country, state, city)
                                }
                              />
                              <CountryMsg className="country_msg">
                                {this.state.countrymsg}
                              </CountryMsg>
                            </Col>
                          </FourthRow>
                        </TokenFormGroup>
                      </TokenFormTop>
                      <TokenFormBottom>
                        <TokenDivFull>
                          <TokenBlueBtn>Continue</TokenBlueBtn>
                        </TokenDivFull>
                      </TokenFormBottom>
                    </TokenForm>
                  )}
                  {/* country form end */}
                  {/* Photo of ID form start */}
                  {tokenStagePhotoOfId && (
                    <TokenForm>
                      <TokenFormTop>
                        <TokenFormHead className="has-title-country">
                          <TokenIconWrap>
                            <Icon type="arrow-left" />
                          </TokenIconWrap>
                          Photo of ID
                        </TokenFormHead>
                        <TokenFormSubHead className="has-title-country">
                          We need a government-issued photo Id, Like a drivers
                          license or passport.
                        </TokenFormSubHead>
                        <CustomFileInputWrap>
                          <div className="custom-file-input">
                            <input
                              className="fileInput"
                              type="file"
                              onChange={e => this.handleImageChange(e)}
                              accept="image/gif,image/jpeg"
                            />
                            <span className="drop-image">
                              <img src={uploadIcon} alt="Upload" />
                            </span>
                            <span className="drag-span"></span>
                            <span className="choose-span">
                              <span className="drop-span">Drop photo here</span>
                              <span className="orspan">Or</span>
                              <span className="file-span">Choose a file</span>
                            </span>
                          </div>
                          <p className="noteforupload">
                            We accept any PNG or JPEG under 2MB
                          </p>
                          <p className="errorimg">{this.state.ErrorMsg}</p>
                          {$imagePreview}
                        </CustomFileInputWrap>
                      </TokenFormTop>
                      <TokenFormBottom>
                        <TokenDivFull>
                          <TokenBlueBtn>Continue</TokenBlueBtn>
                        </TokenDivFull>
                      </TokenFormBottom>
                    </TokenForm>
                  )}
                  {/* Photo of ID form end */}
                </TokenLeftColWrap>
              </TokenLeftCol>
              <TokenRightCol>
                <div>
                  <TokenEllipse />
                  <TokenLogHead>
                    Lorem ipsum dolor sit adipiscing elit!
                  </TokenLogHead>
                  <TokenLogSubHead>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Quis ipsum suspendisse ultrices gravida. Risus
                    commodo viverra maecenas accumsan lacus vel facilisis.
                  </TokenLogSubHead>
                  <TokenLogForgotBtn>I'll verify later</TokenLogForgotBtn>
                </div>
              </TokenRightCol>
            </TokenMainRow>
          </TokenWrap>
          <CommonFooter />
          {this.state.loader === true ? <FaldaxLoader /> : ""}
        </ContactWrap>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state,
    profileDetails:
      state.simpleReducer.profileDetails !== undefined
        ? state.simpleReducer.profileDetails.data[0]
        : ""
  };
};

export default connect(
  mapStateToProps,
  null
)(SecurityCheck);
