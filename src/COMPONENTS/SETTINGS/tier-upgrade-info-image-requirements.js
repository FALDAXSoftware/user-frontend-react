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
  TierImageWrap,
} from "../../STYLED-COMPONENTS/TIER/tierStyle";
import { Link } from "react-router-dom";
import { translate } from "react-i18next";

class TierUpgradeInfoImageRequirements extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.t = this.props.t;
  }
  render() {
    return (
      <div>
        <Navigation />
        <TierInfoWrap>
          <TierInfoInnerWrap>
            <TierInfoContent>
              <TierInfoHead>
                <b>{this.t("image_requirements_text.message")}</b>{" "}
                {this.t("for_id_documents_text.message")}
              </TierInfoHead>
              <p>
                {this.t("for_intermediate_text.message")}{" "}
                <Link to="/tier-upgrade-information">
                  {this.t("valid_id_documents_text.message")}
                </Link>
              </p>
              <TierQuestion>
                {this.t("acceptable_id_scan_text.message")}?
              </TierQuestion>
              <TierAnswerTable>
                <thead>
                  <tr>
                    <th>{this.t("image_requirements_text.message")}</th>
                    <th>{this.t("reason_for_rejection_text.message")}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>✓ {this.t("full_color_image_text.message")}</td>
                    <td>✘ {this.t("image_black_and_white_text.message")}</td>
                  </tr>
                  <tr>
                    <td>✓ {this.t("all_details_on_id_text.message")}</td>
                    <td>
                      <span>✘ {this.t("image_watermark_text.message")}</span>
                      <span>✘ {this.t("image_blurred_text.message")}</span>
                      <span>✘ {this.t("image_obfuscation_text.message")}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>✓ {this.t("id_is_well_lit_text.message")}</td>
                    <td>✘ {this.t("id_glare_reflections_text.message")}</td>
                  </tr>
                  <tr>
                    <td>✓ {this.t("id_in_good_shape_text.message")}</td>
                    <td>✘ {this.t("id_torn_holes_text.message")}</td>
                  </tr>
                  <tr>
                    <td>✓ {this.t("id_upright_text.message")}</td>
                    <td>✘ {this.t("id_rotated_text.message")}</td>
                  </tr>
                  <tr>
                    <td>✓ {this.t("id_occupies_most_image_text.message")}</td>
                    <td>✘ {this.t("too_much_space_text.message")}</td>
                  </tr>
                  <tr>
                    <td>✓ {this.t("background_visible_text.message")}</td>
                    <td>✘ {this.t("id_edge_cropped_text.message")}</td>
                  </tr>
                </tbody>
              </TierAnswerTable>
              <p>{this.t("id_must_meet_requirement_text.message")}:</p>
              <TierAnswerTable>
                <thead>
                  <tr>
                    <th>{this.t("us_image_requirement_text.message")}</th>
                    <th>{this.t("reason_for_rejection_text.message")}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>✓ {this.t("background_color_text.message")}</td>
                    <td>✘ {this.t("similar_color_id_text.message")}</td>
                  </tr>
                </tbody>
              </TierAnswerTable>
              <TierQuestion className="padding-btm">
                {this.t("good_scan_photo_text.message")}?
              </TierQuestion>
              <p>{this.t("click_here_for_tips_text.message")}</p>
              <p>{this.t("technical_parameters_text.message")}</p>
              <TierExamplesHead>
                {this.t("good_examples_text.message")}
              </TierExamplesHead>
              <TierExamplesSubHead className="green">
                {this.t("ideal_photo_scan_text.message")}
              </TierExamplesSubHead>
              <TierImageWrap>
                <img src="/images/01.png" />
              </TierImageWrap>
              <TierExamplesSubHead className="green">
                {this.t("ideal_scan_passport_text.message")}
              </TierExamplesSubHead>
              <TierImageWrap>
                <img src="/images/07-passport.png" />
              </TierImageWrap>
              <TierExamplesHead>
                {this.t("unacceptable_examples_text.message")}
              </TierExamplesHead>
              <TierExamplesSubHead className="red">
                {this.t("id_too_blurry_text.message")}
              </TierExamplesSubHead>
              <TierImageWrap>
                <img src="/images/02 -blurry.png" />
              </TierImageWrap>
              <TierExamplesSubHead className="red">
                {this.t("id_edges_not_visible_text.message")}
              </TierExamplesSubHead>
              <TierImageWrap>
                <img src="/images/03-edges .png" />
              </TierImageWrap>
              <TierExamplesSubHead className="red">
                {this.t("little_bit_crop_text.message")}
                <b>{this.t("not_ok_text.message")}</b>
              </TierExamplesSubHead>
              <TierImageWrap>
                <img src="/images/04-little bit of crop.png" />
              </TierImageWrap>
              <TierExamplesSubHead className="red">
                {this.t("id_not_in_color_text.message")}
              </TierExamplesSubHead>
              <TierImageWrap>
                <img src="/images/05-BLACK-WHITE.png" />
              </TierImageWrap>
              <TierExamplesSubHead className="red">
                {this.t("backgrount_not_contrast_text.message")}
              </TierExamplesSubHead>
              <TierImageWrap>
                <img src="/images/06-Background is not contrasting.png" />
              </TierImageWrap>
            </TierInfoContent>
          </TierInfoInnerWrap>
        </TierInfoWrap>
        <FooterHome />
      </div>
    );
  }
}

export default translate([
  "static_info_pages",
  "identity_verification",
  "tiers",
])(TierUpgradeInfoImageRequirements);
