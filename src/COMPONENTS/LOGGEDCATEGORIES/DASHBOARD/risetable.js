
/* Built-in Packages */
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Input } from 'antd';
import { Table } from 'react-bootstrap';
import styled from 'styled-components';
import { globalVariables } from 'Globals';

let { API_URL } = globalVariables;

const Search = Input.Search;
const Headwrap = styled.div`
    margin-left:30px;
    margin-right:30px;
    padding-top:40px;
    display:flex;
`
const RiseText = styled.span`
    font-size: 14px;
    font-family: "Open Sans";
    color: rgb( 127, 127, 127 );
    font-weight: bold;
`
const Tablerise = styled.div`
    margin-left:30px;
    margin-right:30px;
    border:1px solid #ddd;
    margin-top: 40px;

    & table
    {
        margin-bottom:0px;
    }
    & table thead tr th
    {
        border-bottom:0px;
        background-color:${props => props.theme.mode === "dark" ? "#041b2c" : "#f5f6fa"};
        color:${props => props.theme.mode === "dark" ? "#174c7e" : ""};
    }
    & table tbody tr td
    {
        border-top:0px;
        color:${props => props.theme.mode === "dark" ? "white" : ""};
    }
    & table tbody tr:nth-of-type(odd)
    {
        background-color:${props => props.theme.mode === "dark" ? "#041422" : "white"};
    }
    & table tbody tr:nth-of-type(even)
    {
        background-color:${props => props.theme.mode === "dark" ? "#041b2c" : "#f5f6fa"};
    }
`
const InputSearch = styled(Search)`
    margin-left:auto;
    >input
    {
        background-color:${props => props.theme.mode === "dark" ? "#041b2c" : ""};
    }
    & .anticon 
    {
        color:${props => props.theme.mode === "dark" ? "white" : ""};
    }
`

export default class RiseTable extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    componentDidMount() {
        // console.log(API_URL, this.props.isLoggedIn)
        fetch(`${API_URL}/get-rising-falling-data`, {
            method: "get",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: "Bearer " + this.props.isLoggedIn
            }
        }).then(response => response.json())
            .then((responseData) => {
                // console.log("Ka dabra", responseData);
                /* let activityData = [];
                if (responseData.status === 200) {
                    responseData.data.map(element => {
                        var date;
                        if (this.props.profileDetails.date_format === "MM/DD/YYYY")
                            date = moment.utc(element.created_at).local().format("MM/DD/YYYY, H:m:s")
                        else if (this.props.profileDetails.date_format === "DD/MM/YYYY")
                            date = moment.utc(element.created_at).local().format("DD/MM/YYYY, H:m:s")
                        else
                            date = moment.utc(element.created_at).local().format("MMM D, YYYY, H:m:s")
                        activityData.push({
                            date: date,
                            action: element.side,
                            amount: element.price.toFixed(2) + " " + element.currency,
                            completed: parseInt((parseFloat(element.quantity) * 100) / parseFloat(element.fix_quantity)),
                        });
                    });
                    self.setState({
                        activityData: activityData, activityLoader: false
                    }); */
            }
            )
            .catch(error => {
                this.setState({ activityLoader: false });
            })
    }
    render() {
        return (
            <div>
                <Headwrap>
                    <RiseText>Rising/Falling</RiseText>
                    <InputSearch
                        placeholder="input search text"
                        onSearch={value => console.log(value)}
                        style={{ width: 200 }}
                    />
                </Headwrap>
                <Tablerise >
                    <Table striped responsive>
                        <thead>
                            <tr>
                                <th>MY SIZE</th>
                                <th>AMOUNT</th>
                                <th>BID</th>
                                <th>TOTAL</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>0.50021</td>
                                <td>0.50021</td>
                                <td>0.50021</td>
                                <td>0.50021</td>
                            </tr>
                            <tr>
                                <td>0.50021</td>
                                <td>0.50021</td>
                                <td>0.50021</td>
                                <td>0.50021</td>
                            </tr>
                            <tr>
                                <td>0.50021</td>
                                <td>0.50021</td>
                                <td>0.50021</td>
                                <td>0.50021</td>
                            </tr>
                        </tbody>
                    </Table>
                </Tablerise>
            </div>
        );
    }
}
