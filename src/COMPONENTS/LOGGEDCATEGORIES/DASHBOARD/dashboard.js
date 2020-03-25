/* Built-in Packages */
import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import styled from "styled-components";
import "antd/dist/antd.css";
import { Row, Col, Progress, Spin } from "antd";
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

let { SOCKET_HOST } = globalVariables;
let { API_URL } = globalVariables;

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
      portfolioLoader: false
    };

    io = this.props.io;
    this.loadNews = this.loadNews.bind(this);
    this.loadActivity = this.loadActivity.bind(this);
    this.loadPortfolio = this.loadPortfolio.bind(this);
  }

  /* Life-Cycle Methods */

  componentDidMount() {
    var self = this;
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

  render() {
    const {
      /*  newsLoader, */ news,
      /* activityLoader, */ activityData,
      userFiat
    } = this.state;

    return (
      <div>
        <ContactWrap>
          <LoggedNavigation />
          <GreyWrap>
            <BodyWrap>
              <ContainerNew>
                <div>
                  <DashGraph data={data} io={io} />
                </div>
                <ActPortWrap>
                  <Row>
                    <Col sm={24} lg={12}>
                      <Lleft>
                        <Topic>
                          <span>ACTIVITY</span>
                        </Topic>
                        <ActDiv>
                          <ActTable
                            scroll={{ y: 320 }}
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
                      </Lleft>
                    </Col>
                    <Col sm={24} lg={12}>
                      <Rright>
                        <Topic>
                          <span>PORTFOLIO</span>
                        </Topic>
                        <HighLow>
                          <LeftHl>
                            {this.state.total.toFixed(8)} {userFiat}
                          </LeftHl>
                          <RightHl>
                            ^{this.state.diffrence.toFixed(8)} {userFiat}
                          </RightHl>
                        </HighLow>
                        <ActDiv>
                          <PortTable
                            scroll={{ y: 250 }}
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
                      </Rright>
                    </Col>
                  </Row>
                </ActPortWrap>
                {/* <RiseFall>
                  <RiseTable isLoggedIn={this.props.isLoggedIn} />
                </RiseFall> */}
                <Newsdiv>
                  <News>NEWS</News>
                  <NewsList>
                    <Scrollbars
                      style={{ height: 380 }}
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
                                style={{ marginRight: "10px", height: "20px" }}
                              />
                            )}
                            {element.owner === "cointelegraph" && (
                              <img
                                alt="bit pic"
                                src="/images/cointelegraph.ico"
                                style={{ marginRight: "10px", height: "20px" }}
                              />
                            )}
                            {element.owner === "bitcoin" && (
                              <img
                                alt="bit pic"
                                src="/images/bitcoin.png"
                                style={{ marginRight: "10px", height: "20px" }}
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
                </Newsdiv>
              </ContainerNew>
            </BodyWrap>
          </GreyWrap>
          <CommonFooter />
        </ContactWrap>
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
