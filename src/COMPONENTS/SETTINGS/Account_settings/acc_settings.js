/* Built-in Packages */
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { connect } from "react-redux";
import { Row, Col, Checkbox, Table, Button, notification, Modal, Pagination } from 'antd';
import styled from 'styled-components';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDesktop, faMobileAlt } from '@fortawesome/free-solid-svg-icons';

/* Components */
import { globalVariables } from 'Globals';
import { deleteAccount } from "ACTIONS/authActions"
import FaldaxLoader from "SHARED-COMPONENTS/FaldaxLoader"

let { API_URL } = globalVariables;

const columns = [{
    title: 'Date/Time',
    dataIndex: 'date',
    key: 'date',
}, {
    title: 'IP Address',
    dataIndex: 'IP',
    key: 'IP',
}, {
    title: 'Device',
    className: "column_device",
    dataIndex: 'Device',
    key: 'Device'
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
    font-size:20px;
    font-family:"Open Sans";
    font-weight: 600;
    color:${props => props.theme.mode == "dark" ? "white" : "rgb( 80, 80, 80 )"};
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
    @media(max-width:992px)
    {
        margin-left:160px;
    }
    @media(max-width:728px)
    {
        margin-left:135px;

    }
    @media(max-width:630px)
    {
        margin-left:114px;
        
    }
    @media(max-width:330px)
    {
        margin-left:100px;
    }
`
const Check_Row2 = styled(Check_Row)`
    margin-top:20px;
    @media(max-width:992px)
    {
        margin-top:0px;
    }
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
    margin-top:10px;
`
const Heading = styled.div`
    font-size:20px;
    font-family:"Open Sans";
    font-weight: 600;
    color: ${props => props.theme.mode == "dark" ? "white" : "rgb( 80, 80, 80 )"};
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
const FontAwesomeIconS = styled(FontAwesomeIcon)`
    color:${props => props.theme.mode == "dark" ? 'white' : 'black'};
`
const Table_wrap = styled.div`
    margin-top:30px;
    width:36%;    
    margin-left: auto;
    margin-right: auto;
    border-radius: 5px;
    & .ant-table-placeholder
    {
        background-color:${props => props.theme.mode == "dark" ? "#041421" : ""};
        color:${props => props.theme.mode == "dark" ? "white" : ""};
    }
    @media(max-width:992px)
    {
        width:60%;
    }
    @media(max-width:992px)
    {
        width:80%;
    }
    @media(max-width:400px)
    {
        width:90%;
    }
`
const HR2 = styled(HR)`
`
const Delete_wrap = styled.div`
`
const Delete_head = styled.div`
    font-size:20px;
    font-family:"Open Sans";
    font-weight: 600;
    color: ${props => props.theme.mode == "dark" ? "white" : "rgb( 80, 80, 80 )"};
    -moz-transform: matrix( 1,0,0,0.99882784793165,0,0);
    -webkit-transform: matrix( 1,0,0,0.99882784793165,0,0);
    -ms-transform: matrix( 1,0,0,0.99882784793165,0,0);  
    margin-top:55px;
`
const Delete_desc = styled.div`
    margin-top:30px;
    color:${props => props.theme.mode == "dark" ? "#3c4b64" : ""};
`
const Delete_btn = styled.div`
  margin-top:35px;
`
const Button_del = styled(Button)`
  background-color:${props => props.theme.mode == "dark" ? "#a21d1d" : "#fce8e8"};
  color:${props => props.theme.mode == "dark" ? "white" : "#fe1f1f"};
  border:none;
  width:240px;
  border-radius:40px;
  height:50px;
`
const PaginationS = styled(Pagination)`
    margin-top:30px !important;
    & .ant-pagination-item-link
    {
        background-color: ${props => props.theme.mode == "dark" ? "#041421" : ""};
    }
    & .ant-pagination-item-link>i
    {
        color: ${props => props.theme.mode == "dark" ? "white" : ""};
    }
    & .ant-pagination-item
    {
        background-color: ${props => props.theme.mode == "dark" ? "#041421" : ""};
    }
    & .ant-pagination-item>a
    {
        color: ${props => props.theme.mode == "dark" ? "white" : ""};
    }
    & .ant-pagination-item-link .ant-pagination-item-ellipsis
    {
        color:${props => props.theme.mode == "dark" ? "white" : ""};
    }
`
const columns_text = [, {
    title: 'Notifications',
    dataIndex: 'Notifications',
    className: "column-Noti",
    key: 'Notifications',
}, {
        title: 'Text',
        className: "column-Text",
        dataIndex: 'Text',
        key: 'Text',
    }, {
        title: 'Email',
        className: "column-Email",
        dataIndex: 'Email',
        key: 'Email',
    }];
const data_noti = [{
    key: '1',
    Notifications: "Deposits",
    Text: <Checkbox></Checkbox>,
    Email: <Checkbox></Checkbox>,
}, {
    key: '2',
    Notifications: "Trade Execution",
    Text: <Checkbox></Checkbox>,
    Email: <Checkbox></Checkbox>,
}, {
    key: '3',
    Notifications: "Withdrawals",
    Text: <Checkbox></Checkbox>,
    Email: <Checkbox></Checkbox>,
}, {
    key: '4',
    Notifications: "Login",
    Text: <Checkbox></Checkbox>,
    Email: <Checkbox></Checkbox>,
}, {
    key: '5',
    Notifications: "New Review",
    Text: <Checkbox></Checkbox>,
    Email: <Checkbox></Checkbox>,
}, {
    key: '6',
    Notifications: "New Private Message",
    Text: <Checkbox></Checkbox>,
    Email: <Checkbox></Checkbox>,
}, {
    key: '7',
    Notifications: "New Follower",
    Text: <Checkbox></Checkbox>,
    Email: <Checkbox></Checkbox>,
}, {
    key: '8',
    Notifications: "Order Execution",
    Text: <Checkbox></Checkbox>,
    Email: <Checkbox></Checkbox>,
}];
const confirm = Modal.confirm;

class Acc_settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginHistory: [],
            notiCSS: '',
            historyCSS: '',
            historyCount: 0,
            page: 1,
            loader: false
        }
    }
    onChange(e, abcd) {
        /* console.log(e,abcd,); */
    }
    componentWillReceiveProps(props, newProps) {
        /*  console.log(this.props)
         if(this.props.theme!==undefined)
         {
             if(this.props.theme !== this.state.theme)
             {
                 if(this.props.theme==false)
                     this.setState({searchCSS:"Input_search_night"})
                 else
                     this.setState({searchCSS:"INPUT_search"})
             }
         } */
    }

    _handleHistoryPagination = (page) => {
        this.setState({ page }, () => {
            this._getAllLoginHistory(page);
        })
    }

    _getAllLoginHistory = (curr) => {
        var self = this;
        var Data = {};
        this.setState({ loader: true })
        fetch(API_URL + `/users/login-history?page=${curr}&limit=9`, {
            method: "get",
            headers: {
                Authorization: "Bearer " + this.props.isLoggedIn
            }
        })
            .then(response => response.json())
            .then((responseData) => {
                /*  console.log(responseData) */
                let antTableData = [];
                this.setState({ historyCount: responseData.historyCount })
                Object.keys(responseData.data).map(function (key, index) {

                    var deviceType;
                    if (responseData.data[index].device_type == 1) deviceType = <FontAwesomeIconS icon={faMobileAlt} />
                    else if (responseData.data[index].device_type == 0) deviceType = <FontAwesomeIconS icon={faDesktop} />
                    else deviceType = <FontAwesomeIconS icon={faDesktop} />
                    let ip = "";
                    if (responseData.data[index].ip.split(":").length > 1) {
                        ip = responseData.data[index].ip.split(":")[3];
                    } else if (responseData.data[index].ip.split(":").length == 1) {
                        ip = responseData.data[index].ip
                    }
                    let temp = {
                        key: key,
                        date: moment.utc(responseData.data[index].created_at).local().format("MMM DD YYYY, HH:mm:ss"),
                        IP: ip,
                        Device: deviceType
                    };
                    antTableData.push(temp);
                });
                /* console.log("->>>>>>>>>",antTableData); */
                self.setState({
                    loginHistory: antTableData,
                    loader: false
                })
            })
            .catch(error => {/* console.log(error) */ })
    }

    componentDidMount() {
        this._getAllLoginHistory(1);

        if (this.props.theme !== undefined) {
            if (this.props.theme !== this.state.theme) {
                if (this.props.theme == false)
                    this.setState({ notiCSS: "noti_table", historyCSS: 'history_table' })
                else
                    this.setState({ notiCSS: "noti_table_night", historyCSS: "history_table_night" })
            }
        }
    }
    deleteAccount() {
        /* console.log(this.props) */
        this.openNotificationWithIcon('success')
        let value = {};
        value["email"] = this.props.email;
        value["user_id"] = this.props.profileDetails.id;
        value["jwt_token"] = this.props.isLoggedIn;
        this.props.deleteAccount(this.props.isLoggedIn, value)
    }
    showConfirm() {
        var me = this
        confirm({
            title: 'Do you want to delete the account?',
            content: 'Your account will be deleted, after clicking on the OK button.',
            onOk() {
                me.deleteAccount()
                return new Promise((resolve, reject) => {
                    setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                }).catch(() => console.log('Oops errors!'));
            },
            onCancel() { },
        });
    }
    openNotificationWithIcon = (type) => {
        notification[type]({
            message: 'Deleted',
            description: 'Account has been successfully deleted.',
            duration: 3,
        });
    };

    render() {
        return (
            <Acc_wrap>
                {/* ----Notification code start ---- */}
                {/* <Noti_Wrap>
                    <Noti_Head>
                        <span>Notifications</span>
                    </Noti_Head>
                    <Noti_desc>
                         <span>Automatic Email Notifications</span>
                    </Noti_desc>
                </Noti_Wrap>
                <Check_Wrap>
                    <Table
                        className={this.state.notiCSS}
                        pagination={false}
                        dataSource={data_noti}
                        columns={columns_text} />
                </Check_Wrap>
                <HR /> */}
                {/* ----Notification code ends ---- */}
                <Login_History>
                    <History_head>
                        <Heading>
                            <span>Login History</span>
                        </Heading>
                        <Desc>
                            {/* <span>This feature provides information about the last activity on this mail account and any concurrent activity.</span> */}
                        </Desc>
                    </History_head>
                    <Table_wrap>
                        <Table
                            className={this.state.historyCSS}
                            pagination={false}
                            bordered
                            dataSource={this.state.loginHistory}
                            columns={columns} />
                    </Table_wrap>

                    <PaginationS
                        style={{ marginTop: '15px' }}
                        className="ant-users-pagination"
                        onChange={this._handleHistoryPagination.bind(this)}
                        pageSize={10}
                        current={this.state.page}
                        total={this.state.historyCount}
                    />
                </Login_History>
                <HR2 />
                <Delete_wrap>
                    <Delete_head>
                        <span>Delete Account</span>
                    </Delete_head>
                    <Delete_desc>
                        <span>Click on the button below to permanently delete your account.</span>
                    </Delete_desc>
                    <Delete_btn>
                        <Button_del type="primary" onClick={this.showConfirm.bind(this)}>Delete Account</Button_del>
                    </Delete_btn>
                </Delete_wrap>
                {(this.state.loader == true || this.props.loader == true) ? <FaldaxLoader /> : ""}
            </Acc_wrap>
        );
    }
}

const mapStateToProps = (state) => {
    /* console.log("personalDetails",state) */
    return {
        ...state,
        email: state.simpleReducer.profileDetails !== undefined ? state.simpleReducer.profileDetails.data[0].email : "",
        loader: state.simpleReducer.loader,
        profileDetails: state.simpleReducer.profileDetails !== undefined ? state.simpleReducer.profileDetails.data[0] : "",
    }
}
const mapDispatchToProps = dispatch => ({
    deleteAccount: (isLoggedIn, email) => dispatch(deleteAccount(isLoggedIn, email))
})

export default connect(mapStateToProps, mapDispatchToProps)(Acc_settings);