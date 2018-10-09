import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {connect} from "react-redux";
import { Row,Col,Checkbox,Table,Button,notification } from 'antd';
import styled from 'styled-components';
import moment from 'moment';
import { globalVariables } from '../../../Globals';

import {deleteAccount} from "../../../Actions/Auth"

let { API_URL } = globalVariables;

const columns = [{
    title: 'Date/Time',
    dataIndex: 'date',
    key: 'date',
  }, {
    title: 'IP Address',
    dataIndex: 'IP',
    key: 'IP',
  }];
  const dataSource = [{
    key: '1',
    date: 'Mike',
    IP: 32
  }, {
    key: '2',
    date: 'John',
    IP: 42
  }];
/* Styled- Components */

const Acc_wrap = styled.div`
  margin-bottom:50px;
`
const Noti_Wrap = styled.div`
    margin-top:50px;
`
const Noti_Head = styled.div`
    font-size: 20px;
    font-family: "Open Sans";
    color: rgb( 80, 80, 80 );
`
const Noti_desc = styled.div`
    font-size: 16.008px;
    margin-top:30px;
    font-family: "Open Sans";
    color: rgb( 80, 80, 80 );
    -moz-transform: matrix( 0.99999985149599,0,0,0.99949238260564,0,0);
    -webkit-transform: matrix( 0.99999985149599,0,0,0.99949238260564,0,0);
    -ms-transform: matrix( 0.99999985149599,0,0,0.99949238260564,0,0);
`
const Check_Wrap = styled(Row)`
    max-width:730px;
    width:100%;
    margin:auto;
    margin-top:35px;
`
const Check_Row = styled(Row)`
    text-align:left;
`
const Check_Row2 = styled(Check_Row)`
    margin-top:20px;
`
const Check_Col = styled(Col)`

`
const Check_Col2 = styled(Check_Col)`

`
const Check_Col3 = styled(Check_Col)`

`
const Check_Col4 = styled(Check_Col)`

`
const HR = styled.hr`
    margin-top:50px;
    width:95%;
    border-top: 1px solid #ededed;
`
const Login_History = styled.div`

`
const History_head = styled.div`
    margin-top:50px;
`
const Heading = styled.div`
    font-size: 20px;
    font-family: "Open Sans";
    color: rgb( 80, 80, 80 );
    line-height: 2.4;
    -moz-transform: matrix( 1,0,0,0.99859542519785,0,0);
    -webkit-transform: matrix( 1,0,0,0.99859542519785,0,0);
    -ms-transform: matrix( 1,0,0,0.99859542519785,0,0);
`
const Desc = styled.div`
    font-size: 14.007px;
    font-family: "Open Sans";
    color: rgb( 102, 102, 102 );
    -moz-transform: matrix( 0.99956308705261,0,0,0.99832082554207,0,0);
    -webkit-transform: matrix( 0.99956308705261,0,0,0.99832082554207,0,0);
    -ms-transform: matrix( 0.99956308705261,0,0,0.99832082554207,0,0);
`
const Table_wrap = styled.div`
    margin-top:30px;
    width:36%;    
    margin-left: auto;
    margin-right: auto;
`
const HR2 = styled(HR)`

`
const Delete_wrap = styled.div`

`
const Delete_head = styled.div`
    font-size: 20px;
    font-family: "open sans";
    color: rgb( 80, 80, 80 );
    -moz-transform: matrix( 1,0,0,0.99882784793165,0,0);
    -webkit-transform: matrix( 1,0,0,0.99882784793165,0,0);
    -ms-transform: matrix( 1,0,0,0.99882784793165,0,0);  
    margin-top:55px;
`
const Delete_desc = styled.div`
    margin-top:30px;

`
const Delete_btn = styled.div`
  margin-top:35px;
`
const Button_del = styled(Button)`
  background-color:#fce8e8;
  color:#fe1f1f;
  border:none;
  width:240px;
  border-radius:40px;
  height:50px;
`
class Acc_settings extends React.Component
{
    constructor(props){
        super(props);
        this.state={
            loginHistory: []
        }
    }
    onChange(e,abcd) {
        console.log(e,abcd,);
    }
    componentDidMount()
    {   var self = this;
        var Data = {};
        fetch(API_URL + "/users/login-history",{
            method:"get",
            headers: {
                Authorization:"Bearer " + this.props.isLoggedIn
            }
        })
        .then(response => response.json())
        .then((responseData) => {
            console.log(responseData)
            let antTableData = [];
            Object.keys(responseData.data).map(function(key,index)
            {
                let temp = {
                    key:key,
                    date:moment.utc(responseData.data[index].created_at).local().format("YYYY-MM-DD H:m:s"),
                    IP:responseData.data[index].ip.split(":")[3]
                };
                antTableData.push(temp);
            });
            console.log("->>>>>>>>>",antTableData);
            self.setState({
                loginHistory:antTableData
            })
        })
        .catch(error => {console.log(error)})
        
        
    }
    deleteAccount()
    {
        console.log(this.props)
        this.openNotificationWithIcon('success')
        let value = {};
        value["email"] = this.props.email;
        this.props.deleteAccount(this.props.isLoggedIn,value)
    }
    openNotificationWithIcon = (type) => {
        notification[type]({
          message: 'Deleted',
          description: 'Account has been successfully deleted.',
          duration: 3,
        });
      };
    render()
    {
        return(
            <Acc_wrap>
                <Noti_Wrap>  
                    <Noti_Head>
                        <span>Notification</span>
                    </Noti_Head>          
                    <Noti_desc>
                        <span>Automatic Email Notifications</span>
                    </Noti_desc>
                </Noti_Wrap>
                <Check_Wrap>
                    <Check_Row>
                        <Check_Col span={6}>
                            <Checkbox onChange={this.onChange.bind(this,"Deposit")}>Deposits</Checkbox>
                        </Check_Col>    
                        <Check_Col2 span={6}>
                            <Checkbox onChange={this.onChange.bind(this,"Trade")}>Trade Execution</Checkbox>
                        </Check_Col2>
                        <Check_Col3 span={6}>
                            <Checkbox onChange={this.onChange.bind(this,"Withdrawals")}>Withdrawals</Checkbox>
                        </Check_Col3>
                        <Check_Col4 span={6}>
                            <Checkbox onChange={this.onChange.bind(this,"Follower")}>New Follower</Checkbox>
                        </Check_Col4>
                    </Check_Row>
                    <Check_Row2>
                        <Check_Col span={6}>
                            <Checkbox onChange={this.onChange.bind(this,"Login")}>Login</Checkbox>
                        </Check_Col>    
                        <Check_Col2 span={6}>
                            <Checkbox onChange={this.onChange.bind(this,"Review")}>New Review</Checkbox>
                        </Check_Col2>
                        <Check_Col3 span={6}>
                            <Checkbox onChange={this.onChange.bind(this,"private")}>New private message</Checkbox>
                        </Check_Col3>
                        <Check_Col4 span={6}>
                            <Checkbox onChange={this.onChange.bind(this,"execution")}>Order execution</Checkbox>
                        </Check_Col4>
                    </Check_Row2>
                </Check_Wrap>
                <HR/>
                <Login_History>
                    <History_head>
                        <Heading>
                            <span>Login History</span>
                        </Heading>
                        <Desc>
                            <span>This feature provides information about the last activity on this mail account and any concurrent activity.</span>
                        </Desc>
                    </History_head>
                    <Table_wrap>
                        <Table 
                        className="history_table"
                        pagination={false}
                        bordered
                        dataSource={this.state.loginHistory} 
                        columns={columns} />
                    </Table_wrap>
                </Login_History>
                <HR2/>
                <Delete_wrap>
                    <Delete_head>
                        <span>Delete Account</span>
                    </Delete_head>
                    <Delete_desc>
                        <span>To permenantly delete the account click on the below button</span>
                    </Delete_desc>
                    <Delete_btn>
                        <Button_del type="primary" onClick={this.deleteAccount.bind(this)}>Delete Account</Button_del>
                    </Delete_btn>
                </Delete_wrap>
            </Acc_wrap>
        );
    }
}

const mapStateToProps = (state) => {
    console.log("personalDetails",state)
    return {
      ...state,
        email:state.simpleReducer.profileDetails!==undefined?state.simpleReducer.profileDetails.data[0].email:"",
    }
  }
const mapDispatchToProps = dispatch => ({
   deleteAccount : (isLoggedIn,email) => dispatch(deleteAccount(isLoggedIn,email))
})

export default connect(mapStateToProps,mapDispatchToProps)(Acc_settings);