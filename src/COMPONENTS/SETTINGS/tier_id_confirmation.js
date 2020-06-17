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
  TierPhotoBlockCol,
} from "../../STYLED-COMPONENTS/TIER/tierStyle";
import { Link } from "react-router-dom";
import { Icon } from "antd";
import { translate } from "react-i18next";

class TierIDConfirmation extends React.Component {
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
                <b>{this.t("id_confirmation_text.message")}</b>
                {this.t("photo_instruction_text.message")}
              </TierInfoHead>
              <p>
                {this.t("an_text.message")}
                <b>{this.t("tiers:idcp_label_text.message")}</b>
                {this.t("photo_of_you_text.message")}{" "}
                <b>{this.t("id_document_text.message")}</b>{" "}
                {this.t("and_handwritten_text.message")}{" "}
                <b>{this.t("note_text.message")}</b>{" "}
                {this.t("next_to_your_face_text.message")}.
              </p>
              <p>{this.t("checklist_for_idcp_text.message")}:</p>
              <TierListingOutside>
                <li>
                  <TierListingInfoHead>
                    1. <b>{this.t("general_4:idcp_text_id_require.message")}</b>
                  </TierListingInfoHead>
                  <div className="content">
                    <p>{this.t("id_holding_text.message")}</p>
                    <p>
                      {this.t("the_details_on_id_text.message")}
                      <b>{this.t("readable_text.message")}.</b>{" "}
                      {this.t("cannot_be_blurry_text.message")}
                    </p>
                  </div>
                </li>
                <li>
                  <TierListingInfoHead>
                    2.{" "}
                    <b>{this.t("general_4:idcp_text_note_require.message")}</b>
                  </TierListingInfoHead>
                  <div className="content">
                    <p>
                      {this.t("handwritten_note_must_say_text.message")}{" "}
                      <b>"{this.t("only_for_faldax_text.message")}"</b>
                      {this.t("and_include_text.message")}:
                    </p>
                    <TierListingInside>
                      <li>
                        {this.t("the_text.message")}{" "}
                        <b>{this.t("current_date_text.message")}</b>
                      </li>
                      <li>
                        {this.t("your_text.message")}{" "}
                        <b>{this.t("signature_text.message")}</b>
                      </li>
                    </TierListingInside>
                    <p>{this.t("pay_close_attention_text.message")}</p>
                    <p>{this.t("be_aware_text.message")}</p>
                    <TierAnswerTable>
                      <thead>
                        <tr>
                          <th>{this.t("dos_text.message")}</th>
                          <th>{this.t("donts_text.message")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>✓ {this.t("write_note_text.message")}</td>
                          <td>✘ {this.t("dont_type_text.message")}</td>
                        </tr>
                        <tr>
                          <td>
                            ✓ {this.t("write_note_exactly_text.message")}.*
                          </td>
                          <td>✘ {this.t("change_wording_text.message")}</td>
                        </tr>
                      </tbody>
                    </TierAnswerTable>
                    <p>*{this.t("we_accept_note_text.message")}</p>
                  </div>
                </li>
                <li>
                  <TierListingInfoHead>
                    3. <b>{this.t("photo_requirements_text.message")}</b>
                  </TierListingInfoHead>
                  <div className="content">
                    <p>{this.t("how_to_put_together_text.message")}:</p>
                    <TierPhotoBlock>
                      <TierPhotoBlockCol className="left-col">
                        <TierImageWrap className="photo-block">
                          <img src="/images/01-DO.png" />
                        </TierImageWrap>
                        <p>{this.t("high_quality_photo_text.message")}</p>
                      </TierPhotoBlockCol>
                      <TierPhotoBlockCol className="right-col">
                        <TierImageWrap className="photo-block">
                          <img src="/images/02-DO.png" />
                        </TierImageWrap>
                        <p>{this.t("not_cover_parts_text.message")}</p>
                      </TierPhotoBlockCol>
                    </TierPhotoBlock>
                    <TierPhotoBlock>
                      <TierPhotoBlockCol className="left-col">
                        <TierImageWrap className="photo-block">
                          <img src="/images/03-DON'T.png" />
                        </TierImageWrap>
                        <p>{this.t("id_in_your_hands_text.message")}</p>
                      </TierPhotoBlockCol>
                      <TierPhotoBlockCol className="right-col">
                        <TierImageWrap className="photo-block">
                          <img src="/images/05-DON'T.png" />
                        </TierImageWrap>
                        <p>{this.t("do_not_cover_text.message")}</p>
                      </TierPhotoBlockCol>
                    </TierPhotoBlock>
                    <TierAnswerTable>
                      <thead>
                        <tr>
                          <th>{this.t("dos_text.message")}</th>
                          <th>{this.t("donts_text.message")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>✓ {this.t("hold_the_id_text.message")}.</td>
                          <td>
                            <span>
                              ✘ {this.t("someone_else_hold_text.message")}.
                            </span>
                            <span>✘ {this.t("tap_id_text.message")}</span>
                          </td>
                        </tr>
                        <tr>
                          <td>✓ {this.t("clearly_visible_text.message")}</td>
                          <td>✘ {this.t("details_on_id_text.message")}</td>
                        </tr>
                        <tr>
                          <td>✓ {this.t("clearly_visible_text.message")}</td>
                          <td>✘ {this.t("details_on_id_text.message")}</td>
                        </tr>
                        <tr>
                          <td>✓ {this.t("clearly_visible_text.message")}</td>
                          <td>✘ {this.t("details_on_id_text.message")}</td>
                        </tr>
                      </tbody>
                    </TierAnswerTable>
                  </div>
                </li>
                <li>
                  <TierListingInfoHead className="instructions">
                    <b>{this.t("upload_instructions_text.message")}</b>
                  </TierListingInfoHead>
                  <div className="content">
                    <p>
                      {this.t("upload_instruct_text.message")}{" "}
                      <b>
                        <Link to="/tier3">
                          {this.t(
                            "edit_profile_titles:head_identity_verification.message"
                          )}{" "}
                          <Icon type="right" />{" "}
                          {this.t("tiers:tier_text.message")} 3.
                        </Link>
                      </b>{" "}
                    </p>
                    <p>
                      {this.t("idcp_on_that_page_text.message")},{" "}
                      <Link to="/open-ticket">
                        {this.t("contact_support_text.message")}.
                      </Link>
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

export default translate([
  "static_info_pages",
  "identity_verification",
  "tiers",
  "general_4",
  "edit_profile_titles",
])(TierIDConfirmation);
