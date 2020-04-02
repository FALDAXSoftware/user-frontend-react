/* Built-in Packages */
import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import styled from "styled-components";
import "antd/dist/antd.css";
import { Row, Col, Progress, Spin, Menu, Icon } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareFull } from "@fortawesome/free-solid-svg-icons";
/* import InfiniteScroll from 'react-infinite-scroller'; */
import { Scrollbars } from "react-custom-scrollbars";

/* Components */
import LoggedNavigation from "COMPONENTS/NAVIGATIONS/loggednavigation";
import CommonFooter from "COMPONENTS/LANDING/FOOTERS/footer_home";
import { globalVariables } from "Globals.js";

/*Styled-components*/
import {
  ContactWrap,
  GreyWrap
} from "STYLED-COMPONENTS/LANDING_CATEGORIES/contactStyle";
import { SettingDropdown } from "../../../STYLED-COMPONENTS/LOGGED_STYLE/tradeStyle";
import SubMenu from "antd/lib/menu/SubMenu";
import TemplateManage from "../../../SHARED-COMPONENTS/templateManage";
import Technical from "../../tv_widgets/technical";
import Screener from "../../tv_widgets/screener";
import MarketWidget from "../../tv_widgets/market_widget";
import TradingViewChart from "../../tradingviewchart";
import MiniGraph from "../../../SHARED-COMPONENTS/Mini_graph";
import { Responsive, WidthProvider } from "react-grid-layout";
import Activity from "./activity";
import News from "./news";
import Portfolio from "./portfolio";
import { inbuiltTemplates } from "./inbuiltTemplate";
let { API_URL } = globalVariables;
const ResponsiveReactGridLayout = WidthProvider(Responsive);
const WhiteBgWrapper = styled.div`
  background-color: ${props =>
    props.theme.mode === "dark" ? "#041b2c" : "white"};
  -webkit-box-shadow: -1px 5px 31px -10px rgba(0, 0, 0, 0.53);
  -moz-box-shadow: -1px 5px 31px -10px rgba(0, 0, 0, 0.53);
  box-shadow: -1px 5px 31px -10px rgba(0, 0, 0, 0.53);
  border-radius: 5px;
  // margin-top: 30px;
  overflow: auto;
  width: 100%;
  height: 100%;
`;
const GreyWrapDashboard = styled(GreyWrap)`
  font-family: "Open sans";
  padding-top: 120px;
`;
const RGL = styled(ResponsiveReactGridLayout)`
  & .react-resizable-handle::after {
    border-right: ${props =>
    props.theme.mode === "dark"
      ? "2px solid rgb(255, 255, 255) !important"
      : ""};
    border-bottom: ${props =>
    props.theme.mode === "dark"
      ? "2px solid rgb(255, 255, 255) !important"
      : ""};
  }
`;

const originalLayouts = getFromLS("layouts") || {};
let io = null;
let tempLayouts = {}
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      templateManage: false,
      pairs: [],
      allTemplates: [...inbuiltTemplates],
      currentTemplateIndex: 0,
      editState: false,
      currentTemplate: {
        widgets: [],
        layouts: {}
      }
    };

    io = this.props.io;
  }

  renderLayout = () => {
    let { widgets, layouts } = this.state.currentTemplate;
    let renderLayout = [];
    if (!layouts || !layouts.lg) {
      layouts["lg"] = [];
      layouts["md"] = [];
      layouts["sm"] = [];
      layouts["xs"] = [];
      layouts["xxs"] = [];
    }
    for (let index = 0; index < widgets.length; index++) {
      const element = widgets[index];
      if (element.checked) {
        let renderElement = null;
        switch (element.key) {
          case "technical_analysis":
            for (
              let innerIndex = 0;
              innerIndex < element.data.length;
              innerIndex++
            ) {
              const innerElement = element.data[innerIndex];
              renderLayout.push(
                <div key={innerElement.key}>
                  <WhiteBgWrapper>
                    <Technical
                      options={{
                        interval: "1m",
                        width: "100%",
                        isTransparent: true,
                        height: "98%",
                        symbol: `BINANCE:${innerElement.pair.split("-")[0]}${
                          innerElement.pair.split("-")[1]
                          }`,
                        showIntervalTabs: true,
                        locale: localStorage["i18nextLng"],
                        colorTheme: this.props.theme ? "dark" : "light",
                        largeChartUrl: "https://faldax.com"
                      }}
                    />
                  </WhiteBgWrapper>
                </div>
              );
              layouts = this.addKeyToLayout(innerElement, layouts);
            }
            break;
          case "crypto_screener":
            renderLayout.push(
              <div key={element.key}>
                <WhiteBgWrapper>
                  <Screener
                    options={{
                      width: "100%",
                      height: "98%",
                      defaultColumn: "oscillators",
                      defaultScreen: "general",
                      market: "crypto",
                      showToolbar: true,
                      colorTheme: this.props.theme ? "dark" : "light",
                      locale: localStorage["i18nextLng"]
                    }}
                  />
                </WhiteBgWrapper>
              </div>
            );
            layouts = this.addKeyToLayout(element, layouts);
            break;
          case "rising_falling":
            renderLayout.push(
              <div key={element.key}>
                <WhiteBgWrapper>
                  <MarketWidget
                    options={{
                      width: "100%",
                      height: "98%",
                      defaultColumn: "overview",
                      screener_type: "crypto_mkt",
                      displayCurrency: "USD",
                      colorTheme: this.props.theme ? "dark" : "light",
                      locale: localStorage["i18nextLng"]
                    }}
                  />
                </WhiteBgWrapper>
              </div>
            );
            layouts = this.addKeyToLayout(element, layouts);
            break;
          case "mini_graph":
            for (
              let innerIndex = 0;
              innerIndex < element.data.length;
              innerIndex++
            ) {
              const innerElement = element.data[innerIndex];
              renderLayout.push(
                <div key={innerElement.key}>
                  <WhiteBgWrapper>
                    <MiniGraph
                      crypto={innerElement.pair.split("-")[0]}
                      currency={innerElement.pair.split("-")[1]}
                      // total={4}
                      lineColor="#ffab30"
                    />
                  </WhiteBgWrapper>
                </div>
              );
              layouts = this.addKeyToLayout(innerElement, layouts);
            }
            break;
          case "activity":
            renderLayout.push(
              <div key={element.key}>
                <WhiteBgWrapper>
                  <Activity />
                </WhiteBgWrapper>
              </div>
            );
            layouts = this.addKeyToLayout(element, layouts);
            break;
          case "portfolio":
            renderLayout.push(
              <div key={element.key}>
                <WhiteBgWrapper>
                  <Portfolio />
                </WhiteBgWrapper>
              </div>
            );
            layouts = this.addKeyToLayout(element, layouts);
            break;
          case "news":
            renderLayout.push(
              <div key={element.key}>
                <WhiteBgWrapper>
                  <News />
                </WhiteBgWrapper>
              </div>
            );
            layouts = this.addKeyToLayout(element, layouts);
            break;
          case "candle_stick":
            for (
              let innerIndex = 0;
              innerIndex < element.data.length;
              innerIndex++
            ) {
              const innerElement = element.data[innerIndex];
              renderLayout.push(
                <div key={innerElement.key}>
                  <WhiteBgWrapper style={{ overflow: "hidden" }}>
                    <div style={{ height: "100%", paddingTop: "20px" }}>
                      <TradingViewChart
                        crypto={innerElement.pair.split("-")[0]}
                        currency={innerElement.pair.split("-")[1]}
                        theme={this.props.theme}
                        containerId={innerElement.key}
                      />
                    </div>
                  </WhiteBgWrapper>
                </div>
              );
              layouts = this.addKeyToLayout(innerElement, layouts);
            }
            break;
          default:
            break;
        }
      }
    }
    return { renderLayout, layouts };
  };
  /* Life-Cycle Methods */
  findKeyFromLayout = (key, layout) => {
    for (let index = 0; index < layout.length; index++) {
      const element = layout[index];
      if (element.key == key) {
        return element;
      }
    }
    return null;
  };
  addKeyToLayout = (element, layouts) => {
    if (!this.findKeyFromLayout(element.key, layouts.lg)) {
      layouts.lg.push({
        h: 3,
        w: 5,
        y: 0,
        x: 0,
        i: element.key
      });
      layouts.md.push({
        h: 3,
        w: 12,
        y: 0,
        x: 0,
        i: element.key
      });
      layouts.sm.push({
        h: 3,
        w: 12,
        y: 0,
        x: 0,
        i: element.key
      });
      layouts.xs.push({
        h: 3,
        w: 12,
        y: 0,
        x: 0,
        i: element.key
      });
      layouts.xxs.push({
        h: 3,
        w: 12,
        y: 0,
        x: 0,
        i: element.key
      });
    }
    return layouts;
  };
  componentDidMount() {
    var self = this;
    self.getPairs();
    this.setState({
      currentTemplate: this.state.allTemplates[0]
    })
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
          this.setState({
            pairs: responseData.data
          });
        }
      })
      .catch(error => { });
  };
  comingCancel = e => {
    this.setState({
      templateManage: false
    });
  };
  onLayoutChange = (layout, layouts) => {
    tempLayouts = layouts
  }
  onCurrentTemplateChange = (index) => {
    this.setState({
      currentTemplate: this.state.allTemplates[index],
      currentTemplateIndex: index
    })
  }
  enableEditLayout = () => {
    this.setState({
      editState: true
    }, () => {
      tempLayouts = this.state.currentTemplate.layouts
    })
  }
  saveLayout = () => {
    let allTemplates = this.state.allTemplates
    allTemplates[this.state.currentTemplateIndex].layouts = tempLayouts
    this.setState({
      currentTemplate: {
        ...this.state.currentTemplate,
        layouts: tempLayouts
      },
      allTemplates,
      editState: false
    })
  }
  cancleEdit = () => {
    let currentTemplate = this.state.currentTemplate
    this.setState({
      editState: false,
      currentTemplate: {
        widgets: [],
        layouts: {}
      }
    }, () => {
      this.setState({
        currentTemplate
      })
    })
  }
  render() {
    const { renderLayout, layouts } = this.renderLayout();
    const menu = (
      <Menu className="SettingMenu templateSettingMenu">
        <SubMenu className="templates" title="Templates">
          {
            this.state.allTemplates.map((t, index) => (
              <Menu.Item onClick={() => { this.onCurrentTemplateChange(index) }}>{t.title}</Menu.Item>
            ))
          }

          <Menu.Divider />
          <Menu.Item
            onClick={() => {
              this.setState({
                templateManage: true
              });
            }}
          >
            <Icon type="setting" />
            Manage templates
          </Menu.Item>
        </SubMenu>
        <Menu.Item
          onClick={this.enableEditLayout}
          disabled={this.state.editState}
          key="1"
        >
          Edit Layout
        </Menu.Item>
        {/* {this.state.isFullscreen && (
          <Menu.Item
            key="2"
            //   onClick={this.exitFullScreen}
          >
            <Icon type="fullscreen-exit" />
            Exit Full Screen
          </Menu.Item>
        )}
        {!this.state.isFullscreen && (
          <Menu.Item
            key="2"
            //   onClick={this.goFullScreen}
          >
            <Icon type="fullscreen" /> Full Screen
          </Menu.Item>
        )}
        <Menu.Item
          //   onClick={this.clearLayout.bind(this)}
          disabled={this.state.saveState}
          key="3"
        >
          Clear Layout
        </Menu.Item> */}
        <Menu.Item
          onClick={this.saveLayout}
          disabled={!this.state.editState}
          key="2"
        >
          Save
        </Menu.Item>
        <Menu.Item
          disabled={!this.state.editState}
          onClick={this.cancleEdit}
          key="4"
        >
          Cancle
        </Menu.Item>
      </Menu>
    );
    return (
      <div>
        <ContactWrap>
          <SettingDropdown
            overlay={menu}
            placement="bottomLeft"
            trigger={["click"]}
            overlayClassName="dropSettings"
          >
            <Icon type="setting" />
          </SettingDropdown>
          <LoggedNavigation />
          <GreyWrapDashboard>
            <Row>
              <Col>
                <RGL
                  className="layout"
                  layouts={layouts}
                  breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                  cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                  isDraggable={this.state.editState}
                  isResizable={this.state.editState}
                  onLayoutChange={(layout, layouts) =>
                    this.onLayoutChange(layout, layouts)
                  }
                >
                  {renderLayout.map(el => el)}
                </RGL>
              </Col>
            </Row>
          </GreyWrapDashboard>
          <CommonFooter />
        </ContactWrap>
        <TemplateManage
          comingCancel={e => this.comingCancel(e)}
          visible={this.state.templateManage}
          templates={this.state.allTemplates}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.simpleReducer.isLoggedIn,
    profileDetails:
      state.simpleReducer.profileDetails !== undefined
        ? state.simpleReducer.profileDetails.data[0]
        : ""
  };
}

export default connect(mapStateToProps)(Dashboard);
function getFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem("rgl-8")) || {
        layouts: {}
      };
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[key];
}
