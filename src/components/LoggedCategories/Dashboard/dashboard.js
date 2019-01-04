import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Row, Col } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareFull } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import LoggedNavigation from '../../Navigations/LoggedNavigation';
import CommonFooter from "../../Landing/Footers/Footer_home";
import DashGraph from "./dashGraph";
import RiseTable from "./RiseTable";
import { Contact_wrap, Grey_wrap } from "../../../styled-components/landingCategories/contactStyle";
import { ContainerContact } from "../../../styled-components/loggedStyle/historyStyle"
import {
    ActPortWrap, Lleft, Rright, Topic, Act_div, ActTable, High_low, Left_hl, Right_hl,
    Rise_fall, Newsdiv, News, Newslist, List, Listspan, Listp, Date
} from "../../../styled-components/loggedStyle/dashStyle"


const ContainerNew = styled(ContainerContact)`
    padding:0px;
    background-color:${props => props.theme.mode == "dark" ? "#01090f" : "#f5f6fa"};
`
const Body_wrap = styled.div`
`
const columns = [{
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
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
        <span>
            {completed.map(complete => complete)}
        </span>
    ),
}];

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

export default class Dashboard extends Component {
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
                                                    <ActTable pagination={false} columns={columns} dataSource={data2} />
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
                                                    <ActTable pagination={false} columns={columns} dataSource={data2} />
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
                                        <List>
                                            <Date>August 17, 17:49</Date>
                                            <Listspan>
                                                <FontAwesomeIcon icon={faSquareFull} color='#d4d4d4' style={{ marginRight: "10px" }} />www.gmail.com
                                            </Listspan>
                                            <Listp>Ripple Picks Three Crypto Exchanges for International XRP Payments</Listp>
                                        </List>
                                        <List>
                                            <Date>August 17, 17:49</Date>
                                            <Listspan>
                                                <FontAwesomeIcon icon={faSquareFull} color='#d4d4d4' style={{ marginRight: "10px" }} />www.gmail.com
                                            </Listspan>
                                            <Listp>Ripple Picks Three Crypto Exchanges for International XRP Payments</Listp>
                                        </List>
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
