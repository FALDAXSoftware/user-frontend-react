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
  TierListingInfoHead,
} from "../../STYLED-COMPONENTS/TIER/tierStyle";
import { Link } from "react-router-dom";
import { translate } from "react-i18next";
import { faThList } from "@fortawesome/free-solid-svg-icons";

class TierUpgradeInfo extends React.Component {
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
                <b>{this.t("document_requirements_text.message")}</b>
                {this.t("for_verification_text.message")}
              </TierInfoHead>
              <TierListingOutside>
                <li>
                  <TierListingInfoHead>
                    1. <b>{this.t("valid_govt_doc_text.message")}</b>
                  </TierListingInfoHead>
                  <div className="content">
                    <p>{this.t("valid_documents_include_text.message")}:</p>
                    <TierListingInside>
                      <li>
                        {this.t(
                          "identity_verification:id_type_passport.message"
                        )}
                      </li>
                      <li>{this.t("drivers_license_text.message")}</li>
                      <li>{this.t("national_identity_text.message")}</li>
                    </TierListingInside>
                    <p>
                      {this.t("other_govt_issued_text.message")}
                      <b>{this.t("may_text.message")}</b>
                      {this.t("govt_id_info_text.message")}
                    </p>
                    <p>
                      {this.t("firearm_licenses_text.message")}
                      <b>{this.t("not_text.message")}</b>
                      {this.t("accepted_text.message")}
                    </p>
                    <p>
                      {this.t("scan_meet_require_text.message")}{" "}
                      <Link
                        className="link_initial"
                        to="/tier-image-information"
                      >
                        {this.t("image_requirements_text.message")}.
                      </Link>
                    </p>
                  </div>
                </li>
                <li>
                  <TierListingInfoHead>
                    2. <b>{this.t("proof_document_text.message")}</b>
                  </TierListingInfoHead>
                  <div className="content">
                    <p>
                      {this.t("proof_document_require_text.message")}{" "}
                      <b>{this.t("dated_months_ago_text.message")}</b>
                      {this.t("from_date_submission_text.message")}
                    </p>
                    <p>{this.t("valid_doc_include_text.message")}:</p>
                    <TierListingInside>
                      <li>{this.t("bank_statement_text.message")}</li>
                      <li>{this.t("credit_card_statement_text.message")}</li>
                      <li>{this.t("utility_bill_text.message")}</li>
                      <li>{this.t("payroll_statement_text.message")}</li>
                      <li>{this.t("insurance_statement_text.message")}</li>
                      <li>{this.t("tax_document_text.message")}</li>
                      <li>{this.t("residence_certificate_text.message")}</li>
                    </TierListingInside>
                    <p>
                      {this.t("we_text.message")}
                      <b>{this.t("do_not_text.message")}</b>
                      {this.t("change_of_address_text.message")}
                    </p>
                    <p>{this.t("non_latin_characters_text.message")}</p>
                  </div>
                </li>
                <li>
                  <TierListingInfoHead>
                    3. {this.t("valid_text.message")}{" "}
                    <b>
                      {this.t("ssn_text.message")} (
                      {this.t("identity_verification:id_type_ssn.message")})
                    </b>{" "}
                    {this.t("or_text.message")}{" "}
                    <b>{this.t("itin_text.message")}</b>{" "}
                    {this.t("us_clients_only_text.message")}
                  </TierListingInfoHead>
                </li>
                <li>
                  <TierListingInfoHead>
                    4. <b>{this.t("tiers:idcp_label_text.message")}</b>{" "}
                    {this.t("certian_countries_only_text.message")}
                  </TierListingInfoHead>
                  <div className="content">
                    <p>
                      {this.t("required_to_provide_text.message")}{" "}
                      <Link to="/tier-idcp-confirmation">
                        {this.t("tiers:idcp_label_text.message")}
                      </Link>{" "}
                      {this.t("for_the_intermediate_verification_text.message")}
                      :
                    </p>
                    <TierListingInside>
                      <li>{this.t("resident_in_usa_text.message")}</li>
                      <li>{this.t("german_bank_account_text.message")}</li>
                      <li>{this.t("domestic_funding_text.message")}</li>
                    </TierListingInside>
                    <p>{this.t("may_be_other_situations_text.message")}</p>
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

export default translate([
  "static_info_pages",
  "identity_verification",
  "tiers",
])(TierUpgradeInfo);
