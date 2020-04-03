/* In-built Packages */
import React from "react";
import "antd/dist/antd.css";
import styled from "styled-components";

/*Import Components*/
import Navigation from "COMPONENTS/NAVIGATIONS/loggednavigation";
import FooterHome from "COMPONENTS/LANDING/FOOTERS/footer_home";
import { TierWrapper } from "./tier_one";

/* Styled-Components */
const KYCWrap = styled.div`
  background-color: ${props =>
    props.theme.mode === "dark" ? "#041422" : "#ffffff"};
  margin: auto;
  width: 95%;
  border-radius: 7px;
  padding: 50px 0;
`;

class TierThree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <Navigation />
        <TierWrapper>
          <KYCWrap>Tier3</KYCWrap>
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

export default TierThree;
