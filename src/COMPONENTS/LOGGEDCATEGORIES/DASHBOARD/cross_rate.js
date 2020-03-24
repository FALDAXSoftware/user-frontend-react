/* Built-in Packages */
import React, { Component } from "react";
import "antd/dist/antd.css";
import { Input } from "antd";
import { Table } from "react-bootstrap";
import styled from "styled-components";
import { globalVariables } from "Globals.js";
import moment from "moment";

let { API_URL } = globalVariables;

const Search = Input.Search;
const Headwrap = styled.div`
  margin-left: 30px;
  margin-right: 30px;
  padding-top: 40px;
  display: flex;
`;
const RiseText = styled.span`
  font-size: 14px;
  font-family: "Open Sans";
  color: rgb(127, 127, 127);
  font-weight: bold;
`;
const Tablerise = styled.div`
  margin-left: 30px;
  margin-right: 30px;
  border: 1px solid #ddd;
  margin-top: 20px;
  color:#131722;
  & table {
    margin-bottom: 0px;
  }
`;


const Td = styled.td`
  // color: ${props => (props.change < 0 ? "#EE3C00" : "#34A539")};
 text-align: center;
    padding: 12px 0px !important;
    border: 1px solid #e0e3eb;
    &.title{
        font-weight: bold;
        img{
            margin-right:5px;
        }
    }
    &.positive{
        color:#26a69a;
        background-color: rgba(0,150,136,0.2);
    }
    &.negative{
        color:#ef5350;
        background-color: rgba(244,67,54,0.2);
    }
`;

export default class CrossRate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activityData: [],
            idList: [1, 1027, 52, 1831, 2, 512, 131, 1437]
        };
    }
    componentDidMount() {
        let self = this;
        fetch(`${API_URL}/get-rising-falling-data`, {
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
                let activityData = [];
                if (responseData.status === 200) {
                    var element = responseData.data;
                    console.log("responseDta^^^^", responseData.data);
                    for (var i = 0; i < element.length; i++) {
                        // if (self.state.idList.includes(element[i].id)) {
                        activityData.push({
                            name: element[i].symbol,
                            last_price: element[i].quote.USD.price,
                            change: element[i].quote.USD.percent_change_24h,
                            volume: element[i].quote.USD.volume_24h
                        });
                        // }
                    }
                    self.setState({
                        activityData: activityData,
                        activityLoader: false
                    });
                }
            })
            .catch(error => {
                this.setState({ activityLoader: false });
            });
    }
    render() {
        const { activityData } = this.state;
        return (
            <div>
                <Headwrap>
                    <RiseText>CRYPTO CROSS RATE</RiseText>
                </Headwrap>
                <Tablerise>
                    <Table responsive>
                        <tbody>
                            <tr>
                                <Td></Td>
                                <Td className="title"><img src="https://s3.us-east-2.amazonaws.com/production-static-asset/coin/defualt_coin.png" alt="" height="20px"/> BTC</Td>
                                <Td className="title"><img src="https://s3.us-east-2.amazonaws.com/production-static-asset/coin/defualt_coin.png" alt="" height="20px"/> XRP</Td>
                                <Td className="title"><img src="https://s3.us-east-2.amazonaws.com/production-static-asset/coin/defualt_coin.png" alt="" height="20px"/> ETH</Td>
                                <Td className="title"><img src="https://s3.us-east-2.amazonaws.com/production-static-asset/coin/defualt_coin.png" alt="" height="20px"/> LTC</Td>
                                <Td className="title"><img src="https://s3.us-east-2.amazonaws.com/production-static-asset/coin/defualt_coin.png" alt="" height="20px"/> ERC</Td>
                            </tr>
                            <tr>
                                <Td className="title"><img src="https://s3.us-east-2.amazonaws.com/production-static-asset/coin/defualt_coin.png" alt="" height="20px"/> BTC</Td>
                                <Td></Td>
                                <Td className="positive">1.23546</Td>
                                <Td>1.23546</Td>
                                <Td className="positive">1.23546</Td>
                                <Td>1.23546</Td>
                            </tr>
                            <tr>
                                <Td className="title"><img src="https://s3.us-east-2.amazonaws.com/production-static-asset/coin/defualt_coin.png" alt="" height="20px"/> XRP</Td>
                                <Td>1.23546</Td>
                                <Td></Td>
                                <Td>1.23546</Td>
                                <Td className="negative">1.23546</Td>
                                <Td>1.23546</Td>
                            </tr>
                            <tr>
                                <Td className="title"><img src="https://s3.us-east-2.amazonaws.com/production-static-asset/coin/defualt_coin.png" alt="" height="20px"/> ETH</Td>
                                <Td>1.23546</Td>
                                <Td>1.23546</Td>
                                <Td></Td>
                                <Td>1.23546</Td>
                                <Td>1.23546</Td>
                            </tr>
                            <tr>
                                <Td className="title"><img src="https://s3.us-east-2.amazonaws.com/production-static-asset/coin/defualt_coin.png" alt="" height="20px"/> LTC</Td>
                                <Td>1.23546</Td>
                                <Td className="negative">1.23546</Td>
                                <Td>1.23546</Td>
                                <Td></Td>
                                <Td>1.23546</Td>
                            </tr>
                            <tr>
                                <Td className="title"><img src="https://s3.us-east-2.amazonaws.com/production-static-asset/coin/defualt_coin.png" alt="" height="20px"/> ERC</Td>
                                <Td className="negative">1.23546</Td>
                                <Td>1.23546</Td>
                                <Td>1.23546</Td>
                                <Td className="negative">1.23546</Td>
                                <Td></Td>
                            </tr>
                        </tbody>
                    </Table>
                </Tablerise>
            </div>
        );
    }
}
