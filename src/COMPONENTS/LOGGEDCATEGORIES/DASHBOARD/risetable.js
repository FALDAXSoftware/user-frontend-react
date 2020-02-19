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
  margin-top: 40px;

  & table {
    margin-bottom: 0px;
  }
  & table thead tr th {
    border-bottom: 0px;
    background-color: ${props =>
      props.theme.mode === "dark" ? "#041b2c" : "#f5f6fa"};
    color: ${props => (props.theme.mode === "dark" ? "#174c7e" : "")};
  }
  & table tbody tr td {
    border-top: 0px;
    color: ${props => (props.theme.mode === "dark" ? "white" : "")};
  }
  & table tbody tr:nth-of-type(odd) {
    background-color: ${props =>
      props.theme.mode === "dark" ? "#041422" : "white"};
  }
  & table tbody tr:nth-of-type(even) {
    background-color: ${props =>
      props.theme.mode === "dark" ? "#041b2c" : "#f5f6fa"};
  }
`;
const InputSearch = styled(Search)`
  margin-left: auto;
  > input {
    background-color: ${props =>
      props.theme.mode === "dark" ? "#041b2c" : ""};
  }
  & .anticon {
    color: ${props => (props.theme.mode === "dark" ? "white" : "")};
  }
`;

const THead = styled.th`
  color: #164b7e;
`;

const Td = styled.td`
  color: ${props => (props.change < 0 ? "#EE3C00" : "#34A539")};
`;

export default class RiseTable extends Component {
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
        Authorization: "Bearer " + this.props.isLoggedIn
      }
    })
      .then(response => response.json())
      .then(responseData => {
        let activityData = [];
        if (responseData.status === 200) {
          var element = responseData.data.data;
          for (var i = 0; i < element.length; i++) {
            if (self.state.idList.includes(element[i].id)) {
              activityData.push({
                name: element[i].name,
                last_price: element[i].quote.USD.price,
                change: element[i].quote.USD.percent_change_24h,
                volume: element[i].quote.USD.volume_24h
              });
            }
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
          <RiseText>RISING/FALLING</RiseText>
          <InputSearch
            placeholder="input search text"
            onSearch={value => console.log(value)}
            style={{ width: 200 }}
          />
        </Headwrap>
        <Tablerise>
          <Table striped responsive>
            <thead>
              <tr>
                <THead>NAME</THead>
                <THead>LAST PRICE</THead>
                <THead>CHANGE</THead>
                <THead>24HR VOLUME</THead>
                {/* <TableHead>LOW</TableHead>
                                <TableHead>HIGH</TableHead> */}
              </tr>
            </thead>
            <tbody>
              {console.log(activityData)}
              {activityData.map(function(record, index) {
                console.log("Record >>>>>>>>>>>>>>>>>>>>>>.", record, index);
                return (
                  <tr>
                    <td>{record.name.toUpperCase()}</td>
                    <td>{record.last_price.toFixed(5)}</td>
                    <Td change={Number(record.change.toFixed(8))}>
                      {record.change.toFixed(8)}
                    </Td>
                    <td>{record.volume.toFixed(3)}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Tablerise>
      </div>
    );
  }
}
