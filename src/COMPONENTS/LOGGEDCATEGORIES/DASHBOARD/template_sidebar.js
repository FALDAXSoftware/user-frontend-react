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
  notification
} from "antd";
import { connect } from "react-redux";
import styled from "styled-components";
import { globalVariables } from "../../../Globals";
import { CopyToClipboard } from "react-copy-to-clipboard";
let { API_URL } = globalVariables;

const { Sider } = Layout;
const SidebarHeader = styled.h4`
  font-weight: bold;
  color: ${props => (props.theme.mode === "dark" ? "#fff" : "#000")};
  i.close {
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
    :hover {
      color: ${props => (props.theme.mode === "dark" ? "#fff" : "#000")};
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
    color: ${props => (props.theme.mode === "dark" ? "#fff" : "#000")};
    text-shadow: 0 1px 0 #fff;
    filter: alpha(opacity=20);
    opacity: 0.2;
    :hover {
      color: ${props => (props.theme.mode === "dark" ? "#fff" : "#000")};
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
    color: ${props => (props.theme.mode === "dark" ? "#fff" : "#000")};
    text-shadow: 0 1px 0 #fff;
    filter: alpha(opacity=20);
    opacity: 0.2;
    :hover {
      color: ${props => (props.theme.mode === "dark" ? "#fff" : "#000")};
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
      importLoading: false
    };
  }
  componentDidMount() {
    this.setState({ templates: [...this.props.templates] }, () => {
      if (this.state.templates[this.props.selected]) {
        this.setState({
          templateName: this.state.templates[this.props.selected].title
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
        Authorization: "Bearer " + this.props.isLoggedIn
      },
      body: JSON.stringify({
        layout_data: this.state.templates[this.props.selected]
      })
    })
      .then(response => response.json())
      .then(responseData => {
        if (responseData.status == 200) {
          this.setState({
            link: responseData.data,
            generatingLink: false
          });
        }
      })
      .catch(error => { });
  };
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      this.state.templates != nextProps.templates ||
      this.props.selected != nextProps.selected
    ) {
      this.setState({ templates: [...nextProps.templates] }, () => {
        this.setState({
          templateName: nextProps.templates[this.props.selected].title
        });
      });
    }
  }
  onWidgetCheckChange = (checked, widgetIndex) => {
    let templates = this.state.templates;
    templates[this.props.selected].widgets[widgetIndex].checked = checked;
    this.props.onChange(templates);
  };
  onWidgetDataChange = (value, widgetIndex) => {
    let templates = this.state.templates;
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
        checked: false
      });
    }
    templates.push(newTemplate);
    this.props.onChange(templates);
  };
  onNameChange = e => {
    this.setState({
      templateName: e.target.value
    });
  };
  handleNameInputBlur = e => {
    console.log(e.target.value);
    let templates = [...this.state.templates];
    if (
      e.target.value &&
      this.state.templates[this.props.selected].title != e.target.value
    ) {
      templates[this.props.selected].title = e.target.value;
      this.props.onChange(templates);
    } else {
      this.setState({
        templateName: templates[this.props.selected].title
      });
    }
  };
  changeTab = key => {
    this.setState(
      {
        showTab: key
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
        Authorization: "Bearer " + this.props.isLoggedIn
      },
      body: JSON.stringify({
        code: this.state.code
      })
    })
      .then(response => response.json())
      .then(responseData => {
        if (responseData.status == 200) {
          console.log(responseData);
          if (responseData.data.length) {
            let layout = responseData.data[0].layout_data;
            this.setState(
              {
                code: "",
                importLoading: false,
                showTab: 1
              },
              () => {
                this.props.importTemplate(layout);
              }
            );
          } else {
            notification.error({
              message: "Error",
              description: "Invalid Template Code"
            });
            this.setState({
              importLoading: false
            });
          }
        }
      })
      .catch(error => { });
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
          boxShadow: "-1px 5px 31px -10px rgba(0,0,0,0.53)"
        }}
      >
        <Row>
          <Col span={24}>
            <SidebarHeader>
              Customize
              <Tooltip title="Share / Import Template">
                <Icon
                  type="share-alt"
                  className="share"
                  onClick={() => {
                    if (this.props.isSaved) {
                      this.changeTab(2);
                    } else {
                      notification.error({
                        message: "Error",
                        description: "Save template before share"
                      });
                    }
                  }}
                />
              </Tooltip>
              <Tooltip title="Save">
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
              <Tooltip title="Close">
                <Icon
                  type="close"
                  className="close"
                  onClick={() => {
                    if (!this.props.isSaved) {
                      Modal.confirm({
                        title: "Do you want to close?",
                        content:
                          "This page may contains unsaved work. You will lost all unsaved data.",
                        onOk: () => {
                          this.props.closeEditing();
                        },
                        onCancel: () => { }
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
                  <b>Templates</b>
                </h5>
              </Col>
              <Col span={24}>
                <Select
                  value={this.props.selected}
                  style={{ width: "100%" }}
                  onChange={this.props.onCurrentTemplateChange}
                  dropdownRender={menu => (
                    <div>
                      {menu}
                      <Divider style={{ margin: "4px 0" }} />
                      <div
                        style={{ padding: "4px 8px", cursor: "pointer" }}
                        onMouseDown={e => e.preventDefault()}
                        onClick={this.addNewTemplate}
                      >
                        <Icon type="plus" /> Add item
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
                    message="If you want customized dashboard, create your own."
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
                      <b>Template Name</b>
                    </h5>
                  </Col>
                  <Col span={24}>
                    <Input
                      placeholder="Enter Template Name"
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
                    <b>Widgets</b>
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
                            onChange={checked => {
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
                              onChange={value => {
                                this.onWidgetDataChange(value, index);
                              }}
                              placeholder="Select Pair"
                              disabled={
                                this.state.templates[this.props.selected]
                                  .inbuilt
                              }
                            >
                              {this.props.pairs.map(p => (
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
                    Delete Template
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
                Want to share your{" "}
                <b>{this.state.templates[this.props.selected]?.title}</b>{" "}
                Template with someone?
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
                    Generate Code
                  </Button>
                )}

                {this.state.link && (
                  <Tooltip title={this.state.tooltipTitle}>
                    <CopyToClipboard
                      text={this.state.link}
                      onCopy={() => {
                        this.setState({ tooltipTitle: "copied" });
                        setTimeout(() => {
                          this.setState({ tooltipTitle: "click to copy" });
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
              <Col>Already have template code? Enter here to Import.</Col>
            </Row>
            <Row style={{ marginBottom: "15px" }}>
              <Col>
                <Input
                  value={this.state.code}
                  onChange={e => {
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
                  Import
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
                      generatingLink: false
                    });
                    this.changeTab(1);
                  }}
                >
                  <Icon type="arrow-left" />
                  Back to edit
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
      state.themeReducer.theme !== undefined ? state.themeReducer.theme : ""
  };
}

export default connect(mapStateToProps)(TemplateSideBar);
