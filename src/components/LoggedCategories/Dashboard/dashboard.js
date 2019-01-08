import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Row, Col, Progress } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareFull } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import LoggedNavigation from '../../Navigations/LoggedNavigation';
import CommonFooter from "../../Landing/Footers/Footer_home";
import DashGraph from "./dashGraph";
import RiseTable from "./RiseTable";
import { Contact_wrap, Grey_wrap } from "../../../styled-components/landingCategories/contactStyle";
import { ContainerContact } from "../../../styled-components/loggedStyle/historyStyle"
import { connect } from "react-redux"
import InfiniteScroll from 'react-infinite-scroller';
import { Scrollbars } from 'react-custom-scrollbars';

import {
    ActPortWrap, Lleft, Rright, Topic, Act_div, ActTable, High_low, Left_hl, Right_hl,
    Rise_fall, Newsdiv, News, Newslist, List, Listspan, Listp, Date
} from "../../../styled-components/loggedStyle/dashStyle"
import { globalVariables } from '../../../Globals';
const moment = require('moment');
let { API_URL } = globalVariables;


const ContainerNew = styled(ContainerContact)`
    padding:0px;
    background-color:${props => props.theme.mode == "dark" ? "#01090f" : "#f5f6fa"};
`
const Body_wrap = styled.div`
`

const data2 = [{
    key: '1',
    date: 'John Brown',
    action: 32,
    amount: 'New York No. 1 Lake Park',
    completed: ['nice', 'developer'],
}, {
    key: '2',
    date: 'Jim Green',
    action: 42,
    amount: 'London No. 1 Lake Park',
    completed: ['loser'],
}, {
    key: '3',
    date: 'Joe Black',
    action: 32,
    amount: 'Sidney No. 1 Lake Park',
    completed: ['cool', 'teacher'],
}];

const data = [
    {
        image: '/images/Homepage/imgpsh_fullsize_1.png',
        coinName: 'BTC/USD',
        price: "700,000",
        percentage: 3.35,
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'My First dataset',
                fill: false,
                bezierCurve: false,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [65, 59, 80, 81, 56, 55, 40]
            }
        ]
    },
    {
        image: '/images/Homepage/imgpsh_fullsize_2.png',
        coinName: 'BTC/USD',
        price: "400,000",
        percentage: 0.35,
        labels: ['5', '59', '80', '81', '56', '55', '100', '59', '80', '81', '56', '55', '100', '59', '80', '81', '56', '55', '100', '59', '80', '81', '56', '55', '100', '59', '80', '81', '56', '55', '150'],
        datasets: [
            {
                label: 'My First dataset',
                fill: false,
                bezierCurve: false,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [5, 59, 80, 81, 56, 55, 100, 59, 80, 81, 56, 55, 100, 59, 80, 81, 56, 55, 100, 59, 80, 81, 56, 55, 100, 59, 80, 81, 56, 55, 150]
            }
        ]
    },
    {
        image: '/images/Homepage/imgpsh_fullsize_3.png',
        coinName: 'BTC/USD',
        price: "1,000",
        percentage: -0.35,
        labels: ['150', '59', '80', '81', '56', '55', '100', '59', '80', '81', '56', '55', '100', '59', '80', '81', '56', '55', '100', '59', '80', '81', '56', '55', '100', '59', '80', '81', '56', '55', '5'],
        datasets: [
            {
                label: 'My First dataset',
                fill: false,
                bezierCurve: false,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [150, 59, 80, 81, 56, 55, 100, 59, 80, 81, 56, 55, 100, 59, 80, 81, 56, 55, 100, 59, 80, 81, 56, 55, 100, 59, 80, 81, 56, 55, 5]
            }
        ]
    },
    {
        image: '/images/Homepage/imgpsh_fullsize_1.png',
        coinName: 'BTC/USD',
        price: "45,000",
        percentage: -3.45,
        labels: ['5', '59', '80', '81', '56', '55', '100', '59', '80', '81', '56', '55', '100', '59', '80', '81', '56', '55', '100', '59', '80', '81', '56', '55', '100', '59', '80', '81', '56', '55', '150'],
        datasets: [
            {
                label: 'My First dataset',
                fill: false,
                bezierCurve: false,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [5, 59, 80, 81, 56, 55, 100, 59, 80, 81, 56, 55, 100, 59, 80, 81, 56, 55, 100, 59, 80, 81, 56, 55, 100, 59, 80, 81, 56, 55, 150]
            }
        ]
    }
];
const activityColumns = [{
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    className:"dash-date"
}, {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
}, {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
}, {
    title: 'Completed',
    key: 'completed',
    dataIndex: 'completed',
    render: completed => (
        <Progress percent={completed} />
    ),
}];
const portfolioColumn = [{
    title: 'Coin',
    dataIndex: 'coin',
    key: 'coin',
}, {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
}, {
    title: 'Value',
    dataIndex: 'value',
    key: 'value',
}, {
    title: 'Change',
    key: 'change',
    dataIndex: 'change',
}];
class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activityData: [],
            news: [],
            hasMoreNews: true,
            portfolioData: [],
        }
        this.loadNews = this.loadNews.bind(this);
        this.loadActivity = this.loadActivity.bind(this);
        this.loadPortfolio = this.loadPortfolio.bind(this);
    }

    componentDidMount() {

        var self = this;
        self.loadNews(1);
        self.loadActivity();
        self.loadPortfolio();
    }

    loadActivity() {
        var self = this;
        fetch(`${API_URL}/dashboard/get-activity`, {
            method: "get",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: "Bearer " + this.props.isLoggedIn
            }
        }).then(response => response.json())
            .then((responseData) => {
                // console.log(responseData);
                let activityData = [];
                if (responseData.status == 200) {
                    responseData.data.map(element => {
                        activityData.push({
                            date: moment.utc(element.created_at).local().format("MMMM DD,HH:mm"),
                            action: element.side,
                            amount: element.price + element.currency,
                            completed: ((parseFloat(element.quantity) * 100) / parseFloat(element.fix_quantity)),
                        });
                    });
                    self.setState({
                        activityData: activityData
                    });
                }

            })
            .catch(error => { /* console.log(error) */ })
    }

    loadPortfolio() {
        var self = this;
        fetch(`${API_URL}/dashboard/get-portfolio`, {
            method: "get",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: "Bearer " + this.props.isLoggedIn
            }
        })
            .then(response => response.json())
            .then((responseData) => {
                console.log(responseData);
                let portfolioData = [];
                if (responseData.status == 200) {
                    responseData.data.map(element => {
                        portfolioData.push({
                            coin: element.name,
                            amount: element.amount + element.symbol,
                            value: element.average_price + element.fiat,
                            change: element.percentchange + "%"
                        });
                    });
                    self.setState({
                        portfolioData: portfolioData
                    });
                }

            })
            .catch(error => { /* console.log(error) */ })
    }

    loadNews(page) {
        console.log("load news call ", page);

        var self = this;
        fetch(`${API_URL}/users/get-all-news?limit=50&page=${page}`, {
            method: "post",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then((responseData) => {
                // console.log(responseData);
                if (responseData.status == 200) {
                    let news = self.state.news;
                    responseData.data.map(element => {
                        news.push(element);
                    });

                    let hasMoreNews = true;
                    console.log(news.length >= parseInt(responseData.NewsCount));

                    if (news.length >= parseInt(responseData.NewsCount)) {
                        hasMoreNews = false;
                    }
                    self.setState({
                        news: news,
                        hasMoreNews: hasMoreNews
                    });
                }

            })
            .catch(error => { /* console.log(error) */ })
    }

    render() {
        return (
            <div>
                <Contact_wrap>
                    <LoggedNavigation />
                    <Grey_wrap>
                        <Body_wrap>
                            <ContainerNew>
                                <div>
                                    <DashGraph data={data} />
                                </div>
                                <ActPortWrap>
                                    <Row>
                                        <Col sm={24} lg={12}>
                                            <Lleft>
                                                <Topic>
                                                    <span>ACTIVITY</span>
                                                </Topic>
                                                <Act_div>
                                                    <ActTable scroll={{ y: 320 }} pagination={false} columns={activityColumns} dataSource={this.state.activityData} />
                                                </Act_div>
                                            </Lleft>
                                        </Col>
                                        <Col sm={24} lg={12}>
                                            <Rright>
                                                <Topic>
                                                    <span>PORTFOLIO</span>
                                                </Topic>
                                                <High_low>
                                                    <Left_hl>$465,454</Left_hl>
                                                    <Right_hl>^$12,342</Right_hl>
                                                </High_low>
                                                <Act_div>
                                                    <ActTable pagination={false} columns={portfolioColumn} dataSource={this.state.portfolioData} />
                                                </Act_div>
                                            </Rright>
                                        </Col>
                                    </Row>
                                </ActPortWrap>
                                <Rise_fall>
                                    <RiseTable />
                                </Rise_fall>
                                <Newsdiv>
                                    <News>NEWS</News>
                                    <Newslist>
                                        <Scrollbars
                                            style={{ height: 380 }}>
                                            {
                                                this.state.news.map((element, index) => (
                                                    <List>
                                                        <Date>{moment.utc(element.posted_at).format("MMMM DD, YYYY HH:mm")}</Date>
                                                        <Listspan>
                                                            <FontAwesomeIcon icon={faSquareFull} color='#d4d4d4' style={{ marginRight: "10px" }} />{element.owner}
                                                        </Listspan>
                                                        <Listp href={element.link} target="_blank">{element.title}</Listp>
                                                    </List>
                                                ))
                                            }
                                        </Scrollbars>

                                    </Newslist>
                                </Newsdiv>
                            </ContainerNew>
                        </Body_wrap>
                    </Grey_wrap>
                    <CommonFooter />
                </Contact_wrap>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return ({
        isLoggedIn: state.simpleReducer.isLoggedIn,
        theme: state.themeReducer.theme !== undefined ? state.themeReducer.theme : ""
        /* loader:state.simpleReducer.loader?state.simpleReducer.loader:false */
    })
}

export default connect(mapStateToProps)(Dashboard);