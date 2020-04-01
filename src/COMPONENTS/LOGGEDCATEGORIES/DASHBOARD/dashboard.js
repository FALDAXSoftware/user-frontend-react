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
import DashGraph from "./dashgraph";
import RiseTable from "./risetable";
import { globalVariables } from "Globals.js";

/*Styled-components*/
import {
  ContactWrap,
  GreyWrap
} from "STYLED-COMPONENTS/LANDING_CATEGORIES/contactStyle";
import { ContainerContact } from "STYLED-COMPONENTS/LOGGED_STYLE/historyStyle";
import {
  ActPortWrap,
  Lleft,
  Rright,
  Topic,
  ActDiv,
  ActTable,
  PortTable,
  HighLow,
  LeftHl,
  RightHl,
  Newsdiv,
  News,
  NewsList,
  List,
  ListSpan,
  Listp,
  Date,
  SpinSingle,
  RiseFall
} from "STYLED-COMPONENTS/LOGGED_STYLE/dashStyle";
import { SettingDropdown } from "../../../STYLED-COMPONENTS/LOGGED_STYLE/tradeStyle";
import SubMenu from "antd/lib/menu/SubMenu";
import TemplateManage from "../../../SHARED-COMPONENTS/templateManage";
import Technical from "../../tv_widgets/technical";
import Screener from "../../tv_widgets/screener";
import MarketWidget from "../../tv_widgets/market_widget";
import TradingViewChart from "../../tradingviewchart";
import MiniGraph from "../../../SHARED-COMPONENTS/Mini_graph";
import { Responsive, WidthProvider } from "react-grid-layout";

let { SOCKET_HOST } = globalVariables;
let { API_URL } = globalVariables;
const ResponsiveReactGridLayout = WidthProvider(Responsive);
const WhiteBgWrapper = styled.div`
  background-color: ${props =>
    props.theme.mode === "dark" ? "#041b2c" : "white"};
  -webkit-box-shadow: -1px 5px 31px -10px rgba(0, 0, 0, 0.53);
  -moz-box-shadow: -1px 5px 31px -10px rgba(0, 0, 0, 0.53);
  box-shadow: -1px 5px 31px -10px rgba(0, 0, 0, 0.53);
  border-radius: 5px;
  margin-top: 30px;
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
const ContainerNew = styled(ContainerContact)`
  padding: 0px;
  background-color: ${props =>
    props.theme.mode === "dark" ? "#01090f" : "#f5f6fa"};
`;
const BodyWrap = styled.div``;
const data = [
  {
    image: "/images/Homepage/imgpsh_fullsize_1.png",
    coinName: "BTC/USD",
    price: "700,000",
    percentage: 3.35,
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "My First dataset",
        fill: false,
        bezierCurve: false,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [65, 59, 80, 81, 56, 55, 40]
      }
    ]
  },
  {
    image: "/images/Homepage/imgpsh_fullsize_2.png",
    coinName: "BTC/USD",
    price: "400,000",
    percentage: 0.35,
    labels: [
      "5",
      "59",
      "80",
      "81",
      "56",
      "55",
      "100",
      "59",
      "80",
      "81",
      "56",
      "55",
      "100",
      "59",
      "80",
      "81",
      "56",
      "55",
      "100",
      "59",
      "80",
      "81",
      "56",
      "55",
      "100",
      "59",
      "80",
      "81",
      "56",
      "55",
      "150"
    ],
    datasets: [
      {
        label: "My First dataset",
        fill: false,
        bezierCurve: false,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [
          5,
          59,
          80,
          81,
          56,
          55,
          100,
          59,
          80,
          81,
          56,
          55,
          100,
          59,
          80,
          81,
          56,
          55,
          100,
          59,
          80,
          81,
          56,
          55,
          100,
          59,
          80,
          81,
          56,
          55,
          150
        ]
      }
    ]
  },
  {
    image: "/images/Homepage/imgpsh_fullsize_3.png",
    coinName: "BTC/USD",
    price: "1,000",
    percentage: -0.35,
    labels: [
      "150",
      "59",
      "80",
      "81",
      "56",
      "55",
      "100",
      "59",
      "80",
      "81",
      "56",
      "55",
      "100",
      "59",
      "80",
      "81",
      "56",
      "55",
      "100",
      "59",
      "80",
      "81",
      "56",
      "55",
      "100",
      "59",
      "80",
      "81",
      "56",
      "55",
      "5"
    ],
    datasets: [
      {
        label: "My First dataset",
        fill: false,
        bezierCurve: false,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [
          150,
          59,
          80,
          81,
          56,
          55,
          100,
          59,
          80,
          81,
          56,
          55,
          100,
          59,
          80,
          81,
          56,
          55,
          100,
          59,
          80,
          81,
          56,
          55,
          100,
          59,
          80,
          81,
          56,
          55,
          5
        ]
      }
    ]
  },
  {
    image: "/images/Homepage/imgpsh_fullsize_1.png",
    coinName: "BTC/USD",
    price: "45,000",
    percentage: -3.45,
    labels: [
      "5",
      "59",
      "80",
      "81",
      "56",
      "55",
      "100",
      "59",
      "80",
      "81",
      "56",
      "55",
      "100",
      "59",
      "80",
      "81",
      "56",
      "55",
      "100",
      "59",
      "80",
      "81",
      "56",
      "55",
      "100",
      "59",
      "80",
      "81",
      "56",
      "55",
      "150"
    ],
    datasets: [
      {
        label: "My First dataset",
        fill: false,
        bezierCurve: false,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [
          5,
          59,
          80,
          81,
          56,
          55,
          100,
          59,
          80,
          81,
          56,
          55,
          100,
          59,
          80,
          81,
          56,
          55,
          100,
          59,
          80,
          81,
          56,
          55,
          100,
          59,
          80,
          81,
          56,
          55,
          150
        ]
      }
    ]
  }
];
const SideType = styled.td`
  color: ${props => (props.type === "Sell" ? "#f13239" : "#4fb153")};
  font-weight: 600;
`;
const activityColumns = [
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    className: "dash-date"
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    render: text => <SideType type={text}>{text}</SideType>
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    className: "amount"
  },
  {
    title: "Completed",
    key: "completed",
    dataIndex: "completed",
    className: "progress-bar-container",
    render: completed => <Progress percent={completed} />
  }
];
const portfolioColumn = [
  {
    title: "Coin",
    dataIndex: "coin",
    key: "coin",
    className: "coin"
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    className: "amount"
  },
  {
    title: "Value",
    dataIndex: "value",
    key: "value",
    className: "value"
  },
  {
    title: "Change",
    key: "change",
    dataIndex: "change",
    className: "change"
  }
];
const originalLayouts = getFromLS("layouts") || {};
let io = null;
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activityData: [],
      news: [],
      hasMoreNews: true,
      portfolioData: [],
      total: 0,
      diffrence: 0,
      userFiat: "USD",
      activityLoader: false,
      newsLoader: false,
      portfolioLoader: false,
      templateManage: false,
      tc1: "ETHBTC",
      pairs: [],
      layouts: JSON.parse(JSON.stringify(originalLayouts))
    };

    io = this.props.io;
    this.loadNews = this.loadNews.bind(this);
    this.loadActivity = this.loadActivity.bind(this);
    this.loadPortfolio = this.loadPortfolio.bind(this);
  }

  /* Life-Cycle Methods */

  componentDidMount() {
    var self = this;
    self.getPairs();
    self.loadNews(1);
    self.loadActivity();
    self.loadPortfolio();
    // io.sails.url = API_URL;
    // io.sails.headers = {
    //   Accept: "application/json",
    //   "Content-Type": "application/json",
    //   Authorization: "Bearer " + this.props.isLoggedIn
    // };
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
      .catch(error => {});
  };
  /* 
            Page: /dashboard
            It is called in ComponentDidMount.
            API is called to get Data of Activity table.
    */

  loadActivity() {
    var self = this;
    self.setState({ activityLoader: true });

    fetch(`${SOCKET_HOST}/api/v1/tradding/get-activity-data`, {
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
        // console.log(responseData);
        let activityData = [];
        if (responseData.status === 200) {
          responseData.data.map(element => {
            var date;
            if (this.props.profileDetails.date_format === "MM/DD/YYYY")
              date = moment
                .utc(element.created_at)
                .local()
                .format("MM/DD/YYYY, H:m:s");
            else if (this.props.profileDetails.date_format === "DD/MM/YYYY")
              date = moment
                .utc(element.created_at)
                .local()
                .format("DD/MM/YYYY, H:m:s");
            else
              date = moment
                .utc(element.created_at)
                .local()
                .format("MMM D, YYYY, H:m:s");
            activityData.push({
              date: date,
              action: element.side,
              amount: element.price.toFixed(3) + " " + element.currency,
              completed: parseInt(
                (parseFloat(element.quantity) * 100) /
                  parseFloat(element.fix_quantity)
              )
            });
          });
          self.setState({
            activityData: activityData,
            activityLoader: false
          });
        }
      })
      .catch(error => {
        self.setState({ activityLoader: false });
      });
  }

  /* 
            Page: /dashboard
            It is called in ComponentDidMount.
            API is called to get Data of Portfolio table.
    */

  loadPortfolio() {
    var self = this;
    self.setState({ portfolioLoader: true });
    fetch(`${SOCKET_HOST}/api/v1/tradding/get-portfolio-data`, {
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
        let portfolioData = [];
        if (responseData.status === 200) {
          // console.log("^^^^portfolioData", responseData.data);
          let userFiat = responseData.data.fiat;
          responseData.data.portfolioData.map(element => {
            portfolioData.push({
              coin: element.name,
              amount: element.Amount.toFixed(3) + " " + element.symbol,
              value: element.average_price.toFixed(5) + " " + userFiat,
              change: element.percentchange.toFixed(5) + "%"
            });
          });
          self.setState({
            total: responseData.data.total,
            diffrence: responseData.data.diffrence,
            userFiat: userFiat,
            portfolioData: portfolioData,
            portfolioLoader: false
          });
        }
      })
      .catch(error => {
        /* console.log(error) */
      });
  }

  /* 
           Page: /dashboard
           It is called in ComponentDidMount.
           API is called to get Data of News table.
   */

  loadNews(page) {
    var self = this;
    self.setState({ newsLoader: true });
    fetch(`${API_URL}/users/get-all-news?limit=50&page=${page}`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Accept-Language": localStorage["i18nextLng"]
      }
    })
      .then(response => response.json())
      .then(responseData => {
        // console.log(responseData);
        if (responseData.status === 200) {
          let news = self.state.news;
          responseData.data.map(element => {
            news.push(element);
          });

          let hasMoreNews = true;

          if (news.length >= parseInt(responseData.NewsCount)) {
            hasMoreNews = false;
          }
          self.setState({
            newsLoader: false,
            news: news,
            hasMoreNews: hasMoreNews
          });
        }
      })
      .catch(error => {
        self.setState({ newsLoader: true });
      });
  }

  /* 
        Page: /dashboard
        It is called to get Domain From URL.
        URL is split into array and domain is returned.
    */

  getDomainFromUrl(url) {
    var arr = url.split("/");
    var result = arr[2];
    return result;
  }
  comingCancel = e => {
    this.setState({
      templateManage: false
    });
  };
  render() {
    const {
      /*  newsLoader, */ news,
      /* activityLoader, */ activityData,
      userFiat
    } = this.state;
    const menu = (
      <Menu className="SettingMenu templateSettingMenu">
        <SubMenu className="templates" title="Templates">
          <Menu.Item>Template 1</Menu.Item>
          <Menu.Item>Template 2</Menu.Item>
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
          //   onClick={this.editLayout.bind(this)}
          disabled={this.state.editState}
          key="1"
        >
          Edit Layout
        </Menu.Item>
        {this.state.isFullscreen && (
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
        </Menu.Item>
        <Menu.Item
          //   onClick={this.saveLayout.bind(this)}
          disabled={this.state.saveState}
          key="2"
        >
          Save
        </Menu.Item>
        <Menu.Item
          //  onClick={this.resetLayout.bind(this)}
          key="4"
        >
          Reset Layout
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
                  layouts={this.state.layouts}
                  breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                  cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                  isDraggable={this.state.editState}
                  isResizable={this.state.editState}
                  // onLayoutChange={(layout, layouts) =>
                  //   this.onLayoutChange(layout, layouts)
                  // }
                >
                  <WhiteBgWrapper key="0" style={{ overflow: "auto" }}>
                    <Topic>
                      <span>ACTIVITY</span>
                    </Topic>
                    <ActDiv>
                      <ActTable
                        // scroll={{ y: 500 }}
                        pagination={false}
                        columns={activityColumns}
                        dataSource={activityData}
                        className="activity-table"
                      />
                    </ActDiv>
                    {this.state.activityLoader === true ? (
                      <SpinSingle className="Single_spin">
                        <Spin size="small" />
                      </SpinSingle>
                    ) : (
                      ""
                    )}
                  </WhiteBgWrapper>
                  <WhiteBgWrapper key="1" style={{ overflow: "auto" }}>
                    <MiniGraph
                      crypto="XRP"
                      currency="BTC"
                      data={data[0]}
                      total={4}
                      io={this.props.io}
                      lineColor="#ffab30"
                    />
                  </WhiteBgWrapper>
                  <WhiteBgWrapper key="2" style={{ overflow: "auto" }}>
                    {/* <Newsdiv> */}
                    <News>NEWS</News>
                    <NewsList>
                      <Scrollbars
                        // style={{ height: 560 }}
                        hideTracksWhenNotNeeded={true}
                        className="scrollbar news"
                      >
                        {news.map((element, index) => (
                          <List>
                            <Date>
                              {moment
                                .utc(element.posted_at)
                                .format(
                                  `${this.props.profileDetails.date_format} HH:mm`
                                )}
                            </Date>
                            <ListSpan>
                              {element.owner === "bitcoinist" && (
                                <img
                                  alt="bit pic"
                                  src="/images/bitcoinist.png"
                                  style={{
                                    marginRight: "10px",
                                    height: "20px"
                                  }}
                                />
                              )}
                              {element.owner === "cointelegraph" && (
                                <img
                                  alt="bit pic"
                                  src="/images/cointelegraph.ico"
                                  style={{
                                    marginRight: "10px",
                                    height: "20px"
                                  }}
                                />
                              )}
                              {element.owner === "bitcoin" && (
                                <img
                                  alt="bit pic"
                                  src="/images/bitcoin.png"
                                  style={{
                                    marginRight: "10px",
                                    height: "20px"
                                  }}
                                />
                              )}
                              {element.owner !== "bitcoinist" &&
                                element.owner !== "cointelegraph" &&
                                element.owner !== "bitcoin" && (
                                  <FontAwesomeIcon
                                    icon={faSquareFull}
                                    color="#d4d4d4"
                                    style={{ marginRight: "10px" }}
                                  />
                                )}
                              {this.getDomainFromUrl(element.link)}
                            </ListSpan>
                            <Listp href={element.link} target="_blank">
                              {element.title}
                            </Listp>
                          </List>
                        ))}
                      </Scrollbars>
                    </NewsList>
                    {/* </Newsdiv> */}
                  </WhiteBgWrapper>
                  <WhiteBgWrapper key="3" style={{ overflow: "auto" }}>
                    <Technical
                      options={{
                        interval: "1m",
                        width: "100%",
                        isTransparent: true,
                        height: "100%",
                        symbol: `BINANCE:${"XRPBTC"}`,
                        showIntervalTabs: true,
                        locale: localStorage["i18nextLng"],
                        colorTheme: this.props.theme ? "dark" : "light",
                        largeChartUrl: "https://faldax.com"
                      }}
                    />
                  </WhiteBgWrapper>
                  <WhiteBgWrapper key="4" style={{ overflow: "auto" }}>
                    <Screener
                      options={{
                        width: "100%",
                        height: "100%",
                        defaultColumn: "oscillators",
                        defaultScreen: "general",
                        market: "crypto",
                        showToolbar: true,
                        colorTheme: this.props.theme ? "dark" : "light",
                        locale: localStorage["i18nextLng"]
                      }}
                    />
                  </WhiteBgWrapper>
                  <WhiteBgWrapper key="5" style={{ overflow: "auto" }}>
                    <MarketWidget
                      options={{
                        width: "100%",
                        height: "100%",
                        defaultColumn: "overview",
                        screener_type: "crypto_mkt",
                        displayCurrency: "USD",
                        colorTheme: this.props.theme ? "dark" : "light",
                        locale: localStorage["i18nextLng"]
                      }}
                    />
                  </WhiteBgWrapper>
                  <WhiteBgWrapper key="6" style={{ overflow: "auto" }}>
                    <TradingViewChart
                      crypto="XRP"
                      currency="BTC"
                      theme={this.props.theme}
                    />
                  </WhiteBgWrapper>
                  <WhiteBgWrapper key="7" style={{ overflow: "auto" }}>
                    <Topic>
                      <span>PORTFOLIO</span>
                    </Topic>
                    <HighLow>
                      <LeftHl>
                        {this.state.total.toFixed(8)} {userFiat}
                      </LeftHl>
                      <RightHl
                        className={
                          parseFloat(this.state.diffrence) < 0
                            ? "red_colour"
                            : ""
                        }
                      >
                        ^{this.state.diffrence.toFixed(8)} {userFiat}
                      </RightHl>
                    </HighLow>
                    <ActDiv>
                      <PortTable
                        // scroll={{ y: 430 }}
                        pagination={false}
                        columns={portfolioColumn}
                        dataSource={this.state.portfolioData}
                        className="portfolio-table"
                      />
                    </ActDiv>
                    {this.state.portfolioLoader === true ? (
                      <SpinSingle className="Single_spin">
                        <Spin size="small" />
                      </SpinSingle>
                    ) : (
                      ""
                    )}
                  </WhiteBgWrapper>
                </RGL>
              </Col>
            </Row>
          </GreyWrapDashboard>
          <CommonFooter />
        </ContactWrap>
        <TemplateManage
          comingCancel={e => this.comingCancel(e)}
          visible={this.state.templateManage}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.simpleReducer.isLoggedIn,
    // isLoggedIn:
    //   state.simpleReducer
    //     .isLoggedIn /*
    // theme: state.themeReducer.theme !== undefined ? state.themeReducer.theme : "", */,
    profileDetails:
      state.simpleReducer.profileDetails !== undefined
        ? state.simpleReducer.profileDetails.data[0]
        : ""
    /* loader:state.simpleReducer.loader?state.simpleReducer.loader:false */
  };
}

export default connect(mapStateToProps)(Dashboard);
function getFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem("rgl-8")) || {
        layouts: {
          lg: [
            {
              w: 12,
              h: 4,
              // x: 0,
              // y: 0,
              i: "0",
              minW: 4
            },
            {
              w: 12,
              h: 4,
              // x: 8,
              // y: 0,
              i: "1"
            },
            {
              w: 12,
              h: 4,
              // x: 4,
              // y: 4,
              i: "2"
            },
            {
              w: 12,
              h: 4,
              // x: 8,
              // y: 4,
              i: "3"
            },
            {
              w: 12,
              h: 4,
              // x: 0,
              // y: 4,
              i: "4"
            },
            {
              w: 12,
              h: 3,
              // x: 0,
              // y: 8,
              i: "5"
            },
            {
              w: 12,
              h: 4,
              // x: 0,
              // y: 11,
              i: "6"
            },
            {
              w: 12,
              h: 4,
              // x: 0,
              // y: 11,
              i: "7"
            }
          ]
          // md: [
          //   {
          //     i: "tradeView",
          //     x: 0,
          //     y: 0,
          //     w: 10,
          //     h: 3,
          //     minH: 3
          //   },
          //   {
          //     i: "instruments",
          //     x: 0,
          //     y: 1,
          //     w: 5,
          //     h: 2,
          //     minW: 5
          //   },
          //   {
          //     i: "tradeAction",
          //     x: 5,
          //     y: 1,
          //     w: 5,
          //     h: 2,
          //     minW: 3
          //   },
          //   {
          //     i: "buysellBook",
          //     x: 0,
          //     y: 2,
          //     w: 5,
          //     h: 3,
          //     minH: 3,
          //     minW: 5
          //   },
          //   {
          //     i: "depthChart",
          //     x: 5,
          //     y: 2,
          //     w: 5,
          //     h: 2,
          //     minW: 5
          //   },
          //   {
          //     i: "orderHistory",
          //     x: 0,
          //     y: 3,
          //     w: 12,
          //     h: 2,
          //     minH: 2,
          //     minW: 5
          //   },
          //   {
          //     i: "myorder",
          //     x: 0,
          //     y: 4,
          //     w: 10,
          //     h: 4,
          //     minW: 5,
          //     minH: 4
          //   }
          // ],
          // sm: [
          //   {
          //     i: "tradeView",
          //     x: 0,
          //     y: 0,
          //     w: 6,
          //     h: 3,
          //     minH: 3
          //   },
          //   {
          //     i: "instruments",
          //     x: 0,
          //     y: 1,
          //     w: 6,
          //     h: 2,
          //     minW: 6
          //   },
          //   {
          //     i: "tradeAction",
          //     x: 0,
          //     y: 2,
          //     w: 6,
          //     h: 2,
          //     minW: 6
          //   },
          //   {
          //     i: "buysellBook",
          //     x: 0,
          //     y: 3,
          //     w: 6,
          //     h: 3,
          //     minH: 3,
          //     minW: 6
          //   },
          //   {
          //     i: "depthChart",
          //     x: 0,
          //     y: 4,
          //     w: 6,
          //     h: 2,
          //     minW: 6
          //   },
          //   {
          //     i: "orderHistory",
          //     x: 0,
          //     y: 5,
          //     w: 6,
          //     h: 2,
          //     minH: 2,
          //     minW: 6
          //   },
          //   {
          //     i: "myorder",
          //     x: 0,
          //     y: 6,
          //     w: 6,
          //     h: 2,
          //     minW: 6
          //   }
          // ],
          // xs: [
          //   {
          //     i: "tradeView",
          //     x: 0,
          //     y: 0,
          //     w: 4,
          //     h: 3,
          //     minH: 3
          //   },
          //   {
          //     i: "instruments",
          //     x: 0,
          //     y: 1,
          //     w: 4,
          //     h: 2,
          //     minW: 4
          //   },
          //   {
          //     i: "tradeAction",
          //     x: 0,
          //     y: 2,
          //     w: 4,
          //     h: 2,
          //     minW: 4
          //   },
          //   {
          //     i: "buysellBook",
          //     x: 0,
          //     y: 3,
          //     w: 4,
          //     h: 3,
          //     minH: 3,
          //     minW: 4
          //   },
          //   {
          //     i: "depthChart",
          //     x: 0,
          //     y: 4,
          //     w: 4,
          //     h: 2,
          //     minW: 4
          //   },
          //   {
          //     i: "orderHistory",
          //     x: 0,
          //     y: 5,
          //     w: 4,
          //     h: 2,
          //     minH: 2,
          //     minW: 4
          //   },
          //   {
          //     i: "myorder",
          //     x: 0,
          //     y: 5,
          //     w: 5,
          //     h: 2,
          //     minW: 4
          //   }
          // ],
          // xxs: [
          //   {
          //     i: "tradeView",
          //     x: 0,
          //     y: 0,
          //     w: 2,
          //     h: 3,
          //     minH: 3
          //   },
          //   {
          //     i: "instruments",
          //     x: 0,
          //     y: 1,
          //     w: 2,
          //     h: 2,
          //     minW: 2
          //   },
          //   {
          //     i: "tradeAction",
          //     x: 0,
          //     y: 2,
          //     w: 2,
          //     h: 2,
          //     minW: 2
          //   },
          //   {
          //     i: "buysellBook",
          //     x: 0,
          //     y: 3,
          //     w: 2,
          //     h: 3,
          //     minH: 3,
          //     minW: 2
          //   },
          //   {
          //     i: "depthChart",
          //     x: 0,
          //     y: 4,
          //     w: 2,
          //     h: 2,
          //     minW: 2
          //   },
          //   {
          //     i: "orderHistory",
          //     x: 0,
          //     y: 5,
          //     w: 2,
          //     h: 2,
          //     minH: 2,
          //     minW: 2
          //   },
          //   {
          //     i: "myorder",
          //     x: 0,
          //     y: 6,
          //     w: 2,
          //     h: 2,
          //     minW: 2
          //   }
          // ]
        }
      };
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[key];
}
