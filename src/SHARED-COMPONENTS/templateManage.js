import React from "react";
import "antd/dist/antd.css";
import {
  Modal,
  Icon,
  notification,
  Tabs,
  Checkbox,
  Select,
  Switch,
  Alert,
  Row,
  Col
} from "antd";
import { withRouter } from "react-router-dom";
import { globalVariables } from "../Globals.js";
import { _COMINGIMG, _COMINGIMG2 } from "CONSTANTS/images";
import {
  ModalWrap,
  TemplateTabPane,
  TemplatePairSelect,
  SaveBtn,
  TempName
} from "STYLED-COMPONENTS/SHARED-STYLES/sharedStyle";
import {
  TemplateTab,
  WidgetName,
  TempRow
} from "../STYLED-COMPONENTS/SHARED-STYLES/sharedStyle";
import NumberFormat from "react-number-format";
// import { translate } from "react-i18next";

const API_URL = globalVariables.API_URL;
const { TabPane } = Tabs;
const { Option } = Select;

class TemplateManage extends React.Component {
  constructor(props) {
    super(props);
    const panes = [
      { title: "Tab 1", content: "Content of Tab 1", key: "1" },
      { title: "Tab 2", content: "Content of Tab 2", key: "2" },
      {
        title: "Tab 3",
        content: "Content of Tab 3",
        key: "3",
        closable: false
      }
    ];
    this.state = {
      templates: [],
      activeKey: "0",
      panes,
      comingSoon: this.props.visible ? true : "",
      pairs: this.props.pairs,
      templateArray: [
        {
          id: "1",
          key: "technical_analysis",
          name: "Technical analysis",
          checked: true,
          multiple: true,
          data: ["XRP-BTC"]
        },
        {
          id: "2",
          key: "mini_graph",
          name: "Mini graph",
          checked: false,
          multiple: true,
          data: ["XRP-BTC"]
        },
        {
          id: "3",
          key: "candle_stick",
          name: "Candle Stick",
          checked: false,
          multiple: true,
          data: ["XRP-BTC"]
        },
        {
          id: "4",
          key: "crypto_screener",
          name: "Crypto screener",
          checked: false,
          multiple: false
        },
        {
          id: "5",
          key: "rising_falling",
          name: "Rising / Falling",
          checked: false,
          multiple: false
        },

        {
          id: "6",
          key: "activity",
          name: "Activity",
          checked: true,
          multiple: false
        },
        {
          id: "7",
          key: "portfolio",
          name: "Portfolio",
          checked: true,
          multiple: false
        },
        {
          id: "8",
          key: "news",
          name: "News",
          checked: false,
          multiple: false
        }
      ],
      templateName: "New Template",
      errMsg: ""
    };
    // this.t = this.props.t;
    this.newTabIndex = 0;
    this.handleChange = this.handleChange.bind(this);
    this.onChangeCheckbox = this.onChangeCheckbox.bind(this);
  }

  handleSave = () => {
    if (this.state.templateName) {
      this.props.onSave(this.state.templates);
      this.setState({
        errMsg: ""
      });
    } else {
      this.setState({
        errMsg: "Please enter template name"
      });
    }
  };
  componentDidMount() {
    this.setState({ templates: this.props.templates });
  }
  getPairs = () => {
    fetch(API_URL + `/users/get-all-pair`, {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Accept-Language": localStorage["i18nextLng"]
      }
    })
      .then(response => response.json())
      .then(responseData => {
        if (responseData.status == 200) {
          console.log("^^^", responseData.data);
          this.setState(
            {
              pairs: responseData.data
            },
            () => {
              console.log(this.state.pairs);
            }
          );
        }
      })
      .catch(error => {});
  };
  onCancle = e => {
    this.setState({ comingSoon: false });
    this.props.onCancle(e);
  };

  onChange = activeKey => {
    console.log("aksfjh^", activeKey);
    this.setState({ activeKey });
  };

  onEdit = (targetKey, action) => {
    console.log(targetKey);
    this[action](targetKey);
  };

  add = () => {
    console.log("^^^^^", this.state.templates);
    let temp = this.state.templates;
    const activeKey = temp.length + 1;
    temp.push({
      ...temp[0],
      title: this.state.templateName,
      inbuilt: false
    });
    this.setState({
      templates: temp,
      activeKey: Number(temp.length - 1).toString()
    });
  };

  remove = targetKey => {
    let templates = this.state.templates;
    templates.splice(targetKey);
    this.setState({ templates, activeKey: "0" });
  };
  handleChange(value, widgetIndex, templateIndex) {
    let templates = this.state.templates;
    console.log(value);

    templates[templateIndex].widgets[widgetIndex].data = value;
    this.setState({ templates });
  }
  onChangeCheckbox = (checked, widgetIndex, templateIndex) => {
    let templates = this.state.templates;
    templates[templateIndex].widgets[widgetIndex].checked = checked;
    this.setState({ templates });
  };
  render() {
    const { templateArray } = this.state;
    return (
      <div>
        <Modal
          title={
            <div>
              <span>Templates</span>
            </div>
          }
          visible={this.props.visible}
          onOk={e => this.handleSave()}
          // closable={false}
          onCancel={e => this.onCancle(e)}
          maskClosable={false}
          width={605}
          height={490}
          className="simple-maps template_manage"
          destroyOnClose={true}
        >
          <ModalWrap className="template_modal_wrap">
            <TemplateTab
              onChange={this.onChange}
              activeKey={this.state.activeKey}
              type="editable-card"
              onEdit={this.onEdit}
              className="template_tab"
            >
              {this.state.templates.map((t, index) => (
                <TemplateTabPane
                  className="testtabpane"
                  tab={t.title}
                  key={index}
                  closable={!t.inbuilt ? true : false}
                >
                  {t.inbuilt && (
                    <Row style={{ marginBottom: "15px" }}>
                      <Col>
                        <Alert
                          message="If you want customized dashboard create your own."
                          type="info"
                          showIcon
                        />
                      </Col>
                    </Row>
                  )}
                  {!t.inbuilt ? (
                    <TempName>
                      <input
                        type="text"
                        placeholder="Template Name"
                        value={t.title ? t.title : this.state.templateName}
                        onChange={e => {
                          let temp = this.state.templates;
                          if (e.target.value) {
                            temp[index].title = e.target.value;
                            this.setState({
                              templateName: e.target.value,
                              templates: temp,
                              errMsg: ""
                            });
                          } else {
                            this.setState({
                              templateName: "",
                              errMsg: "Please enter template name"
                            });
                          }
                        }}
                      />
                      {this.state.errMsg && (
                        <div className="validation-message">
                          {this.state.errMsg}
                        </div>
                      )}
                    </TempName>
                  ) : (
                    ""
                  )}
                  {t.widgets.map((w, windex) => (
                    <TempRow>
                      <WidgetName>
                        <Switch
                          disabled={t.inbuilt}
                          checked={w.checked}
                          onChange={checked => {
                            this.onChangeCheckbox(checked, windex, index);
                          }}
                        />
                        <span>{w.name}</span>
                      </WidgetName>
                      {w.checked && w.multiple ? (
                        <TemplatePairSelect
                          disabled={t.inbuilt}
                          mode="multiple"
                          style={{ width: "100%" }}
                          placeholder="Please select pairs"
                          value={w.data}
                          // defaultValue={["XRP-BTC"]}
                          onChange={value => {
                            this.handleChange(value, windex, index);
                          }}
                        >
                          {this.state.pairs &&
                            this.state.pairs.map(element1 => (
                              <Option key={element1.name}>
                                {element1.name}
                              </Option>
                            ))}
                        </TemplatePairSelect>
                      ) : (
                        ""
                      )}
                    </TempRow>
                  ))}
                </TemplateTabPane>
              ))}
            </TemplateTab>
          </ModalWrap>
        </Modal>
      </div>
    );
  }
}

export default withRouter(TemplateManage);
