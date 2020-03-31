import React from "react";
import "antd/dist/antd.css";
import { Modal, Icon, notification, Tabs } from "antd";
import { withRouter } from "react-router-dom";
// import { globalVariables } from "../Globals.js";
import { _COMINGIMG, _COMINGIMG2 } from "CONSTANTS/images";
import {
  ModalWrap,
  TemplateTabPane
} from "STYLED-COMPONENTS/SHARED-STYLES/sharedStyle";
import { TemplateTab } from "../STYLED-COMPONENTS/SHARED-STYLES/sharedStyle";
// import { translate } from "react-i18next";

/* const API_URL = globalVariables.API_URL; */
const { TabPane } = Tabs;
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
      comingSoon: this.props.visible ? true : ""
    };
    // this.t = this.props.t;
    this.newTabIndex = 0;
  }

  //   handleComing = e => {
  //     this.setState({ comingSoon: false });
  //   };

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

  render() {
    return (
      <div>
        <Modal
          title={
            <div>
              <img alt="coming" src={_COMINGIMG} />{" "}
              <img alt="coming" src={_COMINGIMG2} />
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
          <ModalWrap>
            <TemplateTab
              onChange={this.onChange}
              activeKey={this.state.activeKey}
              type="editable-card"
              onEdit={this.onEdit}
              className="template_tab"
            >
              {this.state.panes.map(pane => (
                <TemplateTabPane
                  className="testtabpane"
                  tab={pane.title}
                  key={pane.key}
                  closable={pane.closable}
                >
                  {pane.content}
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
