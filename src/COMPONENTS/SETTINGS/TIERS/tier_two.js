/* In-built Packages */
import React from "react";
import "antd/dist/antd.css";
import styled from "styled-components";

/*Import Components*/
import Navigation from "COMPONENTS/NAVIGATIONS/loggednavigation";
import FooterHome from "COMPONENTS/LANDING/FOOTERS/footer_home";
import { TierWrapper, KYCHead } from "./tier_one";
import { TierWrap } from "../../../STYLED-COMPONENTS/TIER/tierStyle";
import { Upload, Button, Icon, Input } from "antd";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  DropzoneStyle,
  IconS,
  FileSelectText
} from "../../../STYLED-COMPONENTS/LANDING_CATEGORIES/contactStyle";
import { SupportText } from "../../LANDINGCATEGORIES/apply_job";

/* Styled-Components */
const KYCWrap = styled.div`
  background-color: ${props =>
    props.theme.mode === "dark" ? "#041422" : "#ffffff"};
  margin: auto;
  width: 95%;
  border-radius: 7px;
  padding: 50px 0;
`;

class TierTwo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id_number: "",
      fileList: [],
      files: []
    };
  }
  componentWillMount() {
    if (this.props.profileDetails) {
      if (!this.props.profileDetails.account_tier == 2) {
        this.props.history.push("/");
      }
    }
  }
  componentDidMount() {}
  onDrop(type, files) {
    if (type === "res") {
      let flag = false,
        flagLimit = false;
      if (files.length > 0) {
        flag = true;
        if (files[0].size <= 3000000) {
          flagLimit = true;
        }
      }
      this.setState({
        flag_drop: flag,
        resumeLimit: flagLimit,
        fields: { ...this.state.fields, resume: files[0] }
      });
    } else {
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
        coverLimit: flagLimit,
        fields: { ...this.state.fields, cover_letter: files[0] }
      });
    }
  }
  onCancel() {
    this.setState({ files: [] });
  }
  handleChange = info => {
    let fileList = [...info.fileList];

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    fileList = fileList.slice(-1);

    // 2. Read from response and show file link
    fileList = fileList.map(file => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });

    this.setState({ fileList }, () => {
      console.log("^^^^", this.state.fileList);
    });
  };
  render() {
    const props = {
      action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
      onChange: this.handleChange,
      multiple: true
    };
    return (
      <div>
        <Navigation />
        <TierWrapper>
          <KYCWrap>
            <KYCHead>Tier 2 Upgrade</KYCHead>
            <TierWrap>
              <div>2FA</div>
              <div>
                <label>Valid ID</label>
                <br />
                <Upload {...props} fileList={this.state.fileList}>
                  <Button>
                    <Icon type="upload" /> Upload
                  </Button>
                </Upload>
              </div>
              <div>
                <label>Proof of Residence</label>
                <br />
                <DropzoneStyle
                  accept=".pdf,.doc,.docx"
                  className="Dropzone_apply"
                  onDrop={this.onDrop.bind(this, "res")}
                  onFileDialogCancel={this.onCancel.bind(this)}
                >
                  {/* {flag_drop === null && ( */}
                  <div>
                    <IconS type="download" />
                    <FileSelectText>Choose file</FileSelectText>
                  </div>
                  {/* ) */}}{/* {flag_drop === false && ( */}
                  <div>
                    <IconS type="close-square" />
                    <FileSelectText>Wrong File Selected</FileSelectText>
                  </div>
                  {/* ) */}}{/* {flag_drop === true && ( */}
                  <div>
                    <IconS type="check-square" />
                    <FileSelectText>
                      temp
                      {/* {fields.resume.name} */}
                    </FileSelectText>
                  </div>
                  {/* ) */}}
                </DropzoneStyle>
                <SupportText>Supported format: .doc, .docx, .pdf.</SupportText>
                {/* {this.validator.message(
                  "resume",
                  flag_drop,
                  "resumeRequired|resumeValid|resumeLimit",
                  "text-danger-validation"
                )} */}
              </div>
              <div>
                <label>Social security Number / Govt. Issued ID Number</label>
                <br />
                <Input type="text" value={this.state.id_number} />
              </div>
            </TierWrap>
          </KYCWrap>
        </TierWrapper>
        <FooterHome />
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
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
      state.themeReducer.theme !== undefined ? state.themeReducer.theme : ""
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TierTwo));
