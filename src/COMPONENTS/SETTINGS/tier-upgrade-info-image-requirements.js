import React, { Component } from "react";
import FaldaxLoader from "SHARED-COMPONENTS/FaldaxLoader";
import Navigation from "COMPONENTS/NAVIGATIONS/loggednavigation";
import FooterHome from "COMPONENTS/LANDING/FOOTERS/footer_home";
import {
  TierInfoWrap,
  TierInfoInnerWrap,
  TierInfoHead,
  TierInfoContent,
  TierQuestion,
  TierAnswerTable,
  TierExamplesHead,
  TierExamplesSubHead,
  TierImageWrap
} from "../../STYLED-COMPONENTS/TIER/tierStyle";
import { Link } from "react-router-dom";

class TierUpgradeInfoImageRequirements extends React.Component {
  render() {
    return (
      <div>
        <Navigation />
        <TierInfoWrap>
          <TierInfoInnerWrap>
            <TierInfoContent>
              <TierInfoHead>
                <b>Image requirements</b> for ID documents
              </TierInfoHead>
              <p>
                For Intermediate and Pro level verification, we only accept{" "}
                <Link to="/tier-upgrade-information">
                  valid government-issued ID documents.
                </Link>
              </p>
              <TierQuestion>What is an acceptable ID scan/photo?</TierQuestion>
              <TierAnswerTable>
                <thead>
                  <tr>
                    <th>Image requirements</th>
                    <th>Reasons for rejection</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>✓ Full color image</td>
                    <td>✘ Image is black & white (or grayscale)</td>
                  </tr>
                  <tr>
                    <td>✓ All details on ID are readable</td>
                    <td>
                      <span>✘ Image has a watermark</span>
                      <span>✘ Image is blurred</span>
                      <span>✘ Image has any other obfuscation</span>
                    </td>
                  </tr>
                  <tr>
                    <td>✓ ID is well lit</td>
                    <td>
                      ✘ ID details are obscured by light glare or reflections
                      (be careful with flash!)
                    </td>
                  </tr>
                  <tr>
                    <td>✓ ID is in good shape</td>
                    <td>✘ ID is torn, badly damaged, or has holes</td>
                  </tr>
                  <tr>
                    <td>✓ ID is in upright position</td>
                    <td>✘ ID is rotated sideways or upside-down</td>
                  </tr>
                  <tr>
                    <td>✓ ID occupies most of the image</td>
                    <td>✘ Too much space around the ID</td>
                  </tr>
                  <tr>
                    <td>
                      ✓ Background is visible all around the ID by 1-2 cm
                      (1/2"-1")
                    </td>
                    <td>✘ ID edge is cropped (even if "just a little bit")</td>
                  </tr>
                </tbody>
              </TierAnswerTable>
              <p>
                In addition to the points above, US clients' IDs must meet the
                following requirements:
              </p>
              <TierAnswerTable>
                <thead>
                  <tr>
                    <th>US Image requirements</th>
                    <th>Reasons for rejection</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      ✓ Background is a contrasting color (e.g. dark for light
                      colored ID)
                    </td>
                    <td>✘ Background is the same or similar color as the ID</td>
                  </tr>
                </tbody>
              </TierAnswerTable>
              <TierQuestion className="padding-btm">
                How can I take a good scan/photo?
              </TierQuestion>
              <p>
                Click here for tips on how to get the scan/photo just right.
              </p>
              <p>
                You will also need to make sure that your photo/scan meets our
                technical parameters.{" "}
              </p>
              <TierExamplesHead>Good examples</TierExamplesHead>
              <TierExamplesSubHead className="green">
                An ideal scan/photo of an ID card
              </TierExamplesSubHead>
              <TierImageWrap>
                <img src="/images/ID-good-01.png" />
              </TierImageWrap>
              <TierExamplesSubHead className="green">
                An ideal scan/photo of a passport
              </TierExamplesSubHead>
              <TierImageWrap>
                <img src="/images/passport-good.png" />
              </TierImageWrap>
              <TierExamplesHead>Unacceptable examples</TierExamplesHead>
              <TierExamplesSubHead className="red">
                ID is too blurry
              </TierExamplesSubHead>
              <TierImageWrap>
                <img src="/images/ID-good-01.png" />
              </TierImageWrap>
              <TierExamplesSubHead className="red">
                ID edges are not visible
              </TierExamplesSubHead>
              <TierImageWrap>
                <img src="/images/passport-good.png" />
              </TierImageWrap>
              <TierExamplesSubHead className="red">
                Even a little bit of crop is <b>not OK...</b>
              </TierExamplesSubHead>
              <TierImageWrap>
                <img src="/images/passport-good.png" />
              </TierImageWrap>
              <TierExamplesSubHead className="red">
                ID is not in color
              </TierExamplesSubHead>
              <TierImageWrap>
                <img src="/images/passport-good.png" />
              </TierImageWrap>
              <TierExamplesSubHead className="red">
                Background is not contrasting
              </TierExamplesSubHead>
              <TierImageWrap>
                <img src="/images/passport-good.png" />
              </TierImageWrap>
            </TierInfoContent>
          </TierInfoInnerWrap>
        </TierInfoWrap>
        <FooterHome />
      </div>
    );
  }
}

export default TierUpgradeInfoImageRequirements;
