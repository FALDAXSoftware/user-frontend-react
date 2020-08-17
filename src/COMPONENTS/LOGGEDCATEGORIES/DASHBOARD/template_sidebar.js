import React, { Component } from "react";
import {
  Layout,
  Row,
  Col,
  Select,
  Divider,
  Icon,
  Switch,
  Input,
  Alert,
  Tooltip,
  Button,
  Modal,
  notification,
} from "antd";
import { connect } from "react-redux";
import styled from "styled-components";
import { globalVariables } from "../../../Globals";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { translate } from "react-i18next";
let { API_URL } = globalVariables;

const { Sider } = Layout;
const SidebarHeader = styled.h4`
  font-weight: bold;
  color: ${(props) => (props.theme.mode === "dark" ? "#fff" : "#000")};
  i.close {
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
    :hover {
      color: ${(props) => (props.theme.mode === "dark" ? "#fff" : "#000")};
    }
  }
  i.save {
    position: absolute;
    top: 0;
    right: 30px;
    cursor: pointer;
    float: right;
    font-size: 21px;
    font-weight: 700;
    line-height: 1;
    color: ${(props) => (props.theme.mode === "dark" ? "#fff" : "#000")};
    text-shadow: 0 1px 0 #fff;
    filter: alpha(opacity=20);
    opacity: 0.2;
    :hover {
      color: ${(props) => (props.theme.mode === "dark" ? "#fff" : "#000")};
      text-decoration: none;
      cursor: pointer;
      filter: alpha(opacity=50);
      opacity: 0.5;
    }
  }
  i.share {
    position: absolute;
    top: 0;
    right: 60px;
    cursor: pointer;
    float: right;
    font-size: 21px;
    font-weight: 700;
    line-height: 1;
    color: ${(props) => (props.theme.mode === "dark" ? "#fff" : "#000")};
    text-shadow: 0 1px 0 #fff;
    filter: alpha(opacity=20);
    opacity: 0.2;
    :hover {
      color: ${(props) => (props.theme.mode === "dark" ? "#fff" : "#000")};
      text-decoration: none;
      cursor: pointer;
      filter: alpha(opacity=50);
      opacity: 0.5;
    }
  }
`;
const ExportIcon = styled(Icon)`
  // cursor:pointer;
  // font-size: 21px;
  // font-weight: 700;
  // line-height: 1;
  // color: #000;
  // text-shadow: 0 1px 0 #fff;
  // filter: alpha(opacity=20);
  // opacity: .2;
  // :hover {
  //     color: #000;
  //     text-decoration: none;
  //     cursor: pointer;
  //     filter: alpha(opacity=50);
  //     opacity: .5;
  // }
`;
const CopyLinkButton = styled(Button)`
  span {
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  }
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
class TemplateSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      templates: [],
      templateName: "",
      showTab: 1,
      link: "",
      generatingLink: false,
      tooltipTitle: "click to copy",
      code: "",
      importLoading: false,
    };
    this.t = this.props.t;
  }
  componentDidMount() {
    this.setState({ templates: [...this.props.templates] }, () => {
      if (this.state.templates[this.props.selected]) {
        this.setState({
          templateName: this.state.templates[this.props.selected].title,
        });
      }
    });
  }
  generateCode = () => {
    this.setState({ generatingLink: true });
    fetch(API_URL + `/users/add-sharebale-code`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Accept-Language": localStorage["i18nextLng"],
        Authorization: "Bearer " + this.props.isLoggedIn,
      },
      body: JSON.stringify({
        layout_data: this.state.templates[this.props.selected],
      }),
    })
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.status == 200) {
          this.setState({
            link: responseData.data,
            generatingLink: false,
          });
        }
      })
      .catch((error) => {});
  };
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      this.state.templates != nextProps.templates ||
      this.props.selected != nextProps.selected
    ) {
      this.setState({ templates: [...nextProps.templates] }, () => {
        this.setState({
          templateName: nextProps.templates[this.props.selected].title,
        });
      });
    }
  }
  onWidgetCheckChange = (checked, widgetIndex) => {
    let templates = [...this.state.templates];
    templates[this.props.selected].widgets[widgetIndex].checked = checked;
    this.props.onChange(templates);
  };
  onWidgetDataChange = (value, widgetIndex) => {
    let templates = [...this.state.templates];
    templates[this.props.selected].widgets[widgetIndex].data = value;
    this.props.onChange(templates);
  };
  addNewTemplate = () => {
    let newTemplate = {};
    let templates = [...this.state.templates];
    newTemplate["widgets"] = [];
    newTemplate["layouts"] = {};
    newTemplate["title"] = "Untitled Template";
    newTemplate["inbuilt"] = false;
    for (
      let index = 0;
      index < this.state.templates[0].widgets.length;
      index++
    ) {
      const w = this.state.templates[0].widgets[index];
      newTemplate["widgets"].push({
        ...w,
        data: [],
        checked: false,
      });
    }
    templates.push(newTemplate);
    this.props.onChange(templates);
  };
  onNameChange = (e) => {
    this.setState({
      templateName: e.target.value,
    });
  };
  handleNameInputBlur = (e) => {
    let templates = [...this.state.templates];
    if (
      e.target.value &&
      this.state.templates[this.props.selected].title != e.target.value
    ) {
      templates[this.props.selected].title = e.target.value;
      this.props.onChange(templates);
    } else {
      this.setState({
        templateName: templates[this.props.selected].title,
      });
    }
  };
  changeTab = (key) => {
    this.setState(
      {
        showTab: key,
      },
      () => {
        this.props.onTabChange(key);
      }
    );
  };
  onImport = () => {
    this.setState({ importLoading: true });
    fetch(API_URL + `/users/get-shareable-code `, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Accept-Language": localStorage["i18nextLng"],
        Authorization: "Bearer " + this.props.isLoggedIn,
      },
      body: JSON.stringify({
        code: this.state.code,
      }),
    })
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.status == 200) {
          if (responseData.data.length) {
            let layout = responseData.data[0].layout_data;
            this.setState(
              {
                code: "",
                importLoading: false,
                showTab: 1,
              },
              () => {
                this.props.importTemplate(layout);
              }
            );
          } else {
            notification.error({
              message: this.t("validations:error_text.message"),
              description: this.t("invalid_template_code_error.message"),
            });
            this.setState({
              importLoading: false,
            });
          }
        }
      })
      .catch((error) => {});
  };
  render() {
    return (
      <Sider
        width={250}
        style={{
          transition: "all 1s ease",
          background: "#fff",
          marginTop: "90px",
          marginBottom: "10px",
          padding: "30px 20px",
          boxShadow: "-1px 5px 31px -10px rgba(0,0,0,0.53)",
        }}
      >
        <Row>
          <Col span={24}>
            <SidebarHeader>
              {this.t("customize_text.message")}
              <Tooltip title={this.t("share_import_template_text.message")}>
                <Icon
                  type="share-alt"
                  className="share"
                  onClick={() => {
                    if (this.props.isSaved) {
                      this.changeTab(2);
                    } else {
                      notification.error({
                        message: this.t("validations:error_text.message"),
                        description: this.t("save_before_share_error.message"),
                      });
                    }
                  }}
                />
              </Tooltip>
              <Tooltip
                title={this.t(
                  "edit_profile_titles:subhead_personal_form_save_btn.message"
                )}
              >
                <Icon
                  type={this.props.isSaving ? "loading" : "save"}
                  className="save"
                  onClick={() => {
                    if (!this.props.isSaving && !this.props.isSaved) {
                      this.props.onSave();
                    }
                  }}
                />
              </Tooltip>
              <Tooltip title={this.t("close_text.message")}>
                <Icon
                  type="close"
                  className="close"
                  onClick={() => {
                    if (!this.props.isSaved) {
                      Modal.confirm({
                        title: `${this.t(
                          "close_template_before_save.message"
                        )}`,
                        content: `${this.t("unsave_data_popup_desc.message")}`,
                        onOk: () => {
                          this.props.closeEditing();
                        },
                        onCancel: () => {},
                      });
                    } else {
                      this.props.closeEditing();
                    }
                  }}
                />
              </Tooltip>
            </SidebarHeader>
          </Col>
        </Row>
        <Divider style={{ margin: "4px 0 24px" }} />
        {this.state.showTab == 1 && (
          <>
            <Row gutter={16} style={{ marginBottom: "15px" }}>
              <Col span={24}>
                <h5>
                  <b>{this.t("templates_text.message")}</b>
                </h5>
              </Col>
              <Col span={24}>
                <Select
                  value={this.props.selected}
                  style={{ width: "100%" }}
                  onChange={this.props.onCurrentTemplateChange}
                  dropdownRender={(menu) => (
                    <div>
                      {menu}
                      <Divider style={{ margin: "4px 0" }} />
                      <div
                        style={{ padding: "4px 8px", cursor: "pointer" }}
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={this.addNewTemplate}
                      >
                        <Icon type="plus" /> {this.t("add_item_text.message")}
                      </div>
                    </div>
                  )}
                >
                  {this.state.templates.map((t, index) => (
                    <Select.Option value={index}>{t.title}</Select.Option>
                  ))}
                </Select>
              </Col>
            </Row>
            {this.state.templates[this.props.selected]?.inbuilt && (
              <Row style={{ marginBottom: "15px" }}>
                <Col>
                  <Alert
                    message={this.t("note_template_text.message")}
                    type="info"
                    // showIcon
                  />
                </Col>
              </Row>
            )}
            {this.state.templates[this.props.selected] &&
              !this.state.templates[this.props.selected].inbuilt && (
                <Row gutter={16} style={{ marginBottom: "15px" }}>
                  <Col span={24}>
                    <h5>
                      <b>{this.t("template_label.message")}</b>
                    </h5>
                  </Col>
                  <Col span={24}>
                    <Input
                      placeholder={this.t("template_name_placeholder.message")}
                      value={this.state.templateName}
                      onChange={this.onNameChange}
                      onBlur={this.handleNameInputBlur}
                      onPressEnter={this.handleNameInputBlur}
                    />
                  </Col>
                </Row>
              )}
            {this.state.templates[this.props.selected] && (
              <Row gutter={16}>
                <Col span={24}>
                  <h5>
                    <b>{this.t("widgets_text.message")}</b>
                  </h5>
                </Col>
                <Col span={24}>
                  {this.state.templates[this.props.selected].widgets.map(
                    (w, index) => (
                      <Row
                        style={{ marginBottom: "20px" }}
                        type="flex"
                        align="middle"
                      >
                        <Col span={6}>
                          <Switch
                            disabled={
                              this.state.templates[this.props.selected].inbuilt
                            }
                            checked={w.checked}
                            onChange={(checked) => {
                              this.onWidgetCheckChange(checked, index);
                            }}
                          ></Switch>
                        </Col>
                        <Col span={18}>{w.name}</Col>
                        {w.checked && w.multiple && (
                          <Col span={24}>
                            <Select
                              value={w.data}
                              mode="multiple"
                              style={{ width: "100%", marginTop: "10px" }}
                              onChange={(value) => {
                                this.onWidgetDataChange(value, index);
                              }}
                              placeholder={this.t(
                                "select_pair_placeholder.message"
                              )}
                              disabled={
                                this.state.templates[this.props.selected]
                                  .inbuilt
                              }
                            >
                              {this.props.pairs.map((p) => (
                                <Select.Option key={p.name}>
                                  {p.name}
                                </Select.Option>
                              ))}
                            </Select>
                          </Col>
                        )}
                      </Row>
                    )
                  )}
                </Col>
              </Row>
            )}
            {!this.state.templates[this.props.selected]?.inbuilt && (
              <Row style={{ marginBottom: "15px" }}>
                <Col>
                  <Button
                    type="danger"
                    icon="delete"
                    style={{ width: "100%", textAlign: "center" }}
                    onClick={this.props.deleteTemplate}
                  >
                    {this.t("delete_template_btn.message")}
                  </Button>
                </Col>
              </Row>
            )}
          </>
        )}
        {this.state.showTab == 2 && (
          <>
            <Row style={{ marginBottom: "15px" }}>
              <Col>
                {this.t("want_to_share_text.message")}{" "}
                <b>{this.state.templates[this.props.selected]?.title}</b>{" "}
                {this.t("template_with_text.message")}
              </Col>
            </Row>
            <Row style={{ marginBottom: "15px" }}>
              <Col>
                {!this.state.link && (
                  <Button
                    type="primary"
                    style={{ width: "100%", textAlign: "center" }}
                    loading={this.state.generatingLink}
                    onClick={this.generateCode}
                  >
                    {this.t("generate_code_btn.message")}
                  </Button>
                )}

                {this.state.link && (
                  <Tooltip title={this.state.tooltipTitle}>
                    <CopyToClipboard
                      text={this.state.link}
                      onCopy={() => {
                        this.setState({
                          tooltipTitle: `${this.t("copied_text.message")}`,
                        });
                        setTimeout(() => {
                          this.setState({
                            tooltipTitle: `${this.t(
                              "click_to_copy_text.message"
                            )}`,
                          });
                        }, 3000);
                      }}
                    >
                      <CopyLinkButton type="dashed" style={{ width: "100%" }}>
                        {this.state.link}
                      </CopyLinkButton>
                    </CopyToClipboard>
                  </Tooltip>
                )}
              </Col>
            </Row>
            <Divider style={{ margin: "24px 0 24px" }} />

            <Row style={{ marginBottom: "15px" }}>
              <Col>{this.t("already_have_template_code_text.message")}</Col>
            </Row>
            <Row style={{ marginBottom: "15px" }}>
              <Col>
                <Input
                  value={this.state.code}
                  onChange={(e) => {
                    this.setState({ code: e.target.value });
                  }}
                />
              </Col>
            </Row>
            <Row style={{ marginBottom: "15px", textAlign: "center" }}>
              <Col>
                <Button
                  type="primary"
                  loading={this.state.importLoading}
                  disabled={!this.state.code}
                  onClick={this.onImport}
                >
                  {this.t("import_text.message")}
                </Button>
              </Col>
            </Row>
            <Row type="flex">
              <Col>
                <Button
                  type="link"
                  onClick={() => {
                    this.setState({
                      link: "",
                      generatingLink: false,
                    });
                    this.changeTab(1);
                  }}
                >
                  <Icon type="arrow-left" />
                  {this.t("back_to_edit_text.message")}
                </Button>
              </Col>
            </Row>
          </>
        )}
      </Sider>
    );
  }
}
function mapStateToProps(state) {
  return {
    isLoggedIn: state.simpleReducer.isLoggedIn,
    profileDetails:
      state.simpleReducer.profileDetails !== undefined
        ? state.simpleReducer.profileDetails.data[0]
        : "",
    theme:
      state.themeReducer.theme !== undefined ? state.themeReducer.theme : "",
  };
}

export default translate(["dashboard", "validations", "edit_profile_titles"])(
  connect(mapStateToProps)(TemplateSideBar)
);
