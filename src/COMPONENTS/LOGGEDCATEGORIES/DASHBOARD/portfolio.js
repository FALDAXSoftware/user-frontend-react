import React, { Component } from 'react';
import { globalVariables } from '../../../Globals';
import { connect } from "react-redux";
import { Topic, HighLow, LeftHl, RightHl, ActDiv, PortTable, SpinSingle } from '../../../STYLED-COMPONENTS/LOGGED_STYLE/dashStyle';
import { Spin } from 'antd';
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
class Portfolio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            portfolioData: [],
            total: 0,
            diffrence: 0,
            userFiat: "USD",
            portfolioLoader: false,
        }
    }
    componentDidMount() {
        this.loadPortfolio()
    }
    loadPortfolio = () => {
        var self = this;
        self.setState({ portfolioLoader: true });
        fetch(`${globalVariables.SOCKET_HOST}/api/v1/tradding/get-portfolio-data`, {
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
    render() {
        const {
            userFiat
        } = this.state;
        return (<>
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
        </>);
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

export default connect(mapStateToProps)(Portfolio);