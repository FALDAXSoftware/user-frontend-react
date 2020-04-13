/* Built-in Packages */
import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import styled from "styled-components";
import "antd/dist/antd.css";
import {
  Row,
  Col,
  Progress,
  Spin,
  Menu,
  Icon,
  Dropdown,
  Button,
  Tooltip,
  Layout
} from "antd";
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
import TemplateSideBar from "./template_sidebar";
import WhiteBgFaldaxLoader from "../../../SHARED-COMPONENTS/WhiteBgFaldaxLoader";
const { Content, Footer, Sider } = Layout;
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
  // padding-top: 120px;
`;
const Overlay = styled.div`
  background: #00000000;
  height: 100%;
  width: 100%;
  position: absolute;
  border-radius: 5px;
  top: 0;
  left: 0;
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
let tempLayouts = {};
let timeOutObj = null;
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      templateManage: false,
      pairs: [],
      showLayout: false,
      allTemplates: [...inbuiltTemplates],
      currentTemplateIndex: 0,
      editState: false,
      loader: true,
      isSaving: false,
      currentTemplate: {
        widgets: [],
        layouts: {}
      },
      isSaved: true,
      currentTemplateManagerTab: 1
    };

    io = this.props.io;
  }

  renderLayout = () => {
    let widgets = this.state.currentTemplate?.widgets || [];
    let layouts = this.state.currentTemplate?.layouts || {};
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
              let key = element.key + innerIndex;
              renderLayout.push(
                <div key={key}>
                  <WhiteBgWrapper>
                    {this.state.editState && <Overlay />}
                    <Technical
                      options={{
                        interval: "1m",
                        width: "100%",
                        isTransparent: true,
                        height: "98%",
                        symbol: `BINANCE:${innerElement.split("-")[0]}${
                          innerElement.split("-")[1]
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
              layouts = this.addKeyToLayout(key, layouts);
            }
            break;
          case "crypto_screener":
            renderLayout.push(
              <div key={element.key}>
                <WhiteBgWrapper>
                  {this.state.editState && <Overlay />}
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
            layouts = this.addKeyToLayout(element.key, layouts);
            break;
          case "rising_falling":
            renderLayout.push(
              <div key={element.key}>
                <WhiteBgWrapper>
                  {this.state.editState && <Overlay />}
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
            layouts = this.addKeyToLayout(element.key, layouts);
            break;
          case "mini_graph":
            for (
              let innerIndex = 0;
              innerIndex < element.data.length;
              innerIndex++
            ) {
              const innerElement = element.data[innerIndex];
              let key = element.key + innerIndex;
              renderLayout.push(
                <div key={key}>
                  <WhiteBgWrapper style={{ overflow: "hidden" }}>
                    {this.state.editState && <Overlay />}
                    <MiniGraph
                      crypto={innerElement.split("-")[0]}
                      currency={innerElement.split("-")[1]}
                      // total={4}
                      lineColor="#ffab30"
                    />
                  </WhiteBgWrapper>
                </div>
              );
              layouts = this.addKeyToLayout(key, layouts);
            }
            break;
          case "activity":
            renderLayout.push(
              <div key={element.key}>
                <WhiteBgWrapper>
                  {this.state.editState && <Overlay />}
                  <Activity />
                </WhiteBgWrapper>
              </div>
            );
            layouts = this.addKeyToLayout(element.key, layouts);
            break;
          case "portfolio":
            renderLayout.push(
              <div key={element.key}>
                <WhiteBgWrapper>
                  {this.state.editState && <Overlay />}
                  <Portfolio />
                </WhiteBgWrapper>
              </div>
            );
            layouts = this.addKeyToLayout(element.key, layouts);
            break;
          case "news":
            renderLayout.push(
              <div key={element.key}>
                <WhiteBgWrapper>
                  {this.state.editState && <Overlay />}
                  <News />
                </WhiteBgWrapper>
              </div>
            );
            layouts = this.addKeyToLayout(element.key, layouts);
            break;
          case "candle_stick":
            for (
              let innerIndex = 0;
              innerIndex < element.data.length;
              innerIndex++
            ) {
              const innerElement = element.data[innerIndex];
              let key = element.key + innerIndex;
              renderLayout.push(
                <div key={key}>
                  <WhiteBgWrapper style={{ overflow: "hidden" }}>
                    {this.state.editState && <Overlay />}
                    <div style={{ height: "100%" }}>
                      <TradingViewChart
                        crypto={innerElement.split("-")[0]}
                        currency={innerElement.split("-")[1]}
                        theme={this.props.theme}
                        containerId={key}
                      />
                    </div>
                  </WhiteBgWrapper>
                </div>
              );
              layouts = this.addKeyToLayout(key, layouts);
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
      if (element.i == key) {
        return element;
      }
    }
    return null;
  };
  addKeyToLayout = (key, layouts) => {
    let selfLayout = { ...layouts };
    if (!this.findKeyFromLayout(key, selfLayout.lg)) {
      selfLayout.lg.push({
        h: 3,
        w: 5,
        y: Infinity,
        x: 0,
        i: key
      });
      selfLayout.md.push({
        h: 3,
        w: 12,
        y: 0,
        x: 0,
        i: key
      });
      selfLayout.sm.push({
        h: 3,
        w: 12,
        y: 0,
        x: 0,
        i: key
      });
      selfLayout.xs.push({
        h: 3,
        w: 12,
        y: 0,
        x: 0,
        i: key
      });
      selfLayout.xxs.push({
        h: 3,
        w: 12,
        y: 0,
        x: 0,
        i: key
      });
    }
    return selfLayout;
  };
  componentDidMount() {
    var self = this;
    self.getPairs();
    self.getTemplates();
    // this.setState({
    //   currentTemplate: this.state.allTemplates[0]
    // });
  }
  getTemplates = (callback = null) => {
    this.setState({ loader: true });
    fetch(API_URL + `/users/get-users-layout`, {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Accept-Language": localStorage["i18nextLng"],
        Authorization: "Bearer " + this.props.isLoggedIn
      }
    })
      .then(response => response.json())
      .then(responseData => {
        let templates = [];
        if (responseData.data?.dashboard_layout?.templates) {
          templates = [
            ...inbuiltTemplates,
            ...responseData.data.dashboard_layout.templates
          ];
        } else {
          templates = [...inbuiltTemplates];
        }

        let currentSelectedTemplate =
          responseData.data?.dashboard_layout?.currentSelectedTemplate;
        if (!currentSelectedTemplate) {
          currentSelectedTemplate = 0;
        }
        console.log(
          currentSelectedTemplate >= templates.length,
          currentSelectedTemplate,
          templates.length,
          templates
        );

        if (currentSelectedTemplate >= templates.length) {
          currentSelectedTemplate = 0;
        }
        this.setState({
          showLayout: true,
          loader: false,
          allTemplates: templates,
          currentTemplateIndex: currentSelectedTemplate,
          currentTemplate: templates[currentSelectedTemplate],
          isSaved: true
        });
      })
      .catch(error => {});
  };
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
      .catch(error => {});
  };
  onCancle = e => {
    this.setState({
      templateManage: false
    });
  };
  onLayoutChange = (layout, layouts) => {
    console.log(layout);
    let allTemplates = this.state.allTemplates;
    allTemplates[this.state.currentTemplateIndex] = {
      ...this.state.currentTemplate,
      layouts: layouts
    };
    this.setState(
      {
        currentTemplate: {
          ...this.state.currentTemplate,
          layouts: layouts
        },
        isSaved: false,
        allTemplates
        // editState: false
      },
      () => {
        // this.saveToDB();
      }
    );
  };
  onCurrentTemplateChange = index => {
    this.setState(
      {
        currentTemplate: this.state.allTemplates[index],
        currentTemplateIndex: index,
        showLayout: false,
        isSaved: false
      },
      () => {
        // this.saveToDB();
        this.setState({ showLayout: true });
      }
    );
  };
  importTemplate = template => {
    let allTemplates = this.state.allTemplates;
    allTemplates.push(template);
    let currentTemplateIndex = allTemplates.length - 1;
    this.setState({
      allTemplates,
      currentTemplateIndex,
      currentTemplate: allTemplates[currentTemplateIndex],
      currentTemplateManagerTab: 1,
      isSaved: false
    });
  };
  onTemplateManagerTabChange = currentTab => {
    this.setState({
      currentTemplateManagerTab: currentTab
    });
  };
  enableEditLayout = () => {
    this.setState(
      {
        editState: true,
        showLayout: false
      },
      () => {
        this.setState({ showLayout: true });
        tempLayouts = this.state.currentTemplate.layouts;
      }
    );
  };
  saveToDB = () => {
    this.setState({ isSaving: true });
    let dashboard_layout = {};
    dashboard_layout.currentSelectedTemplate = this.state.currentTemplateIndex;
    let temp = this.state.allTemplates.filter(e => {
      if (e.inbuilt) {
        return false;
      } else {
        return true;
      }
    });
    dashboard_layout.templates = temp;
    fetch(API_URL + `/users/update-users-layout`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Accept-Language": localStorage["i18nextLng"],
        Authorization: "Bearer " + this.props.isLoggedIn
      },
      body: JSON.stringify({
        dashboard_layout
      })
    })
      .then(response => response.json())
      .then(responseData => {
        if (responseData.status == 200) {
          console.log("respondata", responseData);
          this.setState({ isSaving: false, isSaved: true });
        }
      });
  };
  closeEditing = () => {
    this.setState(
      {
        showLayout: false,
        editState: false,
        currentTemplateManagerTab: 1
      },
      () => {
        this.getTemplates();
      }
    );
  };
  handleTemplateSave = templates => {
    this.setState(
      {
        allTemplates: templates,
        templateManage: false,
        showLayout: false,
        isSaved: false
      },
      () => {
        // this.saveToDB();
        if (this.state.allTemplates[this.state.currentTemplateIndex]) {
          this.setState(
            {
              currentTemplate: this.state.allTemplates[
                this.state.currentTemplateIndex
              ],
              showLayout: true
            },
            () => {
              this.forceUpdate();
            }
          );
        }
      }
    );
  };
  deleteTemplate = () => {
    let allTemplates = this.state.allTemplates;
    allTemplates.splice(this.state.currentTemplateIndex, 1);
    let currentTemplateIndex = allTemplates.length - 1;
    this.setState({
      allTemplates,
      currentTemplateIndex,
      currentTemplate: allTemplates[currentTemplateIndex],
      currentTemplateManagerTab: 1,
      isSaved: false
    });
  };
  render() {
    const { renderLayout, layouts } = this.renderLayout();
    const menu = (
      <Menu className="SettingMenu templateSettingMenu">
        <SubMenu className="templates" title="Templates">
          {this.state.allTemplates.map((t, index) => (
            <Menu.Item
              className={
                index == this.state.currentTemplateIndex ? "templateActive" : ""
              }
              disabled={this.state.editState}
              onClick={() => {
                this.onCurrentTemplateChange(index);
              }}
            >
              {t.title}
            </Menu.Item>
          ))}

          <Menu.Divider />
          <Menu.Item
            disabled={this.state.editState}
            onClick={() => {
              this.setState({
                templateManage: true
              });
            }}
          >
            <Icon type="control" />
            Manage templates
          </Menu.Item>
        </SubMenu>
        <Menu.Item
          onClick={this.enableEditLayout}
          disabled={
            this.state.editState || this.state.currentTemplate?.inbuilt == true
          }
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
          Cancel
        </Menu.Item>
      </Menu>
    );
    return (
      <div>
        <ContactWrap>
          {!this.state.editState && (
            <Tooltip placement="right" title="Customize Dashboard">
              <SettingDropdown
                className="dashboard_setting"
                onClick={this.enableEditLayout}
              >
                <Icon type="setting" />
              </SettingDropdown>
            </Tooltip>
          )}
          <LoggedNavigation />
          {this.state.loader && <WhiteBgFaldaxLoader />}
          <Layout className="sidebar-layout">
            {this.state.editState && (
              <TemplateSideBar
                templates={this.state.allTemplates}
                pairs={this.state.pairs}
                selected={this.state.currentTemplateIndex}
                onCurrentTemplateChange={this.onCurrentTemplateChange}
                closeEditing={this.closeEditing}
                onSave={this.saveToDB}
                isSaving={this.state.isSaving}
                isSaved={this.state.isSaved}
                onChange={this.handleTemplateSave}
                onTabChange={this.onTemplateManagerTabChange}
                importTemplate={this.importTemplate}
                deleteTemplate={this.deleteTemplate}
              />
            )}
            <Content>
              <GreyWrapDashboard>
                {/* <Row gutter={16}>
              <Col span={24} style={{ textAlign: "right" }}>
                <Dropdown overlay={menu}>
                  <Button>
                    Customize Dashboard <Icon type="down" />
                  </Button>
                </Dropdown>
              </Col>
            </Row> */}
                <Row>
                  <Col>
                    {this.state.showLayout && (
                      <RGL
                        className="layout"
                        layouts={layouts}
                        breakpoints={{
                          lg: 1200,
                          md: 996,
                          sm: 768,
                          xs: 480,
                          xxs: 0
                        }}
                        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                        isDraggable={
                          this.state.editState &&
                          this.state.currentTemplateManagerTab == 1
                        }
                        isResizable={
                          this.state.editState &&
                          this.state.currentTemplateManagerTab == 1
                        }
                        onLayoutChange={(layout, layouts) =>
                          this.onLayoutChange(layout, layouts)
                        }
                      >
                        {renderLayout.map(el => el)}
                      </RGL>
                    )}
                  </Col>
                </Row>
              </GreyWrapDashboard>
            </Content>
          </Layout>
          <CommonFooter />
        </ContactWrap>
        {this.state.templateManage && this.state.pairs.length > 0 && (
          <TemplateManage
            onCancle={e => this.onCancle(e)}
            onSave={this.handleTemplateSave}
            visible={this.state.templateManage}
            templates={this.state.allTemplates}
            pairs={this.state.pairs}
          />
        )}
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
        : "",
    theme:
      state.themeReducer.theme !== undefined ? state.themeReducer.theme : ""
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
