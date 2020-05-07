/* In-built Packages */
import React from "react";
import "antd/dist/antd.css";
import styled from "styled-components";

/*Import Components*/
import Navigation from "COMPONENTS/NAVIGATIONS/loggednavigation";
import FooterHome from "COMPONENTS/LANDING/FOOTERS/footer_home";
import { TierWrapper, KYCHead } from "./tier_one";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { globalVariables } from "Globals.js";
import SimpleReactvalidator from "simple-react-validator";
import { DoneWrap, KycSucc } from "./tier_one";
import {
  TierWrap,
  TierRow,
  TierLabel,
  TierUpload,
  TierDocBox,
  TierDocStatus,
  TierDropWrap,
  TierDropzoneStyle,
  TierButtonRow,
  RejectNote,
} from "../../../STYLED-COMPONENTS/TIER/tierStyle";
import { SupportText } from "../../LANDINGCATEGORIES/apply_job";
import { Icon, Progress, notification } from "antd";
import {
  FileSelectText,
  IconS,
} from "../../../STYLED-COMPONENTS/LANDING_CATEGORIES/contactStyle";
import { APIUtility } from "../../../httpHelper";
import FaldaxLoader from "../../../SHARED-COMPONENTS/FaldaxLoader";
import UploadCounter from "../../../SHARED-COMPONENTS/UploadCounter";
import RejectReason from "../../../SHARED-COMPONENTS/RejectReason";

let {
  API_URL,
  aml_questionnaire,
  comfort_letter,
  board_resolution,
  corporate_filing_info,
  beneficial_ownership_form,
  articles_of_incorporation,
  bylaws_form,
  ownership_and_control_structure,
  director_list_form,
} = globalVariables;
/* Styled-Components */
const KYCWrap = styled.div`
  background-color: ${(props) =>
    props.theme.mode === "dark" ? "#041422" : "#ffffff"};
  margin: auto;
  width: 95%;
  border-radius: 7px;
  padding: 50px 0;
`;

class TierFour extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tierData: "",
      loader: false,
      aml_flag: null,
      aml_questionnaire: [],
      reUpload1: false,
      uploadBtnFlag: false,
      comfort_letter: [],
      comfort_flag: null,
      reUpload2: false,
      board_resolution: [],
      board_flag: null,
      bank_flag: null,
      corporate_flag: null,
      ownership_flag: null,
      articles_flag: null,
      bylaws_flag: null,
      ownership_control_structure_flag: null,
      director_list_flag: null,
      active_business_proof_flag: null,
      document_availability_policy_flag: null,
      cookies_policy_flag: null,
      privacy_policy_flag: null,
      aml_policy_flag: null,
      terms_of_service_flag: null,
      reUpload3: false,
      reUpload4: false,
      reUpload5: false,
      reUpload6: false,
      reUpload7: false,
      reUpload8: false,
      reUpload9: false,
      reUpload10: false,
      reUpload11: false,
      reUpload12: false,
      reUpload13: false,
      reUpload14: false,
      reUpload15: false,
      reUpload16: false,
      documents: {},
      upload_flag: 0,
      UploadCounter: false,
      amlQuestionnaireStatus: "",
      comfortLetterStatus: "",
      boardResolutionStatus: "",
      bankStatementStatus: "",
      corporateInfoStatus: "",
      ownershipFormStatus: "",
      articlesIncorporationStatus: "",
      ownershipControlStructureStatus: "",
      byLawsStatus: "",
      directorListStatus: "",
      activeBusinessProofStatus: "",
      documentAvailabilityPolicyStatus: "",
      cookiesPolicyStatus: "",
      privacyPolicyStatus: "",
      amlPolicyStatus: "",
      termsOfServiceStatus: "",
      amlQuestionnaireNote: "",
      comfortLetterNote: "",
      boardResolutionNote: "",
      bankStatementNote: "",
      corporateInfoNote: "",
      ownershipFormNote: "",
      articlesIncorporationNote: "",
      ownershipControlStructureNote: "",
      byLawsNote: "",
      directorListNote: "",
      activeBusinessProofNote: "",
      documentAvailabilityPolicyNote: "",
      cookiesPolicyNote: "",
      privacyPolicyNote: "",
      amlPolicyNote: "",
      termsOfServiceNote: "",
      reUploadFlag: false,
      total_file_size: "",
      reasonPopup: false,
      rejectText: "",
      forceRejectStatus: false,
      forceAcceptedStatus: false,
      forceRejectNote: "",
    };
    this.validator1 = new SimpleReactvalidator({});
    this.populateData = this.populateData.bind(this);
  }
  // componentWillMount() {
  //   if (this.props.profileDetails) {
  //     if (this.props.profileDetails.account_tier == 3) {
  //       this.props.history.push("/tier4");
  //     } else {
  //       this.props.history.push("/");
  //     }
  //   }
  // }
  componentWillMount() {
    // if (
    //   this.props.profileDetails.account_tier == 0 ||
    //   this.props.profileDetails.account_tier == 1 ||
    //   this.props.profileDetails.account_tier == 2 ||
    //   this.props.profileDetails.account_tier == 4
    // ) {
    //   this.props.history.push("/");
    // }
    // if (this.props.profileDetails.account_tier !== 3) {
    //   this.props.history.push("/");
    // }
    if (
      this.props.location.state === undefined ||
      this.props.location.state.flag === "" ||
      this.props.location.state.flag === null
    ) {
      this.props.history.push("/");
    }
  }
  async componentDidMount() {
    try {
      await this.getTierDetails();
    } catch (error) {
      console.log(error);
    } finally {
    }
    this.populateData();
  }
  async getTierDetails() {
    try {
      this.setState({ loader: true });
      let values = {
        tier_step: "4",
      };
      let result = await APIUtility.getTierDetails(
        this.props.isLoggedIn,
        values
      );
      if (result.status == 200) {
        this.setState({
          tierData: result.data,
        });
      } else if (result.status == 202) {
        this.setState({
          forceRejectStatus: true,
          forceRejectNote: result.data.public_note
            ? result.data.public_note
            : "",
        });
      } else if (result.status == 203) {
        this.setState({
          forceAcceptedStatus: true,
        });
      } else {
        this.openNotificationWithIcon("error", "Error", result.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ loader: false });
    }
  }
  populateData() {
    if (this.state.tierData.length < 16 && this.state.tierData.length > 0) {
      this.setState({
        reUploadFlag: true,
        reUpload1: true,
        reUpload2: true,
        reUpload3: true,
        reUpload4: true,
        reUpload5: true,
        reUpload6: true,
        reUpload7: true,
        reUpload8: true,
        reUpload9: true,
        reUpload10: true,
        reUpload11: true,
        reUpload12: true,
        reUpload13: true,
        reUpload14: true,
        reUpload15: true,
        reUpload16: true,
        uploadBtnFlag: true,
      });
      let tierData = this.state.tierData;
      tierData.map((tierDoc, index) => {
        // console.log("tierdoc^^^", tierDoc.type);
        // let object = {};
        // object[`reUpload${tierDoc.type}`] = false;
        // this.setState({
        //   ...object,
        // });
        if (tierDoc.request_id) {
          this.setState({
            requestId: tierDoc.request_id,
          });
        }
      });
    }
    if (this.state.tierData.length > 0) {
      this.setState({
        reUploadFlag: true,
      });
      let tierData = this.state.tierData;
      tierData.map((tierDoc, index) => {
        if (tierDoc) {
          if (tierDoc.is_approved === false) {
            this.setState({
              uploadBtnFlag: true,
            });
          }
          if (tierDoc.request_id) {
            this.setState({
              requestId: tierDoc.request_id,
            });
          }
          switch (parseInt(tierDoc.type)) {
            case 1:
              let aml_questionnaire_status = tierDoc.is_approved;
              let reupload1;
              if (tierDoc.is_approved === null) {
                reupload1 = false;
              } else if (tierDoc.is_approved === true) {
                reupload1 = false;
              } else {
                reupload1 = true;
              }
              this.setState({
                reUpload1: reupload1,
                amlQuestionnaireStatus: aml_questionnaire_status,
                amlQuestionnaireNote: tierDoc.public_note,
              });
              return;
            case 2:
              let comfort_letter_status = tierDoc.is_approved;
              let reupload2;
              if (tierDoc.is_approved === null) {
                reupload2 = false;
              } else if (tierDoc.is_approved === true) {
                reupload2 = false;
              } else {
                reupload2 = true;
              }
              this.setState({
                reUpload2: reupload2,
                comfortLetterStatus: comfort_letter_status,
                comfortLetterNote: tierDoc.public_note,
              });
              return;
            case 3:
              let board_resolution_status = tierDoc.is_approved;
              let reupload3;
              if (tierDoc.is_approved === null) {
                reupload3 = false;
              } else if (tierDoc.is_approved === true) {
                reupload3 = false;
              } else {
                reupload3 = true;
              }
              this.setState({
                reUpload3: reupload3,
                boardResolutionStatus: board_resolution_status,
                boardResolutionNote: tierDoc.public_note,
              });
              return;
            case 4:
              let bank_statements_status = tierDoc.is_approved;
              let reupload4;
              if (tierDoc.is_approved === null) {
                reupload4 = false;
              } else if (tierDoc.is_approved === true) {
                reupload4 = false;
              } else {
                reupload4 = true;
              }
              this.setState({
                reUpload4: reupload4,
                bankStatementStatus: bank_statements_status,
                bankStatementNote: tierDoc.public_note,
              });
              return;
            case 5:
              let corporate_info = tierDoc.is_approved;
              let reupload5;
              if (tierDoc.is_approved === null) {
                reupload5 = false;
              } else if (tierDoc.is_approved === true) {
                reupload5 = false;
              } else {
                reupload5 = true;
              }
              this.setState({
                reUpload5: reupload5,
                corporateInfoStatus: corporate_info,
                corporateInfoNote: tierDoc.public_note,
              });
              return;
            case 6:
              let ownership_form = tierDoc.is_approved;
              let reupload6;
              if (tierDoc.is_approved === null) {
                reupload6 = false;
              } else if (tierDoc.is_approved === true) {
                reupload6 = false;
              } else {
                reupload6 = true;
              }
              this.setState({
                reUpload6: reupload6,
                ownershipFormStatus: ownership_form,
                ownershipFormNote: tierDoc.public_note,
              });
              return;
            case 7:
              let articles_of_incorporation = tierDoc.is_approved;
              let reupload7;
              if (tierDoc.is_approved === null) {
                reupload7 = false;
              } else if (tierDoc.is_approved === true) {
                reupload7 = false;
              } else {
                reupload7 = true;
              }
              this.setState({
                reUpload7: reupload7,
                articlesIncorporationStatus: articles_of_incorporation,
                articlesIncorporationNote: tierDoc.public_note,
              });
              return;
            case 8:
              let bylaws = tierDoc.is_approved;
              let reupload8;
              if (tierDoc.is_approved === null) {
                reupload8 = false;
              } else if (tierDoc.is_approved === true) {
                reupload8 = false;
              } else {
                reupload8 = true;
              }
              this.setState({
                reUpload8: reupload8,
                byLawsStatus: bylaws,
                byLawsNote: tierDoc.public_note,
              });
              return;
            case 9:
              let ownership_control_structure = tierDoc.is_approved;
              let reupload9;
              if (tierDoc.is_approved === null) {
                reupload9 = false;
              } else if (tierDoc.is_approved === true) {
                reupload9 = false;
              } else {
                reupload9 = true;
              }
              this.setState({
                reUpload9: reupload9,
                ownershipControlStructureStatus: ownership_control_structure,
                ownershipControlStructureNote: tierDoc.public_note,
              });
              return;
            case 10:
              let director_list = tierDoc.is_approved;
              let reupload10;
              if (tierDoc.is_approved === null) {
                reupload10 = false;
              } else if (tierDoc.is_approved === true) {
                reupload10 = false;
              } else {
                reupload10 = true;
              }
              this.setState({
                reUpload10: reupload10,
                directorListStatus: director_list,
                directorListNote: tierDoc.public_note,
              });
              return;
            case 11:
              let active_business_proof = tierDoc.is_approved;
              let reupload11;
              if (tierDoc.is_approved === null) {
                reupload11 = false;
              } else if (tierDoc.is_approved === true) {
                reupload11 = false;
              } else {
                reupload11 = true;
              }
              this.setState({
                reUpload11: reupload11,
                activeBusinessProofStatus: active_business_proof,
                activeBusinessProofNote: tierDoc.public_note,
              });
              return;
            case 12:
              let document_availability_policy = tierDoc.is_approved;
              let reupload12;
              if (tierDoc.is_approved === null) {
                reupload12 = false;
              } else if (tierDoc.is_approved === true) {
                reupload12 = false;
              } else {
                reupload12 = true;
              }
              this.setState({
                reUpload12: reupload12,
                documentAvailabilityPolicyStatus: document_availability_policy,
                documentAvailabilityPolicyNote: tierDoc.public_note,
              });
              return;
            case 13:
              let cookies_policy = tierDoc.is_approved;
              let reupload13;
              if (tierDoc.is_approved === null) {
                reupload13 = false;
              } else if (tierDoc.is_approved === true) {
                reupload13 = false;
              } else {
                reupload13 = true;
              }
              this.setState({
                reUpload13: reupload13,
                cookiesPolicyStatus: cookies_policy,
                cookiesPolicyNote: tierDoc.public_note,
              });
              return;
            case 14:
              let privacy_policy = tierDoc.is_approved;
              let reupload14;
              if (tierDoc.is_approved === null) {
                reupload14 = false;
              } else if (tierDoc.is_approved === true) {
                reupload14 = false;
              } else {
                reupload14 = true;
              }
              this.setState({
                reUpload14: reupload14,
                privacyPolicyStatus: privacy_policy,
                privacyPolicyNote: tierDoc.public_note,
              });
              return;
            case 15:
              let aml_policy = tierDoc.is_approved;
              let reupload15;
              if (tierDoc.is_approved === null) {
                reupload15 = false;
              } else if (tierDoc.is_approved === true) {
                reupload15 = false;
              } else {
                reupload15 = true;
              }
              this.setState({
                reUpload15: reupload15,
                amlPolicyStatus: aml_policy,
                amlPolicyNote: tierDoc.public_note,
              });
              return;
            case 16:
              let terms_of_service = tierDoc.is_approved;
              let reupload16;
              if (tierDoc.is_approved === null) {
                reupload16 = false;
              } else if (tierDoc.is_approved === true) {
                reupload16 = false;
              } else {
                reupload16 = true;
              }
              this.setState({
                reUpload16: reupload16,
                termsOfServiceStatus: terms_of_service,
                termsOfServiceNote: tierDoc.public_note,
              });
              return;
            default:
              return console.log("No case");
          }
        }
      });
    } else {
      this.setState({
        reUploadFlag: false,
        reUpload1: true,
        reUpload2: true,
        reUpload3: true,
        reUpload4: true,
        reUpload5: true,
        reUpload6: true,
        reUpload7: true,
        reUpload8: true,
        reUpload9: true,
        reUpload10: true,
        reUpload11: true,
        reUpload12: true,
        reUpload13: true,
        reUpload14: true,
        reUpload15: true,
        reUpload16: true,
        uploadBtnFlag: true,
      });
    }
  }
  onDrop(type, files) {
    let flag = false,
      flagLimit = false;
    let temp = this.state.documents;
    switch (type) {
      case "aml_questionnaire":
        if (files.length > 0) {
          flag = true;
          if (files[0].size <= 3000000) {
            flagLimit = true;
          }
        }
        temp["aml_questionnaire"] = { type: 1, file: files[0] };
        this.setState(
          {
            aml_flag: flag,
            resumeLimit: flagLimit,
            documents: temp,
          },
          () => {
            console.log(
              "document",
              this.state.documents.aml_questionnaire.file.name,
              this.state.documents.aml_questionnaire.type
            );
          }
        );
        break;
      case "comfort_letter":
        if (files.length > 0) {
          flag = true;
          if (files[0].size <= 3000000) {
            flagLimit = true;
          }
        }
        temp["comfort_letter"] = { type: 2, file: files[0] };
        this.setState({
          comfort_flag: flag,
          resumeLimit: flagLimit,
          documents: temp,
        });
        break;
      case "board_resolution":
        if (files.length > 0) {
          flag = true;
          if (files[0].size <= 3000000) {
            flagLimit = true;
          }
        }
        temp["board_resolution"] = { type: 3, file: files[0] };
        this.setState({
          board_flag: flag,
          resumeLimit: flagLimit,
          documents: temp,
        });
        break;
      case "bank_statements":
        if (files.length > 0) {
          flag = true;
          if (files[0].size <= 3000000) {
            flagLimit = true;
          }
        }
        temp["bank_statements"] = { type: 4, file: files[0] };
        this.setState({
          bank_flag: flag,
          resumeLimit: flagLimit,
          documents: temp,
        });
        break;
      case "corporate_info":
        if (files.length > 0) {
          flag = true;
          if (files[0].size <= 3000000) {
            flagLimit = true;
          }
        }
        temp["corporate_info"] = { type: 5, file: files[0] };
        this.setState({
          corporate_flag: flag,
          resumeLimit: flagLimit,
          documents: temp,
        });
        break;
      case "ownership_form":
        if (files.length > 0) {
          flag = true;
          if (files[0].size <= 3000000) {
            flagLimit = true;
          }
        }
        temp["ownership_form"] = { type: 6, file: files[0] };
        this.setState({
          ownership_flag: flag,
          resumeLimit: flagLimit,
          documents: temp,
        });
        break;
      case "articles_of_incorporation":
        if (files.length > 0) {
          flag = true;
          if (files[0].size <= 3000000) {
            flagLimit = true;
          }
        }
        temp["articles_of_incorporation"] = { type: 7, file: files[0] };
        this.setState({
          articles_flag: flag,
          resumeLimit: flagLimit,
          documents: temp,
        });
        break;
      case "bylaws":
        if (files.length > 0) {
          flag = true;
          if (files[0].size <= 3000000) {
            flagLimit = true;
          }
        }
        temp["bylaws"] = { type: 8, file: files[0] };
        this.setState({
          bylaws_flag: flag,
          resumeLimit: flagLimit,
          documents: temp,
        });
        break;
      case "ownership_control_structure":
        if (files.length > 0) {
          flag = true;
          if (files[0].size <= 3000000) {
            flagLimit = true;
          }
        }
        temp["ownership_control_structure"] = { type: 9, file: files[0] };
        this.setState({
          ownership_control_structure_flag: flag,
          resumeLimit: flagLimit,
          documents: temp,
        });
        break;
      case "director_list":
        if (files.length > 0) {
          flag = true;
          if (files[0].size <= 3000000) {
            flagLimit = true;
          }
        }
        temp["director_list"] = { type: 10, file: files[0] };
        this.setState({
          director_list_flag: flag,
          resumeLimit: flagLimit,
          documents: temp,
        });
        break;
      case "active_business_proof":
        if (files.length > 0) {
          flag = true;
          if (files[0].size <= 3000000) {
            flagLimit = true;
          }
        }
        temp["active_business_proof"] = { type: 11, file: files[0] };
        this.setState({
          active_business_proof_flag: flag,
          resumeLimit: flagLimit,
          documents: temp,
        });
        break;
      case "document_availability_policy":
        if (files.length > 0) {
          flag = true;
          if (files[0].size <= 3000000) {
            flagLimit = true;
          }
        }
        temp["document_availability_policy"] = { type: 12, file: files[0] };
        this.setState({
          document_availability_policy_flag: flag,
          resumeLimit: flagLimit,
          documents: temp,
        });
        break;
      case "cookies_policy":
        if (files.length > 0) {
          flag = true;
          if (files[0].size <= 3000000) {
            flagLimit = true;
          }
        }
        temp["cookies_policy"] = { type: 13, file: files[0] };
        this.setState({
          cookies_policy_flag: flag,
          resumeLimit: flagLimit,
          documents: temp,
        });
        break;
      case "privacy_policy":
        if (files.length > 0) {
          flag = true;
          if (files[0].size <= 3000000) {
            flagLimit = true;
          }
        }
        temp["privacy_policy"] = { type: 14, file: files[0] };
        this.setState({
          privacy_policy_flag: flag,
          resumeLimit: flagLimit,
          documents: temp,
        });
        break;
      case "aml_policy":
        if (files.length > 0) {
          flag = true;
          if (files[0].size <= 3000000) {
            flagLimit = true;
          }
        }
        temp["aml_policy"] = { type: 15, file: files[0] };
        this.setState({
          aml_policy_flag: flag,
          resumeLimit: flagLimit,
          documents: temp,
        });
        break;
      case "terms_of_service":
        if (files.length > 0) {
          flag = true;
          if (files[0].size <= 3000000) {
            flagLimit = true;
          }
        }
        temp["terms_of_service"] = { type: 16, file: files[0] };
        this.setState({
          terms_of_service_flag: flag,
          resumeLimit: flagLimit,
          documents: temp,
        });
        break;
      default:
        break;
    }
  }
  onCancel() {
    this.setState({ files: [] });
  }
  uploadDocument(type, doc) {
    let values = new FormData();
    values.append("files", doc);
    return fetch(API_URL + `/users/upload-tier4-document?type=${type}`, {
      method: "post",
      headers: {
        "Accept-Language": localStorage["i18nextLng"],
        Authorization: "Bearer " + this.props.isLoggedIn,
      },
      body: values,
    });
  }
  async handleSubmit() {
    if (this.validator1.allValid()) {
      this.setState({
        UploadCounter: true,
      });
      let count = this.state.documents;
      let index = 1;
      let upload_flag1 = 0;
      if (this.state.reUploadFlag) {
        Object.size = function (obj) {
          var size = 0,
            key;
          for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
          }
          return size;
        };
        var size = Object.size(count);
        console.log("^^^size", size);
        this.setState({
          total_file_size: size,
        });
        try {
          for (const property in count) {
            let result = await (
              await this.uploadDocument(
                count[property].type,
                count[property].file
              )
            ).json();
            index++;
            upload_flag1++;
            this.setState({
              upload_flag: upload_flag1,
            });
            if (result) {
              console.log("Result^^^^^^", result, size, index);
              if (index == size + 1) {
                if (result.status == 200) {
                  this.openNotificationWithIcon(
                    "success",
                    "Success",
                    result.data
                  );
                } else if (result.status == 500) {
                  this.openNotificationWithIcon("error", "Error", result.error);
                } else {
                  this.openNotificationWithIcon("error", "Error", result.data);
                }
              }
            }
            if (index == size + 1) {
              this.setState(
                {
                  UploadCounter: false,
                },
                () => {
                  this.props.history.push("/editProfile");
                }
              );
            }
          }
        } catch (error) {
          this.openNotificationWithIcon(
            "error",
            "Error",
            "Please reupload you documents."
          );
          this.setState(
            {
              UploadCounter: false,
            },
            () => {
              this.props.history.push("/tier4");
            }
          );
        }
      } else {
        Object.size = function (obj) {
          var size = 0,
            key;
          for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
          }
          return size;
        };
        var size = Object.size(count);
        console.log("^^^size", size);
        this.setState({
          total_file_size: size,
        });
        try {
          for (const property in count) {
            console.log(`${property}: ${count[property].file}`);
            console.log(`${property}: ${count[property].type}`);
            let result = await (
              await this.uploadDocument(index, count[property].file)
            ).json();
            if (result) {
              console.log("Result^^^^^^", result, size, index);
              if (index == size) {
                if (result.status == 200) {
                  this.openNotificationWithIcon(
                    "success",
                    "Success",
                    result.data
                  );
                } else if (result.status == 500) {
                  this.openNotificationWithIcon("error", "Error", result.error);
                } else {
                  this.openNotificationWithIcon("error", "Error", result.data);
                }
              }
            }
            if (index == size) {
              this.setState(
                {
                  UploadCounter: false,
                },
                () => {
                  this.props.history.push("/editProfile");
                }
              );
            }
            index++;
            upload_flag1++;
            this.setState({
              upload_flag: upload_flag1,
            });
          }
        } catch (error) {
          this.openNotificationWithIcon(
            "error",
            "Error",
            "Please reupload your documents."
          );
          this.setState(
            {
              UploadCounter: false,
            },
            () => {
              this.props.history.push("/tier4");
            }
          );
        }
      }
    } else {
      console.log("Not valid^^^^^^");
      this.validator1.showMessages();
      this.forceUpdate();
    }
  }
  openNotificationWithIcon(type, head, desc) {
    notification[type]({
      message: head,
      description: desc,
    });
  }
  handleCancel() {
    let temp = this.state.documents;
    temp = {};
    this.setState(
      {
        aml_flag: null,
        comfort_flag: null,
        board_flag: null,
        bank_flag: null,
        corporate_flag: null,
        ownership_flag: null,
        articles_flag: null,
        bylaws_flag: null,
        ownership_control_structure_flag: null,
        director_list_flag: null,
        active_business_proof_flag: null,
        document_availability_policy_flag: null,
        cookies_policy_flag: null,
        privacy_policy_flag: null,
        aml_policy_flag: null,
        terms_of_service_flag: null,
        documents: temp,
      },
      () => {
        console.log("On Cancel", this.state.documents);
      }
    );
    this.validator1.hideMessages();
    this.forceUpdate();
  }
  comingCancel = (e) => {
    this.setState({
      reasonPopup: false,
    });
  };
  render() {
    // console.log("render^^^", this.state.reUpload1);
    let {
      aml_flag,
      comfort_flag,
      board_flag,
      documents,
      bank_flag,
      corporate_flag,
      ownership_flag,
      articles_flag,
      bylaws_flag,
      ownership_control_structure_flag,
      director_list_flag,
      active_business_proof_flag,
      document_availability_policy_flag,
      cookies_policy_flag,
      privacy_policy_flag,
      aml_policy_flag,
      terms_of_service_flag,
      forceRejectStatus,
      forceRejectNote,
      forceAcceptedStatus,
    } = this.state;
    return (
      <div>
        <Navigation />
        <TierWrapper>
          <KYCWrap>
            <KYCHead>Tier 4 Upgrade</KYCHead>
            {forceRejectStatus ? (
              <TierWrap
                style={{
                  textAlign: "center",
                  margin: "50px auto",
                  fontSize: "18px",
                }}
              >
                <p>
                  Your request for tier upgrade is rejected by admin due to
                  below reason.
                </p>
                <p>{forceRejectNote}</p>
                <p>
                  Feel free to contact us <Link to="/open-ticket">here</Link>
                </p>
              </TierWrap>
            ) : (
              <div>
                {forceAcceptedStatus ? (
                  <TierWrap
                    style={{
                      textAlign: "center",
                      fontSize: "18px",
                    }}
                  >
                    <DoneWrap>
                      <Icon
                        className="icon-display"
                        type="check-circle"
                        theme="twoTone"
                        twoToneColor="#52c41a"
                      />
                      <KycSucc>
                        <span>
                          <b>Verification Completed.</b>
                          <br />
                          <br />
                          Your Account is Verified successfully to Tier 4.
                        </span>
                      </KycSucc>
                    </DoneWrap>
                  </TierWrap>
                ) : (
                  <TierWrap>
                    {/* AML Questionnaire */}
                    <TierRow>
                      <TierLabel>
                        <label>AML Questionnaire</label>
                        <a href={aml_questionnaire} target="_blank" download>
                          Click Here to Download the Form
                        </a>
                      </TierLabel>
                      <TierUpload>
                        <TierDropWrap
                          className={
                            documents.aml_questionnaire &&
                            documents.aml_questionnaire.file &&
                            documents.aml_questionnaire.file.name
                              ? "has_file"
                              : !this.state.reUpload1
                              ? "disabled_btn"
                              : ""
                          }
                        >
                          <TierDropzoneStyle
                            accept=".pdf,.doc,.docx"
                            className={
                              documents.aml_questionnaire &&
                              documents.aml_questionnaire.file &&
                              documents.aml_questionnaire.file.name
                                ? "tier_dropzone has_file"
                                : "tier_dropzone"
                            }
                            multiple={false}
                            onDrop={this.onDrop.bind(this, "aml_questionnaire")}
                            onFileDialogCancel={this.onCancel.bind(this)}
                            disabled={!this.state.reUpload1}
                          >
                            {aml_flag === null && (
                              <div>
                                <IconS type="upload" />
                                <FileSelectText>Upload</FileSelectText>
                              </div>
                            )}
                            {aml_flag === false && (
                              <div>
                                {/* <IconS type="close-square" /> */}
                                <FileSelectText>
                                  Wrong File Selected
                                </FileSelectText>
                              </div>
                            )}
                            {aml_flag === true && (
                              <div>
                                {/* <IconS type="check-square" /> */}
                                <FileSelectText>
                                  {documents.aml_questionnaire.file.name}
                                </FileSelectText>
                              </div>
                            )}
                          </TierDropzoneStyle>
                          {documents.aml_questionnaire &&
                            documents.aml_questionnaire.file &&
                            documents.aml_questionnaire.file.name && (
                              <Icon
                                className="drop_zone_icon"
                                onClick={() => {
                                  let temp = documents;
                                  temp["aml_questionnaire"] = {};
                                  this.setState({
                                    documents: temp,
                                    aml_flag: null,
                                  });
                                }}
                                type="close"
                              />
                            )}
                        </TierDropWrap>
                        <SupportText className="tier_support_text">
                          Supported format: .doc, .docx, .pdf.
                        </SupportText>
                        {this.state.reUpload1
                          ? this.validator1.message(
                              "aml_questionnaire",
                              aml_flag,
                              "required",
                              "tier-text-danger-validation"
                            )
                          : delete this.validator1.fields["aml_questionnaire"]}
                      </TierUpload>
                      {this.state.tierData.length > 0 ? (
                        <TierDocBox>
                          {this.state.amlQuestionnaireStatus === null && (
                            <TierDocStatus>
                              <Icon type="warning" />
                              <span>Under Approval</span>
                            </TierDocStatus>
                          )}
                          {this.state.amlQuestionnaireStatus === true && (
                            <TierDocStatus>
                              <Icon type="check" />
                              <span>Verified</span>
                            </TierDocStatus>
                          )}
                          {this.state.amlQuestionnaireStatus === false && (
                            <TierDocStatus>
                              <Icon type="close" />
                              <span>Reupload it</span>
                            </TierDocStatus>
                          )}
                          {this.state.amlQuestionnaireNote && (
                            <Icon
                              type="message"
                              onClick={() => {
                                this.setState({
                                  reasonPopup: true,
                                  rejectText: this.state.amlQuestionnaireNote,
                                });
                              }}
                            />
                          )}
                        </TierDocBox>
                      ) : (
                        <TierDocBox></TierDocBox>
                      )}
                    </TierRow>
                    {/* Comfort Letter */}
                    <TierRow>
                      <TierLabel>
                        <label>Comfort Letter</label>
                        <a href={comfort_letter} target="_blank" download>
                          Click Here to Download the Form
                        </a>
                      </TierLabel>
                      <TierUpload>
                        <TierDropWrap
                          className={
                            documents.comfort_letter &&
                            documents.comfort_letter.file &&
                            documents.comfort_letter.file.name
                              ? "has_file"
                              : !this.state.reUpload2
                              ? "disabled_btn"
                              : ""
                          }
                        >
                          <TierDropzoneStyle
                            accept=".pdf,.doc,.docx"
                            className={
                              documents.comfort_letter &&
                              documents.comfort_letter.file &&
                              documents.comfort_letter.file.name
                                ? "tier_dropzone has_file"
                                : "tier_dropzone"
                            }
                            multiple={false}
                            onDrop={this.onDrop.bind(this, "comfort_letter")}
                            onFileDialogCancel={this.onCancel.bind(this)}
                            disabled={!this.state.reUpload2}
                          >
                            {comfort_flag === null && (
                              <div>
                                <IconS type="upload" />
                                <FileSelectText>Upload</FileSelectText>
                              </div>
                            )}
                            {comfort_flag === false && (
                              <div>
                                {/* <IconS type="close-square" /> */}
                                <FileSelectText>
                                  Wrong File Selected
                                </FileSelectText>
                              </div>
                            )}
                            {comfort_flag === true && (
                              <div>
                                {/* <IconS type="check-square" /> */}
                                <FileSelectText>
                                  {documents.comfort_letter.file.name}
                                </FileSelectText>
                              </div>
                            )}
                          </TierDropzoneStyle>
                          {documents.comfort_letter &&
                            documents.comfort_letter.file &&
                            documents.comfort_letter.file.name && (
                              <Icon
                                className="drop_zone_icon"
                                onClick={() => {
                                  let temp = documents;
                                  temp["comfort_letter"] = {};
                                  this.setState({
                                    documents: temp,
                                    comfort_flag: null,
                                  });
                                }}
                                type="close"
                              />
                            )}
                        </TierDropWrap>
                        <SupportText className="tier_support_text">
                          Supported format: .doc, .docx, .pdf.
                        </SupportText>
                        {this.state.reUpload2
                          ? this.validator1.message(
                              "comfort_letter",
                              comfort_flag,
                              "required",
                              "tier-text-danger-validation"
                            )
                          : delete this.validator1.fields["comfort_letter"]}
                      </TierUpload>
                      {this.state.tierData.length > 0 ? (
                        <TierDocBox>
                          {this.state.comfortLetterStatus === null && (
                            <TierDocStatus>
                              <Icon type="warning" />
                              <span>Under Approval</span>
                            </TierDocStatus>
                          )}
                          {this.state.comfortLetterStatus === true && (
                            <TierDocStatus>
                              <Icon type="check" />
                              <span>Verified</span>
                            </TierDocStatus>
                          )}
                          {this.state.comfortLetterStatus === false && (
                            <TierDocStatus>
                              <Icon type="close" />
                              <span>Reupload it</span>
                            </TierDocStatus>
                          )}
                          {this.state.comfortLetterNote && (
                            <Icon
                              type="message"
                              onClick={() => {
                                this.setState({
                                  reasonPopup: true,
                                  rejectText: this.state.comfortLetterNote,
                                });
                              }}
                            />
                          )}
                        </TierDocBox>
                      ) : (
                        <TierDocBox></TierDocBox>
                      )}
                    </TierRow>
                    {/* Board Resolution */}
                    <TierRow>
                      <TierLabel>
                        <label>Board Resolution</label>
                        <a href={board_resolution} target="_blank" download>
                          Click Here to Download the Form
                        </a>
                      </TierLabel>
                      <TierUpload>
                        <TierDropWrap
                          className={
                            documents.board_resolution &&
                            documents.board_resolution.file &&
                            documents.board_resolution.file.name
                              ? "has_file"
                              : !this.state.reUpload3
                              ? "disabled_btn"
                              : ""
                          }
                        >
                          <TierDropzoneStyle
                            accept=".pdf,.doc,.docx"
                            className={
                              documents.board_resolution &&
                              documents.board_resolution.file &&
                              documents.board_resolution.file.name
                                ? "tier_dropzone has_file"
                                : "tier_dropzone"
                            }
                            multiple={false}
                            onDrop={this.onDrop.bind(this, "board_resolution")}
                            onFileDialogCancel={this.onCancel.bind(this)}
                            disabled={!this.state.reUpload3}
                          >
                            {board_flag === null && (
                              <div>
                                <IconS type="upload" />
                                <FileSelectText>Upload</FileSelectText>
                              </div>
                            )}
                            {board_flag === false && (
                              <div>
                                <FileSelectText>
                                  Wrong File Selected
                                </FileSelectText>
                              </div>
                            )}
                            {board_flag === true && (
                              <div>
                                <FileSelectText>
                                  {documents.board_resolution.file.name}
                                </FileSelectText>
                              </div>
                            )}
                          </TierDropzoneStyle>
                          {documents.board_resolution &&
                            documents.board_resolution.file &&
                            documents.board_resolution.file.name && (
                              <Icon
                                className="drop_zone_icon"
                                onClick={() => {
                                  let temp = documents;
                                  temp["board_resolution"] = {};
                                  this.setState({
                                    documents: temp,
                                    board_flag: null,
                                  });
                                }}
                                type="close"
                              />
                            )}
                        </TierDropWrap>
                        <SupportText className="tier_support_text">
                          Supported format: .doc, .docx, .pdf.
                        </SupportText>
                        {this.state.reUpload3
                          ? this.validator1.message(
                              "board_resolution",
                              board_flag,
                              "required",
                              "tier-text-danger-validation"
                            )
                          : delete this.validator1.fields["board_resolution"]}
                      </TierUpload>
                      {this.state.tierData.length > 0 ? (
                        <TierDocBox>
                          {this.state.boardResolutionStatus === null && (
                            <TierDocStatus>
                              <Icon type="warning" />
                              <span>Under Approval</span>
                            </TierDocStatus>
                          )}
                          {this.state.boardResolutionStatus === true && (
                            <TierDocStatus>
                              <Icon type="check" />
                              <span>Verified</span>
                            </TierDocStatus>
                          )}
                          {this.state.boardResolutionStatus === false && (
                            <TierDocStatus>
                              <Icon type="close" />
                              <span>Reupload it</span>
                            </TierDocStatus>
                          )}
                          {this.state.boardResolutionNote && (
                            <Icon
                              type="message"
                              onClick={() => {
                                this.setState({
                                  reasonPopup: true,
                                  rejectText: this.state.boardResolutionNote,
                                });
                              }}
                            />
                          )}
                        </TierDocBox>
                      ) : (
                        <TierDocBox></TierDocBox>
                      )}
                    </TierRow>
                    {/* 2 Months Bank Statements */}
                    <TierRow>
                      <TierLabel>
                        <label>2 Months Bank Statements</label>
                      </TierLabel>
                      <TierUpload>
                        <TierDropWrap
                          className={
                            documents.bank_statements &&
                            documents.bank_statements.file &&
                            documents.bank_statements.file.name
                              ? "has_file"
                              : !this.state.reUpload4
                              ? "disabled_btn"
                              : ""
                          }
                        >
                          <TierDropzoneStyle
                            accept=".pdf,.doc,.docx"
                            className={
                              documents.bank_statements &&
                              documents.bank_statements.file &&
                              documents.bank_statements.file.name
                                ? "tier_dropzone has_file"
                                : "tier_dropzone"
                            }
                            multiple={false}
                            onDrop={this.onDrop.bind(this, "bank_statements")}
                            onFileDialogCancel={this.onCancel.bind(this)}
                            disabled={!this.state.reUpload4}
                          >
                            {bank_flag === null && (
                              <div>
                                <IconS type="upload" />
                                <FileSelectText>Upload</FileSelectText>
                              </div>
                            )}
                            {bank_flag === false && (
                              <div>
                                <FileSelectText>
                                  Wrong File Selected
                                </FileSelectText>
                              </div>
                            )}
                            {bank_flag === true && (
                              <div>
                                <FileSelectText>
                                  {documents.bank_statements.file.name}
                                </FileSelectText>
                              </div>
                            )}
                          </TierDropzoneStyle>
                          {documents.bank_statements &&
                            documents.bank_statements.file &&
                            documents.bank_statements.file.name && (
                              <Icon
                                className="drop_zone_icon"
                                onClick={() => {
                                  let temp = documents;
                                  temp["bank_statements"] = {};
                                  this.setState({
                                    documents: temp,
                                    bank_flag: null,
                                  });
                                }}
                                type="close"
                              />
                            )}
                        </TierDropWrap>
                        <SupportText className="tier_support_text">
                          Supported format: .doc, .docx, .pdf.
                        </SupportText>
                        {this.state.reUpload4
                          ? this.validator1.message(
                              "bank_statements",
                              bank_flag,
                              "required",
                              "tier-text-danger-validation"
                            )
                          : delete this.validator1.fields["bank_statements"]}
                      </TierUpload>
                      {this.state.tierData.length > 0 ? (
                        <TierDocBox>
                          {this.state.bankStatementStatus === null && (
                            <TierDocStatus>
                              <Icon type="warning" />
                              <span>Under Approval</span>
                            </TierDocStatus>
                          )}
                          {this.state.bankStatementStatus === true && (
                            <TierDocStatus>
                              <Icon type="check" />
                              <span>Verified</span>
                            </TierDocStatus>
                          )}
                          {this.state.bankStatementStatus === false && (
                            <TierDocStatus>
                              <Icon type="close" />
                              <span>Reupload it</span>
                            </TierDocStatus>
                          )}
                          {this.state.bankStatementNote && (
                            <Icon
                              type="message"
                              onClick={() => {
                                this.setState({
                                  reasonPopup: true,
                                  rejectText: this.state.bankStatementNote,
                                });
                              }}
                            />
                          )}
                        </TierDocBox>
                      ) : (
                        <TierDocBox></TierDocBox>
                      )}
                    </TierRow>
                    {/* Corporate Filing Information */}
                    <TierRow>
                      <TierLabel>
                        <label>Corporate Filing Information</label>
                        <a
                          href={corporate_filing_info}
                          target="_blank"
                          download
                        >
                          Click Here to Download the Form
                        </a>
                      </TierLabel>
                      <TierUpload>
                        <TierDropWrap
                          className={
                            documents.corporate_info &&
                            documents.corporate_info.file &&
                            documents.corporate_info.file.name
                              ? "has_file"
                              : !this.state.reUpload5
                              ? "disabled_btn"
                              : ""
                          }
                        >
                          <TierDropzoneStyle
                            accept=".pdf,.doc,.docx"
                            className={
                              documents.corporate_info &&
                              documents.corporate_info.file &&
                              documents.corporate_info.file.name
                                ? "tier_dropzone has_file"
                                : "tier_dropzone"
                            }
                            multiple={false}
                            onDrop={this.onDrop.bind(this, "corporate_info")}
                            onFileDialogCancel={this.onCancel.bind(this)}
                            disabled={!this.state.reUpload5}
                          >
                            {corporate_flag === null && (
                              <div>
                                <IconS type="upload" />
                                <FileSelectText>Upload</FileSelectText>
                              </div>
                            )}
                            {corporate_flag === false && (
                              <div>
                                <FileSelectText>
                                  Wrong File Selected
                                </FileSelectText>
                              </div>
                            )}
                            {corporate_flag === true && (
                              <div>
                                <FileSelectText>
                                  {documents.corporate_info.file.name}
                                </FileSelectText>
                              </div>
                            )}
                          </TierDropzoneStyle>
                          {documents.corporate_info &&
                            documents.corporate_info.file &&
                            documents.corporate_info.file.name && (
                              <Icon
                                className="drop_zone_icon"
                                onClick={() => {
                                  let temp = documents;
                                  temp["corporate_info"] = {};
                                  this.setState({
                                    documents: temp,
                                    corporate_flag: null,
                                  });
                                }}
                                type="close"
                              />
                            )}
                        </TierDropWrap>
                        <SupportText className="tier_support_text">
                          Supported format: .doc, .docx, .pdf.
                        </SupportText>
                        {this.state.reUpload5
                          ? this.validator1.message(
                              "corporate_info",
                              corporate_flag,
                              "required",
                              "tier-text-danger-validation"
                            )
                          : delete this.validator1.fields["corporate_info"]}
                      </TierUpload>
                      {this.state.tierData.length > 0 ? (
                        <TierDocBox>
                          {this.state.corporateInfoStatus === null && (
                            <TierDocStatus>
                              <Icon type="warning" />
                              <span>Under Approval</span>
                            </TierDocStatus>
                          )}
                          {this.state.corporateInfoStatus === true && (
                            <TierDocStatus>
                              <Icon type="check" />
                              <span>Verified</span>
                            </TierDocStatus>
                          )}
                          {this.state.corporateInfoStatus === false && (
                            <TierDocStatus>
                              <Icon type="close" />
                              <span>Reupload it</span>
                            </TierDocStatus>
                          )}
                          {this.state.corporateInfoNote && (
                            <Icon
                              type="message"
                              onClick={() => {
                                this.setState({
                                  reasonPopup: true,
                                  rejectText: this.state.corporateInfoNote,
                                });
                              }}
                            />
                          )}
                        </TierDocBox>
                      ) : (
                        <TierDocBox></TierDocBox>
                      )}
                    </TierRow>
                    {/* Beneficial Ownership Form */}
                    <TierRow>
                      <TierLabel>
                        <label>Beneficial Ownership Form</label>
                        <a
                          href={beneficial_ownership_form}
                          target="_blank"
                          download
                        >
                          Click Here to Download the Form
                        </a>
                      </TierLabel>
                      <TierUpload>
                        <TierDropWrap
                          className={
                            documents.ownership_form &&
                            documents.ownership_form.file &&
                            documents.ownership_form.file.name
                              ? "has_file"
                              : !this.state.reUpload6
                              ? "disabled_btn"
                              : ""
                          }
                        >
                          <TierDropzoneStyle
                            accept=".pdf,.doc,.docx"
                            className={
                              documents.ownership_form &&
                              documents.ownership_form.file &&
                              documents.ownership_form.file.name
                                ? "tier_dropzone has_file"
                                : "tier_dropzone"
                            }
                            multiple={false}
                            onDrop={this.onDrop.bind(this, "ownership_form")}
                            onFileDialogCancel={this.onCancel.bind(this)}
                            disabled={!this.state.reUpload6}
                          >
                            {ownership_flag === null && (
                              <div>
                                <IconS type="upload" />
                                <FileSelectText>Upload</FileSelectText>
                              </div>
                            )}
                            {ownership_flag === false && (
                              <div>
                                <FileSelectText>
                                  Wrong File Selected
                                </FileSelectText>
                              </div>
                            )}
                            {ownership_flag === true && (
                              <div>
                                <FileSelectText>
                                  {documents.ownership_form.file.name}
                                </FileSelectText>
                              </div>
                            )}
                          </TierDropzoneStyle>
                          {documents.ownership_form &&
                            documents.ownership_form.file &&
                            documents.ownership_form.file.name && (
                              <Icon
                                className="drop_zone_icon"
                                onClick={() => {
                                  let temp = documents;
                                  temp["ownership_form"] = [];
                                  this.setState({
                                    documents: temp,
                                    ownership_flag: null,
                                  });
                                }}
                                type="close"
                              />
                            )}
                        </TierDropWrap>
                        <SupportText className="tier_support_text">
                          Supported format: .doc, .docx, .pdf.
                        </SupportText>
                        {this.state.reUpload6
                          ? this.validator1.message(
                              "ownership_form",
                              ownership_flag,
                              "required",
                              "tier-text-danger-validation"
                            )
                          : delete this.validator1.fields["ownership_form"]}
                      </TierUpload>
                      {this.state.tierData.length > 0 ? (
                        <TierDocBox>
                          {this.state.ownershipFormStatus === null && (
                            <TierDocStatus>
                              <Icon type="warning" />
                              <span>Under Approval</span>
                            </TierDocStatus>
                          )}
                          {this.state.ownershipFormStatus === true && (
                            <TierDocStatus>
                              <Icon type="check" />
                              <span>Verified</span>
                            </TierDocStatus>
                          )}
                          {this.state.ownershipFormStatus === false && (
                            <TierDocStatus>
                              <Icon type="close" />
                              <span>Reupload it</span>
                            </TierDocStatus>
                          )}
                          {this.state.ownershipFormNote && (
                            <Icon
                              type="message"
                              onClick={() => {
                                this.setState({
                                  reasonPopup: true,
                                  rejectText: this.state.ownershipFormNote,
                                });
                              }}
                            />
                          )}
                        </TierDocBox>
                      ) : (
                        <TierDocBox></TierDocBox>
                      )}
                    </TierRow>
                    {/* Articles of Incorporation */}
                    <TierRow>
                      <TierLabel>
                        <label>Articles of Incorporation</label>
                        <a
                          href={articles_of_incorporation}
                          target="_blank"
                          download
                        >
                          Click Here to Download the Form
                        </a>
                      </TierLabel>
                      <TierUpload>
                        <TierDropWrap
                          className={
                            documents.articles_of_incorporation &&
                            documents.articles_of_incorporation.file &&
                            documents.articles_of_incorporation.file.name
                              ? "has_file"
                              : !this.state.reUpload7
                              ? "disabled_btn"
                              : ""
                          }
                        >
                          <TierDropzoneStyle
                            accept=".pdf,.doc,.docx"
                            className={
                              documents.articles_of_incorporation &&
                              documents.articles_of_incorporation.file &&
                              documents.articles_of_incorporation.file.name
                                ? "tier_dropzone has_file"
                                : "tier_dropzone"
                            }
                            multiple={false}
                            onDrop={this.onDrop.bind(
                              this,
                              "articles_of_incorporation"
                            )}
                            onFileDialogCancel={this.onCancel.bind(this)}
                            disabled={!this.state.reUpload7}
                          >
                            {articles_flag === null && (
                              <div>
                                <IconS type="upload" />
                                <FileSelectText>Upload</FileSelectText>
                              </div>
                            )}
                            {articles_flag === false && (
                              <div>
                                <FileSelectText>
                                  Wrong File Selected
                                </FileSelectText>
                              </div>
                            )}
                            {articles_flag === true && (
                              <div>
                                <FileSelectText>
                                  {
                                    documents.articles_of_incorporation.file
                                      .name
                                  }
                                </FileSelectText>
                              </div>
                            )}
                          </TierDropzoneStyle>
                          {documents.articles_of_incorporation &&
                            documents.articles_of_incorporation.file &&
                            documents.articles_of_incorporation.file.name && (
                              <Icon
                                className="drop_zone_icon"
                                onClick={() => {
                                  let temp = documents;
                                  temp["articles_of_incorporation"] = [];
                                  this.setState({
                                    documents: temp,
                                    articles_flag: null,
                                  });
                                }}
                                type="close"
                              />
                            )}
                        </TierDropWrap>
                        <SupportText className="tier_support_text">
                          Supported format: .doc, .docx, .pdf.
                        </SupportText>
                        {this.state.reUpload7
                          ? this.validator1.message(
                              "articles_of_incorporation",
                              articles_flag,
                              "required",
                              "tier-text-danger-validation"
                            )
                          : delete this.validator1.fields[
                              "articles_of_incorporation"
                            ]}
                      </TierUpload>
                      {this.state.tierData.length > 0 ? (
                        <TierDocBox>
                          {this.state.articlesIncorporationStatus === null && (
                            <TierDocStatus>
                              <Icon type="warning" />
                              <span>Under Approval</span>
                            </TierDocStatus>
                          )}
                          {this.state.articlesIncorporationStatus === true && (
                            <TierDocStatus>
                              <Icon type="check" />
                              <span>Verified</span>
                            </TierDocStatus>
                          )}
                          {this.state.articlesIncorporationStatus === false && (
                            <TierDocStatus>
                              <Icon type="close" />
                              <span>Reupload it</span>
                            </TierDocStatus>
                          )}
                          {this.state.articlesIncorporationNote && (
                            <Icon
                              type="message"
                              onClick={() => {
                                this.setState({
                                  reasonPopup: true,
                                  rejectText: this.state
                                    .articlesIncorporationNote,
                                });
                              }}
                            />
                          )}
                        </TierDocBox>
                      ) : (
                        <TierDocBox></TierDocBox>
                      )}
                    </TierRow>
                    {/* Bylaws */}
                    <TierRow>
                      <TierLabel>
                        <label>Bylaws</label>
                        <a href={bylaws_form} target="_blank" download>
                          Click Here to Download the Form
                        </a>
                      </TierLabel>
                      <TierUpload>
                        <TierDropWrap
                          className={
                            documents.bylaws &&
                            documents.bylaws.file &&
                            documents.bylaws.file.name
                              ? "has_file"
                              : !this.state.reUpload8
                              ? "disabled_btn"
                              : ""
                          }
                        >
                          <TierDropzoneStyle
                            accept=".pdf,.doc,.docx"
                            className={
                              documents.bylaws &&
                              documents.bylaws.file &&
                              documents.bylaws.file.name
                                ? "tier_dropzone has_file"
                                : "tier_dropzone"
                            }
                            multiple={false}
                            onDrop={this.onDrop.bind(this, "bylaws")}
                            onFileDialogCancel={this.onCancel.bind(this)}
                            disabled={!this.state.reUpload8}
                          >
                            {bylaws_flag === null && (
                              <div>
                                <IconS type="upload" />
                                <FileSelectText>Upload</FileSelectText>
                              </div>
                            )}
                            {bylaws_flag === false && (
                              <div>
                                <FileSelectText>
                                  Wrong File Selected
                                </FileSelectText>
                              </div>
                            )}
                            {bylaws_flag === true && (
                              <div>
                                <FileSelectText>
                                  {documents.bylaws.file.name}
                                </FileSelectText>
                              </div>
                            )}
                          </TierDropzoneStyle>
                          {documents.bylaws &&
                            documents.bylaws.file &&
                            documents.bylaws.file.name && (
                              <Icon
                                className="drop_zone_icon"
                                onClick={() => {
                                  let temp = documents;
                                  temp["bylaws"] = [];
                                  this.setState({
                                    documents: temp,
                                    bylaws_flag: null,
                                  });
                                }}
                                type="close"
                              />
                            )}
                        </TierDropWrap>
                        <SupportText className="tier_support_text">
                          Supported format: .doc, .docx, .pdf.
                        </SupportText>
                        {this.state.reUpload8
                          ? this.validator1.message(
                              "bylaws",
                              bylaws_flag,
                              "required",
                              "tier-text-danger-validation"
                            )
                          : delete this.validator1.fields["bylaws"]}
                      </TierUpload>
                      {this.state.tierData.length > 0 ? (
                        <TierDocBox>
                          {this.state.byLawsStatus === null && (
                            <TierDocStatus>
                              <Icon type="warning" />
                              <span>Under Approval</span>
                            </TierDocStatus>
                          )}
                          {this.state.byLawsStatus === true && (
                            <TierDocStatus>
                              <Icon type="check" />
                              <span>Verified</span>
                            </TierDocStatus>
                          )}
                          {this.state.byLawsStatus === false && (
                            <TierDocStatus>
                              <Icon type="close" />
                              <span>Reupload it</span>
                            </TierDocStatus>
                          )}
                          {this.state.byLawsNote && (
                            <Icon
                              type="message"
                              onClick={() => {
                                this.setState({
                                  reasonPopup: true,
                                  rejectText: this.state.byLawsNote,
                                });
                              }}
                            />
                          )}
                        </TierDocBox>
                      ) : (
                        <TierDocBox></TierDocBox>
                      )}
                    </TierRow>
                    {/* Ownership and Control Structure */}
                    <TierRow>
                      <TierLabel>
                        <label>Ownership and Control Structure</label>
                        <a
                          href={ownership_and_control_structure}
                          target="_blank"
                          download
                        >
                          Click Here to Download the Form
                        </a>
                      </TierLabel>
                      <TierUpload>
                        <TierDropWrap
                          className={
                            documents.ownership_control_structure &&
                            documents.ownership_control_structure.file &&
                            documents.ownership_control_structure.file.name
                              ? "has_file"
                              : !this.state.reUpload9
                              ? "disabled_btn"
                              : ""
                          }
                        >
                          <TierDropzoneStyle
                            accept=".pdf,.doc,.docx"
                            className={
                              documents.ownership_control_structure &&
                              documents.ownership_control_structure.file &&
                              documents.ownership_control_structure.file.name
                                ? "tier_dropzone has_file"
                                : "tier_dropzone"
                            }
                            multiple={false}
                            onDrop={this.onDrop.bind(
                              this,
                              "ownership_control_structure"
                            )}
                            onFileDialogCancel={this.onCancel.bind(this)}
                            disabled={!this.state.reUpload9}
                          >
                            {ownership_control_structure_flag === null && (
                              <div>
                                <IconS type="upload" />
                                <FileSelectText>Upload</FileSelectText>
                              </div>
                            )}
                            {ownership_control_structure_flag === false && (
                              <div>
                                <FileSelectText>
                                  Wrong File Selected
                                </FileSelectText>
                              </div>
                            )}
                            {ownership_control_structure_flag === true && (
                              <div>
                                <FileSelectText>
                                  {
                                    documents.ownership_control_structure.file
                                      .name
                                  }
                                </FileSelectText>
                              </div>
                            )}
                          </TierDropzoneStyle>
                          {documents.ownership_control_structure &&
                            documents.ownership_control_structure.file &&
                            documents.ownership_control_structure.file.name && (
                              <Icon
                                className="drop_zone_icon"
                                onClick={() => {
                                  let temp = documents;
                                  temp["ownership_control_structure"] = [];
                                  this.setState({
                                    documents: temp,
                                    ownership_control_structure_flag: null,
                                  });
                                }}
                                type="close"
                              />
                            )}
                        </TierDropWrap>
                        <SupportText className="tier_support_text">
                          Supported format: .doc, .docx, .pdf.
                        </SupportText>
                        {this.state.reUpload9
                          ? this.validator1.message(
                              "ownership_control_structure",
                              ownership_control_structure_flag,
                              "required",
                              "tier-text-danger-validation"
                            )
                          : delete this.validator1.fields[
                              "ownership_control_structure"
                            ]}
                      </TierUpload>
                      {this.state.tierData.length > 0 ? (
                        <TierDocBox>
                          {this.state.ownershipControlStructureStatus ===
                            null && (
                            <TierDocStatus>
                              <Icon type="warning" />
                              <span>Under Approval</span>
                            </TierDocStatus>
                          )}
                          {this.state.ownershipControlStructureStatus ===
                            true && (
                            <TierDocStatus>
                              <Icon type="check" />
                              <span>Verified</span>
                            </TierDocStatus>
                          )}
                          {this.state.ownershipControlStructureStatus ===
                            false && (
                            <TierDocStatus>
                              <Icon type="close" />
                              <span>Reupload it</span>
                            </TierDocStatus>
                          )}
                          {this.state.ownershipControlStructureNote && (
                            <Icon
                              type="message"
                              onClick={() => {
                                this.setState({
                                  reasonPopup: true,
                                  rejectText: this.state
                                    .ownershipControlStructureNote,
                                });
                              }}
                            />
                          )}
                        </TierDocBox>
                      ) : (
                        <TierDocBox></TierDocBox>
                      )}
                    </TierRow>
                    {/* Directors and Officers List & Personal Info Equivalent to Tier 3 Requirements */}
                    <TierRow>
                      <TierLabel>
                        <label>
                          Directors and Officers List & Personal Info Equivalent
                          to Tier 3 Requirements
                        </label>
                        <a href={director_list_form} target="_blank" download>
                          Click Here to Download the Form
                        </a>
                      </TierLabel>
                      <TierUpload>
                        <TierDropWrap
                          className={
                            documents.director_list &&
                            documents.director_list.file &&
                            documents.director_list.file.name
                              ? "has_file"
                              : !this.state.reUpload10
                              ? "disabled_btn"
                              : ""
                          }
                        >
                          <TierDropzoneStyle
                            accept=".pdf,.doc,.docx"
                            className={
                              documents.director_list &&
                              documents.director_list.file &&
                              documents.director_list.file.name
                                ? "tier_dropzone has_file"
                                : "tier_dropzone"
                            }
                            multiple={false}
                            onDrop={this.onDrop.bind(this, "director_list")}
                            onFileDialogCancel={this.onCancel.bind(this)}
                            disabled={!this.state.reUpload10}
                          >
                            {director_list_flag === null && (
                              <div>
                                <IconS type="upload" />
                                <FileSelectText>Upload</FileSelectText>
                              </div>
                            )}
                            {director_list_flag === false && (
                              <div>
                                <FileSelectText>
                                  Wrong File Selected
                                </FileSelectText>
                              </div>
                            )}
                            {director_list_flag === true && (
                              <div>
                                <FileSelectText>
                                  {documents.director_list.file.name}
                                </FileSelectText>
                              </div>
                            )}
                          </TierDropzoneStyle>
                          {documents.director_list &&
                            documents.director_list.file &&
                            documents.director_list.file.name && (
                              <Icon
                                className="drop_zone_icon"
                                onClick={() => {
                                  let temp = documents;
                                  temp["director_list"] = [];
                                  this.setState({
                                    documents: temp,
                                    director_list_flag: null,
                                  });
                                }}
                                type="close"
                              />
                            )}
                        </TierDropWrap>
                        <SupportText className="tier_support_text">
                          Supported format: .doc, .docx, .pdf.
                        </SupportText>
                        {this.state.reUpload10
                          ? this.validator1.message(
                              "director_list",
                              director_list_flag,
                              "required",
                              "tier-text-danger-validation"
                            )
                          : delete this.validator1.fields["director_list"]}
                      </TierUpload>
                      {this.state.tierData.length > 0 ? (
                        <TierDocBox>
                          {this.state.directorListStatus === null && (
                            <TierDocStatus>
                              <Icon type="warning" />
                              <span>Under Approval</span>
                            </TierDocStatus>
                          )}
                          {this.state.directorListStatus === true && (
                            <TierDocStatus>
                              <Icon type="check" />
                              <span>Verified</span>
                            </TierDocStatus>
                          )}
                          {this.state.directorListStatus === false && (
                            <TierDocStatus>
                              <Icon type="close" />
                              <span>Reupload it</span>
                            </TierDocStatus>
                          )}
                          {this.state.directorListNote && (
                            <Icon
                              type="message"
                              onClick={() => {
                                this.setState({
                                  reasonPopup: true,
                                  rejectText: this.state.directorListNote,
                                });
                              }}
                            />
                          )}
                        </TierDocBox>
                      ) : (
                        <TierDocBox></TierDocBox>
                      )}
                    </TierRow>
                    {/* Proof of Active Business Address */}
                    <TierRow>
                      <TierLabel>
                        <label>Proof of Active Business Address</label>
                      </TierLabel>
                      <TierUpload>
                        <TierDropWrap
                          className={
                            documents.active_business_proof &&
                            documents.active_business_proof.file &&
                            documents.active_business_proof.file.name
                              ? "has_file"
                              : !this.state.reUpload11
                              ? "disabled_btn"
                              : ""
                          }
                        >
                          <TierDropzoneStyle
                            accept=".pdf,.doc,.docx"
                            className={
                              documents.active_business_proof &&
                              documents.active_business_proof.file &&
                              documents.active_business_proof.file.name
                                ? "tier_dropzone has_file"
                                : "tier_dropzone"
                            }
                            multiple={false}
                            onDrop={this.onDrop.bind(
                              this,
                              "active_business_proof"
                            )}
                            onFileDialogCancel={this.onCancel.bind(this)}
                            disabled={!this.state.reUpload11}
                          >
                            {active_business_proof_flag === null && (
                              <div>
                                <IconS type="upload" />
                                <FileSelectText>Upload</FileSelectText>
                              </div>
                            )}
                            {active_business_proof_flag === false && (
                              <div>
                                <FileSelectText>
                                  Wrong File Selected
                                </FileSelectText>
                              </div>
                            )}
                            {active_business_proof_flag === true && (
                              <div>
                                <FileSelectText>
                                  {documents.active_business_proof.file.name}
                                </FileSelectText>
                              </div>
                            )}
                          </TierDropzoneStyle>
                          {documents.active_business_proof &&
                            documents.active_business_proof.file &&
                            documents.active_business_proof.file.name && (
                              <Icon
                                className="drop_zone_icon"
                                onClick={() => {
                                  let temp = documents;
                                  temp["active_business_proof"] = [];
                                  this.setState({
                                    documents: temp,
                                    active_business_proof_flag: null,
                                  });
                                }}
                                type="close"
                              />
                            )}
                        </TierDropWrap>
                        <SupportText className="tier_support_text">
                          Supported format: .doc, .docx, .pdf.
                        </SupportText>
                        {this.state.reUpload11
                          ? this.validator1.message(
                              "active_business_proof",
                              active_business_proof_flag,
                              "required",
                              "tier-text-danger-validation"
                            )
                          : delete this.validator1.fields[
                              "active_business_proof"
                            ]}
                      </TierUpload>
                      {this.state.tierData.length > 0 ? (
                        <TierDocBox>
                          {this.state.activeBusinessProofStatus === null && (
                            <TierDocStatus>
                              <Icon type="warning" />
                              <span>Under Approval</span>
                            </TierDocStatus>
                          )}
                          {this.state.activeBusinessProofStatus === true && (
                            <TierDocStatus>
                              <Icon type="check" />
                              <span>Verified</span>
                            </TierDocStatus>
                          )}
                          {this.state.activeBusinessProofStatus === false && (
                            <TierDocStatus>
                              <Icon type="close" />
                              <span>Reupload it</span>
                            </TierDocStatus>
                          )}
                          {this.state.activeBusinessProofNote && (
                            <Icon
                              type="message"
                              onClick={() => {
                                this.setState({
                                  reasonPopup: true,
                                  rejectText: this.state
                                    .activeBusinessProofNote,
                                });
                              }}
                            />
                          )}
                        </TierDocBox>
                      ) : (
                        <TierDocBox></TierDocBox>
                      )}
                    </TierRow>
                    {/* Document Availability Policy */}
                    <TierRow>
                      <TierLabel>
                        <label>Document Availability Policy</label>
                      </TierLabel>
                      <TierUpload>
                        <TierDropWrap
                          className={
                            documents.document_availability_policy &&
                            documents.document_availability_policy.file &&
                            documents.document_availability_policy.file.name
                              ? "has_file"
                              : !this.state.reUpload12
                              ? "disabled_btn"
                              : ""
                          }
                        >
                          <TierDropzoneStyle
                            accept=".pdf,.doc,.docx"
                            className={
                              documents.document_availability_policy &&
                              documents.document_availability_policy.file &&
                              documents.document_availability_policy.file.name
                                ? "tier_dropzone has_file"
                                : "tier_dropzone"
                            }
                            multiple={false}
                            onDrop={this.onDrop.bind(
                              this,
                              "document_availability_policy"
                            )}
                            onFileDialogCancel={this.onCancel.bind(this)}
                            disabled={!this.state.reUpload12}
                          >
                            {document_availability_policy_flag === null && (
                              <div>
                                <IconS type="upload" />
                                <FileSelectText>Upload</FileSelectText>
                              </div>
                            )}
                            {document_availability_policy_flag === false && (
                              <div>
                                <FileSelectText>
                                  Wrong File Selected
                                </FileSelectText>
                              </div>
                            )}
                            {document_availability_policy_flag === true && (
                              <div>
                                <FileSelectText>
                                  {
                                    documents.document_availability_policy.file
                                      .name
                                  }
                                </FileSelectText>
                              </div>
                            )}
                          </TierDropzoneStyle>
                          {documents.document_availability_policy &&
                            documents.document_availability_policy.file &&
                            documents.document_availability_policy.file
                              .name && (
                              <Icon
                                className="drop_zone_icon"
                                onClick={() => {
                                  let temp = documents;
                                  temp["document_availability_policy"] = [];
                                  this.setState({
                                    documents: temp,
                                    document_availability_policy_flag: null,
                                  });
                                }}
                                type="close"
                              />
                            )}
                        </TierDropWrap>
                        <SupportText className="tier_support_text">
                          Supported format: .doc, .docx, .pdf.
                        </SupportText>
                        {this.state.reUpload12
                          ? this.validator1.message(
                              "document_availability_policy",
                              document_availability_policy_flag,
                              "required",
                              "tier-text-danger-validation"
                            )
                          : delete this.validator1.fields[
                              "document_availability_policy"
                            ]}
                      </TierUpload>
                      {this.state.tierData.length > 0 ? (
                        <TierDocBox>
                          {this.state.documentAvailabilityPolicyStatus ===
                            null && (
                            <TierDocStatus>
                              <Icon type="warning" />
                              <span>Under Approval</span>
                            </TierDocStatus>
                          )}
                          {this.state.documentAvailabilityPolicyStatus ===
                            true && (
                            <TierDocStatus>
                              <Icon type="check" />
                              <span>Verified</span>
                            </TierDocStatus>
                          )}
                          {this.state.documentAvailabilityPolicyStatus ===
                            false && (
                            <TierDocStatus>
                              <Icon type="close" />
                              <span>Reupload it</span>
                            </TierDocStatus>
                          )}
                          {this.state.documentAvailabilityPolicyNote && (
                            <Icon
                              type="message"
                              onClick={() => {
                                this.setState({
                                  reasonPopup: true,
                                  rejectText: this.state
                                    .documentAvailabilityPolicyNote,
                                });
                              }}
                            />
                          )}
                        </TierDocBox>
                      ) : (
                        <TierDocBox></TierDocBox>
                      )}
                    </TierRow>
                    {/* Cookies Policy */}
                    <TierRow>
                      <TierLabel>
                        <label>Cookies Policy</label>
                      </TierLabel>
                      <TierUpload>
                        <TierDropWrap
                          className={
                            documents.cookies_policy &&
                            documents.cookies_policy.file &&
                            documents.cookies_policy.file.name
                              ? "has_file"
                              : !this.state.reUpload13
                              ? "disabled_btn"
                              : ""
                          }
                        >
                          <TierDropzoneStyle
                            accept=".pdf,.doc,.docx"
                            className={
                              documents.cookies_policy &&
                              documents.cookies_policy.file &&
                              documents.cookies_policy.file.name
                                ? "tier_dropzone has_file"
                                : "tier_dropzone"
                            }
                            multiple={false}
                            onDrop={this.onDrop.bind(this, "cookies_policy")}
                            onFileDialogCancel={this.onCancel.bind(this)}
                            disabled={!this.state.reUpload13}
                          >
                            {cookies_policy_flag === null && (
                              <div>
                                <IconS type="upload" />
                                <FileSelectText>Upload</FileSelectText>
                              </div>
                            )}
                            {cookies_policy_flag === false && (
                              <div>
                                <FileSelectText>
                                  Wrong File Selected
                                </FileSelectText>
                              </div>
                            )}
                            {cookies_policy_flag === true && (
                              <div>
                                <FileSelectText>
                                  {documents.cookies_policy.file.name}
                                </FileSelectText>
                              </div>
                            )}
                          </TierDropzoneStyle>
                          {documents.cookies_policy &&
                            documents.cookies_policy.file &&
                            documents.cookies_policy.file.name && (
                              <Icon
                                className="drop_zone_icon"
                                onClick={() => {
                                  let temp = documents;
                                  temp["cookies_policy"] = [];
                                  this.setState({
                                    documents: temp,
                                    cookies_policy_flag: null,
                                  });
                                }}
                                type="close"
                              />
                            )}
                        </TierDropWrap>
                        <SupportText className="tier_support_text">
                          Supported format: .doc, .docx, .pdf.
                        </SupportText>
                        {this.state.reUpload13
                          ? this.validator1.message(
                              "cookies_policy",
                              cookies_policy_flag,
                              "required",
                              "tier-text-danger-validation"
                            )
                          : delete this.validator1.fields["cookies_policy"]}
                      </TierUpload>
                      {this.state.tierData.length > 0 ? (
                        <TierDocBox>
                          {this.state.cookiesPolicyStatus === null && (
                            <TierDocStatus>
                              <Icon type="warning" />
                              <span>Under Approval</span>
                            </TierDocStatus>
                          )}
                          {this.state.cookiesPolicyStatus === true && (
                            <TierDocStatus>
                              <Icon type="check" />
                              <span>Verified</span>
                            </TierDocStatus>
                          )}
                          {this.state.cookiesPolicyStatus === false && (
                            <TierDocStatus>
                              <Icon type="close" />
                              <span>Reupload it</span>
                            </TierDocStatus>
                          )}
                          {this.state.cookiesPolicyNote && (
                            <Icon
                              type="message"
                              onClick={() => {
                                this.setState({
                                  reasonPopup: true,
                                  rejectText: this.state.cookiesPolicyNote,
                                });
                              }}
                            />
                          )}
                        </TierDocBox>
                      ) : (
                        <TierDocBox></TierDocBox>
                      )}
                    </TierRow>
                    {/* Privacy Policy */}
                    <TierRow>
                      <TierLabel>
                        <label>Privacy Policy</label>
                      </TierLabel>
                      <TierUpload>
                        <TierDropWrap
                          className={
                            documents.privacy_policy &&
                            documents.privacy_policy.file &&
                            documents.privacy_policy.file.name
                              ? "has_file"
                              : !this.state.reUpload14
                              ? "disabled_btn"
                              : ""
                          }
                        >
                          <TierDropzoneStyle
                            accept=".pdf,.doc,.docx"
                            className={
                              documents.privacy_policy &&
                              documents.privacy_policy.file &&
                              documents.privacy_policy.file.name
                                ? "tier_dropzone has_file"
                                : "tier_dropzone"
                            }
                            multiple={false}
                            onDrop={this.onDrop.bind(this, "privacy_policy")}
                            onFileDialogCancel={this.onCancel.bind(this)}
                            disabled={!this.state.reUpload14}
                          >
                            {privacy_policy_flag === null && (
                              <div>
                                <IconS type="upload" />
                                <FileSelectText>Upload</FileSelectText>
                              </div>
                            )}
                            {privacy_policy_flag === false && (
                              <div>
                                <FileSelectText>
                                  Wrong File Selected
                                </FileSelectText>
                              </div>
                            )}
                            {privacy_policy_flag === true && (
                              <div>
                                <FileSelectText>
                                  {documents.privacy_policy.file.name}
                                </FileSelectText>
                              </div>
                            )}
                          </TierDropzoneStyle>
                          {documents.privacy_policy &&
                            documents.privacy_policy.file &&
                            documents.privacy_policy.file.name && (
                              <Icon
                                className="drop_zone_icon"
                                onClick={() => {
                                  let temp = documents;
                                  temp["privacy_policy"] = [];
                                  this.setState({
                                    documents: temp,
                                    privacy_policy_flag: null,
                                  });
                                }}
                                type="close"
                              />
                            )}
                        </TierDropWrap>
                        <SupportText className="tier_support_text">
                          Supported format: .doc, .docx, .pdf.
                        </SupportText>
                        {this.state.reUpload14
                          ? this.validator1.message(
                              "privacy_policy",
                              privacy_policy_flag,
                              "required",
                              "tier-text-danger-validation"
                            )
                          : delete this.validator1.fields["privacy_policy"]}
                      </TierUpload>
                      {this.state.tierData.length > 0 ? (
                        <TierDocBox>
                          {this.state.privacyPolicyStatus === null && (
                            <TierDocStatus>
                              <Icon type="warning" />
                              <span>Under Approval</span>
                            </TierDocStatus>
                          )}
                          {this.state.privacyPolicyStatus === true && (
                            <TierDocStatus>
                              <Icon type="check" />
                              <span>Verified</span>
                            </TierDocStatus>
                          )}
                          {this.state.privacyPolicyStatus === false && (
                            <TierDocStatus>
                              <Icon type="close" />
                              <span>Reupload it</span>
                            </TierDocStatus>
                          )}
                          {this.state.privacyPolicyNote && (
                            <Icon
                              type="message"
                              onClick={() => {
                                this.setState({
                                  reasonPopup: true,
                                  rejectText: this.state.privacyPolicyNote,
                                });
                              }}
                            />
                          )}
                        </TierDocBox>
                      ) : (
                        <TierDocBox></TierDocBox>
                      )}
                    </TierRow>
                    {/* AML Policy */}
                    <TierRow>
                      <TierLabel>
                        <label>AML Policy</label>
                      </TierLabel>
                      <TierUpload>
                        <TierDropWrap
                          className={
                            documents.aml_policy &&
                            documents.aml_policy.file &&
                            documents.aml_policy.file.name
                              ? "has_file"
                              : !this.state.reUpload15
                              ? "disabled_btn"
                              : ""
                          }
                        >
                          <TierDropzoneStyle
                            accept=".pdf,.doc,.docx"
                            className={
                              documents.aml_policy &&
                              documents.aml_policy.file &&
                              documents.aml_policy.file.name
                                ? "tier_dropzone has_file"
                                : "tier_dropzone"
                            }
                            multiple={false}
                            onDrop={this.onDrop.bind(this, "aml_policy")}
                            onFileDialogCancel={this.onCancel.bind(this)}
                            disabled={!this.state.reUpload15}
                          >
                            {aml_policy_flag === null && (
                              <div>
                                <IconS type="upload" />
                                <FileSelectText>Upload</FileSelectText>
                              </div>
                            )}
                            {aml_policy_flag === false && (
                              <div>
                                <FileSelectText>
                                  Wrong File Selected
                                </FileSelectText>
                              </div>
                            )}
                            {aml_policy_flag === true && (
                              <div>
                                <FileSelectText>
                                  {documents.aml_policy.file.name}
                                </FileSelectText>
                              </div>
                            )}
                          </TierDropzoneStyle>
                          {documents.aml_policy &&
                            documents.aml_policy.file &&
                            documents.aml_policy.file.name && (
                              <Icon
                                className="drop_zone_icon"
                                onClick={() => {
                                  let temp = documents;
                                  temp["aml_policy"] = [];
                                  this.setState({
                                    documents: temp,
                                    aml_policy_flag: null,
                                  });
                                }}
                                type="close"
                              />
                            )}
                        </TierDropWrap>
                        <SupportText className="tier_support_text">
                          Supported format: .doc, .docx, .pdf.
                        </SupportText>
                        {this.state.reUpload15
                          ? this.validator1.message(
                              "aml_policy",
                              aml_policy_flag,
                              "required",
                              "tier-text-danger-validation"
                            )
                          : delete this.validator1.fields["aml_policy"]}
                      </TierUpload>
                      {this.state.tierData.length > 0 ? (
                        <TierDocBox>
                          {this.state.amlPolicyStatus === null && (
                            <TierDocStatus>
                              <Icon type="warning" />
                              <span>Under Approval</span>
                            </TierDocStatus>
                          )}
                          {this.state.amlPolicyStatus === true && (
                            <TierDocStatus>
                              <Icon type="check" />
                              <span>Verified</span>
                            </TierDocStatus>
                          )}
                          {this.state.amlPolicyStatus === false && (
                            <TierDocStatus>
                              <Icon type="close" />
                              <span>Reupload it</span>
                            </TierDocStatus>
                          )}
                          {this.state.amlPolicyNote && (
                            <Icon
                              type="message"
                              onClick={() => {
                                this.setState({
                                  reasonPopup: true,
                                  rejectText: this.state.amlPolicyNote,
                                });
                              }}
                            />
                          )}
                        </TierDocBox>
                      ) : (
                        <TierDocBox></TierDocBox>
                      )}
                    </TierRow>
                    {/* Terms of Service */}
                    <TierRow>
                      <TierLabel>
                        <label>Terms of Service</label>
                      </TierLabel>
                      <TierUpload>
                        <TierDropWrap
                          className={
                            documents.terms_of_service &&
                            documents.terms_of_service.file &&
                            documents.terms_of_service.file.name
                              ? "has_file"
                              : !this.state.reUpload16
                              ? "disabled_btn"
                              : ""
                          }
                        >
                          <TierDropzoneStyle
                            accept=".pdf,.doc,.docx"
                            className={
                              documents.terms_of_service &&
                              documents.terms_of_service.file &&
                              documents.terms_of_service.file.name
                                ? "tier_dropzone has_file"
                                : "tier_dropzone"
                            }
                            multiple={false}
                            onDrop={this.onDrop.bind(this, "terms_of_service")}
                            onFileDialogCancel={this.onCancel.bind(this)}
                            disabled={!this.state.reUpload16}
                          >
                            {terms_of_service_flag === null && (
                              <div>
                                <IconS type="upload" />
                                <FileSelectText>Upload</FileSelectText>
                              </div>
                            )}
                            {terms_of_service_flag === false && (
                              <div>
                                <FileSelectText>
                                  Wrong File Selected
                                </FileSelectText>
                              </div>
                            )}
                            {terms_of_service_flag === true && (
                              <div>
                                <FileSelectText>
                                  {documents.terms_of_service.file.name}
                                </FileSelectText>
                              </div>
                            )}
                          </TierDropzoneStyle>
                          {documents.terms_of_service &&
                            documents.terms_of_service.file &&
                            documents.terms_of_service.file.name && (
                              <Icon
                                className="drop_zone_icon"
                                onClick={() => {
                                  let temp = documents;
                                  temp["terms_of_service"] = [];
                                  this.setState({
                                    documents: temp,
                                    terms_of_service_flag: null,
                                  });
                                }}
                                type="close"
                              />
                            )}
                        </TierDropWrap>
                        <SupportText className="tier_support_text">
                          Supported format: .doc, .docx, .pdf.
                        </SupportText>
                        {this.state.reUpload16
                          ? this.validator1.message(
                              "terms_of_service",
                              terms_of_service_flag,
                              "required",
                              "tier-text-danger-validation"
                            )
                          : delete this.validator1.fields["terms_of_service"]}
                      </TierUpload>
                      {this.state.tierData.length > 0 ? (
                        <TierDocBox>
                          {this.state.termsOfServiceStatus === null && (
                            <TierDocStatus>
                              <Icon type="warning" />
                              <span>Under Approval</span>
                            </TierDocStatus>
                          )}
                          {this.state.termsOfServiceStatus === true && (
                            <TierDocStatus>
                              <Icon type="check" />
                              <span>Verified</span>
                            </TierDocStatus>
                          )}
                          {this.state.termsOfServiceStatus === false && (
                            <TierDocStatus>
                              <Icon type="close" />
                              <span>Reupload it</span>
                            </TierDocStatus>
                          )}
                          {this.state.termsOfServiceNote && (
                            <Icon
                              type="message"
                              onClick={() => {
                                this.setState({
                                  reasonPopup: true,
                                  rejectText: this.state.termsOfServiceNote,
                                });
                              }}
                            />
                          )}
                        </TierDocBox>
                      ) : (
                        <TierDocBox></TierDocBox>
                      )}
                    </TierRow>
                    <TierButtonRow>
                      <input
                        type="button"
                        className={
                          this.state.uploadBtnFlag
                            ? "cancel_btn"
                            : "cancel_btn disabled"
                        }
                        disabled={!this.state.uploadBtnFlag}
                        onClick={this.handleCancel.bind(this)}
                        value="Cancel"
                      />
                      <input
                        type="button"
                        className={
                          this.state.uploadBtnFlag
                            ? "upload_btn"
                            : "upload_btn disabled"
                        }
                        onClick={this.handleSubmit.bind(this)}
                        value="Upload"
                        disabled={!this.state.uploadBtnFlag}
                      />
                    </TierButtonRow>

                    <UploadCounter
                      visible={this.state.UploadCounter}
                      upload_flag={this.state.upload_flag}
                      total_file_size={this.state.total_file_size}
                    />
                    <RejectReason
                      visible={this.state.reasonPopup}
                      text={this.state.rejectText}
                      comingCancel={(e) => this.comingCancel(e)}
                    />
                  </TierWrap>
                )}
              </div>
            )}
          </KYCWrap>
        </TierWrapper>
        {this.state.loader === true ? <FaldaxLoader /> : ""}
        <FooterHome />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  // LogoutUser: (isLoggedIn, user_id) => dispatch(LogoutUser(isLoggedIn, user_id))
});
// export default Conversion;
function mapStateToProps(state) {
  return {
    isLoggedIn: state.simpleReducer.isLoggedIn,
    profileDetails:
      state.simpleReducer.profileDetails !== undefined
        ? state.simpleReducer.profileDetails.data !== undefined
          ? state.simpleReducer.profileDetails.data[0]
          : ""
        : "",
    theme:
      state.themeReducer.theme !== undefined ? state.themeReducer.theme : "",
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TierFour));
