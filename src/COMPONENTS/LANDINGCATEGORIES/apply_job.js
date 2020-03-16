import React, { Component } from "react";
import "antd/dist/antd.css";
import { Row, Col, notification } from "antd";
// import { ReCaptcha } from "react-recaptcha-google";
import { ReCaptcha, loadReCaptcha } from "react-recaptcha-v3";
import { translate } from "react-i18next";
import styled from "styled-components";
import SimpleReactValidator from "simple-react-validator";
import Navigation from "COMPONENTS/NAVIGATIONS/loggednavigation";
import FaldaxLoader from "SHARED-COMPONENTS/FaldaxLoader";
import CommonFooter from "COMPONENTS/LANDING/FOOTERS/footer_home";
import { Container } from "STYLED-COMPONENTS/HOMEPAGE/style";
import {
  ContactWrap,
  GreyWrap,
  HeadContact,
  HeadApply,
  ApplyWrap,
  TitleApply,
  TitleSpan,
  FormApply,
  LeftWing,
  LabelOne,
  InputOne,
  RightWing,
  InputTwo,
  InputThree,
  Gap,
  BtnApply,
  FileSelectText,
  DropzoneStyle,
  IconS
} from "STYLED-COMPONENTS/LANDING_CATEGORIES/contactStyle";
import { globalVariables } from "Globals.js";

let { API_URL, GOOGLE_SITE_KEY } = globalVariables;

export const ContainerContact = styled(Container)`
  background-color: ${props =>
    props.theme.mode === "dark" ? "#041422" : "white"};
  border-radius: 5px;
  padding-right: 30px;
  padding-left: 30px;
  padding-bottom: 30px;
`;
const HeadContact2 = styled(HeadContact)`
  padding-top: 20px;
`;
const CareerTitle = styled.span`
  font-size: 40px;
  font-family: "Open sans";
  font-weight: bold;
  display: block;
  text-align: center;
  color: ${props => (props.theme.mode === "dark" ? "white" : "")};
  &:before {
    content: "";
    width: calc(50% - 140px);
    height: 1px;
    display: inline-block;
    background: #827777;
    position: absolute;
    left: 0;
    top: calc(50% - 1px);
  }
  &:after {
    content: "";
    width: calc(50% - 140px);
    height: 1px;
    display: inline-block;
    background: #827777;
    position: absolute;
    right: 0;
    top: calc(50% - 1px);
  }
  @media (max-width: 767px) {
    &:before {
      display: none;
    }
    &:after {
      display: none;
    }
  }
`;

export const CarrerHead = styled.div`
  display: inline-block;
  width: 100%;
  position: relative;
  margin-bottom: 20px;
`;

export const SupportText = styled.span`
  font-size: 12px;
  font-family: Open Sans;
  color: rgb(128, 128, 128);
  font-style: italic;
`;

class ApplyJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      flag_drop: null,
      cover_flag: null,
      fields: {
        first_name: "",
        last_name: "",
        email: "",
        position: "",
        phone_number: "",
        resume: [],
        cover_letter: [],
        linkedin_profile: "",
        website_url: "",
        loader: false,
        position_flag: null,
        coverLimit: null,
        resumeLimit: null,
        recaptchaToken: null,
        loadCaptch: false
      }
    };
    this._onChangeFields = this._onChangeFields.bind(this);
    this.onLoadRecaptcha = this.onLoadRecaptcha.bind(this);
    this.verifyCallback = this.verifyCallback.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    let self = this;
    this.t = this.props.t;
    this.validator = new SimpleReactValidator({
      resumeRequired: {
        // name the rule
        message: this.t("general_3:resume_field_required.message"), // give a message that will display when there is an error. :attribute will be replaced by the name you supply in calling it.
        rule: function(val, options) {
          // return true if it is succeeds and false it if fails validation. the _testRegex method is available to give back a true/false for the regex and given value
          // check that it is a valid IP address and is not blacklisted
          if (self.state.flag_drop === null) {
            return false;
          }
          return true;
        }
      },
      resumeValid: {
        // name the rule
        message: this.t("general_3:resume_not_valid.message"), // give a message that will display when there is an error. :attribute will be replaced by the name you supply in calling it.
        rule: function(val, options) {
          // return true if it is succeeds and false it if fails validation. the _testRegex method is available to give back a true/false for the regex and given value
          // check that it is a valid IP address and is not blacklisted
          if (self.state.flag_drop === false) {
            return false;
          }
          return true;
        }
      },
      coverValid: {
        // name the rule
        message: this.t("general_3:cover_filed_not_valid.message"), // give a message that will display when there is an error. :attribute will be replaced by the name you supply in calling it.
        rule: function(val, options) {
          // return true if it is succeeds and false it if fails validation. the _testRegex method is available to give back a true/false for the regex and given value
          // check that it is a valid IP address and is not blacklisted
          if (self.state.cover_flag === false) {
            return false;
          }
          return true;
        }
      },
      validEmail: {
        // name the rule
        message: this.t("validations:invalid_email_error.message"), // give a message that will display when there is an error. :attribute will be replaced by the name you supply in calling it.
        rule: function(val, options) {
          // return true if it is succeeds and false it if fails validation. the _testRegex method is available to give back a true/false for the regex and given value
          // check that it is a valid IP address and is not blacklisted
          var re = /^[-a-zA-Z0-9~!$%^&*_=+}{\'?]+(\.[-a-zA-Z0-9~!$%^&*_=+}{\'?]+)*@([a-zA-Z0-9_][-a-zA-Z0-9_]*(\.[-a-zA-Z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|AERO|ARPA|BIZ|COM|COOP|EDU|GOV|INFO|INT|MIL|MUSEUM|NAME|NET|ORG|PRO|TRAVEL|MOBI|[a-zA-Z][a-zA-Z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/;
          var bool = re.test(String(val).toLowerCase());
          return bool;
        }
      },
      coverLimit: {
        message: this.t("validations:file_size_3_mb.message"), // give a message that will display when there is an error. :attribute will be replaced by the name you supply in calling it.
        rule: function(val, options) {
          // return true if it is succeeds and false it if fails validation. the _testRegex method is available to give back a true/false for the regex and given value
          // check that it is a valid IP address and is not blacklisted
          if (self.state.coverLimit === false) {
            return false;
          }
          return true;
        }
      },
      resumeLimit: {
        message: this.t("validations:file_size_3_mb.message"), // give a message that will display when there is an error. :attribute will be replaced by the name you supply in calling it.
        rule: function(val, options) {
          // return true if it is succeeds and false it if fails validation. the _testRegex method is available to give back a true/false for the regex and given value
          // check that it is a valid IP address and is not blacklisted
          if (self.state.resumeLimit === false) {
            return false;
          }
          return true;
        }
      },
      websiteurl: {
        // name the rule
        message: this.t("validations:valid_website_url_error.message"), // give a message that will display when there is an error. :attribute will be replaced by the name you supply in calling it.
        rule: function(val, options) {
          // return true if it is succeeds and false it if fails validation. the _testRegex method is available to give back a true/false for the regex and given value
          // check that it is a valid IP address and is not blacklisted
          if (val != "") {
            var re = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
            var bool = re.test(String(val).toLowerCase());
            return bool;
          }
        }
      },
      linkedinurl: {
        // name the rule
        message: this.t("validations:valid_linkedin_url_error.message"), // give a message that will display when there is an error. :attribute will be replaced by the name you supply in calling it.
        rule: function(val, options) {
          // return true if it is succeeds and false it if fails validation. the _testRegex method is available to give back a true/false for the regex and given value
          // check that it is a valid IP address and is not blacklisted
          if (val != "") {
            var re = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
            var bool = re.test(String(val).toLowerCase());
            return bool;
          }
        }
      }
    });
  }

  /* Life Cycle Method */
  componentDidMount() {
    loadReCaptcha(GOOGLE_SITE_KEY);

    this.onLoadRecaptcha();
    // if (this.captchaDemo) {
    //   this.captchaDemo.reset();
    //   this.captchaDemo.execute();
    // }
    if (this.props.location.search) {
      var arr = decodeURI(this.props.location.search).split("&");
      var arr2 = arr[1].split("=");
      this.setState({ position_flag: arr2[1] });
    }
  }
  onDrop(type, files) {
    if (type === "res") {
      let flag = false,
        flagLimit = false;
      if (files.length > 0) {
        flag = true;
        if (files[0].size <= 3000000) {
          flagLimit = true;
        }
      }
      this.setState({
        flag_drop: flag,
        resumeLimit: flagLimit,
        fields: { ...this.state.fields, resume: files[0] }
      });
    } else {
      let flag = false,
        flagLimit = false;
      if (files.length > 0) {
        flag = true;
        if (files[0].size <= 3000000) {
          flagLimit = true;
        }
      }
      this.setState({
        cover_flag: flag,
        coverLimit: flagLimit,
        fields: { ...this.state.fields, cover_letter: files[0] }
      });
    }
  }

  /*  
        Page:/applyjob
        This method is called when we press cancel.
    */

  onCancel() {
    this.setState({ files: [] });
  }

  /*  
        Page:/applyjob
        This method is called when we change fields.
    */

  _onChangeFields(e) {
    let fields = this.state.fields;
    let field = e.target.name;

    if (e.target.value.trim() === "") {
      fields[field] = "";
    } else {
      fields[field] = e.target.value;
    }
    this.setState({ fields });
  }

  /*  
        Page:/applyjob
        This method is called for custom notifications.
    */

  openNotificationWithIcon(type, head, desc) {
    notification[type]({
      message: head,
      description: desc,
      duration: 5
    });
  }

  /*  
        Page:/applyjob
        This method is called when you submit the form.
    */

  onSubmit() {
    var self = this;
    if (this.validator.allValid()) {
      if (this.state.recaptchaToken != null) {
        let jobID;
        if (this.props.location.search) {
          var arr = decodeURI(this.props.location.search).split("&");
          var arr2 = arr[0].split("=");
          jobID = arr2[1];
        }
        let formdata = new FormData();
        formdata.append("first_name", this.state.fields["first_name"]);
        formdata.append("last_name", this.state.fields["last_name"]);
        formdata.append("email", this.state.fields["email"]);
        formdata.append("phone_number", this.state.fields["phone_number"]);
        formdata.append("position", this.state.position_flag);
        formdata.append("website_url", this.state.fields["website_url"]);
        formdata.append(
          "linkedin_profile",
          this.state.fields["linkedin_profile"]
        );
        formdata.append("job_id", jobID);
        formdata.append("cover_letter", this.state.fields["cover_letter"]);
        formdata.append("resume", this.state.fields["resume"]);
        formdata.append("g_recaptcha_response", this.state.recaptchaToken);
        this.setState({ loader: true });
        fetch(API_URL + "/apply-job", {
          method: "post",
          body: formdata
        })
          .then(response => response.json())
          .then(responseData => {
            this.openNotificationWithIcon(
              "success",
              this.t("general_3:job_applied_text.message"),
              responseData.message
            );
            let fields = {};
            fields["last_name"] = "";
            fields["first_name"] = "";
            fields["email"] = "";
            fields["phone_number"] = "";
            fields["resume"] = "";
            fields["website_url"] = "";
            fields["cover_letter"] = "";
            fields["linkedin_profile"] = "";

            this.setState(
              {
                fields: fields,
                flag_drop: null,
                cover_flag: null,
                loader: false,
                recaptchaToken: null
              },
              () => {
                this.validator.hideMessages();
                this.forceUpdate();
                this.onLoadRecaptcha();
                // self.captchaDemo.reset();
                // self.captchaDemo.execute();
              }
            );
          })
          .catch(error => {});
      } else {
        this.openNotificationWithIcon(
          "error",
          this.t("validations:error_text.message"),
          this.t("login_page:robot_error_text.message")
        );
      }
    } else {
      this.validator.showMessages();
      // rerender to show messages for the first time
      this.forceUpdate();
    }
  }

  /*  
        Page:/applyjob
        This method is called to load recaptcha.
    */

  onLoadRecaptcha() {
    loadReCaptcha(GOOGLE_SITE_KEY);
    this.setState(
      {
        loadCaptch: false
      },
      () => {
        this.setState({
          loadCaptch: true
        });
      }
    );
  }

  /*  
        Page:/applyjob
        This method is called to verify recaptcha.
    */
  unload = () => {
    const nodeBadges = document.querySelectorAll(".grecaptcha-badge");
    nodeBadges.forEach((e, index) => {
      if (e.getAttribute("data-style") != "none") {
        document.body.removeChild(e.parentNode);
      }
    });
  };
  componentWillUnmount() {
    this.unload();
  }
  verifyCallback(recaptchaToken) {
    // Here you will get the final recaptchaToken!!!
    // console.log(recaptchaToken, "<= your recaptcha token");
    this.setState({
      recaptchaToken
    });
  }
  render() {
    const { position_flag, fields, flag_drop, cover_flag } = this.state;
    return (
      <ContactWrap>
        <Navigation />
        <GreyWrap>
          <ContainerContact>
            <HeadContact2>
              <CarrerHead>
                <CareerTitle>{this.t("careers_head.message")} </CareerTitle>
              </CarrerHead>
              <ApplyWrap>
                <TitleApply>
                  {position_flag !== null ? (
                    <TitleSpan>{position_flag}</TitleSpan>
                  ) : (
                    ""
                  )}
                </TitleApply>
                <FormApply>
                  <Row>
                    <Col sm={24} md={12}>
                      <LeftWing>
                        <LabelOne>
                          {this.t(
                            "edit_profile_titles:subhead_personal_form_first_name.message"
                          )}
                          *
                        </LabelOne>
                        <InputOne
                          name="first_name"
                          onChange={this._onChangeFields}
                          value={fields.first_name}
                        />
                        {this.validator.message(
                          "first_name",
                          fields.first_name,
                          "required|alpha_num|max:30",
                          "text-danger-validation",
                          {
                            required:
                              this.t(
                                "edit_profile_titles:subhead_personal_form_first_name.message"
                              ) +
                              " " +
                              this.t("validations:field_is_required.message"),
                            alpha_num:
                              this.t(
                                "edit_profile_titles:subhead_personal_form_first_name.message"
                              ) +
                              " " +
                              this.t("general_3:validate_latter.message"),
                            max:
                              this.t(
                                "edit_profile_titles:subhead_personal_form_first_name.message"
                              ) +
                              " " +
                              this.t("general_3:validate_not_gt_30_ch.message")
                          }
                        )}
                      </LeftWing>
                    </Col>
                    <Col sm={24} md={12}>
                      <RightWing>
                        <LabelOne>
                          {this.t(
                            "edit_profile_titles:subhead_personal_form_last_name.message"
                          )}
                          *
                        </LabelOne>
                        <InputTwo
                          name="last_name"
                          onChange={this._onChangeFields}
                          value={fields.last_name}
                        />
                        {this.validator.message(
                          "last_name",
                          fields.last_name,
                          "required|alpha_num|max:30",
                          "text-danger-validation",
                          {
                            required:
                              this.t(
                                "edit_profile_titles:subhead_personal_form_last_name.message"
                              ) +
                              " " +
                              this.t("validations:field_is_required.message"),
                            alpha_num:
                              this.t(
                                "edit_profile_titles:subhead_personal_form_last_name.message"
                              ) +
                              " " +
                              this.t("general_3:validate_latter.message"),
                            max:
                              this.t(
                                "edit_profile_titles:subhead_personal_form_last_name.message"
                              ) +
                              " " +
                              this.t("general_3:validate_not_gt_30_ch.message")
                          }
                        )}
                      </RightWing>
                    </Col>
                  </Row>
                  <Gap>
                    <Row>
                      <Col sm={24} md={12}>
                        <LeftWing>
                          <LabelOne>
                            {this.t("apply_job:position_label.message")}*
                          </LabelOne>
                          <InputOne
                            disabled
                            name="position"
                            value={position_flag}
                          />
                        </LeftWing>
                      </Col>
                      <Col sm={24} md={12}>
                        <RightWing>
                          <LabelOne>
                            {this.t("apply_job:phone_label.message")}*
                          </LabelOne>
                          <InputTwo
                            name="phone_number"
                            onChange={this._onChangeFields}
                            value={fields.phone_number}
                          />
                          {this.validator.message(
                            "phone_number",
                            fields.phone_number,
                            "required|integer|min:10|max:15",
                            "text-danger-validation",
                            {
                              required:
                                this.t("apply_job:phone_label.message") +
                                " " +
                                this.t("validations:field_is_required.message"),
                              integer: this.t(
                                "general_3:validate_should_number.message"
                              ),
                              min:
                                this.t("apply_job:phone_label.message") +
                                " " +
                                this.t(
                                  "general_3:validate_not_less_10.message"
                                ),
                              max:
                                this.t("apply_job:phone_label.message") +
                                " " +
                                this.t("general_3:validate_not_gt_15.message")
                            }
                          )}
                        </RightWing>
                      </Col>
                    </Row>
                  </Gap>
                  <Gap>
                    <Row>
                      <Col sm={24} md={24}>
                        <LabelOne>
                          {this.t("security_tab:subhead_title_email.message")}*
                        </LabelOne>
                        <InputThree
                          name="email"
                          onChange={this._onChangeFields}
                          value={fields.email}
                        />
                        {this.validator.message(
                          "email",
                          fields.email,
                          "required|validEmail",
                          "text-danger-validation",
                          {
                            required:
                              this.t(
                                "security_tab:subhead_title_email.message"
                              ) +
                              " " +
                              this.t("validations:field_is_required.message")
                          }
                        )}
                      </Col>
                    </Row>
                  </Gap>
                  <Gap>
                    <Row>
                      <Col sm={24} md={24}>
                        <LabelOne>
                          {this.t("apply_job:resume_cv_label.message")}*
                        </LabelOne>
                        <DropzoneStyle
                          accept=".pdf,.doc,.docx"
                          className="Dropzone_apply"
                          onDrop={this.onDrop.bind(this, "res")}
                          onFileDialogCancel={this.onCancel.bind(this)}
                        >
                          {flag_drop === null && (
                            <div>
                              <IconS type="download" />
                              <FileSelectText>
                                {this.t("apply_job:choose_file_text.message")}
                              </FileSelectText>
                            </div>
                          )}
                          {flag_drop === false && (
                            <div>
                              <IconS type="close-square" />
                              <FileSelectText>
                                {this.t("apply_job:wrong_file_text.message")}
                              </FileSelectText>
                            </div>
                          )}
                          {flag_drop === true && (
                            <div>
                              <IconS type="check-square" />
                              <FileSelectText>
                                {fields.resume.name}
                              </FileSelectText>
                            </div>
                          )}
                        </DropzoneStyle>
                        <SupportText>
                          {this.t("apply_job:supported_formats_text.message")}
                        </SupportText>
                        {this.validator.message(
                          "resume",
                          flag_drop,
                          "resumeRequired|resumeValid|resumeLimit",
                          "text-danger-validation"
                        )}
                      </Col>
                    </Row>
                  </Gap>
                  <Gap>
                    <Row>
                      <Col sm={24} md={24}>
                        <LabelOne>
                          {this.t("general_3:cover_latter_text")}
                        </LabelOne>
                        <DropzoneStyle
                          accept=".pdf,.doc,.docx"
                          className="Dropzone_apply"
                          onDrop={this.onDrop.bind(this, "cover")}
                          onFileDialogCancel={this.onCancel.bind(this)}
                        >
                          {cover_flag === null && (
                            <div>
                              <IconS type="download" />
                              <FileSelectText>
                                {this.t("apply_job:choose_file_text.message")}
                              </FileSelectText>
                            </div>
                          )}
                          {cover_flag === false && (
                            <div>
                              <IconS type="close-square" />
                              <FileSelectText>
                                {this.t("apply_job:wrong_file_text.message")}
                              </FileSelectText>
                            </div>
                          )}
                          {cover_flag === true && (
                            <div>
                              <IconS type="check-square" />
                              <FileSelectText>
                                {fields.cover_letter.name}
                              </FileSelectText>
                            </div>
                          )}
                        </DropzoneStyle>
                        <SupportText>
                          {this.t("apply_job:supported_formats_text.message")}
                        </SupportText>
                        {this.validator.message(
                          "cover",
                          cover_flag,
                          "coverValid|coverLimit",
                          "text-danger-validation"
                        )}
                      </Col>
                    </Row>
                  </Gap>
                  <Gap>
                    <Row>
                      <Col sm={24} md={24}>
                        <LabelOne>
                          {this.t("apply_job:linkedin_label.message")}*
                        </LabelOne>
                        <InputThree
                          name="linkedin_profile"
                          onChange={this._onChangeFields}
                          value={this.state.fields.linkedin_profile}
                        />
                        {this.validator.message(
                          "linkedin_profile",
                          this.state.fields.linkedin_profile,
                          "required|linkedinurl",
                          "text-danger-validation",
                          {
                            required:
                              this.t("apply_job:linkedin_label.message") +
                              " " +
                              this.t("validations:field_is_required.message")
                          }
                        )}
                      </Col>
                    </Row>
                  </Gap>
                  <Gap>
                    <Row>
                      <Col sm={24} md={24}>
                        <LabelOne>
                          {this.t("apply_job:website_label.message")}
                        </LabelOne>
                        <InputThree
                          name="website_url"
                          onChange={this._onChangeFields}
                          value={this.state.fields.website_url}
                        />
                        {this.validator.message(
                          "website_url",
                          this.state.fields.website_url,
                          "websiteurl",
                          "text-danger-validation"
                        )}
                      </Col>
                    </Row>
                  </Gap>
                  {this.state.loadCaptch && (
                    <ReCaptcha
                      sitekey={GOOGLE_SITE_KEY}
                      verifyCallback={this.verifyCallback}
                    />
                  )}
                  <BtnApply onClick={this.onSubmit}>
                    {this.t("settings:submit_btn.message")}
                  </BtnApply>
                </FormApply>
              </ApplyWrap>
            </HeadContact2>
          </ContainerContact>
        </GreyWrap>
        <CommonFooter />
        {this.state.loader ? <FaldaxLoader /> : ""}
      </ContactWrap>
    );
  }
}

export default translate([
  "general",
  "validations",
  "support",
  "settings",
  "general_3",
  "conversion",
  "login_page",
  "apply_job",
  "security_tab",
  "edit_profile_titles"
])(ApplyJob);
