/* In-built Packages */
import React from "react";
import "antd/dist/antd.css";
import styled from "styled-components";

/*Import Components*/
import Navigation from "COMPONENTS/NAVIGATIONS/loggednavigation";
import FooterHome from "COMPONENTS/LANDING/FOOTERS/footer_home";
import { TierWrapper, KYCHead } from "./tier_one";
import { TierWrap } from "../../../STYLED-COMPONENTS/TIER/tierStyle";
import { Upload, Button, Icon } from "antd";
import { ConversionLeftSpan } from "../../../STYLED-COMPONENTS/CONVERSION/tradeCalcStyle";

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
      fileList: [
        {
          uid: "-1",
          name: "xxx.png",
          status: "done",
          url: "http://www.baidu.com/xxx.png"
        }
      ]
    };
  }

  componentDidMount() {}
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
              <div>Proof of Residence</div>
              <div> Social security Number / Govt. Issued ID Number</div>
            </TierWrap>
          </KYCWrap>
        </TierWrapper>
        <FooterHome />
      </div>
    );
  }
}

const mapStateToProps = state => {
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
        : ""
  };
};

export default TierTwo;
