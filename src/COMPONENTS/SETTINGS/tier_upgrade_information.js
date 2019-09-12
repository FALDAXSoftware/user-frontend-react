import React, { Component } from "react";
import FaldaxLoader from "SHARED-COMPONENTS/FaldaxLoader";
import Navigation from "COMPONENTS/NAVIGATIONS/loggednavigation";
import FooterHome from "COMPONENTS/LANDING/FOOTERS/footer_home";
import {
  TierInfoWrap,
  TierInfoInnerWrap,
  TierInfoHead,
  TierInfoContent,
  TierListingOutside,
  TierListingInside,
  TierListingInfoHead
} from "../../STYLED-COMPONENTS/TIER/tierStyle";

class TierUpgradeInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Navigation />
        <TierInfoWrap>
          <TierInfoInnerWrap>
            <TierInfoContent>
              <TierInfoHead>
                Document requirements for verification
              </TierInfoHead>
              <TierListingOutside>
                <li>
                  <TierListingInfoHead>
                    1. Valid Government Issued ID Document
                  </TierListingInfoHead>
                  <div className="content">
                    <p>Valid documents include:</p>
                    <TierListingInside>
                      <li>Passport</li>
                      <li>Drivers license</li>
                      <li>National identity card (front + back)</li>
                    </TierListingInside>
                    <p>
                      Other valid government-issued ID may be accepted if it has
                      your full legal name, photo, date of birth, and issue and
                      expiry dates all on the front of your ID.
                    </p>
                    <p>Firearm licenses are not accepted.</p>
                  </div>
                </li>
              </TierListingOutside>
            </TierInfoContent>
          </TierInfoInnerWrap>
        </TierInfoWrap>
        <FooterHome />
      </div>
    );
  }
}

export default TierUpgradeInfo;
