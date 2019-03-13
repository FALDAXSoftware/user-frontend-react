/* In-built Packages */
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import styled from 'styled-components'

/* Components */
import Header_main from "../Navigations/Navigation";
import Home_first from "../Landing/Body_sections/Home_first";
import About from "../Landing/Body_sections/About";
// import Home_second from '../Landing/Body_sections/Home_second';
import Home_third from '../Landing/Body_sections/Home_third';
import Services from '../Landing/Body_sections/Services';
import Home_five from "../Landing/Body_sections/Home_five";
import Home_six from "../Landing/Body_sections/Home_six";
import Feature from "../Landing/Body_sections/Feature";
import Home_seven from "../Landing/Body_sections/Home_seven";
import Footer_main from "../Landing/Footers/Footer_home";

/* Styled Components */
import Home_four from './Body_sections/Home_four';

/* Global Components */
const { Content } = Layout;

/* Styled Components */
const Content_style = styled(Content)`
    margin-top:80px;
`;

/* Static data */
const data = [{
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

const columns = [
  {
    title: "MARKET",
    dataIndex: "market",
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
    render: (text, record, index) => <SpanCoinChange value={text}> {text === 0 ? '' : text >= 0 ? '+' : ''}{text}% </SpanCoinChange>,
    width: "15%"
  },
  {
    title: "24HR VOLUME",
    dataIndex: "hours_volume",
    width: "20%",
    render: (text, record, index) => text.toLocaleString().replace(/,/g, ',')
  },
  {
    title: "HIGH",
    dataIndex: "high",
    width: "15%"
  },
  {
    title: "LOW",
    dataIndex: "low",
    width: "15%"
  }
];

const tableData = [
  {
    market: "ZEC",
    last_price: 2000.02,
    change: 0.15,
    hours_volume: 43354600,
    high: 5.024563,
    low: 2.024585
  },
  {
    market: "BTC",
    last_price: 7000.03,
    change: 2.15,
    hours_volume: 33460,
    high: 7.024563,
    low: 3.024585
  },
  {
    market: "XMR",
    last_price: 5500.024573,
    change: -5.15,
    hours_volume: 3399906,
    high: 9.024563,
    low: 10.024585
  },
  {
    market: "SWFTC",
    last_price: 0.024573,
    change: 11.15,
    hours_volume: 76554600,
    high: 3.024563,
    low: 7.024585
  },
  {
    market: "LTC",
    last_price: 7000.03,
    change: 2.15,
    hours_volume: 33460,
    high: 7.024563,
    low: 3.024585
  },
  {
    market: "DASH",
    last_price: 0.024573,
    change: 11.15,
    hours_volume: 76554600,
    high: 3.024563,
    low: 7.024585
  },
  {
    market: "USDT",
    last_price: 2000.02,
    change: 0.15,
    hours_volume: 43354600,
    high: 5.024563,
    low: 2.024585
  },
  {
    market: "BCH",
    last_price: 7000.03,
    change: 2.15,
    hours_volume: 33460,
    high: 7.024563,
    low: 3.024585
  },
  {
    market: "ZEC",
    last_price: 5500.024573,
    change: -5.15,
    hours_volume: 3399906,
    high: 9.024563,
    low: 10.024585
  }
];

/* styled components */
const SpanCoinChange = styled.span`
    color: ${props => props.value === 0 ? 'black' : props.value <= 0 ? 'red' : '#34a539'}
`;

/* Component Definition Starts Here*/

export default class HomePage extends Component {
  constructor() {
    super();
    this.state = { pagination: {} };
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
      <div>
        <Layout>
          <Header_main {...this.props} />
          <Content_style>
            <Home_first />
            <About />
            {/* <Home_second data={data} /> */}
            {/* <Home_third
              columns={columns}
              dataSource={tableData}
              loading={false}
              pagination={false}
              handleTableChange={this.handleTableChange}
            /> */}
            <Home_four />
            <Services />
            <Home_six />
            <Feature />
            {/* <Home_seven />  */}
          </Content_style>
          <Footer_main />
        </Layout>
      </div>
    );
  }
}
