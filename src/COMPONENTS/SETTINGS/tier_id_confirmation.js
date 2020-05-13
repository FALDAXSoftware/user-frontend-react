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
  TierListingInfoHead,
  TierListingInside,
  TierAnswerTable,
  TierImageWrap,
  TierPhotoBlock,
  TierPhotoBlockCol
} from "../../STYLED-COMPONENTS/TIER/tierStyle";
import { Link } from "react-router-dom";

class TierIDConfirmation extends React.Component {
  render() {
    return (
      <div>
        <Navigation />
        <TierInfoWrap>
          <TierInfoInnerWrap>
            <TierInfoContent>
              <TierInfoHead>
                <b>ID confirmation</b> photo (IDCP) instructions
              </TierInfoHead>
              <p>
                An <b>ID confirmation photo</b> (IDCP) is a photo of you, the
                account holder, holding your <b>ID document</b> and a
                handwritten <b>note</b> next to your face.
              </p>
              <p>
                Below is a checklist for producing a proper IDCP that can be
                accepted by our verification team:
              </p>
              <TierListingOutside>
                <li>
                  <TierListingInfoHead>
                    1. <b>ID requirements</b>
                  </TierListingInfoHead>
                  <div className="content">
                    <p>
                      The ID you're holding must be the same ID used for KYC
                      verification.
                    </p>
                    <p>
                      The details on the ID in the photo must be{" "}
                      <b>readable.</b> They cannot be blurry or out of focus.
                    </p>
                  </div>
                </li>
                <li>
                  <TierListingInfoHead>
                    2. <b>Note requirements</b>
                  </TierListingInfoHead>
                  <div className="content">
                    <p>
                      The handwritten note must say{" "}
                      <b>
                        "only for trading digital currency on www.faldax.com"
                      </b>{" "}
                      and include:
                    </p>
                    <TierListingInside>
                      <li>
                        the <b>current date</b>
                      </li>
                      <li>
                        your <b>signature</b>
                      </li>
                    </TierListingInside>
                    <p>
                      Pay close attention when writing the handwritten note! If
                      even one word is different in the note, the IDCP may not
                      be accepted.
                    </p>
                    <p>
                      Be aware that in certain situations we may request that
                      you write something else on the handwritten note. Follow
                      the instructions provided to you in your ticket closely.
                    </p>
                    <TierAnswerTable>
                      <thead>
                        <tr>
                          <th>Dos</th>
                          <th>Don'ts</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>✓ Write the note with your hand.</td>
                          <td>✘ Don't type the note.</td>
                        </tr>
                        <tr>
                          <td>✓ Write the note exactly as instructed.*</td>
                          <td>
                            ✘ Don't change the wording or meaning of the note.
                          </td>
                        </tr>
                      </tbody>
                    </TierAnswerTable>
                    <p>
                      *We accept translations of the note in other languages as
                      long as it keeps the same meaning.
                    </p>
                  </div>
                </li>
                <li>
                  <TierListingInfoHead>
                    3. <b>Photo requirements</b>
                  </TierListingInfoHead>
                  <div className="content">
                    <p>How to put the ID and note together:</p>
                    <TierPhotoBlock>
                      <TierPhotoBlockCol className="left-col">
                        <TierImageWrap className="photo-block">
                          <img src="/images/01-DO.png" />
                        </TierImageWrap>
                        <p>
                          Use a high-quality photo and make sure the text and
                          numbers on the ID are readable. Your whole face and
                          arms should also be visible.
                        </p>
                      </TierPhotoBlockCol>
                      <TierPhotoBlockCol className="right-col">
                        <TierImageWrap className="photo-block">
                          <img src="/images/02-DO.png" />
                        </TierImageWrap>
                        <p>
                          Do not cover parts of the ID, message, or your face.
                        </p>
                      </TierPhotoBlockCol>
                    </TierPhotoBlock>
                    <TierPhotoBlock>
                      <TierPhotoBlockCol className="left-col">
                        <TierImageWrap className="photo-block">
                          <img src="/images/03-DON'T.png" />
                        </TierImageWrap>
                        <p>
                          You must be holding the ID in your hands; your hands
                          and arms should be visible in the image. Do not wear
                          sunglasses, hats, or anything that covers your facial
                          features.
                        </p>
                      </TierPhotoBlockCol>
                      <TierPhotoBlockCol className="right-col">
                        <TierImageWrap className="photo-block">
                          <img src="/images/05-DON'T.png" />
                        </TierImageWrap>
                        <p>
                          Do not cover parts of the ID, message, or your face.
                        </p>
                      </TierPhotoBlockCol>
                    </TierPhotoBlock>
                    <TierAnswerTable>
                      <thead>
                        <tr>
                          <th>Dos</th>
                          <th>Don'ts</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>✓ Hold the ID and note in your hand(s).</td>
                          <td>
                            <span>
                              ✘ Don't have someone else hold the note.
                            </span>
                            <span>✘ Don't tape ID to the note.</span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            ✓ The ID and the note all have to be clearly
                            visible.
                          </td>
                          <td>
                            ✘ Don't cover any details on the ID or note with
                            your fingers.
                          </td>
                        </tr>
                        <tr>
                          <td>
                            ✓ The ID and the note all have to be clearly
                            visible.
                          </td>
                          <td>
                            ✘ Don't cover any details on the ID or note with
                            your fingers.
                          </td>
                        </tr>
                        <tr>
                          <td>
                            ✓ The ID and the note all have to be clearly
                            visible.
                          </td>
                          <td>
                            ✘ Don't cover any details on the ID or note with
                            your fingers.
                          </td>
                        </tr>
                      </tbody>
                    </TierAnswerTable>
                  </div>
                </li>
                <li>
                  <TierListingInfoHead className="instructions">
                    <b>Upload instructions</b>
                  </TierListingInfoHead>
                  <div className="content">
                    <p>
                      You can upload your IDCP in your FALDAX account on the{" "}
                      <b>
                        <Link to="/tier3">Identity Verification {'>'} Tier 3.</Link>
                      </b>{" "}
                    </p>
                    <p>
                      If you do not see the section to upload the IDCP on that
                      page, <Link to="/open-ticket">contact support.</Link>
                    </p>
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

export default TierIDConfirmation;
