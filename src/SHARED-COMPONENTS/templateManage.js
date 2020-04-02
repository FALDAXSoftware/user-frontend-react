import React from "react";
import "antd/dist/antd.css";
import {
  Modal,
  Icon,
  notification,
  Tabs,
  Checkbox,
  Select,
  Switch
} from "antd";
import { withRouter } from "react-router-dom";
import { globalVariables } from "../Globals.js";
import { _COMINGIMG, _COMINGIMG2 } from "CONSTANTS/images";
import {
  ModalWrap,
  TemplateTabPane,
  TemplatePairSelect,
  SaveBtn
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
      ]
    };
    // this.t = this.props.t;
    this.newTabIndex = 0;
    this.handleChange = this.handleChange.bind(this);
    this.onChangeCheckbox = this.onChangeCheckbox.bind(this);
  }

  handleSave = () => {
    this.props.onSave(this.state.templates)
  };
  componentDidMount() {
    this.setState({ templates: this.props.templates })
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
      .catch(error => { });
  };
  onCancle = e => {
    this.setState({ comingSoon: false });
    this.props.onCancle(e);
  };

  onChange = activeKey => {
    this.setState({ activeKey });
  };

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  };

  add = () => {
    const { panes } = this.state;
    const activeKey = `newTab${this.newTabIndex++}`;
    panes.push({
      title: "New Tab",
      content: "Content of new Tab",
      key: activeKey
    });
    this.setState({ panes, activeKey });
  };

  remove = targetKey => {
    let { activeKey } = this.state;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (panes.length && activeKey === targetKey) {
      if (lastIndex >= 0) {
        activeKey = panes[lastIndex].key;
      } else {
        activeKey = panes[0].key;
      }
    }
    this.setState({ panes, activeKey });
  };
  handleChange(value, widgetIndex, templateIndex) {
    let templates = this.state.templates
    console.log(value);

    templates[templateIndex].widgets[widgetIndex].data = value
    this.setState({ templates })
  }
  onChangeCheckbox = (checked, widgetIndex, templateIndex) => {

    let templates = this.state.templates
    templates[templateIndex].widgets[widgetIndex].checked = checked
    this.setState({ templates })
  };
  render() {
    const { templateArray } = this.state;
    return (
      <div>
        <Modal
          title={
            <div>
              <span>Manage Templates</span>
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
                  closable={false}
                >
                  {t.widgets.map((w, windex) => (
                    <TempRow>
                      <WidgetName>
                        <Switch
                          checked={w.checked}
                          onChange={checked => {
                            this.onChangeCheckbox(checked, windex, index);
                          }}
                        />
                        <span>{w.name}</span>
                      </WidgetName>
                      {w.checked && w.multiple ? (
                        <TemplatePairSelect
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
                            this.state.pairs.map((element1) => (
                              <Option key={element1.name}>{element1.name}</Option>
                            ))}
                        </TemplatePairSelect>
                      ) : (
                          ""
                        )}
                    </TempRow>
                  ))
                  }
                </TemplateTabPane>
              ))

              }
            </TemplateTab>
          </ModalWrap>
        </Modal>
      </div>
    );
  }
}

export default withRouter(TemplateManage);
