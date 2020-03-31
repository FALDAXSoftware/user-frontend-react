import React from "react";
import "antd/dist/antd.css";
import { Modal, Icon, notification, Tabs, Checkbox, Select } from "antd";
import { withRouter } from "react-router-dom";
import { globalVariables } from "../Globals.js";
import { _COMINGIMG, _COMINGIMG2 } from "CONSTANTS/images";
import {
  ModalWrap,
  TemplateTabPane,
  TemplatePairSelect,
  SaveBtn
} from "STYLED-COMPONENTS/SHARED-STYLES/sharedStyle";
import { TemplateTab } from "../STYLED-COMPONENTS/SHARED-STYLES/sharedStyle";
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
      activeKey: panes[0].key,
      panes,
      comingSoon: this.props.visible ? true : "",
      pairs: "",
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
          key: "crypto_screener",
          name: "Crypto screener",
          checked: false,
          multiple: false
        },
        {
          id: "3",
          key: "rising_falling",
          name: "Rising / Falling",
          checked: false,
          multiple: false
        },
        {
          id: "4",
          key: "mini_graph",
          name: "Mini graph",
          checked: false,
          multiple: true,
          data: ["XRP-BTC"]
        },
        {
          id: "5",
          key: "activity",
          name: "Activity",
          checked: true,
          multiple: false
        },
        {
          id: "6",
          key: "portfolio",
          name: "Portfolio",
          checked: true,
          multiple: false
        },
        {
          id: "7",
          key: "news",
          name: "News",
          checked: false,
          multiple: false
        },
        {
          id: "8",
          key: "candle_stick",
          name: "Candle Stick",
          checked: false,
          multiple: true,
          data: ["XRP-BTC"]
        }
      ]
    };
    // this.t = this.props.t;
    this.newTabIndex = 0;
    this.handleChange = this.handleChange.bind(this);
  }

  //   handleComing = e => {
  //     this.setState({ comingSoon: false });
  //   };
  componentDidMount() {
    this.getPairs();
    const children = [];

    // if (this.state.pairs && this.state.pairs.length > 0)
    //   for (let i = 0; i < this.state.pairs.length; i++) {
    //     console.log("^^^", i);
    //     // children.push(
    //     //   <Option key={i.}>{i.toString(36) + i}</Option>
    //     // );
    //   }
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
  comingCancel = e => {
    this.setState({ comingSoon: false });
    this.props.comingCancel(e);
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
  handleChange(value, index) {
    let temp = this.state.templateArray;
    console.log(`selected ${value}`, index);
    let array = temp[index].data;
    array = value;
    temp[index].data = array;
    this.setState(
      {
        templateArray: temp
      },
      () => {
        console.log("^^^^array", this.state.templateArray);
      }
    );
  }
  onChangeCheckbox = e => {
    let temp = this.state.templateArray;
    for (var i = 0; i < this.state.templateArray.length; i++) {
      if (temp[i].id === e.target.value) {
        if (temp[i].checked) {
          temp[i].checked = false;
        } else {
          temp[i].checked = true;
        }
        break;
      }
    }
    this.setState(
      {
        templateArray: temp
      },
      () => {
        console.log("^^^^checkbox", this.state.templateArray);
      }
    );
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
          onOk={e => this.handleComing()}
          // closable={false}
          onCancel={e => this.comingCancel(e)}
          maskClosable={false}
          footer={null}
          width={605}
          height={490}
          className="simple-maps template_manage"
        >
          <ModalWrap className="template_modal_wrap">
            <TemplateTab
              onChange={this.onChange}
              activeKey={this.state.activeKey}
              type="editable-card"
              onEdit={this.onEdit}
              className="template_tab"
            >
              {/* {this.state.panes.map(pane => (
                <TemplateTabPane
                  className="testtabpane"
                  tab={pane.title}
                  key={pane.key}
                  closable={pane.closable}
                >
                  {pane.content}
                </TemplateTabPane>
              ))} */}
              <TemplateTabPane
                className="testtabpane"
                tab="Template 1"
                key="1"
                closable={false}
              >
                {templateArray.map((element, index) => (
                  <div>
                    <Checkbox
                      checked={element.checked}
                      value={element.id}
                      onClick={this.onChangeCheckbox.bind(this)}
                    >
                      {element.name}
                    </Checkbox>
                    {element.checked && element.multiple ? (
                      <TemplatePairSelect
                        mode="multiple"
                        style={{ width: "100%" }}
                        placeholder="Please select pairs"
                        value={element.data}
                        // defaultValue={["XRP-BTC"]}
                        onChange={value => {
                          this.handleChange(value, index);
                        }}
                      >
                        {this.state.pairs &&
                          this.state.pairs.map((element1, index) => (
                            <Option key={element1.name}>{element1.name}</Option>
                          ))}
                      </TemplatePairSelect>
                    ) : (
                      ""
                    )}
                  </div>
                ))}
                <SaveBtn type="primary">Save</SaveBtn>
              </TemplateTabPane>
            </TemplateTab>
          </ModalWrap>
        </Modal>
      </div>
    );
  }
}

export default withRouter(TemplateManage);
