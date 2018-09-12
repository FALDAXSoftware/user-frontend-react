/* In-Build components */
import React, { Component } from 'react';
import './App.css';
import 'antd/dist/antd.css';  // or 'antd/dist/antd.less'
import { Row, Col } from 'antd';
import styled from 'styled-components';

/* Components */
import DashBoardGraphWidget from './components/DashBoardGraphWidget';
import CustomTable from './components/CustomTable';
import ReactSimpleMap from './components/ReactSimpleMap';

/* Static data */
const data = [
  {
    image: '/images/Homepage/imgpsh_fullsize_1.png',
    coinName: 'BTC/USD',
    price: 700000,
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
  price: 400000,
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
  price: 1000,
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
  price: 45000,
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

const columns = [
  {
    title: "NAME",
    dataIndex: "name",
    width: "20%"
  },
  {
    title: "LAST PRICE",
    dataIndex: "last_price",
    sorter: true,
    width: "15%"
  },
  {
    title: "CHANGE",
    dataIndex: "change",
    sorter: true,
    render: (text, record, index) => <SpanCoinChange value={text}> {text===0 ? '' : text>=0 ? '+' : ''}{text}% </SpanCoinChange>,
    width: "15%"
  },
  {
    title: "24HR VOLUME",
    dataIndex: "hours_volume",
    width: "20%"
  },
  {
    title: "High",
    dataIndex: "high",
    width: "15%"
  },
  {
    title: "Low",
    dataIndex: "low",
    width: "15%"
  }
];

const tableData = [
  {
    name: "sachin",
    last_price: 2000.02,
    change: 0.15,
    hours_volume: 43354600,
    high: 5.024563,
    low: 2.024585
  },
  {
    name: "sachin",
    last_price: 7000.03,
    change: 2.15,
    hours_volume: 33460,
    high: 7.024563,
    low: 3.024585
  },
  {
    name: "sachin",
    last_price: 5500.024573,
    change: -5.15,
    hours_volume: 3399906,
    high: 9.024563,
    low: 10.024585
  },
  {
    name: "sachin",
    last_price: 0.024573,
    change: 11.15,
    hours_volume: 76554600,
    high: 3.024563,
    low: 7.024585
  }
];

/* styled components */
const SpanCoinChange = styled.span`
  color: ${props => props.value===0 ? 'black' : props.value<=0 ? 'red' : '#34a539'}
`;

/* Component defination start here */
class App extends Component {
  constructor() {
    super();
    this.state={pagination: {}};
  }

  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager
    });
  };
  
  render() {
    return (
      <div className="main-container">
        <div className="section-1">
          <div className="container">
            <Row>
              { data.map((chartData, index)=>
                <Col sm={12} md={6} lg={6} key={index} style={{ padding: '10px' }}>
                  <DashBoardGraphWidget data={chartData} total={4} />
                </Col>
              )}
            </Row>
          </div>
        </div>

        <div className="section-2">
          <div className="container">
            <Row>
              <Col>
                <CustomTable 
                  columns={columns} 
                  dataSource={tableData} 
                  loading={false} 
                  pagination={false} 
                  handleTableChange={this.handleTableChange}
                />
              </Col>
            </Row>
          </div>
        </div>

        <div className="section-3">
          <div className="container">
            <Row>
              <Col>
                <ReactSimpleMap />
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
