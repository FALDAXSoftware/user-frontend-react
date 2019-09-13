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
import { Link } from "react-router-dom";

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
                <b>Document requirements</b> for verification
              </TierInfoHead>
              <TierListingOutside>
                <li>
                  <TierListingInfoHead>
                    1. <b>Valid Government Issued ID Document</b>
                  </TierListingInfoHead>
                  <div className="content">
                    <p>Valid documents include:</p>
                    <TierListingInside>
                      <li>Passport</li>
                      <li>Drivers license</li>
                      <li>National identity card (front + back)</li>
                    </TierListingInside>
                    <p>
                      Other valid government-issued ID <b>may</b> be accepted if
                      it has your full legal name, photo, date of birth, and
                      issue and expiry dates all on the front of your ID.
                    </p>
                    <p>
                      Firearm licenses are <b>not</b> accepted.
                    </p>
                    <p>
                      Please make sure that your ID photos/scan meet these{" "}
                      <Link to="/tier-image-information">
                        image requirements.
                      </Link>
                    </p>
                  </div>
                </li>
                <li>
                  <TierListingInfoHead>
                    2. <b>Proof of Residence Document</b>
                  </TierListingInfoHead>
                  <div className="content">
                    <p>
                      Proof of residence documents must contain your name,
                      address, and be <b>dated less than 3 months ago</b> from
                      the date of submission.
                    </p>
                    <p>Valid documents include, but are not limited to:</p>
                    <TierListingInside>
                      <li>Bank statement</li>
                      <li>Credit card statement</li>
                      <li>
                        Utility bill (water, electricity, gas, internet, phone)
                      </li>
                      <li>
                        Payroll statement -or- Official salary document from
                        employer
                      </li>
                      <li>Insurance statement</li>
                      <li>Tax document</li>
                      <li>Residence certificate</li>
                    </TierListingInside>
                    <p>
                      We <b>do NOT</b> accept USPS change-of-address letters.
                    </p>
                    <p>
                      For documents in languages that use non-Latin characters
                      (such as Russian, Chinese, Thai, Hebrew, etc.), a
                      notarized translation of your proof of residence document
                      will greatly speed up processing time.
                    </p>
                  </div>
                </li>
                <li>
                  <TierListingInfoHead>
                    3. Valid <b>SSN (Social Security Number)</b> or
                    <b>ITIN (Individual Taxpayer Identification Number)</b> (US
                    clients only)
                  </TierListingInfoHead>
                </li>
                <li>
                  <TierListingInfoHead>
                    4. <b>ID Confirmation Photo</b> (certain countries only)
                  </TierListingInfoHead>
                  <div className="content">
                    <p>
                      You will be required to provide an{" "}
                      <Link to="/tier-idcp-confirmation">
                        ID confirmation photo
                      </Link>{" "}
                      for the Intermediate verification level if you are:
                    </p>
                    <TierListingInside>
                      <li>Resident in USA or Germany</li>
                      <li>Funding with a German bank account</li>
                      <li>Using domestic USD funding</li>
                    </TierListingInside>
                    <p>
                      However, there may also be other situations where we would
                      require you to upload an ID confirmation photo.
                    </p>
                  </div>
                </li>
              </TierListingOutside>
              <TierListingInfoHead></TierListingInfoHead>
            </TierInfoContent>
          </TierInfoInnerWrap>
        </TierInfoWrap>
        <FooterHome />
      </div>
    );
  }
}

export default TierUpgradeInfo;
