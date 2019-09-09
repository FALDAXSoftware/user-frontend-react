import React from "react";
import Navigation from "COMPONENTS/NAVIGATIONS/loggednavigation";
import FooterHome from "COMPONENTS/LANDING/FOOTERS/footer_home";
import { TierWrapper } from "./tier_one";
import { TierInnerWrap } from "../../../STYLED-COMPONENTS/TIER/tierStyle";

class TierThree extends React.Component {
  render() {
    return (
      <div>
        <Navigation />
        <TierWrapper>
          <TierInnerWrap>Tier Three</TierInnerWrap>
        </TierWrapper>
        <FooterHome />
      </div>
    );
  }
}

export default TierThree;
